// Roxy: Materias del Director (cambia por correo: Sistemas vs Medicina)

import React, { useState, useMemo } from "react";
import styled from "styled-components";
import {
  Container,
  TabsContainer,
  Tab,
  SubjectsGrid,
  SubjectCard,
  SubjectHeader,
  SubjectImage,
  SubjectContent,
  SubjectTitle,
  SubjectInfo,
  InfoItem,
  ActionButtons,
  ActionButton,
  Badge,
  ContentSection,
  FilterBar,
  SearchInput,
  FilterButton,
} from "../../../style/docente/materiasDStyled";
import {
  Book,
  Users,
  Calendar,
  Clock,
  FileText,
  Edit,
  BarChart,
  Filter,
} from "lucide-react";
import { useColors } from "../../../style/colors";
import EntregasDocente from "../entregasDi/index.jsx";
import RevisionDocente from "../revisionDi/index.jsx";
import RubricasDocente from "../rubricasDi/index.jsx";
import CardHeader from "../../../components/ui/cardHeader.jsx";
import { useUser } from "../../../context/useContext";

// ================== CONFIGS POR DIRECTOR (por correo) ==================

// Director Ingeniería de Sistemas (Integrador III)
const SISTEMAS_CONFIG = {
  carreraNombre: "Ingeniería de Sistemas",
  headerText:
    "Vista del director de Ingeniería de Sistemas: Integrador III y malla de la carrera.",
  materias: [
    {
      id: 1,
      nombre: "Proyecto Integrador III",
      codigo: "SIS-703",
      estudiantes: 32,
      horario: "MAR-JUE 08:00-11:00",
      aula: "Lab 501",
      semestre: "7mo Semestre",
      imagen:
        "https://concepto.de/wp-content/uploads/2015/03/software-1-e1550080097569.jpg",
      proyectosActivos: 6,
      proyectos: [
        {
          id: "P-INT-1",
          titulo: "GestTeam - Gestión académica",
          estado: "En curso",
          avance: 72,
        },
        {
          id: "P-INT-2",
          titulo: "Plataforma de Telemedicina",
          estado: "En curso",
          avance: 54,
        },
        {
          id: "P-INT-3",
          titulo: "Sistema de Monitoreo IoT",
          estado: "Planificado",
          avance: 10,
        },
      ],
      rubricasProyecto: [
        {
          id: "R-INT-1",
          nombre: "Rúbrica Proyecto Integrador III",
          items: 8,
          ultimaActualizacion: "05/11/2024",
        },
      ],
      reportes: [
        {
          id: "REP-INT-1",
          titulo: "Consolidado de avances (Hito 1)",
          fecha: "20/10/2024",
        },
        {
          id: "REP-INT-2",
          titulo: "Estado de proyectos Integrador III",
          fecha: "01/11/2024",
        },
      ],
    },
  ],
  carreraMaterias: [
    {
      codigo: "SIS-101",
      nombre: "Introducción a la Programación",
      semestre: "1er Semestre",
      modalidad: "Teórico / Práctico",
    },
    {
      codigo: "SIS-303",
      nombre: "Estructuras de Datos",
      semestre: "3er Semestre",
      modalidad: "Teórico / Laboratorio",
    },
    {
      codigo: "SIS-403",
      nombre: "Bases de Datos I",
      semestre: "4to Semestre",
      modalidad: "Laboratorio",
    },
    {
      codigo: "SIS-501",
      nombre: "Ingeniería de Software I",
      semestre: "5to Semestre",
      modalidad: "Teórico / Práctico",
    },
    {
      codigo: "SIS-703",
      nombre: "Proyecto Integrador III",
      semestre: "7mo Semestre",
      modalidad: "Proyecto",
    },
  ],
  docentesCarga: [
    {
      id: 1,
      nombre: "Director Ing. de Sistemas",
      materias: ["Proyecto Integrador III"],
      horasSemana: 6,
      proyectosDirigidos: 6,
    },
    {
      id: 2,
      nombre: "Docentes de apoyo Integrador",
      materias: ["Proyecto Integrador III"],
      horasSemana: 8,
      proyectosDirigidos: 10,
    },
  ],
};

