import { NextFunction, Request, Response } from "express";

import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { IController } from "@/shared/infra/protocols/IController";

import { CreateOrderItemUseCase } from "./CreateOrderItemUseCase";

class CreateOrderItemController implements IController {
    constructor(private readonly useCase: CreateOrderItemUseCase) {}

    async handle(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void | Response<any, Record<string, any>>> {
        try {
            const { productId, quantity, orderId, OrderItemSizeId } =
                request.body;

            const order = await this.useCase.execute({
                orderId,
                productId,
                quantity,
                OrderItemSizeId,
            });

            return response.status(HttpStatusCode.CREATED).json(order);
        } catch (error) {
            next(error);
        }
    }
}

export { CreateOrderItemController };

