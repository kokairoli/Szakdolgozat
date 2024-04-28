package tech.fitnesstackerbackend.fitnesstrackerbackend.model.workout;


import lombok.Data;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.exerciseset.EditExerciseSetDTO;

import java.util.List;

@Data
public class EditWorkoutDTO {
    private Long id;
    private String name;
    private String comment;
    private String scheduled;
    private List<EditExerciseSetDTO> sets;
    private List<Long> forDeleteSetIds;
}
