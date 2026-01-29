import React, { useState } from "react";
import {
    EntregasContainer,
    HeaderEntregas,
    EntregasGrid,
    EntregaCard,
    EntregaHeader,
    EntregaTitle,
    EntregaDate,
    EntregaStats,
    StatItem,
    StatValue,
    StatLabel,
    EntregaActions,
    ActionBtn,
    StatusBadge,
    FilterSection,
    FilterChip
} from "../../../style/docente/entregasDStyled";
import { FileText, Users, Clock, Download, Eye, CheckCircle, XCircle, AlertCircle } from "lucide-react";

const ENTREGAS_DATA = [
    {
        id: 1,
        titulo: "Proyecto Final - Diseño de Software",
        fechaLimite: "2024-12-15",
        estado: "activo",
        entregados: 28,
        totalEstudiantes: 35,
        revisados: 15,
        tipo: "proyecto"
    },
    {
        id: 2,
        titulo: "Tarea 3 - Patrones de Diseño",
        fechaLimite: "2024-12-10",
        estado: "activo",
        entregados: 32,
        totalEstudiantes: 35,
        revisados: 32,
        tipo: "tarea"
    },
    {
        id: 3,
        titulo: "Quiz - Arquitectura MVC",
        fechaLimite: "2024-12-05",
        estado: "cerrado",
        entregados: 35,
        totalEstudiantes: 35,
        revisados: 35,
        tipo: "quiz"
    },
    {
        id: 4,
        titulo: "Laboratorio 4 - Testing",
        fechaLimite: "2024-12-20",
        estado: "proximo",
        entregados: 0,
        totalEstudiantes: 35,
        revisados: 0,
        tipo: "laboratorio"
    }
];

const EntregasDi = ({ materia, ColorsDoc }) => {
    const [filter, setFilter] = useState("todos");

    const filteredEntregas = ENTREGAS_DATA.filter(entrega => {
        if (filter === "todos") return true;
        return entrega.estado === filter;
    });

    const getStatusColor = (estado) => {
        switch (estado) {
            case 'activo': return '#4ECDC4';
            case 'cerrado': return '#FF6B6B';
            case 'proximo': return '#FFA500';
            default: return '#6b7280';
        }
    };

    const getStatusText = (estado) => {
        switch (estado) {
            case 'activo': return 'Activo';
            case 'cerrado': return 'Cerrado';
            case 'proximo': return 'Próximo';
            default: return estado;
        }
    };

    return (
        <EntregasContainer>
            <HeaderEntregas>
                <h2>{materia ? materia.nombre : 'Todas las Materias'} - Entregas</h2>
                <FilterSection>
                    <FilterChip
                        active={filter === 'todos'}
                        onClick={() => setFilter('todos')}
                        style={{ background: filter === 'todos' ? ColorsDoc.primary : '#e0e0e0' }}
                    >
                        Todos
                    </FilterChip>
                    <FilterChip
                        active={filter === 'activo'}
                        onClick={() => setFilter('activo')}
                        style={{ background: filter === 'activo' ? '#4ECDC4' : '#e0e0e0' }}
                    >
                        Activos
                    </FilterChip>
                    <FilterChip
                        active={filter === 'cerrado'}
                        onClick={() => setFilter('cerrado')}
                        style={{ background: filter === 'cerrado' ? '#FF6B6B' : '#e0e0e0' }}
                    >
                        Cerrados
                    </FilterChip>
                    <FilterChip
                        active={filter === 'proximo'}
                        onClick={() => setFilter('proximo')}
                        style={{ background: filter === 'proximo' ? '#FFA500' : '#e0e0e0' }}
                    >
                        Próximos
                    </FilterChip>
                </FilterSection>
            </HeaderEntregas>

            <EntregasGrid>
                {filteredEntregas.map(entrega => (
                    <EntregaCard key={entrega.id}>
                        <EntregaHeader>
                            <div>
                                <EntregaTitle>{entrega.titulo}</EntregaTitle>
                                <EntregaDate>
                                    <Clock size={16} />
                                    Fecha límite: {new Date(entrega.fechaLimite).toLocaleDateString('es-ES')}
                                </EntregaDate>
                            </div>
                            <StatusBadge style={{ background: getStatusColor(entrega.estado) }}>
                                {getStatusText(entrega.estado)}
                            </StatusBadge>
                        </EntregaHeader>

                        <EntregaStats>
                            <StatItem>
                                <StatValue style={{ color: ColorsDoc.primary }}>
                                    {entrega.entregados}/{entrega.totalEstudiantes}
                                </StatValue>
                                <StatLabel>Entregados</StatLabel>
                            </StatItem>
                            <StatItem>
                                <StatValue style={{ color: entrega.revisados === entrega.entregados ? '#4ECDC4' : '#FFA500' }}>
                                    {entrega.revisados}/{entrega.entregados}
                                </StatValue>
                                <StatLabel>Revisados</StatLabel>
                            </StatItem>
                            <StatItem>
                                <StatValue style={{ color: '#6b7280' }}>
                                    {Math.round((entrega.entregados / entrega.totalEstudiantes) * 100)}%
                                </StatValue>
                                <StatLabel>Completado</StatLabel>
                            </StatItem>
                        </EntregaStats>

                        <EntregaActions>
                            <ActionBtn style={{ background: ColorsDoc.primary }}>
                                <Eye size={18} />
                                Ver Entregas
                            </ActionBtn>
                            <ActionBtn style={{ background: ColorsDoc.secondary }}>
                                <Download size={18} />
                                Descargar
                            </ActionBtn>
                        </EntregaActions>
                    </EntregaCard>
                ))}
            </EntregasGrid>
        </EntregasContainer>
    );
};

export default EntregasDi;