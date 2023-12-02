import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { IValidator } from "@/shared/infra/protocols/IValidator";

import {
    ICategoryRepository,
    ICreateCategoryDTO,
} from "../../repositories/ICategoryRepository";

export class CreateCategoryValidator implements IValidator<ICreateCategoryDTO> {
    constructor(private readonly repository: ICategoryRepository) {}

    async validate(data: ICreateCategoryDTO): Promise<void> {
        const { name } = data;

        const categoryExists = await this.repository.findByName(name);

        if (!categoryExists)
            throw new ErrorHandler(
                "Category already exists",
                HttpStatusCode.CONFLICT,
            );
    }
}
