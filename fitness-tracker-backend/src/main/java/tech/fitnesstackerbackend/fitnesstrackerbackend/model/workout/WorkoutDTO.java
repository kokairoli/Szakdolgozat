package tech.fitnesstackerbackend.fitnesstrackerbackend.model.workout;

import lombok.AllArgsConstructor;
import lombok.Data;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.exerciseset.ExerciseSet;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.UserDTO;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Data
public class WorkoutDTO {
    private Long id;
    private String name;
    private String comment;
    private boolean coachWorkout;
    private boolean finished;
    private List<ExerciseSet> sets;
    private UserDTO coach;
    private String scheduled;

}
