package tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.coachingrequest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/coachingRequest")
public class CoachingRequestController {

    private final CoachingRequestService coachingRequestService;

    @Autowired
    public CoachingRequestController(CoachingRequestService coachingRequestService) {
        this.coachingRequestService = coachingRequestService;
    }

    @GetMapping("/client")
    public List<CoachingRequestDTO> getRequestsOfClient(){
        return coachingRequestService.getRequestsOfClient();
    }
    @GetMapping("/coach")
    public List<CoachingRequestDTO> getRequestsOfCoach(){
        return coachingRequestService.getRequestsOfCoach();
    }

    @PostMapping("/client")
    public CoachingRequestDTO createRequest(@RequestBody CreateCoachingRequestDTO createCoachingRequestDTO){
        return coachingRequestService.createCoachingRequest(createCoachingRequestDTO);
    }

    @PatchMapping("/coach/accept")
    public void acceptCoachingRequest(@RequestBody Long coachingRequestId){
        coachingRequestService.acceptCoachingRequest(coachingRequestId);
    }

    @PatchMapping("/coach/refuse")
    public void refuseCoachingRequest(@RequestBody Long coachingRequestId){
        coachingRequestService.refuseCoachingRequest(coachingRequestId);
    }

    @DeleteMapping("/client/{coachRequestId}")
    public void deleteCoachingRequest(@PathVariable Long coachRequestId){
        coachingRequestService.deleteCoachingRequest(coachRequestId);
    }


}
