import React, { useEffect, useMemo, useState } from "react";
import {
  Plus, Edit, Trash2, Save, X, Search, User, Mail, Briefcase,
  IdCard, Phone, Building2, BookOpen, Hash, BadgeCheck, Users
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

const strip = (s = "") => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
const SEM_LABELS = [null, "Primer", "Segundo", "Tercer", "Cuarto", "Quinto", "Sexto", "Séptimo", "Octavo", "Noveno", "Décimo", "Undécimo", "Duodécimo"];
const labelSemestre = (s) => s ? (SEM_LABELS[s.numero] ? `${SEM_LABELS[s.numero]} semestre` : `Semestre ${s.numero}`) : "—";

export default function Estudiantes() {
  const [rows, setRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  // catálogos
  const [facultades, setFacultades] = useState([]);
  const [carreras, setCarreras] = useState([]);
  const [semestres, setSemestres] = useState([]);
  const [materias, setMaterias] = useState([]);

  // form
  const [form, setForm] = useState({
    nombre: "", apellido: "", telefono: "", ci: "",
    idFacultad: "", idCarrera: "", semestreId: "",
    materiaIds: []
  });
  const setF = (p) => setForm((s) => ({ ...s, ...p }));

  // --------- catálogos ---------
  const readText = async (r) => { try { return await r.text(); } catch { return ""; } };

  async function loadFacultades() {
    const r = await fetch(`${BASE}/facultad`, FETCH_OPTS);
    const { data = [] } = await r.json();
    setFacultades(data);
  }
  async function loadCarreras(fid) {
    if (!fid) { setCarreras([]); return; }
    const u = new URL(`${BASE}/carrera`);
    u.searchParams.set("idFacultad", String(fid));
    const r = await fetch(u, FETCH_OPTS);
    const { data = [] } = await r.json();
    setCarreras(data);
  }
  async function loadSemestresByCarrera(cid) {
    if (!cid) { setSemestres([]); return; }
    const u = new URL(`${BASE}/semestre/by-carrera`);
    u.searchParams.set("carreraId", String(cid));
    const r = await fetch(u, FETCH_OPTS);
    const j = await r.json();
    const items = j.data || j.items || [];
    setSemestres(items);
  }
  async function loadMateriasBySemestre(semestreId, carreraIdCurrent = form.idCarrera) {
    try {
      if (!semestreId) { setMaterias([]); return; }
      const u = new URL(`${BASE}/materia/by-semestre`);
      u.searchParams.set("semestreId", String(semestreId));
      const r = await fetch(u, FETCH_OPTS);
      const j = await r.json();
      const items = j.data || j.items || [];
      if (Array.isArray(items) && items.length > 0) {
        setMaterias(items); return;
      }
      if (carreraIdCurrent) {
        const u2 = new URL(`${BASE}/materia`);
        u2.searchParams.set("idCarrera", String(carreraIdCurrent));
        const r2 = await fetch(u2, FETCH_OPTS);
        const j2 = await r2.json();
        const items2 = j2.data || j2.items || [];
        setMaterias(items2); return;
      }
      setMaterias([]);
    } catch { setMaterias([]); }
  }

  // --------- CRUD (helpers con toasts) ---------
  async function loadEstudiantes(q = "") {
    try {
      setLoading(true);
      setErr("");
      const u = new URL(`${BASE}/estudiante`);
      if (q) u.searchParams.set("q", q);
      const r = await fetch(u, FETCH_OPTS);
      if (!r.ok) { const t = await readText(r); throw new Error(`GET /estudiante -> ${r.status} ${t}`); }
      const { data = [] } = await r.json();
      setRows(data);
    } catch (e) {
      setErr(String(e.message || e));
    } finally {
      setLoading(false);
    }
  }
  async function createEstudiante(payload) {
    const r = await fetch(`${BASE}/estudiante`, { ...FETCH_OPTS, method: "POST", body: JSON.stringify(payload) });
    if (!r.ok) { const t = await readText(r); throw new Error(`POST /estudiante -> ${r.status} ${t}`); }
    return r.json();
  }
  async function updateEstudiante(id, payload) {
    const r = await fetch(`${BASE}/estudiante/${id}`, { ...FETCH_OPTS, method: "PUT", body: JSON.stringify(payload) });
    if (!r.ok) { const t = await readText(r); throw new Error(`PUT /estudiante/${id} -> ${r.status} ${t}`); }
    return r.json();
  }
  async function deleteEstudiante(id) {
    const r = await fetch(`${BASE}/estudiante/${id}`, { ...FETCH_OPTS, method: "DELETE" });
    if (!r.ok) { const t = await readText(r); throw new Error(`DELETE /estudiante/${id} -> ${r.status} ${t}`); }
    return r.json();
  }

  // --------- effects ---------
  useEffect(() => { loadEstudiantes().catch(e => setErr(String(e.message || e))); }, []);
  useEffect(() => {
    const t = setTimeout(() => loadEstudiantes(searchTerm).catch(e => setErr(String(e.message || e))), 300);
    return () => clearTimeout(t);
  }, [searchTerm]);
  useEffect(() => { loadFacultades().catch(() => { }); }, []);

  useEffect(() => {
    if (!form.idFacultad) { setCarreras([]); setF({ idCarrera: "", semestreId: "", materiaIds: [] }); return; }
    loadCarreras(form.idFacultad).catch(() => { });
    setF({ idCarrera: "", semestreId: "", materiaIds: [] });
  }, [form.idFacultad]);

  useEffect(() => {
    if (!form.idCarrera) { setSemestres([]); setF({ semestreId: "", materiaIds: [] }); return; }
    loadSemestresByCarrera(form.idCarrera).catch(() => { });
    setF({ semestreId: "", materiaIds: [] });
  }, [form.idCarrera]);

  useEffect(() => {
    if (!form.semestreId) { setMaterias([]); setF({ materiaIds: [] }); return; }
    loadMateriasBySemestre(form.semestreId, form.idCarrera).catch(() => { });
    setF({ materiaIds: [] });
  }, [form.semestreId, form.idCarrera]);

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

  // --------- previews (solo UI) ---------
  const carreraSel = useMemo(
    () => carreras.find(c => String(c.id) === String(form.idCarrera)) || null,
    [carreras, form.idCarrera]
  );
  const siglaCarrera = useMemo(() => {
    if (!carreraSel) return "";
    return (carreraSel.sigla ? String(carreraSel.sigla) : strip(carreraSel.nombre).split(/\s+/).pop() || "")
      .slice(0, 3).toUpperCase();
  }, [carreraSel]);
  const previewCodigo = useMemo(() => {
    const ciNum = String(form.ci || "").replace(/\D/g, "");
    if (!ciNum) return "";
    return `${siglaCarrera || "GEN"}${ciNum}`;
  }, [siglaCarrera, form.ci]);

  const previewCorreo = useMemo(() => {
    const n = strip(form.nombre).replace(/\s+/g, "");
    const as = strip(form.apellido).split(/\s+/).filter(Boolean);
    if (!n || as.length === 0) return "";
    const ap1 = as[0] || "";
    const ap2 = (as[1] || "").slice(0, 2);
    const local = ["cbbe", n, ap1, ap2].filter(Boolean).join(".");
    return `${local}@unifranz.edu.bo`;
  }, [form.nombre, form.apellido]);

  // --------- acciones ---------
  const openNew = () => {
    setEditingId(null);
    setForm({
      nombre: "", apellido: "", telefono: "", ci: "",
      idFacultad: "", idCarrera: "", semestreId: "", materiaIds: []
    });
    setIsModalOpen(true);
  };

  const openEdit = async (row) => {
    try {
      const r = await fetch(`${BASE}/estudiante/${row.id}`, FETCH_OPTS);
      const { data } = await r.json();
      setEditingId(row.id);
      const fid = data.raw?.idFacultad || "";
      const cid = data.raw?.idCarrera || "";
      const sid = data.raw?.semestreId || "";
      setForm({
        nombre: data.raw?.nombre || "",
        apellido: data.raw?.apellido || "",
        telefono: data.raw?.telefono || "",
        ci: String(data.raw?.ci ?? ""),
        idFacultad: fid || "",
        idCarrera: cid || "",
        semestreId: sid || "",
        materiaIds: (data.raw?.materiaIds || []).map(Number),
      });
      setIsModalOpen(true);
      if (fid) await loadCarreras(fid);
      if (cid) await loadSemestresByCarrera(cid);
      if (sid) await loadMateriasBySemestre(sid);
    } catch (e) { setErr(String(e.message || e)); }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      nombre: form.nombre,
      apellido: form.apellido,
      telefono: form.telefono,
      ci: Number(String(form.ci).replace(/\D/g, "")),
      idFacultad: form.idFacultad ? Number(form.idFacultad) : null,
      idCarrera: form.idCarrera ? Number(form.idCarrera) : null,
      semestreId: form.semestreId ? Number(form.semestreId) : null,
      materiaIds: form.materiaIds.map(Number),
    };

    try {
      if (editingId) {
        await updateEstudiante(editingId, payload);
        toast.success("Estudiante actualizado");
      } else {
        await createEstudiante(payload);
        toast.success("Estudiante creado correctamente");
      }
      await loadEstudiantes(searchTerm);
    } catch (e) {
      console.error(e);
      toast.error(String(e.message || e));
    } finally {
      setIsModalOpen(false);
      setEditingId(null);
    }
  };

  const onDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este estudiante?")) return;
    try {
      await deleteEstudiante(id);
      await loadEstudiantes(searchTerm); // Recargar lista
      toast.success("Estudiante eliminado");
    } catch (e) {
      console.error(e);
      toast.error("No se pudo eliminar el estudiante");
    }
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

  // --------- modal ---------
  const renderModal = () => !isModalOpen ? null : (
    <ModalOverlay>
      <ModalContent size="large">
        <ModalHeader>
          <ModalTitle>{editingId ? "Editar Estudiante" : "Agregar Estudiante"}</ModalTitle>
          <ActionButton color={ColorsLogin.secondary100} onClick={() => { setIsModalOpen(false); setEditingId(null); }}>
            <X />
          </ActionButton>
        </ModalHeader>

        <Form columns={2} onSubmit={onSubmit}>
          <FormGroup>
            <Label><User size={16} /> Nombres</Label>
            <Input type="text" value={form.nombre} onChange={e => setF({ nombre: e.target.value })} required />
          </FormGroup>
          <FormGroup>
            <Label><User size={16} /> Apellidos</Label>
            <Input type="text" value={form.apellido} onChange={e => setF({ apellido: e.target.value })} required />
          </FormGroup>
          <FormGroup>
            <Label><Phone size={16} /> Teléfono</Label>
            <Input type="text" value={form.telefono} onChange={e => setF({ telefono: e.target.value })} required />
          </FormGroup>
          <FormGroup>
            <Label><IdCard size={16} /> CI</Label>
            <Input type="number" value={form.ci} onChange={e => setF({ ci: e.target.value })} required />
          </FormGroup>

          <FormGroup>
            <Label><Building2 size={16} /> Facultad</Label>
            <Input as="select" value={form.idFacultad} onChange={e => setF({ idFacultad: e.target.value })} required>
              <option value="">Selecciona facultad</option>
              {facultades.map(f => <option key={f.id} value={f.id}>{f.nombre}</option>)}
            </Input>
          </FormGroup>

          <FormGroup>
            <Label><Briefcase size={16} /> Carrera</Label>
            <Input as="select" value={form.idCarrera} onChange={e => setF({ idCarrera: e.target.value })} required disabled={!form.idFacultad}>
              <option value="">Selecciona carrera</option>
              {carreras.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </Input>
          </FormGroup>

          <FormGroup>
            <Label><Hash size={16} /> Semestre</Label>
            <Input as="select" value={form.semestreId} onChange={e => setF({ semestreId: e.target.value })} required disabled={!form.idCarrera}>
              <option value="">Selecciona semestre</option>
              {semestres.map(s => <option key={s.id} value={s.id}>{labelSemestre(s)}</option>)}
            </Input>
          </FormGroup>

          <FormGroup>
            <Label><BadgeCheck size={16} /> Código</Label>
            <Input type="text" value={previewCodigo} readOnly title="Se genera como SIGLA_CARRERA + CI (ej. SIS14836271)" />
          </FormGroup>

          <FormGroup>
            <Label><Mail size={16} /> Correo institucional</Label>
            <Input type="email" value={previewCorreo} readOnly title="cbbe.nombres.primer_apellido.2letrasSegundo@unifranz.edu.bo" />
          </FormGroup>

          <FormGroup className="full-width">
            <Label><BookOpen size={16} /> Materias (múltiple)</Label>
            <Input
              as="select"
              multiple
              value={form.materiaIds.map(String)}
              onChange={(e) => {
                const vals = Array.from(e.target.selectedOptions).map(o => Number(o.value));
                setF({ materiaIds: vals });
              }}
              disabled={!form.semestreId}
              style={{ minHeight: 120 }}
            >
              {materias.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
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
              <Save size={16} /> {editingId ? "Actualizar" : "Guardar"}
            </Button>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );

  return (
    <PageWrapper>
      <Container wide>
        <PageHeader>
          <Title>Gestión de Estudiantes</Title>
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
            placeholder="Buscar estudiantes por nombre, correo o código..." 
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
                  <TableHeader>Facultad</TableHeader>
                  <TableHeader>Carrera</TableHeader>
                  <TableHeader>Semestre</TableHeader>
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
                        <h3>No se encontraron estudiantes</h3>
                        <p>
                          {searchTerm 
                            ? "Intenta con otros términos de búsqueda" 
                            : "Aún no hay estudiantes registrados"
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
                      <TableCell>{d.departamento}</TableCell>
                      <TableCell>{d.especialidad}</TableCell>
                      <TableCell>{d.semestre || "—"}</TableCell>
                      <TableCell>{d.codigo}</TableCell>
                      <TableCell>{d.telefono}</TableCell>
                      <TableCell>
                        <ActionButton color={Colors.greyDark} onClick={() => openEdit(d)}>
                          <Edit size={18} />
                        </ActionButton>
                        <ActionButton color={ColorsLogin.secondary100} onClick={() => onDelete(d.id)}>
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
}