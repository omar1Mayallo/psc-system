import Snack from "./Snack";

export enum OrderTypes {
  IN_DEVICE = "IN_DEVICE",
  OUT_DEVICE = "OUT_DEVICE",
}

export enum OrderStatus {
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export interface OrderItem {
  snack: string | Snack;
  price: number;
  quantity: number;
}

export default interface Order {
  _id: string;
  orderItems: OrderItem[];
  orderPrice: number;
  type: OrderTypes;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}
