import express from "express";
import multer from "multer";
import * as path from "path";
import * as fs from "fs";
import {
    uploadDocumento,
    analizar,
    uploadRepositorioUnifranz,
} from "./controllerPlagioIA.js";

const router = express.Router();

const uploadDir = path.join(process.cwd(), "uploads", "plagio");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination(_req, _file, cb) {
        cb(null, uploadDir);
    },
    filename(_req, file, cb) {
        const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "-" + file.originalname);
    },
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), uploadDocumento);

router.post("/analizar", analizar);

router.post(
    "/repositorio/unifranz",
    upload.single("file"),
    uploadRepositorioUnifranz
);

export default router;
