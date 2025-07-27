package com.books.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.books.DTO.LoginRequest;
import com.books.DTO.SignupRequest;
import com.books.entity.User;
import com.books.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController 
{
	@Autowired
	private UserRepository userRepo;

	@Autowired
    private PasswordEncoder passwordEncoder;
	
	@PostMapping("/signup")
	public ResponseEntity<String> registerUser(@RequestBody SignupRequest request)
	{
		if(userRepo.existsByEmail(request.getEmail()))
		{
			return ResponseEntity.badRequest().body("Email already in use");
		}
		
		if(userRepo.existsByMobile(request.getMobile()))
		{
			return ResponseEntity.badRequest().body("Mobile already in use");
		}
		
		User user = new User();
		user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setMobile(request.getMobile());
        user.setGender(request.getGender());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepo.save(user);
        
        return ResponseEntity.ok("User registered successfully");

	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest request) {
		User user = userRepo.findByEmail(request.getEmail()).orElse(null);
		if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

		Map<String, String> response = new HashMap<>();
		response.put("message", "Login Successful");
		response.put("email", user.getEmail());
		response.put("name", user.getName());

	    return ResponseEntity.ok(response);
	}

}
