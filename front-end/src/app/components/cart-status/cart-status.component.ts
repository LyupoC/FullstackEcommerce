import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit, OnDestroy {

  totalPrice: number = 0;
  totalQuantity: number = 0;

  private totalPriceSubscription: Subscription | undefined;
  private totalQuantitySubscription: Subscription | undefined;


  constructor(private cartService: CartService) { }

  ngOnInit(): void {

    this.updateCartStatus();

  }

  updateCartStatus(): void{


    this.totalPriceSubscription = this.cartService.totalPrice.subscribe(
      data => { this.totalPrice = data });


    this.totalQuantitySubscription =  this.cartService.totalQuantity.subscribe(
      data => { this.totalQuantity = data });

    }

  ngOnDestroy() {
    if (this.totalPriceSubscription) {
      this.totalPriceSubscription.unsubscribe();
    }
    if (this.totalQuantitySubscription) {
      this.totalQuantitySubscription.unsubscribe();
    }
  }

}
