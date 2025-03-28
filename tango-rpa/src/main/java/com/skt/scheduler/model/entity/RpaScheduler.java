package com.skt.scheduler.model.entity;

import java.time.LocalDateTime;

import lombok.Data;
@Data
public class RpaScheduler {
    private Long id;
    private Long actionId;
    private String scheduleType; // "specific_time" 또는 "interval"
    private LocalDateTime specificTime; // 특정 시간에 실행되는 경우
    private Integer intervalHours; // 간격 (시간)
    private Integer intervalMinutes; // 간격 (분)
    private LocalDateTime nextRunTime; // 다음 실행 시간
    private String status; // "active", "inactive"
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Getters and Setters
    // ...
}
