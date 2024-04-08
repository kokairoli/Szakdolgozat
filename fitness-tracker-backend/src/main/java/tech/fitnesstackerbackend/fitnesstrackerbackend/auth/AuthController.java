package tech.fitnesstackerbackend.fitnesstrackerbackend.auth;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("client/register")
    public ResponseEntity<AuthResponse> registerClient(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authService.registerClient(request));
    }


    @PostMapping("client/login")
    public ResponseEntity<AuthResponse> loginClient(@RequestBody LoginRequest request){
        return ResponseEntity.ok(authService.loginClient(request));
    }

    @PostMapping("coach/register")
    public ResponseEntity<AuthResponse> registerCoach(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authService.registerCoach(request));
    }

    @PostMapping("coach/login")
    public ResponseEntity<AuthResponse> loginCoach(@RequestBody LoginRequest request){
        return ResponseEntity.ok(authService.loginCoach(request));
    }


}
