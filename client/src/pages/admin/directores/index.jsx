import React, { useEffect, useMemo, useState } from "react";
import { 
  Plus, Edit, Trash2, Save, X, Search, User, Mail, Briefcase, 
  FileText, Phone, IdCard, BookOpen, BadgeCheck, Users 
} from "lucide-react";
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

const BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";
const FETCH_OPTS = { credentials: "include", headers: { "Content-Type": "application/json" } };

// Helpers
const strip = (s = "") =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

const siglaFromNombre = (nombre = "") => {
  const parts = strip(nombre)
    .split(/\s+/)
    .filter(Boolean)
    .filter((w) => !["de", "del", "la", "el", "y"].includes(w));
  if (!parts.length) return "GEN";
  const last = parts[parts.length - 1];
  return last.slice(0, 3).toUpperCase();
};

const joinDot = (...parts) => parts.filter(Boolean).join(".");

const Directores = () => {
  const [rows, setRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  // Catálogos
  const [facultades, setFacultades] = useState([]);
  const [carreras, setCarreras] = useState([]);
  const [materias, setMaterias] = useState([]);

  // Formulario
  const [form, setForm] = useState({
    nombre: "", apellido: "", email: "", telefono: "", ci: "",
    idFacultad: "", idCarrera: "", materiaIds: [],
  });
  const setF = (p) => setForm((s) => ({ ...s, ...p }));

  // Derivados (preview)
  const carreraSeleccionada = useMemo(
    () => carreras.find((c) => String(c.id) === String(form.idCarrera)) || null,
    [carreras, form.idCarrera]
  );

  const siglaCarrera = useMemo(() => {
    if (!carreraSeleccionada) return "";
    return (carreraSeleccionada.sigla || siglaFromNombre(carreraSeleccionada.nombre || "")).toUpperCase();
  }, [carreraSeleccionada]);

  const previewCodigo = useMemo(() => {
    const ciNum = String(form.ci || "").replace(/\D/g, "");
    if (!ciNum) return "";
    return `${siglaCarrera || "GEN"}${ciNum}`;
  }, [siglaCarrera, form.ci]);

  const previewCorreo = useMemo(() => {
    const nombres = strip(form.nombre).replace(/\s+/g, " ");
    const apellidos = strip(form.apellido).replace(/\s+/g, " ");
    if (!nombres || !apellidos) return "";
    const partesAp = apellidos.split(" ").filter(Boolean);
    const ap1 = partesAp[0] || "";
    const ap2 = (partesAp[1] || "").slice(0, 2);
    const nombresPegados = nombres.replace(/\s+/g, "");
    const local = joinDot("cbbe", nombresPegados, ap1, ap2);
    return `${local}@unifranz.edu.bo`;
  }, [form.nombre, form.apellido]);

  // API calls
  const readText = async (r) => { try { return await r.text(); } catch { return ""; } };

  const loadDirectores = async (q = "") => {
    try {
      setLoading(true);
      setErr("");
      const u = new URL(`${BASE}/director`);
      if (q) u.searchParams.set("q", q);
      const r = await fetch(u, FETCH_OPTS);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const { data } = await r.json();
      setRows(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(String(e.message || e));
    } finally {
      setLoading(false);
    }
  };

  const fetchDirectorById = async (id) => {
    const r = await fetch(`${BASE}/director/${id}`, FETCH_OPTS);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  };

  // CRUD operations
  const handleCreate = async (payload) => {
    try {
      const r = await fetch(`${BASE}/director`, {
        ...FETCH_OPTS,
        method: "POST",
        body: JSON.stringify(payload),
      });
      const txt = await readText(r);
      const j = (() => { try { return JSON.parse(txt); } catch { return {}; } })();
      if (!r.ok) throw new Error(j?.message || `POST /director -> ${r.status} ${r.statusText} ${txt.slice(0,120)}`);
      toast.success("Director creado correctamente");
      await loadDirectores(searchTerm);
    } catch (e) {
      console.error(e);
      toast.error(String(e.message || "No se pudo crear el director"));
    } finally {
      setIsModalOpen(false);
      setEditingId(null);
    }
  };

  const handleUpdate = async (id, actualizado) => {
    try {
      const r = await fetch(`${BASE}/director/${id}`, {
        ...FETCH_OPTS,
        method: "PUT",
        body: JSON.stringify(actualizado),
      });
      const txt = await readText(r);
      const j = (() => { try { return JSON.parse(txt); } catch { return {}; } })();
      if (!r.ok) throw new Error(j?.message || `PUT /director/${id} -> ${r.status} ${r.statusText} ${txt.slice(0,120)}`);
      toast.success("Director actualizado");
      await loadDirectores(searchTerm);
    } catch (e) {
      console.error(e);
      toast.error(String(e.message || "No se pudo actualizar el director"));
    } finally {
      setIsModalOpen(false);
      setEditingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este director?")) return;
    
    try {
      const r = await fetch(`${BASE}/director/${id}`, { ...FETCH_OPTS, method: "DELETE" });
      const txt = await readText(r);
      const j = (() => { try { return JSON.parse(txt); } catch { return {}; } })();
      if (!r.ok) throw new Error(j?.message || `DELETE /director/${id} -> ${r.status} ${r.statusText} ${txt.slice(0,120)}`);
      toast.success("Director eliminado");
      await loadDirectores(searchTerm);
    } catch (e) {
      console.error("Error al eliminar:", e);
      toast.error(String(e.message || "No se pudo eliminar el director"));
    }
  };

  // Catálogos
  const loadFacultades = async () => {
    const r = await fetch(`${BASE}/facultad`, FETCH_OPTS);
    const { data } = await r.json();
    setFacultades(data || []);
  };
  const loadCarreras = async (fid) => {
    if (!fid) return setCarreras([]);
    const u = new URL(`${BASE}/carrera`);
    u.searchParams.set("idFacultad", String(fid));
    const r = await fetch(u, FETCH_OPTS);
    const { data } = await r.json();
    setCarreras(data || []);
  };
  const loadMaterias = async (cid) => {
    if (!cid) return setMaterias([]);
    const u = new URL(`${BASE}/materia`);
    u.searchParams.set("idCarrera", String(cid));
    const r = await fetch(u, FETCH_OPTS);
    const { data } = await r.json();
    setMaterias(data || []);
  };

  // Effects
  useEffect(() => { loadDirectores().catch(e => setErr(String(e.message || e))); }, []);
  useEffect(() => {
    const t = setTimeout(() => { loadDirectores(searchTerm).catch(e => setErr(String(e.message || e))); }, 300);
    return () => clearTimeout(t);
  }, [searchTerm]);
  useEffect(() => { loadFacultades().catch(() => {}); }, []);
  useEffect(() => {
    if (!form.idFacultad) { setCarreras([]); setF({ idCarrera: "", materiaIds: [] }); return; }
    loadCarreras(form.idFacultad).catch(() => {});
    setF({ idCarrera: "", materiaIds: [] });
  }, [form.idFacultad]);
  useEffect(() => {
    if (!form.idCarrera) { setMaterias([]); setF({ materiaIds: [] }); return; }
    loadMaterias(form.idCarrera).catch(() => {});
    setF({ materiaIds: [] });
  }, [form.idCarrera]);

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
  }, [rows]);

  // Actions
  const openNew = () => {
    setEditingId(null);
    setForm({ nombre:"", apellido:"", email:"", telefono:"", ci:"", idFacultad:"", idCarrera:"", materiaIds:[] });
    setIsModalOpen(true);
  };

  const openEdit = async (row) => {
    try {
      const { data } = await fetchDirectorById(row.id);
      setEditingId(row.id);
      const fid = data.raw?.idFacultad || "";
      const cid = data.raw?.idCarrera || "";
      setForm({
        nombre: data.raw?.nombre || "",
        apellido: data.raw?.apellido || "",
        email: data.raw?.correo || "",
        telefono: data.raw?.telefono || "",
        ci: String(data.raw?.ci ?? ""),
        idFacultad: fid || "",
        idCarrera: cid || "",
        materiaIds: (data.raw?.materiaIds || []).map(Number),
      });
      setIsModalOpen(true);
      if (fid) await loadCarreras(fid);
      if (cid) await loadMaterias(cid);
    } catch (e) {
      setErr(String(e.message || e));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      nombre: form.nombre,
      apellido: form.apellido,
      telefono: form.telefono,
      ci: Number(String(form.ci).replace(/\D/g,"")),
      correo: previewCorreo,
      idFacultad: form.idFacultad ? Number(form.idFacultad) : null,
      idCarrera:  form.idCarrera  ? Number(form.idCarrera)  : null,
      materiaIds: form.materiaIds.map(Number),
    };
    if (editingId) await handleUpdate(editingId, payload);
    else await handleCreate(payload);
  };

  // Modal
  const renderModal = () => {
    if (!isModalOpen) return null;
    return (
      <ModalOverlay>
        <ModalContent size="large">
          <ModalHeader>
            <ModalTitle>{editingId ? "Editar Director" : "Agregar Director"}</ModalTitle>
            <ActionButton color={ColorsLogin.secondary100} onClick={() => { setIsModalOpen(false); setEditingId(null); }}>
              <X />
            </ActionButton>
          </ModalHeader>

          <Form columns={2} onSubmit={onSubmit}>
            <FormGroup>
              <Label><User size={16}/> Nombres</Label>
              <Input type="text" value={form.nombre} onChange={(e)=>setF({nombre:e.target.value})} required />
            </FormGroup>
            <FormGroup>
              <Label><User size={16}/> Apellidos</Label>
              <Input type="text" value={form.apellido} onChange={(e)=>setF({apellido:e.target.value})} required />
            </FormGroup>

            <FormGroup>
              <Label><Phone size={16}/> Teléfono</Label>
              <Input type="text" value={form.telefono} onChange={(e)=>setF({telefono:e.target.value})} required />
            </FormGroup>
            <FormGroup>
              <Label><IdCard size={16}/> CI</Label>
              <Input type="number" value={form.ci} onChange={(e)=>setF({ci:e.target.value})} required />
            </FormGroup>

            <FormGroup>
              <Label><FileText size={16}/> Facultad</Label>
              <Input as="select" value={form.idFacultad} onChange={(e)=>setF({idFacultad:e.target.value})} required>
                <option value="">Selecciona facultad</option>
                {facultades.map((f) => <option key={f.id} value={f.id}>{f.nombre}</option>)}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label><Briefcase size={16}/> Carrera</Label>
              <Input as="select" value={form.idCarrera} onChange={(e)=>setF({idCarrera:e.target.value})} required disabled={!form.idFacultad}>
                <option value="">Selecciona carrera</option>
                {carreras.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </Input>
            </FormGroup>

            <FormGroup>
              <Label><BadgeCheck size={16}/> Código</Label>
              <Input type="text" value={previewCodigo} readOnly title="Se genera como SIGLA_CARRERA + CI" />
            </FormGroup>

            <FormGroup>
              <Label><Mail size={16}/> Correo institucional</Label>
              <Input type="email" value={previewCorreo} readOnly title="Generado automáticamente" />
            </FormGroup>

            <FormGroup className="full-width">
              <Label><BookOpen size={16}/> Materias que imparte</Label>
              <Input
                as="select"
                multiple
                value={form.materiaIds.map(String)}
                onChange={(e)=>{
                  const vals = Array.from(e.target.selectedOptions).map(o => Number(o.value));
                  setF({ materiaIds: vals });
                }}
                disabled={!form.idCarrera}
                style={{ minHeight: 120 }}
              >
                {materias.map((m) => <option key={m.id} value={m.id}>{m.nombre}</option>)}
              </Input>
              <small style={{ marginTop: "6px", color: Colors.greyLight }}>
                Mantén Ctrl/Cmd presionado para seleccionar múltiples materias
              </small>
            </FormGroup>

            <ButtonGroup>
              <Button type="button" className="secondary" onClick={() => { setIsModalOpen(false); setEditingId(null); }}>
                Cancelar
              </Button>
              <Button type="submit" className="primary">
                <Save size={16}/> {editingId ? "Actualizar" : "Guardar"}
              </Button>
            </ButtonGroup>
          </Form>
        </ModalContent>
      </ModalOverlay>
    );
  };

  const filtered = rows.filter((d) => {
    const q = searchTerm.toLowerCase();
    return (
      d.nombre?.toLowerCase().includes(q) ||
      d.apellido?.toLowerCase().includes(q) ||
      d.email?.toLowerCase().includes(q) ||
      d.codigo?.toLowerCase().includes(q)
    );
  });

  return (
    <PageWrapper>
      <Container wide>
        <PageHeader>
          <Title>Gestión de Directores</Title>
        </PageHeader>

        {err && (
          <div style={{ 
            color: ColorsLogin.secondary200, 
            padding: 16, 
            background: "#FFF5F5", 
            borderRadius: 8, 
            marginBottom: 24,
            border: `1px solid ${ColorsLogin.secondary100}` 
          }}>
            {err}
          </div>
        )}

        <SearchContainer>
          <Search color={ColorsLogin.secondary100} />
          <SearchInput 
            placeholder="Buscar por nombre, correo o código…" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </SearchContainer>

        <TableWrapper>
          <TableScrollContainer data-table-wrapper>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Nombre</TableHeader>
                  <TableHeader>Apellido</TableHeader>
                  <TableHeader>Email</TableHeader>
                  <TableHeader>Carrera</TableHeader>
                  <TableHeader>Facultad</TableHeader>
                  <TableHeader>CI</TableHeader>
                  <TableHeader>Código</TableHeader>
                  <TableHeader>Teléfono</TableHeader>
                  <TableHeader>Acciones</TableHeader>
                </tr>
              </thead>
              <tbody>
                {loading ? (
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
                      <LoadingCell><div className="skeleton" /></LoadingCell>
                    </LoadingRow>
                  ))
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9}>
                      <EmptyState>
                        <Users size={48} />
                        <h3>No se encontraron directores</h3>
                        <p>
                          {searchTerm 
                            ? "Intenta con otros términos de búsqueda" 
                            : "Aún no hay directores registrados"
                          }
                        </p>
                      </EmptyState>
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell>{d.nombre}</TableCell>
                      <TableCell>{d.apellido}</TableCell>
                      <TableCell>{d.email}</TableCell>
                      <TableCell>{d.especialidad}</TableCell>
                      <TableCell>{d.departamento}</TableCell>
                      <TableCell>{d.ci}</TableCell>
                      <TableCell>{d.codigo}</TableCell>
                      <TableCell>{d.telefono}</TableCell>
                      <TableCell>
                        <ActionButton color={Colors.greyDark} onClick={() => openEdit(d)}>
                          <Edit size={18} />
                        </ActionButton>
                        <ActionButton color={ColorsLogin.secondary100} onClick={() => handleDelete(d.id)}>
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

        <FloatingButton onClick={openNew}>
          <Plus size={28} />
        </FloatingButton>

        {renderModal()}
      </Container>
    </PageWrapper>
  );
};

export default Directores;