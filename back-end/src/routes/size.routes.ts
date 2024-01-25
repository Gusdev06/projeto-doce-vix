import { createOrderItemSizeController } from "@/modules/orders/useCases/createOrderItemSize";
import { Router } from "express";

const orderItemSizeRouter = Router();

orderItemSizeRouter.post("/", (request, response, next) => {
    return createOrderItemSizeController.handle(request, response, next);
});

export { orderItemSizeRouter };

