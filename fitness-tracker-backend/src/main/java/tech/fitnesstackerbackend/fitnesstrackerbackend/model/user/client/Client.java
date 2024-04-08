package tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.client;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.User;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.coach.Coach;

@Entity
@Setter
public class Client extends User {

    @ManyToOne
    @JoinColumn(name="coach_id",referencedColumnName = "id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonManagedReference
    private Coach coach;

    public void removeCoach(){
        coach = null;
    }
}
