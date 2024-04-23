package tech.fitnesstackerbackend.fitnesstrackerbackend.model.workout;


import lombok.Data;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.exerciseset.ExerciseSet;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.UserDTO;

import java.util.List;

@Data
public class EditWorkoutDTO {
    private Long id;
    private String name;
    private String comment;
    private boolean coachWorkout;
    private boolean finished;
    private List<ExerciseSet> sets;
    private UserDTO coach;
}
