package br.com.teaweb.backend.forum.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "comments")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Comment {

    @Id
    @Column(nullable = false)
    private UUID id;

    @Column(name = "post_id", nullable = false)
    private UUID postId;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "author_id")
    private UUID authorId;

    @Column(name = "author_name")
    private String authorName;

    @Column(name = "created_at")
    private Instant createdAt;
}
