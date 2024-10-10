package com.example.ecommercebackend.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class CountCriteria {
    private Boolean isLimited;
    private Boolean inOnSale;
    private Boolean isStaffRecommended;
    private Boolean inStock;
}