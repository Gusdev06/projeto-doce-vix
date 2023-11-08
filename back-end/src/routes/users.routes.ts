import { Router } from "express";

import { authUserController } from "@/modules/users/useCases/AuthenticateUser";
import { createUserController } from "@/modules/users/useCases/Createuser";
import { listUsersController } from "@/modules/users/useCases/listUsers";
import { updateUserController } from "@/modules/users/useCases/updateUser";
import { getToken } from "@/middlewares/auth";

const userRoutes = Router();

userRoutes.post("/register", (request, response, next) => {
    return createUserController.handle(request, response, next);
});

userRoutes.put("/", (request, response, next) => {
    return updateUserController.handle(request, response, next);
});

userRoutes.get("/", getToken, (request, response, next) => {
    return listUsersController.handle(request, response, next);
});

userRoutes.post("/", (request, response, next) => {
    return authUserController.handle(request, response, next);
});

export { userRoutes };
