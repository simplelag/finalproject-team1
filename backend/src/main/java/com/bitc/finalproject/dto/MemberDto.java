package com.bitc.finalproject.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberDto {

        private String memberId;
        private String memberName;
        private String memberEmail;
        private String memberPhone;
        private String memberAuthority;
        private String memberAddress;
        private LocalDateTime memberDatetime;


}
