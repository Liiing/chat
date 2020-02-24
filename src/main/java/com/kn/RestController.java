package com.kn;

import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
public class RestController {

    public boolean doesUsernameAlreadyExist(java.lang.String username) {
        User user = DatabaseService.getUserByUsername(username);

        return user != null;
    }

    public boolean isPasswordCorrect(java.lang.String username, java.lang.String password) {
        User user = DatabaseService.getUserByUsername(username);

        return password.equals(user.getPassword());
    }

    public boolean register(User user) {
        if (!doesUsernameAlreadyExist(user.getUsername())) {
            return DatabaseService.addUser(user);
        }
        return false;
    }

    public Session login(User user) {
        User userFromDatabase = DatabaseService.getUser(user);

        if (userFromDatabase != null) {
            if(isPasswordCorrect(userFromDatabase.getUsername(), user.getPassword())) {
                UUID token = UUID.randomUUID();
                Session session = new Session(null, user.getUsername(), token);
                WebSocketServer.getInstance().addSession(token, session);
                return session;
            }
        }
        return null;
    }
}
