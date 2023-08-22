package com.bitc.finalproject.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LikeDTO {
    private int likePk;
    private String likeMemberId;
    private int likeBoardPk;
    private int likeCommentPk;
}
