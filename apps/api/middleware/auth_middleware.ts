import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const auth = req.headers.authorization!;

  try {
    if (!auth) {
      res.status(200).send({
        message: "DAV Network Node",
      });
    }

    const data = jwt.verify(auth, process.env.secret_password!);
    req.userid = data.sub as string;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
}
