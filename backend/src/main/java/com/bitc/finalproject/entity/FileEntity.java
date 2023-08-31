package com.bitc.finalproject.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "file")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class FileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int filePk;
    @Column(nullable = false)
    private int fileBoardPk;
    @Column(nullable = false)
    private String fileNameSaved;
    @Column(nullable = false)
    private String fileNameOriginal;
}
