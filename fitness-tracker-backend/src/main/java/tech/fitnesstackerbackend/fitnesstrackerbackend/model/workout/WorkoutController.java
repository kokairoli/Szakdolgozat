package tech.fitnesstackerbackend.fitnesstrackerbackend.model.workout;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.comment.AddCommentDTO;

import java.util.List;

@RestController
@RequestMapping("api/v1/workout")
public class WorkoutController {
    private final WorkoutService workoutService;

    @Autowired
    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    @PostMapping("/client")
    public Workout createWorkout(@RequestBody CreateWorkoutDTO createWorkoutDTO){
        return workoutService.createWorkout(createWorkoutDTO);
    }

    @PostMapping("/coach")
    public Workout createWorkoutForUserFromCoach(@RequestBody CreateWorkoutCoachDTO createWorkoutCoachDTO){
        return workoutService.createWorkoutFromCoachToUser(createWorkoutCoachDTO);
    }

    @PatchMapping("set/add")
    public Workout addExerciseToWorkout(@RequestBody AddExerciseSetDTO addExerciseSetDTO){
        return workoutService.addSetToWorkout(addExerciseSetDTO);
    }

    @PatchMapping("set/remove")
    public Workout removeExerciseFromWorkout(@RequestBody RemoveExerciseSetDTO removeExerciseSetDTO){
        return workoutService.removeSetFromWorkout(removeExerciseSetDTO.getWorkoutId(), removeExerciseSetDTO.getWorkoutSetId());
    }

    @PatchMapping("finish/{workoutId}")
    public Workout finishWorkout(@PathVariable String workoutId){
        return workoutService.finishWorkout(Long.parseLong(workoutId));
    }

    @PatchMapping("cancel/{workoutId}")
    public Workout cancelFinishedWorkout(@PathVariable String workoutId){
        return workoutService.cancelFinishedWorkout(Long.parseLong(workoutId));
    }

    @DeleteMapping("{workoutId}")
    public void deleteWorkout(@PathVariable String workoutId){
        workoutService.deleteWorkout(Long.parseLong(workoutId));
    }




    @GetMapping("client")
    public List<Workout> getWorkoutsForClient(){
        return workoutService.getAllWorkoutForClient();
    }

    @GetMapping("client/{workoutId}")
    public Workout getWorkoutForUser(@PathVariable String workoutId){
        return workoutService.getWorkoutForClient(Long.parseLong(workoutId));
    }

    @GetMapping("coach/{clientId}")
    public List<Workout> getWorkoutsForCoach(@PathVariable String clientId){
        return workoutService.getAllWorkoutFromCoachByClientId(Integer.parseInt(clientId));
    }

    @PatchMapping("comment")
    public Workout addCommentToWorkout(@RequestBody AddCommentDTO addCommentDTO){
        return workoutService.addCommentToWorkout(addCommentDTO);
    }

}
