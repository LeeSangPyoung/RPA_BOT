package com.skt.core.executor;

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

import com.skt.core.model.RpaRequest;

@Component
public class PlayWrightExecutor implements RpaExecutor {

    private static final Logger log = LoggerFactory.getLogger(PlayWrightExecutor.class);

    // private static final String PYTHON_EXEC = "C:\\rpa_tools\\python-3.13.2-embed-amd64\\python";
    private static final String PYTHON_EXEC = "C:\\Users\\Administrator\\AppData\\Local\\miniconda3\\envs\\rpa\\python.exe";
    
    private static final String SCRIPT_DIR = "C:\\rpa_tools\\rpa_scripts\\playwrite\\";
    private static final String BASE_RESULT_DIR = "D:\\workspace_rpa3\\tango-rpa\\results\\playwright\\";

    @Override
    public String getType() {
        return "playwright";
    }

    @Override
    public String execute(RpaRequest request) {
        log.info("🎭 Playwright 실행 시작");

        // 결과 저장 경로 생성
        String timestamp = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss").format(new Date());
        String threadId = String.valueOf(Thread.currentThread().getId());
        String resultDir = BASE_RESULT_DIR + timestamp + "\\";
        new File(resultDir).mkdirs();

        String scriptPath = SCRIPT_DIR + request.getFilename();
        String screenshotPath = resultDir + "screenshot_" + threadId + ".png";

        try {
            List<String> command = new ArrayList<>();
            command.add(PYTHON_EXEC);
            command.add(scriptPath);
            command.add(screenshotPath);  // 계정정보는 스크립트에 고정되어 있음
            log.info("screenshotPath : {}", screenshotPath);

            log.info("📜 실행 커맨드: {}", command);

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
            log.info("✅ Playwright 종료: exitCode={}, 저장 위치: {}", exitCode, screenshotPath);

            if (exitCode != 0) {
                output.append("\n비정상 종료 (exit code ").append(exitCode).append(")");
            }

            return output.toString();
        } catch (Exception e) {
            log.error("❌ Playwright 실행 오류", e);
            return "Playwright 실행 오류: " + e.getMessage();
        }
    }
}
