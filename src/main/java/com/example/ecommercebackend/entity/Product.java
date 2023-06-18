package com.example.ecommercebackend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "product")
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    @Column(name="sku")
    private String sku;

    @Column(name="name")
    private String name;

    @Column(name="description")
    private String description;

    @Column(name="image_url")
    private String imageUrl;



    @Column(name="unit_price")
    private int unitPrice;


    @Column(name="active")
    private boolean active;

    @Column(name="units_in_stock")
    private int unitsInStock;

    @Column(name="date_created")
    private Date dateCreated;


    @Column(name="last_updated")
    private Date dateUpdated;


    @Column(name ="rating")
    private int rating;

    @ManyToOne
    @JoinColumn(name="category_id", nullable = false)
    private ProductCategory category;

}
