package tech.fitnesstackerbackend.fitnesstrackerbackend.model.weight;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.client.ClientService;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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

    public WeightDTO addWeightToClient(AddWeightDTO addWeightDTO){
        final LocalDate localDateNow = LocalDate.now();
        Optional<Weight> existingWeight = weightRepository.getWeightByRecordedAt(localDateNow,clientService.getLoggedInUserId());
        if (existingWeight.isPresent()){
            weightRepository.delete(existingWeight.get());
        }
        Weight weight = new Weight(addWeightDTO.getWeight(), LocalDate.now());
        weight.setClient(clientService.getLoggedInClient());
        Weight savedData = weightRepository.save(weight);

        return translateWeightToWeightDTO(savedData);
    }

    public WeightDTO translateWeightToWeightDTO(Weight weight){
        return new WeightDTO(weight.getId(),weight.getWeight(),weight.getRecordedAt());
    }

    public Optional<WeightDTO> translateWeightToOptionalWeightDTO(Weight weight){
        if (weight == null){
            return Optional.empty();
        }
        return Optional.of(new WeightDTO(weight.getId(),weight.getWeight(),weight.getRecordedAt()));
    }

    public Optional<WeightDTO> getUserLatestWeight(){

        return translateWeightToOptionalWeightDTO(weightRepository.findLatestByClientId(clientService.getLoggedInUserId()));
    }

    public void deleteWeight(Long weightId){
        weightRepository.delete(weightRepository.findById(weightId).orElseThrow());
    }




}
