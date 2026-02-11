package br.com.teaweb.backend.forum.service;

import br.com.teaweb.backend.forum.api.dto.CreatePostRequest;
import br.com.teaweb.backend.forum.api.dto.PostResponse;
import br.com.teaweb.backend.forum.domain.Post;
import br.com.teaweb.backend.forum.repo.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ForumService {

    private final PostRepository postRepository;

    public Page<PostResponse> listPosts(int page, int size) {
        var pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return postRepository.findAll(pageable).map(this::toResponse);
    }

    public PostResponse createPost(CreatePostRequest req) {
        var now = Instant.now();
        var post = Post.builder()
                .id(UUID.randomUUID())
                .title(req.title())
                .content(req.content())
                .authorName(req.authorName() == null || req.authorName().isBlank() ? "Anônimo" : req.authorName())
                .createdAt(now)
                .build();

        return toResponse(postRepository.save(post));
    }

    private PostResponse toResponse(Post p) {
        return new PostResponse(p.getId(), p.getTitle(), p.getContent(), p.getAuthorName(), p.getCreatedAt());
    }
}
