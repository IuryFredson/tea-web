package br.com.teaweb.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "users")

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String username;

    @Column(unique = true)
    private String email;

    private String password;

    @OneToMany(mappedBy = "author")
    private List<Post> posts;
}