// Director Medicina (Anatomía)
const MEDICINA_CONFIG = {
  carreraNombre: "Medicina",
  headerText:
    "Vista del director de Medicina: Anatomía y malla de la carrera.",
  materias: [
    {
      id: 1,
      nombre: "Anatomía Humana I",
      codigo: "MED-203",
      estudiantes: 90,
      horario: "LUN-MIE 09:00-12:00",
      aula: "Aula de Anatomía 1",
      semestre: "2do Semestre",
      imagen:
        "https://images.pexels.com/photos/4225910/pexels-photo-4225910.jpeg?auto=compress&cs=tinysrgb&w=800",
      proyectosActivos: 3,
      proyectos: [
        {
          id: "P-ANA-1",
          titulo: "Atlas digital de anatomía",
          estado: "En curso",
          avance: 65,
        },
        {
          id: "P-ANA-2",
          titulo: "Guía interactiva de sistemas",
          estado: "En curso",
          avance: 48,
        },
      ],
      rubricasProyecto: [
        {
          id: "R-ANA-1",
          nombre: "Rúbrica de estudios de casos anatómicos",
          items: 6,
          ultimaActualizacion: "02/11/2024",
        },
      ],
      reportes: [
        {
          id: "REP-ANA-1",
          titulo: "Seguimiento prácticas de laboratorio",
          fecha: "25/10/2024",
        },
      ],
    },
    {
      id: 2,
      nombre: "Anatomía Humana II (Laboratorio)",
      codigo: "MED-204",
      estudiantes: 90,
      horario: "VIE 14:00-17:00",
      aula: "Lab de Disección",
      semestre: "2do Semestre",
      imagen:
        "https://images.pexels.com/photos/6529991/pexels-photo-6529991.jpeg?auto=compress&cs=tinysrgb&w=800",
      proyectosActivos: 2,
      proyectos: [
        {
          id: "P-ANA-3",
          titulo: "Banco de imágenes histológicas",
          estado: "En curso",
          avance: 52,
        },
      ],
      rubricasProyecto: [
        {
          id: "R-ANA-2",
          nombre: "Rúbrica prácticas de laboratorio",
          items: 5,
          ultimaActualizacion: "30/10/2024",
        },
      ],
      reportes: [
        {
          id: "REP-ANA-2",
          titulo: "Reporte asistencia y desempeño laboratorio",
          fecha: "28/10/2024",
        },
      ],
    },
  ],
  carreraMaterias: [
    {
      codigo: "MED-101",
      nombre: "Biología Celular",
      semestre: "1er Semestre",
      modalidad: "Teórico / Práctico",
    },
    {
      codigo: "MED-203",
      nombre: "Anatomía Humana I",
      semestre: "2do Semestre",
      modalidad: "Teórico / Práctico",
    },
    {
      codigo: "MED-204",
      nombre: "Anatomía Humana II",
      semestre: "2do Semestre",
      modalidad: "Laboratorio",
    },
    {
      codigo: "MED-301",
      nombre: "Fisiología Humana",
      semestre: "3er Semestre",
      modalidad: "Teórico / Práctico",
    },
  ],
  docentesCarga: [
    {
      id: 1,
      nombre: "Director de Medicina",
      materias: ["Anatomía Humana I", "Anatomía Humana II"],
      horasSemana: 8,
      proyectosDirigidos: 4,
    },
    {
      id: 2,
      nombre: "Docentes de Anatomía",
      materias: ["Anatomía Humana I", "Anatomía Humana II"],
      horasSemana: 10,
      proyectosDirigidos: 6,
    },
  ],
};

