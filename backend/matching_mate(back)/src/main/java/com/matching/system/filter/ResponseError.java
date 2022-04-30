package com.matching.system.filter;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@Builder
@AllArgsConstructor
public class ResponseError {
    private HttpStatus status;
    private String message;
}
