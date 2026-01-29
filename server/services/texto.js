import * as fs from "fs";
import * as path from "path";
import * as pdfParseModule from "pdf-parse";
import * as mammothModule from "mammoth";

const pdfParse = pdfParseModule.default || pdfParseModule;
const mammoth = mammothModule.default || mammothModule;

export async function extraerTextoDeDocumento(
    rutaAbsoluta,
    mimetype,
    nombreArchivo
) {
    const ext = path.extname(nombreArchivo || "").toLowerCase();

    if (mimetype === "text/plain" || ext === ".txt") {
        const contenido = fs.readFileSync(rutaAbsoluta, "utf8");
        return contenido.toString();
    }

    if (mimetype === "application/pdf" || ext === ".pdf") {
        const buffer = fs.readFileSync(rutaAbsoluta);
        const data = await pdfParse(buffer);
        return data.text || "";
    }

    if (
        mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        ext === ".docx"
    ) {
        const buffer = fs.readFileSync(rutaAbsoluta);
        const result = await mammoth.extractRawText({ buffer });
        return result.value || "";
    }

    throw new Error("Formato no soportado para extracción de texto.");
}

export function contarPalabras(texto) {
    if (!texto) return 0;
    return texto
        .split(/\s+/)
        .map((w) => w.trim())
        .filter((w) => w.length > 0).length;
}

export function dividirEnFragmentos(texto, tamano = 250) {
    const palabras = texto.split(/\s+/);
    const fragmentos = [];
    let inicioPalabra = 0;

    while (inicioPalabra < palabras.length) {
        const chunk = palabras.slice(inicioPalabra, inicioPalabra + tamano);
        const textoFragmento = chunk.join(" ");
        const inicioChar = texto.indexOf(
            chunk[0],
            fragmentos.length ? fragmentos[fragmentos.length - 1].fin : 0
        );
        const finChar = inicioChar + textoFragmento.length;

        fragmentos.push({
            texto: textoFragmento,
            inicio: inicioChar >= 0 ? inicioChar : 0,
            fin: finChar >= 0 ? finChar : textoFragmento.length,
        });

        inicioPalabra += Math.floor(tamano * 0.7); // solapamiento
    }

    return fragmentos;
}
