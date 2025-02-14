package com.example.repo;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.model.Login;

@Repository
public interface LoginRepo extends JpaRepository<Login, Integer> {
      Optional<Login> findByUsername(String username);
}
