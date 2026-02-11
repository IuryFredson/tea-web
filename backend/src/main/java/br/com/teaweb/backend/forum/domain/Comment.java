package br.com.teaweb.backend.forum.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "comments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Comment {

    @Id
    private UUID id;

    @Column(nullable = false)
    private UUID postId;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    private String authorName;

    private Instant createdAt;
}
