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

import io.fabric8.kubernetes.api.model.Secret;
import io.smallrye.mutiny.tuples.Tuple2;
import io.vertx.core.Vertx;

// import org.apache.camel.component.extension.ComponentVerifierExtension.VerificationError.Code;
import org.apache.camel.karavan.model.CommitInfo;
import org.apache.camel.karavan.model.GitConfig;
import org.apache.camel.karavan.model.GitPushConfig;
import org.apache.camel.karavan.model.GitRepo;
import org.apache.camel.karavan.model.GitRepoFile;
import org.apache.camel.karavan.model.Project;
import org.apache.camel.karavan.model.ProjectFile;
import org.apache.camel.karavan.model.GitRepoProjects;
import org.eclipse.jgit.api.CheckoutCommand;
import org.eclipse.jgit.api.CloneCommand;
import org.eclipse.jgit.api.FetchCommand;
import org.eclipse.jgit.api.Git;
// import org.eclipse.jgit.api.MergeResult;
import org.eclipse.jgit.api.PullCommand;
import org.eclipse.jgit.api.PullResult;
import org.eclipse.jgit.api.RemoteAddCommand;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.api.errors.NoFilepatternException;
import org.eclipse.jgit.api.errors.NoHeadException;
import org.eclipse.jgit.api.errors.RefNotFoundException;
import org.eclipse.jgit.api.errors.TransportException;
import org.eclipse.jgit.diff.DiffEntry;
import org.eclipse.jgit.diff.DiffFormatter;
import org.eclipse.jgit.errors.AmbiguousObjectException;
import org.eclipse.jgit.errors.IncorrectObjectTypeException;
import org.eclipse.jgit.errors.RevisionSyntaxException;
import org.eclipse.jgit.lib.ObjectId;
import org.eclipse.jgit.lib.ObjectReader;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.merge.MergeStrategy;
import org.eclipse.jgit.revwalk.RevCommit;
import org.eclipse.jgit.transport.CredentialsProvider;
import org.eclipse.jgit.transport.FetchResult;
import org.eclipse.jgit.transport.PushResult;
import org.eclipse.jgit.transport.RefSpec;
import org.eclipse.jgit.transport.RemoteRefUpdate;
import org.eclipse.jgit.transport.URIish;
import org.eclipse.jgit.transport.UsernamePasswordCredentialsProvider;
import org.eclipse.jgit.treewalk.CanonicalTreeParser;
import org.eclipse.jgit.treewalk.TreeWalk;
import org.eclipse.jgit.treewalk.filter.TreeFilter;
import org.eclipse.microprofile.config.ConfigProvider;
import org.jboss.logging.Logger;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

@ApplicationScoped
public class GitService {

    @Inject
    Vertx vertx;

    @Inject
    KubernetesService kubernetesService;

    private Git gitForImport;

    private static final Logger LOGGER = Logger.getLogger(GitService.class.getName());

    public Git getGitForImport(){
        if (gitForImport == null) {
            try {
                gitForImport = getGit(true, vertx.fileSystem().createTempDirectoryBlocking("import"));
            } catch (Exception e) {
                LOGGER.error("Error", e);
            }
        }
        return gitForImport;
    }

    public List<CommitInfo> getAllCommits() {
        List<CommitInfo> result = new ArrayList<>();
        try {
            Git pollGit = getGitForImport();
            if (pollGit != null) {
                StreamSupport.stream(pollGit.log().all().call().spliterator(), false)
                        .sorted(Comparator.comparingInt(RevCommit::getCommitTime))
                        .forEach(commit -> result.add(new CommitInfo(commit.getName(), commit.getCommitTime())));
            }
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
        }
        return result;
    }

    public List<CommitInfo> getCommitsAfterCommit(int commitTime) {
        List<CommitInfo> result = new ArrayList<>();
        try {
            Git pollGit = getGitForImport();
            if (pollGit != null) {
                GitConfig gitConfig = getGitConfig();
                CredentialsProvider cred = new UsernamePasswordCredentialsProvider(gitConfig.getUsername(), gitConfig.getPassword());
                pull(pollGit, cred);
                List<RevCommit> commits = StreamSupport.stream(pollGit.log().all().call().spliterator(), false)
                        .filter(commit -> commit.getCommitTime() > commitTime)
                        .sorted(Comparator.comparingInt(RevCommit::getCommitTime)).collect(Collectors.toList());
                for (RevCommit commit: commits) {
                    List<String> projects = new ArrayList<>(getChangedProjects(commit));
                    List<GitRepo> repo = readProjectsFromRepository(pollGit,"", projects.toArray(new String[projects.size()]));
                    result.add(new CommitInfo(commit.getName(), commit.getCommitTime(), repo));
                }
            }
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
        }
        return result;
    }

