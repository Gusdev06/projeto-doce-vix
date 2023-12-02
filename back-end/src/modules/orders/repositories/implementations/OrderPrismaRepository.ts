import { context } from "@/shared/infra/database/Context";
import { IDefaultFactory } from "@/shared/infra/factories/IDefaultFactory";
import { PrismaClient } from "@prisma/client";

import { IOrderPrisma } from "../../factories/OrderPrismaFactory";
import { IOrder } from "../../models/IOrder";
import {
    ICreateOrderDTO,
    IListOrdersRequest,
    IListOrdersResponse,
    IOrderRepository,
} from "../IOrderRepository";

export class OrderPrismaRepository implements IOrderRepository {
    private prismaClient: PrismaClient;

    constructor(
        private readonly orderPrismaFactory: IDefaultFactory<
            IOrderPrisma,
            IOrder
        >,
    ) {
        this.prismaClient = context.prisma;
    }

    async findByGuid(guid: string): Promise<IOrder | undefined> {
        const order = await this.prismaClient.order.findFirst({
            where: {
                guid,
            },
        });

        if (!order) return undefined;
    }

    async create({
        userId,
        total,
    }: ICreateOrderDTO): Promise<IOrder | undefined> {
        const userExists = await this.prismaClient.user.findFirst({
            where: {
                id: userId,
            },
        });

        if (!userExists) return undefined;
        const order = await this.prismaClient.order.create({
            data: {
                userId,
                total,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            include: {
                itens: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        return this.orderPrismaFactory.generate(order);
    }

    async list({
        search,
        limit,
        offset,
    }: IListOrdersRequest): Promise<IListOrdersResponse | undefined> {
        const where = search
            ? {
                  OR: [
                      {
                          userId: {
                              user: {
                                  contains: search,
                              },
                          },
                      },
                  ],
              }
            : undefined;

        const count = await this.prismaClient.order.count({
            where,
        });

        const ordersP = await this.prismaClient.order.findMany({
            where,
            take: limit,
            skip: offset,
        });

        if (!ordersP) return undefined;

        const orders = await Promise.all(
            ordersP.map(async (orderP) => {
                const orders = await this.prismaClient.order.findUnique({
                    where: {
                        id: orderP.id,
                    },
                    include: {
                        itens: {
                            include: {
                                product: true,
                            },
                        },
                    },
                });
                return orders ? this.orderPrismaFactory.generate(orders) : null;
            }),
        );

        return {
            orders: orders.filter((order) => order !== null) as IOrder[],
            count,
        };
    }
}

