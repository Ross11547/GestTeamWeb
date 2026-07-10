export async function subirDocumentoCasoUso({ file }) {
    if (!file) {
        const err = new Error("No se ha enviado ningún archivo");
        err.status = 400;
        throw err;
    }

    return {
        filename: file.filename,
        path: file.path,
        tipo: file.mimetype,
        tamaño: file.size,
    };
}
