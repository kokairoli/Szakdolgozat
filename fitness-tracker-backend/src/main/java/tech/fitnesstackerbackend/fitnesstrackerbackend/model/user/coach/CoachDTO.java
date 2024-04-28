package tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.coach;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class CoachDTO {
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private Integer numberOfClients;
}
