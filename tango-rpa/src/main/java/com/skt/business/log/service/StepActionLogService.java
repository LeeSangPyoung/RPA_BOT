package com.skt.business.log.service;

import org.springframework.stereotype.Service;
import com.skt.business.log.mapper.StepActionLogMapper;
import com.skt.business.log.entity.StepActionLog;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StepActionLogService {

    private final StepActionLogMapper stepActionLogMapper;

    /**
     * STEP 실행 중일 때 로그 기록 (RUNNING) - INSERT
     */
    public void insertRunningLog(Long stepActionId, String message) {
        insertStepActionLog(stepActionId, "RUNNING", message);
    }

    /**
     * STEP 실행 성공했을 때 로그 삽입 (SUCCESS) - UPDATE
     */
    public void updateSuccessLog(Long stepActionId, String message) {
        updateStepActionLog(stepActionId, "SUCCESS", message);
    }

    /**
     * STEP 실행 실패했을 때 로그 삽입 (FAILURE) - UPDATE
     */
    public void updateFailureLog(Long stepActionId, String message) {
        updateStepActionLog(stepActionId, "FAILURE", message);
    }



    /**
     * STEP 실행 상태별로 INSERT 처리
     */
    private void insertStepActionLog(Long stepActionId, String status, String message) {
        StepActionLog log = new StepActionLog();
        log.setStepActionId(stepActionId);
        log.setResultStatus(status);
        log.setLogMessage(message);
        log.setStartTime(java.time.LocalDateTime.now());  // 현재 시각 기록

        stepActionLogMapper.insertStepActionLog(log);  // DB에 삽입
    }

    /**
     * STEP 실행 상태별로 UPDATE 처리
     */
    private void updateStepActionLog(Long stepActionId, String status, String message) {
        StepActionLog log = new StepActionLog();
        log.setStepActionId(stepActionId);
        log.setResultStatus(status);
        log.setLogMessage(message);
        log.setEndTime(java.time.LocalDateTime.now());  // 현재 시각 기록

        stepActionLogMapper.updateStepActionLog(log);  // DB에서 업데이트
    }
}
