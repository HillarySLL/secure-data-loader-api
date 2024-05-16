import jwt from "jsonwebtoken";
import multer from "multer";
import { Router } from "express";
import { ApiError } from "../middlewares/error";

const jwtSecret = "secret";

export const documentRouter = Router();
const upload = multer({ dest: "uploads/" });

documentRouter.post(
  "/upload",
  upload.single("csvFile"),
  async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1] || "";
    let userId;
  
    try {
      const payload = jwt.verify(token, jwtSecret) as {
        userId: number;
        iat: number;
        exp: number;
      };
  
      userId = payload.userId;
    } catch (error) {
      next(new ApiError("No autorizado", 401));
      return;
    }
  
    if (!userId) {
      next(new ApiError("No autorizado", 401));
      return;
    }

    res.status(200).json({token});
  }
);