    public GitConfig getGitConfig() {
        String propertiesPrefix = "karavan.";
        String branch = ConfigProvider.getConfig().getValue(propertiesPrefix + "git-branch", String.class);
        if (kubernetesService.inKubernetes()) {
            // System.out.println("inKubernetes inKubernetes inKubernetes " + kubernetesService.getNamespace());
            LOGGER.info("inKubernetes " + kubernetesService.getNamespace());
            Secret secret = kubernetesService.getKaravanSecret();
            String uri = new String(Base64.getDecoder().decode(secret.getData().get("git-repository").getBytes(StandardCharsets.UTF_8)));
            String username = new String(Base64.getDecoder().decode(secret.getData().get("git-username").getBytes(StandardCharsets.UTF_8)));
            String password = new String(Base64.getDecoder().decode(secret.getData().get("git-password").getBytes(StandardCharsets.UTF_8)));
            if (secret.getData().containsKey("git-branch")) {
                branch = new String(Base64.getDecoder().decode(secret.getData().get("git-branch").getBytes(StandardCharsets.UTF_8)));
            }
            return new GitConfig(uri, username, password, branch);
        } else {
            String uri = ConfigProvider.getConfig().getValue(propertiesPrefix + "git-repository", String.class);
            String username = ConfigProvider.getConfig().getValue(propertiesPrefix + "git-username", String.class);
            String password = ConfigProvider.getConfig().getValue(propertiesPrefix + "git-password", String.class);
            return new GitConfig(uri, username, password, branch);
        }
    }
 //last commit of the branch and path
    public String getLastCommit(Git git) throws NoHeadException, GitAPIException{
        Iterable<RevCommit> commits = git.log().setMaxCount(1).call();
        RevCommit branchCommit = null;
        for (RevCommit commit : commits) {
            if (branchCommit == null) {
                branchCommit = commit;
                break;
            }
        }
        return branchCommit.getId().getName();
    }

    public Map<String,String> commitAndPushProject(Project project, List<ProjectFile> files, String commitMessage, String userName , String accessToken , String repoUri , String branch,String fileSelected,String isConflictResolved,String repoOwner,String userEmail) throws GitAPIException, IOException, URISyntaxException {
        CredentialsProvider cred = new UsernamePasswordCredentialsProvider(repoOwner, accessToken);
        GitPushConfig gitPushConfig = new GitPushConfig(userName,commitMessage, repoUri, branch, userEmail);
        String uuid = UUID.randomUUID().toString();
        String folder = vertx.fileSystem().createTempDirectoryBlocking(uuid);
        boolean isBranchExists = true;
        LOGGER.info("Temp folder created " + folder);
        Git git = null;
        try {
            git = clone(folder, repoUri, branch, cred);
            checkout(git, true, null, null, "intermediate-merge-branch");
        } catch (RefNotFoundException | TransportException e) {
            LOGGER.error("New repository");
            git = clone(folder, repoUri, "main", cred);
            checkout(git, true, null, null, branch);
            isBranchExists = false;
        } catch (Exception e) {
            LOGGER.error("Error", e);
        }
        Tuple2<String, Integer> repoCommit = lastCommit(git, project.getProjectId());
        String repoLastCommitId =repoCommit.getItem1();
        String repoBranchUri = repoUri+"/"+branch;
        boolean isProjectExists = checkIfProjectExists(folder,"/"+project.getProjectId());
        Iterator<ProjectFile> Iterator = files.iterator();
        while (Iterator.hasNext()) {
            ProjectFile file = Iterator.next();
            LOGGER.info("file.getLastCommit(repoBranchUri)"+file.getLastCommit(repoBranchUri));
            if (file.getLastCommit(repoBranchUri)!=null && file.getLastCommit(repoBranchUri).equals(repoLastCommitId)) {
                LOGGER.info("Removing file from list as it is already pushed"+file.getLastCommit(repoBranchUri)+"repo"+repoLastCommitId + file.getName());
                Iterator.remove();
            }
        }
        writeProjectToFolder(folder, project, files,fileSelected);
        addDeletedFilesToIndex(git, folder, project, files);
        if(!isBranchExists){
            LOGGER.info("Pushing to new branch");
            return pushProjectToNewBranch(git,folder, project, files,fileSelected,gitPushConfig,cred);
        }
        else{
            // && !lastCommitId.equals(project.getLastCommit())
            if(isProjectExists && files.size()>0){
                LOGGER.info("Pushing existing project which is not resolved");
                Map<String,String> pushProjectDetails = pushExistingProject(git,folder, project, files,fileSelected,gitPushConfig,cred);
                Tuple2<String, Integer> commit = lastCommit(git, project.getProjectId());
                pushProjectDetails.put("commitId",commit.getItem1());
                return pushProjectDetails;
            }else{
                LOGGER.info("Pushing new project");
                return pushNewProject(git,folder, project, files,fileSelected,gitPushConfig,cred);
            }
        }
    }

    public boolean checkIfProjectExists(String folder,String project) throws IOException {
        boolean projectExists = false;
        String path = folder + project;
        LOGGER.info("checkIfProjectExists "+path);
        try (Stream<Path> filePathStream=Files.walk(Paths.get(folder))) {
            if(filePathStream.anyMatch(filePath -> filePath.toString().equals(path))){
                projectExists = true;
                LOGGER.info("Project exists");
            }
            }catch (IOException e) {
                e.printStackTrace();
            }
        return projectExists;
    }

