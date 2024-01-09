package com.chapp.med_ease.logging;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpServletResponseWrapper;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintWriter;

@WebFilter("/*")
public class LoggingFilter implements Filter {

    private static final Logger logger = LoggerFactory.getLogger(LoggingFilter.class);

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        // Wrap the response to capture it
        ContentCaptureWrapper responseWrapper = new ContentCaptureWrapper(httpResponse);

        chain.doFilter(httpRequest, responseWrapper);

        // Log the response body
        logResponse(httpResponse.getStatus(), responseWrapper.getContent());

    }

    private void logResponse(int status, String content) {
        System.out.println("Response - Status: " + status + ", Body: " + content);
        logger.info("Response - Status: {}, Body: {}", status, content);
    }

    private static class ContentCaptureWrapper extends HttpServletResponseWrapper {

        private final ByteArrayOutputStream content = new ByteArrayOutputStream();

        public ContentCaptureWrapper(HttpServletResponse response) {
            super(response);
        }

        @Override
        public PrintWriter getWriter() throws IOException {
            return new PrintWriter(super.getWriter()) {
                @Override
                public void write(String str) {
                    super.write(str);
                    content.write(str.getBytes(), 0, str.getBytes().length);
                }
            };
        }

        public String getContent() {
            return content.toString();
        }
    }

    // Other methods of the Filter interface (init, destroy) can remain empty for
    // this example
}
