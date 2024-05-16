import bcrypt from "bcrypt";
import { ApiError } from "../middlewares/error";
import * as userDB from "./../data/user.data";
import { LoginParams, User} from "./../models/user.model";

export async function validateCredentials(
  credentials: LoginParams
): Promise<User> {
  const { email, password } = credentials;
  const user = await userDB.getUserByEmail(email);
  const isValid = await bcrypt.compare(password, user?.password || "");

  if (!user || !isValid) {
    throw new ApiError("Credenciales incorrectas", 400);
  }

  return user
}
