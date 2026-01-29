import React, { useState, useRef } from "react";
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
  DropZone,
  StatsSection,
  StatCard,
  StatNumber,
  StatLabel
} from "../../../style/docente/recursosDStyled";
import {
  FileText,
  Video,
  Image,
  Archive,
  Download,
  Eye,
  Trash2,
  Edit,
  Search,
  Cloud
} from "lucide-react";
import { useColors } from "../../../style/colors";
import CardHeader from "../../../components/ui/cardHeader";
import { useUser } from "../../../context/useContext";

// ================== CONFIGS POR DIRECTOR (correo) ==================

// Director Ingeniería de Sistemas (Integrador III)
const SISTEMAS_RECURSOS = [
  {
    id: 1,
    nombre: "Guía de Proyecto Integrador III - GestTeam",
    tipo: "documento",
    materia: "Proyecto Integrador III",
    fecha: "2024-11-25",
    tamaño: "1.8 MB",
    descargas: 52,
    icono: FileText,
    color: "#3498DB"
  },
  {
    id: 2,
    nombre: "Plantilla Documento Final - Integrador III",
    tipo: "documento",
    materia: "Proyecto Integrador III",
    fecha: "2024-11-28",
    tamaño: "950 KB",
    descargas: 40,
    icono: FileText,
    color: "#3498DB"
  },
  {
    id: 3,
    nombre: "Video - Explicación Arquitectura GestTeam",
    tipo: "video",
    materia: "Proyecto Integrador III",
    fecha: "2024-12-01",
    tamaño: "210 MB",
    descargas: 33,
    icono: Video,
    color: "#E74C3C"
  },
  {
    id: 4,
    nombre: "Ejemplo de Modelo BD - GestTeam",
    tipo: "archivo",
    materia: "Proyecto Integrador III",
    fecha: "2024-12-03",
    tamaño: "12.4 MB",
    descargas: 61,
    icono: Archive,
    color: "#9B59B6"
  },
  {
    id: 5,
    nombre: "Diagramas UML - Casos de Uso",
    tipo: "imagen",
    materia: "Proyecto Integrador III",
    fecha: "2024-12-05",
    tamaño: "6.2 MB",
    descargas: 27,
    icono: Image,
    color: "#2ECC71"
  }
];

// Director Medicina (Anatomía)
const MEDICINA_RECURSOS = [
  {
    id: 1,
    nombre: "Presentación - Sistema Óseo",
    tipo: "documento",
    materia: "Anatomía Humana I",
    fecha: "2024-11-20",
    tamaño: "3.5 MB",
    descargas: 80,
    icono: FileText,
    color: "#3498DB"
  },
  {
    id: 2,
    nombre: "Atlas de Anatomía - Imágenes HD",
    tipo: "imagen",
    materia: "Anatomía Humana I",
    fecha: "2024-11-23",
    tamaño: "120 MB",
    descargas: 65,
    icono: Image,
    color: "#2ECC71"
  },
  {
    id: 3,
    nombre: "Video - Introducción a Disección",
    tipo: "video",
    materia: "Anatomía Humana I",
    fecha: "2024-11-25",
    tamaño: "340 MB",
    descargas: 49,
    icono: Video,
    color: "#E74C3C"
  },
  {
    id: 4,
    nombre: "Banco de Preguntas - Parcial 1",
    tipo: "documento",
    materia: "Anatomía Humana I",
    fecha: "2024-11-28",
    tamaño: "1.2 MB",
    descargas: 72,
    icono: FileText,
    color: "#3498DB"
  },
  {
    id: 5,
    nombre: "Material Complementario - Histología",
    tipo: "archivo",
    materia: "Anatomía Humana I",
    fecha: "2024-12-01",
    tamaño: "18.7 MB",
    descargas: 38,
    icono: Archive,
    color: "#9B59B6"
  }
];