// Config por defecto (por si el correo no matchea)
const DEFAULT_CONFIG = {
  carreraNombre: "Carrera",
  headerText:
    "Vista general de materias, proyectos, rúbricas y carga de docentes.",
  materias: [
    {
      id: 1,
      nombre: "Proyecto Integrador III",
      codigo: "PII",
      estudiantes: 35,
      horario: "MAR 17:00-19:45",
      aula: "Aula 301",
      semestre: "57to Semestre",
      imagen:
        "https://concepto.de/wp-content/uploads/2015/03/software-1-e1550080097569.jpg",
      proyectosActivos: 2,
      proyectos: [
        {
          id: "P-ISW-1",
          titulo: "GestTeam - Gestión académica",
          estado: "En curso",
          avance: 72,
        },
      ],
      rubricasProyecto: [
        {
          id: "R-ISW-1",
          nombre: "Rúbrica Proyecto Final",
          items: 6,
          ultimaActualizacion: "05/11/2024",
        },
      ],
      reportes: [
        {
          id: "REP-ISW-1",
          titulo: "Reporte de avance Hito 2",
          fecha: "20/10/2024",
        },
      ],
    },
  ],
  carreraMaterias: [
    {
      codigo: "INF-201",
      nombre: "Introducción a la Programación",
      semestre: "1er Semestre",
      modalidad: "Teórico / Práctico",
    },
    {
      codigo: "INF-302",
      nombre: "Programación Avanzada",
      semestre: "4to Semestre",
      modalidad: "Laboratorio",
    },
  ],
  docentesCarga: [
    {
      id: 1,
      nombre: "Docente 1",
      materias: ["Materia A"],
      horasSemana: 10,
      proyectosDirigidos: 3,
    },
  ],
};

