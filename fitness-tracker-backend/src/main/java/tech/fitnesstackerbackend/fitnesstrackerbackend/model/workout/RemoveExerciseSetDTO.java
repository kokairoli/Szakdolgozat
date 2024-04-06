package tech.fitnesstackerbackend.fitnesstrackerbackend.model.workout;

import lombok.Data;

@Data
public class RemoveExerciseSetDTO {
    private Long workoutId;
    private Long workoutSetId;
}
