import { type Request, type Response, Router } from "express";
import { z } from "zod";
import PositionService from "~/Service/PositionService";
import { InputSchema, OutputSchema } from "~/types";
import { parseError } from "~/utils/parseError";

export const PositionRouter = Router();

PositionRouter.post("/positions", async (req: Request, res: Response) => {
  try {
    // validate body
    const body = InputSchema.parse(req.body);
    const response = await PositionService.getShortestPath({ input: body });
    // validate response
    const validateRes = OutputSchema.parse(response);
    res.status(200).send(response);
  } catch (e: unknown) {
    res.status(400).send(parseError(e));
  }
});
