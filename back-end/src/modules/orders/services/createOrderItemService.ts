import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { IService } from "@/shared/infra/protocols/IService";

import { IOrderItem } from "../models/IOrderItem";
import {
    ICreateOrderItemDTO,
    IOrderItemRepository,
} from "../repositories/IOrderItemRepository";
import { CreateOrderValidator } from "./validator/createOrderValidator";

export class CreateOrderItemService
    implements IService<ICreateOrderItemDTO, IOrderItem>
{
    constructor(
        private readonly repository: IOrderItemRepository,
        private readonly createOrderValidator: CreateOrderValidator,
    ) {}

    async execute({
        orderId,
        productId,
        quantity,
        OrderItemSizeId,
    }: ICreateOrderItemDTO): Promise<IOrderItem> {
        await this.createOrderValidator.validate({
            orderId,
            productId,
            quantity,
            OrderItemSizeId,
        });

        const orderItem = await this.repository.create({
            orderId,
            productId,
            quantity,
            OrderItemSizeId,
        });

        if (!orderItem)
            throw new ErrorHandler(
                "Error on create order ",
                HttpStatusCode.BAD_REQUEST,
            );

        return orderItem;
    }
}

