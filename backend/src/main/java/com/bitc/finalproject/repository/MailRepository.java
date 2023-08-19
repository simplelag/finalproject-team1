package com.bitc.finalproject.repository;

import com.bitc.finalproject.entity.CommentEntity;
import com.bitc.finalproject.entity.MailEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MailRepository extends JpaRepository<MailEntity, Integer> {
    List<MailEntity> findByMailPurchasePk(int purchasePk);

    List<MailEntity> findByMailPkAndMailPurchasePk(int mailPk, int mailPurchasePk);
}
