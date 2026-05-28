package com.gvp.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gvp.entity.Appointment;
import com.gvp.entity.Doctor;
import com.gvp.entity.User;

public interface AppointmentRepository  extends JpaRepository<Appointment, Long> {

    List<Appointment> findByPatient(User patient);

    List<Appointment> findByDoctor(Doctor doctor);

    boolean existsByDoctorAndAppointmentDate(
            Doctor doctor,
            LocalDate appointmentDate
    );

}
