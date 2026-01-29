// Roxy: Calendario de estudiante enfocado en proyectos (solo useColors)

import React, { useState } from "react";
import { Calendar as BigCalendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Users,
  BookOpen,
  AlertCircle,
  CheckCircle,
  Star,
  Eye,
  EyeOff,
  Bell,
  Activity,
} from "lucide-react";
import "dayjs/locale/es";
import { toast } from "sonner";
import {
  PageWrapper,
  Container,
  PageHeader,
  Title,
} from "../../../style/generalStyle";
import styled from "styled-components";
import { useColors } from "../../../style/colors";
import CardHeader from "../../../components/ui/cardHeader";

dayjs.locale("es");

const CalendarioUni = () => {
  const theme = useColors(); // paleta desde BD
  const localizer = dayjsLocalizer(dayjs);

  const [viewFilter, setViewFilter] = useState("todos"); // todos, personales, colaborativos, entregas
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Eventos de ejemplo SOLO de proyectos (simulan venir de la BD)
  const [eventos, setEventos] = useState([
    {
      id: 1,
      title: "Sprint planning Proyecto Integrador",
      start: dayjs().add(1, "day").hour(9).minute(0).toDate(),
      end: dayjs().add(1, "day").hour(10).minute(30).toDate(),
      type: "reunion",
      proyecto: "GestTeam - Gestión académica",
      lugar: "Sala proyectos / Meet",
      descripcion: "Definir tareas del sprint 3",
      publico: true, // colaborativo
    },
    {
      id: 2,
      title: "Entrega Hito 3 - Backend",
      start: dayjs().add(3, "day").hour(23).minute(59).toDate(),
      end: dayjs().add(3, "day").hour(23).minute(59).toDate(),
      type: "entrega",
      proyecto: "GestTeam - Backend Node + Prisma",
      descripcion: "Subir avance al repositorio y preparar demo",
      publico: true,
    },
    {
      id: 3,
      title: "Demo interna panel estudiante",
      start: dayjs().add(5, "day").hour(15).minute(0).toDate(),
      end: dayjs().add(5, "day").hour(16).minute(0).toDate(),
      type: "proyecto",
      proyecto: "GestTeam - Frontend React",
      lugar: "Laboratorio 301",
      descripcion: "Mostrar flujo completo estudiante",
      publico: true,
    },
    {
      id: 4,
      title: "Notas personales: defender arquitectura",
      start: dayjs().add(2, "day").hour(19).minute(0).toDate(),
      end: dayjs().add(2, "day").hour(20).minute(0).toDate(),
      type: "nota",
      proyecto: "Apuntes defensa",
      descripcion: "Recordar enfatizar IA como apoyo, no reemplazo",
      publico: false, // solo yo
    },
    {
      id: 5,
      title: "Reunión equipo feria de proyectos",
      start: dayjs().add(7, "day").hour(17).minute(0).toDate(),
      end: dayjs().add(7, "day").hour(18).minute(30).toDate(),
      type: "feria",
      proyecto: "Feria de proyectos UNIFRANZ",
      lugar: "Auditorio principal",
      descripcion: "Definir stand, materiales y pitch",
      publico: true,
    },
  ]);

  const [nuevoEvento, setNuevoEvento] = useState({
    title: "",
    fecha: "",
    horaInicio: "09:00",
    horaFin: "10:00",
    type: "proyecto",
    proyecto: "",
    lugar: "",
    descripcion: "",
    publico: false, // por defecto personal
  });

  const eventosPrivados = eventos.filter((e) => !e.publico);
  const eventosPublicos = eventos.filter((e) => e.publico);

  const eventosFiltrados = eventos.filter((evento) => {
    if (viewFilter === "personales") return !evento.publico;
    if (viewFilter === "colaborativos") return evento.publico;
    if (viewFilter === "entregas") return evento.type === "entrega";
    return true;
  });

  const proximasActividades = eventosFiltrados
    .filter((evento) => dayjs(evento.start).isAfter(dayjs()))
    .sort((a, b) => dayjs(a.start) - dayjs(b.start))
    .slice(0, 5);

  const actividadesRecientes = eventosFiltrados
    .filter(
      (evento) =>
        dayjs(evento.start).isBefore(dayjs()) &&
        dayjs(evento.start).isAfter(dayjs().subtract(7, "day"))
    )
    .sort((a, b) => dayjs(b.start) - dayjs(a.start))
    .slice(0, 5);

  const getEventColor = (evento) => {
    const map = {
      proyecto: theme.primary,
      entrega: "#ea580c",
      reunion: "#7c3aed",
      feria: "#0ea5e9",
      nota: "#64748b",
    };
    return map[evento.type] || theme.primary;
  };

  const getEventIcon = (type) => {
    const icons = {
      proyecto: BookOpen,
      entrega: AlertCircle,
      reunion: Users,
      feria: Star,
      nota: CheckCircle,
    };
    return icons[type] || Activity;
  };

  const formatearFechaCompleta = (fecha) => {
    return dayjs(fecha).format(
      "dddd, DD [de] MMMM [de] YYYY [a las] HH:mm"
    );
  };

  const components = {
    toolbar: ({ label, onNavigate }) => (
      <CalendarToolbar>
        <NavigationSection>
          <NavButton
            theme={theme}
            onClick={() => onNavigate("PREV")}
          >
            <ChevronLeft size={20} />
          </NavButton>
          <MonthLabel>{label.toUpperCase()}</MonthLabel>
          <NavButton
            theme={theme}
            onClick={() => onNavigate("NEXT")}
          >
            <ChevronRight size={20} />
          </NavButton>
        </NavigationSection>

        <ActionsSection>
          <FilterSelect
            value={viewFilter}
            onChange={(e) => setViewFilter(e.target.value)}
          >
            <option value="todos">Todos los eventos</option>
            <option value="personales">Solo personales</option>
            <option value="colaborativos">Grupales</option>
            <option value="entregas">Entregas importantes</option>
          </FilterSelect>
          <AddEventButton theme={theme} onClick={() => setShowCreateModal(true)}>
            Nueva Fecha
          </AddEventButton>
        </ActionsSection>
      </CalendarToolbar>
    ),
    event: ({ event }) => {
      const IconComponent = getEventIcon(event.type);
      return (
        <EventContainer>
          <IconComponent size={12} />
          <EventTitleSpan>{event.title}</EventTitleSpan>
          {!event.publico && <EyeOff size={10} />}
        </EventContainer>
      );
    },
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!nuevoEvento.title || !nuevoEvento.fecha) {
      toast.error("Título y fecha son obligatorios");
      return;
    }

    const [iniH, iniM] = nuevoEvento.horaInicio.split(":").map(Number);
    const [finH, finM] = nuevoEvento.horaFin.split(":").map(Number);

    const start = dayjs(nuevoEvento.fecha)
      .hour(iniH)
      .minute(iniM)
      .toDate();
    const end = dayjs(nuevoEvento.fecha)
      .hour(finH)
      .minute(finM)
      .toDate();

    const nuevo = {
      id: Date.now(),
      title: nuevoEvento.title,
      start,
      end,
      type: nuevoEvento.type,
      proyecto: nuevoEvento.proyecto,
      lugar: nuevoEvento.lugar,
      descripcion: nuevoEvento.descripcion,
      publico: nuevoEvento.publico,
    };

    setEventos((prev) => [...prev, nuevo]);
    setShowCreateModal(false);
    setNuevoEvento({
      title: "",
      fecha: "",
      horaInicio: "09:00",
      horaFin: "10:00",
      type: "proyecto",
      proyecto: "",
      lugar: "",
      descripcion: "",
      publico: false,
    });
    toast.success("Evento agregado a tu calendario de proyectos");
  };

  const proyectosUnicos = Array.from(
    new Set(eventosFiltrados.map((e) => e.proyecto).filter(Boolean))
  );

  const entregasFuturas = eventosFiltrados.filter(
    (e) => e.type === "entrega" && dayjs(e.start).isAfter(dayjs())
  );

  return (
    <PageWrapper>
      <Container wide>
        <CardHeader title="Calendario" />

        <CalendarLayout>
          {/* Calendario principal */}
          <CalendarSection>
            <CalendarContainer theme={theme}>
              <BigCalendar
                localizer={localizer}
                events={eventosFiltrados}
                views={["month"]}
                components={components}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "600px" }}
                defaultDate={new Date()}
                onSelectEvent={(event) =>
                  toast.info(
                    `${event.title} · ${formatearFechaCompleta(event.start)}`
                  )
                }
                eventPropGetter={(event) => ({
                  style: {
                    backgroundColor: getEventColor(event),
                    border: "none",
                    borderRadius: "4px",
                    color: "white",
                    fontSize: "11px",
                    padding: "2px 4px",
                  },
                })}
              />
            </CalendarContainer>
          </CalendarSection>

          {/* Panel lateral */}
          <SidebarSection>
            {/* Resumen proyectos */}
            <StatsCard>
              <StatsTitle>Resumen de proyectos</StatsTitle>
              <StatsList>
                <StatItem>
                  <StatIcon>
                    <BookOpen size={16} color={theme.primary} />
                  </StatIcon>
                  <StatText>
                    <StatNumber>{proyectosUnicos.length}</StatNumber>
                    <StatLabel>Proyectos en tu calendario</StatLabel>
                  </StatText>
                </StatItem>

                <StatItem>
                  <StatIcon>
                    <AlertCircle size={16} color="#ea580c" />
                  </StatIcon>
                  <StatText>
                    <StatNumber>{entregasFuturas.length}</StatNumber>
                    <StatLabel>Entregas pendientes</StatLabel>
                  </StatText>
                </StatItem>

                <StatItem>
                  <StatIcon>
                    <Users size={16} color="#0ea5e9" />
                  </StatIcon>
                  <StatText>
                    <StatNumber>{eventosPublicos.length}</StatNumber>
                    <StatLabel>Eventos colaborativos</StatLabel>
                  </StatText>
                </StatItem>

                <StatItem>
                  <StatIcon>
                    <EyeOff size={16} color="#64748b" />
                  </StatIcon>
                  <StatText>
                    <StatNumber>{eventosPrivados.length}</StatNumber>
                    <StatLabel>Notas personales</StatLabel>
                  </StatText>
                </StatItem>
              </StatsList>
            </StatsCard>

            {/* Próximas actividades */}
            <ActivitiesCard>
              <CardTitle>
                <Bell size={18} />
                Próximas actividades de proyecto
              </CardTitle>
              <ActivitiesList>
                {proximasActividades.length === 0 ? (
                  <EmptyMessage>
                    No tienes próximas actividades registradas
                  </EmptyMessage>
                ) : (
                  proximasActividades.map((evento) => {
                    const IconComponent = getEventIcon(evento.type);
                    return (
                      <ActivityItem key={evento.id}>
                        <ActivityIcon color={getEventColor(evento)}>
                          <IconComponent size={14} />
                        </ActivityIcon>
                        <ActivityContent>
                          <ActivityTitle>
                            {evento.title}
                            {!evento.publico && (
                              <EyeOff
                                size={12}
                                style={{ marginLeft: "6px" }}
                              />
                            )}
                          </ActivityTitle>
                          <ActivityMeta>
                            <MetaItem>
                              <Clock size={12} />
                              {dayjs(evento.start).format("DD/MM - HH:mm")}
                            </MetaItem>
                            {evento.proyecto && (
                              <MetaItem>
                                <BookOpen size={12} />
                                {evento.proyecto}
                              </MetaItem>
                            )}
                            {evento.lugar && (
                              <MetaItem>
                                <MapPin size={12} />
                                {evento.lugar}
                              </MetaItem>
                            )}
                          </ActivityMeta>
                          {evento.descripcion && (
                            <ActivityDescription>
                              {evento.descripcion}
                            </ActivityDescription>
                          )}
                        </ActivityContent>
                      </ActivityItem>
                    );
                  })
                )}
              </ActivitiesList>
            </ActivitiesCard>

          </SidebarSection>
        </CalendarLayout>

        {/* Modal crear evento */}
        {showCreateModal && (
          <ModalOverlay onClick={() => setShowCreateModal(false)}>
            <ModalContent
              onClick={(e) => e.stopPropagation()}
              theme={theme}
            >
              <h3>Nuevo evento de proyecto</h3>
              <form onSubmit={handleCreateEvent}>
                <FieldGroup>
                  <label>Título</label>
                  <input
                    type="text"
                    value={nuevoEvento.title}
                    onChange={(e) =>
                      setNuevoEvento((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    required
                  />
                </FieldGroup>

                <FieldGroup>
                  <label>Proyecto</label>
                  <input
                    type="text"
                    value={nuevoEvento.proyecto}
                    onChange={(e) =>
                      setNuevoEvento((prev) => ({
                        ...prev,
                        proyecto: e.target.value,
                      }))
                    }
                  />
                </FieldGroup>

                <FieldRow>
                  <FieldGroup>
                    <label>Fecha</label>
                    <input
                      type="date"
                      value={nuevoEvento.fecha}
                      onChange={(e) =>
                        setNuevoEvento((prev) => ({
                          ...prev,
                          fecha: e.target.value,
                        }))
                      }
                      required
                    />
                  </FieldGroup>
                  <FieldGroup>
                    <label>Hora inicio</label>
                    <input
                      type="time"
                      value={nuevoEvento.horaInicio}
                      onChange={(e) =>
                        setNuevoEvento((prev) => ({
                          ...prev,
                          horaInicio: e.target.value,
                        }))
                      }
                    />
                  </FieldGroup>
                  <FieldGroup>
                    <label>Hora fin</label>
                    <input
                      type="time"
                      value={nuevoEvento.horaFin}
                      onChange={(e) =>
                        setNuevoEvento((prev) => ({
                          ...prev,
                          horaFin: e.target.value,
                        }))
                      }
                    />
                  </FieldGroup>
                </FieldRow>

                <FieldRow>
                  <FieldGroup>
                    <label>Tipo</label>
                    <select
                      value={nuevoEvento.type}
                      onChange={(e) =>
                        setNuevoEvento((prev) => ({
                          ...prev,
                          type: e.target.value,
                        }))
                      }
                    >
                      <option value="proyecto">Evento de proyecto</option>
                      <option value="entrega">Entrega importante</option>
                      <option value="reunion">Reunión de proyecto</option>
                      <option value="feria">Feria</option>
                      <option value="nota">Nota personal</option>
                    </select>
                  </FieldGroup>
                  <FieldGroup>
                    <label>Ubicación (opcional)</label>
                    <input
                      type="text"
                      value={nuevoEvento.lugar}
                      onChange={(e) =>
                        setNuevoEvento((prev) => ({
                          ...prev,
                          lugar: e.target.value,
                        }))
                      }
                      placeholder="Laboratorio, Meet, Auditorio..."
                    />
                  </FieldGroup>
                </FieldRow>

                <FieldGroup>
                  <label>Descripción / notas</label>
                  <textarea
                    rows={3}
                    value={nuevoEvento.descripcion}
                    onChange={(e) =>
                      setNuevoEvento((prev) => ({
                        ...prev,
                        descripcion: e.target.value,
                      }))
                    }
                  />
                </FieldGroup>

                <FieldGroupCheckbox>
                  <label>
                    <input
                      type="checkbox"
                      checked={nuevoEvento.publico}
                      onChange={(e) =>
                        setNuevoEvento((prev) => ({
                          ...prev,
                          publico: e.target.checked,
                        }))
                      }
                    />
                    Evento colaborativo
                  </label>
                </FieldGroupCheckbox>

                <ModalActions>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    style={{ background: theme.primary }}
                  >
                    Guardar
                  </button>
                </ModalActions>
              </form>
            </ModalContent>
          </ModalOverlay>
        )}
      </Container>
    </PageWrapper>
  );
};

export default CalendarioUni;

/* ====== Styled components (adaptados a useColors) ====== */

const UserRoleBadge = styled.div`
  background: ${({ theme }) => theme.primary};
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const CalendarLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 32px;
  margin-top: 24px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const CalendarSection = styled.div``;

const CalendarContainer = styled.div`
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);

  .rbc-calendar {
    font-family: inherit;
  }

  .rbc-month-view {
    border: none;
  }

  .rbc-header {
    background: ${({ theme }) => theme.primary};
    color: #ffffff;
    font-weight: 600;
    padding: 12px 8px;
    border: none;
    border-radius: 8px 8px 0 0;
    text-transform: uppercase;
    font-size: 0.85rem;
  }

  .rbc-month-row {
    border: none;
  }

  .rbc-day-bg {
    border: 1px solid #f3f4f6;

    &:hover {
      background: #f9fafb;
    }
  }

  .rbc-date-cell {
    padding: 8px;
    font-weight: 500;
    color: #111827;
  }

  .rbc-off-range-bg {
    background: #f9fafb;
  }

  .rbc-today {
    background: ${({ theme }) => theme.primary}10;
  }

  .rbc-event {
    border: none !important;
    border-radius: 4px !important;
    padding: 2px 4px !important;
    margin: 1px 0 !important;
    font-size: 10px !important;
    font-weight: 500 !important;
  }
