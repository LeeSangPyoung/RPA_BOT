package com.skt.tango_rpa.core;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.skt.tango_rpa.model.RpaRequest;

@Component
public class RobotExecutor implements RpaExecutor {

    private static final Logger log = LoggerFactory.getLogger(RobotExecutor.class);

    private static final String ROBOT_CMD = "C:\\rpa_tools\\python-3.13.2-embed-amd64\\Scripts\\robot.exe";
    private static final String SCRIPT_DIR = "C:\\rpa_tools\\rpa_scripts\\robot\\";
    private static final String BASE_RESULT_DIR = "D:\\workspace_rpa3\\tango-rpa\\results\\";

    @Override
    public String getType() {
        return "robot";
    }

    @Override
    public String execute(RpaRequest request) {
        String fullPath = SCRIPT_DIR + request.getFilename();
        log.info("🤖 RobotFramework 실행 시작: {}", fullPath);

        // 현재 시각 기반 폴더 생성
        String timestamp = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss").format(new Date());
        String threadId = String.valueOf(Thread.currentThread().getId());
        String resultDir = BASE_RESULT_DIR + timestamp + "\\";

        // 디렉토리 생성
        new File(resultDir).mkdirs();

        String outputFile = resultDir + "output_" + threadId + ".xml";
        String logFile = resultDir + "log_" + threadId + ".html";
        String reportFile = resultDir + "report_" + threadId + ".html";

        try {
            List<String> command = new ArrayList<>();
            command.add(ROBOT_CMD);
            command.add("--output");
            command.add(outputFile);
            command.add("--log");
            command.add(logFile);
            command.add("--report");
            command.add(reportFile);
            command.add(fullPath);

            if (request.getArgs() != null) {
                command.addAll(request.getArgs());
            }

            ProcessBuilder pb = new ProcessBuilder(command);
            pb.redirectErrorStream(true);
            Process process = pb.start();

            StringBuilder output = new StringBuilder();
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    output.append(line).append("\n");
                }
            }

            int exitCode = process.waitFor();
            log.info("✅ Robot 실행 종료: exitCode={}, 저장 위치: {}", exitCode, resultDir);

            if (exitCode != 0) {
                output.append("\n비정상 종료 (exit code ").append(exitCode).append(")");
            }

            return output.toString();
        } catch (Exception e) {
            log.error("❌ Robot 실행 오류", e);
            return "Robot 실행 오류: " + e.getMessage();
        }
    }
}
