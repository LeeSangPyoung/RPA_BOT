package com.skt.core.executor;

import com.skt.core.model.RpaRequest;

public interface RpaExecutor {
    String getType(); // "tagui" or "robot"
    String execute(RpaRequest request);
}