`;

const CalendarToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 16px 0;
  border-bottom: 2px solid #f3f4f6;
`;

const NavigationSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const NavButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: #ffffff;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

const MonthLabel = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  min-width: 200px;
  text-align: center;
`;

const ActionsSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 2px solid #e5e7eb;
  border-radius: 999px;
  background: #ffffff;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: #9ca3af;
  }
`;

const AddEventButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.primary};
  color: #ffffff;
  border: none;
  padding: 10px 16px;
  border-radius: 999px;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

const EventContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: white;
  font-size: 10px;
  font-weight: 500;
`;

const EventTitleSpan = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SidebarSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StatsCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
`;

const StatsTitle = styled.h3`
  margin: 0 0 16px 0;
  color: #111827;
  font-size: 1.1rem;
  font-weight: 600;
`;

const StatsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StatIcon = styled.div`
  width: 32px;
  height: 32px;
  background: #f3f4f6;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatText = styled.div``;

const StatNumber = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: #6b7280;
`;

const ActivitiesCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
`;

const CardTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 16px 0;
  color: #111827;
  font-size: 1.05rem;
  font-weight: 600;
`;

const ActivitiesList = styled.div`
  max-height: 300px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f3f4f6;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: #9ca3af;
    border-radius: 2px;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: #9ca3af;
  font-style: italic;
  padding: 20px;
  font-size: 0.85rem;
`;

const ActivityItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f3f4f6;
  opacity: ${(props) => (props.completed ? 0.7 : 1)};

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div`
  width: 32px;
  height: 32px;
  background: ${(props) => props.color}15;
  color: ${(props) => props.color};
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ActivityContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const ActivityTitle = styled.div`
  font-weight: 600;
  color: #111827;
  margin-bottom: 4px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
`;

const ActivityMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 4px;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #6b7280;
  font-size: 0.75rem;
`;

const ActivityDescription = styled.div`
  font-size: 0.8rem;
  color: #6b7280;
  line-height: 1.4;
`;

/* Modal */

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 40;
`;

const ModalContent = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 1.2rem 1.4rem;
  width: 100%;
  max-width: 460px;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.35);

  h3 {
    margin: 0 0 0.75rem 0;
    font-size: 1rem;
    font-weight: 600;
    color: #111827;
  }
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.6rem;

  label {
    font-size: 0.8rem;
    margin-bottom: 2px;
    color: #4b5563;
  }

  input,
  select,
  textarea {
    border-radius: 10px;
    border: 1px solid #e5e7eb;
    padding: 6px 8px;
    font-size: 0.85rem;
    outline: none;
    resize: vertical;

    &:focus {
      border-color: #9ca3af;
    }
  }
`;

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.5rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FieldGroupCheckbox = styled.div`
  margin: 0.4rem 0;
  label {
    font-size: 0.8rem;
    color: #4b5563;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  input {
    accent-color: #16a34a;
  }
`;

const ModalActions = styled.div`
  margin-top: 0.8rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;

  button {
    border-radius: 999px;
    border: none;
    padding: 6px 12px;
    font-size: 0.8rem;
    cursor: pointer;
  }

  button:first-child {
    background: #e5e7eb;
    color: #374151;
  }

  button:last-child {
    color: #ffffff;
  }
`;
