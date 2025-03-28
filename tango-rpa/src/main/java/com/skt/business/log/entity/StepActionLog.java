// com.skt.business.log.entity.StepActionLog.java
package com.skt.business.log.entity;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class StepActionLog {
    private Long id;
    private Long stepActionId;
    private Long actionLogId;
    private String resultStatus;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String logMessage;
    private String frstRegUserId;
    private LocalDateTime frstRegDate;
    private String chgRegUserId;
    private LocalDateTime chgRegDate;
}
