import { CategoryCheckExists } from "@/modules/category/services/validation/CategoryCheckExists";
import { DayOfWeekCheckExistsValidator } from "@/modules/dayOfWeek/services/validation/DayOfWeekCheckExistsValidator";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { IService } from "@/shared/infra/protocols/IService";

import { IProduct } from "../model/IProduct";
import {
    ICreateProductDTO,
    IProductRepository,
} from "../repositories/IProductRepository";
import { CreateProductValidator } from "./validation/CreateProductValidator";

export class CreateProductService
    implements IService<ICreateProductDTO, IProduct>
{
    constructor(
        private readonly categoryCheckExists: CategoryCheckExists,
        private readonly dayOfWeekCheckExists: DayOfWeekCheckExistsValidator,
        private readonly createProductValidator: CreateProductValidator,
        private readonly productRepository: IProductRepository,
    ) {}

    async execute({
        name,
        description,
        price,
        categoryGuid,
        dayOfWeek,
        fileGuid,
    }: ICreateProductDTO): Promise<IProduct> {
        if (dayOfWeek) await this.dayOfWeekCheckExists.validate(dayOfWeek);

        await this.categoryCheckExists.validate(categoryGuid);

        await this.createProductValidator.validate({
            name,
            description,
            price,
            categoryGuid,
            dayOfWeek,
            fileGuid,
        });

        const product = await this.productRepository.create({
            name,
            description,
            price,
            categoryGuid,
            dayOfWeek,
            fileGuid,
        });

        if (!product)
            throw new ErrorHandler(
                "Error on create product",
                HttpStatusCode.BAD_REQUEST,
            );

        return product;
    }
}
