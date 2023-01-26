import { ModelAttributeColumnOptions } from "sequelize";

export type Columns = "id" | "orderId" | "productId" | "amount";

export type TOrderProductSchema = Record<Columns, ModelAttributeColumnOptions>
