package tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.coachingrequest;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.client.Client;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.coach.Coach;

import java.util.Date;

@Entity
@Table
@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class CoachingRequest {

    @Id
    @SequenceGenerator(name = "coaching_sequence", sequenceName = "coaching_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "coaching_sequence")
    private Long id;

    @Column(nullable = false)
    private boolean active;

    @Column(nullable = false)
    private boolean accepted;

    private String message;


    @Column(nullable = false)
    private Date created_at;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.MERGE)
    @JoinColumn(name = "client_id",referencedColumnName = "id",nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonManagedReference
    private Client client;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.MERGE)
    @JoinColumn(name = "coach_id",referencedColumnName = "id",nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonManagedReference
    private Coach coach;
}
