package tech.fitnesstackerbackend.fitnesstrackerbackend.model.exerciseset;

import lombok.Data;

@Data
public class EditExerciseSetDTO {
    private Long id;
    private Integer numberOfReps;
    private Integer numberOfSets;
    private Long exerciseId;
}
