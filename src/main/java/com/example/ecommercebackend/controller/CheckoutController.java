package com.example.ecommercebackend.controller;


import com.example.ecommercebackend.dto.Purchase;
import com.example.ecommercebackend.dto.PurchaseResponse;
import com.example.ecommercebackend.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:4200", "https://lyupoc.github.io/AnguEcomFront", "https://lyupoc.github.io"})
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private CheckoutService checkoutService;

    @Autowired
    public CheckoutController(CheckoutService checkoutService){
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse PurchaseResponse(@RequestBody Purchase purchase){
        return checkoutService.placeOrder(purchase);
    }
}
