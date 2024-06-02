const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const helmet = require("helmet");
const apiRoutes = require("./src/routes");

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(helmet.hidePoweredBy());
app.use(helmet.contentSecurityPolicy());
app.use(helmet.frameguard());
app.use(helmet.xssFilter());

app.use(bodyParser.json());
app.use("/api", apiRoutes);


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "contact management system",
      version: "0.1.0",
      description:
        "Contact management system application made with Express and documented with Swagger",
    },
    tags: {
      name: "Contact Management",
      description: "Contact Management APIs",
    },
    servers: [
      {
        url: "http://localhost:9000/api",
        description: "Local Server",
      },
      {
        url: "stage_end_point",
        description: "Development server (uses stage data)",
      },
      {
        url: "live_end_point",
        description: "Live server (uses Live data)",
      },
    ],
  },
  apis: ["./src/controllers/*/*.doc.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/documentation",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

module.exports = app;
