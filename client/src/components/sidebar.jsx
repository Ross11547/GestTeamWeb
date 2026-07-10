import React, { useMemo, useState } from "react";
import {
  Layout,
  Calendar,
  Mail,
  Bell,
  PlusCircle,
  ChevronsLeft,
  ChevronsRight,
  Trello,
  UserCircle,
  LogOut,
  CalendarDays,
  ChartBarBig,
  Users,
  UserCog,
  GraduationCap,
  Building2,
  BookOpen,
  Clock3,
  ClipboardList,
  FolderKanban,
  Boxes,
  ShieldCheck,
  Github,
  Tags,
  Gavel,
  Star,
  Download,
  Settings,
  SlidersHorizontal,
  CheckCircle2,
  ChevronRight,
  X,
} from "lucide-react";

import {
  GlobalStyle,
  AppContainer,
  Badge,
  SidebarContent,
  SidebarWrapper,
  ToggleButton,
  FotoPerfil,
  Calen,
  ServiceItem,
  ServiceSection,
} from "../style/navbar";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../enums/routes/Routes";
import Foto from "../assets/img/Foto.jpg";
import { useUser } from "../context/useContext";
import { useColors } from "../style/colors";
import styled from "styled-components";

const DEFAULT_THEME_COLORS = {
  primary: "#F89C5E",
  primary100: "#FFE1CC",
  primary200: "#FFC299",
  primary300: "#FFA366",
  primary400: "#F89C5E",
  primary500: "#F06724",
  primary600: "#E95A0C",
  primary700: "#CC4F0B",
  primary800: "#A84308",
  primary900: "#7A3106",
};

const AVAILABLE_TOOLS = [
  {
    id: "word",
    label: "Word",
    url: "https://office.live.com/start/Word.aspx",
  },
  {
    id: "excel",
    label: "Excel",
    url: "https://office.live.com/start/Excel.aspx",
  },
  {
    id: "powerpoint",
    label: "PowerPoint",
    url: "https://office.live.com/start/PowerPoint.aspx",
  },
  {
    id: "canva",
    label: "Canva",
    url: "https://www.canva.com/",
  },
];

const resolveRoute = (routeKey, fallback = "#") => {
  return ROUTES?.[routeKey] || fallback;
};

const normalizeRoleName = (role) => {
  if (!role) return "";

  if (typeof role === "string") {
    return role.trim().toLowerCase();
  }

  if (typeof role?.nombre === "string") {
    return role.nombre.trim().toLowerCase();
  }

  return "";
};

const STUDENT_MENU_SECTIONS = [
  {
    id: "principal",
    title: "Principal",
    icon: <Layout size={21} />,
    alwaysOpen: true,
    items: [
      {
        icon: <Layout size={20} />,
        label: "Inicio",
        key: "dashboard",
        routeKey: "DASHBOARD",
        fallback: "/dashboard",
      },
      {
        icon: <Trello size={20} />,
        label: "Materias",
        key: "materias",
        routeKey: "MATERIA",
        fallback: "/materias",
      },
      {
        icon: <Calendar size={20} />,
        label: "Proyectos",
        key: "proyectos",
        routeKey: "PROYECTO",
        fallback: "/proyectos",
        extra: "+",
      },
      {
        icon: <Mail size={20} />,
        label: "Colaboraciones",
        key: "colaboraciones",
        routeKey: "COLABORACION",
        fallback: "/colaboraciones",
        badge: 3,
      },
      {
        icon: <Bell size={20} />,
        label: "Notificaciones",
        key: "notificaciones",
        routeKey: "NOTIFICACION",
        fallback: "/notificaciones",
      },
      {
        icon: <Layout size={20} />,
        label: "Pizarra",
        key: "pizarra",
        routeKey: "PIZARRA",
        fallback: "/pizarra",
      },
    ],
  },
];

