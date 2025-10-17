import { Request, Response, NextFunction } from 'express';
import User from '../models/User.model';
import { asyncHandler } from '../utils/asyncHandler';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  _id: string;
  exp: number;
}

export interface AuthRequest extends Request {
  user?: any;
}

const JWT_SECRET = process.env.JWT_SECRET || 'BIrzvSC8np';

export const authorityCheck = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized user',
          data: null,
        });
      }

      const decodeToken = jwt.verify(token, JWT_SECRET) as DecodedToken;
      if (decodeToken?.exp < Math.floor(Date.now() / 1000)) {
        res.status(401).json({
          success: false,
          message: 'Access token expire',
          data: null,
        });
      }
      const user = await User.findById(decodeToken?._id).select('-password');
      // console.log(decodeToken.exp,"/",Math.floor(Date.now()/1000))
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'User not Found',
          data: null,
        });
      }
      ((req.user = user), next());
    } catch (error) {
      console.error('Error comes when checking authority', error);
    }
  },
);
