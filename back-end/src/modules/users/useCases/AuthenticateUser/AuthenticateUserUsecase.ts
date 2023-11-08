import { IUseCase } from "@/shared/infra/protocols/IUseCase";

import { IGenerateToken } from "../../model/IGenerateToken";
import {
    AuthUserService,
    IRequest,
} from "../../services/usersServices/AuthUserService";

export class AuthenticateUserUseCase
    implements IUseCase<IRequest, IGenerateToken>
{
    constructor(private readonly authUserService: AuthUserService) {}

    async execute({ email, password }: IRequest): Promise<IGenerateToken> {
        return this.authUserService.execute({
            email,
            password,
        });
    }
}
