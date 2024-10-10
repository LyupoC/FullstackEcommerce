package com.example.ecommercebackend.DAO;

import com.example.ecommercebackend.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
}
