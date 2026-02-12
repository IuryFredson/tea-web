package br.com.teaweb.backend.forum.service;

import br.com.teaweb.backend.forum.api.dto.CreatePostRequest;
import br.com.teaweb.backend.forum.api.dto.PostResponse;
import br.com.teaweb.backend.forum.api.dto.CreateCommentRequest;
import br.com.teaweb.backend.forum.api.dto.CommentResponse;
import br.com.teaweb.backend.forum.domain.Post;
import br.com.teaweb.backend.forum.domain.Comment;
import br.com.teaweb.backend.forum.repo.PostRepository;
import br.com.teaweb.backend.forum.repo.CommentRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ForumService {

    private final PostRepository postRepository;
    private final CommentRepository commentRepository;

    public Page<PostResponse> listPosts(int page, int size) {
        var pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return postRepository.findAll(pageable)
                .map(this::toPostResponse);
    }

    public PostResponse getPost(UUID postId) {
        var post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post não encontrado"));

        return toPostResponse(post);
    }

    public PostResponse createPost(CreatePostRequest req) {
        var now = Instant.now();

        var post = Post.builder()
                .id(UUID.randomUUID())
                .title(req.title())
                .content(req.content())
                .authorName(
                        req.authorName() == null || req.authorName().isBlank()
                                ? "Anônimo"
                                : req.authorName()
                )
                .createdAt(now)
                .build();

        return toPostResponse(postRepository.save(post));
    }

    public List<CommentResponse> listComments(UUID postId) {

        if (!postRepository.existsById(postId)) {
            throw new RuntimeException("Post não encontrado");
        }

        return commentRepository.findByPostId(postId)
                .stream()
                .map(this::toCommentResponse)
                .toList();
    }

    public CommentResponse createComment(UUID postId, CreateCommentRequest req) {

        if (!postRepository.existsById(postId)) {
            throw new RuntimeException("Post não encontrado");
        }

        var now = Instant.now();

        var comment = Comment.builder()
                .id(UUID.randomUUID())
                .postId(postId)
                .content(req.content())
                .authorName(
                        req.authorName() == null || req.authorName().isBlank()
                                ? "Anônimo"
                                : req.authorName()
                )
                .createdAt(now)
                .build();

        return toCommentResponse(commentRepository.save(comment));
    }

    private PostResponse toPostResponse(Post p) {
        return new PostResponse(
                p.getId(),
                p.getTitle(),
                p.getContent(),
                p.getAuthorName(),
                p.getCreatedAt()
        );
    }

    private CommentResponse toCommentResponse(Comment c) {
        return new CommentResponse(
                c.getId(),
                c.getPostId(),
                c.getContent(),
                c.getAuthorName(),
                c.getCreatedAt()
        );
    }
}
