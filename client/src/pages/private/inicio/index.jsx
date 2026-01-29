import React, { useState } from "react";
import {
  BookOpen,
  FileText,
  Lock,
  Search,
  Star,
  UserCircle,
  Users,
  X,
} from "lucide-react";
import {
  Container,
  Header,
  Title,
  SearchBar,
  TabList,
  Tab,
  IconWrapper,
  ProyectoCard,
  ProyectoImagen,
  ProyectoContent,
  StarsRow,
  ProyectoTitleRow,
  ProyectoTitle,
  TipoProyecto,
  InfoGrid,
  InfoBox,
  DocentesSection,
  DocentesGrid,
  DocenteTag,
  ProyectosGrid,
} from "../../../style/estudiante/styledInicio";
import { proyectosDestacados } from "../../../data/datosInicio";
import { Colors, ColorsEstu } from "../../../style/colors";
import styled from "styled-components";
import { useColors } from "../../../style/colors";
import CardHeader from "../../../components/ui/cardHeader";
import { Acciones } from "../../../style/estudiante/styledNotificacion";
const TABS = ["Todos", "Ingeniería", "Medicina", "Psicología"];

const PROJECTS = [
  {
    title: "Sistema de Energía Renovable",
    type: "Grupal",
    rating: 5,
    subject: "Energía Sostenible",
    students: ["Ana García", "Carlos López", "María Rodríguez"],
    teachers: ["Dr. Juan Pérez", "Dra. Laura Martínez"],
  },
  {
    title: "Optimización de Redes Neuronales",
    type: "Individual",
    rating: 5,
    subject: "Inteligencia Artificial",
    students: ["David Wilson"],
    teachers: ["Dr. Robert Smith"],
  },
  {
    title: "Estudio de Comportamiento Social",
    type: "Grupal",
    rating: 4,
    subject: "Psicología Social",
    students: ["Elena Martínez", "Fernando Ruiz"],
    teachers: ["Dra. Sofia Blanco"],
  },
  {
    title: "Desarrollo de Vacuna Experimental",
    type: "Individual",
    rating: 5,
    subject: "Inmunología",
    students: ["Gabriel Torres"],
    teachers: ["Dr. Michael Brown", "Dra. Sarah Johnson"],
  },
];

