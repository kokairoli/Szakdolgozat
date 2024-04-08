package tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.coachingrequest;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class CreateCoachingRequestDTO {
    private Integer coachId;
    private String message;
}
