import {z} from "zod";

export const UserSchema = z.object({
  name : z
    .string({
      required_error: "The 'name' field cannot be empty.",
      invalid_type_error: "Name must be a string",
    }),
  email : z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("The format of the 'email' field is invalid.")
    .max(255, "Email must have a maximum of 255 characters"), 
  age : z
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number",
    })
    .int("Age debe ser un entero")
    .positive("The 'age' field must be a positive number."),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(6, "Password debe tener al menos 6 caracteres"),
  role: z.enum(['user', 'admin']).default('user'),
})

export const LoginUser = z.object({
  email: UserSchema.shape.email,
  password: UserSchema.shape.password
})

export type LoginParams = z.infer<typeof LoginUser>
export type User = z.infer<typeof UserSchema> & { id: number }

export type UserParams = z.infer<typeof UserSchema>
