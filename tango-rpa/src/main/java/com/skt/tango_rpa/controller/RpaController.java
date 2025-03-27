package com.skt.tango_rpa.controller;

import com.skt.tango_rpa.model.RpaRequest;
import com.skt.tango_rpa.service.RpaService;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rpa")
public class RpaController {

    private final Logger log = LoggerFactory.getLogger(RpaController.class);
    private final RpaService rpaService;
    public RpaController(RpaService rpaService) {
        this.rpaService = rpaService;
    }
    @PostMapping("/run")
    public ResponseEntity<String> run(@RequestBody RpaRequest request) {
        log.info("▶️  RPA 실행 요청 받음: type={}, filename={}, count={}",
                 request.getType(), request.getFilename(), request.getCount());
        String result = rpaService.run(request);
        return ResponseEntity.ok(result);
    }

    // ❌ 아래는 이제 불필요 (주석 처리해두셔도 됩니다)
    /*
    @PostMapping("/execute-multiple")
    public ResponseEntity<String> executeMultiple(@RequestBody RpaRequest request,
                                                  @RequestParam(defaultValue = "5") int count) {
        rpaService.executeMultiple(count, request);
        return ResponseEntity.ok("🔥 병렬 실행 시작 - " + count + "회");
    }
    */
}
