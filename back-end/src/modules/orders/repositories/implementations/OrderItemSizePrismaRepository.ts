import { context } from "@/shared/infra/database/Context";
import { PrismaClient } from "@prisma/client";
import { IOrderItemSize } from "../../models/iOrderItemSize";
import {
    ICreateOrderItemSizeDTO,
    IOrderItemSizeRepository,
} from "../IOrderItemSizeRepository";

export class OrderItemSizePrismaRepository implements IOrderItemSizeRepository {
    private prismaClient: PrismaClient;

    constructor() {
        this.prismaClient = context.prisma;
    }

    async create({
        name,
        price,
    }: ICreateOrderItemSizeDTO): Promise<IOrderItemSize | undefined> {
        const order = await this.prismaClient.orderItemSize.create({
            data: {
                name,
                price,
            },
        });

        if (!order) return undefined;

        return order;
    }
}

