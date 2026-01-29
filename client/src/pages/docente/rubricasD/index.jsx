import React, { useState } from "react";
import {
    RubricasContainer,
    HeaderRubricas,
    RubricasList,
    RubricaCard,
    RubricaHeader,
    RubricaTitle,
    RubricaInfo,
    RubricaCriteria,
    CriteriaItem,
    CriteriaHeader,
    CriteriaLevels,
    LevelCard,
    LevelScore,
    LevelDescription,
    CreateButton,
    ActionButtons,
    EditButton,
    DeleteButton,
    ApplyButton,
    RubricaMeta
} from "../../../style/docente/rubricasDStyled";
import { Plus, Edit2, Trash2, Copy, Award, CheckSquare, FileText } from "lucide-react";

const RUBRICAS_DATA = [
    {
        id: 1,
        nombre: "Rúbrica Proyecto Final",
        tipo: "Proyecto",
        fechaCreacion: "2024-11-15",
        usadaEn: 3,
        criterios: [
            {
                nombre: "Funcionalidad",
                peso: 30,
                niveles: [
                    { puntos: 100, descripcion: "Cumple todos los requisitos y agrega características adicionales" },
                    { puntos: 75, descripcion: "Cumple todos los requisitos principales" },
                    { puntos: 50, descripcion: "Cumple parcialmente los requisitos" },
                    { puntos: 25, descripcion: "No cumple los requisitos mínimos" }
                ]
            },
            {
                nombre: "Calidad del Código",
                peso: 25,
                niveles: [
                    { puntos: 100, descripcion: "Código limpio, bien documentado y optimizado" },
                    { puntos: 75, descripcion: "Código funcional con buena estructura" },
                    { puntos: 50, descripcion: "Código funcional con algunos problemas" },
                    { puntos: 25, descripcion: "Código con múltiples problemas" }
                ]
            },
            {
                nombre: "Documentación",
                peso: 20,
                niveles: [
                    { puntos: 100, descripcion: "Documentación completa y profesional" },
                    { puntos: 75, descripcion: "Documentación adecuada" },
                    { puntos: 50, descripcion: "Documentación básica" },
                    { puntos: 25, descripcion: "Documentación insuficiente" }
                ]
            },
            {
                nombre: "Presentación",
                peso: 25,
                niveles: [
                    { puntos: 100, descripcion: "Presentación excelente y clara comunicación" },
                    { puntos: 75, descripcion: "Buena presentación" },
                    { puntos: 50, descripcion: "Presentación aceptable" },
                    { puntos: 25, descripcion: "Presentación deficiente" }
                ]
            }
        ]
    },
    {
        id: 2,
        nombre: "Rúbrica Tareas",
        tipo: "Tarea",
        fechaCreacion: "2024-10-20",
        usadaEn: 8,
        criterios: [
            {
                nombre: "Completitud",
                peso: 40,
                niveles: [
                    { puntos: 100, descripcion: "Tarea completa con elementos adicionales" },
                    { puntos: 75, descripcion: "Tarea completa" },
                    { puntos: 50, descripcion: "Tarea parcialmente completa" },
                    { puntos: 25, descripcion: "Tarea incompleta" }
                ]
            },
            {
                nombre: "Precisión",
                peso: 35,
                niveles: [
                    { puntos: 100, descripcion: "Sin errores" },
                    { puntos: 75, descripcion: "Errores mínimos" },
                    { puntos: 50, descripcion: "Algunos errores" },
                    { puntos: 25, descripcion: "Múltiples errores" }
                ]
            },
            {
                nombre: "Puntualidad",
                peso: 25,
                niveles: [
                    { puntos: 100, descripcion: "Entregado antes de tiempo" },
                    { puntos: 75, descripcion: "Entregado a tiempo" },
                    { puntos: 50, descripcion: "Entregado con retraso menor" },
                    { puntos: 25, descripcion: "Entregado con retraso significativo" }
                ]
            }
        ]
    }
];

const RubricasD = ({ materia, ColorsDoc }) => {
    const [rubricas, setRubricas] = useState(RUBRICAS_DATA);
    const [expandedRubrica, setExpandedRubrica] = useState(null);

    const toggleExpanded = (rubricaId) => {
        setExpandedRubrica(expandedRubrica === rubricaId ? null : rubricaId);
    };

    const getScoreColor = (score) => {
        if (score >= 90) return '#4ECDC4';
        if (score >= 75) return '#52C41A';
        if (score >= 50) return '#FFA500';
        return '#FF6B6B';
    };

    return (
        <RubricasContainer>
            <HeaderRubricas>
                <div>
                    <h2>{materia ? materia.nombre : 'Todas las Materias'} - Rúbricas de Evaluación</h2>
                    <p>Gestiona y aplica rúbricas para evaluar trabajos de estudiantes</p>
                </div>
                <CreateButton style={{ background: ColorsDoc.primary }}>
                    <Plus size={20} />
                    Nueva Rúbrica
                </CreateButton>
            </HeaderRubricas>

            <RubricasList>
                {rubricas.map(rubrica => (
                    <RubricaCard key={rubrica.id} expanded={expandedRubrica === rubrica.id}>
                        <RubricaHeader onClick={() => toggleExpanded(rubrica.id)}>
                            <div>
                                <RubricaTitle>
                                    <Award size={24} color={ColorsDoc.primary} />
                                    {rubrica.nombre}
                                </RubricaTitle>
                                <RubricaInfo>
                                    <span>Tipo: {rubrica.tipo}</span>
                                    <span>•</span>
                                    <span>Creada: {new Date(rubrica.fechaCreacion).toLocaleDateString('es-ES')}</span>
                                    <span>•</span>
                                    <span>Usada {rubrica.usadaEn} veces</span>
                                </RubricaInfo>
                            </div>
                            <ActionButtons>
                                <ApplyButton style={{ background: ColorsDoc.primary }}>
                                    <CheckSquare size={18} />
                                    Aplicar
                                </ApplyButton>
                                <EditButton>
                                    <Edit2 size={18} />
                                </EditButton>
                                <DeleteButton>
                                    <Trash2 size={18} />
                                </DeleteButton>
                            </ActionButtons>
                        </RubricaHeader>

                        {expandedRubrica === rubrica.id && (
                            <RubricaCriteria>
                                <RubricaMeta>
                                    <h4>Criterios de Evaluación</h4>
                                    <span>Total: 100 puntos</span>
                                </RubricaMeta>

                                {rubrica.criterios.map((criterio, index) => (
                                    <CriteriaItem key={index}>
                                        <CriteriaHeader>
                                            <h4>{criterio.nombre}</h4>
                                            <span>Peso: {criterio.peso}%</span>
                                        </CriteriaHeader>

                                        <CriteriaLevels>
                                            {criterio.niveles.map((nivel, idx) => (
                                                <LevelCard key={idx}>
                                                    <LevelScore style={{ color: getScoreColor(nivel.puntos) }}>
                                                        {nivel.puntos} pts
                                                    </LevelScore>
                                                    <LevelDescription>{nivel.descripcion}</LevelDescription>
                                                </LevelCard>
                                            ))}
                                        </CriteriaLevels>
                                    </CriteriaItem>
                                ))}
                            </RubricaCriteria>
                        )}
                    </RubricaCard>
                ))}
            </RubricasList>
        </RubricasContainer>
    );
};

export default RubricasD;