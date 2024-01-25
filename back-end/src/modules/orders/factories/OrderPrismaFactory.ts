import { IDefaultFactory } from "@/shared/infra/factories/IDefaultFactory";
import { Order as POrder } from "@prisma/client";

import { IOrder } from "../models/IOrder";
import { IOrderItem } from "../models/IOrderItem";

export interface IOrderPrisma extends Omit<POrder, "itens" | "product"> {
    itens: IOrderItem[];
}

export class OrderPrismaFactory
    implements IDefaultFactory<IOrderPrisma, IOrder>
{
    async generate(entity: IOrderPrisma): Promise<IOrder> {
        const result = {
            id: entity.id,
            guid: entity.guid,
            userId: entity.userId,
            itens: entity.itens.map((orderItem) => ({
                id: orderItem.id,
                guid: orderItem.guid,
                product: {
                    id: orderItem.product.id,
                    name: orderItem.product.name,
                    description: orderItem.product.description,
                    price: orderItem.product.price,
                },
                OrderItemSize: {
                    id: orderItem.OrderItemSize.id,
                    name: orderItem.OrderItemSize.name,
                    price: orderItem.OrderItemSize.price,
                },
                quantity: orderItem.quantity,
                price: orderItem.price,
                orderId: orderItem.orderId,
                createdAt: orderItem.createdAt,
                updatedAt: orderItem.updatedAt,
            })),
            total: entity.total,
            status: entity.status,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };

        return result;
    }
}

