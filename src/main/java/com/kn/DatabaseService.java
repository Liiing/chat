package com.kn;

import java.util.ArrayList;
import java.util.List;

public class DatabaseService {
    public static List<User> registeredUsers = new ArrayList<>();

    public static void registerUser(User user) {
            registeredUsers.add(user);
    }

    public static boolean doesUsernameAlreadyExist(String username){
        for (User registeredUser : registeredUsers) {
            if(registeredUser.getUsername().equals(username)) {
                return true;
            }
        }
        return false;
    }
}
