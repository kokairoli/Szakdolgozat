package tech.fitnesstackerbackend.fitnesstrackerbackend.model.goal;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.client.ClientService;

import java.util.Optional;

@Service
public class GoalService {
    private final GoalRepository goalRepository;

    private final ClientService clientService;

    @Autowired
    public GoalService(GoalRepository goalRepository, ClientService clientService) {
        this.goalRepository = goalRepository;
        this.clientService = clientService;
    }




    public Optional<Goal> getGoalForClient(){
        return goalRepository.findByClientId(clientService.getLoggedInUserId());
    }
}
