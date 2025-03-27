package com.skt.tango_rpa.core;

import com.skt.tango_rpa.model.RpaRequest;

public interface RpaExecutor {
    String getType(); // "tagui" or "robot"
    String execute(RpaRequest request);
}
