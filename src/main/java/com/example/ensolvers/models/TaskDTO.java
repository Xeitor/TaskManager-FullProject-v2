package com.example.ensolvers.models;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class TaskDTO {
    private String description;
    private String state;
    private String folderName;
    private Integer folderId;
    private Integer id;

    public TaskDTO(Task task) {
        this.description = task.getDescription();
        this.id = task.getId();
        if (task.getState() != null) {
            this.state = task.getState().toString();
        }
        if (task.getFolder() != null) {
            this.folderName = task.getFolder().getName();
            this.folderId = task.getFolder().getId();
        }
    }

    public static List<TaskDTO> createTaskDtoList(List<Task> tasks) {
        List<TaskDTO> dtoTasks = new ArrayList<>();
        for (Task task: tasks) {
            dtoTasks.add(new TaskDTO(task));
        }
        return dtoTasks;
    }

    public static <E> List<E> makeCollection(Iterable<E> iter) {
        List<E> list = new ArrayList<E>();
        for (E item : iter) {
            list.add(item);
        }
        return list;
    }

    public Integer getFolderId() {
        return folderId;
    }

    public void setFolderId(Integer folderId) {
        this.folderId = folderId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getFolderName() {
        return folderName;
    }

    public void setFolderName(String folderName) {
        this.folderName = folderName;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) { this.id = id; }
}
