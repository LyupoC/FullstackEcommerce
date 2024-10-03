package com.example.ecommercebackend.service;

import com.example.ecommercebackend.DAO.CustomerRepository;
import com.example.ecommercebackend.dto.Purchase;
import com.example.ecommercebackend.dto.PurchaseResponse;
import com.example.ecommercebackend.entity.Customer;
import com.example.ecommercebackend.entity.Order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;


@Service
public class CheckoutServiceImpl implements CheckoutService{

    private CustomerRepository customerRepository;

    @Autowired
    public CheckoutServiceImpl(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
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

        purchase.getOrderItems().forEach(order::add);

        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        Customer customer = purchase.getCustomer();
        customer.addOrder(order);

        customerRepository.save(customer);

        return new PurchaseResponse(orderTrackingNumber);
    }
}
