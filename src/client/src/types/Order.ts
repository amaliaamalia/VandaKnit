import { Product } from "./Product";

export type Order = {
  id: string;
  userId: string;
  status: string;
  total: number;
  orderItems: OrderItem[];
  shippingAddress?: ShippingAddress;
  payment?: Payment;
};

export type OrderItem = {
  productId: string;
  product: Product;
  quantity: number;
  price: number;
};

export type ShippingAddress = {
  street: string;
  city: string;
  postalCode: string;
  country: string;
};

export type Payment = {
  paymentMethod: string;
  transactionId?: string;
  paymentStatus: string;
};

export type CreateOrderRequest = {
  userId: string;
  items: OrderItemDto[];
};

export type SubmitOrderRequest = {
  orderId: string;
  shippingAddress: ShippingAddressDto;
  payment: PaymentDto;
};

export type OrderItemDto = {
  productId: string;
  quantity: number;
};

export type ShippingAddressDto = {
  street: string;
  city: string;
  postalCode: string;
  country: string;
};

export type PaymentDto = {
  paymentMethod: string;
  transactionId?: string;
};