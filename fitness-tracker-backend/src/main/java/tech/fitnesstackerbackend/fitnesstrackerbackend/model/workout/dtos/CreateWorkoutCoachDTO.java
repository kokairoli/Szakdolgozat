package tech.fitnesstackerbackend.fitnesstrackerbackend.model.workout.dtos;

import lombok.Getter;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.exerciseset.CreateExerciseSetDTO;

import java.util.List;


@Getter
public class CreateWorkoutCoachDTO {
    private Integer userId;
    private String name;
    private String comment;
    private String scheduled;
    private List<CreateExerciseSetDTO> createWorkoutSetDTOList;
}
