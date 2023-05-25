package org.apache.camel.karavan.model;

import org.infinispan.protostream.annotations.ProtoDoc;
import org.infinispan.protostream.annotations.ProtoFactory;
import org.infinispan.protostream.annotations.ProtoField;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

public class ProjectFile {
    public static final String CACHE = "project_files";
    @ProtoField(number = 1)
    String name;
    @ProtoField(number = 2)
    String code;
    @ProtoField(number = 3)
    @ProtoDoc("@Field(index=Index.YES, analyze = Analyze.YES, store = Store.NO)")
    String projectId;
    @ProtoField(number = 4)
    Long lastUpdate;
    String userId; //additional field userId for data
    Map<String,String> lastCommits = new HashMap<>(); // used for github capability
    String latestCommit;

    @ProtoFactory
    public ProjectFile(String name, String code, String projectId, Long lastUpdate) {
        this.name = name;
        this.code = code;
        this.projectId = projectId;
        this.lastUpdate = lastUpdate;
    }

    /*
    * New constructor created for introduction of new userId
    * */
    public ProjectFile(String name, String code, String projectId, Long lastUpdate, String userId) {
        this.name = name;
        this.code = code;
        this.projectId = projectId;
        this.lastUpdate = lastUpdate;
        this.userId = userId;
    }

    public ProjectFile(String name, String code, String projectId, Long lastUpdate, String userId,Map<String,String> lastCommit,String latestCommit) {
        this.name = name;
        this.code = code;
        this.projectId = projectId;
        this.lastUpdate = lastUpdate;
        this.userId = userId;
        this.latestCommit = latestCommit;
        this.lastCommits.put(lastCommit.get("repoBranchUri"),lastCommit.get("commitId"));
    }

    public ProjectFile() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public Long getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(Long lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public String getLastCommit(String repoBranchUri){
       
        return lastCommits ==null?"":lastCommits.get(repoBranchUri);
    }
    public void setLastCommit(Map<String,String> lastCommit){
        if (lastCommit != null) {
            for (Map.Entry<String, String> entry : lastCommit.entrySet()) {
                String repoBranchUri = entry.getKey();
                String commitId = entry.getValue();
                this.lastCommits.put(repoBranchUri, commitId);
            }
        }
        System.out.println("lastCommits: after adding"+lastCommits+name);
    }
    // public void setLastCommit(String key,String value){
    //     if(key!=null && value!=null){
    //     this.lastCommits.put(key,value);
    //     }
    //     System.out.println("lastCommits: after adding"+lastCommits);
    // }

    public Map<String,String> getLastCommits() {
        System.out.println("lastCommits: "+lastCommits);
        return lastCommits;
    }

    public void setLatestCommit(String latestCommit) {
        this.latestCommit = latestCommit;
    }

    public String getLatestCommit() {
        return latestCommit;
    }
    /*
    UserId getter and setters added
     */
    public String getUserId() { return userId; }

    public void setUserId(String userId) { this.userId = userId; }

    @Override
    public String toString() {
        return "ProjectFile{" +
                "name='" + name + '\'' +
                ", code='" + code + '\'' +
                ", projectId='" + projectId + '\'' +
                ", lastUpdate=" + lastUpdate +
                ", userId=" + userId +
                ", lastCommits=" + lastCommits.toString() +
                '}';
    }
}
