package tech.fitnesstackerbackend.fitnesstrackerbackend.model.exerciseset;


import lombok.Data;

@Data
public class CreateExerciseSetDTO {
    private Integer numberOfReps;
    private Integer numberOfSets;
    private Long exerciseId;
}
