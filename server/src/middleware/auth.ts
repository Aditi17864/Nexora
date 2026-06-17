import { Response, NextFunction } from "express";
import { AuthRequest, UserRole } from "../types";
import { verifyToken } from "../utils/jwt";
import { sendError } from "../utils/response";

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return sendError(res, "No token provided", "Unauthorized", 401);
    }

    const decoded: any = verifyToken(token);
    req.user = {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email,
    };

    next();
  } catch (error: any) {
    return sendError(res, "Authentication failed", error.message, 401);
  }
};

export const roleMiddleware = (...allowedRoles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return sendError(res, "User not authenticated", undefined, 401);
    }

    if (!allowedRoles.includes(req.user.role as UserRole)) {
      return sendError(
        res,
        "Access denied",
        `Only ${allowedRoles.join(", ")} can access this resource`,
        403
      );
    }

    next();
  };
};
