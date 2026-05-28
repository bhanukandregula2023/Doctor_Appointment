package com.gvp.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Appointment {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate appointmentDate;

    private String status;

    @ManyToOne
    private User patient;

    @ManyToOne
    private Doctor doctor;

	public Long getId() {
		return id;
	}

	
	public LocalDate getAppointmentDate() {
		return appointmentDate;
	}

	public void setAppointmentDate(LocalDate appointmentDate) {
		this.appointmentDate = appointmentDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public User getPatient() {
		return patient;
	}

	public void setPatient(User patient) {
		this.patient = patient;
	}

	public Doctor getDoctor() {
		return doctor;
	}

	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}


	@Override
	public String toString() {
		return "Appointment [id=" + id + ", appointmentDate=" + appointmentDate + ", status=" + status + ", patient="
				+ patient + ", doctor=" + doctor + "]";
	}


	public Appointment(LocalDate appointmentDate, String status, User patient, Doctor doctor) {
		super();
		
		this.appointmentDate = appointmentDate;
		this.status = status;
		this.patient = patient;
		this.doctor = doctor;
	}


	public Appointment() {
		super();
		// TODO Auto-generated constructor stub
	}
    
    
}