const DIRECTOR_MENU_SECTIONS = [
  {
    id: "principal",
    title: "Principal",
    icon: <ChartBarBig size={21} />,
    alwaysOpen: true,
    items: [
      {
        icon: <ChartBarBig size={20} />,
        label: "Dashboard",
        key: "dashboard",
        routeKey: "DASHBOARDDI",
        fallback: "/director/dashboard",
      },
      {
        icon: <BookOpen size={20} />,
        label: "Materias",
        key: "materias",
        routeKey: "MISMATERIASDI",
        fallback: "/director/materias",
      },
      {
        icon: <CalendarDays size={20} />,
        label: "Calendario",
        key: "calendario",
        routeKey: "CALENDARIODI",
        fallback: "/director/calendario",
      },
      {
        icon: <Bell size={20} />,
        label: "Notificaciones",
        key: "notificaciones",
        routeKey: "NOTIFICACIONESDI",
        fallback: "/director/notificaciones",
      },
      {
        icon: <ShieldCheck size={20} />,
        label: "IA Plagio",
        key: "iaplagio",
        routeKey: "PLAGIODI",
        fallback: "/director/plagio",
      },
      {
        icon: <Mail size={20} />,
        label: "Colaboraciones",
        key: "colaboraciones",
        routeKey: "COLABORACIONESDI",
        fallback: "/director/colaboraciones",
      },
      {
        icon: <Layout size={20} />,
        label: "Pizarra",
        key: "pizarra",
        routeKey: "PIZARRADI",
        fallback: "/director/pizarra",
      },
      {
        icon: <ChartBarBig size={20} />,
        label: "Reportes",
        key: "reportes",
        routeKey: "REPORTESDI",
        fallback: "/director/reportes",
      },
    ],
  },
];

const DOCENTE_MENU_SECTIONS = [
  {
    id: "principal",
    title: "Principal",
    icon: <ChartBarBig size={21} />,
    alwaysOpen: true,
    items: [
      {
        icon: <ChartBarBig size={20} />,
        label: "Dashboard",
        key: "dashboard",
        routeKey: "DASHBOARDDOCENTE",
        fallback: "/docente/dashboard",
      },
      {
        icon: <BookOpen size={20} />,
        label: "Materias",
        key: "materias",
        routeKey: "MISMATERIAS",
        fallback: "/docente/materias",
      },
      {
        icon: <CalendarDays size={20} />,
        label: "Calendario",
        key: "calendario",
        routeKey: "CALENDARIODOC",
        fallback: "/docente/calendario",
      },
      {
        icon: <Bell size={20} />,
        label: "Notificaciones",
        key: "notificaciones",
        routeKey: "NOTIFICACIONESDOC",
        fallback: "/docente/notificaciones",
      },
      {
        icon: <ShieldCheck size={20} />,
        label: "IA Plagio",
        key: "iaplagio",
        routeKey: "PLAGIO",
        fallback: "/docente/plagio",
      },
      {
        icon: <Mail size={20} />,
        label: "Colaboraciones",
        key: "colaboraciones",
        routeKey: "COLABORACIONES",
        fallback: "/docente/colaboraciones",
      },
      {
        icon: <Layout size={20} />,
        label: "Pizarra",
        key: "pizarra",
        routeKey: "PIZARRADOC",
        fallback: "/docente/pizarra",
      },
    ],
  },
];

