package com.skt.scheduler.service;

import com.skt.business.model.dto.Action;
import com.skt.business.service.StepActionService;
import com.skt.scheduler.mapper.RpaSchedulerMapper;
import com.skt.scheduler.model.entity.RpaScheduler;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RpaSchedulerService {

    private final RpaSchedulerMapper rpaSchedulerMapper;
    private final StepActionService stepActionService;

    // 1분마다 실행
    @Scheduled(fixedRate = 60000)
    public void scheduleJobs() {
        System.out.println("Scheduler is running...");

        // 활성화된 스케줄을 가져옴
        List<RpaScheduler> schedules = rpaSchedulerMapper.getActiveSchedules();

        for (RpaScheduler schedule : schedules) {
            // 스케줄의 실행 조건에 맞는지 확인
            if (shouldExecuteAtSpecificTime(schedule)) {
                executeRpaTask(schedule);
            } else if (shouldExecuteAtInterval(schedule)) {
                executeRpaTask(schedule);
            }

            // 실행 후 다음 실행 시간을 갱신
            updateNextRunTime(schedule);
        }
    }

    // specific_time에 맞춰 실행되는지 확인
    private boolean shouldExecuteAtSpecificTime(RpaScheduler schedule) {
        if (schedule.getSpecificTime() != null) {
            return schedule.getSpecificTime().isBefore(LocalDateTime.now());
        }
        return false;
    }

    // interval에 맞춰 실행되는지 확인
    private boolean shouldExecuteAtInterval(RpaScheduler schedule) {
        return schedule.getIntervalHours() != null || schedule.getIntervalMinutes() != null;
    }

    // RPA 작업을 실행
    private void executeRpaTask(RpaScheduler schedule) {
        Action action = new Action();
        action.setActionId(schedule.getActionId());
        String result = stepActionService.runByActionId(action); // ✅ runByActionId 메서드 호출
        System.out.println("Executed RPA Task: " + result);
    }

    // next_run_time을 갱신하는 메서드
    private void updateNextRunTime(RpaScheduler schedule) {
        LocalDateTime nextRunTime = null;
        LocalDateTime lastRunTime = schedule.getNextRunTime();  // 이전 실행 시간을 가져옴

        // specific_time이 설정되어 있으면 해당 시간 사용
        if (schedule.getSpecificTime() != null) {
            nextRunTime = calculateNextRunTimeWithSpecificTime(schedule);
        }
        // interval이 설정되어 있으면 그 값을 기준으로 다음 실행 시간을 계산
        else if (schedule.getIntervalHours() != null || schedule.getIntervalMinutes() != null) {
            nextRunTime = calculateNextRunTimeWithInterval(schedule, lastRunTime);
        }

        // next_run_time을 업데이트
        if (nextRunTime != null) {
            schedule.setNextRunTime(nextRunTime);
            rpaSchedulerMapper.updateNextRunTime(schedule); // DB에 반영
        }
    }

    // specific_time에 맞춰 next_run_time 계산
    private LocalDateTime calculateNextRunTimeWithSpecificTime(RpaScheduler schedule) {
        return schedule.getSpecificTime(); // 지정된 시간이 그대로 next_run_time이 된다
    }

    // interval에 맞춰 next_run_time 계산
    private LocalDateTime calculateNextRunTimeWithInterval(RpaScheduler schedule, LocalDateTime lastRunTime) {
        int hours = schedule.getIntervalHours() != null ? schedule.getIntervalHours() : 0;
        int minutes = schedule.getIntervalMinutes() != null ? schedule.getIntervalMinutes() : 0;

        return lastRunTime.plusHours(hours).plusMinutes(minutes);
    }
}
