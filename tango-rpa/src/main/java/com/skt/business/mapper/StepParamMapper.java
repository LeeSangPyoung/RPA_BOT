package com.skt.business.mapper;

import com.skt.business.model.entity.StepParam;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface StepParamMapper {

    /**
     * 특정 Step에 해당하는 파라미터 목록 조회
     * @param stepActionId rpa_step_action.id (외래키)
     * @return 해당 Step의 파라미터 목록
     */
    List<StepParam> selectParamsByStepId(@Param("stepActionId") Long stepActionId);
}
