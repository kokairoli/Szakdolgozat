package tech.fitnesstackerbackend.fitnesstrackerbackend.model.workout;

import lombok.Data;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.exerciseset.CreateExerciseSetDTO;

import java.util.List;

@Data
public class CreateWorkoutDTO {
    private String name;
    private String comment;
    private List<CreateExerciseSetDTO> createWorkoutSetDTOList;
}
