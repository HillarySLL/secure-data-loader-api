import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authRouter } from "./routers/auth.router";
import { documentRouter } from "./routers/document.router";

if (process.env["NODE_ENV"]!== "test") {
  dotenv.config({path: ".env"});
}else{
  dotenv.config();
}

export const app = express();

let corsOptions = {
  origin: process.env["CLIENT_ORIGIN"],
}

app.use(cors(corsOptions));

app.use(express.json());

app.use("/authentication", authRouter);

app.use("/document", documentRouter);
