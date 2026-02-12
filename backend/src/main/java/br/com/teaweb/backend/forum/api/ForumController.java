package br.com.teaweb.backend.forum.api;

import br.com.teaweb.backend.forum.api.dto.CommentResponse;
import br.com.teaweb.backend.forum.api.dto.CreateCommentRequest;
import br.com.teaweb.backend.forum.api.dto.CreatePostRequest;
import br.com.teaweb.backend.forum.api.dto.PostResponse;
import br.com.teaweb.backend.forum.service.ForumService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class ForumController {

    private final ForumService forumService;

    @GetMapping
    public Page<PostResponse> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return forumService.listPosts(page, size);
    }

    @GetMapping("/{postId}")
    public PostResponse get(@PathVariable UUID postId) {
        return forumService.getPost(postId);
    }

    @PostMapping
    public PostResponse create(@RequestBody @Valid CreatePostRequest req, Authentication auth) {
        UUID userId = UUID.fromString(auth.getName());
        String email = (String) auth.getDetails();
        return forumService.createPost(req, userId, email);
    }

    @GetMapping("/{postId}/comments")
    public List<CommentResponse> listComments(@PathVariable UUID postId) {
        return forumService.listComments(postId);
    }

    @PostMapping("/{postId}/comments")
    public CommentResponse createComment(
            @PathVariable UUID postId,
            @RequestBody @Valid CreateCommentRequest req,
            Authentication auth
    ) {
        UUID userId = UUID.fromString(auth.getName());
        String email = (String) auth.getDetails();
        return forumService.createComment(postId, req, userId, email);
    }
}