const ADMIN_MENU_SECTIONS = [
  {
    id: "principal",
    title: "Principal",
    icon: <ChartBarBig size={21} />,
    items: [
      {
        icon: <ChartBarBig size={20} />,
        label: "Dashboard",
        key: "dashboard",
        routeKey: "DASHBOARDADMIN",
        fallback: "/admin/dashboard",
      },
    ],
  },
  {
    id: "usuarios",
    title: "Usuarios",
    icon: <Users size={21} />,
    items: [
      {
        icon: <UserCog size={20} />,
        label: "Administradores",
        key: "administradores",
        routeKey: "ADMINISTRADORES",
        fallback: "/admin/administradores",
      },
      {
        icon: <Users size={20} />,
        label: "Docentes",
        key: "docentes",
        routeKey: "DOCENTE",
        fallback: "/admin/docentes",
      },
      {
        icon: <GraduationCap size={20} />,
        label: "Alumnos",
        key: "alumnos",
        routeKey: "USUARIO",
        fallback: "/admin/alumnos",
      },
      {
        icon: <UserCircle size={20} />,
        label: "Directores de carrera",
        key: "directoresCarreras",
        routeKey: "DIRECTOCARRERA",
        fallback: "/admin/directores-carrera",
      },
    ],
  },
  {
    id: "academica",
    title: "Gestión Académica",
    icon: <BookOpen size={21} />,
    items: [
      {
        icon: <Building2 size={20} />,
        label: "Instituciones",
        key: "instituciones",
        routeKey: "INSTITUCIONES_ADMIN",
        fallback: "/admin/instituciones",
      },
      {
        icon: <CalendarDays size={20} />,
        label: "Periodos académicos",
        key: "periodos",
        routeKey: "PERIODOS_ADMIN",
        fallback: "/admin/periodos-academicos",
      },
      {
        icon: <Building2 size={20} />,
        label: "Facultades",
        key: "facultades",
        routeKey: "FACULTAD",
        fallback: "/admin/facultades",
      },
      {
        icon: <BookOpen size={20} />,
        label: "Carreras",
        key: "carreras",
        routeKey: "CARRERA",
        fallback: "/admin/carreras",
      },
      {
        icon: <ClipboardList size={20} />,
        label: "Semestres",
        key: "semestres",
        routeKey: "SEMESTRE",
        fallback: "/admin/semestres",
      },
      {
        icon: <BookOpen size={20} />,
        label: "Materias",
        key: "materias",
        routeKey: "MATERIAS",
        fallback: "/admin/materias",
      },
      {
        icon: <Boxes size={20} />,
        label: "Clases / Paralelos",
        key: "clasesParalelos",
        routeKey: "CLASES_PARALELOS",
        fallback: "/admin/clases-paralelos",
      },
      {
        icon: <Clock3 size={20} />,
        label: "Horarios",
        key: "horarios",
        routeKey: "HORARIO",
        fallback: "/admin/horarios",
      },
      {
        icon: <ClipboardList size={20} />,
        label: "Inscripciones",
        key: "inscripciones",
        routeKey: "INSCRIPCIONES_ADMIN",
        fallback: "/admin/inscripciones",
      },
    ],
  },
  {
    id: "proyecto",
    title: "Proyecto Integrador",
    icon: <FolderKanban size={21} />,
    items: [
      {
        icon: <FolderKanban size={20} />,
        label: "Proyectos",
        key: "proyectosAdmin",
        routeKey: "PROYECTOS_ADMIN",
        fallback: "/admin/proyectos",
      },
      {
        icon: <Users size={20} />,
        label: "Equipos",
        key: "equiposAdmin",
        routeKey: "EQUIPOS_ADMIN",
        fallback: "/admin/equipos",
      },
      {
        icon: <CheckCircle2 size={20} />,
        label: "Hitos",
        key: "hitosAdmin",
        routeKey: "HITOS_ADMIN",
        fallback: "/admin/hitos",
      },
      {
        icon: <ClipboardList size={20} />,
        label: "Entregas",
        key: "entregasAdmin",
        routeKey: "ENTREGAS_ADMIN",
        fallback: "/admin/entregas",
      },
      {
        icon: <ShieldCheck size={20} />,
        label: "Revisiones",
        key: "revisionesAdmin",
        routeKey: "REVISIONES_ADMIN",
        fallback: "/admin/revisiones",
      },
      {
        icon: <ShieldCheck size={20} />,
        label: "Plagio / IA",
        key: "plagioAdmin",
        routeKey: "PLAGIO_ADMIN",
        fallback: "/admin/plagio-ia",
      },
      {
        icon: <Github size={20} />,
        label: "Repositorios GitHub",
        key: "githubAdmin",
        routeKey: "GITHUB_ADMIN",
        fallback: "/admin/repositorios-github",
      },
    ],
  },
  {
    id: "ferias",
    title: "Ferias",
    icon: <Calendar size={21} />,
    items: [
      {
        icon: <Calendar size={20} />,
        label: "Ferias",
        key: "feriasAdmin",
        routeKey: "FERIAS_ADMIN",
        fallback: "/admin/ferias",
      },
      {
        icon: <Tags size={20} />,
        label: "Categorías",
        key: "categoriasFeria",
        routeKey: "FERIA_CATEGORIAS",
        fallback: "/admin/ferias/categorias",
      },
      {
        icon: <Users size={20} />,
        label: "Equipos participantes",
        key: "equiposFeria",
        routeKey: "FERIA_EQUIPOS",
        fallback: "/admin/ferias/equipos",
      },
      {
        icon: <Gavel size={20} />,
        label: "Jurados",
        key: "juradosFeria",
        routeKey: "FERIA_JURADOS",
        fallback: "/admin/ferias/jurados",
      },
      {
        icon: <Star size={20} />,
        label: "Evaluaciones",
        key: "evaluacionesFeria",
        routeKey: "FERIA_EVALUACIONES",
        fallback: "/admin/ferias/evaluaciones",
      },
    ],
  },
  {
    id: "reportes",
    title: "Reportes",
    icon: <ChartBarBig size={21} />,
    items: [
      {
        icon: <ChartBarBig size={20} />,
        label: "Avance por semestre",
        key: "reporteAvance",
        routeKey: "REPORTE_AVANCE_SEMESTRE",
        fallback: "/admin/reportes/avance-semestre",
      },
      {
        icon: <ChartBarBig size={20} />,
        label: "Desempeño docente",
        key: "reporteDocentes",
        routeKey: "REPORTE_DOCENTES",
        fallback: "/admin/reportes/docentes",
      },
      {
        icon: <Star size={20} />,
        label: "Proyectos destacados",
        key: "reporteTopProyectos",
        routeKey: "REPORTE_TOP_PROYECTOS",
        fallback: "/admin/reportes/proyectos-destacados",
      },
      {
        icon: <ShieldCheck size={20} />,
        label: "Resumen de plagio",
        key: "reportePlagio",
        routeKey: "REPORTE_PLAGIO",
        fallback: "/admin/reportes/plagio",
      },
      {
        icon: <Download size={20} />,
        label: "Exportar PDF / Excel",
        key: "exportarReportes",
        routeKey: "REPORTE_EXPORTAR",
        fallback: "/admin/reportes/exportar",
      },
    ],
  },
  {
    id: "configuracion",
    title: "Configuración",
    icon: <Settings size={21} />,
    items: [
      {
        icon: <Settings size={20} />,
        label: "Roles",
        key: "roles",
        routeKey: "ROLES_ADMIN",
        fallback: "/admin/roles",
      },
      {
        icon: <SlidersHorizontal size={20} />,
        label: "Parámetros del sistema",
        key: "parametros",
        routeKey: "PARAMETROS_ADMIN",
        fallback: "/admin/parametros",
      },
      {
        icon: <CalendarDays size={20} />,
        label: "Periodo activo",
        key: "periodoActivo",
        routeKey: "PERIODO_ACTIVO",
        fallback: "/admin/periodo-activo",
      },
    ],
  },
];

