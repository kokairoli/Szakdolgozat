package tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.User;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.UserDTO;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.UserService;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.coach.Coach;

import java.util.List;

@Service
public class ClientService extends UserService {

    private final ClientRepository clientRepository;


    @Autowired
    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public boolean userExists(String email){
        return clientRepository.findByEmail(email).isPresent();
    }

    public String getEmailFromSecurityContext(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Object principal = auth.getPrincipal();
        if (principal instanceof User) {
            return ((User)principal).getEmail();
        }
        return principal.toString();
    }

    public List<UserDTO> getClientsOfCoach(Integer coachId){
        return clientRepository.findAllByCoachId(coachId).stream().map(this::translateClientToUserDTO).toList();
    }

    public Client getLoggedInClient(){
        return clientRepository.findByEmail(getEmailFromSecurityContext()).orElseThrow();
    }
    public Client saveClient(Client client){
        return clientRepository.save(client);
    }

    public Integer getLoggedInUserId(){
        return clientRepository.findByEmail(getEmailFromSecurityContext()).orElseThrow().getId();
    }

    public Client getClientById(Integer id){
        return clientRepository.findById(id).orElseThrow();
    }

    public void saveCoachForClient(Client client,Coach coach){
        client.setCoach(coach);
        clientRepository.save(client);
    }



    public void deletedCoach(){}

    public UserDTO translateClientToUserDTO(Client client){
        return new UserDTO(client.getId(), client.getFirstName(),client.getLastName(),client.getEmail());
    }




}
