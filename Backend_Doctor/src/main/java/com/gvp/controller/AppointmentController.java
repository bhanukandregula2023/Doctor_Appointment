package com.gvp.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gvp.entity.Appointment;
import com.gvp.service.AppointmentService;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin("*")

public class AppointmentController {
	@Autowired
    private AppointmentService appointmentService;

    // Book Appointment
    @PostMapping
    public Appointment bookAppointment(

            @RequestParam Long patientId,

            @RequestParam Long doctorId,

            @RequestParam
            @DateTimeFormat(iso =
                    DateTimeFormat.ISO.DATE)
            LocalDate date
    ) {

        return appointmentService.bookAppointment(
                patientId,
                doctorId,
                date
        );
    }

    // Get Patient Appointments
    @GetMapping("/patient/{patientId}")
    public List<Appointment> getPatientAppointments(
            @PathVariable Long patientId
    ) {

        return appointmentService
                .getPatientAppointments(patientId);
    }

    // Cancel Appointment
    @DeleteMapping("/{appointmentId}")
    public String cancelAppointment(
            @PathVariable Long appointmentId
    ) {

        appointmentService.cancelAppointment(
                appointmentId
        );

        return "Appointment cancelled successfully";
    }
}
