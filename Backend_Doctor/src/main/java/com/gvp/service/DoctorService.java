package com.gvp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gvp.entity.Doctor;
import com.gvp.repository.DoctorRepository;

@Service
public class DoctorService {
	@Autowired
    private DoctorRepository doctorRepository;

    public Doctor addDoctor(Doctor doctor) {

        return doctorRepository.save(doctor);
    }

    public List<Doctor> getAvailableDoctors() {

        return doctorRepository.findByAvailableTrue();
    }

    public Doctor updateAvailability(
            Long doctorId,
            boolean available
    ) {

        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() ->
                        new RuntimeException("Doctor not found"));

        doctor.setAvailable(available);

        return doctorRepository.save(doctor);
    }
}
