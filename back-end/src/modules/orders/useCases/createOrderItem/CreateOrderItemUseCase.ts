import { IUseCase } from "@/shared/infra/protocols/IUseCase";

import { IOrderItem } from "../../models/IOrderItem";
import { ICreateOrderItemDTO } from "../../repositories/IOrderItemRepository";
import { CreateOrderItemService } from "../../services/createOrderItemService";

export class CreateOrderItemUseCase
    implements IUseCase<ICreateOrderItemDTO, IOrderItem>
{
    constructor(
        private readonly createOrderItemService: CreateOrderItemService,
    ) {}

    async execute({
        orderId,
        productId,
        quantity,
        OrderItemSizeId,
    }: ICreateOrderItemDTO): Promise<IOrderItem> {
        return this.createOrderItemService.execute({
            orderId,
            productId,
            quantity,
            OrderItemSizeId,
        });
    }
}

