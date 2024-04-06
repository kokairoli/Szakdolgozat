package tech.fitnesstackerbackend.fitnesstrackerbackend.model.workout;

import lombok.AllArgsConstructor;
import lombok.Data;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.exerciseset.ExerciseSet;


import java.util.List;

@AllArgsConstructor
@Data
public class WorkoutDTO {
    private String name;
    private String comment;
    private List<ExerciseSet> sets;

}
