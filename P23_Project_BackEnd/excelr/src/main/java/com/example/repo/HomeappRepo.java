package com.example.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.Homeapp;

public interface HomeappRepo extends JpaRepository<Homeapp, Long> {

}
