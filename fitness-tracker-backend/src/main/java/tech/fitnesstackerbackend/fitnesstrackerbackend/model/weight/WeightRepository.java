package tech.fitnesstackerbackend.fitnesstrackerbackend.model.weight;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WeightRepository extends JpaRepository<Weight,Long> {

}
