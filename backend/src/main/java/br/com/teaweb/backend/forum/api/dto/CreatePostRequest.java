package br.com.teaweb.backend.forum.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreatePostRequest(
        @NotBlank @Size(min = 3, max = 120) String title,
        @NotBlank @Size(min = 1, max = 10000) String content,
        @Size(max = 60) String authorName
) {}
