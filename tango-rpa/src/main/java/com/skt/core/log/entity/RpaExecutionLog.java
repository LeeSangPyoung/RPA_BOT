package com.skt.core.log.entity;

import java.time.LocalDateTime;

import com.skt.core.log.enums.RpaStatus;

import lombok.Data;

@Data
public class RpaExecutionLog {
    private Long id;
    private Long stepActionId;       // 해당 StepAction ID
    private String scriptPath;       // 실행된 스크립트 전체 경로
    private RpaStatus resultStatus;  // 실행 상태: RUNNING / SUCCESS / FAIL
    private String message;          // 실행 결과 메시지 or 로그
    private String frstRegUserId;    // 최초 등록자
    private LocalDateTime frstRegDate;
    private String chgRegUserId;     // 최종 수정자
    private LocalDateTime chgRegDate;
}
