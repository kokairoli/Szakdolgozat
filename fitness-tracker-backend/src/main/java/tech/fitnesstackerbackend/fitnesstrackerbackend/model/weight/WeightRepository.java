package tech.fitnesstackerbackend.fitnesstrackerbackend.model.weight;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WeightRepository extends JpaRepository<Weight,Long> {
    List<Weight> findByClientId(Integer clientId);

    @Query("SELECT w from Weight w WHERE w.client.id = ?1 ORDER BY w.recordedAt DESC LIMIT 1")
    Weight findLatestByClientId(Integer client_id);
}
