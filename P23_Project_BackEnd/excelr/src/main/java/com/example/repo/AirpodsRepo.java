package com.example.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.Airpods;

public interface AirpodsRepo extends JpaRepository<Airpods, Long> {

}
