package org.apache.camel.karavan.api;

import org.apache.camel.karavan.model.Project;
import org.apache.camel.karavan.model.ProjectFile;
import org.apache.camel.karavan.service.MongoService;
import org.bson.Document;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.time.Instant;
import java.util.List;

@Path("/mongo")
public class MongoResource {

    @Inject
    MongoService mongoService;

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/login/{userId}")
    public List<Document> login(@PathParam("userId") String userId) {
        System.out.println("Calling mongo Service");
        return mongoService.login(userId);
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/project")
    public Project createProject(Project project) throws Exception {
        return mongoService.createProject(project);
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/file")
    public ProjectFile createFile(ProjectFile file) throws Exception {
        return mongoService.createFile(file);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/projects/{userId}")
    public List<Document> getProjects(@PathParam("userId") String userId) throws Exception {
        return mongoService.getProjects(userId);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/files/{userId}/{projectId}")
    public List<Document> getProjectFiles(@PathParam("userId") String userId, @PathParam("projectId") String projectId) throws Exception {
        return mongoService.getProjectFiles(userId, projectId);
    }

    @DELETE
    @Path("/file/{userId}/{projectId}/{filename}")
    public void deleteFile(@PathParam("userId") String userId, @PathParam("projectId") String projectID, @PathParam("filename") String filename) {
        mongoService.deleteFile(userId, projectID, filename);
    }

    @DELETE
    @Path("project/{userId}/{projectId}")
    public void deleteProject(@PathParam("userId") String userId, @PathParam("projectId") String projectId) {
        mongoService.deleteProject(userId, projectId);
    }

    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/file")
    public ProjectFile updateFile(ProjectFile file) throws Exception {
        return mongoService.updateFile(file);
    }

}
