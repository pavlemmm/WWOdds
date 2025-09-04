import { NextFunction, Request, Response } from "express";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || "Server Error"
  });
}

export default errorHandler;
