package com.skt.core.executor;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.ConcurrentSkipListSet;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.skt.core.model.RpaRequest;

@Component
public class TaguiExecutor implements RpaExecutor {

    private static final Logger log = LoggerFactory.getLogger(TaguiExecutor.class);

    private static final String TAGUI_SRC_DIR = "C:\\rpa_tools\\tagui\\src\\";
    private static final String SCRIPT_DIR = "C:\\rpa_tools\\rpa_scripts\\tagui\\";
    private static final String TEMP_DIR = "D:\\workspace_rpa3\\tango-rpa\\temp_tagui\\";

    private static final Set<Integer> usedPorts = new ConcurrentSkipListSet<>();

    @Override
    public String getType() {
        return "tagui";
    }

    @Override
    public String execute(RpaRequest request) {
        String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss_SSS").format(new Date());
        String threadId = String.valueOf(Thread.currentThread().getId());

        // 인스턴스별 실행 디렉토리
        String runDir = TEMP_DIR + "run_" + timestamp + "_" + threadId + "\\";
        String tempScriptName = request.getFilename().replace(".tag", "_") + timestamp + "_" + threadId + ".tag";
        String tempScriptPath = runDir + tempScriptName;

        new File(runDir).mkdirs();

        int availablePort = -1;

        try {
            // 1. .tag 스크립트 복사
            Files.copy(
                Paths.get(SCRIPT_DIR + request.getFilename()),
                Paths.get(tempScriptPath),
                StandardCopyOption.REPLACE_EXISTING
            );

            // 2. 공유 임시파일들만 복사 (중요)
            String[] sharedFiles = {
                "tagui_chrome.in",
                "tagui_chrome.out",
                "tagui_chrome.log",
                "tagui_chrome.log.tmp",
                "tagui_chrome.php"
            };
            for (String file : sharedFiles) {
                Path source = Paths.get(TAGUI_SRC_DIR + file);
                Path target = Paths.get(runDir + file);
                Files.copy(source, target, StandardCopyOption.REPLACE_EXISTING);
            }

            // 3. 사용 가능한 포트 찾기
            availablePort = findAvailablePort(9222);
            log.info("📡 사용 포트: {}", availablePort);

            // 4. 실행 커맨드 구성 (공유된 tagui.cmd 실행)
            List<String> command = new ArrayList<>();
            command.add("cmd");
            command.add("/c");
            command.add(TAGUI_SRC_DIR + "tagui.cmd");
            command.add(tempScriptName);
            command.add("--remote-debugging-port=" + availablePort);
            command.add("-debug");

            if (request.getArgs() != null) {
                command.addAll(request.getArgs());
            }

            log.info("request.getArgs() : {}", request.getArgs());
            log.info("command : {}", command.toString());

            // 5. 실행
            ProcessBuilder pb = new ProcessBuilder(command);
            pb.directory(new File(runDir));  // 🎯 인스턴스 디렉토리에서 실행
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
            log.info("✅ TagUI 실행 종료: exitCode={}, 스크립트: {}", exitCode, tempScriptPath);

            if (exitCode != 0) {
                output.append("\n비정상 종료 (exit code ").append(exitCode).append(")");
            }

            return output.toString();

        } catch (Exception e) {
            log.error("❌ TagUI 실행 오류", e);
            return "TagUI 실행 오류: " + e.getMessage();

        } finally {
            if (availablePort != -1) {
                usedPorts.remove(availablePort);
            }

            // 실행 디렉토리 정리 (필요 시 주석 처리)
            try {
                Files.walk(Paths.get(runDir))
                    .sorted(Comparator.reverseOrder())
                    .map(Path::toFile)
                    .forEach(File::delete);
            } catch (Exception ignored) {}
        }
    }

    private int findAvailablePort(int startingPort) {
        int port = startingPort;
        while (port < 65535) {
            if (!usedPorts.contains(port)) {
                try (ServerSocket socket = new ServerSocket(port)) {
                    usedPorts.add(port);
                    return port;
                } catch (Exception e) {
                    port++;
                }
            } else {
                port++;
            }
        }
        throw new IllegalStateException("사용 가능한 포트를 찾을 수 없습니다.");
    }
}
