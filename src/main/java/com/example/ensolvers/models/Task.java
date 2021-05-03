package com.example.ensolvers.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.io.Serializable;

@Entity(name = "task")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Task implements Serializable {
    // Attributes
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private String description;

    private State state;

    @ManyToOne()
    @JoinColumn(name = "folder_id")
    @JsonManagedReference
    private Folder folder;

    // Getters y setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Folder getFolder() {
        return folder;
    }

    public void setFolder(Folder folder) {
        this.folder = folder;
    }

    public enum State {
        COMPLETADA, NOCOMPLETADA
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }
}