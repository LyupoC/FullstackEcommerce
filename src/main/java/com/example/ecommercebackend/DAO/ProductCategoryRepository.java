package com.example.ecommercebackend.DAO;

import com.example.ecommercebackend.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;


@RepositoryRestResource(collectionResourceRel = "productCategory", path="product-category")
@CrossOrigin(origins = {"http://localhost:4200", "https://localhost:4200", "https://127.0.0.1:4200", "https://lyupoc.github.io/AnguEcomFront", "https://lyupoc.github.io"})
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Integer> {
}
