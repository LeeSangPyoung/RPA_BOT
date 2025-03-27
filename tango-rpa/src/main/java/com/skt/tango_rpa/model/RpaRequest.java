package com.skt.tango_rpa.model;

import java.util.List;

public class RpaRequest {

    private String type;       // "robot" or "tagui"
    private String filename;   // "test.robot" or "demo.tag"
    private List<String> args; // optional
    private int count = 1;     // 🔥 실행 횟수 (기본값 1)

    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }

    public String getFilename() {
        return filename;
    }
    public void setFilename(String filename) {
        this.filename = filename;
    }

    public List<String> getArgs() {
        return args;
    }
    public void setArgs(List<String> args) {
        this.args = args;
    }

    public int getCount() {
        return count;
    }
    public void setCount(int count) {
        this.count = count;
    }
}
