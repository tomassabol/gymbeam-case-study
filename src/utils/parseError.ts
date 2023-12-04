import { AxiosError } from "axios";
import { z } from "zod";

export function parseError(e: unknown) {
  if (e instanceof z.ZodError) {
    return e.issues.map((issue) => {
      return {
        path: issue.path,
        message: issue.message,
      };
    });
  } else if (e instanceof AxiosError) {
    return e.response?.data;
  } else if (e instanceof Error) {
    return e.message;
  } else {
    return e;
  }
}
