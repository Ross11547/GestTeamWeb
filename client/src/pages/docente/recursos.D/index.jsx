import React, { useState } from "react";
import {
  Container,
  HeaderRecursos,
  FilterBar,
  CategoryFilter,
  CategoryButton,
  SearchInput,
  ResourcesGrid,
  ResourceCard,
  ResourceIcon,
  ResourceInfo,
  ResourceTitle,
  ResourceMeta,
  ResourceActions,
  ActionButton,
  UploadSection,
  UploadButton,
  DropZone,
  StatsSection,
  StatCard,
  StatNumber,
  StatLabel
} from "../../../style/docente/recursosDStyled";
import { 
  FileText, Video, Image, Archive, Upload, Download, Eye, 
  Trash2, Edit, Search, Filter, FolderOpen, Cloud, Users 
} from "lucide-react";
import { useColors } from "../../../style/colors";

const RECURSOS_DATA = [
  {
    id: 1,
    nombre: "Presentación - Patrones de Diseño",
    tipo: "presentacion",
    materia: "Ingeniería de Software I",
    fecha: "2024-12-05",
    tamaño: "4.5 MB",
    descargas: 45,
    icono: FileText,
    color: "#3498DB"
  },
  {
    id: 2,
    nombre: "Video - Introducción a React",
    tipo: "video",
    materia: "Programación Avanzada",
    fecha: "2024-12-03",
    tamaño: "156 MB",
    descargas: 32,
    icono: Video,
    color: "#E74C3C"
  },
  {
    id: 3,
    nombre: "Ejercicios - Base de Datos",
    tipo: "documento",
    materia: "Bases de Datos Avanzadas",
    fecha: "2024-12-01",
    tamaño: "2.1 MB",
    descargas: 58,
    icono: FileText,
    color: "#3498DB"
  },
  {
    id: 4,
    nombre: "Diagramas UML - Arquitectura",
    tipo: "imagen",
    materia: "Arquitectura de Software",
    fecha: "2024-11-28",
    tamaño: "8.3 MB",
    descargas: 27,
    icono: Image,
    color: "#2ECC71"
  },
  {
    id: 5,
    nombre: "Proyecto Ejemplo - MVC",
    tipo: "archivo",
    materia: "Ingeniería de Software I",
    fecha: "2024-11-25",
    tamaño: "15.7 MB",
    descargas: 63,
    icono: Archive,
    color: "#9B59B6"
  }
];

const RecursosD = () => {
  const ColorsDoc = useColors();
  const [recursos, setRecursos] = useState(RECURSOS_DATA);
  const [filtroCategoria, setFiltroCategoria] = useState("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const categorias = [
    { id: "todos", label: "Todos", count: recursos.length },
    { id: "documento", label: "Documentos", count: recursos.filter(r => r.tipo === "documento" || r.tipo === "presentacion").length },
    { id: "video", label: "Videos", count: recursos.filter(r => r.tipo === "video").length },
    { id: "imagen", label: "Imágenes", count: recursos.filter(r => r.tipo === "imagen").length },
    { id: "archivo", label: "Archivos", count: recursos.filter(r => r.tipo === "archivo").length }
  ];

  const filteredRecursos = recursos.filter(recurso => {
    const matchesSearch = recurso.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          recurso.materia.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filtroCategoria === "todos") return matchesSearch;
    if (filtroCategoria === "documento") return (recurso.tipo === "documento" || recurso.tipo === "presentacion") && matchesSearch;
    return recurso.tipo === filtroCategoria && matchesSearch;
  });

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    // Lógica para manejar archivos
  };

  const stats = [
    { label: "Total Recursos", value: recursos.length, color: ColorsDoc.primary },
    { label: "Descargas Totales", value: "285", color: "#4ECDC4" },
    { label: "Espacio Usado", value: "187 MB", color: "#9B59B6" },
    { label: "Compartidos", value: "42", color: "#E67E22" }
  ];

  return (
    <Container>
      <HeaderRecursos style={{ background: `linear-gradient(135deg, ${ColorsDoc.primary} 0%, ${ColorsDoc.primary100} 100%)` }}>
        <div>
          <h1>Recursos Educativos</h1>
          <p>Gestiona y comparte material educativo con tus estudiantes</p>
        </div>
        
        <UploadButton>
          <Upload size={20} />
          Subir Recurso
        </UploadButton>
      </HeaderRecursos>

      <StatsSection>
        {stats.map((stat, index) => (
          <StatCard key={index}>
            <StatNumber style={{ color: stat.color }}>{stat.value}</StatNumber>
            <StatLabel>{stat.label}</StatLabel>
          </StatCard>
        ))}
      </StatsSection>

      <UploadSection>
        <DropZone
          isDragging={isDragging}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Cloud size={48} color={isDragging ? ColorsDoc.primary : "#CBD5E0"} />
          <h3>Arrastra archivos aquí</h3>
          <p>o haz clic para seleccionar archivos</p>
          <button style={{ background: ColorsDoc.primary }}>
            Seleccionar Archivos
          </button>
        </DropZone>
      </UploadSection>

      <FilterBar>
        <CategoryFilter>
          {categorias.map(cat => (
            <CategoryButton
              key={cat.id}
              active={filtroCategoria === cat.id}
              onClick={() => setFiltroCategoria(cat.id)}
              style={{ 
                borderBottom: filtroCategoria === cat.id ? `3px solid ${ColorsDoc.primary}` : 'none',
                color: filtroCategoria === cat.id ? ColorsDoc.primary : '#6b7280'
              }}
            >
              {cat.label}
              <span>{cat.count}</span>
            </CategoryButton>
          ))}
        </CategoryFilter>
        
        <SearchInput>
          <Search size={18} />
          <input
            type="text"
            placeholder="Buscar recursos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchInput>
      </FilterBar>

      <ResourcesGrid>
        {filteredRecursos.map(recurso => (
          <ResourceCard key={recurso.id}>
            <ResourceIcon style={{ background: `${recurso.color}15` }}>
              <recurso.icono size={32} color={recurso.color} />
            </ResourceIcon>
            
            <ResourceInfo>
              <ResourceTitle>{recurso.nombre}</ResourceTitle>
              <ResourceMeta>
                <span>{recurso.materia}</span>
                <span>•</span>
                <span>{recurso.tamaño}</span>
                <span>•</span>
                <span>{recurso.descargas} descargas</span>
              </ResourceMeta>
              <ResourceMeta style={{ marginTop: '0.5rem' }}>
                <span>{new Date(recurso.fecha).toLocaleDateString('es-ES')}</span>
              </ResourceMeta>
            </ResourceInfo>
            
            <ResourceActions>
              <ActionButton title="Ver">
                <Eye size={18} />
              </ActionButton>
              <ActionButton title="Editar">
                <Edit size={18} />
              </ActionButton>
              <ActionButton title="Descargar">
                <Download size={18} />
              </ActionButton>
              <ActionButton title="Eliminar" className="delete">
                <Trash2 size={18} />
              </ActionButton>
            </ResourceActions>
          </ResourceCard>
        ))}
      </ResourcesGrid>
    </Container>
  );
};

export default RecursosD;