    public  Map<String,String> pushExistingProject(Git git,String folder, Project project, List<ProjectFile> files,String fileSelected,GitPushConfig gitPushConfig, CredentialsProvider cred) throws GitAPIException, IOException, URISyntaxException, TransportException{
        LOGGER.info("Commit and push changes " + fileSelected);
        RevCommit commit = addFilesAndCommit(git,gitPushConfig);
        Repository repository = git.getRepository();
        ObjectId newBranchId = repository.resolve("HEAD");
        checkout(git, false, null, null, gitPushConfig.getBranch());
        Map<String,String> fileNameAndCode = fileNameAndCodeMap(files);
        Map<String,String> commitAndPushDetails = new HashMap<String,String>();
        commitAndPushDetails = detectMergeConflicts(git,newBranchId,fileNameAndCode,"Push");
        commitAndPushDetails.put("commitId",commit.getId().getName());
        if(commitAndPushDetails.get("isConflictPresent") == null){
            mergeLocalBranches(git);
            commitAndPushDetails = commitAddedAndPush(git, gitPushConfig.getBranch(), cred, commitAndPushDetails,commit);
        }
        return commitAndPushDetails;
    }
    public  Map<String,String> pushNewProject(Git git,String folder, Project project, List<ProjectFile> files,String fileSelected,GitPushConfig gitPushConfig,CredentialsProvider cred) throws GitAPIException, IOException, URISyntaxException, TransportException {
        LOGGER.info("Commit and push changes " + fileSelected);
        RevCommit commit = addFilesAndCommit(git,gitPushConfig);
        checkout(git, false, null, null, gitPushConfig.getBranch());
        Map<String,String> commitAndPushDetails = new HashMap<String,String>();
        mergeLocalBranches(git);
        commitAndPushDetails = commitAddedAndPush(git, gitPushConfig.getBranch(), cred, commitAndPushDetails,commit);
        return commitAndPushDetails;
    }
    public Map<String,String> pushProjectToNewBranch(Git git,String folder, Project project, List<ProjectFile> files,String fileSelected,GitPushConfig gitPushConfig,CredentialsProvider cred) throws GitAPIException, IOException, URISyntaxException, TransportException{
        LOGGER.info("Commit and push changes " + fileSelected);
        RevCommit commit = addFilesAndCommit(git,gitPushConfig);
        Map<String,String> commitAndPushDetails = new HashMap<String,String>();
        commitAndPushDetails = commitAddedAndPush(git, gitPushConfig.getBranch(), cred, commitAndPushDetails,commit);
        return commitAndPushDetails;
    }
    public  Map<String,String> pullExistingProject(Git git,String folder, Project project, List<ProjectFile> files,String fileSelected,GitPushConfig gitPushConfig, CredentialsProvider cred) throws GitAPIException, IOException, URISyntaxException, TransportException{
        LOGGER.info("Commit and push changes " + fileSelected);
        RevCommit commit = addFilesAndCommit(git,gitPushConfig);
        Repository repository = git.getRepository();
        ObjectId newBranchId = repository.resolve("HEAD");
        checkout(git, false, null, null, gitPushConfig.getBranch());
        Map<String,String> fileNameAndCode = fileNameAndCodeMap(files);
        Map<String,String> pullProjectDetails = new HashMap<String,String>();
        pullProjectDetails = detectMergeConflicts(git,newBranchId,fileNameAndCode,"Pull");
        LOGGER.info("pullProjectDetails "+pullProjectDetails);
        return pullProjectDetails;
    }

    public void mergeLocalBranches(Git git) throws GitAPIException, RevisionSyntaxException, AmbiguousObjectException, IncorrectObjectTypeException, IOException{
        LOGGER.info("Merge local branches");
        git.merge()
        .setStrategy(MergeStrategy.RESOLVE)
        .include(git.getRepository().resolve("intermediate-merge-branch"))
        .call();
    }
    
    public RevCommit addFilesAndCommit(Git git,GitPushConfig gitPushConfig) throws NoFilepatternException, GitAPIException{
        LOGGER.info("Git add: " + git.add().addFilepattern(".").call());
        RevCommit commit = git.commit().setMessage(gitPushConfig.getCommitMessage()).setAuthor(gitPushConfig.getUsername(), gitPushConfig.getUserEmail()).call();
        LOGGER.info("Git commit: " + commit);
        return commit;
    }
    
    private void addDeletedFilesToIndex(Git git, String folder, Project project, List<ProjectFile> files) throws IOException {
        Path path = Paths.get(folder, project.getProjectId());
        LOGGER.info("Add deleted files to git index for project " + project.getProjectId());
        vertx.fileSystem().readDirBlocking(path.toString()).forEach(f -> {
            String[] filenames = f.split(File.separator);
            String filename = filenames[filenames.length - 1];
            LOGGER.info("Checking file " + filename);
            if (files.stream().filter(pf -> Objects.equals(pf.getName(), filename)).count() == 0) {
                try {
                    LOGGER.info("Add deleted file " + filename);
                    git.rm().addFilepattern(project.getProjectId() + File.separator + filename).call();
                } catch (GitAPIException e) {
                    throw new RuntimeException(e);
                }
            }
        });
    }
    
    
    public Map<String,String> fileNameAndCodeMap(List<ProjectFile> files){
        Map<String,String> fileNameAndCodeMap = new HashMap<String,String>();
        for(ProjectFile file:files){
            fileNameAndCodeMap.put(file.getName(),file.getCode());
        }
        return fileNameAndCodeMap;
    }
    
