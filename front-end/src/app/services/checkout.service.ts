import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private baseUrl: string = 'https://backend-web-service-ecom.onrender.com/api/checkout/purchase';
  constructor(private httpClient: HttpClient) { }

  purchase(purchase: Purchase): Observable<any> {
    return this.httpClient.post<Purchase>(this.baseUrl, purchase);
  }
}
