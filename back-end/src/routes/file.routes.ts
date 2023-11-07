import { Router } from "express";
import multer from "multer";

import { multerConfig } from "@/middlewares/multer";
import { deleteFileController } from "@/modules/file/useCases/deleteFIle";
import { listFilesController } from "@/modules/file/useCases/listFiles";
import { uploadFIleController } from "@/modules/file/useCases/uploadFIle";

const fileRoutes = Router();

const files = multer(multerConfig);

fileRoutes.post("/", files.single("file"), (request, response, next) => {
    return uploadFIleController.handle(request, response, next);
});

fileRoutes.delete("/:id", files.single("file"), (request, response, next) => {
    return deleteFileController.handle(request, response, next);
});

fileRoutes.get("/", files.single("file"), (request, response, next) => {
    return listFilesController.handle(request, response, next);
});

export { fileRoutes };

