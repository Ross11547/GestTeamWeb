import React, { useState } from "react";
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
    SectionTitle
} from "../../../style/docente/eventosDStyled";
import {
    Calendar, Plus, Clock, MapPin, Users, FileText,
    Edit, Trash2, ChevronLeft, ChevronRight, Bell
} from "lucide-react";

const EVENTOS_DATA = [
    {
        id: 1,
        titulo: "Entrega Proyecto Final",
        descripcion: "Fecha límite para la entrega del proyecto final de Ingeniería de Software",
        fecha: "2024-12-15",
        hora: "23:59",
        tipo: "entrega",
        materia: "Ingeniería de Software I",
        lugar: "Plataforma Virtual",
        color: "#FF6B6B"
    },
    {
        id: 2,
        titulo: "Examen Parcial",
        descripcion: "Segundo examen parcial - Programación Avanzada",
        fecha: "2024-12-18",
        hora: "10:30",
        tipo: "examen",
        materia: "Programación Avanzada",
        lugar: "Aula 302",
        color: "#3498DB"
    },
    {
        id: 3,
        titulo: "Reunión de Coordinación",
        descripcion: "Reunión mensual con el equipo docente",
        fecha: "2024-12-20",
        hora: "14:00",
        tipo: "reunion",
        materia: "Coordinación Académica",
        lugar: "Sala de Reuniones",
        color: "#9B59B6"
    },
    {
        id: 4,
        titulo: "Presentación de Proyectos",
        descripcion: "Presentación final de proyectos - Arquitectura de Software",
        fecha: "2024-12-22",
        hora: "08:00",
        tipo: "presentacion",
        materia: "Arquitectura de Software",
        lugar: "Auditorio Principal",
        color: "#4ECDC4"
    },
    {
        id: 5,
        titulo: "Cierre de Notas",
        descripcion: "Fecha límite para registrar notas del semestre",
        fecha: "2024-12-25",
        hora: "17:00",
        tipo: "administrativo",
        materia: "Todas las materias",
        lugar: "Sistema Académico",
        color: "#E67E22"
    }
];

const EventosD = ({ ColorsDoc }) => {
    const [eventos, setEventos] = useState(EVENTOS_DATA);
    const [filtroTipo, setFiltroTipo] = useState("todos");
    const [mesActual, setMesActual] = useState(new Date());
    const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

    const tiposEvento = [
        { id: "todos", label: "Todos", color: ColorsDoc.primary },
        { id: "entrega", label: "Entregas", color: "#FF6B6B" },
        { id: "examen", label: "Exámenes", color: "#3498DB" },
        { id: "reunion", label: "Reuniones", color: "#9B59B6" },
        { id: "presentacion", label: "Presentaciones", color: "#4ECDC4" },
        { id: "administrativo", label: "Administrativo", color: "#E67E22" }
    ];

    const filteredEventos = eventos.filter(evento => {
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

        // Días del mes anterior
        for (let i = startingDay - 1; i >= 0; i--) {
            const prevMonthDay = new Date(year, month, -i);
            days.push({
                date: prevMonthDay,
                currentMonth: false,
                events: []
            });
        }

        // Días del mes actual
        for (let i = 1; i <= daysInMonth; i++) {
            const currentDay = new Date(year, month, i);
            const dayEvents = eventos.filter(e => {
                const eventDate = new Date(e.fecha);
                return eventDate.toDateString() === currentDay.toDateString();
            });
            days.push({
                date: currentDay,
                currentMonth: true,
                events: dayEvents
            });
        }

        // Días del mes siguiente
        const remainingDays = 42 - days.length;
        for (let i = 1; i <= remainingDays; i++) {
            const nextMonthDay = new Date(year, month + 1, i);
            days.push({
                date: nextMonthDay,
                currentMonth: false,
                events: []
            });
        }

        return days;
    };

    const changeMonth = (direction) => {
        const newMonth = new Date(mesActual);
        newMonth.setMonth(newMonth.getMonth() + direction);
        setMesActual(newMonth);
    };

    const upcomingEvents = filteredEventos
        .filter(e => new Date(e.fecha) >= new Date())
        .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
        .slice(0, 5);

    const getEventIcon = (tipo) => {
        switch (tipo) {
            case 'entrega': return FileText;
            case 'examen': return FileText;
            case 'reunion': return Users;
            case 'presentacion': return Users;
            case 'administrativo': return Bell;
            default: return Calendar;
        }
    };

    return (
        <EventosContainer>
            <HeaderEventos>
                <div>
                    <h2>Calendario de Eventos</h2>
                    <p>Gestiona todos tus eventos y fechas importantes</p>
                </div>
                <CreateEventButton style={{ background: ColorsDoc.primary }}>
                    <Plus size={20} />
                    Nuevo Evento
                </CreateEventButton>
            </HeaderEventos>

            <FilterSection>
                {tiposEvento.map(tipo => (
                    <FilterChip
                        key={tipo.id}
                        active={filtroTipo === tipo.id}
                        onClick={() => setFiltroTipo(tipo.id)}
                        style={{
                            background: filtroTipo === tipo.id ? tipo.color : 'white',
                            color: filtroTipo === tipo.id ? 'white' : '#6b7280'
                        }}
                    >
                        {tipo.label}
                    </FilterChip>
                ))}
            </FilterSection>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <CalendarView>
                    <MonthHeader>
                        <button onClick={() => changeMonth(-1)}>
                            <ChevronLeft size={20} />
                        </button>
                        <h3>
                            {mesActual.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                        </h3>
                        <button onClick={() => changeMonth(1)}>
                            <ChevronRight size={20} />
                        </button>
                    </MonthHeader>

                    <WeekDays>
                        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                            <DayLabel key={day}>{day}</DayLabel>
                        ))}
                    </WeekDays>

                    <DaysGrid>
                        {getDaysInMonth().map((day, index) => (
                            <DayCell
                                key={index}
                                currentMonth={day.currentMonth}
                                hasEvents={day.events.length > 0}
                                isToday={day.date.toDateString() === new Date().toDateString()}
                            >
                                <DayNumber>{day.date.getDate()}</DayNumber>
                                {day.events.length > 0 && (
                                    <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', marginTop: '4px' }}>
                                        {day.events.slice(0, 3).map(event => (
                                            <EventDot key={event.id} color={event.color} />
                                        ))}
                                    </div>
                                )}
                            </DayCell>
                        ))}
                    </DaysGrid>
                </CalendarView>

                <UpcomingSection>
                    <SectionTitle>Próximos Eventos</SectionTitle>
                    <EventsList>
                        {upcomingEvents.map(evento => {
                            const Icon = getEventIcon(evento.tipo);
                            return (
                                <EventCard key={evento.id}>
                                    <EventDate>
                                        <Calendar size={16} />
                                        {new Date(evento.fecha).toLocaleDateString('es-ES', {
                                            day: 'numeric',
                                            month: 'short'
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
                                        <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#6b7280' }}>
                                            <MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} />
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
        </EventosContainer>
    );
};

export default EventosD;