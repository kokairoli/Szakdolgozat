package tech.fitnesstackerbackend.fitnesstrackerbackend.model.weight;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.UserService;

import java.time.LocalDate;
import java.util.List;

@Service
public class WeightService {

    private final WeightRepository weightRepository;
    private final UserService userService;

    @Autowired
    public WeightService(WeightRepository weightRepository,UserService userService) {
        this.weightRepository = weightRepository;
        this.userService = userService;
    }

    public List<WeightDTO> getAllWeightForUser(){
        return weightRepository.findByUserId(userService.getLoggedInUser().getId()).stream().map((element)->translateWeightToWeightDTO(element)).toList();
    }

    public WeightDTO addWeightToUser(WeightDTO weightDTO){
        weightDTO.setRecordedAt(LocalDate.now());
        Weight weight = new Weight(weightDTO.getWeight(), weightDTO.getRecordedAt());
        weight.setUser(userService.getLoggedInUser());
        Weight savedData = weightRepository.save(weight);

        return translateWeightToWeightDTO(savedData);
    }

    public WeightDTO translateWeightToWeightDTO(Weight weight){
        return new WeightDTO(weight.getWeight(),weight.getRecordedAt());
    }



}
