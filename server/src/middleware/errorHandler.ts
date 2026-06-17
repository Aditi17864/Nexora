import { Response, NextFunction } from "express";
import { AuthRequest } from "../types";
import { sendError } from "../utils/response";

export const errorHandler = (
  err: any,
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err);

  if (err.name === "ValidationError") {
    return sendError(res, "Validation Error", err.message, 400);
  }

  if (err.name === "CastError") {
    return sendError(res, "Invalid ID", err.message, 400);
  }

  if (err.code === 11000) {
    return sendError(res, "Duplicate Field", "Field already exists", 409);
  }

  return sendError(res, "Internal Server Error", err.message, 500);
};
