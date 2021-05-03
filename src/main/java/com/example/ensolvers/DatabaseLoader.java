package com.example.ensolvers;


import com.example.ensolvers.models.Folder;
import com.example.ensolvers.models.Task;
import com.example.ensolvers.repositories.FolderRepository;
import com.example.ensolvers.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final TaskRepository taskRepository;
    private final FolderRepository folderRepository;

    @Autowired
    public DatabaseLoader(TaskRepository taskRepository, FolderRepository folderRepository) {
        this.folderRepository = folderRepository;
        this.taskRepository = taskRepository;
    }

    @Override
    public void run(String... strings) throws Exception {
        List<Task> tasks = new ArrayList<Task>();
        tasks.add(new Task());
        tasks.add(new Task());
        tasks.add(new Task());
        tasks.add(new Task());

        for (Task task: tasks) {
            task.setState(Task.State.NOCOMPLETADA);
            task.setDescription("This is a test...");
            this.taskRepository.save(task);
        }

        List<Folder> folders = new ArrayList<Folder>();
        folders.add(new Folder());
        folders.add(new Folder());
        folders.add(new Folder());
        folders.add(new Folder());

        for (Folder folder: folders) {
            folder.setName("Carpeta test");
            this.folderRepository.save(folder);
        }

    }
}