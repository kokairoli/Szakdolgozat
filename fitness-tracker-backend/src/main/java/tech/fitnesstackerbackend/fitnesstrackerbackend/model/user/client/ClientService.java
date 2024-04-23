package tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.User;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.UserDTO;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.UserService;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.coach.Coach;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.coach.CoachService;

@Service
public class ClientService extends UserService {

    private final ClientRepository clientRepository;

    private final CoachService coachService;

    @Autowired
    public ClientService(ClientRepository clientRepository, CoachService coachService) {
        this.clientRepository = clientRepository;
        this.coachService = coachService;
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

    public Client getLoggedInClient(){
        return clientRepository.findByEmail(getEmailFromSecurityContext()).orElseThrow();
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



    public void deleteCoach(Integer coachId){
        coachService.removedClient(getLoggedInClient(),coachService.getCoachById(coachId));
    }

    public void deletedCoach(){}

    public UserDTO translateClientToUserDTO(Client client){
        return new UserDTO(client.getId(), client.getFirstName(),client.getLastName(),client.getEmail());
    }




}
