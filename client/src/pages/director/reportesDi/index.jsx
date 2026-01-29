import React, { useState, useMemo } from "react";
import {
    Container,
    HeaderReportes,
    TabsNav,
    TabButton,
    ReportsContent,
    ChartCard,
    ChartHeader,
    ChartTitle,
    ChartFilter,
    StatsGrid,
    MetricCard,
    MetricValue,
    MetricLabel,
    MetricChange,
    TableCard,
    TableReport,
    ExportActions,
    ExportButton
} from "../../../style/docente/resportesDStyled.jsx";
import {
    BarChart3,
    TrendingUp,
    Users,
    Award,
    Download,
    FileText,
    Calendar,
    ArrowUp,
    ArrowDown
} from "lucide-react";
import { useColors } from "../../../style/colors.jsx";
import CardHeader from "../../../components/ui/cardHeader.jsx";
import { useUser } from "../../../context/useContext";

// ================= CONFIGS POR DIRECTOR (correo) =================

const sistemasConfig = (ColorsDoc) => ({
    descripcion:
        "Reportes de la carrera de Ingeniería de Sistemas enfocados en Proyecto Integrador III.",
    metricasByTab: {
        general: [
            {
                label: "Promedio General Integrador III",
                value: "82.3%",
                change: "+4.1%",
                trend: "up",
                color: ColorsDoc.primary
            },
            {
                label: "Tasa de Aprobación",
                value: "88%",
                change: "+3.8%",
                trend: "up",
                color: "#4ECDC4"
            },
            {
                label: "Entrega de Hitos a Tiempo",
                value: "91%",
                change: "+2.2%",
                trend: "up",
                color: "#FFA500"
            },
            {
                label: "Proyectos con Avance > 70%",
                value: "76%",
                change: "+6.5%",
                trend: "up",
                color: "#9B59B6"
            }
        ],
        estudiantes: [
            {
                label: "Estudiantes con avance óptimo",
                value: "64%",
                change: "+5.0%",
                trend: "up",
                color: ColorsDoc.primary
            },
            {
                label: "Estudiantes en riesgo",
                value: "12%",
                change: "-2.1%",
                trend: "down",
                color: "#FF6B6B"
            },
            {
                label: "Participación en ferias",
                value: "43%",
                change: "+3.3%",
                trend: "up",
                color: "#4ECDC4"
            },
            {
                label: "Entregas con feedback",
                value: "89%",
                change: "+1.7%",
                trend: "up",
                color: "#9B59B6"
            }
        ],
        materias: [
            {
                label: "Integrador III - Promedio",
                value: "82%",
                change: "+4.0%",
                trend: "up",
                color: ColorsDoc.primary
            },
            {
                label: "Integrador III - Aprobación",
                value: "87%",
                change: "+2.5%",
                trend: "up",
                color: "#4ECDC4"
            },
            {
                label: "Integrador III - Reprobación",
                value: "13%",
                change: "-2.5%",
                trend: "down",
                color: "#FF6B6B"
            },
            {
                label: "Proyectos destacados",
                value: "5",
                change: "+2",
                trend: "up",
                color: "#9B59B6"
            }
        ],
        temporal: [
            {
                label: "Mejora vs. inicio de semestre",
                value: "+9.4%",
                change: "+9.4%",
                trend: "up",
                color: ColorsDoc.primary
            },
            {
                label: "Cumplimiento de cronograma",
                value: "93%",
                change: "+1.8%",
                trend: "up",
                color: "#4ECDC4"
            },
            {
                label: "Retrasos en hitos",
                value: "7%",
                change: "-1.2%",
                trend: "down",
                color: "#FFA500"
            },
            {
                label: "Evaluaciones realizadas",
                value: "14",
                change: "+3",
                trend: "up",
                color: "#9B59B6"
            }
        ]
    },
    topEstudiantes: [
        { nombre: "María López (GestTeam)", promedio: 96, tendencia: "up" },
        { nombre: "Carlos Rodríguez (API REST)", promedio: 93, tendencia: "up" },
        { nombre: "Ana García (Arquitectura)", promedio: 90, tendencia: "stable" },
        { nombre: "Luis Martínez (BD GestTeam)", promedio: 88, tendencia: "up" },
        { nombre: "Sofia Pérez (Front GestTeam)", promedio: 86, tendencia: "down" }
    ],
    tablaTitulo: "Top estudiantes en Proyecto Integrador III"
});

