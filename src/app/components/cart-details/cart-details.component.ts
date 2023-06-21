import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})

export class CartDetailsComponent implements OnInit {
  cartItems: CartItem[] = [];

  subTotalPrice: number = 0;
  totalQuantity: number = 0;

  totalPrice: number = 0;

  shipping: number = 10;



  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }


  listCartDetails() {

    this.cartService.totalPrice.subscribe(
      data => { this.subTotalPrice = data; this.totalPrice = data + this.shipping;  }
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.cartItems = this.cartService.cartItems;


    this.cartService.computeCartTotals();
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

}
