// Notificacion.jsx - Diseño Premium Mejorado
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import {
    Bell,
    MessageCircle,
    UserPlus,
    Check,
    CheckCheck,
    Trash2,
    Search,
    Filter,
    Clock,
    AlertCircle,
    TrendingUp,
    Archive,
    BellOff,
    Sparkles,
    ChevronRight,
    Calendar,
    Star,
    Zap
} from 'lucide-react';
import CardHeader from '../../../components/ui/cardHeader';
import { useColors } from '../../../style/colors';
import { Acciones, BotonAccion, BuscarInput } from '../../../style/estudiante/styledNotificacion';

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const slideIn = keyframes`
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
`;

const pulse = keyframes`
    0% {
        box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
    }
`;

const shimmer = keyframes`
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(100%);
    }
`;

const Container = styled.div`
    width: 100%;
    padding: 24px;
    animation: ${fadeIn} 0.4s ease;
`;

const MainCard = styled.div`
    background: white;
    border-radius: 24px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
    overflow: hidden;
`;

const HeaderSection = styled.div`
    padding: 28px 32px;
    background: linear-gradient(135deg, #ffffff, #f8f9fa);
    border-bottom: 1px solid #e5e7eb;
`;

const HeaderTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 16px;
        align-items: stretch;
    }
`;

const HeaderTitle = styled.h2`
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0;
    font-size: 28px;
    font-weight: 800;
    color: #111827;
    
    svg {
        color: ${props => props.color};
    }
`;

const NotificationBadge = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 28px;
    height: 28px;
    padding: 0 10px;
    background: ${props => props.color};
    color: white;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 700;
    animation: ${props => props.hasNew ? pulse : 'none'} 2s infinite;
`;

// ==== CONTROLES Y FILTROS ====
const ControlsSection = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
    
    @media (max-width: 768px) {
        flex-direction: column;
        width: 100%;
    }
`;

const SearchContainer = styled.div`
    position: relative;
    flex: 1;
    max-width: 320px;
    
    @media (max-width: 768px) {
        max-width: 100%;
    }
`;

const SearchIcon = styled.div`
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    pointer-events: none;
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 12px 16px 12px 48px;
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 14px;
    font-size: 14px;
    transition: all 0.2s ease;
    
    &:focus {
        outline: none;
        border-color: ${props => props.color};
        box-shadow: 0 0 0 4px ${props => props.color}15;
        transform: translateY(-1px);
    }
    
    &::placeholder {
        color: #9ca3af;
    }
`;

const ActionButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    background: ${props => props.variant === 'primary' ? props.color : 'white'};
    color: ${props => props.variant === 'primary' ? 'white' : props.color};
    border: 2px solid ${props => props.color};
    border-radius: 14px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
    
    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px ${props => props.color}30;
        background: ${props => props.variant === 'primary' ? props.color + 'ee' : props.color + '10'};
    }
    
    &:active {
        transform: translateY(0);
    }
    
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    
    svg {
        transition: transform 0.2s ease;
    }
    
    &:hover:not(:disabled) svg {
        transform: scale(1.1);
    }
`;

const StatsRow = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 16px;
`;

const StatCard = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    background: ${props => props.bgColor}08;
    border: 1px solid ${props => props.bgColor}20;
    border-radius: 16px;
    transition: all 0.2s ease;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px ${props => props.bgColor}20;
    }
`;

const StatIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: ${props => props.bgColor}15;
    border-radius: 12px;
    
    svg {
        color: ${props => props.bgColor};
    }
`;

const StatInfo = styled.div``;

const StatValue = styled.div`
    font-size: 20px;
    font-weight: 700;
    color: #111827;
`;

const StatLabel = styled.div`
    font-size: 12px;
    color: #6b7280;
`;

const ContentContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: calc(100vh - 400px);
    min-height: 400px;
    
    @media (max-width: 968px) {
        grid-template-columns: 1fr;
        height: auto;
    }
`;

const Section = styled.div`
    padding: 24px;
    border-right: 1px solid #e5e7eb;
    overflow-y: auto;
    
    &:last-child {
        border-right: none;
    }
    
    &::-webkit-scrollbar {
        width: 6px;
    }
    
    &::-webkit-scrollbar-thumb {
        background: #e5e7eb;
        border-radius: 999px;
    }
    
    @media (max-width: 968px) {
        border-right: none;
        border-bottom: 1px solid #e5e7eb;
        
        &:last-child {
            border-bottom: none;
        }
    }
`;

const SectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: #111827;
    
    svg {
        color: ${props => props.color};
    }
`;

const SectionBadge = styled.span`
    padding: 4px 12px;
    background: ${props => props.color}15;
    color: ${props => props.color};
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
`;

const NotificationsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    animation: ${slideIn} 0.3s ease;
`;

