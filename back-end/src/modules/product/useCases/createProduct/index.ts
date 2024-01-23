import { CategoryPrismaFactory } from "@/modules/category/factories/CategoryPrismaFactory";
import { CategoryPrismaRepository } from "@/modules/category/repositories/implementations/CategoryRepository";
import { DayOfWeekPrismaFactory } from "@/modules/dayOfWeek/factories/DayOfWeekPrismaFactory";
import { DayOfWeekPrismaRepository } from "@/modules/dayOfWeek/repositories/implementations/DayOfWeekRepository";
import { DayOfWeekCheckExistsValidator } from "@/modules/dayOfWeek/services/validation/DayOfWeekCheckExistsValidator";
import { CategoryCheckExists } from "./../../../category/services/validation/CategoryCheckExists";

import { ProductPrismaFactory } from "../../factories/ProductPrismaFactory";
import { ProductPrismaRepository } from "../../repositories/implementations/ProductRepository";
import { CreateProductService } from "../../services/CreateProductService";
import { CreateProductValidator } from "../../services/validation/CreateProductValidator";
import { CreateProductController } from "./CreateProductController";
import { CreateProductUseCase } from "./CreateProductUseCase";

const productFactory = new ProductPrismaFactory();
const productRepository = new ProductPrismaRepository(productFactory);

const categoryFactory = new CategoryPrismaFactory();
const categoryRepository = new CategoryPrismaRepository(categoryFactory);

const dayOfWeekFactory = new DayOfWeekPrismaFactory();
const dayOfWeekRepository = new DayOfWeekPrismaRepository(dayOfWeekFactory);

const categoryCheckExists = new CategoryCheckExists(categoryRepository);
const dayOfWeekCheckExistsValidator = new DayOfWeekCheckExistsValidator(
    dayOfWeekRepository,
);

const createProductValidator = new CreateProductValidator(productRepository);

const createProductService = new CreateProductService(
    categoryCheckExists,
    dayOfWeekCheckExistsValidator,
    createProductValidator,
    productRepository,
);
const createProductUseCase = new CreateProductUseCase(createProductService);
const createProductController = new CreateProductController(
    createProductUseCase,
);

export { createProductController };
