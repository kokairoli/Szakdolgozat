package tech.fitnesstackerbackend.fitnesstrackerbackend.model.workout;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.exerciseset.ExerciseSet;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.client.Client;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.coach.Coach;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class Workout {
    @Id
    @SequenceGenerator(name = "workout_sequence", sequenceName = "workout_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "workout_sequence")
    private Long id;

    @Column(nullable = false)
    private String name;

    private String comment;

    private boolean coachWorkout;

    private boolean finished;

    private LocalDateTime scheduled;




    /*@ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "workout_exercises",
            joinColumns = @JoinColumn(name = "workout_id",referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "exercise_id",referencedColumnName = "id")
    )*/

    @OneToMany
    @JoinColumn(name="workout_id",referencedColumnName = "id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonManagedReference
    @Column(nullable = true)
    private List<ExerciseSet> sets = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.MERGE)
    @JoinColumn(name = "client_id",referencedColumnName = "id",nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Client client;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.MERGE)
    @JoinColumn(name = "coach_id",referencedColumnName = "id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonManagedReference
    private Coach coach;



}
