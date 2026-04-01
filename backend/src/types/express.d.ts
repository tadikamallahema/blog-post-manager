import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & {
        id: number;
        role: string;
      };
    }
  }
}
export {};
/*
modifying the global types 
targetting express typing and requuest interfaces 
get user id and role 
 */