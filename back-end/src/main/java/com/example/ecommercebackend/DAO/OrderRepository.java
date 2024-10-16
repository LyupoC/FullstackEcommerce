package com.example.ecommercebackend.DAO;


import com.example.ecommercebackend.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(collectionResourceRel = "orderHistory", path="orders")
@CrossOrigin(origins = {"http://localhost:4200","https://localhost:4200"})
public interface OrderRepository extends JpaRepository<Order, Integer> {
    Page<Order> findByCustomerEmail(@Param("email") String email, Pageable pageable);
}
