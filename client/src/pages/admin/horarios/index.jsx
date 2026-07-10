import React, { useEffect, useMemo, useState } from "react";
import { Plus, Edit, Trash2, Save, X, Search, CalendarClock, MapPin, Book, Clock, Calendar } from "lucide-react";
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

const DAYS = [
    "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO", "DOMINGO",
];

const DAYS_DISPLAY = {
    "LUNES": "Lunes",
    "MARTES": "Martes",
    "MIERCOLES": "Miércoles",
    "JUEVES": "Jueves",
    "VIERNES": "Viernes",
    "SABADO": "Sábado",
    "DOMINGO": "Domingo"
};

const toHHMM = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    const h = String(d.getUTCHours()).padStart(2, "0");
    const m = String(d.getUTCMinutes()).padStart(2, "0");
    return `${h}:${m}`;
};

const HorariosCRUD = () => {
    const [horarios, setHorarios] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [current, setCurrent] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    const API = "http://localhost:3000/api/horario";
    const API_MATERIA = "http://localhost:3000/api/materia";

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
            const [rh, rm] = await Promise.all([fetch(API), fetch(API_MATERIA)]);
            if (!rh.ok) throw new Error(await readErrorMsg(rh));
            if (!rm.ok) throw new Error(await readErrorMsg(rm));
            const jh = await rh.json();
            const jm = await rm.json();
            setHorarios(Array.isArray(jh.data) ? jh.data : []);
            setMaterias(Array.isArray(jm.data) ? jm.data : []);
        } catch (e) {
            console.error(e);
            toast.error("No se pudieron cargar horarios/materias");
        } finally {
            setLoading(false);
        }
    };

    // Detect scroll need
    useEffect(() => {
        const checkScrollNeed = () => {
            const tableWrapper = document.querySelector('[data-table-wrapper]');
            if (tableWrapper) {
                const needsScroll = tableWrapper.scrollWidth > tableWrapper.clientWidth;
            }
        };

        checkScrollNeed();
        window.addEventListener('resize', checkScrollNeed);
        return () => window.removeEventListener('resize', checkScrollNeed);
    }, [horarios]);

    // CRUD
    const handleCreate = async (payload) => {
        try {
            const r = await fetch(API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!r.ok) throw new Error(await readErrorMsg(r));
            toast.success("Horario creado correctamente");
            await loadData(); // Recargar para asegurar datos consistentes
        } catch (e) {
            console.error(e);
            toast.error(e.message || "No se pudo crear el horario");
        } finally {
            setIsModalOpen(false);
        }
    };

    const handleUpdate = async (payload) => {
        try {
            const r = await fetch(`${API}/${payload.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!r.ok) throw new Error(await readErrorMsg(r));
            toast.success("Horario actualizado");
            await loadData(); // Recargar para asegurar datos consistentes
        } catch (e) {
            console.error(e);
            toast.error(e.message || "No se pudo actualizar el horario");
        } finally {
            setIsModalOpen(false);
            setCurrent(null);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("¿Estás seguro de eliminar este horario?")) return;

        try {
            const r = await fetch(`${API}/${id}`, { method: "DELETE" });
            if (!r.ok) throw new Error(await readErrorMsg(r));
            toast.success("Horario eliminado");
            await loadData(); // Recargar lista
        } catch (e) {
            console.error(e);
            toast.error(e.message || "No se pudo eliminar el horario");
        }
    };

    const filtered = useMemo(() => {
        const q = searchTerm.toLowerCase();
        return horarios.filter((h) => {
            const mat = h.materia || {};
            const carrera = mat.carrera || {};
            const facultad = carrera.facultad || {};
            return (
                (mat.nombre || "").toLowerCase().includes(q) ||
                (mat.codigo || "").toLowerCase().includes(q) ||
                (carrera.nombre || "").toLowerCase().includes(q) ||
                (facultad.nombre || "").toLowerCase().includes(q) ||
                (h.dia || "").toLowerCase().includes(q) ||
                (h.aula || "").toLowerCase().includes(q)
            );
        });
    }, [horarios, searchTerm]);

    const openCreate = () => {
        setCurrent(null);
        setIsModalOpen(true);
    };

    const openEdit = (row) => {
        setCurrent({
            ...row,
            materiaId: row.materia?.id ?? row.materiaId,
            horaInicioStr: toHHMM(row.horaInicio),
            horaFinStr: toHHMM(row.horaFin),
        });
        setIsModalOpen(true);
    };

    const renderModal = () => {
        if (!isModalOpen) return null;

        const initial = current || {
            materiaId: materias[0]?.id ?? "",
            dia: "LUNES",
            horaInicioStr: "08:00",
            horaFinStr: "10:00",
            aula: "",
        };

        return (
            <ModalOverlay>
                <ModalContent size="large"> {/* Modal grande para CRUD complejo */}
                    <ModalHeader>
                        <ModalTitle>{current ? "Editar Horario" : "Agregar Horario"}</ModalTitle>
                        <ActionButton color={ColorsLogin.secondary100} onClick={() => { setIsModalOpen(false); setCurrent(null); }}>
                            <X />
                        </ActionButton>
                    </ModalHeader>

                    <Form columns={2} onSubmit={(e) => {
                        e.preventDefault();
                        const fd = new FormData(e.target);
                        const payload = {
                            id: current?.id,
                            materiaId: Number(fd.get("materiaId")),
                            dia: String(fd.get("dia")),
                            horaInicio: String(fd.get("horaInicio")),
                            horaFin: String(fd.get("horaFin")),
                            aula: fd.get("aula"),
                        };

                        if (!payload.materiaId || !Number.isInteger(payload.materiaId)) {
                            toast.error("Selecciona una materia válida");
                            return;
                        }
                        if (!DAYS.includes(payload.dia)) {
                            toast.error("Selecciona un día válido");
                            return;
                        }
                        if (!/^\d{2}:\d{2}$/.test(payload.horaInicio) || !/^\d{2}:\d{2}$/.test(payload.horaFin)) {
                            toast.error("Hora inválida (usa HH:MM)");
                            return;
                        }
                        if (payload.horaFin <= payload.horaInicio) {
                            toast.error("La hora fin debe ser mayor que la de inicio");
                            return;
                        }

                        current ? handleUpdate(payload) : handleCreate(payload);
                    }}>
                        <FormGroup>
                            <Label><Book size={16} /> Materia Asignada</Label>
                            <Input as="select" name="materiaId" defaultValue={initial.materiaId} required>
                                <option value="">Selecciona una materia</option>
                                {materias.map((m) => (
                                    <option key={m.id} value={m.id}>
                                        {m.codigo ? `${m.codigo} — ${m.nombre}` : m.nombre}
                                    </option>
                                ))}
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label><CalendarClock size={16} /> Día de la Semana</Label>
                            <Input as="select" name="dia" defaultValue={initial.dia} required>
                                <option value="">Selecciona un día</option>
                                {DAYS.map((d) => (
                                    <option key={d} value={d}>{DAYS_DISPLAY[d]}</option>
                                ))}
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label><Clock size={16} /> Hora de Inicio</Label>
                            <Input
                                type="time"
                                name="horaInicio"
                                defaultValue={initial.horaInicioStr}
                                required
                                min="06:00"
                                max="22:00"
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label><Clock size={16} /> Hora de Fin</Label>
                            <Input
                                type="time"
                                name="horaFin"
                                defaultValue={initial.horaFinStr}
                                required
                                min="06:00"
                                max="22:00"
                            />
                        </FormGroup>

                        <FormGroup className="full-width">
                            <Label><MapPin size={16} /> Aula / Salón</Label>
                            <Input
                                type="text"
                                name="aula"
                                placeholder="Ej: A-204, Laboratorio de Sistemas, Auditorio Principal"
                                defaultValue={initial.aula}
                                maxLength="50"
                            />
                            <small style={{ marginTop: "6px", color: Colors.greyLight }}>
                                Especifica la ubicación donde se desarrollará la clase
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
                                <Save size={16} />
                                {current ? "Actualizar" : "Guardar"}
                            </Button>
                        </ButtonGroup>
                    </Form>
                </ModalContent>
            </ModalOverlay>
        );
    };

    const columnCount = 8; // 8 columnas: Materia, Código, Carrera, Facultad, Día, Hora, Aula, Acciones

    return (
        <PageWrapper>
            <Container wide> {/* Container wide para CRUDs complejos */}
                <PageHeader>
                    <Title>Gestión de Horarios</Title>
                </PageHeader>

                <SearchContainer>
                    <Search color={ColorsLogin.secondary100} />
                    <SearchInput
                        placeholder="Buscar por materia, código, carrera, facultad, día o aula…"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </SearchContainer>

                <TableWrapper>
                    <TableScrollContainer data-table-wrapper>
                        <Table>
                            <thead>
                                <tr>
                                    <TableHeader>Materia</TableHeader>
                                    <TableHeader>Código</TableHeader>
                                    <TableHeader>Carrera</TableHeader>
                                    <TableHeader>Facultad</TableHeader>
                                    <TableHeader>Día</TableHeader>
                                    <TableHeader>Horario</TableHeader>
                                    <TableHeader>Aula</TableHeader>
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
                                                <h3>No se encontraron horarios</h3>
                                                <p>
                                                    {searchTerm
                                                        ? "Intenta con otros términos de búsqueda"
                                                        : "Aún no hay horarios programados"
                                                    }
                                                </p>
                                            </EmptyState>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filtered.map((h) => {
                                        const mat = h.materia || {};
                                        const car = mat.carrera || {};
                                        const fac = car.facultad || {};
                                        return (
                                            <TableRow key={h.id}>
                                                <TableCell>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <Book size={16} color={ColorsLogin.secondary100} />
                                                        <span style={{ fontWeight: '500' }}>{mat.nombre}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <span style={{
                                                        fontFamily: 'monospace',
                                                        backgroundColor: '#f8f9fa',
                                                        padding: '2px 6px',
                                                        borderRadius: '3px',
                                                        fontSize: '0.85rem',
                                                        fontWeight: '600',
                                                        color: ColorsLogin.secondary200
                                                    }}>
                                                        {mat.codigo || "—"}
                                                    </span>
                                                </TableCell>
                                                <TableCell>{car.nombre || <em style={{ color: Colors.greyLight }}>Sin carrera</em>}</TableCell>
                                                <TableCell>{fac.nombre || <em style={{ color: Colors.greyLight }}>Sin facultad</em>}</TableCell>
                                                <TableCell>
                                                    <span style={{
                                                        display: 'inline-block',
                                                        backgroundColor: ColorsLogin.secondary100,
                                                        color: Colors.white,
                                                        padding: '3px 8px',
                                                        borderRadius: '12px',
                                                        fontSize: '0.8rem',
                                                        fontWeight: '600'
                                                    }}>
                                                        {DAYS_DISPLAY[h.dia] || h.dia}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '4px',
                                                        fontFamily: 'monospace',
                                                        fontWeight: '500'
                                                    }}>
                                                        <Clock size={14} color={Colors.greyDark} />
                                                        {toHHMM(h.horaInicio)} — {toHHMM(h.horaFin)}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {h.aula ? (
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                            <MapPin size={14} color={ColorsLogin.secondary100} />
                                                            <span>{h.aula}</span>
                                                        </div>
                                                    ) : (
                                                        <em style={{ color: Colors.greyLight }}>Sin asignar</em>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <ActionButton color={Colors.greyDark} onClick={() => openEdit(h)}>
                                                        <Edit size={18} />
                                                    </ActionButton>
                                                    <ActionButton color={ColorsLogin.secondary100} onClick={() => handleDelete(h.id)}>
                                                        <Trash2 size={18} />
                                                    </ActionButton>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
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

export default HorariosCRUD;