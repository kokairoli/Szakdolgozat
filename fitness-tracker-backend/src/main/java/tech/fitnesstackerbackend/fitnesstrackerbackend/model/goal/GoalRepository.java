package tech.fitnesstackerbackend.fitnesstrackerbackend.model.goal;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GoalRepository extends JpaRepository<Goal,Long> {
    Optional<Goal> findByClientId(Integer clientId);
}
