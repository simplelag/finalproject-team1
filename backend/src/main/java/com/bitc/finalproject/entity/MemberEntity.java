package com.bitc.finalproject.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@DynamicUpdate
@Table(name="member")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)

public class MemberEntity {
    @Id
    @Column(nullable = false, length = 255)
    private String memberId;

    @Column(nullable = false, unique = true)
    private String memberName;

    @Column(nullable = false, length = 200)
    private String memberPassword;

    @Column(nullable = false, length = 200)
    private String memberEmail;

    @Column(nullable = false, length = 15)
    private String memberPhone;

    @Column(nullable = false, length = 45)
    private String memberAuthority = "user";

    @Column(nullable = false, length = 200)
    private String memberAddress;

    @CreatedDate
    @Column(nullable = true, length = 6)
    private LocalDateTime memberDatetime = LocalDateTime.now();

    @Builder
    public MemberEntity(String memberId, String memberPassword){
        this.memberId = memberId;
        this.memberPassword = memberPassword;
    }

    @Builder
    public MemberEntity(String memberId, String memberPassword, String memberName, String memberEmail, String memberPhone, String memberAddress){
        this.memberId = memberId;
        this.memberPassword = memberPassword;
        this.memberName = memberName;
        this.memberEmail = memberEmail;
        this.memberPhone = memberPhone;
        this.memberAddress = memberAddress;
    }


//    sale 테이블에서 member_id, member_name 외래키 설정해야 함
//    purchase 테이블에서  member_id, member_name 외래키 설정
}
















