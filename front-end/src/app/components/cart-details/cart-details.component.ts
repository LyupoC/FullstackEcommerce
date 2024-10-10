import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})

export class CartDetailsComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];

  subTotalPrice: number = 0;
  totalQuantity: number = 0;

  totalPrice: number = 0;

  shipping: number = 10;

  private totalPriceSubscription: Subscription | undefined;
  private totalQuantitySubscription: Subscription | undefined;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {

    this.totalPriceSubscription = this.cartService.totalPrice.subscribe(
      data => { this.subTotalPrice = data; this.totalPrice = data + this.shipping; }
    );

    this.totalQuantitySubscription = this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.cartItems = this.cartService.cartItems;

  }

  incrementQuantity(cartItem: CartItem) {
    this.cartService.addToCart(cartItem);

  }

  decrementQuantity(cartItem: CartItem) {
    this.cartService.decrementQuantity(cartItem);
  }
  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem);
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
