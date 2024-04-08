package tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.coachingrequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.client.Client;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.client.ClientService;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.coach.Coach;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.coach.CoachService;

import java.util.List;

@Service
public class CoachingRequestService {

    private final CoachingRequestRepository coachingRequestRepository;

    private final ClientService clientService;

    private final CoachService coachService;


    @Autowired
    public CoachingRequestService(CoachingRequestRepository coachingRequestRepository, ClientService clientService, CoachService coachService) {
        this.coachingRequestRepository = coachingRequestRepository;
        this.clientService = clientService;
        this.coachService = coachService;
    }

    public List<CoachingRequestDTO> getRequestsOfClient(){
        return this.coachingRequestRepository.findAllByClientId(clientService.getLoggedInUserId()).stream().map((this::translateToCoachingRequestDTOForClient)).toList();
    }

    public List<CoachingRequestDTO> getRequestsOfCoach(){
        return this.coachingRequestRepository.findAllByCoachId(coachService.getLoggedInUserId()).stream().map((this::translateToCoachingRequestDTOForCoach)).toList();
    }

    public CoachingRequest createCoachingRequest(CreateCoachingRequestDTO createCoachingRequestDTO){
        CoachingRequest coachingRequest = new CoachingRequest();
        Client client = clientService.getLoggedInClient();
        Coach coach = coachService.getCoachById(createCoachingRequestDTO.getCoachId());
        if(createCoachingRequestDTO.getMessage() != null){
            coachingRequest.setMessage(createCoachingRequestDTO.getMessage());
        }
        coachingRequest.setCoach(coach);
        coachingRequest.setClient(client);
        coachingRequest.setActive(true);
        return coachingRequestRepository.save(coachingRequest);

    }

    public void acceptCoachingRequest(Long coachingRequestId){
        CoachingRequest coachingRequest = coachingRequestRepository.findById(coachingRequestId).orElseThrow();
        Coach coach = coachService.getCoachById(coachService.getLoggedInCoach().getId());
        Client client = clientService.getClientById(coachingRequest.getClient().getId());
        clientService.saveCoachForClient(client,coach);
        coachService.addClientToClients(client);
        coachingRequest.setAccepted(true);
        inactivateAndSaveRequestsOfClient(client);
    }

    public void refuseCoachingRequest(Long coachingRequestId){
        CoachingRequest coachingRequest = coachingRequestRepository.findById(coachingRequestId).orElseThrow();
        coachingRequest.setAccepted(false);
        coachingRequest.setActive(false);
        coachingRequestRepository.save(coachingRequest);
    }

    public CoachingRequest activateCoachingRequest(Long coachingRequestId){
        CoachingRequest coachingRequest = coachingRequestRepository.findById(coachingRequestId).orElseThrow();
        coachingRequest.setActive(true);
        return coachingRequestRepository.save(coachingRequest);
    }

    public void deleteCoachingRequest(Long coachingRequestId){
        CoachingRequest coachingRequest = coachingRequestRepository.findById(coachingRequestId).orElseThrow();
        coachingRequestRepository.delete(coachingRequest);
    }

    private void inactivateAndSaveRequestsOfClient(Client client){
        List<CoachingRequest> clientCoachingRequests = coachingRequestRepository.findAllByClientId(client.getId());
        for (CoachingRequest clientCoachingRequest : clientCoachingRequests) {
            if (clientCoachingRequest.isActive()&&!clientCoachingRequest.isAccepted()) {
                clientCoachingRequest.setActive(false);
            }
        }
        coachingRequestRepository.saveAll(clientCoachingRequests);
    }

    public CoachingRequestDTO translateToCoachingRequestDTOForCoach(CoachingRequest coachingRequest){
        return new CoachingRequestDTO(coachingRequest.getId(),coachingRequest.isActive(),coachingRequest.isAccepted(),coachingRequest.getMessage(),clientService.translateClientToUserDTO( coachingRequest.getClient()));
    }

    public CoachingRequestDTO translateToCoachingRequestDTOForClient(CoachingRequest coachingRequest){
        return new CoachingRequestDTO(coachingRequest.getId(),coachingRequest.isActive(),coachingRequest.isAccepted(),coachingRequest.getMessage(),coachService.translateCoachToUserDTO( coachingRequest.getCoach()));
    }



}
