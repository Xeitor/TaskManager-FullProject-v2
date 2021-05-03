package com.example.ensolvers.repositories;

import com.example.ensolvers.models.Task;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TaskRepository extends CrudRepository<Task, Integer> {

    List<Task> findByFolderId(Integer id);
}