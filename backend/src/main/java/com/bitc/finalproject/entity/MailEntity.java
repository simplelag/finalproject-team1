package com.bitc.finalproject.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "mail")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class MailEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int mailPk;

    @Column(nullable = false)
    private String mailContent;

    @Column(nullable = false)
    private String mailFromId;
    @Column(nullable = false)
    private String mailFromName;

    @Column(nullable = false)
    private String mailDatetime = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm").format(LocalDateTime.now());
    @Column(nullable = false)
    private String mailRoom;
    @Column(nullable = false)
    private int mailUnread = 1;
}