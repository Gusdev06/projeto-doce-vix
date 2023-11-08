import dayjs from "dayjs";

import { HttpStatusCode } from "@/shared/constants/HttpStatusCode";
import { ErrorHandler } from "@/shared/errors/ErrorHandler";
import { ITokenProvider } from "@/shared/infra/adapters/cryptography/ITokenProvider";
import { IService } from "@/shared/infra/protocols/IService";

import { IGenerateToken } from "../../model/IGenerateToken";
import { IUserRepository } from "../../repositories/IUserRepository";
import { AuthUserValidator } from "./validation/AuthUserValidator";

export interface IRequest {
    email: string;
    password: string;
}

export class AuthUserService implements IService<IRequest, IGenerateToken> {
    constructor(
        private readonly authUserValidator: AuthUserValidator,
        private readonly repository: IUserRepository,
        private readonly tokenProvider: ITokenProvider,
    ) {}

    async execute({ email, password }: IRequest): Promise<IGenerateToken> {
        await this.authUserValidator.validate({
            email,
            password,
        });

        const userExists = await this.repository.findByMail(email);

        if (!userExists)
            throw new ErrorHandler(
                "Email or Password incorrect",
                HttpStatusCode.UNAUTHORIZED,
            );

        const token = await this.tokenProvider.generateToken(
            { userId: userExists.id, role: userExists.role },
            "20d",
        );

        const expireIn = dayjs().add(20, "days").toDate();

        return {
            token,
            user: {
                id: userExists.id,
                guid: userExists.guid,
                name: userExists.name,
                email: userExists.email,
                password: userExists.password,
                role: userExists.role,
                createdAt: userExists.createdAt,
                updatedAt: userExists.updatedAt,
            },
            role: userExists.role,
            expireIn,
        };
    }
}
