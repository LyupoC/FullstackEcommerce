import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'https://backend-web-service-ecom.onrender.com/products';
  private categoryUrl = 'https://backend-web-service-ecom.onrender.com/product-category';

  constructor(private httpClient: HttpClient) { }




  getProduct(theProductId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  getProductCategoryList(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }


  getProductList(categoryid: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryid}`;
    return this.searchProducts(searchUrl);
  }


  searchProductList(name: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${name}`;
    return this.searchProducts(searchUrl);
  }

  searchProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getNewest8Products(): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findFirst8ByOrderByDateCreated`;
    return this.searchProducts(searchUrl);
  }

  getHighestRated8Products(): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findFirst8ByOrderByRating`;
    return this.searchProducts(searchUrl);
  }

  getProductsPaginate(page:number, pageSize:number, categoryId: number) : Observable<GetResponseProducts>{
     const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}&page=${page}&size=${pageSize}`;
     return this.httpClient.get<GetResponseProducts>(searchUrl);
   }
}



interface GetResponseProducts {
  _embedded: {
    products: Product[];
  }
  page:{
    size:number,
    totalElements:number,
    totalPages:number,
    number: number
  }
}

interface GetResponse {
  _embedded: {
    products: Product[];
  }
}
interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
