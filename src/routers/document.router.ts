import jwt from "jsonwebtoken";
import multer from "multer";
import csvParser from "csv-parser";
import fs from "fs"
import { Router } from "express";
import { ApiError } from "../middlewares/error";
import { validateEmail } from "../utils";

const jwtSecret = "secret";

export const documentRouter = Router();
const upload = multer({ dest: "uploads/" });

interface CSVRecord {
  name: string;
  email: string;
  age: string;
  error?: string;
}

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

    const successRecords: any[] = [];
    const errorRecords: any[] = [];
    let index = 0;

    if (req.file) {
      const csvFile = req.file.path;
      fs.createReadStream(csvFile)
        .pipe(csvParser())
        .on('data', (data: CSVRecord) => {
          const record: any = {
            row: index + 1,
            details: {}
          };

          // Validación de campos
          if (!data.name) {
            record.details.name = "El campo 'name' no puede estar vacío.";
          }
          if (!data.email || !validateEmail(data.email)) {
            record.details.email = "El formato del campo 'email' es inválido.";
          }
          if (!data.age || isNaN(parseInt(data.age)) || parseInt(data.age) <= 0) {
            record.details.age = "El campo 'age' debe ser un número positivo.";
          }

          if (Object.keys(record.details).length === 0) {
            // Registro exitoso
            successRecords.push({
              id: index + 1,
              name: data.name,
              email: data.email,
              age: parseInt(data.age)
            });
          } else {
            record.age = data.age;
            record.name = data.name;
            record.email = data.email;
            // Registro con errores
            errorRecords.push(record);
          }
          index++;
        })
        .on('end', () => {
          fs.unlink(csvFile, (err) => {
            if (err) {
              console.error('Error al eliminar el archivo temporal:', err);
            }
          });

          // TODO: Crear tabla user_info (name, email, age).
          // TODO: Registrar registros exitosos en la DB.

          const response = {
            ok: true,
            records: {
              success: successRecords,
              errors: errorRecords
            }
          }
          res.status(200).json(response);
        })
        .on('error', (error) => {
          next(new ApiError("Error al procesar el archivo CSV: " + error.message, 500));
        });
    } else {
      next(new ApiError("No se proporcionó ningún archivo", 400));
    }
  }
);

documentRouter.post(
  "/record",
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

    const { name, email, age } = req.body;
    console.log({ name, email, age });

    res.status(200).json({ ok: true });
  }
);