import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { resolve } from "path";

import { Router } from "express";

const router = Router();

const options = swaggerJSDoc({
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "AdminJS backend",
      description: "AdminJS - Chat backend API docs",
    },
    servers: [
      {
        url: "http://localhost:5000/",
        description: "The localhost server",
      },
    ],
    components: {
      securitySchemes: {
        Bearer: {
          type: "apiKey",
          name: "token",
          in: "header",
          description: "Please use login api to get token",
        },
      },
    },
  },
  apis: [`${resolve("src", "modules", "swagger", "docs", "**", "*.yaml")}`],
});

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(options));

export default router;
