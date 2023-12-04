import { type Request, type Response, Router } from "express";

export const HelloWorldRouter = Router();

HelloWorldRouter.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
