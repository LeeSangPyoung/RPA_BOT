package com.skt.business.service;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.atomic.AtomicBoolean;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.skt.business.mapper.StepActionMapper;
import com.skt.business.model.dto.Action;
import com.skt.business.model.entity.StepAction;
import com.skt.core.model.RpaRequest;
import com.skt.core.service.RpaService;
import com.skt.business.log.service.StepActionLogService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StepActionService {

    private static final Logger log = LoggerFactory.getLogger(StepActionService.class);
    private final StepParamService stepParamService;
    private final StepActionMapper stepActionMapper;
    private final RpaService rpaService;
    private final StepActionLogService stepActionLogService;

    public String runByActionId(Action request) {
        Long actionId = request.getActionId();
        List<StepAction> stepActions = stepActionMapper.selectStepsByActionId(actionId);

        List<RpaRequest> rpaRequests = new ArrayList<>();

        // STEP별 파라미터 처리 및 RPA 요청 생성
        for (StepAction stepAction : stepActions) {
            log.info("실행할 스텝: {}, 스크립트: {}", stepAction.getStepOrder(), stepAction.getScriptFile());

            // StepParamService 호출
            stepParamService.processParamsAndSaveToTemp(stepAction);

            // StepAction 실행 상태 "RUNNING"으로 로그 기록
            stepActionLogService.insertRunningLog(stepAction.getStepId(), "Step execution started.");

            // 저장된 결과 확인 로그
            List<String> resolvedPaths = stepAction.getResolvedScriptPaths();
            if (resolvedPaths == null || resolvedPaths.isEmpty()) {
                log.warn("⚠️ 치환된 경로 없음 - stepId: {}", stepAction.getStepId());
                continue;
            }

            // RPA 요청 생성
            for (String resolvedPath : resolvedPaths) {
                RpaRequest rpaRequest = new RpaRequest();
                rpaRequest.setType(stepAction.getRpaType().toLowerCase());
                rpaRequest.setFilename(stepAction.getScriptFile());
                rpaRequest.setScriptDir(Path.of(resolvedPath).getParent().toString());
                rpaRequest.setCount(1);
                rpaRequest.setStepActionId(stepAction.getStepId());
                rpaRequests.add(rpaRequest);
            }
        }

        // ✅ RPA 실행
        if (!rpaRequests.isEmpty()) {
            boolean isParallel = stepActions.stream().anyMatch(StepAction::getParallelExecution);
            List<Future<?>> futures = new ArrayList<>();
            AtomicBoolean isExecutionFailed = new AtomicBoolean(false);  // 병렬 실행이 실패했는지 여부를 확인

            if (isParallel) {
                log.info("⚙️ 병렬 실행 모드 감지됨. {}개의 작업을 병렬 처리합니다.", rpaRequests.size());
                ExecutorService executor = Executors.newFixedThreadPool(rpaRequests.size());

                // 병렬로 실행
                for (RpaRequest r : rpaRequests) {
                    futures.add(executor.submit(() -> {
                        try {
                            String result = rpaService.run(r);
                            log.info("✅ 병렬 실행 결과: {}", result);
                        } catch (Exception e) {
                            log.error("❌ 병렬 실행 실패", e);
                            isExecutionFailed.set(true);  // 하나라도 실패하면 전체 실패 처리
                        }
                    }));
                }

                executor.shutdown();
                for (Future<?> f : futures) {
                    try {
                        f.get(); // 모든 병렬 작업 완료 대기
                    } catch (Exception e) {
                        log.error("❌ 병렬 작업 대기 중 예외 발생", e);
                        isExecutionFailed.set(true);  // 대기 중 예외 발생 시 실패 처리
                    }
                }
            } else {
                // 병렬이 아닌 단일 실행
                for (RpaRequest r : rpaRequests) {
                    try {
                        String result = rpaService.run(r);
                        log.info("🧠 RPA 실행 결과: {}", result);
                    } catch (Exception e) {
                        log.error("❌ RPA 실행 실패", e);
                        isExecutionFailed.set(true);  // 실행 실패 시 전체 실패 처리
                    }
                }
            }

            // 병렬 실행 중 하나라도 실패가 발생한 경우 로그 기록
            for (StepAction stepAction : stepActions) {
                if (isExecutionFailed.get()) {
                    stepActionLogService.updateFailureLog(stepAction.getStepId(), "Step execution failed.");
                } else {
                    stepActionLogService.updateSuccessLog(stepAction.getStepId(), "Step execution successful.");
                }
            }
        }

        return "success";
    }
}
