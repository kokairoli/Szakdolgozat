package tech.fitnesstackerbackend.fitnesstrackerbackend.model.workout.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.UserDTO;

import java.util.List;


@AllArgsConstructor
@Data
public class WorkoutCoachDTO {
    private UserDTO client;
    private List<WorkoutOfCoachDTO> workouts;
}
