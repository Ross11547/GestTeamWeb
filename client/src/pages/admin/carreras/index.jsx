import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Save, X, Search, User, Briefcase, Building2 } from "lucide-react";
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

const CarrerasCRUD = () => {
    const [carreras, setCarreras] = useState([]);
    const [facultades, setFacultades] = useState([]); // para el select
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [current, setCurrent] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    const API = "http://localhost:3000/carrera";
    const API_FAC = "http://localhost:3000/facultad";

    // Cargar carreras + facultades
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [rc, rf] = await Promise.all([fetch(API), fetch(API_FAC)]);
            if (!rc.ok) throw new Error(await rc.text());
            if (!rf.ok) throw new Error(await rf.text());
            const jc = await rc.json();
            const jf = await rf.json();
            setCarreras(Array.isArray(jc.data) ? jc.data : []);
            setFacultades(Array.isArray(jf.data) ? jf.data : []);
        } catch (e) {
            console.error(e);
            toast.error("No se pudieron cargar carreras/facultades");
        } finally {
            setLoading(false);
        }
    };

    // CRUD
    const handleCreate = async (payload) => {
        try {
            const r = await fetch(API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!r.ok) throw new Error(await r.text());
            const j = await r.json();
            toast.success("Carrera creada correctamente");
            await loadData(); // Recargar para asegurar datos consistentes
        } catch (e) {
            console.error(e);
            toast.error("No se pudo crear la carrera");
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
            if (!r.ok) throw new Error(await r.text());
            toast.success("Carrera actualizada");
            await loadData(); // Recargar para asegurar datos consistentes
        } catch (e) {
            console.error(e);
            toast.error("No se pudo actualizar la carrera");
        } finally {
            setIsModalOpen(false);
            setCurrent(null);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("¿Estás seguro de eliminar esta carrera?")) return;

        try {
            const r = await fetch(`${API}/${id}`, { method: "DELETE" });
            if (!r.ok) throw new Error(await r.text());
            toast.success("Carrera eliminada");
            await loadData(); // Recargar lista
        } catch (e) {
            console.error(e);
            toast.error("No se pudo eliminar la carrera");
        }
    };

    // Filtro por nombre de carrera o de facultad
    const filtered = carreras.filter((c) => {
        const q = searchTerm.toLowerCase();
        return (
            c.nombre?.toLowerCase().includes(q) ||
            c.facultad?.nombre?.toLowerCase().includes(q)
        );
    });

    // Modal
    const renderModal = () => {
        if (!isModalOpen) return null;
        const initial = current || { nombre: "", idFacultad: facultades[0]?.id ?? "" };

        return (
            <ModalOverlay>
                <ModalContent size="small"> {/* Modal pequeño para CRUD simple */}
                    <ModalHeader>
                        <ModalTitle>{current ? "Editar Carrera" : "Agregar Carrera"}</ModalTitle>
                        <ActionButton
                            color={ColorsLogin.secondary100}
                            onClick={() => { setIsModalOpen(false); setCurrent(null); }}
                        >
                            <X />
                        </ActionButton>
                    </ModalHeader>

                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        const fd = new FormData(e.target);
                        const payload = {
                            id: current?.id,
                            nombre: fd.get("nombre"),
                            idFacultad: fd.get("idFacultad"),
                        };
                        current ? handleUpdate(payload) : handleCreate(payload);
                    }}>
                        <FormGroup>
                            <Label><Briefcase size={16} /> Nombre de la Carrera</Label>
                            <Input type="text" name="nombre" defaultValue={initial.nombre} required />
                        </FormGroup>

                        <FormGroup>
                            <Label><Building2 size={16} /> Facultad</Label>
                            <Input as="select" name="idFacultad" defaultValue={initial.idFacultad} required>
                                <option value="">Selecciona una facultad</option>
                                {facultades.map((f) => (
                                    <option key={f.id} value={f.id}>{f.nombre}</option>
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

    const columnCount = 3; // Solo 3 columnas: Carrera, Facultad, Acciones

    // Render
    return (
        <PageWrapper>
            <Container> {/* Container normal para CRUDs simples */}
                <PageHeader>
                    <Title>Gestión de Carreras</Title>
                </PageHeader>

                <SearchContainer>
                    <Search color={ColorsLogin.secondary100} />
                    <SearchInput
                        placeholder="Buscar por carrera o facultad..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </SearchContainer>

                <TableWrapper>
                    <TableScrollContainer>
                        <Table>
                            <thead>
                                <tr>
                                    <TableHeader className="simple">Carrera</TableHeader>
                                    <TableHeader className="simple">Facultad</TableHeader>
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
                                                <Briefcase size={48} />
                                                <h3>No se encontraron carreras</h3>
                                                <p>
                                                    {searchTerm
                                                        ? "Intenta con otros términos de búsqueda"
                                                        : "Aún no hay carreras registradas"
                                                    }
                                                </p>
                                            </EmptyState>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filtered.map((c) => (
                                        <TableRow key={c.id}>
                                            <TableCell>{c.nombre}</TableCell>
                                            <TableCell>{c.facultad?.nombre || <em style={{ color: Colors.greyLight }}>Sin facultad</em>}</TableCell>
                                            <TableCell>
                                                <ActionButton
                                                    color={Colors.greyDark}
                                                    onClick={() => {
                                                        setCurrent({ ...c, idFacultad: c.facultad?.id ?? c.idFacultad });
                                                        setIsModalOpen(true);
                                                    }}
                                                >
                                                    <Edit size={18} />
                                                </ActionButton>
                                                <ActionButton
                                                    color={ColorsLogin.secondary100}
                                                    onClick={() => handleDelete(c.id)}
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

export default CarrerasCRUD;