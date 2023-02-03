export type CreateOrderSchema = {
  customerId: string;
}

export type AddItemSchema = {
  productId: string;
  amount: number
}

export type GetOrderSchema = {
  id: string;
}
