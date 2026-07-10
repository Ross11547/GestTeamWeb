import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Save, X, Search, Book, Briefcase, Hash, BadgeCheck, BookOpen } from "lucide-react";
import { toast } from "sonner";
import {
    PageWrapper,
    Container,
    PageHeader,
    Title,
    SearchContainer,
    SearchInput,
    TableWrapper,
    TableScrollContainer,
    Table,
    TableHeader,
    TableRow,
    TableCell,
    ActionButton,
    FloatingButton,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalTitle,
    Form,
    FormGroup,
    Label,
    Input,
    ButtonGroup,
    Button,
    EmptyState,
    LoadingRow,
    LoadingCell,
} from "../../../style/generalStyle.jsx";
import { ColorsLogin, Colors } from "../../../style/colors";

const SEM_LABELS = [
    null,
    "Primer semestre", "Segundo semestre", "Tercer semestre", "Cuarto semestre",
    "Quinto semestre", "Sexto semestre", "Séptimo semestre", "Octavo semestre",
    "Noveno semestre", "Décimo semestre", "Undécimo semestre", "Duodécimo semestre",
];
const labelFromNumero = (n, etiqueta) => etiqueta || SEM_LABELS[n] || (n ? `Semestre ${n}` : "");

// Misma lógica que el backend para vista previa
const STOPWORDS = new Set([
    "a", "al", "con", "de", "del", "el", "la", "las", "los", "en", "para", "por", "sin",
    "y", "e", "o", "u", "un", "una", "uno", "unos", "unas", "the", "and", "of",
]);
const isRoman = (tok) => /^[IVXLCDM]+$/i.test(tok);
const isNumber = (tok) => /^\d+$/.test(tok);
const makeCode = (nombre) => {
    if (!nombre) return "";
    const raw = String(nombre)
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^A-Za-z0-9\s]+/g, " ")
        .trim();

    const sig = raw
        .split(/\s+/)
        .filter(Boolean)
        .filter(t => !STOPWORDS.has(t.toLowerCase()))
        .filter(t => !isRoman(t) && !isNumber(t))
        .map(t => t.toUpperCase());

    if (sig.length === 0) return raw.replace(/\s+/g, "").toUpperCase().slice(0, 3) || "MAT";
    if (sig.length === 1) return sig[0].slice(0, 3);
    if (sig.length === 2) return sig[0][0] + sig[1].slice(0, 2);
    return sig[0][0] + sig[1][0] + sig[2][0];
};

const BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";
const API = `${BASE}/api/materia`;
const API_CARRERA = `${BASE}/api/carrera`;
const API_SEM_BY_CARRERA = `${BASE}/api/semestre/by-carrera`;
const FETCH_OPTS = { credentials: "include", headers: { "Content-Type": "application/json" } };

