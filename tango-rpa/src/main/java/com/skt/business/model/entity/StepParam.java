package com.skt.business.model.entity;

import lombok.Data;

@Data
public class StepParam {
    private Long stepActionId;   // rpa_step_param.step_action_id (FK)
    private Integer no;          // 파라미터 순번 (step 내에서 1부터 증가)
    private String paramKey;     // {paramKey}
    private String paramValue;   // 실제 값
}
