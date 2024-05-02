package tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.coach;

import jakarta.annotation.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.User;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.UserDTO;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.UserService;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.client.Client;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.client.ClientService;

import java.util.List;
import java.util.Optional;


@Service
public class CoachService extends UserService {

    private final CoachRepository coachRepository;
    private final ClientService clientService;

    @Autowired
    public CoachService(CoachRepository coachRepository, ClientService clientService) {
        this.coachRepository = coachRepository;
        this.clientService = clientService;
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

    public List<CoachDTO> getAllCoach(){
        return coachRepository.findAll().stream().map(this::translateCoachToCoachDTO).toList();
    }

    public UserDTO getCoachOfClient(){
        return  translateCoachToUserDTO(clientService.getLoggedInClient().getCoach());
    }

    public List<UserDTO> getClientsOfCoach(){
        return clientService.getClientsOfCoach(getLoggedInUserId());
    }

    public void removeClient(Integer clientId){
        Coach coach = getLoggedInCoach();
        Client client = clientService.getClientById(clientId);
        coach.removeClient(client);
        client.removeCoach();
        clientService.saveClient(client);
        coachRepository.save(coach);

    }

    public void removeCoach(Integer coachId){
        Client client = clientService.getLoggedInClient();
        Optional<Coach> coach = coachRepository.findById(coachId);
        if (coach.isPresent()){
            coach.get().removeClient(client);
            client.removeCoach();
            clientService.saveClient(client);
            coachRepository.save(coach.get());
        }
    }



    public UserDTO translateCoachToUserDTO(@Nullable Coach coach){
        if (coach == null){
            return null;
        }
        return new UserDTO(coach.getId(),coach.getFirstName(),coach.getLastName(),coach.getEmail());
    }

    public CoachDTO translateCoachToCoachDTO(@Nullable Coach coach){
        if (coach == null){
            return null;
        }
        return new CoachDTO(coach.getId(),coach.getFirstName(),coach.getLastName(),coach.getEmail(),coach.getClientCount());
    }

}
