// types/express.d.ts or in your middleware file
import { Request } from 'express';

declare global {
  namespace Express {
    interface AuthRequest extends Request {
      user?: any; // Replace 'any' with your user type
    }
  }
}

export interface AuthRequest extends Request {
  user?: any;
}