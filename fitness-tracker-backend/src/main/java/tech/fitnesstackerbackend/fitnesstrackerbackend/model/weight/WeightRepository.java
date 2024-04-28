package tech.fitnesstackerbackend.fitnesstrackerbackend.model.weight;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface WeightRepository extends JpaRepository<Weight,Long> {
    List<Weight> findByClientId(Integer clientId);

    @Query("SELECT w from Weight w WHERE w.client.id = ?1 ORDER BY w.recordedAt DESC LIMIT 1")
    Weight findLatestByClientId(Integer client_id);

    @Query("SELECT w from Weight w WHERE w.client.id = ?2 AND w.recordedAt = ?1")
    Optional<Weight> getWeightByRecordedAt(LocalDate recordedAt, Integer client_id);
}