// ==== ITEM DE NOTIFICACIÓN ====
const NotificationItem = styled.div`
    display: flex;
    gap: 16px;
    padding: 16px;
    background: ${props => props.leido ? '#f9fafb' : 'white'};
    border: 2px solid ${props => props.leido ? '#e5e7eb' : props.color + '30'};
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.2s ease;
    animation: ${slideIn} 0.3s ease;
    position: relative;
    overflow: hidden;
    
    ${props => !props.leido && `
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 100%;
            background: ${props.color};
        }
    `}
    
    &:hover {
        transform: translateX(4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        background: ${props => props.leido ? '#f3f4f6' : props.color + '05'};
    }
`;

const NotificationIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: ${props => props.bgColor}15;
    border-radius: 14px;
    flex-shrink: 0;
    
    svg {
        color: ${props => props.bgColor};
    }
`;

const NotificationContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const NotificationHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

const NotificationTitle = styled.div`
    font-size: 15px;
    font-weight: 600;
    color: #111827;
    line-height: 1.4;
`;

const NotificationTime = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: #6b7280;
    white-space: nowrap;
    
    svg {
        color: #9ca3af;
    }
`;

const NotificationMeta = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
`;

const NotificationType = styled.span`
    padding: 4px 10px;
    background: ${props => props.bgColor}10;
    color: ${props => props.bgColor};
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

const MarkAsReadButton = styled.button`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    background: ${props => props.color};
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px ${props => props.color}40;
        background: ${props => props.color}ee;
    }
`;

// ==== EMPTY STATE ====
const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 24px;
    text-align: center;
`;

const EmptyIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
    border-radius: 20px;
    margin-bottom: 20px;
    color: #9ca3af;
`;

const EmptyTitle = styled.h4`
    margin: 0 0 8px 0;
    font-size: 18px;
    font-weight: 700;
    color: #374151;
`;

const EmptyText = styled.p`
    margin: 0;
    font-size: 14px;
    color: #6b7280;
`;

const NotificationItemComponent = ({ tipo, mensaje, fecha, leido, onClick, onMarcarLeido }) => {
    const colors = useColors();

    const tipoConfig = {
        actualizacion: {
            icon: <Bell size={20} />,
            color: '#3B82F6',
            label: 'Actualización'
        },
        comentario: {
            icon: <MessageCircle size={20} />,
            color: '#10B981',
            label: 'Comentario'
        },
        incorporacion: {
            icon: <UserPlus size={20} />,
            color: '#8B5CF6',
            label: 'Nuevo miembro'
        }
    };

    const config = tipoConfig[tipo] || tipoConfig.actualizacion;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `Hace ${diffMins} minutos`;
        if (diffHours < 24) return `Hace ${diffHours} horas`;
        if (diffDays < 7) return `Hace ${diffDays} días`;
        return date.toLocaleDateString();
    };

    return (
        <NotificationItem
            leido={leido}
            onClick={onClick}
            color={colors.primary}
        >
            <NotificationIcon bgColor={config.color}>
                {config.icon}
            </NotificationIcon>

            <NotificationContent>
                <NotificationHeader>
                    <NotificationTitle>{mensaje}</NotificationTitle>
                </NotificationHeader>

                <NotificationMeta>
                    <NotificationType bgColor={config.color}>
                        {config.label}
                    </NotificationType>

                    <NotificationTime>
                        <Clock size={12} />
                        {formatDate(fecha)}
                    </NotificationTime>

                    {!leido && (
                        <MarkAsReadButton
                            color={colors.primary}
                            onClick={(e) => {
                                e.stopPropagation();
                                onMarcarLeido();
                            }}
                        >
                            <Check size={14} />
                            Marcar leído
                        </MarkAsReadButton>
                    )}
                </NotificationMeta>
            </NotificationContent>
        </NotificationItem>
    );
};

