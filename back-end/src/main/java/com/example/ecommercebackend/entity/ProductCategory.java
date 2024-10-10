package com.example.ecommercebackend.entity;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="product_category")
@Data
public class ProductCategory {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="category_name")
    private String name;

    @OneToMany(cascade =CascadeType.ALL, mappedBy = "category")
    @JsonManagedReference
    private List<Product> products = new ArrayList<>();

}
