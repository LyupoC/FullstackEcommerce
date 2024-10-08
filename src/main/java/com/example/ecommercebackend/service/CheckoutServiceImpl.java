package com.example.ecommercebackend.service;

import com.example.ecommercebackend.DAO.CustomerRepository;
import com.example.ecommercebackend.DAO.ProductRepository;
import com.example.ecommercebackend.dto.Purchase;
import com.example.ecommercebackend.dto.PurchaseResponse;
import com.example.ecommercebackend.entity.Customer;
import com.example.ecommercebackend.entity.Order;

import com.example.ecommercebackend.entity.Product;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;


@Service
public class CheckoutServiceImpl implements CheckoutService{

    private CustomerRepository customerRepository;
    private ProductRepository productRepository;

    @Autowired
    public CheckoutServiceImpl(CustomerRepository customerRepository, ProductRepository productRepository){
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
    }

    public String generateTrackingNumber(){
        return UUID.randomUUID().toString();
    }
    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {

        Order order = purchase.getOrder();

        String orderTrackingNumber = generateTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);


        purchase.getOrderItems().forEach(orderItem -> {

            Optional<Product> optionalProduct = productRepository.findById(orderItem.getProductId());
            Product product = optionalProduct.orElseThrow(() ->
                    new EntityNotFoundException("Product not found for ID: " + orderItem.getProductId())
            );

            orderItem.setProduct(product);

        });
        purchase.getOrderItems().forEach(order::add);

        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        Customer customer = purchase.getCustomer();
        customer.addOrder(order);

        customerRepository.save(customer);

        return new PurchaseResponse(orderTrackingNumber);
    }
}
