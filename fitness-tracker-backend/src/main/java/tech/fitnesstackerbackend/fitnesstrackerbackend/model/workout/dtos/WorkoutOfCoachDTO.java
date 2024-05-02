package tech.fitnesstackerbackend.fitnesstrackerbackend.model.workout.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.exerciseset.ExerciseSet;

import java.util.List;

@AllArgsConstructor
@Data
public class WorkoutOfCoachDTO {
    private Long id;
    private String name;
    private String comment;
    private Integer clientId;
    private boolean finished;
    private List<ExerciseSet> sets;
    private String scheduled;
}
