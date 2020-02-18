package com.kn;

import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
public class RestController {

    public static boolean doesUsernameAlreadyExist(String username) {
        User user = DatabaseService.getUserByUsername(username);

        return user != null;
    }

    public static boolean isPasswordCorrect(String username, String password) {
        User user = DatabaseService.getUserByUsername(username);

        return password.equals(user.getPassword());
    }

    public boolean register(User user) {
        if (!doesUsernameAlreadyExist(user.getUsername())) {
            return DatabaseService.addUser(user);
        }
        return false;
    }

    public boolean login(User user) {
        User userFromDatabase = DatabaseService.getUser(user);

        if (userFromDatabase != null) {
            if(isPasswordCorrect(userFromDatabase.getUsername(), user.getPassword())) {
                UUID token = UUID.randomUUID();
                WebSocketServer.addSession(token, new Session(null, user, token));
                return true;
            }
        }
        return false;
    }
}
