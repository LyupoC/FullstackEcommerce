package com.example.ecommercebackend.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class ProductFlags {
    private final long staffRecommendedCount;
    private final long inStockCount;
    private final long onSaleCount;
    private final long limitedCount;

    public ProductFlags(long staffRecommendedCount, long inStockCount, long onSaleCount, long limitedCount) {
        this.staffRecommendedCount = staffRecommendedCount;
        this.inStockCount = inStockCount;
        this.onSaleCount = onSaleCount;
        this.limitedCount = limitedCount;
    }
}