function getMenuSectionsByRole(role) {
  const roleName = normalizeRoleName(role);

  if (roleName === "estudiante") return STUDENT_MENU_SECTIONS;
  if (roleName === "director") return DIRECTOR_MENU_SECTIONS;
  if (roleName === "docente") return DOCENTE_MENU_SECTIONS;

  return ADMIN_MENU_SECTIONS;
}

const SidebarNavigation = ({ minimized, toggleSidebar }) => {
  const rawThemeColors = useColors();
  const themeColors = rawThemeColors || DEFAULT_THEME_COLORS;
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeItem, setActiveItem] = useState("dashboard");
  const [services, setServices] = useState([]);
  const [showToolPicker, setShowToolPicker] = useState(false);
  const [compactPanelId, setCompactPanelId] = useState(null);

  const [openSections, setOpenSections] = useState({
    principal: false,
    usuarios: false,
    academica: false,
    proyecto: false,
    ferias: false,
    reportes: false,
    configuracion: false,
  });

  const roleName = normalizeRoleName(user?.rol);

  const isStudent = roleName === "estudiante";

  const isAdmin =
    roleName === "admin" ||
    roleName === "administrador" ||
    Number(user?.idRol) === 1 ||
    !["estudiante", "director", "docente"].includes(roleName);

  const menuSections = useMemo(() => {
    return getMenuSectionsByRole(user?.rol);
  }, [user?.rol]);

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  const isRouteActive = (item) => {
    const to = resolveRoute(item.routeKey, item.fallback);

    if (!to || to === "#") {
      return activeItem === item.key;
    }

    return location.pathname === to || location.pathname.startsWith(`${to}/`);
  };

  const sectionHasActiveItem = (section) => {
    return section.items?.some((item) => isRouteActive(item));
  };

  const toggleSection = (sectionId) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const handleCalendario = () => {
    navigate(resolveRoute("CALENDARIOU", "/calendario"));
  };

  const handleOpenTool = (tool) => {
    if (!tool?.url) return;
    window.open(tool.url, "_blank", "noopener,noreferrer");
  };

  const handleAddTool = (tool) => {
    if (services.some((service) => service.id === tool.id)) return;
    setServices((prev) => [...prev, tool]);
  };

  const handleQuickAction = () => {
    if (isAdmin) {
      navigate(resolveRoute("CLASES_PARALELOS", "/admin/clases-paralelos"));
      return;
    }

    if (isStudent) {
      navigate(resolveRoute("PROYECTO", "/proyectos"));
      return;
    }

    navigate(resolveRoute("DASHBOARDADMIN", "/admin/dashboard"));
  };

  const handleCompactSectionClick = (section) => {
    if (section.items.length === 1) {
      const item = section.items[0];
      const to = resolveRoute(item.routeKey, item.fallback);

      setActiveItem(item.key);
      setCompactPanelId(null);
      navigate(to);
      return;
    }

    setCompactPanelId((prev) => (prev === section.id ? null : section.id));
  };

  const renderMenuItem = (item) => {
    const to = resolveRoute(item.routeKey, item.fallback);
    const active = isRouteActive(item);

    return (
      <NavLinkItem
        key={item.key}
        to={to}
        $active={active}
        $colors={themeColors}
        onClick={() => {
          setActiveItem(item.key);
          setCompactPanelId(null);
        }}
      >
        <NavIcon $active={active} $colors={themeColors}>
          {item.icon}
        </NavIcon>

        <NavText>{item.label}</NavText>

        {item.badge && <Badge>{item.badge}</Badge>}

        {item.extra && <ExtraLabel>{item.extra}</ExtraLabel>}
      </NavLinkItem>
    );
  };

  if (minimized) {
    const selectedCompactSection = menuSections.find(
      (section) => section.id === compactPanelId
    );

    return (
      <>
        <GlobalStyle />

        <AppContainer>
          <SidebarWrapper minimized={true} style={{ overflow: "visible", zIndex: 50 }}>
            <CompactSidebar>
              <CompactTop>
                <CompactToggle
                  type="button"
                  onClick={toggleSidebar}
                  $colors={themeColors}
                >
                  <ChevronsRight size={22} />
                </CompactToggle>

                <CompactAvatar src={Foto} alt="Foto de perfil" />

                <CompactTitle>Menu</CompactTitle>
              </CompactTop>

              <CompactMain>
                {menuSections.map((section) => {
                  const activeSection = sectionHasActiveItem(section);
                  const selected = compactPanelId === section.id;

                  return (
                    <CompactSectionButton
                      key={section.id}
                      type="button"
                      title={section.title}
                      $active={activeSection || selected}
                      $colors={themeColors}
                      onClick={() => handleCompactSectionClick(section)}
                    >
                      {section.icon}

                      {section.items.length > 1 && (
                        <CompactIndicator
                          $active={selected}
                          $colors={themeColors}
                        />
                      )}
                    </CompactSectionButton>
                  );
                })}
              </CompactMain>

              <CompactBottom>
                <CompactActionButton
                  type="button"
                  onClick={handleQuickAction}
                  $colors={themeColors}
                  title="Acción rápida"
                >
                  <PlusCircle size={24} />
                </CompactActionButton>

                <CompactLogoutButton
                  type="button"
                  onClick={() => logout()}
                  $colors={themeColors}
                  title="Salir"
                >
                  <LogOut size={22} />
                </CompactLogoutButton>
              </CompactBottom>

              {selectedCompactSection && (
                <CompactFloatingPanel $colors={themeColors}>
                  <CompactPanelHeader>
                    <div>
                      <CompactPanelTitle>
                        {selectedCompactSection.title}
                      </CompactPanelTitle>

                      <CompactPanelSubtitle>
                        {selectedCompactSection.items.length} opciones
                      </CompactPanelSubtitle>
                    </div>

                    <CompactPanelClose
                      type="button"
                      onClick={() => setCompactPanelId(null)}
                    >
                      <X size={18} />
                    </CompactPanelClose>
                  </CompactPanelHeader>

                  <CompactPanelList>
                    {selectedCompactSection.items.map((item) => {
                      const to = resolveRoute(item.routeKey, item.fallback);
                      const active = isRouteActive(item);

                      return (
                        <CompactPanelItem
                          key={item.key}
                          to={to}
                          $active={active}
                          $colors={themeColors}
                          onClick={() => {
                            setActiveItem(item.key);
                            setCompactPanelId(null);
                          }}
                        >
                          <span>{item.icon}</span>
                          <strong>{item.label}</strong>
                        </CompactPanelItem>
                      );
                    })}
                  </CompactPanelList>
                </CompactFloatingPanel>
              )}
            </CompactSidebar>
          </SidebarWrapper>
        </AppContainer>
      </>
    );
  }

  return (
    <>
      <GlobalStyle />

      <AppContainer>
        <SidebarWrapper minimized={false}>
          <ToggleButton onClick={toggleSidebar} Colors={themeColors}>
            <ChevronsLeft size={20} color={themeColors.primary} />
          </ToggleButton>

          <SidebarContent
            minimized={false}
            style={{
              height: "100%",
              overflow: "hidden",
            }}
          >
            <SidebarLayout>
              <SidebarHeader>
                <ProfileBox>
                  <FotoPerfil src={Foto} alt="Foto de perfil" />

                  <ProfileInfo>
                    <GreetingText>{getGreeting()}</GreetingText>

                    <ProfileName>
                      {user?.nombre} {user?.apellido}
                    </ProfileName>
                  </ProfileInfo>
                </ProfileBox>
              </SidebarHeader>

              <SidebarMain>
                <MenuScroll>
                  {menuSections.map((section) => {
                    const isOpen =
                      Boolean(section.alwaysOpen) ||
                      Boolean(openSections[section.id]);

                    const activeSection = sectionHasActiveItem(section);

                    return (
                      <MenuGroup key={section.id}>
                        {section.alwaysOpen ? (
                          <SectionKicker>{section.title}</SectionKicker>
                        ) : (
                          <AccordionButton
                            type="button"
                            onClick={() => toggleSection(section.id)}
                            $colors={themeColors}
                            $active={activeSection || isOpen}
                          >
                            <AccordionLabel>
                              <SectionIcon
                                $colors={themeColors}
                                $active={activeSection || isOpen}
                              >
                                {section.icon}
                              </SectionIcon>

                              <span>{section.title}</span>
                            </AccordionLabel>

                            <AccordionIcon $active={isOpen}>
                              <ChevronRight size={17} />
                            </AccordionIcon>
                          </AccordionButton>
                        )}

                        {isOpen && (
                          <SectionItems $compact={!section.alwaysOpen}>
                            {section.items.map(renderMenuItem)}
                          </SectionItems>
                        )}
                      </MenuGroup>
                    );
                  })}

                  {isStudent && (
                    <StudentToolsBlock>
                      <ToolsHeader>
                        <span>Herramientas</span>

                        <Calen
                          Colors={themeColors.primary}
                          onClick={handleCalendario}
                        >
                          <CalendarDays size={22} />
                        </Calen>
                      </ToolsHeader>

                      <ServiceSection>
                        {services.map((service) => (
                          <ServiceItem
                            key={service.id}
                            onClick={() => handleOpenTool(service)}
                          >
                            <ToolDot
                              style={{ background: themeColors.primary100 }}
                            />

                            <span style={{ marginLeft: "10px" }}>
                              {service.label}
                            </span>
                          </ServiceItem>
                        ))}

                        <ServiceItem
                          onClick={() => setShowToolPicker((prev) => !prev)}
                        >
                          <PlusCircle
                            size={24}
                            color={themeColors.primary100}
                            style={{ marginRight: "10px" }}
                          />
                          Añadir una herramienta
                        </ServiceItem>

                        {showToolPicker && (
                          <ToolPicker>
                            {AVAILABLE_TOOLS.map((tool) => {
                              const alreadyAdded = services.some(
                                (service) => service.id === tool.id
                              );

                              return (
                                <ToolButton
                                  key={tool.id}
                                  type="button"
                                  disabled={alreadyAdded}
                                  onClick={() => handleAddTool(tool)}
                                  $colors={themeColors}
                                >
                                  {tool.label}

                                  {alreadyAdded && (
                                    <span className="added">Agregada</span>
                                  )}
                                </ToolButton>
                              );
                            })}
                          </ToolPicker>
                        )}
                      </ServiceSection>
                    </StudentToolsBlock>
                  )}
                </MenuScroll>
              </SidebarMain>

              <SidebarFooter>
                <LogoutButton
                  type="button"
                  onClick={() => logout()}
                  $colors={themeColors}
                >
                  <LogOut size={22} />
                  <span>Salir</span>
                </LogoutButton>
              </SidebarFooter>
            </SidebarLayout>
          </SidebarContent>
        </SidebarWrapper>
      </AppContainer>
    </>
  );
};

