package tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.coach;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.User;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.UserDTO;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.UserService;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.client.Client;


@Service
public class CoachService extends UserService {

    private final CoachRepository coachRepository;

    @Autowired
    public CoachService(CoachRepository coachRepository) {
        this.coachRepository = coachRepository;
    }


    public boolean userExists(String email){
        return coachRepository.findByEmail(email).isPresent();
    }

    public String getEmailFromSecurityContext(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Object principal = auth.getPrincipal();
        if (principal instanceof User) {
            return ((User)principal).getEmail();
        }
        return principal.toString();
    }

    public Coach getLoggedInCoach(){
        return coachRepository.findByEmail(getEmailFromSecurityContext()).orElseThrow();
    }

    public Integer getLoggedInUserId(){
        return coachRepository.findByEmail(getEmailFromSecurityContext()).orElseThrow().getId();
    }

    public Coach getCoachById(Integer id){
        return coachRepository.findById(id).orElseThrow();
    }

    public void addClientToClients(Client client){
        Coach coach = coachRepository.findByEmail(getEmailFromSecurityContext()).orElseThrow();
        coach.addClient(client);
        coachRepository.save(coach);
    }

    public void removeClientFromClients(Client client){
        Coach coach = getLoggedInCoach();
        coach.removeClient(client);
        coachRepository.save(coach);
    }

    public void removedClient(Client client, Coach coach){
        coach.removeClient(client);
        coachRepository.save(coach);
    }

    public UserDTO translateCoachToUserDTO(Coach coach){
        return new UserDTO(coach.getFirstName(),coach.getLastName(),coach.getEmail());
    }

}
