import { Router } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../middlewares/error";
import { validateCredentials } from "../services/auth.service"; 

const jwtSecret = "secret";

export const authRouter = Router();

authRouter.post(
  "/login",
  async (req, res, next) => {
    try {
      const user = await validateCredentials(req.body);
      if(!user){
        next(new ApiError("Invalid credentials", 401));
        return;
      }
    
      const payload = {userId: user.id, email: user.email};
      const token = jwt.sign(payload, jwtSecret, {expiresIn: "1h"});
      res.status(200).json({token});
    } catch (error) {
      next(error);
    }
  }
);