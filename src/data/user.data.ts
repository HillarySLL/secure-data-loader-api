import { User } from "../models/user.model";
import { query } from "../db";

export async function getUserByEmail(email: string): Promise<User | undefined> {
  return(await query("SELECT * FROM users WHERE email = $1", [email])).rows[0]; 
}