const medicinaConfig = (ColorsDoc) => ({
    descripcion:
        "Reportes de la carrera de Medicina enfocados en la materia de Anatomía.",
    metricasByTab: {
        general: [
            {
                label: "Promedio General Anatomía",
                value: "81.0%",
                change: "+3.6%",
                trend: "up",
                color: ColorsDoc.primary
            },
            {
                label: "Tasa de Aprobación",
                value: "89%",
                change: "+2.9%",
                trend: "up",
                color: "#4ECDC4"
            },
            {
                label: "Asistencia a prácticas",
                value: "95%",
                change: "+1.5%",
                trend: "up",
                color: "#FFA500"
            },
            {
                label: "Entrega de informes de laboratorio",
                value: "87%",
                change: "+4.2%",
                trend: "up",
                color: "#9B59B6"
            }
        ],
        estudiantes: [
            {
                label: "Estudiantes con rendimiento alto",
                value: "58%",
                change: "+4.4%",
                trend: "up",
                color: ColorsDoc.primary
            },
            {
                label: "Estudiantes con refuerzo",
                value: "18%",
                change: "-1.1%",
                trend: "down",
                color: "#FF6B6B"
            },
            {
                label: "Participación en prácticas",
                value: "92%",
                change: "+2.0%",
                trend: "up",
                color: "#4ECDC4"
            },
            {
                label: "Casos clínicos trabajados",
                value: "36",
                change: "+5",
                trend: "up",
                color: "#9B59B6"
            }
        ],
        materias: [
            {
                label: "Anatomía - Promedio",
                value: "81%",
                change: "+3.6%",
                trend: "up",
                color: ColorsDoc.primary
            },
            {
                label: "Anatomía - Aprobación",
                value: "89%",
                change: "+2.9%",
                trend: "up",
                color: "#4ECDC4"
            },
            {
                label: "Anatomía - Reprobación",
                value: "11%",
                change: "-2.0%",
                trend: "down",
                color: "#FF6B6B"
            },
            {
                label: "Prácticas completadas",
                value: "94%",
                change: "+3.1%",
                trend: "up",
                color: "#9B59B6"
            }
        ],
        temporal: [
            {
                label: "Mejora vs. primer corte",
                value: "+7.8%",
                change: "+7.8%",
                trend: "up",
                color: ColorsDoc.primary
            },
            {
                label: "Cumplimiento de sílabus",
                value: "96%",
                change: "+2.3%",
                trend: "up",
                color: "#4ECDC4"
            },
            {
                label: "Retrasos en evaluaciones",
                value: "4%",
                change: "-0.9%",
                trend: "down",
                color: "#FFA500"
            },
            {
                label: "Evaluaciones realizadas",
                value: "11",
                change: "+2",
                trend: "up",
                color: "#9B59B6"
            }
        ]
    },
    topEstudiantes: [
        { nombre: "María López (Anatomía)", promedio: 97, tendencia: "up" },
        { nombre: "Carlos Rodríguez (Práctica Lab)", promedio: 93, tendencia: "up" },
        { nombre: "Ana García (Sistema Nervioso)", promedio: 89, tendencia: "stable" },
        { nombre: "Luis Martínez (Sistema Óseo)", promedio: 88, tendencia: "up" },
        { nombre: "Sofia Pérez (Histología)", promedio: 84, tendencia: "down" }
    ],
    tablaTitulo: "Top estudiantes en Anatomía"
});

const defaultConfig = (ColorsDoc) => ({
    descripcion: "Reportes generales de la carrera y desempeño académico.",
    metricasByTab: {
        general: [
            {
                label: "Promedio General",
                value: "78.5%",
                change: "+5.2%",
                trend: "up",
                color: ColorsDoc.primary
            },
            {
                label: "Tasa de Aprobación",
                value: "85%",
                change: "+3.1%",
                trend: "up",
                color: "#4ECDC4"
            },
            {
                label: "Asistencia Promedio",
                value: "92%",
                change: "-1.5%",
                trend: "down",
                color: "#FFA500"
            },
            {
                label: "Tareas Completadas",
                value: "73%",
                change: "+8.3%",
                trend: "up",
                color: "#9B59B6"
            }
        ],
        estudiantes: [],
        materias: [],
        temporal: []
    },
    topEstudiantes: [
        { nombre: "María López", promedio: 95, tendencia: "up" },
        { nombre: "Carlos Rodríguez", promedio: 92, tendencia: "up" },
        { nombre: "Ana García", promedio: 88, tendencia: "stable" },
        { nombre: "Luis Martínez", promedio: 87, tendencia: "up" },
        { nombre: "Sofia Pérez", promedio: 85, tendencia: "down" }
    ],
    tablaTitulo: "Top estudiantes"
});

