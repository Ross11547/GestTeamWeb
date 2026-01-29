// Roxy: Calendario de eventos conectado a "BD" simulada

import React, { useState, useEffect } from "react";
import {
    EventosContainer,
    HeaderEventos,
    CalendarView,
    MonthHeader,
    WeekDays,
    DayLabel,
    DaysGrid,
    DayCell,
    DayNumber,
    EventDot,
    EventsList,
    EventCard,
    EventDate,
    EventTime,
    EventContent,
    EventTitle,
    EventDescription,
    EventType,
    EventActions,
    ActionButton,
    FilterSection,
    FilterChip,
    CreateEventButton,
    UpcomingSection,
    SectionTitle,
} from "../../../style/docente/eventosDStyled";
import {
    Calendar,
    Plus,
    Clock,
    MapPin,
    Users,
    FileText,
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Bell,
} from "lucide-react";
import styled from "styled-components";
import { getEventos } from "../../../data/eventosService.jsx";

const EventosDi = ({ ColorsDoc }) => {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtroTipo, setFiltroTipo] = useState("todos");
    const [mesActual, setMesActual] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDayEvents, setSelectedDayEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newEvent, setNewEvent] = useState({
        titulo: "",
        descripcion: "",
        fecha: "",
        hora: "10:00",
        tipo: "entrega",
        materia: "",
        lugar: "",
        color: "#FF6B6B",
    });

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getEventos();
                setEventos(data);
            } catch (err) {
                console.error("Error cargando eventos:", err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const tiposEvento = [
        { id: "todos", label: "Todos", color: ColorsDoc.primary },
        { id: "entrega", label: "Entregas", color: "#FF6B6B" },
        { id: "examen", label: "Exámenes", color: "#3498DB" },
        { id: "reunion", label: "Reuniones", color: "#9B59B6" },
        { id: "presentacion", label: "Presentaciones", color: "#4ECDC4" },
        { id: "administrativo", label: "Administrativo", color: "#E67E22" },
    ];

    const filteredEventos = eventos.filter((evento) => {
        if (filtroTipo === "todos") return true;
        return evento.tipo === filtroTipo;
    });

    const getDaysInMonth = () => {
        const year = mesActual.getFullYear();
        const month = mesActual.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();

        const days = [];

        // días del mes anterior
        for (let i = startingDay - 1; i >= 0; i--) {
            const prevMonthDay = new Date(year, month, -i);
            days.push({
                date: prevMonthDay,
                currentMonth: false,
                events: [],
            });
        }

        // días del mes actual (usando eventos filtrados)
        for (let i = 1; i <= daysInMonth; i++) {
            const currentDay = new Date(year, month, i);
            const dayEvents = filteredEventos.filter((e) => {
                const eventDate = new Date(e.fecha);
                return eventDate.toDateString() === currentDay.toDateString();
            });
            days.push({
                date: currentDay,
                currentMonth: true,
                events: dayEvents,
            });
        }

        // completar hasta 6 filas (42 celdas)
        const remainingDays = 42 - days.length;
        for (let i = 1; i <= remainingDays; i++) {
            const nextMonthDay = new Date(year, month + 1, i);
            days.push({
                date: nextMonthDay,
                currentMonth: false,
                events: [],
            });
        }

        return days;
    };

    const changeMonth = (direction) => {
        const newMonth = new Date(mesActual);
        newMonth.setMonth(newMonth.getMonth() + direction);
        setMesActual(newMonth);
        setSelectedDate(null);
        setSelectedDayEvents([]);
    };

    const upcomingEvents = filteredEventos
        .filter((e) => new Date(e.fecha) >= new Date())
        .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
        .slice(0, 5);

    const getEventIcon = (tipo) => {
        switch (tipo) {
            case "entrega":
                return FileText;
            case "examen":
                return FileText;
            case "reunion":
                return Users;
            case "presentacion":
                return Users;
            case "administrativo":
                return Bell;
            default:
                return Calendar;
        }
    };

    const handleDayClick = (day) => {
        const events = filteredEventos.filter((e) => {
            const eventDate = new Date(e.fecha);
            return eventDate.toDateString() === day.date.toDateString();
        });
        setSelectedDate(day.date);
        setSelectedDayEvents(events);
    };

    const handleCreateEvent = (e) => {
        e.preventDefault();
        const nuevo = {
            ...newEvent,
            id: Date.now(),
        };
        setEventos((prev) => [...prev, nuevo]);
        setShowModal(false);
        setNewEvent({
            titulo: "",
            descripcion: "",
            fecha: "",
            hora: "10:00",
            tipo: "entrega",
            materia: "",
            lugar: "",
            color: "#FF6B6B",
        });
    };

    if (loading) {
        return (
            <EventosContainer>
                <p>Cargando eventos...</p>
            </EventosContainer>
        );
    }

    return (
        <EventosContainer>
            <HeaderEventos>
                <div>
                    <h2>Calendario de Eventos</h2>
                    <p>Gestiona todos tus eventos y fechas importantes</p>
                </div>
                <CreateEventButton
                    style={{ background: ColorsDoc.primary }}
                    onClick={() => setShowModal(true)}
                >
                    <Plus size={20} />
                    Nuevo Evento
                </CreateEventButton>
            </HeaderEventos>

            <FilterSection>
                {tiposEvento.map((tipo) => (
                    <FilterChip
                        key={tipo.id}
                        active={filtroTipo === tipo.id}
                        onClick={() => setFiltroTipo(tipo.id)}
                        style={{
                            background: filtroTipo === tipo.id ? tipo.color : "white",
                            color: filtroTipo === tipo.id ? "white" : "#6b7280",
                        }}
                    >
                        {tipo.label}
                    </FilterChip>
                ))}
            </FilterSection>

            <div
                style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}
            >
                <CalendarView>
                    <MonthHeader>
                        <button onClick={() => changeMonth(-1)}>
                            <ChevronLeft size={20} />
                        </button>
                        <h3>
                            {mesActual.toLocaleDateString("es-ES", {
                                month: "long",
                                year: "numeric",
                            })}
                        </h3>
                        <button onClick={() => changeMonth(1)}>
                            <ChevronRight size={20} />
                        </button>
                    </MonthHeader>

                    <WeekDays>
                        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
                            <DayLabel key={day}>{day}</DayLabel>
                        ))}
                    </WeekDays>

                    <DaysGrid>
                        {getDaysInMonth().map((day, index) => (
                            <DayCell
                                key={index}
                                currentMonth={day.currentMonth}
                                hasEvents={day.events.length > 0}
                                isToday={
                                    day.date.toDateString() === new Date().toDateString()
                                }
                                onClick={() => handleDayClick(day)}
                            >
                                <DayNumber>{day.date.getDate()}</DayNumber>
                                {day.events.length > 0 && (
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "2px",
                                            justifyContent: "center",
                                            marginTop: "4px",
                                        }}
                                    >
                                        {day.events.slice(0, 3).map((event) => (
                                            <EventDot key={event.id} color={event.color} />
                                        ))}
                                    </div>
                                )}
                            </DayCell>
                        ))}
                    </DaysGrid>

                    {/* Lista de eventos del día seleccionado */}
                    <SelectedDayWrapper>
                        <h4>
                            {selectedDate
                                ? `Eventos del ${selectedDate.toLocaleDateString("es-ES", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })}`
                                : "Selecciona un día para ver sus eventos"}
                        </h4>
                        {selectedDayEvents.length === 0 && selectedDate && (
                            <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                                No hay eventos registrados para este día.
                            </p>
                        )}
                        {selectedDayEvents.map((evento) => {
                            const Icon = getEventIcon(evento.tipo);
                            return (
                                <MiniEvent key={evento.id}>
                                    <span
                                        className="color"
                                        style={{ background: evento.color || ColorsDoc.primary }}
                                    />
                                    <div className="info">
                                        <strong>{evento.titulo}</strong>
                                        <div className="meta">
                                            <Icon size={14} />
                                            <span>
                                                {evento.hora} • {evento.materia}
                                            </span>
                                        </div>
                                    </div>
                                </MiniEvent>
                            );
                        })}
                    </SelectedDayWrapper>
                </CalendarView>

                <UpcomingSection>
                    <SectionTitle>Próximos Eventos</SectionTitle>
                    <EventsList>
                        {upcomingEvents.map((evento) => {
                            const Icon = getEventIcon(evento.tipo);
                            return (
                                <EventCard key={evento.id}>
                                    <EventDate>
                                        <Calendar size={16} />
                                        {new Date(evento.fecha).toLocaleDateString("es-ES", {
                                            day: "numeric",
                                            month: "short",
                                        })}
                                        <EventTime>
                                            <Clock size={14} />
                                            {evento.hora}
                                        </EventTime>
                                    </EventDate>

                                    <EventContent>
                                        <EventType tipo={evento.tipo}>
                                            <Icon size={14} />
                                            {evento.tipo}
                                        </EventType>
                                        <EventTitle>{evento.titulo}</EventTitle>
                                        <EventDescription>{evento.descripcion}</EventDescription>
                                        <div
                                            style={{
                                                marginTop: "0.5rem",
                                                fontSize: "0.85rem",
                                                color: "#6b7280",
                                            }}
                                        >
                                            <MapPin
                                                size={14}
                                                style={{ display: "inline", marginRight: "4px" }}
                                            />
                                            {evento.lugar}
                                        </div>
                                    </EventContent>

                                    <EventActions>
                                        <ActionButton>
                                            <Edit size={16} />
                                        </ActionButton>
                                        <ActionButton className="delete">
                                            <Trash2 size={16} />
                                        </ActionButton>
                                    </EventActions>
                                </EventCard>
                            );
                        })}
                    </EventsList>
                </UpcomingSection>
            </div>

            {/* Modal creación evento */}
            {showModal && (
                <ModalOverlay onClick={() => setShowModal(false)}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <h3>Nuevo evento</h3>
                        <form onSubmit={handleCreateEvent}>
                            <FieldGroup>
                                <label>Título</label>
                                <input
                                    type="text"
                                    value={newEvent.titulo}
                                    onChange={(e) =>
                                        setNewEvent((prev) => ({
                                            ...prev,
                                            titulo: e.target.value,
                                        }))
                                    }
                                    required
                                />
                            </FieldGroup>

                            <FieldGroup>
                                <label>Descripción</label>
                                <textarea
                                    value={newEvent.descripcion}
                                    onChange={(e) =>
                                        setNewEvent((prev) => ({
                                            ...prev,
                                            descripcion: e.target.value,
                                        }))
                                    }
                                    rows={3}
                                />
                            </FieldGroup>

                            <FieldRow>
                                <FieldGroup>
                                    <label>Fecha</label>
                                    <input
                                        type="date"
                                        value={newEvent.fecha}
                                        onChange={(e) =>
                                            setNewEvent((prev) => ({
                                                ...prev,
                                                fecha: e.target.value,
                                            }))
                                        }
                                        required
                                    />
                                </FieldGroup>
                                <FieldGroup>
                                    <label>Hora</label>
                                    <input
                                        type="time"
                                        value={newEvent.hora}
                                        onChange={(e) =>
                                            setNewEvent((prev) => ({
                                                ...prev,
                                                hora: e.target.value,
                                            }))
                                        }
                                    />
                                </FieldGroup>
                            </FieldRow>

                            <FieldRow>
                                <FieldGroup>
                                    <label>Tipo</label>
                                    <select
                                        value={newEvent.tipo}
                                        onChange={(e) =>
                                            setNewEvent((prev) => ({
                                                ...prev,
                                                tipo: e.target.value,
                                            }))
                                        }
                                    >
                                        <option value="entrega">Entrega</option>
                                        <option value="examen">Examen</option>
                                        <option value="reunion">Reunión</option>
                                        <option value="presentacion">Presentación</option>
                                        <option value="administrativo">Administrativo</option>
                                    </select>
                                </FieldGroup>
                                <FieldGroup>
                                    <label>Color</label>
                                    <input
                                        type="color"
                                        value={newEvent.color}
                                        onChange={(e) =>
                                            setNewEvent((prev) => ({
                                                ...prev,
                                                color: e.target.value,
                                            }))
                                        }
                                    />
                                </FieldGroup>
                            </FieldRow>

                            <FieldGroup>
                                <label>Materia / contexto</label>
                                <input
                                    type="text"
                                    value={newEvent.materia}
                                    onChange={(e) =>
                                        setNewEvent((prev) => ({
                                            ...prev,
                                            materia: e.target.value,
                                        }))
                                    }
                                />
                            </FieldGroup>

                            <FieldGroup>
                                <label>Lugar</label>
                                <input
                                    type="text"
                                    value={newEvent.lugar}
                                    onChange={(e) =>
                                        setNewEvent((prev) => ({
                                            ...prev,
                                            lugar: e.target.value,
                                        }))
                                    }
                                />
                            </FieldGroup>

                            <ModalActions>
                                <button type="button" onClick={() => setShowModal(false)}>
                                    Cancelar
                                </button>
                                <button type="submit" style={{ background: ColorsDoc.primary }}>
                                    Guardar
                                </button>
                            </ModalActions>
                        </form>
                    </ModalContent>
                </ModalOverlay>
            )}
        </EventosContainer>
    );
};

export default EventosDi;

// ===== estilos locales para modal y lista de día =====

const SelectedDayWrapper = styled.div`
  margin-top: 1rem;
  background: #f9fafb;
  border-radius: 12px;
  padding: 0.75rem 0.9rem;
  h4 {
    margin: 0 0 0.35rem 0;
    font-size: 0.9rem;
  }
`;

const MiniEvent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 4px 6px;
  border-radius: 10px;
  background: #ffffff;
  margin-top: 4px;
  .color {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    flex-shrink: 0;
  }
  .info {
    flex: 1;
  }
  .info strong {
    font-size: 0.85rem;
  }
  .meta {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.75rem;
    color: #6b7280;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 40;
`;

const ModalContent = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 1.1rem 1.3rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.25);
  h3 {
    margin: 0 0 0.75rem 0;
    font-size: 16px;
    font-weight: 600;
  }
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.6rem;
  label {
    font-size: 12px;
    margin-bottom: 2px;
    color: #4b5563;
  }
  input,
  select,
  textarea {
    border-radius: 10px;
    border: 1px solid #e5e7eb;
    padding: 6px 8px;
    font-size: 13px;
    outline: none;
    resize: vertical;
  }
`;

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
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
    font-size: 13px;
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
