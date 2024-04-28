package tech.fitnesstackerbackend.fitnesstrackerbackend.model.exerciseset;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CreateExerciseSetDTO {
    private Integer numberOfReps;
    private Integer numberOfSets;
    private Long exerciseId;
}
