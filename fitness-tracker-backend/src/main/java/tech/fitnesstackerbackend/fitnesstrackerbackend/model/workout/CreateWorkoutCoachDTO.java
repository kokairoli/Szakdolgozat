package tech.fitnesstackerbackend.fitnesstrackerbackend.model.workout;

import lombok.Getter;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.exerciseset.CreateExerciseSetDTO;

import java.util.List;


@Getter
public class CreateWorkoutCoachDTO {
    private Integer userId;
    private String name;
    private String comment;
    private List<CreateExerciseSetDTO> createWorkoutSetDTOList;
}
