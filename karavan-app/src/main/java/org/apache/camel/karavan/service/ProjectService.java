/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.apache.camel.karavan.service;

import io.quarkus.scheduler.Scheduled;
import io.quarkus.vertx.ConsumeEvent;
import io.smallrye.mutiny.tuples.Tuple2;
import org.apache.camel.karavan.model.GitRepo;
import org.apache.camel.karavan.model.GitRepoFile;
import org.apache.camel.karavan.model.Project;
import org.apache.camel.karavan.model.ProjectFile;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.health.HealthCheck;
import org.eclipse.microprofile.health.HealthCheckResponse;
import org.eclipse.microprofile.health.Readiness;
import org.jboss.logging.Logger;
import org.bson.Document;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Default;
import javax.inject.Inject;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicBoolean;


@Default
@Readiness
@ApplicationScoped
public class ProjectService implements HealthCheck{

    private static final Logger LOGGER = Logger.getLogger(ProjectService.class.getName());
    public static final String IMPORT_PROJECTS = "import-projects";

    @Inject
    InfinispanService infinispanService;

    @Inject
    MongoService mongoService;

    @Inject
    KubernetesService kubernetesService;

    @Inject
    GitService gitService;

    @Inject
    CodeService codeService;

    @ConfigProperty(name = "karavan.default-runtime")
    String runtime;

    private AtomicBoolean readyToPull = new AtomicBoolean(false);

    @Override
    public HealthCheckResponse call() {
        if(readyToPull.get()) {
            return HealthCheckResponse.up("Git authentication is successfull.");
        }
        else {
            return HealthCheckResponse.down("Git authentication is unsuccessfull. Check your git credentials.");
        }
    }

    @Scheduled(every = "{karavan.git-pull-interval}", concurrentExecution = Scheduled.ConcurrentExecution.SKIP)

    void pullCommits() {
        if (readyToPull.get()) {
            LOGGER.info("Pull commits...");
            Tuple2<String, Integer> lastCommit = infinispanService.getLastCommit();
            gitService.getCommitsAfterCommit(lastCommit.getItem2()).forEach(commitInfo -> {
                System.out.println(commitInfo);
                if (!infinispanService.hasCommit(commitInfo.getCommitId())) {
                    commitInfo.getRepos().forEach(repo -> {
                        Project project = importProjectFromRepo(repo);
                        kubernetesService.createPipelineRun(project);
                    });
                    infinispanService.saveCommit(commitInfo.getCommitId(), commitInfo.getTime());
                }
                infinispanService.saveLastCommit(commitInfo.getCommitId());
            });
        }
    }

    void importCommits() {
        LOGGER.info("Import commits...");
        gitService.getAllCommits().forEach(commitInfo -> {
            infinispanService.saveCommit(commitInfo.getCommitId(), commitInfo.getTime());
            infinispanService.saveLastCommit(commitInfo.getCommitId());
        });
        readyToPull.set(true);
    }

    @ConsumeEvent(value = IMPORT_PROJECTS, blocking = true)
    void importProjects(String data) {
        if (infinispanService.getProjects().isEmpty()) {
            importAllProjects();
        }
        addTemplatesProject();
        importCommits();
    }
    private void importAllProjects() {
        LOGGER.info("Import projects from Git");
        try {
            List<GitRepo> repos = gitService.readProjectsToImport();
            repos.forEach(repo -> {
                Project project = new Project("tempPlaceHolder", repo.getName(), repo.getName(), "", repo.getCommitId(), repo.getLastCommitTimestamp());
                String folderName = repo.getName();
                if (folderName.equals(Project.NAME_TEMPLATES)) {
                    project = new Project(Project.NAME_TEMPLATES, "Templates", "Templates", "", repo.getCommitId(), repo.getLastCommitTimestamp());
                } else if (folderName.equals(Project.NAME_KAMELETS)){
                    project = new Project(Project.NAME_KAMELETS, "Custom Kamelets", "Custom Kamelets", "", repo.getCommitId(), repo.getLastCommitTimestamp());
//                } else if (folderName.equals(Project.NAME_PIPELINES)){
//                    project = new Project(Project.NAME_PIPELINES, "Pipelines", "CI/CD Pipelines", "", repo.getCommitId(), repo.getLastCommitTimestamp());
                } 
                if(project.getName()!="tempPlaceHolder"){
                    infinispanService.saveProject(project, true);
                }
            });
            addKameletsProject();
        } catch (Exception e) {
            LOGGER.error("Error during project import", e);
        }
    }

