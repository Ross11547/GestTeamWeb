import path from "path";
import multer from "multer";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); 
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de archivo no permitido"));
  }
};

export const upload = multer({ storage, fileFilter });

export const subirDocumento = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No se ha enviado ningún archivo" });
    }

    const archivo = req.file;

    res.json({
      message: "Archivo subido correctamente",
      filename: archivo.filename,
      path: archivo.path,
      tipo: archivo.mimetype,
      tamaño: archivo.size,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al subir archivo", error: error.message });
  }
};
