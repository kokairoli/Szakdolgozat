package tech.fitnesstackerbackend.fitnesstrackerbackend.model.workout;

import lombok.Data;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.exerciseset.CreateExerciseSetDTO;


@Data
public class AddExerciseSetDTO {
    private Long workoutId;
    private CreateExerciseSetDTO createExerciseSetDTO;
}
