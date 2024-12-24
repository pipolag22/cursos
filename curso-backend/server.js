import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./Routes/auth.js";
import courseRoutes from "./Routes/courses.js";
import { swaggerUi, specs } from "./swagger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Conectar a MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((err) => {
    console.error("Error al conectar a MongoDB", err);
  });

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api", courseRoutes);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
