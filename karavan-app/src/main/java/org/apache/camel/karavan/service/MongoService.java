package org.apache.camel.karavan.service;

import com.google.gson.Gson;
import com.mongodb.*;
import com.mongodb.client.*;
import org.apache.camel.karavan.model.Project;
import org.apache.camel.karavan.model.ProjectFile;
import org.apache.camel.karavan.model.User;
import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.PropertiesConfiguration;
import org.bson.Document;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Default;
import java.util.ArrayList;
import java.util.List;


@Default
@ApplicationScoped
public class MongoService {

    private MongoClientSettings settings = null;

    private MongoClient mongoClient = null;

    private MongoDatabase database = null;

    void start() throws ConfigurationException {
        PropertiesConfiguration configuration = new PropertiesConfiguration();
        configuration.load("application.properties");
        String connectionString = "mongodb+srv://" + configuration.getString("mongo.username") + ":" +
                configuration.getString("mongo.password") + "@" + configuration.getString("mongo.url");
        System.out.println("Connection String :: " + connectionString);
        ServerApi serverApi = ServerApi.builder()
                .version(ServerApiVersion.V1)
                .build();
        settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(connectionString))
                .serverApi(serverApi)
                .build();
        try {
            mongoClient = MongoClients.create(settings);
        } catch (MongoException me) {
            System.err.println("Unable to connect to the MongoDB instance due to an error: " + me);
            System.exit(1);
        }
        database = mongoClient.getDatabase("Karavan");
    }

    /*
     * The given method will check if the user exists in the DB, If it doesn't
     * it will create the user and return it with the details that exist for that user in DB
     * */
    public List<Document> login(User user) {
        List<Document> dbUser = null;
        Document query = new Document("userId", user.getUserId());
        dbUser = database.getCollection("user").find(query).into(new ArrayList<>());
        if (dbUser.size() == 0) {
            Document insertUser = new Document("userId", user.getUserId()).append("name", user.getName());
            database.getCollection("user").insertOne(insertUser);
            return database.getCollection("user").find(query).into(new ArrayList<>());
        }
        return dbUser;
    }


    /*
     * The give method will persist the project data in the database.
     * It will be used to create a new project
     * */
    public Project createProject(Project project) {
        Gson gson = new Gson();
        String projectJson = gson.toJson(project);
        Document projectDocument = Document.parse(projectJson);
        database.getCollection("projects").insertOne(projectDocument);
        return project;
    }

    /*
     * The following method will create a new file
     * for a specific project owned by a specific user
     * */
    public ProjectFile createFile(ProjectFile file) {
        Gson gson = new Gson();
        String projectJson = gson.toJson(file);
        Document projectDocument = Document.parse(projectJson);
        database.getCollection("project_files").insertOne(projectDocument);
        return file;
    }

    /*
     * The following method will get all the projects that are owned
     * by a user
     * */
    public List<Document> getProjects(String userId) {
        Document query = new Document("userId", userId);
        return database.getCollection("projects").find(query).into(new ArrayList<>());
    }

    /*
     * The method will get all the project files that are owned by a user in
     * a specific project
     * */
    public List<Document> getProjectFiles(String userId, String projectId) {
        Document query = new Document("userId", userId).append("projectId", projectId);
        return database.getCollection("project_files").find(query).into(new ArrayList<>());
    }


    /*
     * This method will delete a project file that exist
     * for a user in a specific project
     * */
    public void deleteFile(String userId, String projectID, String filename) {
        Document query = new Document("userId", userId).append("projectId", projectID).append("name", filename);
        database.getCollection("project_files").deleteOne(query);
    }

    /*
     * This method will delete all the project files and project
     * for a specific user \
     * */
    public void deleteProject(String userId, String projectId) {
        Document query = new Document("userId", userId).append("projectId", projectId);
        database.getCollection("project_files").deleteMany(query);
        database.getCollection("projects").deleteOne(query);
    }

    /*
     * This method will update the code and the last updated
     * for a project file and will update the last update time for the project
     * */
    public ProjectFile updateFile(ProjectFile file) {
        Document fileFilter = new Document("userId", file.getUserId()).append("projectId", file.getProjectId()).append("name", file.getName());
        Document fileUpdate = new Document("$set", new Document("code", file.getCode()).append("lastUpdate", file.getLastUpdate()));
        Document projectFilter = new Document("userId", file.getUserId()).append("projectId", file.getProjectId());
        Document projectUpdate = new Document("$set", new Document("lastCommit", file.getLastUpdate()));
        database.getCollection("project_files").updateOne(fileFilter, fileUpdate);
        database.getCollection("projects").updateOne(projectFilter, projectUpdate);
        return file;
    }

    /*
     * This method will update the project name and the last updated
     * for a project and will update the last update time for the project
     * */
    public Project updateProject(Project project,String userId) {
        Document projectFilter = new Document("userId", userId).append("projectId", project.getProjectId());
        Document projectUpdate = new Document("$set", new Document("name", project.getName()).append("lastCommit", project.getLastCommit()).append("lastCommitTimestamp", project.getLastCommitTimestamp()));
        database.getCollection("projects").updateOne(projectFilter, projectUpdate);
        return project;
    }

    /*
     * This method will get the project details for a specific project
     * */
    public Document getProject(String userId, String projectId) {
        Document query = new Document("userId", userId).append("projectId", projectId);
        List<Document> projects =  database.getCollection("projects").find(query).into(new ArrayList<>());
        return projects.get(0);
    }
}

