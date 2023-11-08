import { IUser } from "./IUser";

export interface IGenerateToken {
    id?: number;
    token: string;
    user: IUser;
    expireIn: Date;
    role: string;
}
