package com.skt.business.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.skt.business.model.entity.StepAction;

@Mapper
public interface StepActionMapper {
    List<StepAction> selectStepsByActionId(@Param("actionId") Long actionId);
}
