package com.example.ecommercebackend.DAO;

import com.example.ecommercebackend.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "products", path="products")
@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Integer> {
    Page<Product> findByCategoryId(@Param("id") int id, Pageable pageable);

    Page<Product> findByNameContaining(@Param("name") String name, Pageable pageable);

    List<Product> findFirst8ByOrderByDateCreated();


    List<Product> findFirst8ByOrderByRating();

    List<Product> findFirst4ByOrderByRating();
}
