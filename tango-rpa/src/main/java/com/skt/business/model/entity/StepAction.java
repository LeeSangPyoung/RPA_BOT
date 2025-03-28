package com.skt.business.model.entity;

import lombok.Data;
import java.util.List;

@Data
public class StepAction {

    private Long stepId;
    private Long actionId;
    private Integer stepOrder;
    private String rpaType;
    private String scriptPath;
    private String scriptFile;
    private Long accountGroupId;
    private Boolean repeatPerAccount;

    // ✅ 정규화된 저장 위치 (DB에서 target_file_path 컬럼 매핑)
    private String targetFilePath;

    // ✅ 파라미터 리스트
    private List<StepParam> params;

    // ✅ 치환된 스크립트 경로
    private String resolvedScriptPath;
    
    private List<String> resolvedScriptPaths;
    private Boolean parallelExecution; // 병렬 실행 여부 (DB 컬럼: parallel_execution)


}
