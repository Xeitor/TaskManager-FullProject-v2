package com.example.ensolvers.dtos;

import com.example.ensolvers.models.Folder;

public class FolderDTO {
    private String name;
    private Integer id;

    public FolderDTO(Folder folder) {
        this.name = folder.getName();
        this.id = folder.getId();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
