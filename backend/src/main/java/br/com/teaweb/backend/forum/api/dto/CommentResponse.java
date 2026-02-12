package br.com.teaweb.backend.forum.api.dto;

import java.time.Instant;
import java.util.UUID;

public record CommentResponse(
        UUID id,
        UUID postId,
        String content,
        String authorName,
        Instant createdAt
) {}
