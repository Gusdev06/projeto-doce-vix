import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { IValidator } from "@/shared/infra/protocols/IValidator";

import {
    ICategoryRepository,
    ICreateCategoryDTO,
} from "../../repositories/ICategoryRepository";

export class CategoryCheckExists implements IValidator<string> {
    constructor(private readonly repository: ICategoryRepository) {}

    async validate(guid: string): Promise<void> {

        const categoryExists = await this.repository.findByGuid(guid);

        if (!categoryExists)
            throw new ErrorHandler(
                "Category not found",
                HttpStatusCode.CONFLICT,
            );
    }
}
