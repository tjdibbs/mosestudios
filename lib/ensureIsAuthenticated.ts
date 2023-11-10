import jwt from "jsonwebtoken";
import HttpError from "@lib/httpError";
import { STATUS } from "@lib/constants";
import { STATES } from "mongoose";
import { NextRequest } from "next/server";

export function ensureIsAuthenticated(req: NextRequest) {
  // Extract the Authorization header from the request
  const authHeader = req.headers.get("authorization");

  // Check if the Authorization header exists and starts with "Bearer "
  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Extract the token from the Authorization header
    const token = authHeader!.substring(7);

    try {
      // Verify the token using the JWT library
      const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as {
        user: object;
        tokenType: string;
      };

      if (decoded.tokenType != "accessToken") {
        return new HttpError("Invalid or Expired auth", STATUS.FORBIDDEN);
      }

      // @ts-ignore
      req.user = decoded.user;
      return true;
    } catch (error) {
      // If the token verification fails, return an error response
      return new HttpError("Invalid or Expired auth", STATUS.FORBIDDEN);
    }
  } else {
    // If the Authorization header is missing or doesn't start with "Bearer ",
    // return an error response
    return new HttpError("Not Authorized", STATUS.FORBIDDEN);
  }
}
