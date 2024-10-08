package com.example.ecommercebackend.config;

import com.example.ecommercebackend.DAO.OrderRepository;
import com.example.ecommercebackend.DAO.ProductRepository;
import com.example.ecommercebackend.entity.Order;
import com.example.ecommercebackend.entity.Product;
import com.example.ecommercebackend.entity.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;


@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {


    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors){

        HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.POST};

        disableHttpMethods(config, theUnsupportedActions, Product.class);
        disableHttpMethods(config, theUnsupportedActions, ProductRepository.class);
        disableHttpMethods(config, theUnsupportedActions, OrderRepository.class);
        disableHttpMethods(config, theUnsupportedActions, Order.class);

        config.exposeIdsFor(ProductCategory.class);
        config.exposeIdsFor(Product.class);
    }

    public void disableHttpMethods(RepositoryRestConfiguration config, HttpMethod[] unsupportedMethods, Class<?> forClass){
        config.getExposureConfiguration()
                .forDomainType(forClass)
                .withItemExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedMethods))
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedMethods));
    }

}
