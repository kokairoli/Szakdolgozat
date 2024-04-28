package tech.fitnesstackerbackend.fitnesstrackerbackend.model.goal;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.client.Client;

@Entity
@Table
@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class Goal {
    @Id
    @SequenceGenerator(name = "goal_sequence", sequenceName = "goal_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "goal_sequence")
    private Long id;

    @Column(nullable = true)
    private double targetWeight;

    @Column(nullable = true)
    private Short targetWorkoutCount;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "client_id", referencedColumnName = "id")
    @JsonIgnore
    private Client client;
}