const MateriasDi = () => {
  const ColorsDoc = useColors();
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("materias");
  const [selectedMateria, setSelectedMateria] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Elegimos config según el correo del director
  const email = (user?.correo || user?.email || "").toLowerCase();

  let config = DEFAULT_CONFIG;
  if (email.includes("sistemas") || email.includes("sis")) {
    config = SISTEMAS_CONFIG;
  } else if (email.includes("medicina") || email.includes("med")) {
    config = MEDICINA_CONFIG;
  }

  const materiasData = config.materias;
  const carreraMaterias = config.carreraMaterias;
  const docentesCarga = config.docentesCarga;

  const filteredMaterias = useMemo(
    () =>
      materiasData.filter(
        (materia) =>
          materia.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          materia.codigo.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery, materiasData]
  );

  const handleMateriaClick = (materia) => {
    setSelectedMateria(materia);
    // Si quieres que al click se vaya directo a Entregas:
    // setActiveTab("entregas");
  };

  const renderMateriasTab = () => (
    <>
      {/* Filtro + Mis materias */}
      <FilterBar>
        <SearchInput
          type="text"
          placeholder="Buscar materia o código..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FilterButton>
          <Filter size={20} />
          Filtros
        </FilterButton>
      </FilterBar>

      <SubjectsGrid>
        {filteredMaterias.map((materia) => (
          <SubjectCard
            key={materia.id}
            onClick={() => handleMateriaClick(materia)}
            style={{
              border:
                selectedMateria?.id === materia.id
                  ? `2px solid ${ColorsDoc.primary}`
                  : "1px solid #E5E7EB",
              cursor: "pointer",
            }}
          >
            <SubjectHeader
              style={{
                background: `linear-gradient(135deg, ${ColorsDoc.primary} 0%, ${ColorsDoc.primary100} 100%)`,
              }}
            >
              <Badge>{materia.codigo}</Badge>
              <Badge>{materia.semestre}</Badge>
              {materia.proyectosActivos > 0 && (
                <Badge style={{ background: "#4ECDC4" }}>
                  {materia.proyectosActivos} proyectos activos
                </Badge>
              )}
            </SubjectHeader>

            <SubjectImage src={materia.imagen} alt={materia.nombre} />

            <SubjectContent>
              <SubjectTitle>{materia.nombre}</SubjectTitle>
              <SubjectInfo>
                <InfoItem>
                  <Users size={16} />
                  {materia.estudiantes} estudiantes
                </InfoItem>
                <InfoItem>
                  <Clock size={16} />
                  {materia.horario}
                </InfoItem>
                <InfoItem>
                  <Book size={16} />
                  {materia.semestre}
                </InfoItem>
                <InfoItem>
                  <Calendar size={16} />
                  {materia.aula}
                </InfoItem>
              </SubjectInfo>

              <ActionButtons>
                <ActionButton style={{ background: ColorsDoc.primary }}>
                  <FileText size={18} />
                  Ver reportes
                </ActionButton>
                <ActionButton style={{ background: ColorsDoc.secondary }}>
                  <BarChart size={18} />
                  Rúbricas de proyectos
                </ActionButton>
              </ActionButtons>
            </SubjectContent>
          </SubjectCard>
        ))}
      </SubjectsGrid>

      {/* Detalle de la materia seleccionada */}
      {selectedMateria && (
        <DetailSection>
          <DetailHeader>
            <h3>Detalle de proyectos para {selectedMateria.nombre}</h3>
            <small>
              Proyectos, rúbricas y reportes asociados a la materia.
            </small>
          </DetailHeader>

          <DetailGrid>
            <DetailCard>
              <DetailTitle>Proyectos de la materia</DetailTitle>
              {selectedMateria.proyectos?.map((p) => (
                <DetailItem key={p.id}>
                  <div>
                    <strong>{p.titulo}</strong>
                    <DetailMeta>{p.estado}</DetailMeta>
                  </div>
                  <DetailProgress>
                    <DetailProgressBar>
                      <DetailProgressFill style={{ width: `${p.avance}%` }} />
                    </DetailProgressBar>
                    <DetailProgressLabel>{p.avance}%</DetailProgressLabel>
                  </DetailProgress>
                </DetailItem>
              ))}
            </DetailCard>

            <DetailCard>
              <DetailTitle>Rúbricas de proyectos</DetailTitle>
              {selectedMateria.rubricasProyecto?.map((r) => (
                <DetailItem key={r.id}>
                  <div>
                    <strong>{r.nombre}</strong>
                    <DetailMeta>
                      {r.items} ítems • Actualizada {r.ultimaActualizacion}
                    </DetailMeta>
                  </div>
                </DetailItem>
              ))}
            </DetailCard>

            <DetailCard>
              <DetailTitle>Reportes generados</DetailTitle>
              {selectedMateria.reportes?.map((rep) => (
                <DetailItem key={rep.id}>
                  <div>
                    <strong>{rep.titulo}</strong>
                    <DetailMeta>{rep.fecha}</DetailMeta>
                  </div>
                </DetailItem>
              ))}
            </DetailCard>
          </DetailGrid>
        </DetailSection>
      )}

      {/* Malla + “docentes/carga” de la carrera del director */}
      <ExtraSection>
        <TwoColumnGrid>
          <TableWrapper>
            <SectionTitle>Materias de la {config.carreraNombre}</SectionTitle>
            <SimpleTable>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Materia</th>
                  <th>Semestre</th>
                  <th>Modalidad</th>
                </tr>
              </thead>
              <tbody>
                {carreraMaterias.map((m) => (
                  <tr key={m.codigo}>
                    <td>{m.codigo}</td>
                    <td>{m.nombre}</td>
                    <td>{m.semestre}</td>
                    <td>{m.modalidad}</td>
                  </tr>
                ))}
              </tbody>
            </SimpleTable>
          </TableWrapper>

          <TableWrapper>
            <SectionTitle>Carga de la dirección / docentes</SectionTitle>
            <SimpleTable>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Materias</th>
                  <th>Horas / semana</th>
                  <th>Proyectos dirigidos</th>
                </tr>
              </thead>
              <tbody>
                {docentesCarga.map((d) => (
                  <tr key={d.id}>
                    <td>{d.nombre}</td>
                    <td>{d.materias.join(", ")}</td>
                    <td>{d.horasSemana}</td>
                    <td>{d.proyectosDirigidos}</td>
                  </tr>
                ))}
              </tbody>
            </SimpleTable>
          </TableWrapper>
        </TwoColumnGrid>
      </ExtraSection>
    </>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "entregas":
        return (
          <EntregasDocente materia={selectedMateria} ColorsDoc={ColorsDoc} />
        );
      case "revision":
        return (
          <RevisionDocente materia={selectedMateria} ColorsDoc={ColorsDoc} />
        );
      case "rubricas":
        return (
          <RubricasDocente materia={selectedMateria} ColorsDoc={ColorsDoc} />
        );
      default:
        return renderMateriasTab();
    }
  };

  return (
    <Container>
      <CardHeader
        ColorsMa={ColorsDoc}
        title={`Materias`}
      />

      <TabsContainer>
        <Tab
          active={activeTab === "materias"}
          onClick={() => setActiveTab("materias")}
          style={{
            borderBottom:
              activeTab === "materias"
                ? `3px solid ${ColorsDoc.primary}`
                : "none",
          }}
        >
          <Book size={20} />
          Materias
        </Tab>
        <Tab
          active={activeTab === "entregas"}
          onClick={() => setActiveTab("entregas")}
          disabled={!selectedMateria}
          style={{
            borderBottom:
              activeTab === "entregas"
                ? `3px solid ${ColorsDoc.primary}`
                : "none",
          }}
        >
          <FileText size={20} />
          Entregas
        </Tab>
        <Tab
          active={activeTab === "revision"}
          onClick={() => setActiveTab("revision")}
          disabled={!selectedMateria}
          style={{
            borderBottom:
              activeTab === "revision"
                ? `3px solid ${ColorsDoc.primary}`
                : "none",
          }}
        >
          <Edit size={20} />
          Revisión
        </Tab>
        <Tab
          active={activeTab === "rubricas"}
          onClick={() => setActiveTab("rubricas")}
          disabled={!selectedMateria}
          style={{
            borderBottom:
              activeTab === "rubricas"
                ? `3px solid ${ColorsDoc.primary}`
                : "none",
          }}
        >
          <BarChart size={20} />
          Rúbricas
        </Tab>
      </TabsContainer>

      <ContentSection>{renderContent()}</ContentSection>
    </Container>
  );
};

