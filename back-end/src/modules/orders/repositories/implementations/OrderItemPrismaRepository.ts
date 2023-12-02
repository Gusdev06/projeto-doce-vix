import { context } from "@/shared/infra/database/Context";
import { IDefaultFactory } from "@/shared/infra/factories/IDefaultFactory";
import { PrismaClient } from "@prisma/client";

import { IOrderItemPrisma } from "../../factories/OrderItemPrismaFactory";
import { IOrderItem } from "../../models/IOrderItem";
import {
    ICreateOrderItemDTO,
    IOrderItemRepository,
} from "../IOrderItemRepository";

export class OrderItemPrismaRepository implements IOrderItemRepository {
    private prismaClient: PrismaClient;

    constructor(
        private readonly orderItemPrismaFactory: IDefaultFactory<
            IOrderItemPrisma,
            IOrderItem
        >,
    ) {
        this.prismaClient = context.prisma;
    }

    async create({
        productId,
        quantity,
        orderId,
    }: ICreateOrderItemDTO): Promise<IOrderItem | undefined> {
        const productP = await this.prismaClient.product.findFirst({
            where: {
                id: productId,
            },
        });

        if (!productP) return undefined;

        const orderItemTotalPrice = productP.price * quantity;
        const order = await this.prismaClient.orderItem.create({
            data: {
                productId,
                quantity,
                orderId,
                price: orderItemTotalPrice,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            include: {
                Order: true,
                product: true,
            },
        });

        await this.prismaClient.order.update({
            where: {
                id: orderId,
            },
            data: {
                total: {
                    increment: orderItemTotalPrice,
                },
            },
        });

        return this.orderItemPrismaFactory.generate(order);
    }
}

