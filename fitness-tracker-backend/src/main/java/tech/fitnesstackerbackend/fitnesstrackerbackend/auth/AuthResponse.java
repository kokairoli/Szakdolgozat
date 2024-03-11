package tech.fitnesstackerbackend.fitnesstrackerbackend.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Optional;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class AuthResponse {
    private String token;
    private String errorMessage;

}
