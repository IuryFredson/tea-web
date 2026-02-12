package br.com.teaweb.backend.auth.api.dto;

import br.com.teaweb.backend.auth.domain.Role;

import java.util.UUID;

public record MeResponse(UUID id, String email, Role role) {}
