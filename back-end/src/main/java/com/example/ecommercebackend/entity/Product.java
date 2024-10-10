package com.example.ecommercebackend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
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

    @Column(name="sale")
    private boolean sale;

    @Column(name="staff_pick")
    private boolean staff_pick;

    @Column(name="limited")
    private boolean limited;

    @Transient
    private boolean inStock;

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
    @JsonBackReference
    private ProductCategory category;

    public Product(){
        this.inStock = this.unitsInStock > 0;
    }
}