// Config por defecto (si el correo no matchea)
const DEFAULT_RECURSOS = [
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

// =======================================================

const RecursosDi = () => {
  const ColorsDoc = useColors();
  const { user } = useUser();
  const [filtroCategoria, setFiltroCategoria] = useState("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Elegimos set de recursos según el correo del director
  const email = (user?.correo || user?.email || "").toLowerCase();

  let recursosIniciales = DEFAULT_RECURSOS;
  let materiaPorDefecto = "Materia";
  let headerText = "Gestión de recursos de la carrera";

  if (email.includes("cbbe.fabiolaevelyn.cadima.sa@unifranz.edu.bo") || email.includes("sis")) {
    recursosIniciales = SISTEMAS_RECURSOS;
    materiaPorDefecto = "Proyecto Integrador III";
    headerText =
      "Director de Ingeniería de Sistemas: recursos asociados a Integrador III.";
  } else if (email.includes("cbbe.shirley.guzman@unifranz.edu.bo") || email.includes("med")) {
    recursosIniciales = MEDICINA_RECURSOS;
    materiaPorDefecto = "Anatomía Humana I";
    headerText =
      "Director de Medicina: recursos asociados a Anatomía.";
  }

  const [recursos, setRecursos] = useState(recursosIniciales);

  const categorias = [
    { id: "todos", label: "Todos", count: recursos.length },
    {
      id: "documento",
      label: "Documentos",
      count: recursos.filter(
        (r) => r.tipo === "documento" || r.tipo === "presentacion"
      ).length
    },
    {
      id: "video",
      label: "Videos",
      count: recursos.filter((r) => r.tipo === "video").length
    },
    {
      id: "imagen",
      label: "Imágenes",
      count: recursos.filter((r) => r.tipo === "imagen").length
    },
    {
      id: "archivo",
      label: "Archivos",
      count: recursos.filter((r) => r.tipo === "archivo").length
    }
  ];

  const filteredRecursos = recursos.filter((recurso) => {
    const matchesSearch =
      recurso.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recurso.materia.toLowerCase().includes(searchQuery.toLowerCase());

    if (filtroCategoria === "todos") return matchesSearch;
    if (filtroCategoria === "documento")
      return (
        (recurso.tipo === "documento" ||
          recurso.tipo === "presentacion") &&
        matchesSearch
      );
    return recurso.tipo === filtroCategoria && matchesSearch;
  });

  // ========= Upload 100% simulado =========

  const inferTipoFromFile = (file) => {
    const name = file.name.toLowerCase();
    if (name.match(/\.(mp4|mov|avi|mkv)$/)) return "video";
    if (name.match(/\.(png|jpg|jpeg|gif|webp)$/)) return "imagen";
    if (name.match(/\.(zip|rar|7z)$/)) return "archivo";
    // pdf, doc, docx, ppt...
    return "documento";
  };

  const getIconAndColor = (tipo) => {
    switch (tipo) {
      case "video":
        return { icon: Video, color: "#E74C3C" };
      case "imagen":
        return { icon: Image, color: "#2ECC71" };
      case "archivo":
        return { icon: Archive, color: "#9B59B6" };
      case "presentacion":
      case "documento":
      default:
        return { icon: FileText, color: "#3498DB" };
    }
  };

  const formatSize = (bytes) => {
    if (!bytes && bytes !== 0) return "—";
    const mb = bytes / (1024 * 1024);
    if (mb < 1) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${mb.toFixed(1)} MB`;
  };

  const handleFiles = (files) => {
    const now = new Date();
    const nuevos = Array.from(files).map((file, idx) => {
      const tipo = inferTipoFromFile(file);
      const { icon, color } = getIconAndColor(tipo);
      return {
        id: Date.now() + idx,
        nombre: file.name,
        tipo,
        materia: materiaPorDefecto,
        fecha: now.toISOString().slice(0, 10),
        tamaño: formatSize(file.size),
        descargas: Math.floor(Math.random() * 20), // simulado
        icono: icon,
        color
      };
    });

    setRecursos((prev) => [...nuevos, ...prev]);
  };

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
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
      e.target.value = "";
    }
  };

  const openFileDialog = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  // ========= Acciones simuladas de cada recurso =========

  const handleVer = (recurso) => {
    console.log("Ver recurso:", recurso);
    alert(`Simulación: abrir vista previa de\n${recurso.nombre}`);
  };

  const handleEditar = (recurso) => {
    console.log("Editar recurso:", recurso);
    alert(`Simulación: editar metadatos de\n${recurso.nombre}`);
  };

  const handleDescargar = (recurso) => {
    console.log("Descargar recurso:", recurso);
    alert(`Simulación: descarga iniciada de\n${recurso.nombre}`);
  };

  const handleEliminar = (recurso) => {
    if (window.confirm(`¿Eliminar el recurso "${recurso.nombre}"?`)) {
      setRecursos((prev) => prev.filter((r) => r.id !== recurso.id));
    }
  };

  // ========= Stats dinámicas según recursos =========

  const totalRecursos = recursos.length;
  const totalDescargas = recursos.reduce(
    (sum, r) => sum + (Number(r.descargas) || 0),
    0
  );
  const espacioUsadoMB = recursos.reduce((sum, r) => {
    const match = /([\d.]+)\s*MB/i.exec(r.tamaño || "");
    if (match) {
      return sum + parseFloat(match[1]);
    }
    return sum;
  }, 0);

  const stats = [
    { label: "Total Recursos", value: totalRecursos, color: ColorsDoc.primary },
    { label: "Descargas Totales", value: totalDescargas, color: "#4ECDC4" },
    {
      label: "Espacio Aproximado",
      value: `${espacioUsadoMB.toFixed(1)} MB`,
      color: "#9B59B6"
    },
    {
      label: "Recursos Compartidos",
      value: Math.max(Math.floor(totalRecursos * 0.7), 0),
      color: "#E67E22"
    }
  ];

  return (
    <Container>
      <CardHeader
        ColorsMa={ColorsDoc}
        title="Gestión de Recursos"
      />

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
          onClick={openFileDialog}
        >
          <Cloud
            size={48}
            color={isDragging ? ColorsDoc.primary : "#CBD5E0"}
          />
          <h3>Arrastra archivos aquí</h3>
          <p>o haz clic para seleccionar archivos</p>
          <button
            type="button"
            style={{ background: ColorsDoc.primary }}
            onClick={openFileDialog}
          >
            Seleccionar Archivos
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            style={{ display: "none" }}
            onChange={handleFileSelect}
          />
        </DropZone>
      </UploadSection>

      <FilterBar>
        <CategoryFilter>
          {categorias.map((cat) => (
            <CategoryButton
              key={cat.id}
              active={filtroCategoria === cat.id}
              onClick={() => setFiltroCategoria(cat.id)}
              style={{
                borderBottom:
                  filtroCategoria === cat.id
                    ? `3px solid ${ColorsDoc.primary}`
                    : "none",
                color:
                  filtroCategoria === cat.id ? ColorsDoc.primary : "#6b7280"
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
        {filteredRecursos.map((recurso) => (
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
              <ResourceMeta style={{ marginTop: "0.5rem" }}>
                <span>
                  {new Date(recurso.fecha).toLocaleDateString("es-ES")}
                </span>
              </ResourceMeta>
            </ResourceInfo>

            <ResourceActions>
              <ActionButton title="Ver" onClick={() => handleVer(recurso)}>
                <Eye size={18} />
              </ActionButton>
              <ActionButton
                title="Editar"
                onClick={() => handleEditar(recurso)}
              >
                <Edit size={18} />
              </ActionButton>
              <ActionButton
                title="Descargar"
                onClick={() => handleDescargar(recurso)}
              >
                <Download size={18} />
              </ActionButton>
              <ActionButton
                title="Eliminar"
                className="delete"
                onClick={() => handleEliminar(recurso)}
              >
                <Trash2 size={18} />
              </ActionButton>
            </ResourceActions>
          </ResourceCard>
        ))}
      </ResourcesGrid>
    </Container>
  );
};

export default RecursosDi;