export default SidebarNavigation;

const SidebarLayout = styled.div`
  height: calc(100vh - 48px);
  max-height: calc(100vh - 48px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const SidebarHeader = styled.div`
  flex: 0 0 auto;
  padding-bottom: 18px;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const ProfileInfo = styled.div`
  min-width: 0;
`;

const GreetingText = styled.div`
  color: #6b7280;
  font-size: 0.92rem;
  font-weight: 500;
  line-height: 1.1;
`;

const ProfileName = styled.div`
  margin-top: 3px;
  color: #1f2937;
  font-size: 1.05rem;
  font-weight: 800;
  line-height: 1.15;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SidebarMain = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
`;

const MenuScroll = styled.div`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 2px 8px 22px 0;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const SidebarFooter = styled.div`
  flex: 0 0 auto;
  padding: 16px 0 2px 0;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    #ffffff 30%,
    #ffffff 100%
  );
  z-index: 5;
`;

const LogoutButton = styled.button`
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 18px;
  background: ${({ $colors }) => `${$colors.primary}14`};
  color: ${({ $colors }) => $colors.primary};
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 18px;
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
  transition: 0.18s ease;

  svg {
    stroke-width: 2.3;
  }

  &:hover {
    background: ${({ $colors }) => `${$colors.primary}22`};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const MenuGroup = styled.div`
  margin-bottom: 10px;
`;

const SectionKicker = styled.div`
  padding: 8px 12px 8px 12px;
  color: #6b7280;
  font-size: 0.72rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.09em;
`;

const AccordionButton = styled.button`
  width: 100%;
  min-height: 48px;
  border: none;
  border-radius: 18px;
  padding: 0 13px;
  background: ${({ $active, $colors }) =>
    $active ? `${$colors.primary}12` : "transparent"};
  color: ${({ $active, $colors }) => ($active ? $colors.primary : "#6b7280")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.74rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.075em;
  cursor: pointer;
  transition: 0.18s ease;

  &:hover {
    background: ${({ $colors }) => `${$colors.primary}10`};
    color: ${({ $colors }) => $colors.primary};
  }
`;

const AccordionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SectionIcon = styled.span`
  width: 28px;
  height: 28px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $active, $colors }) =>
    $active ? `${$colors.primary}18` : "#f3f4f6"};
  color: ${({ $active, $colors }) => ($active ? $colors.primary : "#6b7280")};
  flex-shrink: 0;

  svg {
    width: 18px;
    height: 18px;
  }
`;

const AccordionIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.18s ease;
  transform: ${({ $active }) => ($active ? "rotate(90deg)" : "rotate(0deg)")};
`;

const SectionItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: ${({ $compact }) => ($compact ? "7px 0 7px 12px" : "0")};
  margin-left: ${({ $compact }) => ($compact ? "7px" : "0")};
  border-left: ${({ $compact }) => ($compact ? "1px solid #eef2f7" : "none")};
`;

const NavLinkItem = styled(Link)`
  min-height: 44px;
  border-radius: 16px;
  padding: 0 13px;
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: ${({ $active, $colors }) => ($active ? $colors.primary : "#1f2937")};
  background: ${({ $active, $colors }) =>
    $active ? `${$colors.primary}14` : "transparent"};
  font-size: 0.96rem;
  font-weight: ${({ $active }) => ($active ? 800 : 600)};
  transition: 0.18s ease;

  &:hover {
    background: ${({ $colors }) => `${$colors.primary}10`};
    color: ${({ $colors }) => $colors.primary};
    transform: translateX(2px);
  }
`;

const NavIcon = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $active, $colors }) => ($active ? $colors.primary : "#6b7280")};
  background: ${({ $active, $colors }) =>
    $active ? `${$colors.primary}18` : "transparent"};
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
    stroke-width: ${({ $active }) => ($active ? 2.6 : 2.2)};
  }
