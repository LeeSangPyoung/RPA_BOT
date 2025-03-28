package com.skt.business.service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.skt.business.mapper.StepParamMapper;
import com.skt.business.mapper.AccountMapper;
import com.skt.business.model.entity.Account;
import com.skt.business.model.entity.StepAction;
import com.skt.business.model.entity.StepParam;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StepParamService {

    private static final Logger log = LoggerFactory.getLogger(StepParamService.class);

    private final StepParamMapper stepParamMapper;
    private final AccountMapper accountMapper;

    public void processParamsAndSaveToTemp(StepAction stepAction) {
        List<StepParam> params = stepParamMapper.selectParamsByStepId(stepAction.getStepId());
        stepAction.setParams(params);

        List<String> resolvedPaths = new ArrayList<>();
        stepAction.setResolvedScriptPaths(resolvedPaths); // ✅ 리스트 초기화

        try {
            Path sourcePath = Path.of(stepAction.getScriptPath()).resolve(stepAction.getScriptFile());

            if (!Files.exists(sourcePath)) {
                log.warn("📛 스크립트 파일이 존재하지 않음: {}", sourcePath.toAbsolutePath());
                return;
            }

            String baseScript = Files.readString(sourcePath, StandardCharsets.UTF_8);
            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
            Path baseDir = Path.of(stepAction.getTargetFilePath().replace("\\", "/"));
            Path versionedDir = baseDir.resolve(timestamp);
            Files.createDirectories(versionedDir);

            if (Boolean.TRUE.equals(stepAction.getRepeatPerAccount()) && stepAction.getAccountGroupId() != null) {
                List<Account> accounts = accountMapper.selectAccountsByGroupId(stepAction.getAccountGroupId());
                Map<Integer, Map<String, String>> grouped = accounts.stream()
                    .collect(Collectors.groupingBy(Account::getAccountNo,
                            Collectors.toMap(Account::getKey, Account::getValue)));

                for (Map.Entry<Integer, Map<String, String>> entry : grouped.entrySet()) {
                    Integer accountNo = entry.getKey();
                    Map<String, String> accountMap = entry.getValue();

                    String contentCopy = baseScript;
                    for (StepParam param : params) {
                        String token = "__" + param.getParamKey() + "__";
                        String value = accountMap.getOrDefault(param.getParamKey(), param.getParamValue());
                        contentCopy = contentCopy.replace(token, value != null ? value : "");
                    }

                    Path accountDir = versionedDir.resolve("account_" + accountNo);
                    Files.createDirectories(accountDir);
                    Path accountFile = accountDir.resolve(stepAction.getScriptFile());
                    Files.writeString(accountFile, contentCopy, StandardCharsets.UTF_8);

                    resolvedPaths.add(accountFile.toAbsolutePath().toString());
                    log.info("✅ 계정별 치환 완료 (account_no={}): {}", accountNo, accountFile.toAbsolutePath());
                }

            } else {
                String scriptContent = baseScript;
                for (StepParam param : params) {
                    String token = "__" + param.getParamKey() + "__";
                    String value = param.getParamValue() != null ? param.getParamValue() : "";
                    log.info("🔁 치환 토큰: {} → {}", token, value);
                    scriptContent = scriptContent.replace(token, value);
                }

                Path tempFile = versionedDir.resolve(stepAction.getScriptFile());
                Files.writeString(tempFile, scriptContent, StandardCharsets.UTF_8);
                resolvedPaths.add(tempFile.toAbsolutePath().toString());
                log.info("✅ 일반 치환 완료: {}", tempFile.toAbsolutePath());
            }

        } catch (Exception e) {
            log.warn("📛 스크립트 처리 실패 - 경로: {} / 파일명: {} → {}",
                    stepAction.getScriptPath(),
                    stepAction.getScriptFile(),
                    e.getMessage());
        }
    }
}
