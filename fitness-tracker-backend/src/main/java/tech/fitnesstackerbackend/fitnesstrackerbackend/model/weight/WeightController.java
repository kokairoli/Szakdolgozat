package tech.fitnesstackerbackend.fitnesstrackerbackend.model.weight;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    public Optional<WeightDTO> getClientLatestWeight(){
        return weightService.getUserLatestWeight();
    }

    @PostMapping
    public WeightDTO addWeightToUser(@RequestBody AddWeightDTO weightDTO){
        return weightService.addWeightToClient(weightDTO);
    }
}
