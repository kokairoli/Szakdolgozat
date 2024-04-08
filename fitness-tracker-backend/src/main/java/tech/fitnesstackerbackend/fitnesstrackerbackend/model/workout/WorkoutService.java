package tech.fitnesstackerbackend.fitnesstrackerbackend.model.workout;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.comment.AddCommentDTO;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.exerciseset.ExerciseSet;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.exerciseset.ExerciseSetService;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.client.ClientService;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.coach.CoachService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class WorkoutService {

    private final WorkoutRepository workoutRepository;

    private final ExerciseSetService exerciseSetService;

    private final ClientService clientService;

    private final CoachService coachService;

    @Autowired
    public WorkoutService(WorkoutRepository workoutRepository, ExerciseSetService exerciseSetService, ClientService clientService, CoachService coachService) {
        this.workoutRepository = workoutRepository;
        this.exerciseSetService = exerciseSetService;
        this.clientService = clientService;
        this.coachService = coachService;
    }




    public List<Workout> getAllWorkoutForClient(){
        return workoutRepository.findAllByClientId(clientService.getLoggedInUserId());
    }

    public Workout getWorkoutForClient(Long id){
        return workoutRepository.findById(id).orElseThrow();
    }

    public Workout createWorkout(CreateWorkoutDTO createWorkoutDTO){
        Workout w = new Workout();

        w.setClient(clientService.getLoggedInClient());
        w.setName(createWorkoutDTO.getName());
        w.setComment(createWorkoutDTO.getComment());
        w.setCoachWorkout(false);
        List<ExerciseSet> exerciseSetList = new ArrayList<>();
        for (int i = 0; i < createWorkoutDTO.getCreateWorkoutSetDTOList().size(); i++) {
            ExerciseSet newExerciseSet = exerciseSetService.createSet(createWorkoutDTO.getCreateWorkoutSetDTOList().get(i));
            exerciseSetList.add(newExerciseSet);
        }
        w.setSets(exerciseSetList);
        return workoutRepository.save(w);
    }

    public Workout createWorkoutFromCoachToUser(CreateWorkoutCoachDTO createWorkoutCoachDTO){
        Workout w = new Workout();

        w.setClient(clientService.getClientById(createWorkoutCoachDTO.getUserId()));
        w.setName(createWorkoutCoachDTO.getName());
        w.setComment(createWorkoutCoachDTO.getComment());
        w.setCoach(coachService.getLoggedInCoach());
        w.setCoachWorkout(true);
        List<ExerciseSet> exerciseSetList = new ArrayList<>();
        for (int i = 0; i < createWorkoutCoachDTO.getCreateWorkoutSetDTOList().size(); i++) {
            ExerciseSet newExerciseSet = exerciseSetService.createSet(createWorkoutCoachDTO.getCreateWorkoutSetDTOList().get(i));
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

    public Workout addCommentToWorkout(AddCommentDTO addCommentDTO){
        Workout workout = workoutRepository.findById(addCommentDTO.getId()).orElseThrow();
        workout.setComment(addCommentDTO.getComment());
        return workoutRepository.save(workout);
    }

    public List<Workout> getAllWorkoutFromCoachByClientId(Integer clientId){
        return workoutRepository.findByCoachAndClientId(coachService.getLoggedInUserId(),clientId);
    }

    public Workout finishWorkout(Long workoutId){
        Workout workout = workoutRepository.findById(workoutId).orElseThrow();
        workout.setFinished(true);
        return workoutRepository.save(workout);
    }

    public Workout cancelFinishedWorkout(Long workoutId){
        Workout workout = workoutRepository.findById(workoutId).orElseThrow();
        workout.setFinished(false);
        return workoutRepository.save(workout);
    }

    public void deleteWorkout(Long workoutId){
        workoutRepository.delete(workoutRepository.findById(workoutId).orElseThrow());
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
