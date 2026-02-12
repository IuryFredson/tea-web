package br.com.teaweb.backend.auth.api;

import br.com.teaweb.backend.auth.api.dto.*;
import br.com.teaweb.backend.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public AuthResponse register(@RequestBody @Valid RegisterRequest req) {
        return authService.register(req);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody @Valid LoginRequest req) {
        return authService.login(req);
    }

    @GetMapping("/me")
    public MeResponse me(Authentication auth) {
        UUID userId = UUID.fromString(auth.getName());
        return authService.me(userId);
    }
}
