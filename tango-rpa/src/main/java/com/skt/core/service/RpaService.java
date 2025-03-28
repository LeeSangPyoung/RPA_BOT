package com.skt.core.service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.skt.core.executor.RpaExecutor;
import com.skt.core.model.RpaRequest;

@Service
public class RpaService {

    private final Logger log = LoggerFactory.getLogger(RpaService.class);
    private final Map<String, RpaExecutor> executors;

    public RpaService(List<RpaExecutor> executorList) {
        this.executors = executorList.stream()
                .collect(Collectors.toMap(RpaExecutor::getType, e -> e));
    }

    /**
     * 실행 요청 (단일 또는 병렬)
     */
    public String run(RpaRequest request) {
        log.info("🧠 실행 분기 처리 - type: {}, filename: {}, scriptDir: {}, count: {}",
                request.getType(), request.getFilename(), request.getScriptDir(), request.getCount());

        // int count = Math.max(request.getCount(), 1);
        RpaExecutor executor = executors.get(request.getType());

        if (executor == null) {
            log.error("❌ 지원하지 않는 RPA 타입: {}", request.getType());
            throw new IllegalArgumentException("지원하지 않는 RPA 타입입니다: " + request.getType());
        }

        return executor.execute(request);
    }

    /**
     * 병렬 실행
     */
//    private void executeMultiple(int count, RpaRequest request, RpaExecutor executor) {
//        log.info("🚀 병렬 실행 시작 - count: {}, type: {}", count, request.getType());
//
//        ExecutorService threadPool = Executors.newFixedThreadPool(count);
//        for (int i = 0; i < count; i++) {
//            threadPool.submit(() -> {
//                try {
//                    String result = executor.execute(request);
//                    log.info("✅ 병렬 실행 결과:\n{}", result);
//                } catch (Exception e) {
//                    log.error("❌ 병렬 실행 중 오류 발생", e);
//                }
//            });
//        }
//        threadPool.shutdown();
//    }
}
