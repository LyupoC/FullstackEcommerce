package com.example.ecommercebackend.entity;


import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
public class Order {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="id", nullable = false)
    private int id;

    @Column(name="order_tracking_number")
    private String orderTrackingNumber;

    @Column(name ="total_price")
    private int totalPrice;

    @Column(name = "total_quantity")
    private int totalQuantity;

    @Column(name ="status")
    private String status;
    @Column(name ="date_created")
    @CreationTimestamp
    private Calendar dateCreated;

    @Column(name = "last_updated")
    @UpdateTimestamp
    private Calendar lastUpdated;

    @OneToOne(cascade = CascadeType.ALL)
        @JoinColumn(name="billing_address_id", referencedColumnName = "id")
    private Address billingAddress;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="shipping_address_id", referencedColumnName = "id")
    private Address shippingAddress;

    @ManyToOne
    @JoinColumn(name="customer_id", nullable = false)
    private Customer customer;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "order")
    private List<OrderItem> orderItems;

    public void add(OrderItem orderItem){
        if(orderItem != null){

            if(orderItems == null){
                orderItems =  new ArrayList<>();
            }

            orderItems.add(orderItem);
            orderItem.setOrder(this);
        }

    }

}
