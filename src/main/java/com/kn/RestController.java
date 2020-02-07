package com.kn;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class RestController {

	@ResponseBody
	@PostMapping(path = "/register", consumes = "application/json", produces = "application/json")
	public User register(@RequestBody User user) {
		DatabaseService.registerUser(user);

		return user;
	}
}
