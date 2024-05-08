package tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.coach;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.UserDTO;

import java.util.List;

@RestController
@RequestMapping("api/v1/coach")
public class CoachController {
    private final CoachService coachService;

    @Autowired
    public CoachController(CoachService coachService) {
        this.coachService = coachService;
    }

    @GetMapping()
    public List<CoachDTO> getAllCoaches(){
        return coachService.getAllCoach();
    }

    @GetMapping("/one")
    public UserDTO getCoachOfClient(){
        return coachService.getCoachOfClient();
    }

    @GetMapping("/clients")
    public List<UserDTO> getClientsOfCoach(){
        return coachService.getClientsOfCoach();
    }

    @PatchMapping("/clients/remove")
    public void removeClient(@RequestBody Integer clientId){
        coachService.removeClient(clientId);
    }

    @PatchMapping("/remove")
    public void removeCoach(@RequestBody Integer coachId){
        coachService.removeCoach(coachId);
    }
}
