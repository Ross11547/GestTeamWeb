import path from "path";
import multer from "multer";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// IMPORTANTE: sube a /uploads (raíz del server) no dentro de src
const uploadDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const fileFilter = (_req, file, cb) => {
    const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // docx
    ];
    if (allowedTypes.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Tipo de archivo no permitido"));
};

export const upload = multer({ storage, fileFilter });
