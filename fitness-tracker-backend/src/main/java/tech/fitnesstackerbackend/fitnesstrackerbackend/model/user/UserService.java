package tech.fitnesstackerbackend.fitnesstrackerbackend.model.user;


public abstract class UserService {






    public abstract boolean userExists(String email);

    public abstract Integer getLoggedInUserId();


    public abstract String getEmailFromSecurityContext();




}
