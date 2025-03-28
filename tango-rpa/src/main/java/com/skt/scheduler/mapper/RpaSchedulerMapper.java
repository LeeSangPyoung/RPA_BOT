package com.skt.scheduler.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.skt.scheduler.model.entity.RpaScheduler;

@Mapper
public interface RpaSchedulerMapper {
    // 실행할 스케줄 리스트 가져오기
    List<RpaScheduler> getActiveSchedules();

    // next_run_time 업데이트
    void updateNextRunTime(RpaScheduler scheduler);
}