package com.bitc.finalproject.data.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name="member")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)

public class MemberEntity {
    @Id
    @Column(name = "member_id" ,nullable = false, length = 200)
    private String memberId;

    @Column(name = "member_name", nullable = false, unique = true, length = 200)
    private String memberName;

    @Column(name = "member_password", nullable = false, length = 200)
    private String memberPassword;

    @Column(name = "member_email", nullable = false, length = 200)
    private String memberEmail;

    @Column(name = "member_phone", nullable = false, length = 15)
    private String memberPhone;

    @Column(name = "member_authority", nullable = false, length = 45)
    private String memberAuthority = "user";

    @Column(name = "member_address", nullable = false, length = 200)
    private String memberAddress;

    @Column(name = "member_datetime")
    private LocalDateTime memberDatetime = LocalDateTime.now();

//    saleTable에서 member_id, member_name 외래키 설정해야 함

}
















