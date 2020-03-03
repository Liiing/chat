package com.kn.model;


public class User {
    private java.lang.String username;
    private java.lang.String password;

    public User(String username,String password){
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
