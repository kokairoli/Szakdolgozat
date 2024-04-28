package tech.fitnesstackerbackend.fitnesstrackerbackend.model.exercise;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("api/v1/exercise")
public class ExerciseController {

    private final ExerciseService exerciseService;

    @Autowired
    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @GetMapping
    public List<Exercise> getAllExercises(){
        return exerciseService.getAllExercise();
    }

    @GetMapping("/enums")
    public ExerciseEnumsDTO getExerciseEnums(){
        return new ExerciseEnumsDTO(Arrays.stream(Difficulty.values()).toList(), Arrays.stream(Mechanics.values()).toList(), Arrays.stream(MuscleGroup.values()).toList(),exerciseService.getEquipmentGroups());
    }

}