export default MateriasDi;

// ================== Estilos locales (solo para lo nuevo) ==================

const DetailSection = styled.div`
  margin-top: 1.5rem;
  padding: 1rem 1.2rem;
  border-radius: 16px;
  background: #f9fafb;
`;

const DetailHeader = styled.div`
  margin-bottom: 0.75rem;
  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
  }
  small {
    font-size: 12px;
    color: #6b7280;
  }
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 0.75rem;
`;

const DetailCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 0.75rem 0.9rem;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
  font-size: 13px;
`;

const DetailTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  font-size: 14px;
  font-weight: 600;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;
`;

const DetailMeta = styled.div`
  font-size: 11px;
  color: #6b7280;
`;

const DetailProgress = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 80px;
`;

const DetailProgressBar = styled.div`
  flex: 1;
  height: 6px;
  border-radius: 999px;
  background: #e5e7eb;
  overflow: hidden;
`;

const DetailProgressFill = styled.div`
  height: 100%;
  background: #10b981;
`;

const DetailProgressLabel = styled.span`
  font-size: 11px;
  color: #374151;
`;

// Bloque “malla + docentes”

const ExtraSection = styled.div`
  margin-top: 2rem;
`;

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const TableWrapper = styled.div`
  margin-top: 0;
`;

const SectionTitle = styled.h3`
  margin: 0 0 0.75rem 0;
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

const SimpleTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  thead {
    background: #f9fafb;
  }
  th,
  td {
    padding: 6px 8px;
    border-bottom: 1px solid #e5e7eb;
  }
  th {
    text-align: left;
    font-weight: 600;
    color: #6b7280;
  }
  tbody tr:nth-child(even) {
    background: #f9fafb;
  }
`;
