import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import { json, urlencoded } from "body-parser";
import routes from "./routes/index";
import sequelize from "./config/db.config";
import { logger } from "./utils/logger";
import { swaggerSpec, swaggerUi } from './utils/swagger';

dotenv.config();

const app = express();

app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: false }));

// setupSwagger(app);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));



sequelize.authenticate()
  .then(() => {
    console.log("Database connected...");
    logger.info("Database connected successfully");
    // Start server here after DB is ready
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      logger.info(`Server running on http://localhost:${PORT}`);
      logger.info(`Swgger docs available at http://localhost:${PORT}/api/docs`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
    logger.error("DB connection failed", { error: err });
  });

// Routes
app.use("/api", routes);

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", { promise, reason });
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", { error });
  console.error("Uncaught Exception:", error);
});



