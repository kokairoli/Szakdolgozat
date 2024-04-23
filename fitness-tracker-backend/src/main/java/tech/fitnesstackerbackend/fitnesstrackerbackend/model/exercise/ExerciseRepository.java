package tech.fitnesstackerbackend.fitnesstrackerbackend.model.exercise;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise,Long> {
    @Query("select e.equipment from Exercise e group by e.equipment")
    public List<String> getEquipmentGroups();
}
