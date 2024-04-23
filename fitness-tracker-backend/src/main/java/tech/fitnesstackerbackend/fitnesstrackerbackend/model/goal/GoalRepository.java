package tech.fitnesstackerbackend.fitnesstrackerbackend.model.goal;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GoalRepository extends JpaRepository<Goal,Long> {
    Goal findByClientId(Integer clientId);
}
