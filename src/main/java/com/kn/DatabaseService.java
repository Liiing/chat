package com.kn;

import java.util.ArrayList;
import java.util.List;

public class DatabaseService {
    public static List<User> registeredUsers = new ArrayList<>();

    public static boolean addUser(User user) {
        return registeredUsers.add(user);
    }

    public static User getUserByUsername(String username) {
        for (User registeredUser : registeredUsers) {
            if (registeredUser.getUsername().equals(username)) {
                return registeredUser;
            }
        }

        return null;
    }

    public static User getUser(User user) {
        return  getUserByUsername(user.getUsername());
    }
}
