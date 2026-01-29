import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Save, X, Search, User } from "lucide-react";
import { toast } from "sonner";
import {
  PageWrapper,
  Container,
  PageHeader,
  Title,
  SearchContainer,
  SearchInput,
  TableWrapper,
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
  Chip,
  EmptyState,
} from "../../../style/generalStyle.jsx";
import { ColorsLogin, Colors } from "../../../style/colors";

const Facultades = () => {
  const [facultades, setFacultades] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFacultad, setCurrentFacultad] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const API = "http://localhost:3000/facultad";

  // Carga inicial
  useEffect(() => {
    loadFacultades();
  }, []);

  const loadFacultades = async () => {
    try {
      setLoading(true);
      const r = await fetch(API);
      if (!r.ok) {
        const txt = await r.text();
        throw new Error(`GET ${API} -> ${r.status} ${r.statusText} ${txt.slice(0, 120)}`);
      }
      const j = await r.json();
      setFacultades(Array.isArray(j.data) ? j.data : []);
    } catch (e) {
      console.error("Error al cargar facultades:", e);
      toast.error("No se pudieron cargar las facultades");
    } finally {
      setLoading(false);
    }
  };

  // CRUD Operations
  const handleAddFacultad = async (nuevo) => {
    try {
      const r = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevo),
      });
      if (!r.ok) {
        const txt = await r.text();
        throw new Error(`POST ${API} -> ${r.status} ${r.statusText} ${txt.slice(0, 120)}`);
      }
      const j = await r.json();
      if (j?.data) setFacultades((prev) => [...prev, j.data]);
      toast.success("Facultad creada correctamente");
    } catch (e) {
      console.error(e);
      toast.error("No se pudo crear la facultad");
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleEditFacultad = async (actualizado) => {
    try {
      const r = await fetch(`${API}/${actualizado.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(actualizado),
      });
      if (!r.ok) {
        const txt = await r.text();
        throw new Error(`PUT ${API}/${actualizado.id} -> ${r.status} ${r.statusText} ${txt.slice(0, 120)}`);
      }
      const j = await r.json();
      if (j?.data) {
        setFacultades((prev) => prev.map((f) => (f.id === j.data.id ? j.data : f)));
      }
      toast.success("Facultad actualizada");
    } catch (e) {
      console.error(e);
      toast.error("No se pudo actualizar la facultad");
    } finally {
      setIsModalOpen(false);
      setCurrentFacultad(null);
    }
  };

  const handleDeleteFacultad = async (id) => {
    if (!confirm("¿Estás seguro de eliminar esta facultad?")) return;
    
    try {
      const r = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!r.ok) {
        const txt = await r.text();
        throw new Error(`DELETE ${API}/${id} -> ${r.status} ${r.statusText} ${txt.slice(0, 120)}`);
      }
      const j = await r.json();
      if (j?.data) setFacultades((prev) => prev.filter((f) => f.id !== id));
      toast.success("Facultad eliminada");
    } catch (e) {
      console.error("Error al eliminar:", e);
      toast.error("No se pudo eliminar la facultad");
    }
  };

  // Filtrado
  const filteredFacultades = facultades.filter((d) =>
    d.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Modal
  const renderModal = () => {
    if (!isModalOpen) return null;
    const initial = currentFacultad || { nombre: "", theme: "" };

    return (
      <ModalOverlay>
        <ModalContent size="small"> {/* Modal pequeño para pocos campos */}
          <ModalHeader>
            <ModalTitle>{currentFacultad ? "Editar Facultad" : "Agregar Facultad"}</ModalTitle>
            <ActionButton
              color={ColorsLogin.secondary100}
              onClick={() => {
                setIsModalOpen(false);
                setCurrentFacultad(null);
              }}
            >
              <X />
            </ActionButton>
          </ModalHeader>

          <Form
            compact // Formulario compacto
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.target);
              const payload = {
                id: currentFacultad?.id,
                nombre: fd.get("nombre"),
                theme: (fd.get("theme") || "").toString().trim() || null,
              };
              currentFacultad ? handleEditFacultad(payload) : handleAddFacultad(payload);
            }}
          >
            <FormGroup>
              <Label>
                <User size={16} /> Nombre de la Facultad
              </Label>
              <Input type="text" name="nombre" defaultValue={initial.nombre} required />
            </FormGroup>

            <FormGroup className="full-width">
              <Label>Configuración de Tema (JSON)</Label>
              <Input
                as="textarea"
                name="theme"
                className="textarea"
                rows={4}
                placeholder={`{\n  "primary": "#007bff",\n  "primary100": "#66b2ff"\n}`}
                defaultValue={
                  typeof initial.theme === "string"
                    ? initial.theme
                    : initial.theme
                    ? JSON.stringify(initial.theme, null, 2)
                    : ""
                }
              />
              <small style={{ marginTop: "6px", color: Colors.greyLight }}>
                Formato JSON válido con colores para la facultad.
              </small>
            </FormGroup>

            <ButtonGroup>
              <Button
                type="button"
                className="secondary"
                onClick={() => {
                  setIsModalOpen(false);
                  setCurrentFacultad(null);
                }}
              >
                Cancelar
              </Button>
              <Button type="submit" className="primary">
                <Save size={16} />
                {currentFacultad ? "Actualizar" : "Guardar"}
              </Button>
            </ButtonGroup>
          </Form>
        </ModalContent>
      </ModalOverlay>
    );
  };

  const columnCount = 3; // Solo 3 columnas: Nombre, Tema, Acciones

  return (
    <PageWrapper>
      <Container> {/* No usar wide para CRUDs simples */}
        <PageHeader>
          <Title>Gestión de Facultades</Title>
        </PageHeader>

        <SearchContainer>
          <Search color={ColorsLogin.secondary100} />
          <SearchInput
            placeholder="Buscar facultades por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>

        <TableWrapper>
          <Table columns={columnCount}>
            <thead>
              <tr>
                <TableHeader compact>Nombre</TableHeader>
                <TableHeader compact>Tema de Colores</TableHeader>
                <TableHeader compact>Acciones</TableHeader>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                // Estado de carga
                Array.from({ length: 3 }, (_, i) => (
                  <TableRow key={`loading-${i}`}>
                    <TableCell compact>
                      <div style={{ background: "#f0f0f0", height: "16px", borderRadius: "4px" }} />
                    </TableCell>
                    <TableCell compact>
                      <div style={{ background: "#f0f0f0", height: "16px", borderRadius: "4px" }} />
                    </TableCell>
                    <TableCell compact>
                      <div style={{ background: "#f0f0f0", height: "16px", borderRadius: "4px" }} />
                    </TableCell>
                  </TableRow>
                ))
              ) : filteredFacultades.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columnCount}>
                    <EmptyState>
                      <Search size={48} />
                      <h3>No se encontraron facultades</h3>
                      <p>
                        {searchTerm 
                          ? "Intenta con otros términos de búsqueda" 
                          : "Aún no hay facultades registradas"
                        }
                      </p>
                    </EmptyState>
                  </TableCell>
                </TableRow>
              ) : (
                filteredFacultades.map((fac) => {
                  // Normalizar theme para mostrar chips
                  let t = fac.theme;
                  if (typeof t === "string") {
                    try { t = JSON.parse(t); } catch { t = null; }
                  }
                  const keys = ["primary", "primary100", "primary200", "primary300", "primary400", "primary500"];

                  return (
                    <TableRow key={fac.id}>
                      <TableCell compact maxWidth="200px">{fac.nombre}</TableCell>

                      <TableCell compact>
                        {t ? (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                            {keys.map((k) =>
                              t[k] ? (
                                <Chip 
                                  key={k} 
                                  title={`${k}: ${t[k]}`} 
                                  style={{ background: t[k] }} 
                                />
                              ) : null
                            )}
                          </div>
                        ) : (
                          <em style={{ color: Colors.greyLight }}>Sin tema</em>
                        )}
                      </TableCell>

                      <TableCell compact>
                        <ActionButton
                          color={Colors.greyDark}
                          onClick={() => {
                            const themeStr =
                              t && typeof t !== "string" ? JSON.stringify(t, null, 2) : (fac.theme || "");
                            setCurrentFacultad({ ...fac, theme: themeStr });
                            setIsModalOpen(true);
                          }}
                        >
                          <Edit size={18} />
                        </ActionButton>

                        <ActionButton
                          color={ColorsLogin.secondary100}
                          onClick={() => handleDeleteFacultad(fac.id)}
                        >
                          <Trash2 size={18} />
                        </ActionButton>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </tbody>
          </Table>
        </TableWrapper>

        <FloatingButton
          onClick={() => {
            setCurrentFacultad(null);
            setIsModalOpen(true);
          }}
        >
          <Plus size={28} />
        </FloatingButton>

        {renderModal()}
      </Container>
    </PageWrapper>
  );
};

export default Facultades;