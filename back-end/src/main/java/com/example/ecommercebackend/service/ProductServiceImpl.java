package com.example.ecommercebackend.service;


import com.example.ecommercebackend.DAO.ProductRepository;
import com.example.ecommercebackend.dto.CountCriteria;
import com.example.ecommercebackend.dto.ProductFlags;
import com.example.ecommercebackend.dto.ProductsFilter;
import com.example.ecommercebackend.entity.Product;
import com.example.ecommercebackend.specification.ProductSpecificationBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService {

    private ProductRepository productRepository;
    ProductServiceImpl(ProductRepository productRepository){
        this.productRepository = productRepository;
    }

    // Method to get filtered products with all criteria
    public Page<Product> getFilteredProducts(ProductsFilter filter, Pageable pageable) {
        Specification<Product> spec = buildSpecification(filter);
        return productRepository.findAll(spec, pageable);
    }

    public long countProducts(ProductsFilter filter) {
        Specification<Product> spec = buildSpecification(filter);
        return productRepository.count(spec);
    }


    public ProductFlags countProductPerFlag(ProductsFilter filter){

        resetFilterFlags(filter);
        long isLimitedCount = countFilteredProducts(filter, new CountCriteria() {{ setIsLimited(true); }});
        long inOnSaleCount = countFilteredProducts(filter, new CountCriteria() {{ setInOnSale(true); }});
        long isStaffRecommendedCount = countFilteredProducts(filter, new CountCriteria() {{ setIsStaffRecommended(true); }});
        long inStockCount = countFilteredProducts(filter, new CountCriteria() {{ setInStock(true); }});

        return  new ProductFlags(
                isStaffRecommendedCount, inStockCount , inOnSaleCount, isLimitedCount
        );

    }

    private long countFilteredProducts(ProductsFilter filter, CountCriteria countCriteria) {

        if (countCriteria.getIsLimited() != null ) filter.setIsLimited(true);
        if (countCriteria.getInOnSale() != null ) filter.setInOnSale(true);
        if (countCriteria.getIsStaffRecommended() != null ) filter.setIsStaffRecommended(true);
        if (countCriteria.getInStock() != null  ) filter.setInStock(true);

        long count = countProducts(filter);

        resetFilterFlags(filter);
        return count;
    }

    private void resetFilterFlags(ProductsFilter filter){

        filter.setIsLimited(null);
        filter.setInStock(null);
        filter.setInOnSale(null);
        filter.setIsStaffRecommended(null);

    }

    // Method to count products while retaining certain filters
    private Specification<Product> buildSpecification(ProductsFilter filter) {
        ProductSpecificationBuilder builder = new ProductSpecificationBuilder();

        if (filter.getCategory() != null  ) {
            builder.with("category", ":", filter.getCategory());
        }
        if (filter.getMinPrice() != null) {
            builder.with("unitPrice", ">", filter.getMinPrice());
        }
        if (filter.getInStock() != null && filter.getInStock() ) {
            builder.with("unitsInStock", ">", 1);
        }
        if (filter.getMinPrice() != null) {
            builder.with("unitPrice", "<", filter.getMaxPrice());
        }
        if (filter.getIsLimited() != null && filter.getIsLimited() ) {
            builder.with("limited", ":", true);
        }

        if (filter.getIsStaffRecommended() != null && filter.getIsStaffRecommended() ) {
            builder.with("staff_pick", ":", true);
        }

        if (filter.getInOnSale() != null && filter.getInOnSale() ) {
            builder.with("sale", ":", true);
        }

        if(filter.getKeyWords() != null && !filter.getKeyWords().isEmpty()){
            builder.with("name", "like", filter.getKeyWords());
        }

        return builder.build();
    }



}
