package com.example.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.model.Search;

@Repository
public interface SearchRepo extends JpaRepository<Search, Long> {

	@Query(value = "(SELECT id, image, name, cost, quantity, description, discount, 'laptops' as category FROM laptops WHERE name LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "UNION " +
            "(SELECT id, image, name, cost, quantity, description, discount, 'mobiles' as category FROM mobiles WHERE name LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "UNION " +
            "(SELECT id, image, name, cost, quantity, description, discount, 'airpods' as category FROM airpods WHERE name LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "UNION " +
            "(SELECT id, image, name, cost, quantity, description, discount, 'ipads' as category FROM ipads WHERE name LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "UNION " +
            "(SELECT id, image, name, cost, quantity, description, discount, 'watches' as category FROM watches WHERE name LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "UNION " +
            "(SELECT id, image, name, cost, quantity, description, discount, 'homeapp' as category FROM homeapp WHERE name LIKE LOWER(CONCAT('%', :keyword, '%')))", nativeQuery = true)
List<Search> findProductsByUnion(@Param("keyword") String keyword);

}