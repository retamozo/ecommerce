import { ModelAttributeColumnOptions } from "sequelize";

export type Columns = "id" | "orderId" | "productId" | "amount";

export type OrderProductSchema = Record<Columns, ModelAttributeColumnOptions>
