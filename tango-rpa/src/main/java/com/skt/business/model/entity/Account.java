package com.skt.business.model.entity;

import lombok.Data;

@Data
public class Account {
    private Long accountGroupId;  // 계정 그룹 ID
    private Integer accountNo;    // 계정 순번
    private String key;           // 파라미터 키 (username, password 등)
    private String value;         // 파라미터 값
}
