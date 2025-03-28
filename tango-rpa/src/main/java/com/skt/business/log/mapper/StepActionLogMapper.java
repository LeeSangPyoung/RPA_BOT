package com.skt.business.log.mapper;

import org.apache.ibatis.annotations.Mapper;
import com.skt.business.log.entity.StepActionLog;

@Mapper
public interface StepActionLogMapper {

    /**
     * STEP 실행 상태를 INSERT
     */
    void insertStepActionLog(StepActionLog log);

    /**
     * STEP 실행 상태를 UPDATE
     */
    void updateStepActionLog(StepActionLog log);
}
