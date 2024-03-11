package tech.fitnesstackerbackend.fitnesstrackerbackend.model.weight;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.User;

import java.util.Date;

@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Weight {
    @Id
    @SequenceGenerator(name = "weight_sequence", sequenceName = "weight_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "weight_sequence")
    private Long id;

    @Column(nullable = false)
    private Double weight;

    @Column(nullable = false)
    private Date recordedAt;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private User user;


    @Override
    public String toString() {
        return weight +
                " kg";
    }
}
