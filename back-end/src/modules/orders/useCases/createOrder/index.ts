import { ProductPrismaRepository } from "@/modules/product/repositories/implementations/ProductRepository";
import { OrderItemPrismaFactory } from "../../factories/OrderItemPrismaFactory";
import { OrderPrismaFactory } from "../../factories/OrderPrismaFactory";
import { OrderItemPrismaRepository } from "../../repositories/implementations/OrderItemPrismaRepository";
import { OrderPrismaRepository } from "../../repositories/implementations/OrderPrismaRepository";
import { CreateOrderItemService } from "../../services/createOrderItemService";
import { CreateOrderValidator } from "../../services/validator/createOrderValidator";
import { CreateOrderController } from "./CreateOrderController";
import { CreateOrderUseCase } from "./CreateOrderUseCase";
import { ProductPrismaFactory } from "@/modules/product/factories/ProductPrismaFactory";

const orderPrismaFactory = new OrderPrismaFactory();
const orderPrismaRepository = new OrderPrismaRepository(orderPrismaFactory);
const orderItemFactory = new OrderItemPrismaFactory();
const orderItemRepository = new OrderItemPrismaRepository(orderItemFactory);
const productFactory = new ProductPrismaFactory();
const productRepository = new ProductPrismaRepository(productFactory);
const createOrderValidator = new CreateOrderValidator(productRepository);
const createOrderItemService = new CreateOrderItemService(orderItemRepository, createOrderValidator)
const createOrderUseCase = new CreateOrderUseCase(orderPrismaRepository, createOrderItemService);
const createOrderController = new CreateOrderController(createOrderUseCase);

export { createOrderController };
