import { IProduct } from "@/modules/product/model/IProduct";
import { IDefaultFactory } from "@/shared/infra/factories/IDefaultFactory";
import { OrderItem as POrderItem } from "@prisma/client";
import { IOrderItem } from "../models/IOrderItem";
import { IOrderItemSize } from "../models/iOrderItemSize";

export interface IOrderItemPrisma
    extends Omit<POrderItem, "product" | "OrderItemSize"> {
    product: Omit<IProduct, "category">;
    OrderItemSize: IOrderItemSize;
}

export class OrderItemPrismaFactory
    implements IDefaultFactory<IOrderItemPrisma, IOrderItem>
{
    async generate(entity: IOrderItemPrisma): Promise<IOrderItem> {
        const result = {
            id: entity.id,
            guid: entity.guid,
            product: {
                id: entity.product.id,
                name: entity.product.name,
                description: entity.product.description,
                price: entity.product.price,
            },
            OrderItemSize: {
                id: entity.OrderItemSize.id,
                name: entity.OrderItemSize.name,
                price: entity.OrderItemSize.price,
            },
            quantity: entity.quantity,
            price: entity.price,
            orderId: entity.orderId,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };

        return result;
    }
}

