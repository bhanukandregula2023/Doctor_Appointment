package com.gvp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gvp.entity.Doctor;
import com.gvp.service.DoctorService;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin("*")
public class DoctorController {
	@Autowired
    private DoctorService doctorService;

    // Add Doctor
    @PostMapping
    public Doctor addDoctor(
            @RequestBody Doctor doctor
    ) {

        return doctorService.addDoctor(doctor);
    }

    // Get Available Doctors
    @GetMapping
    public List<Doctor> getAvailableDoctors() {

        return doctorService.getAvailableDoctors();
    }

    // Update Availability
    @PutMapping("/{doctorId}/availability")
    public Doctor updateAvailability(
            @PathVariable Long doctorId,
            @RequestParam boolean available
    ) {

        return doctorService.updateAvailability(
                doctorId,
                available
        );
    }
}
