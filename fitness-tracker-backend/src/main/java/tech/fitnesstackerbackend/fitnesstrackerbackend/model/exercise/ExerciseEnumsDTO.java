package tech.fitnesstackerbackend.fitnesstrackerbackend.model.exercise;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;


@AllArgsConstructor
@Data
public class ExerciseEnumsDTO {
    private List<Difficulty> difficultys;
    private List<Mechanics> mechanics;
    private List<MuscleGroup> muscleGroups;
    private List<String> equipments;
}
