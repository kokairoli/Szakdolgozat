package tech.fitnesstackerbackend.fitnesstrackerbackend.model.exerciseset;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.exercise.Exercise;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.exercise.ExerciseRepository;

import java.util.Optional;

@Service
public class ExerciseSetService {

    private final ExerciseRepository exerciseRepository;
    private final ExerciseSetRepository exerciseSetRepository;


    @Autowired
    public ExerciseSetService(ExerciseSetRepository exerciseSetRepository, ExerciseRepository exerciseRepository) {
        this.exerciseSetRepository = exerciseSetRepository;
        this.exerciseRepository = exerciseRepository;
    }




    public ExerciseSet createSet(CreateExerciseSetDTO createExerciseSetDTO){

        Optional<Exercise> exercise = exerciseRepository.findById(createExerciseSetDTO.getExerciseId());
        if (exercise.isPresent()){
            ExerciseSet exerciseSet = new ExerciseSet();
            exerciseSet.setNumberOfSets(createExerciseSetDTO.getNumberOfSets());
            exerciseSet.setNumberOfReps(createExerciseSetDTO.getNumberOfReps());
            exerciseSet.setExercise(exercise.get());
            return exerciseSetRepository.save(exerciseSet);
        }
        throw new IllegalArgumentException();
    }

    public ExerciseSet updateExerciseOfSet(Long setId, Long exerciseId){
        Optional<ExerciseSet> set = exerciseSetRepository.findById(setId);
        Optional<Exercise> exercise = exerciseRepository.findById(exerciseId);

        if (set.isPresent()&&exercise.isPresent()){
            set.get().setExercise(exercise.get());
            return exerciseSetRepository.save(set.get());
        }

        throw new IllegalArgumentException();
    }

    public ExerciseSet getExerciseSet(Long id){
        Optional<ExerciseSet> workoutSet = exerciseSetRepository.findById(id);
        if (workoutSet.isPresent()) {
            return workoutSet.get();
        }
        throw new IllegalArgumentException("Cannot find workout set");
    }
}
