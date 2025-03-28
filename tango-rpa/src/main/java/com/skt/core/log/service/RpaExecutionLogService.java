package com.skt.core.log.service;

import com.skt.core.log.entity.RpaExecutionLog;
import com.skt.core.log.mapper.RpaExecutionLogMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RpaExecutionLogService {

    private final RpaExecutionLogMapper rpaExecutionLogMapper;

    public void save(RpaExecutionLog log) {
        rpaExecutionLogMapper.insert(log);
    }

    public void update(RpaExecutionLog log) {
        rpaExecutionLogMapper.update(log);
    }
}
