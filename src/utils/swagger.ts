import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Snapify API",
      version: "1.0.0",
      description: "API documentation for Snapify backend",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/docs/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };









// import swaggerJSDoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';
// import { Express } from 'express';

// const options: swaggerJSDoc.Options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Snapify API',
//       version: '1.0.0',
//       description: 'API documentation for Snapify project',
//     },
//     servers: [
//       {
//         url: 'http://localhost:3000/api',
//       },
//     ],
//   },
//   apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // adjust paths if needed
// };

// const swaggerSpec = swaggerJSDoc(options);

// export const setupSwagger = (app: Express) => {
//   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// };
