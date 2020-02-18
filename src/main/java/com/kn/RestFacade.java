package com.kn;

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
    public Boolean userExists(@RequestBody String username, HttpServletResponse response) {
        boolean userExists = false;

        if (restController.doesUsernameAlreadyExist(username)) {
            userExists = true;
        }
        return userExists;
    }

    @ResponseBody
    @PostMapping(path = "/login", consumes = "application/json", produces = "application/json")
    public boolean login(@RequestBody User user) {
        boolean loginSuccessful = false;

		if(restController.login(user)) {
		    loginSuccessful = true;
        }

		return  loginSuccessful;
    }
}
