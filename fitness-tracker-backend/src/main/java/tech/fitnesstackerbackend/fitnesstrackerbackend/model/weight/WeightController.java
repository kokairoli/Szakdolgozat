package tech.fitnesstackerbackend.fitnesstrackerbackend.model.weight;


import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.UserService;

@RestController
@RequestMapping(name = "api/v1/weight")
public class WeightController {


    private final WeightService weightService;
    private final UserService userService;

    @Autowired
    public WeightController(WeightService weightService,UserService userService) {
        this.weightService = weightService;
        this.userService = userService;
    }

    @GetMapping
    public Integer getWeigth(){
        return userService.getLoggedInUser().getId();
    }
}
