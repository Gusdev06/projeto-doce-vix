/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-unresolved */

import { CategoryCheckExists } from "@/modules/category/services/validation/CategoryCheckExists";
import { DayOfWeekCheckExistsValidator } from "@/modules/dayOfWeek/services/validation/DayOfWeekCheckExistsValidator";
import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { IService } from "@/shared/protocols/service/IService";
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
        await this.createProductValidator.validate({
            name,
            description,
            price,
            categoryGuid,
            dayOfWeek,
            fileGuid,
        });
        if (dayOfWeek) await this.dayOfWeekCheckExists.validate(dayOfWeek);

        await this.categoryCheckExists.validate(categoryGuid);

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
                "Não foi possível criar o produto",
                HttpStatusCode.BAD_REQUEST,
            );

        return product;
    }
}
