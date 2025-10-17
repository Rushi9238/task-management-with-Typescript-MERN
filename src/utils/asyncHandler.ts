import { Request, Response, NextFunction } from 'express';

export const asyncHandler = (
  requestHandler: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(requestHandler(req, res, next)).catch((error: any) => {
      next(error);
    });
  };
};
