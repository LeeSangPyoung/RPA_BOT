package com.skt.core.log.mapper;

import org.apache.ibatis.annotations.Mapper;
import com.skt.core.log.entity.RpaExecutionLog;

@Mapper
public interface RpaExecutionLogMapper {
    void insert(RpaExecutionLog log);
    void update(RpaExecutionLog log);
}
