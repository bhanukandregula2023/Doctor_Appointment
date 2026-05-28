package com.gvp.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gvp.entity.Appointment;
import com.gvp.entity.Doctor;
import com.gvp.entity.User;
import com.gvp.repository.AppointmentRepository;
import com.gvp.repository.DoctorRepository;
import com.gvp.repository.UserRepository;

@Service
public class AppointmentService {
	@Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private UserRepository userRepository;

    public Appointment bookAppointment(
            Long patientId,
            Long doctorId,
            LocalDate date
    ) {

        User patient = userRepository.findById(patientId)
                .orElseThrow(() ->
                        new RuntimeException("Patient not found"));

        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() ->
                        new RuntimeException("Doctor not found"));

        // Check doctor availability
        if(!doctor.isAvailable()) {
            throw new RuntimeException(
                    "Doctor not available");
        }

        // Prevent double booking
        boolean alreadyBooked =
                appointmentRepository
                        .existsByDoctorAndAppointmentDate(
                                doctor,
                                date
                        );

        if(alreadyBooked) {
            throw new RuntimeException(
                    "Doctor already booked for this date");
        }

        Appointment appointment = new Appointment();

        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setAppointmentDate(date);
        appointment.setStatus("BOOKED");

        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getPatientAppointments(
            Long patientId
    ) {

        User patient = userRepository.findById(patientId)
                .orElseThrow(() ->
                        new RuntimeException("Patient not found"));

        return appointmentRepository.findByPatient(patient);
    }

    public void cancelAppointment(Long appointmentId) {

        appointmentRepository.deleteById(appointmentId);
    }
}
