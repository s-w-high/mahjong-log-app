const express = require("express");
const path = require("path");

const setupServer = () => {
  const app = express();

  app.use(express.static(path.join(__dirname, "public")));

  app.use(express.json());

  app.get("/hello", (req, res) => {
    res.send("world");
  });
  return app;
};

module.exports = { setupServer };
