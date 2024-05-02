package tech.fitnesstackerbackend.fitnesstrackerbackend.model.workout.dtos;

import lombok.Data;

@Data
public class RemoveExerciseSetDTO {
    private Long workoutId;
    private Long workoutSetId;
}
