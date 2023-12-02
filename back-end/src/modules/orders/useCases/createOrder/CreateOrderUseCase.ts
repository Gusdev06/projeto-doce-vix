import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { IUseCase } from "@/shared/infra/protocols/IUseCase";

import { IOrder } from "../../models/IOrder";
import {
    ICreateOrderDTO,
    IOrderRepository,
} from "../../repositories/IOrderRepository";
import { CreateOrderItemService } from "../../services/createOrderItemService";

export class CreateOrderUseCase implements IUseCase<ICreateOrderDTO, IOrder> {
    constructor(
        private readonly repository: IOrderRepository,
        private readonly orderItemService: CreateOrderItemService,
    ) {}

    async execute({
        userId,
        total,
        orderItem,
    }: ICreateOrderDTO): Promise<IOrder> {
        const order = await this.repository.create({ userId, total });

        if (!order) {
            throw new ErrorHandler(
                "Error on create order",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        if (!orderItem) {
            throw new ErrorHandler(
                "Error on create order",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        const orderItemP = await Promise.all(
            orderItem.map(async (item) => {
                item.orderId = order.id;
                console.log(item);
                return await this.orderItemService.execute(item);
            }),
        );

        (order.itens = orderItemP),
            (order.total = orderItemP
                .map((a) => a.price)
                .reduce(function (a, b) {
                    return a + b;
                }));

        return order;
    }
}

