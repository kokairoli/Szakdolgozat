package tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.client;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client,Integer> {
    Optional<Client> findByEmail(String email);
    List<Client> findAllByCoachId(Integer coachId);
}
