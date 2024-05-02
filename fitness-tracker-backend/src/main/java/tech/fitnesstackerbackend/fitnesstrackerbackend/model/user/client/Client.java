package tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.client;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Setter;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.User;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.coach.Coach;

@Entity
@Setter
public class Client extends User {

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name="coach_id",referencedColumnName = "id")
    @JsonManagedReference
    private Coach coach;

    public void removeCoach(){
        coach = null;
    }

    public Coach getCoach(){
        return coach;
    }
}