    public Project importProject(String projectId) {
        LOGGER.info("Import project from Git " + projectId);
        try {
            GitRepo repo = gitService.readProjectFromRepository(projectId);
            return importProjectFromRepo(repo);
        } catch (Exception e) {
            LOGGER.error("Error during project import", e);
            return null;
        }
    }

    private Project importProjectFromRepo(GitRepo repo) {
        LOGGER.info("Import project from GitRepo " + repo.getName());
        try {
            Project project = getProjectFromRepo(repo);
            infinispanService.saveProject(project, true);
            repo.getFiles().forEach(repoFile -> {
                ProjectFile file = new ProjectFile(repoFile.getName(), repoFile.getBody(), repo.getName(), repoFile.getLastCommitTimestamp());
                infinispanService.saveProjectFile(file);
            });
            return project;
        } catch (Exception e) {
            LOGGER.error("Error during project import", e);
            return null;
        }
    }

    public Project getProjectFromRepo(GitRepo repo) {
        String folderName = repo.getName();
        String propertiesFile = ServiceUtil.getPropertiesFile(repo);
        String projectName = ServiceUtil.getProjectName(propertiesFile);
        String projectDescription = ServiceUtil.getProjectDescription(propertiesFile);
        String runtime = ServiceUtil.getProjectRuntime(propertiesFile);
        return new Project(folderName, projectName, projectDescription, runtime, repo.getCommitId(), repo.getLastCommitTimestamp());
    }

    public Project getProjectFromDocument(Document projectDocument){
        Project project = new Project();
        project.setName(projectDocument.getString("name"));
        project.setDescription(projectDocument.getString("description"));
        project.setRuntime(projectDocument.getString("runtime"));
        project.setLastCommit(projectDocument.getLong("lastCommit").toString());
        project.setLastCommitTimestamp(projectDocument.getLong("lastCommitTimestamp"));
        project.setProjectId(projectDocument.getString("projectId"));
        return project;
    }

    public List<ProjectFile> getProjectFilesFromDocument(List<Document> documentFiles){
        List<ProjectFile> files = new ArrayList<>();
        for(Document doc : documentFiles){
            ProjectFile pf = new ProjectFile();
            pf.setName(doc.getString("name"));
            pf.setCode(doc.getString("code"));
            pf.setLastUpdate(doc.getLong("lastCommitTimestamp"));
            files.add(pf);
        }
        return files;
    }

    public Map<String,String> commitAndPushProject(String projectId, String commitMessage,String userName , String accessToken , String repoUri, String branch,String file,String isConflictResolved,String repoOwner,String userEmail,String userId) throws Exception {
        Document projectDocument = mongoService.getProject(userId, projectId);
        Project userProject= getProjectFromDocument(projectDocument);
        List<Document> documentFiles =  mongoService.getProjectFiles(userId, projectId);
        List<ProjectFile> files =  getProjectFilesFromDocument(documentFiles);
        Map<String,String> commitAndPushProjectDetails = gitService.commitAndPushProject(userProject, files, commitMessage,userName,accessToken,repoUri,branch,file,isConflictResolved,repoOwner,userEmail);
        if(commitAndPushProjectDetails.get("commitId") !=null ){
            String commitId = commitAndPushProjectDetails.get("commitId");
            Long lastUpdate = Long.parseLong(commitAndPushProjectDetails.get("lastUpdate"));
            // int commitTime = Integer.parseInt(commitAndPushProjectDetails.get("commitTime"));
            userProject.setLastCommit(commitId);
            userProject.setLastCommitTimestamp(lastUpdate);
            // infinispanService.saveProject(userProject, false);
            // infinispanService.saveCommit(commitId, commitTime);
            //need to update last commit of project in mongo collection,userID
            mongoService.updateProject(userProject,userId);
            // mongoService.updateProjectLastCommit(projectId,commitId);
        }
        return commitAndPushProjectDetails;
    }

