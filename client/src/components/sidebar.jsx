// Roxy: Sidebar con saludo dinámico y herramientas agregables (Word, Excel, Canva, etc.)

import React, { useState } from "react";
import {
  Layout,
  Calendar,
  Mail,
  Bell,
  PlusCircle,
  ChevronsLeft,
  ChevronsRight,
  User,
  Trello,
  UserCircle,
  LogOut,
  CalendarDays,
  ChartBarBig,
} from "lucide-react";
import {
  GlobalStyle,
  AppContainer,
  Badge,
  CreateTaskButto2,
  CreateTaskButton,
  IconWrapper,
  MenuItem,
  MinimizedIconContainer,
  ProfileSection,
  SectionTitle,
  ServiceItem,
  ServiceSection,
  SidebarContent,
  SidebarWrapper,
  ToggleButton,
  colors,
  Profile,
  TitleMenu,
  FotoPerfil,
  Calen,
} from "../style/navbar";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../enums/routes/Routes";
import Foto from "../assets/img/Foto.jpg";
import { useUser } from "../context/useContext";
import { ColorsLogin } from "../style/colors";
import { useColors } from "../style/colors";
import styled from "styled-components";

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

const SidebarNavigation = ({ minimized, toggleSidebar }) => {
  const Colors = useColors();
  const [activeItem, setActiveItem] = useState("project");
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [showToolPicker, setShowToolPicker] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  const menuItems =
    user?.rol === "Estudiante"
      ? [
          {
            icon: <Layout size={20} />,
            label: "Inicio",
            key: "dashboard",
            route: ROUTES.DASHBOARD,
          },
          {
            icon: <Trello size={20} />,
            label: "Materias",
            key: "materias",
            route: ROUTES.MATERIA,
          },
          {
            icon: <Calendar size={20} />,
            label: "Proyectos",
            key: "proyectos",
            route: ROUTES.PROYECTO,
            extra: "+",
          },
          {
            icon: <Mail size={20} />,
            label: "Colaboraciones",
            key: "colaboraciones",
            route: ROUTES.COLABORACION,
            badge: 3,
          },
          {
            icon: <Bell size={20} />,
            label: "Notificationes",
            key: "notificaciones",
            route: ROUTES.NOTIFICACION,
          },
          {
            icon: <Layout size={20} />,
            label: "Pizarra",
            key: "pizarra",
            route: ROUTES.PIZARRA,
          },
        ]
      : user?.rol === "Director"
      ? [
          {
            icon: <ChartBarBig size={20} />,
            label: "Dashboard",
            key: "dashboard",
            route: ROUTES.DASHBOARDDI,
          },
          {
            icon: <ChartBarBig size={20} />,
            label: "Materias",
            key: "materias",
            route: ROUTES.MISMATERIASDI,
          },
          {
            icon: <ChartBarBig size={20} />,
            label: "Calendario",
            key: "calendario",
            route: ROUTES.CALENDARIODI,
          },
          {
            icon: <ChartBarBig size={20} />,
            label: "Notificaciones",
            key: "notificaciones",
            route: ROUTES.NOTIFICACIONESDI,
          },
          {
            icon: <ChartBarBig size={20} />,
            label: "IA Plagio",
            key: "iaplagio",
            route: ROUTES.PLAGIODI,
          },
          {
            icon: <ChartBarBig size={20} />,
            label: "Colaboraciones",
            key: "colaboraciones",
            route: ROUTES.COLABORACIONESDI,
          },
          {
            icon: <ChartBarBig size={20} />,
            label: "Pizarra",
            key: "pizarra",
            route: ROUTES.PIZARRADI,
          },
          {
            icon: <ChartBarBig size={20} />,
            label: "Reportes",
            key: "reportes",
            route: ROUTES.REPORTESDI,
          },
        ]
      : user?.rol === "Docente"
      ? [
          {
            icon: <ChartBarBig size={20} />,
            label: "Dashboard",
            key: "dashboard",
            route: ROUTES.DASHBOARDDOCENTE,
          },
          {
            icon: <ChartBarBig size={20} />,
            label: "Materias",
            key: "materias",
            route: ROUTES.MISMATERIAS,
          },
          {
            icon: <ChartBarBig size={20} />,
            label: "Calendario",
            key: "calendario",
            route: ROUTES.CALENDARIODOC,
          },
          {
            icon: <ChartBarBig size={20} />,
            label: "Notificaciones",
            key: "notificaciones",
            route: ROUTES.NOTIFICACIONESDOC,
          },
          {
            icon: <ChartBarBig size={20} />,
            label: "IA Plagio",
            key: "iaplagio",
            route: ROUTES.PLAGIO,
          },
          {
            icon: <ChartBarBig size={20} />,
            label: "Colaboraciones",
            key: "colaboraciones",
            route: ROUTES.COLABORACIONES,
          },
          {
            icon: <ChartBarBig size={20} />,
            label: "Pizarra",
            key: "pizarra",
            route: ROUTES.PIZARRADOC,
          },
        ]
      : [
          {
            icon: <ChartBarBig size={20} />,
            label: "Dashboard",
            key: "dashboard",
            route: ROUTES.DASHBOARDADMIN,
          },
          {
            icon: <Layout size={20} />,
            label: "Docentes",
            key: "docentes",
            route: ROUTES.DOCENTE,
          },
          {
            icon: <Trello size={20} />,
            label: "Alumnos",
            key: "alumno",
            route: ROUTES.USUARIO,
          },
          {
            icon: <Calendar size={20} />,
            label: "Facultades",
            key: "facultades",
            route: ROUTES.FACULTAD,
          },
          {
            icon: <Calendar size={20} />,
            label: "Carreras",
            key: "carreras",
            route: ROUTES.CARRERA,
          },
          {
            icon: <Calendar size={20} />,
            label: "Semestres",
            key: "semestres",
            route: ROUTES.SEMESTRE,
          },
          {
            icon: <Calendar size={20} />,
            label: "Materias",
            key: "materias",
            route: ROUTES.MATERIAS,
          },
          {
            icon: <UserCircle size={20} />,
            label: "Horarios",
            key: "horarios",
            route: ROUTES.HORARIO,
          },
          {
            icon: <UserCircle size={20} />,
            label: "Directores de carrera",
            key: "directoresCarreras",
            route: ROUTES.DIRECTOCARRERA,
          },
        ];

  const toggleMinimize = toggleSidebar;

  const handleCalendario = () => {
    navigate(ROUTES.CALENDARIOU);
  };

  const handleOpenTool = (tool) => {
    if (!tool?.url) return;
    window.open(tool.url, "_blank", "noopener,noreferrer");
  };

  const handleAddTool = (tool) => {
    if (services.some((s) => s.id === tool.id)) return;
    setServices((prev) => [...prev, tool]);
  };

  if (minimized) {
    return (
      <>
        <GlobalStyle />
        <AppContainer>
          <SidebarWrapper minimized={true}>
            <ToggleButton onClick={toggleMinimize} Colors={Colors}>
              <ChevronsRight size={20} color={Colors.primary} />
            </ToggleButton>
            <Profile>
              <FotoPerfil src={Foto} alt="Foto de perfil" />
            </Profile>

            <TitleMenu>
              <span>Menu</span>
            </TitleMenu>

            <MinimizedIconContainer>
              {menuItems.map((item) => (
                <div
                  key={item.key}
                  style={{ margin: "10px 0", opacity: 0.7, cursor: "pointer" }}
                >
                  {item.icon}
                </div>
              ))}
            </MinimizedIconContainer>
            <CreateTaskButto2 style={{ background: Colors.primary }}>
              +
            </CreateTaskButto2>
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
          <ToggleButton onClick={toggleMinimize} Colors={Colors}>
            <ChevronsLeft size={20} color={Colors.primary} />
          </ToggleButton>
          <SidebarContent minimized={false}>
            <ProfileSection>
              <FotoPerfil src={Foto} alt="Foto de perfil" />
              <div>
                <div style={{ color: colors.text.light, fontSize: "0.9em" }}>
                  {getGreeting()} 
                </div>
                <div style={{ fontWeight: "bold", color: colors.text.dark }}>
                  {user?.nombre} {user?.apellido}
                </div>
              </div>
            </ProfileSection>

            <div>
              <SectionTitle>
                <span>Menu</span>
              </SectionTitle>
            </div>

            {menuItems.map((item) => (
              <Link
                key={item.key}
                to={item.route}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem
                  Colors={Colors}
                  active={activeItem === item.key}
                  onClick={() => setActiveItem(item.key)}
                  dynamicColor={
                    user?.rol === "Admin"
                      ? ColorsLogin.secondary100
                      : Colors.primary100
                  }
                >
                  <IconWrapper active={activeItem === item.key}>
                    {item.icon}
                  </IconWrapper>
                  {item.label}
                  {item.badge && <Badge>{item.badge}</Badge>}
                  {item.extra && (
                    <span style={{ marginLeft: "auto" }}>{item.extra}</span>
                  )}
                </MenuItem>
              </Link>
            ))}

            {user?.rol === "Estudiante" ? (
              <>
                <SectionTitle>
                  <span>Herramientas</span>
                  <Calen Colors={Colors.primary} onClick={handleCalendario}>
                    <CalendarDays size={22} />
                  </Calen>
                </SectionTitle>

                <ServiceSection>
                  {services.map((service) => (
                    <ServiceItem
                      key={service.id}
                      onClick={() => handleOpenTool(service)}
                    >
                      <ToolDot style={{ background: Colors.primary100 }} />
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
                      color={Colors.primary100}
                      style={{ marginRight: "10px" }}
                    />
                    Añadir una herramienta
                  </ServiceItem>

                  {showToolPicker && (
                    <ToolPicker>
                      {AVAILABLE_TOOLS.map((tool) => {
                        const alreadyAdded = services.some(
                          (s) => s.id === tool.id
                        );
                        return (
                          <ToolButton
                            key={tool.id}
                            type="button"
                            disabled={alreadyAdded}
                            onClick={() => handleAddTool(tool)}
                            Colors={Colors}
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

                <CreateTaskButton Colors={Colors} onClick={() => logout()}>
                  <LogOut
                    size={24}
                    style={{ marginRight: "10px" }}
                    color={Colors.primary500}
                  />
                  Salir
                </CreateTaskButton>
              </>
            ) : (
              <>
                <CreateTaskButton Colors={Colors} onClick={() => logout()}>
                  <LogOut size={24} style={{ marginRight: "10px" }} />
                  Salir
                </CreateTaskButton>
              </>
            )}
          </SidebarContent>
        </SidebarWrapper>
      </AppContainer>
    </>
  );
};

export default SidebarNavigation;

// === estilos locales para el picker de herramientas ===

const ToolPicker = styled.div`
  margin-top: 8px;
  padding: 8px;
  border-radius: 12px;
  background: #f9fafb;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ToolButton = styled.button`
  border-radius: 999px;
  border: 1px solid ${({ Colors }) => Colors.primary100};
  padding: 6px 10px;
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
    background: ${({ Colors }) => Colors.primary100 + "20"};
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
