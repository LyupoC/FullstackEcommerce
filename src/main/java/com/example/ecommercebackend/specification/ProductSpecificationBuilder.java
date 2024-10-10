package com.example.ecommercebackend.specification;

import com.example.ecommercebackend.entity.Product;
import jakarta.persistence.criteria.*;

import org.springframework.data.jpa.domain.Specification;
import java.util.ArrayList;

public class ProductSpecificationBuilder  {
    ArrayList<Specification<Product>> specifications = new ArrayList<>();

    public ProductSpecificationBuilder with(String key, String operation, Object value) {
            specifications.add(new ProductSpecification(new SearchCriteria(key, operation, value)));
            return this;
        }

        public Specification<Product> build() {
            if (specifications.isEmpty()) {
                return null;
            }

            Specification<Product> result = specifications.get(0);

            for (int i = 1; i < specifications.size(); i++) {
                result = Specification.where(result).and(specifications.get(i));
            }

            return result;
        }

        public static class ProductSpecification implements Specification<Product> {
            SearchCriteria searchCriteria;

            public ProductSpecification(SearchCriteria searchCriteria) {
                this.searchCriteria = searchCriteria;
            }

            @Override
            public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder builder) {

                Expression<?> attribute = root.get(searchCriteria.getKey());
                Object value = searchCriteria.getValue();

                switch (searchCriteria.getOperation()) {
                    case ":" -> {
                        if (value instanceof Boolean) {
                            return builder.equal(attribute.as(Boolean.class), value);
                        } else if (value instanceof Number) {
                            return builder.equal(attribute.as(Number.class), value);
                        } else {
                            return builder.equal(attribute.as(String.class), value.toString());
                        }
                    }
                    case ">" -> {
                        if (value instanceof Integer) {
                            return builder.greaterThanOrEqualTo(attribute.as(Integer.class), (Integer) value);
                        } else if (value instanceof Long) {
                            return builder.greaterThanOrEqualTo(attribute.as(Long.class), (Long) value);
                        } else if (value instanceof Double) {
                            return builder.greaterThanOrEqualTo(attribute.as(Double.class), (Double) value);
                        }
                    }
                    case "<" -> {
                        if (value instanceof Integer) {
                            return builder.lessThanOrEqualTo(attribute.as(Integer.class), (Integer) value);
                        } else if (value instanceof Long) {
                            return builder.lessThanOrEqualTo(attribute.as(Long.class), (Long) value);
                        } else if (value instanceof Double) {
                            return builder.lessThanOrEqualTo(attribute.as(Double.class), (Double) value);
                        }
                    }
                    case "like" -> {
                        return builder.like(attribute.as(String.class), "%" + value + "%");
                    }
                    default -> {
                        return null;
                    }
                }
                return null;
            }
        }
}
