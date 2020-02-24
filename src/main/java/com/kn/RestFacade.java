package com.kn;

import com.kn.util.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@Controller
public class RestFacade {

    @Autowired
    private RestController restController;

    @ResponseBody
    @PostMapping(path = "/register", consumes = "application/json", produces = "application/json")
    public boolean register(@RequestBody User user, HttpServletResponse response) {
        boolean registerSuccessful = false;
         if (restController.register(user)) {
             registerSuccessful = true;
         }
         return registerSuccessful;
    }

    @ResponseBody
    @PostMapping(path = "/userExists", consumes = "application/json", produces = "application/json")
    public Boolean userExists(@RequestBody java.lang.String username, HttpServletResponse response) {
        boolean userExists = false;

        if (restController.doesUsernameAlreadyExist(username)) {
            userExists = true;
        }
        return userExists;
    }

    @ResponseBody
    @PostMapping(path = "/login", consumes = "application/json;charset=UTF-8", produces = "application/json;charset=UTF-8")
    public java.lang.String login(@RequestBody User user) {
        return Gson.toJson(restController.login(user));
    }
}
