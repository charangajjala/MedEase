package com.chapp.med_ease.logging;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpServletResponseWrapper;
import java.io.CharArrayWriter;
import java.io.PrintWriter;

public class ResponseWrapper extends HttpServletResponseWrapper {

    private final CharArrayWriter capture;

    public ResponseWrapper(HttpServletResponse response) {
        super(response);
        capture = new CharArrayWriter();
    }

    @Override
    public PrintWriter getWriter() {
        return new PrintWriter(capture);
    }

    public String getCaptureAsString() {
        return capture.toString();
    }
}
