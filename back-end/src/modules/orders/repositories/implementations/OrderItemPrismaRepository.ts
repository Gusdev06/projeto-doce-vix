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
        OrderItemSizeId,
    }: ICreateOrderItemDTO): Promise<IOrderItem | undefined> {
        const productP = await this.prismaClient.product.findFirst({
            where: {
                id: productId,
            },
        });

        if (!productP) return undefined;

        const SizeP = await this.prismaClient.orderItemSize.findFirst({
            where: {
                id: OrderItemSizeId,
            },
        });

        const orderItemTotalPrice = (productP.price + SizeP?.price) * quantity;

        if (!SizeP) return undefined;

        const order = await this.prismaClient.orderItem.create({
            data: {
                productId,
                quantity,
                OrderItemSizeId,
                orderId: orderId || 0,
                price: orderItemTotalPrice,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            include: {
                OrderItemSize: true,
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
                    increment: orderItemTotalPrice + 4,
                },
            },
        });

        return this.orderItemPrismaFactory.generate(order);
    }
}

