package tech.fitnesstackerbackend.fitnesstrackerbackend.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tech.fitnesstackerbackend.fitnesstrackerbackend.config.JwtService;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.Role;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.User;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository repository;

    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;

    public AuthResponse register(RegisterRequest request) {
        User user = User.builder().firstName(request.getFirstName()).lastName(request.getLastName()).email(request.getEmail()).password(passwordEncoder.encode(request.getPassword())).role(Role.USER).build();

        repository.save(user);
        String token = jwtService.generateToken(user);
        return AuthResponse.builder().token(token).build();
    }

    public AuthResponse login(LoginRequest request) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        User user = repository.findByEmail(request.getEmail()).orElseThrow();
        String token = jwtService.generateToken(user);
        return AuthResponse.builder().token(token).build();
    }
}
