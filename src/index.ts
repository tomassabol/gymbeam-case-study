import express from "express";
import { HelloWorldRouter } from "~/Router/HelloWorldRouter";
import { PositionRouter } from "~/Router/PositionRouter";

// define port to run express app
const port = 3000;

// create and run express app
const app = express();

// add routers
app.use(express.json(), express.urlencoded({ extended: true }));
app.use("/", HelloWorldRouter, PositionRouter);

app.listen(port, () =>
  console.log(`App is running on http://localhost:${port}`),
);