    public Map<String,String> commitAddedAndPush(Git git, String branch, CredentialsProvider cred,Map<String,String> commitAndPushDetails,RevCommit commit) throws GitAPIException, IOException ,TransportException{
        Iterable<PushResult> results = git.push().add(branch).setRemote("origin").setCredentialsProvider(cred).call();
        for (PushResult result : results) {
            for (RemoteRefUpdate update : result.getRemoteUpdates()) {
                if (update.getStatus() == RemoteRefUpdate.Status.OK) {
                    commitAndPushDetails.put("commitId",commit.getId().getName());
                    commitAndPushDetails.put("lastUpdate", commit.getCommitTime() * 1000L+"");
                    commitAndPushDetails.put("commitTime",commit.getCommitTime()+"");
                    commitAndPushDetails.remove("isConflictPresent");
                    LOGGER.info("Push to " + update.getRemoteName() + " was successful");
                } else if (update.getStatus() == RemoteRefUpdate.Status.REJECTED_NONFASTFORWARD) {
                    LOGGER.error("Push to " + update.getRemoteName() + " was rejected as it is not a fast-forward");
                } else {
                    LOGGER.error("Push to " + update.getRemoteName() + " returned an unknown status");
                }
            }
        }
        return commitAndPushDetails;
    }
    private Map<String,String> detectMergeConflicts(Git git, ObjectId newBranchId,Map<String,String> fileNameAndCode,String gitOperation) throws IOException, GitAPIException {
        // Get the Git repository
        Repository repository = git.getRepository();
        // Get the two different copies of the file
        // ObjectId baseId = repository.resolve("HEAD^");
        LOGGER.info("newBranchId id: " + newBranchId);
        ObjectId baseId = repository.resolve("HEAD");
        RevCommit baseCommit = repository.parseCommit(baseId);
        RevCommit ourCommit = repository.parseCommit(newBranchId);
        LOGGER.info("Base id: " + baseId);
        LOGGER.info("Our id: " + newBranchId);

        // Create a tree parser for the base tree
        CanonicalTreeParser ourTreeIter = new CanonicalTreeParser();
        try (ObjectReader reader = repository.newObjectReader()) {
            ourTreeIter.reset(reader, ourCommit.getTree().getId());
        }
        LOGGER.info("Our tree: " + ourTreeIter);

        CanonicalTreeParser baseTreeIter = new CanonicalTreeParser();
        try (ObjectReader reader = repository.newObjectReader()) {
            baseTreeIter.reset(reader, baseCommit.getTree().getId());
        }
        LOGGER.info("Base tree: " + baseTreeIter);
        // Create a tree parser for our tree
        // Get the diff between the two copies
        List<DiffEntry> diffEntries = new Git(repository).diff()
                .setOldTree(baseTreeIter)
                .setNewTree(ourTreeIter)
                .call();
        // LOGGER.info("Diff entries: " + diffEntries);
        HashMap<String, String> diffMap = new HashMap<>();
        try (
            FileOutputStream outputStream = new FileOutputStream("diff.txt");
            DiffFormatter diffFormatter = new DiffFormatter(outputStream)){
            diffFormatter.setRepository(repository);
            for (DiffEntry diffEntry : diffEntries) {
                // if (diffEntry.getChangeType().name().equals("CONFLICT")) {
                    // System.out.println("Conflict detected in file new " + diffEntry.getPath(DiffEntry.Side.NEW));
                    diffFormatter.format(diffEntry);
                    String diff = new String(Files.readAllBytes(Paths.get("diff.txt")));
                    diffMap.put(diffEntry.getPath(DiffEntry.Side.OLD), diff);
                    System.out.println("Conflict detected in file old " + diffEntry.getPath(DiffEntry.Side.OLD));
                    outputStream.getChannel().truncate(0);
            }
            outputStream.close();
    }
    //iterate diffmap and get the file name and diff
    Map<String,String> result = new HashMap<String,String>();
    for (Map.Entry<String, String> entry : diffMap.entrySet()) {
        String[] lines =  entry.getValue().split("\\n"); 
        int startLineIndex = 0;
        while (!lines[startLineIndex].startsWith("@@")) {
            startLineIndex++;
        }
        String changedFileContent = String.join("\n", Arrays.copyOfRange(lines, startLineIndex+1, lines.length));
        // LOGGER.info("changedFileContent: " + changedFileContent);
        String fileCode = fileNameAndCode.get(entry.getKey().split("/")[1]);
        if(fileCode!=null){
            String fileCodeInConflictFormat = getConflictFormat(entry.getKey(), changedFileContent,fileCode);
            if(fileCodeInConflictFormat!=null && fileCodeInConflictFormat.contains("<<<<<<< HEAD") && fileCodeInConflictFormat.contains(">>>>>>>") && fileCodeInConflictFormat.contains("=======")){
                result.put(entry.getKey().split("/")[1],fileCodeInConflictFormat);
                result.put("isConflictPresent","true");
            }
        }
        else if(gitOperation.equals("Pull") && entry.getKey()!="/dev/null"){
            String newFileCode = removeConflictMarkers(changedFileContent);
            if(result.get("newFiles")!=null){
                result.put("newFiles",result.get("newFiles")+"\n"+entry.getKey().split("/")[1]);
            }
            else{
                result.put("newFiles",entry.getKey().split("/")[1]);
            }
            result.put(entry.getKey().split("/")[1],newFileCode);
        }
    }
    return result;
}

private String getConflictFormat(String filename , String code ,String fileCode){
    // LOGGER.info("filename: " + code);
    String[] lines = code.split("\n");
    fileCode = fileCode+'\n';
    StringBuilder sb = new StringBuilder();
    StringBuilder diffString = new StringBuilder();
    for (int i = 0; i < lines.length; i++) {
        
        if (lines[i].startsWith("-")) {
            sb.append("<<<<<<< HEAD current\n");
            sb.append(lines[i].substring(1)).append("\n");
            while (i + 1 < lines.length && lines[i + 1].startsWith("-")) {
                // sb.append(lines[++i].substring(1)).append("\n");
                sb.append(lines[++i]).append("\n");
            }
            sb.append("=======\n");
            while (i + 1 < lines.length && !lines[i + 1].startsWith("-") && lines[i + 1].startsWith("+")) {
                i++;
                // sb.append(lines[i].substring(1)).append("\n");
                sb.append(lines[i]).append("\n");
                diffString.append(lines[i].substring(1)).append("\n");
            }
            sb.append(">>>>>>> intermediate-merging-branch incoming\n");
        } else if(lines[i].startsWith("+")){
            sb.append("<<<<<<< HEAD current\n");
            sb.append("=======\n");
            while(i<lines.length && !lines[i].startsWith("-") && lines[i].startsWith("+")){
                // sb.append(lines[i].substring(1)).append("\n");
                sb.append(lines[i]).append("\n");
                diffString.append(lines[i].substring(1)).append("\n");
                i++;
            }
            sb.append(">>>>>>> intermediate-merging-branch incoming\n");
        }
        else if(!lines[i].startsWith("@")){
            // sb.append(lines[i].substring(1)).append("\n");
            sb.append('+'+lines[i].substring(1)).append("\n");
            diffString.append(lines[i].substring(1)).append("\n");
        }
        if( fileCode!=null && !diffString.toString().equals("") && fileCode.contains(diffString.toString())){
            String escapedDiffString = Pattern.quote(diffString.toString());
            // String pattern = "(?<!\\Q+)" + escapedDiffString ;
            // String pattern = "(?<!\\Q\\+\\E)" + "+"+escapedDiffString;
            Pattern pattern = Pattern.compile("^(?!\\+)" + escapedDiffString.replace("+", "\\+"), Pattern.MULTILINE);
            Matcher matcher = pattern.matcher(fileCode);

            if (matcher.find()) {
                String replacedString = matcher.replaceFirst(sb.toString());
                // String replacedString = fileCode.replaceFirst(pattern, sb.toString());
                if(!replacedString.equals(fileCode)){
                    fileCode = replacedString;
                    diffString.setLength(0);
                    sb.setLength(0);
                }
            } 
        }
    }
    fileCode = removeConflictMarkers(fileCode);
    LOGGER.info("fileCode: " + fileCode);
    return fileCode;
}

private String removeConflictMarkers(String fileCode){
    String[] lines = fileCode.split("\n");
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < lines.length; i++) {
        if (lines[i].startsWith("+") || lines[i].startsWith("-")) {
            sb.append(lines[i].substring(1)).append("\n");
        } else {
            sb.append(lines[i]).append("\n");
        }
    }
    return sb.toString();
}

