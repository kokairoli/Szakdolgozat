package tech.fitnesstackerbackend.fitnesstrackerbackend.model.workout;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.comment.AddCommentDTO;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.exerciseset.CreateExerciseSetDTO;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.exerciseset.EditExerciseSetDTO;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.exerciseset.ExerciseSet;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.exerciseset.ExerciseSetService;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.client.Client;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.client.ClientService;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.coach.Coach;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.coach.CoachService;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.workout.dtos.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class WorkoutService {

    private final WorkoutRepository workoutRepository;

    private final ExerciseSetService exerciseSetService;

    private final ClientService clientService;

    private final CoachService coachService;

    private static final DateTimeFormatter isoFormatter =DateTimeFormatter.ISO_DATE_TIME;

    @Autowired
    public WorkoutService(WorkoutRepository workoutRepository, ExerciseSetService exerciseSetService, ClientService clientService, CoachService coachService) {
        this.workoutRepository = workoutRepository;
        this.exerciseSetService = exerciseSetService;
        this.clientService = clientService;
        this.coachService = coachService;
    }




    public List<WorkoutDTO> getAllWorkoutForClient(){
        return workoutRepository.findAllByClientId(clientService.getLoggedInUserId()).stream().map(this::translateWorkoutToWorkoutDTO).toList();
    }

    public WorkoutDTO getWorkoutForClient(Long id){
        return this.translateWorkoutToWorkoutDTO(workoutRepository.findById(id).orElseThrow());
    }

    public WorkoutDTO createWorkout(CreateWorkoutDTO createWorkoutDTO){
        Workout w = new Workout();

        w.setClient(clientService.getLoggedInClient());
        w.setName(createWorkoutDTO.getName());
        w.setComment(createWorkoutDTO.getComment());
        w.setScheduled(LocalDateTime.parse(createWorkoutDTO.getScheduled(),isoFormatter));
        w.setCoachWorkout(false);
        List<ExerciseSet> exerciseSetList = new ArrayList<>();
        for (int i = 0; i < createWorkoutDTO.getCreateWorkoutSetDTOList().size(); i++) {
            ExerciseSet newExerciseSet = exerciseSetService.createSet(createWorkoutDTO.getCreateWorkoutSetDTOList().get(i));
            exerciseSetList.add(newExerciseSet);
        }
        w.setSets(exerciseSetList);
        return translateWorkoutToWorkoutDTO(workoutRepository.save(w));
    }

    public List<WorkoutCoachDTO> getWorkoutsOfCoachGroupedByClients(){
        Coach coach = coachService.getLoggedInCoach();
        List<WorkoutCoachDTO> workoutCoachDTOList = new ArrayList<>();
        for (Client client:coach.getClients()){
            WorkoutCoachDTO workoutCoachDTO = new WorkoutCoachDTO(clientService.translateClientToUserDTO(client),getAllWorkoutFromCoachByClientId(coach.getId(),client.getId()));
            workoutCoachDTOList.add(workoutCoachDTO);
        }
        return workoutCoachDTOList;
    }



    public WorkoutDTO createWorkoutFromCoachToUser(CreateWorkoutCoachDTO createWorkoutCoachDTO){
        Workout w = new Workout();

        w.setClient(clientService.getClientById(createWorkoutCoachDTO.getUserId()));
        w.setName(createWorkoutCoachDTO.getName());
        w.setComment(createWorkoutCoachDTO.getComment());
        w.setCoach(coachService.getLoggedInCoach());
        w.setScheduled(LocalDateTime.parse(createWorkoutCoachDTO.getScheduled(),isoFormatter));
        w.setCoachWorkout(true);
        List<ExerciseSet> exerciseSetList = new ArrayList<>();
        for (int i = 0; i < createWorkoutCoachDTO.getCreateWorkoutSetDTOList().size(); i++) {
            ExerciseSet newExerciseSet = exerciseSetService.createSet(createWorkoutCoachDTO.getCreateWorkoutSetDTOList().get(i));
            exerciseSetList.add(newExerciseSet);
        }
        w.setSets(exerciseSetList);
        return translateWorkoutToWorkoutDTO(workoutRepository.save(w));
    }

    public WorkoutDTO updateWorkout(EditWorkoutDTO editWorkoutDTO){
        Optional<Workout> w = workoutRepository.findById(editWorkoutDTO.getId());
        if (w.isPresent()){
            w.get().setName(editWorkoutDTO.getName());
            w.get().setComment(editWorkoutDTO.getComment());
            w.get().setScheduled(LocalDateTime.parse(editWorkoutDTO.getScheduled(),isoFormatter));
            if (editWorkoutDTO.getClientId() != null){
                Client newClient = clientService.getClientById(editWorkoutDTO.getClientId());
                w.get().setClient(newClient);
            }

            for (int i = 0; i < editWorkoutDTO.getForDeleteSetIds().size(); i++) {
                final Long setId = editWorkoutDTO.getForDeleteSetIds().get(i);
                Optional<ExerciseSet> e = w.get().getSets().stream().filter(set->set.getId().equals(setId)).findFirst();
                if (e.isPresent()){
                    w.get().getSets().remove(e.get());
                }
            }

            for (int i = 0; i < editWorkoutDTO.getSets().size(); i++){
                final EditExerciseSetDTO editExerciseSet = editWorkoutDTO.getSets().get(i);
                if (editExerciseSet.getId() != -1){
                    exerciseSetService.updateSet(editExerciseSet);
                }else{
                    CreateExerciseSetDTO createExerciseSetDTO = new CreateExerciseSetDTO(editExerciseSet.getNumberOfSets(), editExerciseSet.getNumberOfReps(), editExerciseSet.getExerciseId());
                    w.get().getSets().add(exerciseSetService.createSet(createExerciseSetDTO));
                }

            }
            return translateWorkoutToWorkoutDTO(workoutRepository.save(w.get()));
        }

        throw new IllegalArgumentException();
    }

    public WorkoutDTO addCommentToWorkout(AddCommentDTO addCommentDTO){
        Workout workout = workoutRepository.findById(addCommentDTO.getId()).orElseThrow();
        workout.setComment(addCommentDTO.getComment());
        return translateWorkoutToWorkoutDTO(workoutRepository.save(workout));
    }



    public List<WorkoutDTO> getAllWorkoutFromCoachByClientId(Integer clientId){
        return workoutRepository.findByCoachAndClientId(coachService.getLoggedInUserId(),clientId).stream().map(this::translateWorkoutToWorkoutDTO).toList();
    }

    public List<WorkoutOfCoachDTO> getAllWorkoutFromCoachByClientId(Integer coachId, Integer clientId){
        return workoutRepository.findByCoachAndClientId(coachService.getLoggedInUserId(),clientId).stream().map(this::translateWorkoutToWorkoutOfCoachDTO).toList();
    }

    public List<WorkoutDTO> getWorkoutForClientCurrentMonth(){
        final LocalDate now = LocalDate.now();
        return workoutRepository.getClientWorkoutForCurrentMonth(clientService.getLoggedInUserId(), now.getMonthValue(),now.getYear()).stream().map(this::translateWorkoutToWorkoutDTO).toList();
    }

    public WorkoutDTO finishWorkout(Long workoutId){
        Workout workout = workoutRepository.findById(workoutId).orElseThrow();
        workout.setFinished(true);
        return translateWorkoutToWorkoutDTO(workoutRepository.save(workout));
    }

    public WorkoutDTO cancelFinishedWorkout(Long workoutId){
        Workout workout = workoutRepository.findById(workoutId).orElseThrow();
        workout.setFinished(false);
        return translateWorkoutToWorkoutDTO(workoutRepository.save(workout));
    }

    public void deleteWorkout(Long workoutId){
        workoutRepository.delete(workoutRepository.findById(workoutId).orElseThrow());
    }

    public WorkoutDTO removeSetFromWorkout(Long workoutId,Long exerciseSetId){
        Optional<Workout> workout = workoutRepository.findById(workoutId);
        ExerciseSet exerciseSet = exerciseSetService.getExerciseSet(exerciseSetId);

        if (workout.isPresent()){
            workout.get().getSets().remove(exerciseSet);

            return translateWorkoutToWorkoutDTO(workoutRepository.save(workout.get()));
        }

        throw new IllegalArgumentException();
    }

    public WorkoutDTO translateWorkoutToWorkoutDTO(Workout workout){
        return new WorkoutDTO(workout.getId(),workout.getName(), workout.getComment(), workout.isCoachWorkout(), workout.isFinished(),workout.getSets(), coachService.translateCoachToUserDTO(workout.getCoach()),workout.getScheduled().format(isoFormatter));
    }

    public WorkoutOfCoachDTO translateWorkoutToWorkoutOfCoachDTO(Workout workout){
        return new WorkoutOfCoachDTO(workout.getId(),workout.getName(), workout.getComment(),workout.getClient().getId(),  workout.isFinished(),workout.getSets(),workout.getScheduled().format(isoFormatter));
    }

}
