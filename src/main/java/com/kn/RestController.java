package com.kn;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletResponse;

@Controller
public class RestController {

	@ResponseBody
	@PostMapping(path = "/register", consumes = "application/json", produces = "application/json")
	public User register(@RequestBody User user, HttpServletResponse response) {
		DatabaseService.registerUser(user);
		return user;
	}

	@ResponseBody
	@PostMapping(path = "/userExists", consumes = "application/json", produces = "application/json")
	public Boolean userExists(@RequestBody String username, HttpServletResponse response){
		boolean userExists = false;

		if(DatabaseService.doesUsernameAlreadyExist(username)){
			userExists = true;
		}

		return userExists;
	}
}
