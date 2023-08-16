package com.bitc.finalproject.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="basket")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BasketEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int basketPk;
    @Column(nullable = false)
    private int basketSalePk;
    @Column(nullable = false)
    private String basketMemberId;
    @Column(nullable = false)
    private String basketBookId;
    @Column(nullable = false)
    private int basketBookPrice;
}
