package br.com.teaweb.backend.config;

import br.com.teaweb.backend.model.Post;
import br.com.teaweb.backend.model.User;
import br.com.teaweb.backend.repository.PostRepository;
import br.com.teaweb.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Override
    public void run(String... args) throws Exception {
        postRepository.deleteAll();
        userRepository.deleteAll();

        User author = new User();
        author.setUsername("john");
        author.setEmail("john@teaweb.com");
        author.setPassword("123456");
        userRepository.save(author);

        Post post1 = new Post();
        post1.setTitle("Bem-vindo ao Fórum do Tea-Web!");
        post1.setContent("Este é o primeiro post do nosso fórum. Sinta-se à vontade para compartilhar suas experiências.");
        post1.setAuthor(author);

        Post post2 = new Post();
        post2.setTitle("Dicas de Atividades Sensoriais");
        post2.setContent("Gostaria de saber quais atividades vocês recomendam para crianças com sensibilidade tátil?");
        post2.setAuthor(author);

        postRepository.saveAll(List.of(post1, post2));

        System.out.println(">>> DADOS DE TESTE INSERIDOS NO H2! <<<");
    }
}