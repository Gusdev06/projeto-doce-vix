import { IProduct } from "@/modules/product/model/IProduct";
import { IOrderItemSize } from "./iOrderItemSize";

export interface IProductSubset
    extends Pick<IProduct, "id" | "name" | "description" | "price"> {}

export interface IOrderItem {
    id: number;
    guid: string;
    product: IProductSubset;
    OrderItemSize: IOrderItemSize;
    quantity: number;
    price: number;
    orderId: number;
    createdAt: Date;
    updatedAt: Date;
}

