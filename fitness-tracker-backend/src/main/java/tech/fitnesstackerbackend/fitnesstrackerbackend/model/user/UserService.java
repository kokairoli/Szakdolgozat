package tech.fitnesstackerbackend.fitnesstrackerbackend.model.user;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    private final UserRepository userRepository;



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

    public Integer getLoggedInUserId(){
        return userRepository.findByEmail(getEmailFromSecurityContext()).orElseThrow().getId();
    }

    public User getLoggedInUser(){
        return userRepository.findByEmail(getEmailFromSecurityContext()).orElseThrow();
    }

    public String getEmailFromSecurityContext(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Object principal = auth.getPrincipal();
        if (principal instanceof User) {
            return ((User)principal).getEmail();
        }
        return principal.toString();
    }




}
