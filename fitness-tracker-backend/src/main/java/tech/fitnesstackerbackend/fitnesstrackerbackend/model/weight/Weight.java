package tech.fitnesstackerbackend.fitnesstrackerbackend.model.weight;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.client.Client;

import java.time.LocalDate;

@Entity
@Table
@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class Weight {
    @Id
    @SequenceGenerator(name = "weight_sequence", sequenceName = "weight_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "weight_sequence")
    private Long id;

    @Column(nullable = false)
    private Double weight;

    @Column(nullable = false)
    private LocalDate recordedAt;


    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.MERGE)
    @JoinColumn(name = "client_id",referencedColumnName = "id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonManagedReference
    private Client client;

    public Weight(Double weight, LocalDate recordedAt) {
        this.weight = weight;
        this.recordedAt = recordedAt;
    }

    @Override
    public String toString() {
        return weight +
                " kg";
    }
}
