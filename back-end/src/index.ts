import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import path from "path";
import swaggerUI from "swagger-ui-express";

import swaggerDocument from "../swagger.json";
import { errorHandler } from "./middlewares/errorHandler";
import { authRoutes } from "./routes/auth.routes";
import { categoryRoutes } from "./routes/categories.routes";
import { dayOfWeekRoutes } from "./routes/dayOfWeek.routes";
import { fileRoutes } from "./routes/file.routes";
import { orderItemRouter, orderRouter } from "./routes/orders.routes";
import { productRoutes } from "./routes/product.routes";
import { orderItemSizeRouter } from "./routes/size.routes";
import { userRoutes } from "./routes/users.routes";
import { envs } from "./shared/envs";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(errorHandler);

app.get("/", (req, res) => {
    res.json({
        timestamp: new Date(),
    });
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use("/orders", orderRouter);
app.use("/orders/itens", orderItemRouter);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/sizes", orderItemSizeRouter);
app.use("/categories", categoryRoutes);
app.use("/dayofweek", dayOfWeekRoutes);
app.use("/login", authRoutes);
app.use("/files", fileRoutes);

if (envs.nodeEnv === "development") {
    app.use(
        "/public/files",
        express.static(path.resolve(__dirname, "shared", "infra", "temp")),
    );
}

app.use("/public/static", express.static(path.resolve(__dirname, "public")));

export default app;
