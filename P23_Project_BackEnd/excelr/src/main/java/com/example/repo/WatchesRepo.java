package com.example.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.Watches;

public interface WatchesRepo extends JpaRepository<Watches, Long> {

}