public Map<String,String> pullProject(Project project, List<ProjectFile> files, String repoOwner, String accessToken , String repoUri , String branch) throws GitAPIException, IOException, URISyntaxException  {
        LOGGER.info("Pulling project " + project.getProjectId());
        CredentialsProvider cred = new UsernamePasswordCredentialsProvider(repoOwner, accessToken);
        GitPushConfig gitPushConfig = new GitPushConfig("","", repoUri, branch, "");
        String uuid = UUID.randomUUID().toString();
        String folder = vertx.fileSystem().createTempDirectoryBlocking(uuid);
        LOGGER.info("Temp folder created " + folder);
        Git git = null;
        try {
            git = clone(folder, repoUri, branch, cred);
            checkout(git, true, null, null, "intermediate-merge-branch");
        } catch (RefNotFoundException | TransportException e) {
            return new HashMap<>();
        } catch (Exception e) {
            LOGGER.error("Error", e);
        }
        String repoLastCommitId = getLastCommit(git);
        String repoBranchUri = repoUri+"/"+branch;
        boolean isProjectExists = checkIfProjectExists(folder,"/"+project.getProjectId());
        Iterator<ProjectFile> iterator = files.iterator();
        while (iterator.hasNext()) {
            ProjectFile file = iterator.next();
            if (file.getLastCommit(repoBranchUri)!=null && file.getLastCommit(repoBranchUri).equals(repoLastCommitId)) {
                LOGGER.info("Removing file from list as it is already pushed"+file.getLastCommit(repoBranchUri)+"repo"+repoLastCommitId);
                iterator.remove();
            }
        }
        writeProjectToFolder(folder, project, files,".");
        addDeletedFilesToIndex(git, folder, project, files);
        if(isProjectExists){
            LOGGER.info("pulling existing project");
            Map<String,String> pullProjectDetails =  pullExistingProject(git,folder, project, files,".",gitPushConfig,cred);
            Tuple2<String, Integer> commit = lastCommit(git, project.getProjectId());
            pullProjectDetails.put("commitId",commit.getItem1());
            return pullProjectDetails;
        }
        return new HashMap<>();
}

