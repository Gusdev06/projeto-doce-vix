import { IOrderItem } from "../models/IOrderItem";

interface ICreateOrderItemDTO {
    orderId?: number;
    productId: number;
    quantity: number;
    OrderItemSizeId: number;
}

interface IUpdateOrderItemDTO {
    guid: string;
    productId: number;
    quantity?: number;
}

interface IOrderItemRepository {
    create({
        orderId,
        productId,
        quantity,
        OrderItemSizeId,
    }: ICreateOrderItemDTO): Promise<IOrderItem | undefined>;
}

export { ICreateOrderItemDTO, IOrderItemRepository, IUpdateOrderItemDTO };

