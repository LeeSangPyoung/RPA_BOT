package com.skt.business.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skt.business.model.dto.Action;
import com.skt.business.service.StepActionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/tango")
@RequiredArgsConstructor
public class ActionController {

    private final Logger log = LoggerFactory.getLogger(ActionController.class);
    private final StepActionService stepActionService; // ✅ 클래스명 기반 리팩토링

    @PostMapping("/rpaRequest")
    public ResponseEntity<String> run(@RequestBody Action request) {
        String result = stepActionService.runByActionId(request); // ✅ 변수명 반영
        return ResponseEntity.ok(result);
    }

}
