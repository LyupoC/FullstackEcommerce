package com.example.ecommercebackend.controller;

import com.example.ecommercebackend.DAO.ProductRepository;
import com.example.ecommercebackend.dto.CustomEmbeddedProductResponse;
import com.example.ecommercebackend.dto.ProductFlags;
import com.example.ecommercebackend.dto.ProductsFilter;
import com.example.ecommercebackend.entity.Product;
import com.example.ecommercebackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:4200", "https://lyupoc.github.io/AnguEcomFront", "https://lyupoc.github.io"})
@RestController
@RequestMapping("/products")
public class ProductController {
    ProductRepository productRepository;
    ProductService productService;

    @Autowired
    public ProductController(ProductRepository productRepository,
                             ProductService productService
    ){
        this.productRepository = productRepository;
        this.productService = productService;
    }

    @GetMapping("search")
    public CustomEmbeddedProductResponse dynamicFilter(ProductsFilter filter,
                                                       @RequestParam(defaultValue = "0") int page,
                                                       @RequestParam(defaultValue = "10") int size){

        Sort sort = Sort.unsorted();

        if (filter.getSortBy() != null) {
            sort = Sort.by( Sort.Direction.DESC, getSortKey(filter.getSortBy()));
        }

        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Product> productsPage= this.productService.getFilteredProducts(filter, pageable);

        List<Product> products = productsPage.getContent();

        if (products.isEmpty()) {
            products = Collections.emptyList();
        }

        PagedModel.PageMetadata pageMetadata = new PagedModel.PageMetadata(
                pageable.getPageSize(),
                productsPage.getNumber(),
                productsPage.getTotalElements()
        );

        ProductFlags productFlags = productService.countProductPerFlag(filter);

        return new CustomEmbeddedProductResponse(products, pageMetadata, productFlags);
    }

    private String getSortKey(String sortByField){

        return switch (sortByField) {
            case "best" -> "rating";
            default -> "dateCreated";
        };
    }
}
