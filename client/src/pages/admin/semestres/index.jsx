import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Save, X, Search, Briefcase, Hash, Calendar } from "lucide-react";
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

// Etiquetas literales de semestre
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
const labelFromNumero = (n) => SEM_LABELS[n] || `Semestre ${n}`;

const SemestreCRUD = () => {
    const [semestres, setSemestres] = useState([]);
    const [carreras, setCarreras] = useState([]); // para select
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [current, setCurrent] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    const API = "http://localhost:3000/api/semestre";
    const API_CARRERA = "http://localhost:3000/api/carrera";

    const readErrorMsg = async (res) => {
        try { const j = await res.json(); return j?.message || res.statusText; }
        catch { try { return (await res.text())?.slice(0, 160) || res.statusText; } catch { return res.statusText; } }
    };

    // Cargar semestres + carreras
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [rs, rc] = await Promise.all([fetch(API), fetch(API_CARRERA)]);
            if (!rs.ok) throw new Error(await readErrorMsg(rs));
            if (!rc.ok) throw new Error(await readErrorMsg(rc));
            const js = await rs.json();
            const jc = await rc.json();
            setSemestres(Array.isArray(js.data) ? js.data : []);
            setCarreras(Array.isArray(jc.data) ? jc.data : []);
        } catch (e) {
            console.error(e);
            toast.error("No se pudieron cargar semestres/carreras");
        } finally {
            setLoading(false);
        }
    };

    // Crear
    const handleCreate = async (payload) => {
        try {
            const r = await fetch(API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!r.ok) throw new Error(await readErrorMsg(r));
            toast.success("Semestre creado correctamente");
            await loadData(); // Recargar para asegurar datos consistentes
        } catch (e) {
            console.error(e);
            toast.error(e.message || "No se pudo crear el semestre");
        } finally {
            setIsModalOpen(false);
        }
    };

    // Actualizar
    const handleUpdate = async (payload) => {
        try {
            const r = await fetch(`${API}/${payload.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!r.ok) throw new Error(await readErrorMsg(r));
            toast.success("Semestre actualizado");
            await loadData(); // Recargar para asegurar datos consistentes
        } catch (e) {
            console.error(e);
            toast.error(e.message || "No se pudo actualizar el semestre");
        } finally {
            setIsModalOpen(false);
            setCurrent(null);
        }
    };

    // Eliminar
    const handleDelete = async (id) => {
        if (!confirm("¿Estás seguro de eliminar este semestre?")) return;

        try {
            const r = await fetch(`${API}/${id}`, { method: "DELETE" });
            if (!r.ok) throw new Error(await readErrorMsg(r));
            toast.success("Semestre eliminado");
            await loadData(); // Recargar lista
        } catch (e) {
            console.error(e);
            toast.error(e.message || "No se pudo eliminar el semestre");
        }
    };

    // Filtro por carrera y por etiqueta literal del semestre
    const filtered = semestres.filter((s) => {
        const q = searchTerm.toLowerCase();
        return (
            labelFromNumero(s.numero).toLowerCase().includes(q) ||
            s.carrera?.nombre?.toLowerCase().includes(q)
        );
    });

    // Modal
    const renderModal = () => {
        if (!isModalOpen) return null;
        const initial = current || {
            numero: 1,
            carreraId: carreras[0]?.id ?? "",
        };

        return (
            <ModalOverlay>
                <ModalContent size="small"> {/* Modal pequeño para CRUD simple */}
                    <ModalHeader>
                        <ModalTitle>{current ? "Editar Semestre" : "Agregar Semestre"}</ModalTitle>
                        <ActionButton color={ColorsLogin.secondary100} onClick={() => { setIsModalOpen(false); setCurrent(null); }}>
                            <X />
                        </ActionButton>
                    </ModalHeader>

                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        const fd = new FormData(e.target);
                        const payload = {
                            id: current?.id,
                            numero: Number(fd.get("numero")),
                            carreraId: Number(fd.get("carreraId")),
                        };

                        // Validaciones rápidas
                        if (!payload.carreraId || !Number.isInteger(payload.carreraId)) {
                            toast.error("Selecciona una carrera válida");
                            return;
                        }
                        if (!payload.numero || !Number.isInteger(payload.numero) || payload.numero < 1) {
                            toast.error("El número de semestre debe ser un entero ≥ 1");
                            return;
                        }

                        current ? handleUpdate(payload) : handleCreate(payload);
                    }}>
                        <FormGroup>
                            <Label><Hash size={16} /> Nivel de Semestre</Label>
                            <Input as="select" name="numero" defaultValue={initial.numero} required>
                                <option value="">Selecciona el semestre</option>
                                {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                                    <option key={n} value={n}>{SEM_LABELS[n]}</option>
                                ))}
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label><Briefcase size={16} /> Carrera Asociada</Label>
                            <Input as="select" name="carreraId" defaultValue={initial.carreraId} required>
                                <option value="">Selecciona una carrera</option>
                                {carreras.map((c) => (
                                    <option key={c.id} value={c.id}>{c.nombre}</option>
                                ))}
                            </Input>
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
                                <Save size={16} />
                                {current ? "Actualizar" : "Guardar"}
                            </Button>
                        </ButtonGroup>
                    </Form>
                </ModalContent>
            </ModalOverlay>
        );
    };

    const columnCount = 3; // Solo 3 columnas: Semestre, Carrera, Acciones

    // Render
    return (
        <PageWrapper>
            <Container> {/* Container normal para CRUDs simples */}
                <PageHeader>
                    <Title>Gestión de Semestres</Title>
                </PageHeader>

                <SearchContainer>
                    <Search color={ColorsLogin.secondary100} />
                    <SearchInput
                        placeholder="Buscar por semestre o carrera..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </SearchContainer>

                <TableWrapper>
                    <TableScrollContainer>
                        <Table>
                            <thead>
                                <tr>
                                    <TableHeader className="simple">Semestre</TableHeader>
                                    <TableHeader className="simple">Carrera</TableHeader>
                                    <TableHeader className="simple">Acciones</TableHeader>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    // Estado de carga
                                    Array.from({ length: 3 }, (_, i) => (
                                        <LoadingRow key={`loading-${i}`}>
                                            <LoadingCell><div className="skeleton" /></LoadingCell>
                                            <LoadingCell><div className="skeleton" /></LoadingCell>
                                            <LoadingCell><div className="skeleton" /></LoadingCell>
                                        </LoadingRow>
                                    ))
                                ) : filtered.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={columnCount}>
                                            <EmptyState>
                                                <Calendar size={48} />
                                                <h3>No se encontraron semestres</h3>
                                                <p>
                                                    {searchTerm
                                                        ? "Intenta con otros términos de búsqueda"
                                                        : "Aún no hay semestres registrados"
                                                    }
                                                </p>
                                            </EmptyState>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filtered.map((s) => (
                                        <TableRow key={s.id}>
                                            <TableCell>
                                                <span style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    fontWeight: '600',
                                                    color: ColorsLogin.secondary200
                                                }}>
                                                    <Hash size={16} />
                                                    {s.etiqueta || labelFromNumero(s.numero)}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                {s.carrera?.nombre || <em style={{ color: Colors.greyLight }}>Sin carrera</em>}
                                            </TableCell>
                                            <TableCell>
                                                <ActionButton
                                                    color={Colors.greyDark}
                                                    onClick={() => {
                                                        setCurrent({
                                                            ...s,
                                                            carreraId: s.carrera?.id ?? s.carreraId,
                                                        });
                                                        setIsModalOpen(true);
                                                    }}
                                                >
                                                    <Edit size={18} />
                                                </ActionButton>
                                                <ActionButton
                                                    color={ColorsLogin.secondary100}
                                                    onClick={() => handleDelete(s.id)}
                                                >
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

                <FloatingButton onClick={() => { setCurrent(null); setIsModalOpen(true); }}>
                    <Plus size={28} />
                </FloatingButton>

                {renderModal()}
            </Container>
        </PageWrapper>
    );
};

export default SemestreCRUD;