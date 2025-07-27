package com.books.DTO;

import lombok.Data;

@Data
public class SignupRequest 
{
	private String name;
    private String email;
    private String mobile;
    private String gender;
    private String password;
}
