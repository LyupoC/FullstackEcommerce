import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(cartItem: CartItem) {


    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;


    if (this.cartItems.length > 0) {

      existingCartItem = this.cartItems.find(item => item.id === cartItem.id);
      alreadyExistsInCart = (existingCartItem != undefined);

    }

    if (alreadyExistsInCart) {
        existingCartItem!.quantity++;

    } else {

      this.cartItems.push(cartItem);

    }

    this.computeCartTotals();

  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;


    for (let cartItem of this.cartItems) {

      totalPriceValue += cartItem.unitPrice * cartItem.quantity;
      totalQuantityValue += cartItem.quantity;

    }


    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

  }

  empty() {
    this.cartItems = [];
    this.computeCartTotals();

  }
  removeFromCart(cartItem: CartItem) {
    const cartIndex = this.cartItems.findIndex(
      tempCartItem => tempCartItem.id === cartItem.id
    );

    if (cartIndex > -1)
      this.cartItems.splice(cartIndex, 1);

    this.computeCartTotals();
  }

  decrementQuantity(cartItem: CartItem) {

    cartItem.quantity--;

    if (cartItem.quantity == 0) {
      this.removeFromCart(cartItem);
    }

    this.computeCartTotals();

  }



}


