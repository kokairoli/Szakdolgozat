package tech.fitnesstackerbackend.fitnesstrackerbackend.securedDemo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tech.fitnesstackerbackend.fitnesstrackerbackend.model.user.UserService;

@RestController
@RequestMapping("api/v1/demoController")
public class Demo {

    private final UserService userService;

    @Autowired
    public Demo(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<String> sayHello(){
        System.out.println("dwq"+userService.getLoggedInUser());
        return ResponseEntity.ok("Hello from secured endpoint");
    }
}
