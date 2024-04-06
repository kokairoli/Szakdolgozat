package tech.fitnesstackerbackend.fitnesstrackerbackend.model.workout;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/workout")
public class WorkoutController {
    private final WorkoutService workoutService;

    @Autowired
    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    @PostMapping
    public Workout createWorkout(@RequestBody CreateWorkoutDTO createWorkoutDTO){
        return workoutService.createWorkout(createWorkoutDTO);
    }

    @PatchMapping("set/add")
    public Workout addExerciseToWorkout(@RequestBody AddExerciseSetDTO addExerciseSetDTO){
        return workoutService.addSetToWorkout(addExerciseSetDTO);
    }

    @PatchMapping("set/remove")
    public Workout removeExerciseFromWorkout(@RequestBody RemoveExerciseSetDTO removeExerciseSetDTO){
        return workoutService.removeSetFromWorkout(removeExerciseSetDTO.getWorkoutId(), removeExerciseSetDTO.getWorkoutSetId());
    }




    @GetMapping()
    public List<Workout> getWorkoutsForUser(){
        return workoutService.getAllWorkoutForUser();
    }

    @GetMapping("{workoutId}")
    public Workout getWorkoutForUser(@RequestParam("workoutId") Long id){
        return workoutService.getWorkoutForUser(id);
    }

}
