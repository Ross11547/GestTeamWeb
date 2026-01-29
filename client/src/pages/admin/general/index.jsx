import React, { useEffect, useMemo, useState } from "react";
import {
    Container,
    PageWrapper,
    PageHeader,
    Title,
    SearchContainer,
    SearchInput,
    Table,
    TableHeader,
    TableRow,
    TableCell,
} from "../../../style/generalStyle.jsx";
import { ColorsLogin } from "../../../style/colors";
import { Search } from "lucide-react";
import { toast } from "sonner";

// Etiquetas literales de semestre (fallback si no viene etiqueta desde la BD)
const SEM_LABELS = [
    null,
    "Primer semestre",
    "Segundo semestre",
    "Tercer semestre",
    "Cuarto semestre",
    "Quinto semestre",
    "Sexto semestre",
    "Séptimo semestre",
    "Octavo semestre",
    "Noveno semestre",
    "Décimo semestre",
    "Undécimo semestre",
    "Duodécimo semestre",
];
const labelFromNumero = (n, etiqueta) => etiqueta || SEM_LABELS[n] || (n ? `Semestre ${n}` : "—");

// Lee mensaje de error del backend
const readErrorMsg = async (res) => {
    try { const j = await res.json(); return j?.message || res.statusText; }
    catch { try { return (await res.text())?.slice(0, 160) || res.statusText; } catch { return res.statusText; } }
};

const GeneralInformacion = () => {
    const [materias, setMaterias] = useState([]);
    const [carreras, setCarreras] = useState([]);
    const [search, setSearch] = useState("");

    const API_MATERIA = "http://localhost:3000/materia";
    const API_CARRERA = "http://localhost:3000/carrera";

    useEffect(() => {
        (async () => {
            try {
                const [rm, rc] = await Promise.all([fetch(API_MATERIA), fetch(API_CARRERA)]);
                if (!rm.ok) throw new Error(await readErrorMsg(rm));
                if (!rc.ok) throw new Error(await readErrorMsg(rc));
                const jm = await rm.json();
                const jc = await rc.json();
                setMaterias(Array.isArray(jm.data) ? jm.data : []);
                setCarreras(Array.isArray(jc.data) ? jc.data : []);
                toast.success("Información cargada");
            } catch (e) {
                console.error(e);
                toast.error("No se pudo cargar la información");
            }
        })();
    }, []);

    // Índice de carreras por id para acceder a su facultad
    const carrerasById = useMemo(() => {
        const map = new Map();
        for (const c of carreras) map.set(c.id, c); // c.facultad?.nombre disponible según tu backend
        return map;
    }, [carreras]);

    // Composición final para la tabla: Facultad · Carrera · Semestre · Materia · Código
    const rows = useMemo(() => {
        return materias.map((m) => {
            const carrera = m.carrera ?? carrerasById.get(m.idCarrera) ?? {};
            const facultadNombre = carrera?.facultad?.nombre ?? "—";
            const carreraNombre = carrera?.nombre ?? "—";
            const semestreTexto = labelFromNumero(m.semestre?.numero, m.semestre?.etiqueta);
            return {
                id: m.id,
                facultad: facultadNombre,
                carrera: carreraNombre,
                semestre: semestreTexto,
                materia: m.nombre,
                codigo: m.codigo || "—",
            };
        });
    }, [materias, carrerasById]);

    // Filtro por cualquier columna
    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return rows;
        return rows.filter((r) =>
            (r.facultad || "").toLowerCase().includes(q) ||
            (r.carrera || "").toLowerCase().includes(q) ||
            (r.semestre || "").toLowerCase().includes(q) ||
            (r.materia || "").toLowerCase().includes(q) ||
            (r.codigo || "").toLowerCase().includes(q)
        );
    }, [rows, search]);

    return (
        <PageWrapper>
            <Container>
                <PageHeader>
                    <Title>Información General</Title>
                </PageHeader>

                <SearchContainer>
                    <Search color={ColorsLogin.secondary100} />
                    <SearchInput
                        placeholder="Buscar por facultad, carrera, semestre, materia o código…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </SearchContainer>

                <Table>
                    <thead>
                        <tr>
                            <TableHeader>Facultad</TableHeader>
                            <TableHeader>Carrera</TableHeader>
                            <TableHeader>Semestre</TableHeader>
                            <TableHeader>Materia</TableHeader>
                            <TableHeader>Código</TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((r) => (
                            <TableRow key={r.id}>
                                <TableCell>{r.facultad}</TableCell>
                                <TableCell>{r.carrera}</TableCell>
                                <TableCell>{r.semestre}</TableCell>
                                <TableCell>{r.materia}</TableCell>
                                <TableCell>{r.codigo}</TableCell>
                            </TableRow>
                        ))}
                        {filtered.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <em>No hay resultados</em>
                                </TableCell>
                            </TableRow>
                        )}
                    </tbody>
                </Table>
            </Container>
        </PageWrapper>
    );
};

export default GeneralInformacion;
