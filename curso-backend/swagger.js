import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de cursos",
      version: "1.0.0",
      description: "documentacion de la api de cursos",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./Routes/*.js"],
};
const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
