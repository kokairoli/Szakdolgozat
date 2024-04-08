package tech.fitnesstackerbackend.fitnesstrackerbackend.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tech.fitnesstackerbackend.fitnesstrackerbackend.config.JwtService;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.Role;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.client.Client;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.client.ClientRepository;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.client.ClientService;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.coach.Coach;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.coach.CoachRepository;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.coach.CoachService;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final CoachRepository coachRepository;
    private final ClientRepository clientRepository;

    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;
    private final CoachService coachService;
    private final ClientService clientService;



    public AuthResponse registerCoach(RegisterRequest request) {
        if (emailTakenInClientOrCoach(request.getEmail())){
            return throwEmailTakenError();
        }


        Coach coach = new Coach();
        coach.setFirstName(request.getFirstName());
        coach.setLastName(request.getLastName());
        coach.setEmail(request.getEmail());
        coach.setPassword(passwordEncoder.encode(request.getPassword()));
        coach.setRole(Role.COACH);
        coachRepository.save(coach);
        String token = jwtService.generateToken(coach);
        return AuthResponse.builder().token(token).build();
    }

    public AuthResponse registerClient(RegisterRequest request) {
        if (emailTakenInClientOrCoach(request.getEmail())){
            return throwEmailTakenError();
        }


        Client client = new Client();
        client.setFirstName(request.getFirstName());
        client.setLastName(request.getLastName());
        client.setEmail(request.getEmail());
        client.setPassword(passwordEncoder.encode(request.getPassword()));
        client.setRole(Role.CLIENT);
        clientRepository.save(client);
        String token = jwtService.generateToken(client);
        return AuthResponse.builder().token(token).build();
    }

    public AuthResponse loginClient(LoginRequest request) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        Client client = clientRepository.findByEmail(request.getEmail()).orElseThrow();
        String token = jwtService.generateToken(client);
        return AuthResponse.builder().token(token).build();
    }

    public AuthResponse loginCoach(LoginRequest request) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        Coach coach = coachRepository.findByEmail(request.getEmail()).orElseThrow();
        String token = jwtService.generateToken(coach);
        return AuthResponse.builder().token(token).build();
    }

    public boolean emailTakenInClientOrCoach(String email){
        return coachService.userExists(email) || clientService.userExists(email);
    }

    public AuthResponse throwEmailTakenError(){
        return AuthResponse.builder().errorMessage("Email already taken").build();
    }
}
