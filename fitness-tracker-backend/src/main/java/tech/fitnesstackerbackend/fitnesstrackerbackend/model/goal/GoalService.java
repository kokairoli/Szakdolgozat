package tech.fitnesstackerbackend.fitnesstrackerbackend.model.goal;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.client.Client;
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

    public Goal editGoalForClient(EditGoalDTO editGoalDTO){
        final Client loggedInClient = clientService.getLoggedInClient();
        Optional<Goal> goal = goalRepository.findByClientId(loggedInClient.getId());
        if (goal.isPresent()){
            if (editGoalDTO.getTargetWeight() != null){
                goal.get().setTargetWeight(editGoalDTO.getTargetWeight());
            }
            if (editGoalDTO.getTargetWorkoutCount() != null){
                goal.get().setTargetWorkoutCount(editGoalDTO.getTargetWorkoutCount());
            }
            return goalRepository.save(goal.get());
        }

        throw new IllegalArgumentException();


    }

    public Goal createGoalForClient(EditGoalDTO editGoalDTO){
        Goal newGoal = new Goal();
        newGoal.setClient(clientService.getLoggedInClient());
        if (editGoalDTO.getTargetWeight() != null){
            newGoal.setTargetWeight(editGoalDTO.getTargetWeight());
        }
        if (editGoalDTO.getTargetWorkoutCount() != null){
            newGoal.setTargetWorkoutCount(editGoalDTO.getTargetWorkoutCount());
        }
        return goalRepository.save(newGoal);
    }
}
