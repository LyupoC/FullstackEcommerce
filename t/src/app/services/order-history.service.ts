import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { OrderHistory } from "../common/orderHistory";



@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {



  private baseUrl = 'http://localhost:8080/orders';

  constructor(private httpClient: HttpClient) { }

  getOrderHistoryList(email: string) {

    console.log(email)
    return this.httpClient.get<GetResponseOrders>(`${this.baseUrl}/search/findByCustomerEmail?email=${email}&page=0&size=5`);
  }
}


interface GetResponseOrders {
  _embedded: {
    orderHistory: OrderHistory[];
  }

  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
