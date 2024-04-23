package tech.fitnesstackerbackend.fitnesstrackerbackend.model.exercise;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Table
@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class Exercise {
    @Id
    @SequenceGenerator(name = "exercise_sequence", sequenceName = "exercise_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "exercise_sequence")
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private MuscleGroup targetMuscleGroup;
    private String equipment;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Mechanics mechanics;



}
