import React, { useState } from "react";
import {
    Container,
    HeaderNotificaciones,
    NotificationFilters,
    FilterChip,
    NotificationsList,
    NotificationCard,
    NotificationIcon,
    NotificationContent,
    NotificationTitle,
    NotificationMessage,
    NotificationMeta,
    NotificationTime,
    NotificationActions,
    ActionBtn,
    MarkAllButton,
    EmptyState
} from "../../../style/docente/notificacionesDStyled";
import {
    Bell, FileText, Users, Calendar, Award, AlertCircle,
    CheckCircle, Clock, MessageSquare, X, Check, BellOff
} from "lucide-react";
import { useColors } from "../../../style/colors";
import CardHeader from "../../../components/ui/cardHeader";

const NOTIFICACIONES_DATA = [
    {
        id: 1,
        tipo: "entrega",
        titulo: "Nueva entrega de tarea",
        mensaje: "Carlos Rodríguez ha entregado 'Proyecto Final - Ingeniería de Software'",
        tiempo: "Hace 5 minutos",
        leida: false,
        importante: true,
        icono: FileText,
        color: "#3498DB"
    },
    {
        id: 2,
        tipo: "mensaje",
        titulo: "Nuevo mensaje de estudiante",
        mensaje: "María López solicita revisión de calificación en 'Parcial 2'",
        tiempo: "Hace 2 horas",
        leida: false,
        importante: false,
        icono: MessageSquare,
        color: "#4ECDC4"
    },
    {
        id: 3,
        tipo: "reunion",
        titulo: "Recordatorio de reunión",
        mensaje: "Reunión de coordinación académica mañana a las 10:00 AM",
        tiempo: "Hace 3 horas",
        leida: true,
        importante: true,
        icono: Calendar,
        color: "#E67E22"
    },
    {
        id: 4,
        tipo: "sistema",
        titulo: "Fecha límite próxima",
        mensaje: "Quedan 2 días para cerrar las notas del segundo parcial",
        tiempo: "Hace 1 día",
        leida: false,
        importante: true,
        icono: AlertCircle,
        color: "#FF6B6B"
    },
    {
        id: 5,
        tipo: "logro",
        titulo: "Objetivo alcanzado",
        mensaje: "El 90% de tus estudiantes completaron la última tarea",
        tiempo: "Hace 2 días",
        leida: true,
        importante: false,
        icono: Award,
        color: "#9B59B6"
    }
];

const NotificacionesDi = () => {
    const ColorsDoc = useColors();
    const [notificaciones, setNotificaciones] = useState(NOTIFICACIONES_DATA);
    const [filtro, setFiltro] = useState("todas");

    const filteredNotificaciones = notificaciones.filter(notif => {
        if (filtro === "todas") return true;
        if (filtro === "no_leidas") return !notif.leida;
        if (filtro === "importantes") return notif.importante;
        return notif.tipo === filtro;
    });

    const marcarComoLeida = (id) => {
        setNotificaciones(prev => prev.map(notif =>
            notif.id === id ? { ...notif, leida: true } : notif
        ));
    };

    const eliminarNotificacion = (id) => {
        setNotificaciones(prev => prev.filter(notif => notif.id !== id));
    };

    const marcarTodasLeidas = () => {
        setNotificaciones(prev => prev.map(notif => ({ ...notif, leida: true })));
    };

    const noLeidasCount = notificaciones.filter(n => !n.leida).length;

    return (
        <Container>
            <CardHeader ColorsMa={ColorsDoc} title="Notificaciones" />

            <NotificationFilters>
                <FilterChip
                    active={filtro === "todas"}
                    onClick={() => setFiltro("todas")}
                    style={{
                        background: filtro === "todas" ? ColorsDoc.primary : 'white',
                        color: filtro === "todas" ? 'white' : '#6b7280'
                    }}
                >
                    Todas ({notificaciones.length})
                </FilterChip>
                <FilterChip
                    active={filtro === "no_leidas"}
                    onClick={() => setFiltro("no_leidas")}
                    style={{
                        background: filtro === "no_leidas" ? '#FF6B6B' : 'white',
                        color: filtro === "no_leidas" ? 'white' : '#6b7280'
                    }}
                >
                    No leídas ({noLeidasCount})
                </FilterChip>
                <FilterChip
                    active={filtro === "importantes"}
                    onClick={() => setFiltro("importantes")}
                    style={{
                        background: filtro === "importantes" ? '#FFA500' : 'white',
                        color: filtro === "importantes" ? 'white' : '#6b7280'
                    }}
                >
                    Importantes
                </FilterChip>
                <FilterChip
                    active={filtro === "entrega"}
                    onClick={() => setFiltro("entrega")}
                >
                    Entregas
                </FilterChip>
                <FilterChip
                    active={filtro === "mensaje"}
                    onClick={() => setFiltro("mensaje")}
                >
                    Mensajes
                </FilterChip>
            </NotificationFilters>

            {filteredNotificaciones.length > 0 ? (
                <NotificationsList>
                    {filteredNotificaciones.map(notif => (
                        <NotificationCard
                            key={notif.id}
                            leida={notif.leida}
                            importante={notif.importante}
                        >
                            <NotificationIcon style={{ background: `${notif.color}15` }}>
                                <notif.icono size={24} color={notif.color} />
                            </NotificationIcon>

                            <NotificationContent>
                                <NotificationTitle>
                                    {notif.titulo}
                                    {notif.importante && (
                                        <span style={{ color: '#FFA500', marginLeft: '0.5rem' }}>
                                            <AlertCircle size={16} />
                                        </span>
                                    )}
                                </NotificationTitle>
                                <NotificationMessage>{notif.mensaje}</NotificationMessage>
                                <NotificationMeta>
                                    <NotificationTime>
                                        <Clock size={14} />
                                        {notif.tiempo}
                                    </NotificationTime>
                                </NotificationMeta>
                            </NotificationContent>

                            <NotificationActions>
                                {!notif.leida && (
                                    <ActionBtn
                                        onClick={() => marcarComoLeida(notif.id)}
                                        title="Marcar como leída"
                                    >
                                        <Check size={18} />
                                    </ActionBtn>
                                )}
                                <ActionBtn
                                    onClick={() => eliminarNotificacion(notif.id)}
                                    title="Eliminar"
                                    className="delete"
                                >
                                    <X size={18} />
                                </ActionBtn>
                            </NotificationActions>
                        </NotificationCard>
                    ))}
                </NotificationsList>
            ) : (
                <EmptyState>
                    <BellOff size={64} color="#CBD5E0" />
                    <h3>No hay notificaciones</h3>
                    <p>Todas las notificaciones han sido atendidas</p>
                </EmptyState>
            )}
        </Container>
    );
};

export default NotificacionesDi;