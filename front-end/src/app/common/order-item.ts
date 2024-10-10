import { CartItem } from "./cart-item";
import { Product } from "./product";

export class OrderItem {

  imageUrl: string;
  name: string;
  quantity: number;
  unitPrice: number;
  productId: number;
  product: Product | null = null;

  constructor(cartItem: CartItem) {

    this.imageUrl = cartItem.imageUrl;
    this.quantity = cartItem.quantity;
    this.unitPrice = cartItem.unitPrice;
    this.productId = cartItem.id;
    this.name = cartItem.name;

  }
}
