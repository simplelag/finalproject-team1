package com.bitc.finalproject.repository;

import com.bitc.finalproject.entity.CommentEntity;
import com.bitc.finalproject.entity.MailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MailRepository extends JpaRepository<MailEntity, Integer> {
    List<MailEntity> findByMailRoom(String room);
    List<MailEntity> findByMailPkAndMailRoom(int mailPk, String mailRoom);
    int countByMailRoomAndMailFromIdNotAndMailUnreadNot(String mailRoom,String mailFromId, int mailUnread);
    @Query("SELECT DISTINCT m.mailRoom FROM MailEntity m " +
            "WHERE m.mailRoom LIKE CONCAT(:salePk,'_','%') ")
    List<String> findMailRoomAsSeller(String salePk);

    @Query("SELECT DISTINCT m.mailRoom FROM MailEntity m " +
            "WHERE m.mailRoom LIKE CONCAT('%','_',:id) ")
    List<String> findMailRoomAsBuyer(String id);
}
