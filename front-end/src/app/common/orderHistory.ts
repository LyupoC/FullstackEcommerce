import { OrderItem } from "./order-item";

export class OrderHistory {

  constructor(
/*    public id:number,*/
    public orderTrackingNumber: string,
    public totalPrice: number,
    public totalQuantity: number,
    public dateCreated: Date,
    public orderItems: OrderItem[]
  ) { }
}
