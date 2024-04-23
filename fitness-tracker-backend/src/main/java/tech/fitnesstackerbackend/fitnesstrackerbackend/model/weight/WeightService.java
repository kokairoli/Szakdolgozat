package tech.fitnesstackerbackend.fitnesstrackerbackend.model.weight;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.client.ClientService;

import java.time.LocalDate;
import java.util.List;

@Service
public class WeightService {

    private final WeightRepository weightRepository;
    private final ClientService clientService;

    @Autowired
    public WeightService(WeightRepository weightRepository,ClientService clientService) {
        this.weightRepository = weightRepository;
        this.clientService = clientService;
    }

    public List<WeightDTO> getAllWeightForUser(){
        return weightRepository.findByClientId(clientService.getLoggedInUserId()).stream().map(this::translateWeightToWeightDTO).toList();
    }

    public WeightDTO addWeightToClient(WeightDTO weightDTO){

        weightDTO.setRecordedAt(LocalDate.now());
        Weight weight = new Weight(weightDTO.getWeight(), weightDTO.getRecordedAt());
        weight.setClient(clientService.getLoggedInClient());
        Weight savedData = weightRepository.save(weight);

        return translateWeightToWeightDTO(savedData);
    }

    public WeightDTO translateWeightToWeightDTO(Weight weight){
        return new WeightDTO(weight.getId(),weight.getWeight(),weight.getRecordedAt());
    }

    public WeightDTO getUserLatestWeight(){
        return translateWeightToWeightDTO(weightRepository.findLatestByClientId(clientService.getLoggedInUserId()));
    }

    public void deleteWeight(Long weightId){
        weightRepository.delete(weightRepository.findById(weightId).orElseThrow());
    }




}
