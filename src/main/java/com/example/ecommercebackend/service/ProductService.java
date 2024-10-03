package com.example.ecommercebackend.service;

import com.example.ecommercebackend.dto.ProductFlags;
import com.example.ecommercebackend.dto.ProductsFilter;
import com.example.ecommercebackend.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {

    long countProducts(ProductsFilter filter);

    Page<Product> getFilteredProducts(ProductsFilter filter, Pageable pageable);

    ProductFlags countProductPerFlag(ProductsFilter filter);

}
