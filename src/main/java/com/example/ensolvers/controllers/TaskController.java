package com.example.ensolvers.controllers;

import com.example.ensolvers.models.Folder;
import com.example.ensolvers.models.Task;
import com.example.ensolvers.dtos.TaskDTO;
import com.example.ensolvers.repositories.FolderRepository;
import com.example.ensolvers.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Controller
@CrossOrigin(origins="*")
public class TaskController {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private FolderRepository folderRepository;

    // crear tarea
    @PostMapping(path="/task/add")
    public ResponseEntity<TaskDTO> addNewTask (@RequestParam(name="description") String description,
                                            @RequestParam(name="state", required=false) Task.State state,
                                            @RequestParam(name="folderId", required=false) Integer folderId) {
        Task task = new Task();
        task.setDescription(description);
        if (state != null) task.setState(state);
        if (folderId != null && folderId != 0) {
            Folder folder = folderRepository
                            .findById(folderId)
                            .orElseThrow(() -> new ResourceNotFoundException("No se encontró carpeta con el con el id: " + folderId));
            task.setFolder(folder);
        }
        task = taskRepository.save(task);
        return ResponseEntity.ok(new TaskDTO(task));
    }

    // mostrar tareas
    @GetMapping(path="/task/all")
    public @ResponseBody List<TaskDTO> getAllTask() {
        return TaskDTO.createTaskDtoList(TaskDTO.makeCollection(taskRepository.findAll()));
    }

    // borrar tarea
    @DeleteMapping("/task/{id}")
    public ResponseEntity<TaskDTO> deleteFolder(@PathVariable Integer id) {
        Task task = taskRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No se encontró una tarea con el id " + id));
        taskRepository.delete(task);
        return ResponseEntity.ok(new TaskDTO(task));
    }

    // update task (podré mandar un Task en vez de los parametros ?)@RequestParam Optional<Integer> cat1,
    @PatchMapping("/task/{id}")
    public ResponseEntity<TaskDTO> updateTask(@PathVariable Integer id,
                                           @RequestParam(name="description", required=false) String description,
                                           @RequestParam(name="folderId", required=false) Integer folderId,
                                           @RequestParam(name="state", required=false) Task.State state) throws Exception {
        Task task = taskRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No se encontró tarea con id: " + id));

        if (folderId != null && folderId != 0) {
            Folder folder = folderRepository
                    .findById(folderId)
                    .orElseThrow(() -> new ResourceNotFoundException("No se encontró carpeta con el con el id: " + folderId));
            task.setFolder(folder);
        }
        if (description != null && !description.isEmpty()) task.setDescription(description);
        if (state != null) task.setState(state);
        taskRepository.save(task);
        return ResponseEntity.ok(new TaskDTO(task));
    }

    // mostrar tarea
    @GetMapping("/task/{id}")
    public ResponseEntity<TaskDTO> getTaskById(@PathVariable Integer id) {
        Task task = taskRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No se encontró tarea con id: " + id));
        return ResponseEntity.ok(new TaskDTO(task));
    }
}
