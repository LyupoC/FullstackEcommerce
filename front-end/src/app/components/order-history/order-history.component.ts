import { Component, OnInit } from '@angular/core';
import { OrderHistory } from '../../common/orderHistory';
import { OrderHistoryService } from '../../services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {


  orderHistory: OrderHistory[] = [];
  expandedRow: number | null = null;

  constructor(private orderHistoryService: OrderHistoryService) { }

  ngOnInit(): void {

    this.orderHistoryService.getOrderHistoryList("lyubomir.chernev@gmail.com").subscribe(
      orders => {
        this.orderHistory = orders._embedded.orderHistory;

        console.log(this.orderHistory);
        console.log("ordersObjs: ", orders)
      }



    );
  }

  onRowClick(index: number) {
    this.expandedRow = this.expandedRow === index ? null : index;
  }

}
