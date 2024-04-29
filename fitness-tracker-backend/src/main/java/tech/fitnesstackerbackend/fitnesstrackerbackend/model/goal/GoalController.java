package tech.fitnesstackerbackend.fitnesstrackerbackend.model.goal;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/v1/goal")
public class GoalController {

    private final GoalService goalService;

    @Autowired
    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    @GetMapping
    public Optional<Goal> getGoalOfClient(){
        return goalService.getGoalForClient();
    }

    @PostMapping
    public Goal createGoalForClient(@RequestBody EditGoalDTO editGoalDTO){return goalService.createGoalForClient(editGoalDTO);}

    @PatchMapping
    public Goal editGoalForClient(@RequestBody EditGoalDTO editGoalDTO){return goalService.editGoalForClient(editGoalDTO);}
}
