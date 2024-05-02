package tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.coach;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.Setter;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.User;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.client.Client;

import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
public class Coach extends User {



    @OneToMany(mappedBy = "coach", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<Client> clients = new ArrayList<>();


    public void addClient(Client client){
        clients.add(client);
    }

    public Integer getClientCount(){
        return clients.size();
    }

    public void removeClient(Client client){
        clients.remove(client);
    }

    public List<Client> getClients(){
        return clients;
    }
}
