package tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.coach;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CoachRepository extends JpaRepository<Coach,Integer> {
    Optional<Coach> findByEmail(String email);
}
