import { subirDocumentoCasoUso } from "../../application/casosUso/documentos/subirDocumento.js";

export async function subirDocumento(req, res, next) {
    try {
        const data = await subirDocumentoCasoUso({ file: req.file });
        return res.json({ message: "Archivo subido correctamente", ...data });
    } catch (e) {
        return next(e);
    }
}
