package tech.fitnesstackerbackend.fitnesstrackerbackend.model.exerciseset;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.exercise.Exercise;

@Entity
@Table
@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class ExerciseSet {

    @Id
    @SequenceGenerator(name = "set_sequence", sequenceName = "set_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "set_sequence")
    private Long id;



    @Column(nullable = false)
    private Integer numberOfReps;

    @Column(nullable = false)
    private Integer numberOfSets;

    @ManyToOne(cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    @JoinColumn(name = "exercise_id", referencedColumnName = "id",nullable = false)
    @JsonManagedReference
    private Exercise exercise;
}
