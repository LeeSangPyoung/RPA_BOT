package com.skt.business;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(scanBasePackages = {"com.skt.core", "com.skt.business", "com.skt.scheduler"})
@MapperScan(basePackages = {
    "com.skt.business.mapper",
    "com.skt.business.log.mapper",   // ✅ 추가
    "com.skt.core.log.mapper",
    "com.skt.scheduler.mapper"// ✅ log 쪽 core mapper도 함께 등록
})
@EnableScheduling  // 스케줄링 활성화
public class TangoRpaApplication {

    public static void main(String[] args) {
        SpringApplication.run(TangoRpaApplication.class, args);
    }
}
