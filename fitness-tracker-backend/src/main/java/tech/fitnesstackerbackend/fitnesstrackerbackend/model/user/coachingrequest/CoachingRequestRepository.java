package tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.coachingrequest;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CoachingRequestRepository extends JpaRepository<CoachingRequest,Long> {
    List<CoachingRequest> findAllByClientId(Integer clientId);

    List<CoachingRequest> findAllByCoachId(Integer coachId);
}
