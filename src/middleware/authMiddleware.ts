import type { Request, Response, NextFunction } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../services/auth.js";
import * as Sentry from "@sentry/node";
import { logger } from "../services/logging.js";

const log = logger.child({ module: "authMiddleware" });

// Extend Express Request interface to include session context
declare global {
  namespace Express {
    interface Request {
      user?: typeof auth.$Infer.Session.user;
      sessionContext?: typeof auth.$Infer.Session.session;
    }
  }
}

export const requireSession = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Convert Express headers
    const betterAuthHeaders = fromNodeHeaders(req.headers);

    // Fetch session data from Better Auth using headers
    const sessionData = await auth.api.getSession({
      headers: betterAuthHeaders,
    });

    // Block request if no valid session is found
    if (!sessionData) {
      res
        .status(401)
        .json({ error: "Unauthorized: No active sesssion found." });
      return;
    }

    // Attach user and session information to the request object
    req.user = sessionData.user;
    req.sessionContext = sessionData.session;

    next();
  } catch (error) {
    log.error(`Session verification error: ${error}`);
    Sentry.logger.error(`Session verification error.`, {
      module: "authMiddleware",
      error: error,
    });
    res
      .status(500)
      .json({ error: "Internal server error during authentication." });
  }
};
