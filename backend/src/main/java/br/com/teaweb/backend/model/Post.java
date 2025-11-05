package br.com.teaweb.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User author;

    @PrePersist
    public void onPrePersist() {
        createdAt = LocalDateTime.now();
    }
}