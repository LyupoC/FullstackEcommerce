package com.example.ecommercebackend.entity;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="order_item")
@Data
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="image_url")
    private String imageUrl;

    @Column(name="quantity")
    private int quantity;

    @Column(name="name")
    private String name;

    @Column(name="unit_price")
    private int unitPrice;


    @OneToOne(fetch = FetchType.EAGER)
    private Product product;

    @ManyToOne
    @JoinColumn(name="order_id", nullable = false)
    private Order order;

    @Column(name="product_id", insertable = false, updatable = false)
    private Integer productId; // This field can be used for reference
}