    public Map<String,String> pullProject(String projectId,String repoOwner , String accessToken , String repoUri, String branch,String userId) throws Exception{
        //  Project p = infinispanService.getProject(projectId);
        // Project p = infinispanService.getProject(projectId);
        // System.out.println("Project is " + p.getName());
        // List<ProjectFile> files = infinispanService.getProjectFiles(projectId);
        Document projectDocument = mongoService.getProject(userId, projectId);
        Project userProject= getProjectFromDocument(projectDocument);
        List<Document> documentFiles =  mongoService.getProjectFiles(userId, projectId);
        List<ProjectFile> files =  getProjectFilesFromDocument(documentFiles);
        Map<String,String> pullProjectDetails = gitService.pullProject(userProject, files,repoOwner,accessToken,repoUri,branch);
        if(pullProjectDetails.get("newFiles")!=null){
            String newFiles = pullProjectDetails.get("newFiles");
            String[] newFilesArray = newFiles.split("\n");
            for(String newFile : newFilesArray){
                String fileCode = pullProjectDetails.get(newFile);
                ProjectFile file = new ProjectFile(newFile, fileCode, projectId, Instant.now().toEpochMilli(),userId);
                // infinispanService.saveProjectFile(file);
                mongoService.createFile(file);
                pullProjectDetails.remove(newFile);
            }
            pullProjectDetails.remove("newFiles");
        }
        return pullProjectDetails;
    }

    public void getProjectsFromGit(String repoOwner , String accessToken , String repoUri, String branch,String projects,String userId) throws Exception{
        LOGGER.info("Import project from Git " + projects);
        List<GitRepo> repoProjects = gitService.getProjectsFromGit(repoOwner,accessToken,repoUri,branch,projects);
        for(GitRepo repoProject : repoProjects){
            String propertiesFile = ServiceUtil.getPropertiesFile(repoProject);
            String projectName = ServiceUtil.getProjectName(propertiesFile);
            String projectDescription = ServiceUtil.getProjectDescription(propertiesFile);
            String runtime = ServiceUtil.getProjectRuntime(propertiesFile);
            // Project project = new Project(repoProject.getName(), projectName, projectDescription, runtime, repoProject.getLastCommitTimestamp(),userId);
            Project project = new Project(repoProject.getName(), projectName, projectDescription, runtime,repoProject.getCommitId(),userId);
            // infinispanService.saveProject(project, true);
            mongoService.createProject(project);
            for(GitRepoFile repoFile : repoProject.getFiles()){
                ProjectFile file = new ProjectFile(repoFile.getName(), repoFile.getBody(), repoProject.getName(), repoFile.getLastCommitTimestamp(),userId);
                // infinispanService.saveProjectFile(file);
                mongoService.createFile(file);
            }
        }
    }

    void addKameletsProject() {
        LOGGER.info("Add custom kamelets project if not exists");
        try {
            Project kamelets  = infinispanService.getProject(Project.NAME_KAMELETS);
            if (kamelets == null) {
                kamelets = new Project(Project.NAME_KAMELETS, "Custom Kamelets", "Custom Kamelets", "", "", Instant.now().toEpochMilli());
                infinispanService.saveProject(kamelets, true);
                // commitAndPushProject(Project.NAME_KAMELETS, "Add custom kamelets","shash","shash","shash","shash");
            }
        } catch (Exception e) {
            LOGGER.error("Error during custom kamelets project creation", e);
        }
    }

    void addTemplatesProject() {
        LOGGER.info("Add templates project if not exists");
        try {
            Project templates  = infinispanService.getProject(Project.NAME_TEMPLATES);
            if (templates == null) {
                templates = new Project(Project.NAME_TEMPLATES, "Templates", "Templates", "", "", Instant.now().toEpochMilli());
                infinispanService.saveProject(templates, true);

                codeService.getApplicationPropertiesTemplates().forEach((name, value) -> {
                    ProjectFile file = new ProjectFile(name, value, Project.NAME_TEMPLATES, Instant.now().toEpochMilli());
                    infinispanService.saveProjectFile(file);
                });
                // commitAndPushProject(Project.NAME_TEMPLATES, "Add default templates","shash","shash","shash","shash");
            }
        } catch (Exception e) {
            LOGGER.error("Error during templates project creation", e);
        }
    }

    void addPipelinesProject() {
        LOGGER.info("Add pipelines project if not exists");
        try {
            Project pipelines  = infinispanService.getProject(Project.NAME_PIPELINES);
            if (pipelines == null) {
                pipelines = new Project(Project.NAME_PIPELINES, "Pipelines", "CI/CD Pipelines", "", "", Instant.now().toEpochMilli());
                infinispanService.saveProject(pipelines, true);

                codeService.getApplicationPropertiesTemplates().forEach((name, value) -> {
                    ProjectFile file = new ProjectFile(name, value, Project.NAME_PIPELINES, Instant.now().toEpochMilli());
                    infinispanService.saveProjectFile(file);
                });
                // commitAndPushProject(Project.NAME_PIPELINES, "Add default pipelines","shash","shash","shash","shash");
            }
        } catch (Exception e) {
            LOGGER.error("Error during pipelines project creation", e);
        }
    }
}
