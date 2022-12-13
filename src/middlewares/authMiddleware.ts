import jwt from "jsonwebtoken";
import Todos from "../models/todos";
import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

interface JwtPayload {
  id: string;
}

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required!" });
  }

  const token = authorization.split(" ")[1];

  if (token) {
    try {
      const { id } = jwt.verify(token, jwtSecret!) as JwtPayload;
      const todo = await Todos.findOne({ _id: id });
      // console.log(todo);
      next();
    } catch (error: any) {
      if (error.message === "jwt expired") {
        return res.status(401).json({ error: "access token expired" });
      }
      res.status(401).json({ error: "Request is not authorized" });
    }
  } else {
    res.status(401).json({ error: "Authorization token required!" });
  }
};

export { checkAuth };