const MateriasCRUD = () => {
    const [materias, setMaterias] = useState([]);
    const [carreras, setCarreras] = useState([]);
    const [semestres, setSemestres] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [current, setCurrent] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    // estado para vista previa de código
    const [formNombre, setFormNombre] = useState("");
    const [formCodigo, setFormCodigo] = useState("");

    const readErrorMsg = async (res) => {
        try { const j = await res.json(); return j?.message || res.statusText; }
        catch { try { return (await res.text())?.slice(0, 160) || res.statusText; } catch { return res.statusText; } }
    };

    // Carga inicial
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [rm, rc] = await Promise.all([fetch(API, FETCH_OPTS), fetch(API_CARRERA, FETCH_OPTS)]);
            if (!rm.ok) throw new Error(await readErrorMsg(rm));
            if (!rc.ok) throw new Error(await readErrorMsg(rc));
            const jm = await rm.json();
            const jc = await rc.json();
            setMaterias(Array.isArray(jm.data) ? jm.data : []);
            setCarreras(Array.isArray(jc.data) ? jc.data : []);
        } catch (e) {
            console.error(e);
            toast.error("No se pudieron cargar materias/carreras");
        } finally {
            setLoading(false);
        }
    };

    const loadSemestres = async (carreraId) => {
        if (!carreraId) return setSemestres([]);
        try {
            const r = await fetch(`${API_SEM_BY_CARRERA}?carreraId=${carreraId}`, FETCH_OPTS);
            if (!r.ok) throw new Error(await readErrorMsg(r));
            const j = await r.json();
            const items = Array.isArray(j.data) ? j.data : Array.isArray(j.items) ? j.items : [];
            setSemestres(items);
        } catch (e) {
            console.error(e);
            toast.error("No se pudieron cargar semestres de la carrera");
            setSemestres([]);
        }
    };

    // CRUD
    const handleCreate = async (payload) => {
        try {
            const r = await fetch(API, { ...FETCH_OPTS, method: "POST", body: JSON.stringify(payload) });
            if (!r.ok) throw new Error(await readErrorMsg(r));
            toast.success("Materia creada correctamente");
            await loadData(); // Recargar para asegurar datos consistentes
        } catch (e) {
            console.error(e);
            toast.error(e.message || "No se pudo crear la materia");
        } finally {
            setIsModalOpen(false);
        }
    };

    const handleUpdate = async (payload) => {
        try {
            const r = await fetch(`${API}/${payload.id}`, {
                ...FETCH_OPTS,
                method: "PUT",
                body: JSON.stringify(payload),
            });
            if (!r.ok) throw new Error(await readErrorMsg(r));
            toast.success("Materia actualizada");
            await loadData(); // Recargar para asegurar datos consistentes
        } catch (e) {
            console.error(e);
            toast.error(e.message || "No se pudo actualizar la materia");
        } finally {
            setIsModalOpen(false);
            setCurrent(null);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("¿Estás seguro de eliminar esta materia?")) return;

        try {
            const r = await fetch(`${API}/${id}`, { ...FETCH_OPTS, method: "DELETE" });
            if (!r.ok) throw new Error(await readErrorMsg(r));
            toast.success("Materia eliminada");
            await loadData(); // Recargar lista
        } catch (e) {
            console.error(e);
            toast.error(e.message || "No se pudo eliminar la materia");
        }
    };

    const filtered = materias.filter((m) => {
        const q = searchTerm.toLowerCase();
        const semText = m.semestre
            ? labelFromNumero(m.semestre.numero, m.semestre.etiqueta).toLowerCase()
            : "";
        return (
            m.nombre?.toLowerCase().includes(q) ||
            m.codigo?.toLowerCase().includes(q) ||
            m.carrera?.nombre?.toLowerCase().includes(q) ||
            semText.includes(q)
        );
    });

    const openCreate = async () => {
        setCurrent(null);
        setFormNombre("");
        setFormCodigo("");
        const firstCarreraId = carreras[0]?.id;
        setIsModalOpen(true);
        await loadSemestres(firstCarreraId);
    };

    const openEdit = async (row) => {
        setCurrent({
            ...row,
            idCarrera: row.carrera?.id ?? row.idCarrera,
            semestreId: row.semestre?.id ?? row.semestreId,
        });
        setFormNombre(row.nombre || "");
        setFormCodigo(row.codigo || makeCode(row.nombre));
        setIsModalOpen(true);
        await loadSemestres(row.carrera?.id ?? row.idCarrera);
    };

    const renderModal = () => {
        if (!isModalOpen) return null;

        return (
            <ModalOverlay>
                <ModalContent size="medium"> {/* Modal mediano para CRUD intermedio */}
                    <ModalHeader>
                        <ModalTitle>{current ? "Editar Materia" : "Agregar Materia"}</ModalTitle>
                        <ActionButton color={ColorsLogin.secondary100} onClick={() => { setIsModalOpen(false); setCurrent(null); }}>
                            <X />
                        </ActionButton>
                    </ModalHeader>

                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const fd = new FormData(e.target);
                            const payload = {
                                id: current?.id,
                                nombre: fd.get("nombre"),
                                idCarrera: Number(fd.get("idCarrera")),
                                semestreId: Number(fd.get("semestreId")),
                                // "codigo" lo genera el backend
                            };

                            if (!payload.nombre || String(payload.nombre).trim() === "") {
                                toast.error("El nombre es obligatorio");
                                return;
                            }
                            if (!payload.idCarrera || !Number.isInteger(payload.idCarrera)) {
                                toast.error("Selecciona una carrera válida");
                                return;
                            }
                            if (!payload.semestreId || !Number.isInteger(payload.semestreId)) {
                                toast.error("Selecciona un semestre válido");
                                return;
                            }

                            current ? handleUpdate(payload) : handleCreate(payload);
                        }}
                    >
                        <FormGroup>
                            <Label><Book size={16} /> Nombre de la Materia</Label>
                            <Input
                                type="text"
                                name="nombre"
                                defaultValue={current ? current.nombre : ""}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setFormNombre(val);
                                    setFormCodigo(makeCode(val));
                                }}
                                required
                                placeholder="Ej: Programación Orientada a Objetos"
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label><BadgeCheck size={16} /> Código de Materia</Label>
                            <Input
                                type="text"
                                value={formCodigo || (current ? (current.codigo || makeCode(current.nombre)) : "")}
                                readOnly
                                title="Se genera automáticamente a partir del nombre (ignora conectores y números)"
                                style={{ backgroundColor: "#f8f9fa", fontFamily: "monospace" }}
                            />
                            <small style={{ marginTop: "6px", color: Colors.greyLight }}>
                                Generado automáticamente desde el nombre de la materia
                            </small>
                        </FormGroup>

                        <FormGroup>
                            <Label><Briefcase size={16} /> Carrera Asociada</Label>
                            <Input
                                as="select"
                                name="idCarrera"
                                defaultValue={current ? (current.carrera?.id ?? current.idCarrera) : (carreras[0]?.id ?? "")}
                                required
                                onChange={(e) => loadSemestres(Number(e.target.value))}
                            >
                                <option value="">Selecciona una carrera</option>
                                {carreras.map((c) => (
                                    <option key={c.id} value={c.id}>{c.nombre}</option>
                                ))}
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label><Hash size={16} /> Semestre Curricular</Label>
                            <Input
                                as="select"
                                name="semestreId"
                                defaultValue={current?.semestre?.id ?? current?.semestreId ?? ""}
                                required
                            >
                                <option value="" disabled>Selecciona un semestre</option>
                                {semestres.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {SEM_LABELS[s.numero] || `Semestre ${s.numero}`}
                                    </option>
                                ))}
                            </Input>
                            <small style={{ marginTop: "6px", color: Colors.greyLight }}>
                                Los semestres disponibles dependen de la carrera seleccionada
                            </small>
                        </FormGroup>

                        <ButtonGroup>
                            <Button
                                type="button"
                                className="secondary"
                                onClick={() => { setIsModalOpen(false); setCurrent(null); }}
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" className="primary">
                                <Save size={16} /> {current ? "Actualizar" : "Guardar"}
                            </Button>
                        </ButtonGroup>
                    </Form>
                </ModalContent>
            </ModalOverlay>
        );
    };

    const columnCount = 5; // 5 columnas: Código, Materia, Carrera, Semestre, Acciones

    return (
        <PageWrapper>
            <Container> {/* Container normal para CRUDs medianos */}
                <PageHeader>
                    <Title>Gestión de Materias</Title>
                </PageHeader>

                <SearchContainer>
                    <Search color={ColorsLogin.secondary100} />
                    <SearchInput
                        placeholder="Buscar por materia, código, carrera o semestre…"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </SearchContainer>

                <TableWrapper>
                    <TableScrollContainer>
                        <Table>
                            <thead>
                                <tr>
                                    <TableHeader>Código</TableHeader>
                                    <TableHeader>Materia</TableHeader>
                                    <TableHeader>Carrera</TableHeader>
                                    <TableHeader>Semestre</TableHeader>
                                    <TableHeader>Acciones</TableHeader>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    // Estado de carga
                                    Array.from({ length: 5 }, (_, i) => (
                                        <LoadingRow key={`loading-${i}`}>
                                            <LoadingCell><div className="skeleton" /></LoadingCell>
                                            <LoadingCell><div className="skeleton" /></LoadingCell>
                                            <LoadingCell><div className="skeleton" /></LoadingCell>
                                            <LoadingCell><div className="skeleton" /></LoadingCell>
                                            <LoadingCell><div className="skeleton" /></LoadingCell>
                                        </LoadingRow>
                                    ))
                                ) : filtered.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={columnCount}>
                                            <EmptyState>
                                                <h3>No se encontraron materias</h3>
                                                <p>
                                                    {searchTerm
                                                        ? "Intenta con otros términos de búsqueda"
                                                        : "Aún no hay materias registradas"
                                                    }
                                                </p>
                                            </EmptyState>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filtered.map((m) => (
                                        <TableRow key={m.id}>
                                            <TableCell>
                                                <span style={{
                                                    fontFamily: 'monospace',
                                                    backgroundColor: '#f8f9fa',
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    fontSize: '0.9rem',
                                                    fontWeight: '600',
                                                    color: ColorsLogin.secondary200
                                                }}>
                                                    {m.codigo}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <span style={{ fontWeight: '500' }}>{m.nombre}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{m.carrera?.nombre || <em style={{ color: Colors.greyLight }}>Sin carrera</em>}</TableCell>
                                            <TableCell>
                                                <span style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    color: Colors.greyDark,
                                                    fontWeight: '500'
                                                }}>
                                                    <Hash size={14} />
                                                    {labelFromNumero(m.semestre?.numero, m.semestre?.etiqueta) || "—"}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <ActionButton color={Colors.greyDark} onClick={() => openEdit(m)}>
                                                    <Edit size={18} />
                                                </ActionButton>
                                                <ActionButton color={ColorsLogin.secondary100} onClick={() => handleDelete(m.id)}>
                                                    <Trash2 size={18} />
                                                </ActionButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </TableScrollContainer>
                </TableWrapper>

                <FloatingButton onClick={openCreate}>
                    <Plus size={28} />
                </FloatingButton>

                {renderModal()}
            </Container>
        </PageWrapper>
    );
};

export default MateriasCRUD;