// public void getProjectsFromGit

    public List<GitRepo> readProjectsToImport() {
        Git importGit = getGitForImport();
        if (importGit != null) {
            return readProjectsFromRepository(importGit, null);
        }
        return new ArrayList<>(0);
    }

    public GitRepo readProjectFromRepository(String projectId) {
        Git git = null;
        try {
            git = getGit(true, vertx.fileSystem().createTempDirectoryBlocking(UUID.randomUUID().toString()));
        } catch (Exception e) {
            LOGGER.error("Error", e);
        }
        return readProjectsFromRepository(git, projectId).get(0);
    }

    public List<GitRepo> getProjectsFromGit(String repoOwner, String accessToken, String repoUri, String branch,String existingProjects) throws GitAPIException, IOException, URISyntaxException {
        CredentialsProvider cred = new UsernamePasswordCredentialsProvider(repoOwner, accessToken);
        GitPushConfig gitPushConfig = new GitPushConfig("","", repoUri, branch, "");
        String uuid = UUID.randomUUID().toString();
        String folder = vertx.fileSystem().createTempDirectoryBlocking(uuid);
        Git git = null;
        existingProjects = existingProjects!=null?existingProjects:"";
        try {
            git = clone(folder, gitPushConfig.getUri(), gitPushConfig.getBranch(), cred);
            checkout(git, false, null, null,gitPushConfig.getBranch());
        } catch (RefNotFoundException | TransportException e) {
            LOGGER.error("New repository");
            git = init(folder, gitPushConfig.getUri(), gitPushConfig.getBranch());
        } catch (Exception e) {
            LOGGER.error("Error", e);
        }
        List<GitRepo> repoProjects = readProjectsFromUserRepo(git,existingProjects, null);
        //iterate over repoProjects and display all projects
        return repoProjects;
    }


    private List<GitRepo> readProjectsFromUserRepo(Git git,String existingProjects,String... filter) {
        LOGGER.info("Read projects...");
        List<GitRepo> result = new ArrayList<>();
        try {
            String folder = git.getRepository().getDirectory().getAbsolutePath().replace("/.git", "");
            List<String> projects = readProjectsFromFolder(folder,existingProjects,filter);
            //all folder names present here are projects
            for (String project : projects) {
                Map<String, String> filesRead = readProjectFilesFromFolder(folder, project);
                List<GitRepoFile> files = new ArrayList<>(filesRead.size());
                for (Map.Entry<String, String> entry : filesRead.entrySet()) {
                    String name = entry.getKey();
                    String body = entry.getValue();
                    Tuple2<String, Integer> fileCommit = lastCommit(git, project + File.separator + name);
                    files.add(new GitRepoFile(name, Integer.valueOf(fileCommit.getItem2()).longValue() * 1000, body));
                }
                Tuple2<String, Integer> commit = lastCommit(git, project);
                GitRepo repo = new GitRepo(project, commit.getItem1(), Integer.valueOf(commit.getItem2()).longValue() * 1000, files);
                result.add(repo);
            }
            return result;
        } catch (RefNotFoundException e) {
            LOGGER.error("New repository");
            return result;
        } catch (Exception e) {
            LOGGER.error("Error", e);
            return result;
        }
    }


    private List<GitRepo> readProjectsFromRepository(Git git,String existingProjects,String... filter) {
        LOGGER.info("Read projects...");
        List<GitRepo> result = new ArrayList<>();
        try {
            String folder = git.getRepository().getDirectory().getAbsolutePath().replace("/.git", "");
            List<String> projects = readProjectsFromFolder(folder,existingProjects,filter);
            //all folder names present here are projects
            for (String project : projects) {
                Map<String, String> filesRead = readProjectFilesFromFolder(folder, project);
                List<GitRepoFile> files = new ArrayList<>(filesRead.size());
                String projectPathString = folder + File.separator + project;
                if(Files.isDirectory(Paths.get(projectPathString))){
                    projectPathString = project+File.separator;
                }
                else{
                    projectPathString = "";
                }
                for (Map.Entry<String, String> entry : filesRead.entrySet()) {
                    String name = entry.getKey();
                    String body = entry.getValue();
                    Tuple2<String, Integer> fileCommit = lastCommit(git, projectPathString+ name);
                    files.add(new GitRepoFile(name, Integer.valueOf(fileCommit.getItem2()).longValue() * 1000, body));
                }
                Tuple2<String, Integer> commit = lastCommit(git, project);
                GitRepo repo = new GitRepo(project, commit.getItem1(), Integer.valueOf(commit.getItem2()).longValue() * 1000, files);
                result.add(repo);
            }
            return result;
        } catch (RefNotFoundException e) {
            LOGGER.error("New repository");
            return result;
        } catch (Exception e) {
            LOGGER.error("Error", e);
            return result;
        }
    }

    private List<String> readProjectsFromFolder(String folder, String existingProjects, String... filter) {
        LOGGER.info("Read projects from " + folder);
        List<String> files = new ArrayList<>();
        HashSet<String> compatibleFiles = new HashSet<>(Arrays.asList("json", "yaml", "java", "properties"));
        existingProjects = existingProjects!=null?existingProjects:"";
        //check with id not with name
        HashSet<String> existingProjectsSet = new HashSet<>(Arrays.asList(existingProjects.split(",")));
        vertx.fileSystem().readDirBlocking(folder).forEach(path -> {
            LOGGER.info("Read path " + path);
            String[] filenames = path.split(File.separator);
            String folderName = filenames[filenames.length - 1];
            LOGGER.info("Read folder " + folderName);
            int lastDotIndex = folderName.lastIndexOf(".");
            String extension = "";
            if (lastDotIndex != -1 && lastDotIndex < folderName.length() - 1) {
                    extension = folderName.substring(lastDotIndex + 1);
            }
            if (folderName.startsWith(".")) {
                // skip hidden
            } else if (Files.isDirectory(Paths.get(path)) && !existingProjectsSet.contains(folderName.toLowerCase()) ) {
                if (filter == null || Arrays.stream(filter).filter(f -> f.equals(folderName)).findFirst().isPresent()) {
                    LOGGER.info("Importing project from folder " + folderName);
                    files.add(folderName);
                    //gives me all folder existing in specified github repo
                }
            }
            else if(Files.isRegularFile(Paths.get(path)) && compatibleFiles.contains(extension) && !existingProjectsSet.contains(folderName.toLowerCase())){
                files.add(folderName);
            }
        });
        return files;
    }

    private Map<String, String> readProjectFilesFromFolder(String repoFolder, String projectFolder) {
        Map<String, String> files = new HashMap<>();
        String projectPathString = repoFolder + File.separator + projectFolder;
        HashSet<String> compatibleFiles = new HashSet<>(Arrays.asList("json", "yaml", "java", "properties"));
        Path projectPath = Paths.get(projectPathString);
        if(Files.isRegularFile(projectPath)){
            readProjectFilesFromRepoFolder(repoFolder, projectFolder);
        }
        else if (Files.isDirectory(Paths.get(repoFolder + File.separator + projectFolder))){
            vertx.fileSystem().readDirBlocking(repoFolder + File.separator + projectFolder).forEach(f -> {
                String[] filenames = f.split(File.separator);
                String filename = filenames[filenames.length - 1];
                Path path = Paths.get(f);
                int lastDotIndex = filename.lastIndexOf(".");
                String extension = "";
                if (lastDotIndex != -1 && lastDotIndex < filename.length() - 1) {
                     extension = filename.substring(lastDotIndex + 1);
                }
                if (!filename.startsWith(".") && !Files.isDirectory(path)&& compatibleFiles.contains(extension)) {
                    LOGGER.info("Importing file " + filename);
                    try {
                        files.put(filename, Files.readString(path));
                    } catch (IOException e) {
                        LOGGER.error("Error during file read", e);
                    }
                }
            });
        }
        return files;
    }
    private Map<String, String> readProjectFilesFromRepoFolder(String repoFolder, String projectFile) {
        String filePath = repoFolder + File.separator + projectFile;
        HashSet<String> compatibleFiles = new HashSet<>(Arrays.asList("json", "yaml", "java", "properties"));
        Path path = Paths.get(filePath);
        Map<String, String> files = new HashMap<>();
        if (Files.isRegularFile(path)) {
            String filename = path.getFileName().toString();
            int lastDotIndex = filename.lastIndexOf(".");
            String extension = "";
            if (lastDotIndex != -1 && lastDotIndex < filename.length() - 1) {
                extension = filename.substring(lastDotIndex + 1);
            }
            if (!filename.startsWith(".") && compatibleFiles.contains(extension)) {
                LOGGER.info("Importing file " + filename);
                try {
                    LOGGER.info("File content " + Files.readString(path));
                    files.put(filename, Files.readString(path));
                } catch (IOException e) {
                    LOGGER.error("Error during file read", e);
                }
            }
        } else {
            LOGGER.error("The 'shash' file does not exist or is not a regular file.");
        }
        return files;
    }

    public Git getGit(boolean checkout, String folder) throws GitAPIException, IOException, URISyntaxException {
        LOGGER.info("Git checkout");
        GitConfig gitConfig = getGitConfig();
        CredentialsProvider cred = new UsernamePasswordCredentialsProvider(gitConfig.getUsername(), gitConfig.getPassword());
        LOGGER.info("Temp folder created " + folder);
        Git git = null;
        try {
            git = clone(folder, gitConfig.getUri(), gitConfig.getBranch(), cred);
            if (checkout) {
                checkout(git, false, null, null, gitConfig.getBranch());
            }
        } catch (RefNotFoundException | TransportException e) {
            LOGGER.error("New repository");
            git = init(folder, gitConfig.getUri(), gitConfig.getBranch());
        } catch (Exception e) {
            LOGGER.error("Error", e);
        }
        return git;
    }

    private List<Tuple2<String, String>> readKameletsFromFolder(String folder) {
        LOGGER.info("Read kamelets from " + folder);
        List<Tuple2<String, String>> kamelets = new ArrayList<>();
        vertx.fileSystem().readDirBlocking(folder).stream().filter(f -> f.endsWith("kamelet.yaml")).forEach(f -> {
            Path path = Paths.get(f);
            try {
                String yaml = Files.readString(path);
                kamelets.add(Tuple2.of(path.getFileName().toString(), yaml));
            } catch (IOException e) {
                LOGGER.error("Error during file read", e);
            }
        });
        return kamelets;
    }


    private void writeProjectToFolder(String folder, Project project, List<ProjectFile> files,String fileSelected) throws IOException {
        Files.createDirectories(Paths.get(folder, project.getProjectId()));
        LOGGER.info("Write files to path " + Paths.get(folder, project.getProjectId()));
        LOGGER.info("Write files for project " + project.getProjectId());
        LOGGER.info("Write files for project " + fileSelected);
        for (ProjectFile file : files) {
            LOGGER.info("writing project file "+ file);
            Files.writeString(Paths.get(folder, project.getProjectId(), file.getName()), file.getCode());
        }
    }



    private String[] readFileContents(String file, int startLine, int endLine) throws IOException {
        LOGGER.info("Read file contents from "  + " from line " + startLine + " to line " + endLine);
        // Stream<String> lines = Files.lines(path);
        // LOGGER.info("Lines: " + lines.toString());
        // if(startLine==0){
        //     startLine=1;
        // }
        String[] contents = file.split("/n");
        System.out.println("file contents are\n\n"+contents);
        String conflictContents = file.substring(startLine, endLine);
        System.out.println("file conflictContents are\n\n"+conflictContents);
        // lines.close();
        return contents;
    }

    public Git init(String dir, String uri, String branch) throws GitAPIException, IOException, URISyntaxException {
        Git git = Git.init().setInitialBranch(branch).setDirectory(Path.of(dir).toFile()).call();
//        git.branchCreate().setName(branch).call();
        addRemote(git, uri);
        return git;
    }

    private void addDeletedFolderToIndex(Git git, String folder, String projectId, List<ProjectFile> files) {
        LOGGER.infof("Add folder %s to git index.", projectId);
        try {
            git.rm().addFilepattern(projectId + File.separator).call();
        } catch (GitAPIException e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteProject(String projectId, List<ProjectFile> files) {
        LOGGER.info("Delete and push project " + projectId);
        GitConfig gitConfig = getGitConfig();
        CredentialsProvider cred = new UsernamePasswordCredentialsProvider(gitConfig.getUsername(), gitConfig.getPassword());
        String uuid = UUID.randomUUID().toString();
        String folder = vertx.fileSystem().createTempDirectoryBlocking(uuid);
        String commitMessage = "Project " + projectId + " is deleted";
        LOGGER.infof("Temp folder %s is created for deletion of project %s", folder, projectId);
        Git git = null;
        try {
            git = clone(folder, gitConfig.getUri(), gitConfig.getBranch(), cred);
            checkout(git, false, null, null, gitConfig.getBranch());
            addDeletedFolderToIndex(git, folder, projectId, files);
            // commitAddedAndPush(git, gitConfig.getBranch(), cred, commitMessage);
            LOGGER.info("Delete Temp folder " + folder);
            vertx.fileSystem().deleteRecursiveBlocking(folder, true);
            LOGGER.infof("Project %s deleted from Git", projectId);
        } catch (RefNotFoundException e) {
            LOGGER.error("Repository not found");
        } catch (Exception e) {
            LOGGER.error("Error", e);
            throw new RuntimeException(e);
        }
    }

    private Git clone(String dir, String uri, String branch, CredentialsProvider cred) throws GitAPIException, URISyntaxException {
        CloneCommand cloneCommand = Git.cloneRepository();
        cloneCommand.setCloneAllBranches(false);
        cloneCommand.setDirectory(Paths.get(dir).toFile());
        cloneCommand.setURI(uri);
        cloneCommand.setBranch(branch);
        cloneCommand.setCredentialsProvider(cred);
        Git git = cloneCommand.call();
        addRemote(git, uri);
        System.out.println(git.toString());
        return git;
    }

    private void addRemote(Git git, String uri) throws URISyntaxException, GitAPIException {
        // add remote repo:
        RemoteAddCommand remoteAddCommand = git.remoteAdd();
        remoteAddCommand.setName("origin");
        remoteAddCommand.setUri(new URIish(uri));
        remoteAddCommand.call();
    }

    private void fetch(Git git, CredentialsProvider cred,String branch) throws GitAPIException {
        // fetch:
        FetchCommand fetchCommand = git.fetch();
        fetchCommand.setCredentialsProvider(cred);
        fetchCommand.setRemote("origin");
        fetchCommand.setRefSpecs(new RefSpec("+refs/heads/" + branch + ":refs/remotes/origin/" + branch ));
        FetchResult result = fetchCommand.call();
        System.out.println("this is fecth command okkk :" + result.getMessages());
    }

    private void pull(Git git, CredentialsProvider cred) throws GitAPIException {
        // pull:
        PullCommand pullCommand = git.pull();
        pullCommand.setCredentialsProvider(cred);
        PullResult result = pullCommand.call();
    }

    private void checkout(Git git, boolean create, String path, String startPoint, String branch) throws GitAPIException {
        // create branch:
        CheckoutCommand checkoutCommand = git.checkout();
        checkoutCommand.setName(branch);
        checkoutCommand.setCreateBranch(create);
        if (startPoint != null) {
            checkoutCommand.setStartPoint(startPoint);
        }
        if (path != null) {
            checkoutCommand.addPath(path);
        }
        checkoutCommand.call();
    }

    private Tuple2<String, Integer> lastCommit(Git git, String path) throws GitAPIException {
        Iterable<RevCommit> log = git.log().addPath(path).setMaxCount(1).call();
        for (RevCommit commit : log) {
            return Tuple2.of(commit.getId().getName(), commit.getCommitTime());
        }
        return null;
    }

    public Set<String> getChangedProjects(RevCommit commit) {
        Set<String> files = new HashSet<>();
        Git git = getGitForImport();
        if (git != null) {
            TreeWalk walk = new TreeWalk(git.getRepository());
            walk.setRecursive(true);
            walk.setFilter(TreeFilter.ANY_DIFF);

            ObjectId a = commit.getTree().getId();
            RevCommit parent = commit.getParent(0);
            ObjectId b = parent.getTree().getId();
            try {
                walk.reset(b, a);
                List<DiffEntry> changes = DiffEntry.scan(walk);
                changes.stream().forEach(de -> {
                    String path = de.getNewPath();
                    if (path != null) {
                        String[] parts = path.split(File.separator);
                        if (parts.length > 0) {
                            files.add(parts[0]);
                        }
                    }
                });
            } catch (IOException e) {
                LOGGER.error("Error", e);
            }
        }
        return files;
    }
}
