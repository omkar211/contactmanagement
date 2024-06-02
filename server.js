require("dotenv").config();
const app = require("./app");
const PORT = process.env.APP_PORT || 9000;
const DBConnect = require("./config/postgressql");

// Handle uncaught exceptions
process.on("uncaughtException", (uncaughtExc) => {
  // Won't execute
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(`uncaughtException Err:: ${uncaughtExc}`);
  console.log(
    `uncaughtException Stack:: ${JSON.stringify(uncaughtExc.stack)}`
  );
  process.exit(1);
});

// Setup an express server and define port to listen all incoming requests for this application
const setUpExpress = async () => {
  const connection = await DBConnect();
  if (!connection) throw new Error("ERROR: Unable to connect to the database.");
  const server = app.listen(PORT, () => {
    // process.send("ready");
    console.log(
      `${
        process.env.NODE_ENV || "development"
      } server is running on port ${PORT}...`
    );
  });
  server.keepAliveTimeout = 60 * 1000;
  // server.timeout = 300000;
  server.keepAlive = true;

  // In case of an error
  app.on("error", (appErr, appCtx) => {
    console.log("APP ERROR::");
    console.log(appErr);
    console.log(appCtx.req.url);
  });

  // Handle unhandled promise rejections
  process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION! Shutting down...");
    console.log(err);
  });

  // Ctr+C
  process.on("SIGINT", () => {
    console.log("SIGINT signal received.");
    // Stops the server from accepting new connections and finishes existing connections.
    server.close((err) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
    });
  });

  process.on("SIGTERM", () => {
    console.log("SIGTERM RECEIVED. Shutting down gracefully");
    server.close(() => {
      console.log("Process terminated!");
    });
  });
  return server;
};

const server = setUpExpress();

module.exports = server;
