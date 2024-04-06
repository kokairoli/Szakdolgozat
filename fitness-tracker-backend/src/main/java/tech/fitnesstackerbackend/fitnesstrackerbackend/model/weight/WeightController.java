package tech.fitnesstackerbackend.fitnesstrackerbackend.model.weight;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.UserService;

import java.util.List;

@RestController
@RequestMapping("api/v1/weight")
public class WeightController {


    private final WeightService weightService;
    private final UserService userService;

    @Autowired
    public WeightController(WeightService weightService,UserService userService) {
        this.weightService = weightService;
        this.userService = userService;
    }

    @GetMapping
    public List<WeightDTO> getWeight(){

        return weightService.getAllWeightForUser();

    }

    @PostMapping
    public WeightDTO addWeightToUser(@RequestBody WeightDTO weightDTO){
        return weightService.addWeightToUser(weightDTO);
    }
}
