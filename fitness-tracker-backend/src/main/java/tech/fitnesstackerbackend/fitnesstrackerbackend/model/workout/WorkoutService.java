package tech.fitnesstackerbackend.fitnesstrackerbackend.model.workout;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.exerciseset.ExerciseSet;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.exerciseset.ExerciseSetService;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class WorkoutService {

    private final WorkoutRepository workoutRepository;

    private final ExerciseSetService exerciseSetService;

    private final UserService userService;


    @Autowired
    public WorkoutService(WorkoutRepository workoutRepository,UserService userService,ExerciseSetService exerciseSetService) {
        this.workoutRepository = workoutRepository;
        this.userService = userService;
        this.exerciseSetService = exerciseSetService;
    }

    public List<Workout> getAllWorkoutForUser(){
        return workoutRepository.findAllByUserId(userService.getLoggedInUserId());
    }

    public Workout getWorkoutForUser(Long id){
        return workoutRepository.findById(id).orElseThrow();
    }

    public Workout createWorkout(CreateWorkoutDTO createWorkoutDTO){
        Workout w = new Workout();

        w.setUser(userService.getLoggedInUser());
        w.setName(createWorkoutDTO.getName());
        w.setComment(createWorkoutDTO.getComment());
        List<ExerciseSet> exerciseSetList = new ArrayList<>();
        for (int i = 0; i < createWorkoutDTO.getCreateWorkoutSetDTOList().size(); i++) {
            System.out.println("NOT CREATED");
             ExerciseSet newExerciseSet = exerciseSetService.createSet(createWorkoutDTO.getCreateWorkoutSetDTOList().get(i));
            System.out.println("CREATED");
            exerciseSetList.add(newExerciseSet);
        }
        w.setSets(exerciseSetList);
        return workoutRepository.save(w);
    }

    public Workout addSetToWorkout(AddExerciseSetDTO addExerciseSetDTO){
        Optional<Workout> w = workoutRepository.findById(addExerciseSetDTO.getWorkoutId());

        if (w.isPresent()){

            w.get().getSets().add(exerciseSetService.createSet(addExerciseSetDTO.getCreateExerciseSetDTO()));
            return workoutRepository.save(w.get());
        }

        throw new IllegalArgumentException();
    }

    public List<Workout> getWorkoutsFromCoachToUser(){
        return workoutRepository.findAllByUserId(userService.getLoggedInUserId()).stream().filter((Workout::isCoachWorkout)).toList();
    }

    public Workout removeSetFromWorkout(Long workoutId,Long exerciseSetId){
        Optional<Workout> workout = workoutRepository.findById(workoutId);
        ExerciseSet exerciseSet = exerciseSetService.getExerciseSet(exerciseSetId);

        if (workout.isPresent()){
            workout.get().getSets().remove(exerciseSet);

            return workoutRepository.save(workout.get());
        }

        throw new IllegalArgumentException();
    }
}
