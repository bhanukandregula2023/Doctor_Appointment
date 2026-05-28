package com.gvp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gvp.entity.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    List<Doctor> findByAvailableTrue();

}
