package com.bitc.finalproject.repository;

import com.bitc.finalproject.entity.CommentEntity;
import com.bitc.finalproject.entity.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FileRepository extends JpaRepository<FileEntity, Integer> {
    List<FileEntity> findAllByFileBoardPk(int boardPk);
}
