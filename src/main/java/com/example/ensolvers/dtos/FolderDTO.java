package com.example.ensolvers.dtos;

import com.example.ensolvers.models.Folder;

import java.util.ArrayList;
import java.util.List;

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

    public static List<FolderDTO> createFolderDtoList(List<Folder> folders) {
        List<FolderDTO> dtoFolders = new ArrayList<>();
        for (Folder folder: folders) {
            dtoFolders.add(new FolderDTO(folder));
        }
        return dtoFolders;
    }

    public static <E> List<E> makeCollection(Iterable<E> iter) {
        List<E> list = new ArrayList<E>();
        for (E item : iter) {
            list.add(item);
        }
        return list;
    }
}
