package tech.fitnesstackerbackend.fitnesstrackerbackend.model.workout;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WorkoutRepository extends JpaRepository<Workout,Long> {

    List<Workout> findAllByClientId(Integer clientId);

    @Query("SELECT w FROM Workout w WHERE w.coach.id = ?1 AND w.client.id=?2 AND w.coachWorkout = true")
    List<Workout> findByCoachAndClientId(Integer coachId,Integer clientId);

    @Query("SELECT w FROM Workout w WHERE MONTH(w.scheduled) = ?2 AND YEAR(w.scheduled) = ?3 AND w.client.id = ?1")
    List<Workout> getClientWorkoutForCurrentMonth(Integer clientId,Integer month,Integer year);


}