const Inicio = () => {
  const ColorsMed = useColors();
  const [activeTab, setActiveTab] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const filteredProjects = PROJECTS.filter(
    (project) =>
      (activeTab === "Todos" || project.subject.includes(activeTab)) &&
      (project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.subject.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  const [facultadActiva, setFacultadActiva] = useState(
    proyectosDestacados[0].facultad
  );
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        color={index < rating ? Colors.primary100 : Colors.greyLight}
      />
    ));
  };
  return (
    <Container>
      <CardHeader title="Proyectos Destacados">
        <Acciones>
          <div style={{ position: "relative" }}>
            <SearchBar
              type="text"
              placeholder="Buscar proyectos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconWrapper
              ColorsMed={ColorsMed}
              style={{
                position: "absolute",
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <Search size={20} />
            </IconWrapper>
          </div>
        </Acciones>
      </CardHeader>
      <TabList >
        {proyectosDestacados.map(({ facultad }) => (
          <Tab
            ColorsMed={ColorsMed}
            key={facultad}
            active={facultadActiva === facultad}
            onClick={() => setFacultadActiva(facultad)}
          >
            {facultad}
          </Tab>
        ))}
      </TabList>

      <ProyectosGrid>
        {proyectosDestacados
          .find(({ facultad }) => facultad === facultadActiva)
          ?.proyectos.map((proyecto) => (
            <ProyectoCard

              key={proyecto.id}
              onClick={() => setSelectedProject(proyecto)}
            >
              <ProyectoImagen src={proyecto.imagen} alt={proyecto.titulo} />
              <ProyectoContent>
                <StarsRow>{renderStars(4)}</StarsRow>
                <ProyectoTitleRow>
                  <ProyectoTitle>{proyecto.titulo}</ProyectoTitle>
                  <TipoProyecto tipo={proyecto.tipo}>
                    {proyecto.tipo}
                  </TipoProyecto>
                </ProyectoTitleRow>

                <InfoGrid>
                  <InfoBox ColorsMed={ColorsMed} type="materia" >
                    <h3>
                      <BookOpen size={16} /> Materia
                    </h3>
                    <p>{proyecto.materia}</p>
                  </InfoBox>
                  <InfoBox type="estudiantes">
                    <h3>
                      <Users size={16} /> Estudiantes
                    </h3>
                    <ul>
                      {proyecto.estudiantes.map((v, i) => (
                        <li key={i}>{v}</li>
                      ))}
                    </ul>
                  </InfoBox>
                </InfoGrid>

                <DocentesSection>
                  <h3>
                    <UserCircle size={16} /> Docentes
                  </h3>
                  <DocentesGrid>
                    {proyecto.docentes.map((docente) => (
                      <DocenteTag key={docente}>{docente}</DocenteTag>
                    ))}
                  </DocentesGrid>
                </DocentesSection>
              </ProyectoContent>
            </ProyectoCard>
          ))}
      </ProyectosGrid>
      <FloatingDetailContainer isOpen={!!selectedProject}>
        {selectedProject && (
          <>
            <DetailCloseButton onClick={() => setSelectedProject(null)}>
              <X size={24} />
            </DetailCloseButton>

            <ProjectTitle>{selectedProject.titulo}</ProjectTitle>

            <ProjectImage
              src={selectedProject.imagen}
              alt={selectedProject.titulo}
            />

            <DetailSection>
              <SectionTitle>Descripción</SectionTitle>
              <p style={{ color: "#6b7280", lineHeight: 1.6 }}>
                {selectedProject.descripcion}
              </p>
            </DetailSection>

            <DetailSection>
              <SectionTitle>Detalles del Proyecto</SectionTitle>
              <InfoRow>
                <BookOpen
                  size={18}
                  style={{ marginRight: 10, color: `${ColorsMed.primary}` }}
                />
                <span>
                  <strong>Materia:</strong> {selectedProject.materia}
                </span>
              </InfoRow>
              <InfoRow>
                <Users
                  size={18}
                  style={{ marginRight: 10, color: `${ColorsMed.primary}` }}
                />
                <span>
                  <strong>Tipo:</strong> {selectedProject.tipo}
                </span>
              </InfoRow>
            </DetailSection>

            <DetailSection>
              <SectionTitle>Equipo</SectionTitle>
              <InfoRow>
                <UserCircle
                  size={18}
                  style={{ marginRight: 10, color: `${ColorsMed.primary}` }}
                />
                <strong>Estudiantes:</strong>
              </InfoRow>
              {selectedProject.estudiantes.map((estudiante, index) => (
                <p key={index} style={{ color: "#6b7280", marginLeft: 30 }}>
                  {estudiante}
                </p>
              ))}

              <InfoRow style={{ marginTop: 15 }}>
                <UserCircle
                  size={18}
                  style={{ marginRight: 10, color: `${ColorsMed.primary}` }}
                />
                <strong>Docentes:</strong>
              </InfoRow>
              {selectedProject.docentes.map((docente, index) => (
                <p key={index} style={{ color: "#6b7280", marginLeft: 30 }}>
                  {docente}
                </p>
              ))}
            </DetailSection>

            <DetailSection>
              <SectionTitle>Documento del Proyecto</SectionTitle>
              <DocumentSimulation>
                <FileText size={48} color="#9ca3af" />
                <p style={{ color: "#6b7280", textAlign: "center" }}>
                  Documento del proyecto no disponible. El archivo completo está
                  protegido.
                </p>
                <AccessButton>
                  <Lock size={18} />
                  Solicitar Acceso
                </AccessButton>
              </DocumentSimulation>
            </DetailSection>
          </>
        )}
      </FloatingDetailContainer>
    </Container>
  );
};

export default Inicio;
const FloatingDetailContainer = styled.div`
  position: fixed;
  top: 0;
  right: ${(props) => (props.isOpen ? "0" : "-500px")};
  width: 500px;
  height: 100vh;
  background-color: #ffffff;
  box-shadow: -4px 0 30px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease-in-out;
  z-index: 100;
  overflow-y: auto;
  padding: 30px;
  font-family: "Inter", sans-serif;
`;

const DetailCloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  transition: color 0.3s ease;

  &:hover {
    color: #000000;
  }
`;

const ProjectTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 15px;
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 250px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  margin-bottom: 25px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.4)
    );
    border-radius: 12px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 15px;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 10px;
`;

const DetailSection = styled.div`
  margin-bottom: 25px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: #4b5563;
`;

const DocumentSimulation = styled.div`
  background-color: #f9fafb;
  border: 1px dashed #d1d5db;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const AccessButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2563eb;
  }
`;