const Notificacion = () => {
    const colors = useColors();
    const [notificaciones, setNotificaciones] = useState([
        {
            id: 1,
            tipo: 'actualizacion',
            mensaje: 'Nueva actualización disponible en tu proyecto de Ingeniería de Software',
            fecha: '2024-11-18T10:30:00',
            leido: false,
        },
        {
            id: 2,
            tipo: 'comentario',
            mensaje: 'El profesor agregó comentarios en tu entrega de Base de Datos Avanzadas',
            fecha: '2024-11-17T14:45:00',
            leido: false,
        },
        {
            id: 3,
            tipo: 'incorporacion',
            mensaje: 'Carlos Mendoza se unió a tu repositorio de proyecto final',
            fecha: '2024-11-16T16:00:00',
            leido: true,
        },
        {
            id: 4,
            tipo: 'actualizacion',
            mensaje: 'Se actualizó la fecha de entrega para el proyecto de Arquitectura de Software',
            fecha: '2024-11-16T09:00:00',
            leido: false,
        }
    ]);

    const [buscar, setBuscar] = useState('');
    const [filtroActivo, setFiltroActivo] = useState('todas');

    const handleMarcarLeido = (id) => {
        setNotificaciones(prev =>
            prev.map(n => n.id === id ? { ...n, leido: true } : n)
        );
    };

    const handleMarcarTodoLeido = () => {
        setNotificaciones(prev => prev.map(n => ({ ...n, leido: true })));
    };

    const handleLimpiarNotificaciones = () => {
        setNotificaciones([]);
    };

    const notificacionesFiltradas = notificaciones.filter(n =>
        n.mensaje.toLowerCase().includes(buscar.toLowerCase())
    );

    const recientes = notificacionesFiltradas.filter(n => !n.leido);
    const historico = notificacionesFiltradas.filter(n => n.leido);

    const stats = {
        total: notificaciones.length,
        noLeidas: recientes.length,
        leidas: historico.length,
        hoy: notificaciones.filter(n => {
            const today = new Date().toDateString();
            const notifDate = new Date(n.fecha).toDateString();
            return today === notifDate;
        }).length
    };

    return (
        <Container>
            <CardHeader title="Notificaciones">
                <Acciones>
                    <BuscarInput type="text" placeholder="Buscar notificaciones..." value={buscar} onChange={(e) => setBuscar(e.target.value)} />
                    <BotonAccion
                        style={{ background: colors.primary }}
                        onClick={handleMarcarTodoLeido}>
                        <CheckCheck size={18} /> Marcar todo como leído
                    </BotonAccion>
                    <BotonAccion
                        style={{ background: colors.primary }}
                        onClick={handleLimpiarNotificaciones}>
                        <Trash2 size={18} /> Limpiar Notificaciones
                    </BotonAccion>

                </Acciones>
            </CardHeader>
            <MainCard>
                <HeaderTop>
                    <ControlsSection>
                    </ControlsSection>
                </HeaderTop>

                <StatsRow>
                    <StatCard bgColor={colors.primary}>
                        <StatIcon bgColor={colors.primary}>
                            <Bell size={18} />
                        </StatIcon>
                        <StatInfo>
                            <StatValue>{stats.total}</StatValue>
                            <StatLabel>Total</StatLabel>
                        </StatInfo>
                    </StatCard>

                    <StatCard bgColor="#3B82F6">
                        <StatIcon bgColor="#3B82F6">
                            <AlertCircle size={18} />
                        </StatIcon>
                        <StatInfo>
                            <StatValue>{stats.noLeidas}</StatValue>
                            <StatLabel>Sin leer</StatLabel>
                        </StatInfo>
                    </StatCard>

                    <StatCard bgColor="#10B981">
                        <StatIcon bgColor="#10B981">
                            <CheckCheck size={18} />
                        </StatIcon>
                        <StatInfo>
                            <StatValue>{stats.leidas}</StatValue>
                            <StatLabel>Leídas</StatLabel>
                        </StatInfo>
                    </StatCard>

                    <StatCard bgColor="#F59E0B">
                        <StatIcon bgColor="#F59E0B">
                            <Calendar size={18} />
                        </StatIcon>
                        <StatInfo>
                            <StatValue>{stats.hoy}</StatValue>
                            <StatLabel>Hoy</StatLabel>
                        </StatInfo>
                    </StatCard>
                </StatsRow>

                <ContentContainer>
                    <Section>
                        <SectionHeader>
                            <SectionTitle color={colors.primary}>
                                <Sparkles size={18} />
                                Notificaciones Recientes
                            </SectionTitle>
                            {recientes.length > 0 && (
                                <SectionBadge color="#3B82F6">
                                    {recientes.length} nuevas
                                </SectionBadge>
                            )}
                        </SectionHeader>

                        <NotificationsList>
                            {recientes.length > 0 ? (
                                recientes.map(notificacion => (
                                    <NotificationItemComponent
                                        key={notificacion.id}
                                        {...notificacion}
                                        onMarcarLeido={() => handleMarcarLeido(notificacion.id)}
                                    />
                                ))
                            ) : (
                                <EmptyState>
                                    <EmptyIcon>
                                        <BellOff size={40} />
                                    </EmptyIcon>
                                    <EmptyTitle>Todo al día</EmptyTitle>
                                    <EmptyText>
                                        No tienes notificaciones pendientes por revisar
                                    </EmptyText>
                                </EmptyState>
                            )}
                        </NotificationsList>
                    </Section>

                    <Section>
                        <SectionHeader>
                            <SectionTitle color="#6B7280">
                                <Archive size={18} />
                                Historial de Notificaciones
                            </SectionTitle>
                            {historico.length > 0 && (
                                <SectionBadge color="#6B7280">
                                    {historico.length} leídas
                                </SectionBadge>
                            )}
                        </SectionHeader>

                        <NotificationsList>
                            {historico.length > 0 ? (
                                historico.map(notificacion => (
                                    <NotificationItemComponent
                                        key={notificacion.id}
                                        {...notificacion}
                                    />
                                ))
                            ) : (
                                <EmptyState>
                                    <EmptyIcon>
                                        <Archive size={40} />
                                    </EmptyIcon>
                                    <EmptyTitle>Sin historial</EmptyTitle>
                                    <EmptyText>
                                        Las notificaciones leídas aparecerán aquí
                                    </EmptyText>
                                </EmptyState>
                            )}
                        </NotificationsList>
                    </Section>
                </ContentContainer>
            </MainCard>
        </Container>
    );
};

export default Notificacion;