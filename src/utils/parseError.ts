import { AxiosError } from "axios";
import { ZodError } from "zod";

/**
 *
 */
export function parseError(e: unknown) {
  if (e instanceof ZodError) {
    return e.format();
  } else if (e instanceof AxiosError) {
    return e.response?.data as unknown;
  } else if (e instanceof Error) {
    return e.message;
  } else {
    return e;
  }
}
