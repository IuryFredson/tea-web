package br.com.teaweb.backend.forum.repo;

import br.com.teaweb.backend.forum.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface CommentRepository extends JpaRepository<Comment, UUID> {

    List<Comment> findByPostId(UUID postId);
}
