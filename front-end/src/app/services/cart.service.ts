import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItemsKey = 'cartItems';
  private totalPriceKey = 'totalPrice';
  private totalQuantityKey = 'totalQuantity';

  cartItems: CartItem[] = [];

  totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalQuantity: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {
    this.loadCartFromStorage();

  }

  private loadCartFromStorage(): void {
    const items = localStorage.getItem(this.cartItemsKey);
    const totalPrice = localStorage.getItem(this.totalPriceKey);
    const totalQuantity = localStorage.getItem(this.totalQuantityKey);

    // Load cart items
    if (items) {
      try {
        this.cartItems = JSON.parse(items);
        if (!Array.isArray(this.cartItems)) {
          this.cartItems = []; // Reset to empty array if invalid
        }
      } catch {
        this.cartItems = []; // Reset to empty array on parse error
      }
    }

    // Load total price
    if (totalPrice) {
      const parsedPrice = parseFloat(totalPrice);
      if (!isNaN(parsedPrice)) {
        this.totalPrice.next(parsedPrice);
      }
    }

    // Load total quantity
    if (totalQuantity) {
      const parsedQuantity = parseInt(totalQuantity, 10);
      if (!isNaN(parsedQuantity)) {
        this.totalQuantity.next(parsedQuantity);
      }
    }
  }

  saveCart(items: CartItem[], totalPrice: number, totalQuantity: number): void {
    localStorage.setItem(this.cartItemsKey, JSON.stringify(items));
    localStorage.setItem(this.totalPriceKey, totalPrice.toString());
    localStorage.setItem(this.totalQuantityKey, totalQuantity.toString());
  }


  clearCartStorage(): void {
    localStorage.removeItem(this.cartItemsKey);
    localStorage.removeItem(this.totalPriceKey);
    localStorage.removeItem(this.totalQuantityKey);
  }

  addToCart(cartItem: CartItem) {

    const existingCartItem = this.cartItems.find(item => item.id === cartItem.id);

    if (existingCartItem) {
        existingCartItem.quantity++;

    } else {

      this.cartItems.push(cartItem);

    }

    this.updateCart();

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

  clearCart() {

    this.cartItems = [];
    this.computeCartTotals();
    this.clearCartStorage();

  }

  removeFromCart(cartItem: CartItem) {
    const cartIndex = this.cartItems.findIndex(
      tempCartItem => tempCartItem.id === cartItem.id
    );

    if (cartIndex > -1)
      this.cartItems.splice(cartIndex, 1);

    this.updateCart();
  }

  decrementQuantity(cartItem: CartItem) {

    cartItem.quantity--;

    if (cartItem.quantity == 0) {
      this.removeFromCart(cartItem);
    }

    this.updateCart();
  }

  private updateCart() {
    this.computeCartTotals();
    this.saveCart(this.cartItems, this.totalPrice.getValue(), this.totalQuantity.getValue());
  }



}


