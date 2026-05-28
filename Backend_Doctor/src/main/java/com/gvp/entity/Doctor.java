package com.gvp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class Doctor {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String specialization;

    private boolean available;

    @OneToOne
    private User user;

	public Long getId() {
		return id;
	}

	
	public String getSpecialization() {
		return specialization;
	}

	public void setSpecialization(String specialization) {
		this.specialization = specialization;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Doctor [id=" + id + ", specialization=" + specialization + ", available=" + available + ", user=" + user
				+ "]";
	}


	public Doctor( String specialization, boolean available, User user) {
		super();	
		this.specialization = specialization;
		this.available = available;
		this.user = user;
	}


	public Doctor() {
		super();
		// TODO Auto-generated constructor stub
	}


	public boolean isAvailable() {
		return available;
	}

	public void setAvailable(boolean available2) {
		// TODO Auto-generated method stub
		
	}
}
