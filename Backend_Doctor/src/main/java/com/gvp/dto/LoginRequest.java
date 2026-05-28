package com.gvp.dto;

import org.jspecify.annotations.Nullable;

import lombok.Data;

@Data
public class LoginRequest {
	private String email;
    private String password;
	public @Nullable Object getEmail() {
		// TODO Auto-generated method stub
		return null;
	}
	public @Nullable Object getPassword() {
		// TODO Auto-generated method stub
		return null;
	}
}