`;

const NavText = styled.span`
  flex: 1;
  min-width: 0;
  white-space: normal;
  line-height: 1.2;
`;

const ExtraLabel = styled.span`
  margin-left: auto;
  font-weight: 900;
`;

const StudentToolsBlock = styled.div`
  margin-top: 14px;
`;

const ToolsHeader = styled.div`
  padding: 8px 12px;
  color: #6b7280;
  font-size: 0.72rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ToolPicker = styled.div`
  margin-top: 8px;
  padding: 8px;
  border-radius: 14px;
  background: #f9fafb;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ToolButton = styled.button`
  border-radius: 999px;
  border: 1px solid ${({ $colors }) => $colors.primary100};
  padding: 7px 11px;
  font-size: 0.8rem;
  background: #ffffff;
  color: #111827;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  .added {
    font-size: 0.7rem;
    color: #6b7280;
    margin-left: 6px;
  }

  &:hover:not(:disabled) {
    background: ${({ $colors }) => `${$colors.primary100}20`};
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

const ToolDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 999px;
  flex-shrink: 0;
`;

const CompactSidebar = styled.div`
  height: calc(100vh - 48px);
  max-height: calc(100vh - 48px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: visible;
`;

const CompactTop = styled.div`
  flex: 0 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CompactToggle = styled.button`
  width: 58px;
  height: 58px;
  border: none;
  border-radius: 999px;
  background: ${({ $colors }) => `${$colors.primary}12`};
  color: ${({ $colors }) => $colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.18s ease;

  &:hover {
    background: ${({ $colors }) => `${$colors.primary}22`};
  }
`;

const CompactAvatar = styled.img`
  width: 66px;
  height: 66px;
  border-radius: 20px;
  object-fit: cover;
  margin-top: 22px;
`;

const CompactTitle = styled.div`
  margin-top: 14px;
  color: #6b7280;
  font-size: 0.92rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.18em;
`;

const CompactMain = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  margin-top: 24px;
  padding-bottom: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  overflow-y: auto;
  overflow-x: visible;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    background: transparent;
  }
`;

const CompactSectionButton = styled.button`
  width: 56px;
  height: 56px;
  border: none;
  border-radius: 18px;
  background: ${({ $active, $colors }) =>
    $active ? `${$colors.primary}16` : "transparent"};
  color: ${({ $active, $colors }) => ($active ? $colors.primary : "#9ca3af")};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  transition: 0.18s ease;

  svg {
    stroke-width: ${({ $active }) => ($active ? 2.7 : 2.25)};
  }

  &:hover {
    background: ${({ $colors }) => `${$colors.primary}12`};
    color: ${({ $colors }) => $colors.primary};
    transform: translateX(2px);
  }
`;

const CompactIndicator = styled.span`
  position: absolute;
  right: 7px;
  top: 7px;
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: ${({ $active, $colors }) =>
    $active ? $colors.primary : "#d1d5db"};
`;

const CompactBottom = styled.div`
  flex: 0 0 auto;
  width: 100%;
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const CompactActionButton = styled.button`
  width: 58px;
  height: 58px;
  border: none;
  border-radius: 18px;
  background: ${({ $colors }) => $colors.primary};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.18s ease;
  box-shadow: 0 14px 26px ${({ $colors }) => `${$colors.primary}35`};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 32px ${({ $colors }) => `${$colors.primary}42`};
  }
`;

const CompactLogoutButton = styled.button`
  width: 58px;
  height: 46px;
  border: none;
  border-radius: 16px;
  background: ${({ $colors }) => `${$colors.primary}12`};
  color: ${({ $colors }) => $colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.18s ease;

  &:hover {
    background: ${({ $colors }) => `${$colors.primary}22`};
  }
`;

const CompactFloatingPanel = styled.div`
  position: absolute;
  left: calc(100% + 14px);
  top: 128px;
  width: 270px;
  max-height: calc(100vh - 180px);
  border-radius: 24px;
  padding: 14px;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid #eef2f7;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.14);
  backdrop-filter: blur(14px);
  z-index: 999;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    left: -7px;
    top: 34px;
    width: 14px;
    height: 14px;
    background: rgba(255, 255, 255, 0.96);
    border-left: 1px solid #eef2f7;
    border-bottom: 1px solid #eef2f7;
    transform: rotate(45deg);
  }
`;

const CompactPanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 4px 4px 12px 4px;
  border-bottom: 1px solid #f1f5f9;
`;

const CompactPanelTitle = styled.div`
  color: #1f2937;
  font-size: 0.98rem;
  font-weight: 900;
`;

const CompactPanelSubtitle = styled.div`
  margin-top: 2px;
  color: #9ca3af;
  font-size: 0.78rem;
  font-weight: 700;
`;

const CompactPanelClose = styled.button`
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 12px;
  background: #f8fafc;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: #f1f5f9;
  }
`;

const CompactPanelList = styled.div`
  max-height: calc(100vh - 260px);
  overflow-y: auto;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    background: transparent;
  }
`;

const CompactPanelItem = styled(Link)`
  min-height: 44px;
  border-radius: 15px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  gap: 11px;
  text-decoration: none;
  color: ${({ $active, $colors }) => ($active ? $colors.primary : "#334155")};
  background: ${({ $active, $colors }) =>
    $active ? `${$colors.primary}14` : "transparent"};
  transition: 0.18s ease;

  span {
    width: 28px;
    height: 28px;
    border-radius: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ $active, $colors }) =>
      $active ? `${$colors.primary}18` : "#f8fafc"};
    color: ${({ $active, $colors }) =>
      $active ? $colors.primary : "#64748b"};
    flex-shrink: 0;
  }

  strong {
    font-size: 0.9rem;
    font-weight: ${({ $active }) => ($active ? 900 : 700)};
    line-height: 1.2;
  }

  &:hover {
    background: ${({ $colors }) => `${$colors.primary}10`};
    color: ${({ $colors }) => $colors.primary};
  }
`;