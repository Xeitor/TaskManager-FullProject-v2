package com.example.ensolvers.repositories;

import com.example.ensolvers.models.Folder;
import com.example.ensolvers.models.Task;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
public interface FolderRepository extends CrudRepository<Folder, Integer> {

    Folder findByName(String name);

    @Transactional
    @Modifying
    @Query("DELETE FROM task WHERE folder_id = :folder_id")
    void deleteTasksInFolder(@Param("folder_id") Integer folder_id);

}
