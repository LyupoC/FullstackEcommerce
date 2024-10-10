package com.example.ecommercebackend.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class ProductsFilter {
    private String category;
    private Integer minPrice;
    private Integer maxPrice;
    private Boolean isLimited;
    private Boolean inOnSale;
    private Boolean isStaffRecommended;
    private Boolean inStock;
    private String sortBy;
    private String keyWords;

}
