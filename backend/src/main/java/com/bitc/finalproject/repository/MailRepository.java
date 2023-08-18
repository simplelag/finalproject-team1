package com.bitc.finalproject.repository;

import com.bitc.finalproject.entity.CommentEntity;
import com.bitc.finalproject.entity.MailEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MailRepository extends JpaRepository<MailEntity, Integer> {
}