// ================= COMPONENTE =================

const ReportesDi = () => {
    const ColorsDoc = useColors();
    const { user } = useUser();
    const [activeTab, setActiveTab] = useState("general");

    const email = (user?.correo || user?.email || "").toLowerCase();

    let config;
    if (email.includes("cbbe.fabiolaevelyn.cadima.sa@unifranz.edu.bo") || email.includes("sis")) {
        config = sistemasConfig(ColorsDoc);
    } else if (email.includes("cbbe.shirley.guzman@unifranz.edu.bo") || email.includes("med")) {
        config = medicinaConfig(ColorsDoc);
    } else {
        config = defaultConfig(ColorsDoc);
    }

    const metricas =
        config.metricasByTab[activeTab] && config.metricasByTab[activeTab].length
            ? config.metricasByTab[activeTab]
            : config.metricasByTab.general;

    const topEstudiantes = config.topEstudiantes;

    // ======== DATOS PARA LA GRÁFICA (100% SIMULADO PERO VISIBLE) ========
    const chartData = useMemo(() => {
        // Valores “porcentaje” para las barras
        if (email.includes("cbbe.fabiolaevelyn.cadima.sa@unifranz.edu.bo") || email.includes("sis")) {
            if (activeTab === "temporal") {
                return [
                    { label: "Ago", value: 52 },
                    { label: "Sep", value: 41 },
                    { label: "Oct", value: 75 },
                    { label: "Nov", value: 79 },
                    { label: "Dic", value: 82 },
                    { label: "Ene", value: 84 }
                ];
            }
            // ⬇️ Solo 5 hitos
            return [
                { label: "H1", value: 72 },
                { label: "H2", value: 78 },
                { label: "H3", value: 83 },
                { label: "H4", value: 86 },
                { label: "H5", value: 88 }
            ];
        }


        if (email.includes("cbbe.shirley.guzman@unifranz.edu.bo") || email.includes("med")) {
            if (activeTab === "temporal") {
                return [
                    { label: "Ago", value: 70 },
                    { label: "Sep", value: 74 },
                    { label: "Oct", value: 78 },
                    { label: "Nov", value: 81 },
                    { label: "Dic", value: 83 },
                    { label: "Ene", value: 86 }
                ];
            }
            return [
                { label: "Práct. 1", value: 80 },
                { label: "Práct. 2", value: 82 },
                { label: "Teo. 1", value: 79 },
                { label: "Teo. 2", value: 84 },
                { label: "Parcial", value: 86 },
                { label: "Final", value: 88 }
            ];
        }

        // default
        return [
            { label: "Ago", value: 70 },
            { label: "Sep", value: 73 },
            { label: "Oct", value: 76 },
            { label: "Nov", value: 79 },
            { label: "Dic", value: 81 },
            { label: "Ene", value: 78 }
        ];
    }, [email, activeTab]);

    const maxValue = Math.max(...chartData.map((d) => d.value));

    return (
        <Container>
            <CardHeader
                ColorsMa={ColorsDoc}
                title="Reportes y Análisis"
                parrafo={config.descripcion}
            />

            <TabsNav>
                <TabButton
                    active={activeTab === "general"}
                    onClick={() => setActiveTab("general")}
                    style={{
                        borderBottom:
                            activeTab === "general"
                                ? `3px solid ${ColorsDoc.primary}`
                                : "none"
                    }}
                >
                    <BarChart3 size={20} />
                    General
                </TabButton>
                <TabButton
                    active={activeTab === "estudiantes"}
                    onClick={() => setActiveTab("estudiantes")}
                    style={{
                        borderBottom:
                            activeTab === "estudiantes"
                                ? `3px solid ${ColorsDoc.primary}`
                                : "none"
                    }}
                >
                    <Users size={20} />
                    Por Estudiante
                </TabButton>
                <TabButton
                    active={activeTab === "materias"}
                    onClick={() => setActiveTab("materias")}
                    style={{
                        borderBottom:
                            activeTab === "materias"
                                ? `3px solid ${ColorsDoc.primary}`
                                : "none"
                    }}
                >
                    <Award size={20} />
                    Por Materia
                </TabButton>
                <TabButton
                    active={activeTab === "temporal"}
                    onClick={() => setActiveTab("temporal")}
                    style={{
                        borderBottom:
                            activeTab === "temporal"
                                ? `3px solid ${ColorsDoc.primary}`
                                : "none"
                    }}
                >
                    <Calendar size={20} />
                    Temporal
                </TabButton>
            </TabsNav>

            <ReportsContent>
                <StatsGrid>
                    {metricas.map((metrica, index) => (
                        <MetricCard key={index}>
                            <MetricValue style={{ color: metrica.color }}>
                                {metrica.value}
                            </MetricValue>
                            <MetricLabel>{metrica.label}</MetricLabel>
                            <MetricChange trend={metrica.trend}>
                                {metrica.trend === "up" ? (
                                    <ArrowUp size={16} />
                                ) : (
                                    <ArrowDown size={16} />
                                )}
                                {metrica.change}
                            </MetricChange>
                        </MetricCard>
                    ))}
                </StatsGrid>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "2fr 1fr",
                        gap: "2rem",
                        marginTop: "2rem"
                    }}
                >
                    <ChartCard>
                        <ChartHeader>
                            <ChartTitle>
                                {activeTab === "temporal"
                                    ? "Evolución temporal"
                                    : activeTab === "materias"
                                        ? "Comparativo por materia"
                                        : "Rendimiento por periodo"}
                            </ChartTitle>
                            <ChartFilter>
                                <select>
                                    <option>Último Semestre</option>
                                    <option>Último Año</option>
                                    <option>Todo</option>
                                </select>
                            </ChartFilter>
                        </ChartHeader>

                        {/* Gráfica de barras simulada (100% visible) */}
                        <div
                            style={{
                                height: "300px",
                                background: "#f8f9fa",
                                borderRadius: "8px",
                                padding: "16px 24px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between"
                            }}
                        >
                            <div
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    alignItems: "flex-end",
                                    gap: "12px"
                                }}
                            >
                                {chartData.map((item) => {
                                    const heightPct = (item.value / maxValue) * 100;
                                    return (
                                        <div
                                            key={item.label}
                                            style={{
                                                flex: 1,
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                gap: 6,
                                                fontSize: "0.75rem",
                                                color: "#6b7280"
                                            }}
                                        >
                                            <div
                                                style={{
                                                    height: "220px",
                                                    display: "flex",
                                                    alignItems: "flex-end",
                                                    width: "100%"
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: "70%",
                                                        margin: "0 auto",
                                                        borderRadius: "999px",
                                                        background: "#e5e7eb",
                                                        overflow: "hidden",
                                                        position: "relative",
                                                        height: "250px"
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            bottom: 0,
                                                            left: 0,
                                                            right: 0,
                                                            height: `${heightPct}%`,
                                                            background: ColorsDoc.primary,
                                                            transition: "height 0.6s ease"
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <span style={{ fontWeight: 600 }}>{item.label}</span>
                                            <span style={{ fontSize: "0.7rem", color: "#9ca3af" }}>
                                                {item.value}%
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            <div
                                style={{
                                    marginTop: "8px",
                                    textAlign: "center",
                                    fontSize: "0.8rem",
                                    color: "#9ca3af",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 6
                                }}
                            >
                            </div>
                        </div>
                    </ChartCard>

                    <TableCard>
                        <ChartHeader>
                            <ChartTitle>{config.tablaTitulo}</ChartTitle>
                        </ChartHeader>

                        <TableReport>
                            <thead>
                                <tr>
                                    <th>Estudiante</th>
                                    <th>Promedio</th>
                                    <th>Tendencia</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topEstudiantes.map((estudiante, index) => (
                                    <tr key={index}>
                                        <td>{estudiante.nombre}</td>
                                        <td>
                                            <strong style={{ color: ColorsDoc.primary }}>
                                                {estudiante.promedio}%
                                            </strong>
                                        </td>
                                        <td>
                                            {estudiante.tendencia === "up" && (
                                                <TrendingUp size={16} color="#4ECDC4" />
                                            )}
                                            {estudiante.tendencia === "down" && (
                                                <ArrowDown size={16} color="#FF6B6B" />
                                            )}
                                            {estudiante.tendencia === "stable" && (
                                                <span style={{ color: "#FFA500" }}>—</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </TableReport>

                        <ExportActions>
                            <ExportButton>
                                <Download size={18} />
                                Exportar PDF
                            </ExportButton>
                            <ExportButton>
                                <FileText size={18} />
                                Exportar Excel
                            </ExportButton>
                        </ExportActions>
                    </TableCard>
                </div>
            </ReportsContent>
        </Container>
    );
};

export default ReportesDi;
