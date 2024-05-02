package tech.fitnesstackerbackend.fitnesstrackerbackend.model.workout;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.comment.AddCommentDTO;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.workout.dtos.*;

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
    public WorkoutDTO createWorkout(@RequestBody CreateWorkoutDTO createWorkoutDTO){
        return workoutService.createWorkout(createWorkoutDTO);
    }

    @PostMapping("/coach")
    public WorkoutDTO createWorkoutForUserFromCoach(@RequestBody CreateWorkoutCoachDTO createWorkoutCoachDTO){
        return workoutService.createWorkoutFromCoachToUser(createWorkoutCoachDTO);
    }


    @PatchMapping("edit")
    public WorkoutDTO updateWorkout(@RequestBody EditWorkoutDTO editWorkoutDTO){
        return workoutService.updateWorkout(editWorkoutDTO);
    }

    @PatchMapping("finish/{workoutId}")
    public WorkoutDTO finishWorkout(@PathVariable String workoutId){
        return workoutService.finishWorkout(Long.parseLong(workoutId));
    }

    @PatchMapping("cancel/{workoutId}")
    public WorkoutDTO cancelFinishedWorkout(@PathVariable String workoutId){
        return workoutService.cancelFinishedWorkout(Long.parseLong(workoutId));
    }

    @DeleteMapping("{workoutId}")
    public void deleteWorkout(@PathVariable String workoutId){
        workoutService.deleteWorkout(Long.parseLong(workoutId));
    }




    @GetMapping("client")
    public List<WorkoutDTO> getWorkoutsForClient(){
        return workoutService.getAllWorkoutForClient();
    }

    @GetMapping("client/{workoutId}")
    public WorkoutDTO getWorkoutForUser(@PathVariable String workoutId){
        return workoutService.getWorkoutForClient(Long.parseLong(workoutId));
    }

    @GetMapping("client/currentMonth")
    public List<WorkoutDTO> getWorkoutForClientCurrentMonth(){
        return workoutService.getWorkoutForClientCurrentMonth();
    }

    @GetMapping("coach/{clientId}")
    public List<WorkoutDTO> getWorkoutsForCoach(@PathVariable String clientId){
        return workoutService.getAllWorkoutFromCoachByClientId(Integer.parseInt(clientId));
    }

    @GetMapping("coach")
    public List<WorkoutCoachDTO> getWorkoutsOfCoachGroupedByClients(){
        return workoutService.getWorkoutsOfCoachGroupedByClients();
    }

    @PatchMapping("comment")
    public WorkoutDTO addCommentToWorkout(@RequestBody AddCommentDTO addCommentDTO){
        return workoutService.addCommentToWorkout(addCommentDTO);
    }

}
