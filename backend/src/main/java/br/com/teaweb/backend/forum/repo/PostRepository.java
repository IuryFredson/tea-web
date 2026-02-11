package br.com.teaweb.backend.forum.repo;

import br.com.teaweb.backend.forum.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, UUID> {
}
