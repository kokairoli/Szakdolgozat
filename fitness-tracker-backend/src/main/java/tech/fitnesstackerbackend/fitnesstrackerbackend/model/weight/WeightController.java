package tech.fitnesstackerbackend.fitnesstrackerbackend.model.weight;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/weight")
public class WeightController {


    private final WeightService weightService;

    @Autowired
    public WeightController(WeightService weightService) {
        this.weightService = weightService;
    }

    @GetMapping
    public List<WeightDTO> getWeight(){

        return weightService.getAllWeightForUser();

    }

    @GetMapping("/latest")
    public WeightDTO getClientLatestWeight(){
        return weightService.getUserLatestWeight();
    }

    @PostMapping
    public WeightDTO addWeightToUser(@RequestBody WeightDTO weightDTO){
        return weightService.addWeightToClient(weightDTO);
    }
}
