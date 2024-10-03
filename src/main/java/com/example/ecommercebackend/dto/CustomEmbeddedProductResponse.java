package com.example.ecommercebackend.dto;

import com.example.ecommercebackend.entity.Product;
import org.springframework.hateoas.PagedModel;

import java.util.List;

public class CustomEmbeddedProductResponse {
    private final EmbeddedProducts _embedded;
    private final PagedModel.PageMetadata page;
    private final ProductFlags productFlags;

    public CustomEmbeddedProductResponse(List<Product> products, PagedModel.PageMetadata page, ProductFlags productFlags) {
        this._embedded = new EmbeddedProducts(products);
        this.page = page;
        this.productFlags = productFlags;
    }

    public EmbeddedProducts get_embedded() {
        return _embedded;
    }

    public PagedModel.PageMetadata getPage() {
        return page;
    }

    public ProductFlags getProductFlags(){return this.productFlags; }

    public record EmbeddedProducts(List<Product> products) {
    }
}