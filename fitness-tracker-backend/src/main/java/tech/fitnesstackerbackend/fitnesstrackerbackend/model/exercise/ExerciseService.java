package tech.fitnesstackerbackend.fitnesstrackerbackend.model.exercise;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ExerciseService {

    private final ExerciseRepository exerciseRepository;

    @Autowired
    public ExerciseService(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    public List<Exercise> getAllExercise(){
        return exerciseRepository.findAll();
    }
}
