package tech.fitnesstackerbackend.fitnesstrackerbackend.model.user;


import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    private final UserRepository userRepository;

    @Getter
    @Setter
    private User loggedInUser;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }




    public boolean userExists(String email){
        return userRepository.findByEmail(email).isPresent();
    }

    public User getLoggedInUserById(Integer id){
        return userRepository.findById(id).get();
    }




}
