const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const middlewares = require("./middlewares");

const log = require("./api/log");
const mongoose = require("mongoose");

require("dotenv").config();

// mongoose.connect(process.env.DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("mongoDB connected");
});

const app = express();
app.use(morgan("common")); // for debugging
app.use(helmet()); // for hiding headers in console in netword for vulnerbality
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "hello world",
  });
});

app.use("/api/logs", log);

app.use(middlewares.notFound);

app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
