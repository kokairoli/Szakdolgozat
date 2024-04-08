package tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.coachingrequest;

import lombok.AllArgsConstructor;
import lombok.Data;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.UserDTO;

@AllArgsConstructor
@Data
public class CoachingRequestDTO {
    private Long id;
    private boolean active;
    private boolean accepted;
    private String message;
    private UserDTO userDTO;

}
