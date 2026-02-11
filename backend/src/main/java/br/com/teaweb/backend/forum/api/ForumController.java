package br.com.teaweb.backend.forum.api;

import br.com.teaweb.backend.forum.api.dto.CreatePostRequest;
import br.com.teaweb.backend.forum.api.dto.PostResponse;
import br.com.teaweb.backend.forum.service.ForumService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class ForumController {

    private final ForumService forumService;

    @GetMapping
    public Page<PostResponse> list(@RequestParam(defaultValue = "0") int page,
                                   @RequestParam(defaultValue = "10") int size) {
        return forumService.listPosts(page, size);
    }

    @PostMapping
    public PostResponse create(@RequestBody @Valid CreatePostRequest req) {
        return forumService.createPost(req);
    }
}
