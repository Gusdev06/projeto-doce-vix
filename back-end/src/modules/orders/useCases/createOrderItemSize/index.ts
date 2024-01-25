import { OrderItemSizePrismaRepository } from "../../repositories/implementations/OrderItemSizePrismaRepository";
import { CreateOrderItemSizeController } from "./CreateOrderItemSizeController";
import { CreateOrderItemSizeUseCase } from "./CreateOrderItemSizeUseCase";

const orderItemSizePrismaRepository = new OrderItemSizePrismaRepository();

const createOrderItemSizeUseCase = new CreateOrderItemSizeUseCase(
    orderItemSizePrismaRepository,
);

const createOrderItemSizeController = new CreateOrderItemSizeController(
    createOrderItemSizeUseCase,
);

export { createOrderItemSizeController };

