package com.example.ensolvers.controllers;

import com.example.ensolvers.models.Folder;
import com.example.ensolvers.models.Task;
import com.example.ensolvers.models.TaskDTO;
import com.example.ensolvers.repositories.FolderRepository;
import com.example.ensolvers.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST})
public class FolderController {
    @Autowired
    private FolderRepository folderRepository;

    @Autowired
    private TaskRepository taskRepository;

    // crear carpeta
    @PostMapping(path = "/folder/add")
    public @ResponseBody
    String addNewFolder(@RequestParam String name) {
        Folder n = new Folder();
        n.setName(name);
        folderRepository.save(n);
        return "Carpeta guardada";
    }

    @PatchMapping(path = "/folder/{id}")
    public @ResponseBody String updateFolder(@PathVariable Integer id, @RequestParam String name) {
        Folder folder = folderRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No se encontró una carpeta con el id " + id));
        folder.setName(name);
        folderRepository.save(folder);
        return "Carpeta actualizada";
    }

    // traer todos las carpetas
    @GetMapping(path = "/folder/all")
    public @ResponseBody
    Iterable<Folder> getAllFolders() {
        return folderRepository.findAll();
    }

    // borrar carpeta y tareas asociadas
    @DeleteMapping("/folder/{id}")
    public ResponseEntity<Folder> deleteFolder(@PathVariable Integer id) {
        Folder folder = folderRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No se encontró una carpeta con el id " + id));

        folderRepository.deleteTasksInFolder(id);
        folderRepository.delete(folder);
        return ResponseEntity.ok(folder);
    }

    // traer folder con id
    @GetMapping("/folder/{id}")
    public ResponseEntity<Folder> getFolderById(@PathVariable(value = "id") Integer folderId) throws ResourceNotFoundException {
        Folder folder = folderRepository
                .findById(folderId)
                .orElseThrow(() -> new ResourceNotFoundException("No se encontró un folder con id:" + folderId));
        return ResponseEntity.ok().body(folder);
    }

    // mostrar tareas en folder con id=
    @GetMapping("/folder/{id}/tasks")
    public ResponseEntity<List<TaskDTO>> getTasksInFolder(@PathVariable Integer id) {
        List<Task> tasks = taskRepository
                           .findByFolderId(id);
        return ResponseEntity.ok(TaskDTO.createTaskDtoList(tasks));
    }
}
