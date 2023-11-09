export interface ITokenProviderPayload {
    userId: number;
    role?: string;
    email: string;
    [key: string]: any;
}

