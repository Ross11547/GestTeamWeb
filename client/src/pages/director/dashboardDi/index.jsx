// Roxy: Dashboard Director con métricas que cambian según el correo del director

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
    Container,
    StatsGrid,
    StatCard,
    StatIcon,
    StatContent,
    StatNumber,
    StatLabel,
    ScheduleSection,
    ScheduleCard,
    ClassItem,
    ClassTime,
    ClassInfo,
    ClassTitle,
    ClassRoom,
    ActivitySection,
    ActivityCard,
    ActivityItem,
    ActivityDot,
    ActivityContent,
    ActivityTime,
    ActivityText,
    QuickAccessGrid,
    QuickCard,
    QuickIcon,
    QuickTitle,
    HeaderDashboard,
    WelcomeSection,
    WelcomeText,
    DateText,
    NotificationBadge,
} from "../../../style/docente/dashboardDocenteStyled";
import {
    Book,
    Users,
    Calendar,
    Clock,
    FileText,
    Award,
    Bell,
    ChevronRight,
    Activity,
    AlertTriangle,
} from "lucide-react";
import { useColors } from "../../../style/colors";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/useContext"; // ajusta la ruta si fuera necesario
import CardHeader from "../../../components/ui/cardHeader";

const DashboardDi = () => {
    const ColorsDoc = useColors();
    const navigate = useNavigate();
    const { user } = useUser();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // ================= CONFIG POR DIRECTOR (según correo) =================
    const email = (user?.correo || user?.email || "").toLowerCase();

    // Director Ingeniería de Sistemas (Integrador III)
    const sistemasConfig = {
        headerTitle: "Director Ingeniería de Sistemas",
        stats: {
            materiasActivas: 1,
            totalEstudiantes: 64,
            tareasPendientes: 9,
            promedioGeneral: "81%",
        },
        todayClasses: [
            {
                id: 1,
                time: "08:00 - 11:00",
                title: "Integrador III",
                room: "Lab 501",
                students: 32,
            },
        ],
        recentActivity: [
            {
                id: 1,
                text: "Se registraron 4 nuevos avances en Integrador III",
                time: "Hace 1 hora",
                type: "entrega",
            },
            {
                id: 2,
                text: "2 proyectos marcados como destacados por el tribunal",
                time: "Hace 3 horas",
                type: "reunion",
            },
            {
                id: 3,
                text: "Actualización de rúbricas de evaluación de proyectos",
                time: "Hace 1 día",
                type: "examen",
            },
            {
                id: 4,
                text: "Notificaciones enviadas a equipos con retraso",
                time: "Hace 2 días",
                type: "alerta",
            },
        ],
        studentsBySemester: [
            { semester: "5to Semestre", count: 34 },
            { semester: "7mo Semestre", count: 30 },
        ],
        projectStats: {
            active: 12,
            featured: 4,
        },
        fairs: [
            {
                id: 1,
                name: "Feria de Proyectos Integradores – Sistemas",
                date: "10/12/2024",
                type: "Próxima",
                projects: 24,
            },
            {
                id: 2,
                name: "Expo Innovación Tecnológica",
                date: "25/11/2024",
                type: "Reciente",
                projects: 18,
            },
        ],
        iaAlerts: {
            highSimilarityPercent: 14,
            totalProjects: 40,
            flaggedProjects: 6,
            lastRun: "Hace 3 horas",
        },
    };

    // Director Medicina (Anatomía)
    const medicinaConfig = {
        headerTitle: "Director Medicina",
        stats: {
            materiasActivas: 1,
            totalEstudiantes: 180,
            tareasPendientes: 3,
            promedioGeneral: "86%",
        },
        todayClasses: [
            {
                id: 1,
                time: "09:00 - 12:00",
                title: "Anatomía Humana I",
                room: "Aula de Anatomía 2",
                students: 90,
            },
            {
                id: 2,
                time: "14:00 - 17:00",
                title: "Anatomía Humana II (Laboratorio)",
                room: "Lab de Disección",
                students: 90,
            },
        ],
        recentActivity: [
            {
                id: 1,
                text: "Se subieron nuevas guías de laboratorio de Anatomía",
                time: "Hace 40 minutos",
                type: "recurso",
            },
            {
                id: 2,
                text: "Acta de reunión con docentes de Anatomía firmada",
                time: "Hace 4 horas",
                type: "reunion",
            },
            {
                id: 3,
                text: "Actualización de cronograma de prácticas",
                time: "Hace 1 día",
                type: "examen",
            },
            {
                id: 4,
                text: "Recordatorio enviado a estudiantes sobre normas de laboratorio",
                time: "Hace 2 días",
                type: "alerta",
            },
        ],
        studentsBySemester: [
            { semester: "2do Semestre", count: 95 },
            { semester: "3er Semestre", count: 85 },
        ],
        projectStats: {
            active: 6, // por ejemplo casos clínicos / proyectos integradores
            featured: 2,
        },
        fairs: [
            {
                id: 1,
                name: "Jornada de Casos Clínicos – Medicina",
                date: "15/12/2024",
                type: "Próxima",
                projects: 12,
            },
            {
                id: 2,
                name: "Feria de Ciencias de la Salud",
                date: "30/11/2024",
                type: "Reciente",
                projects: 20,
            },
        ],
        iaAlerts: {
            highSimilarityPercent: 8,
            totalProjects: 25,
            flaggedProjects: 2,
            lastRun: "Hace 1 hora",
        },
    };

    // Config general por defecto (por si el correo no matchea)
    const defaultConfig = {
        headerTitle: "Director de Carrera",
        stats: {
            materiasActivas: 4,
            totalEstudiantes: 127,
            tareasPendientes: 23,
            promedioGeneral: "78%",
        },
        todayClasses: [
            {
                id: 1,
                time: "07:30 - 10:00",
                title: "Ingeniería de Software I",
                room: "Aula 301",
                students: 35,
            },
            {
                id: 2,
                time: "10:30 - 13:00",
                title: "Programación Avanzada",
                room: "Lab 202",
                students: 28,
            },
            {
                id: 3,
                time: "14:00 - 16:30",
                title: "Arquitectura de Software",
                room: "Aula 405",
                students: 32,
            },
        ],
        recentActivity: [
            {
                id: 1,
                text: "Nueva entrega: Proyecto Final - Ing. Software",
                time: "Hace 2 horas",
                type: "entrega",
            },
            {
                id: 2,
                text: "15 estudiantes completaron el Quiz #3",
                time: "Hace 5 horas",
                type: "quiz",
            },
            {
                id: 3,
                text: "Reunión de coordinación programada",
                time: "Hace 1 día",
                type: "reunion",
            },
            {
                id: 4,
                text: "Fecha límite próxima: Parcial Prog. Avanzada",
                time: "En 2 días",
                type: "examen",
            },
        ],
        studentsBySemester: [
            { semester: "1er Semestre", count: 42 },
            { semester: "3er Semestre", count: 35 },
            { semester: "5to Semestre", count: 28 },
            { semester: "7mo Semestre", count: 22 },
        ],
        projectStats: {
            active: 12,
            featured: 4,
        },
        fairs: [
            {
                id: 1,
                name: "Feria de Innovación Tecnológica",
                date: "25/11/2024",
                type: "Reciente",
                projects: 18,
            },
            {
                id: 2,
                name: "Feria de Proyectos Integradores",
                date: "10/12/2024",
                type: "Próxima",
                projects: 24,
            },
            {
                id: 3,
                name: "Expo Emprendimiento UNIFRANZ",
                date: "20/12/2024",
                type: "Próxima",
                projects: 30,
            },
        ],
        iaAlerts: {
            highSimilarityPercent: 12,
            totalProjects: 50,
            flaggedProjects: 6,
            lastRun: "Hace 3 horas",
        },
    };

    // Elegir config según correo
    let config = defaultConfig;
    if (email.includes("cbbe.fabiolaevelyn.cadima.sa@unifranz.edu.bo") || email.includes("sis")) {
        config = sistemasConfig;
    } else if (email.includes("cbbe.shirley.guzman@unifranz.edu.bo") || email.includes("med")) {
        config = medicinaConfig;
    }

    // ================= DERIVADOS PARA EL DASHBOARD =================
    const stats = [
        {
            id: 1,
            label: "Materias Activas",
            value: config.stats.materiasActivas,
            icon: Book,
            color: ColorsDoc.primary,
        },
        {
            id: 2,
            label: "Total Estudiantes",
            value: config.stats.totalEstudiantes,
            icon: Users,
            color: ColorsDoc.secondary,
        },
        {
            id: 3,
            label: "Entregas / Avances Pendientes",
            value: config.stats.tareasPendientes,
            icon: FileText,
            color: "#FF6B6B",
        },
        {
            id: 4,
            label: "Promedio General",
            value: config.stats.promedioGeneral,
            icon: Award,
            color: "#4ECDC4",
        },
    ];

    const todayClasses = config.todayClasses;
    const recentActivity = config.recentActivity;
    const studentsBySemester = config.studentsBySemester;
    const projectStats = config.projectStats;
    const fairs = config.fairs;
    const iaAlerts = config.iaAlerts;

    // Accesos rápidos (mismo layout, independiente del director)
    const quickAccess = [
        {
            id: 1,
            title: "Mis Materias",
            icon: Book,
            path: "/director/materias",
            color: ColorsDoc.primary,
        },
        {
            id: 2,
            title: "Calendario",
            icon: Calendar,
            path: "/director/calendario",
            color: ColorsDoc.secondary,
        },
        {
            id: 3,
            title: "Recursos",
            icon: FileText,
            path: "/director/recursos",
            color: "#9B59B6",
        },
        {
            id: 4,
            title: "Reportes",
            icon: Award,
            path: "/director/reportes",
            color: "#E67E22",
        },
    ];

    return (
        <Container>
            <CardHeader
                ColorsMa={ColorsDoc}
                title="Bienvenido al Dashboard Director"
            />

            {/* Tarjetas principales */}
            <StatsGrid>
                {stats.map((stat) => (
                    <StatCard key={stat.id}>
                        <StatIcon style={{ background: `${stat.color}15` }}>
                            <stat.icon size={28} color={stat.color} />
                        </StatIcon>
                        <StatContent>
                            <StatNumber>{stat.value}</StatNumber>
                            <StatLabel>{stat.label}</StatLabel>
                        </StatContent>
                    </StatCard>
                ))}
            </StatsGrid>

            {/* Clases del día + actividad reciente */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "2rem",
                    marginTop: "2rem",
                }}
            >
                <ScheduleSection>
                    <h2 style={{ marginBottom: "1rem", color: "#2c3e50" }}>Clases de Hoy</h2>
                    <ScheduleCard>
                        {todayClasses.map((classItem) => (
                            <ClassItem key={classItem.id}>
                                <ClassTime>
                                    <Clock size={20} color={ColorsDoc.primary} />
                                    {classItem.time}
                                </ClassTime>
                                <ClassInfo>
                                    <ClassTitle>{classItem.title}</ClassTitle>
                                    <ClassRoom>
                                        {classItem.room} • {classItem.students} estudiantes
                                    </ClassRoom>
                                </ClassInfo>
                                <ChevronRight size={20} color="#CBD5E0" />
                            </ClassItem>
                        ))}
                    </ScheduleCard>
                </ScheduleSection>

                <ActivitySection>
                    <h2 style={{ marginBottom: "1rem", color: "#2c3e50" }}>Actividad Reciente</h2>
                    <ActivityCard>
                        {recentActivity.map((activity) => (
                            <ActivityItem key={activity.id}>
                                <ActivityDot type={activity.type} />
                                <ActivityContent>
                                    <ActivityText>{activity.text}</ActivityText>
                                    <ActivityTime>{activity.time}</ActivityTime>
                                </ActivityContent>
                            </ActivityItem>
                        ))}
                    </ActivityCard>
                </ActivitySection>
            </div>

            {/* Acceso rápido */}
            <h2 style={{ marginTop: "2rem", marginBottom: "1rem", color: "#2c3e50" }}>
                Acceso Rápido
            </h2>
            <QuickAccessGrid>
                {quickAccess.map((item) => (
                    <QuickCard
                        key={item.id}
                        onClick={() => navigate(item.path)}
                        style={{ borderTop: `4px solid ${item.color}` }}
                    >
                        <QuickIcon style={{ background: `${item.color}15` }}>
                            <item.icon size={32} color={item.color} />
                        </QuickIcon>
                        <QuickTitle>{item.title}</QuickTitle>
                    </QuickCard>
                ))}
            </QuickAccessGrid>

            {/* ================= BLOQUE DE INFORMES ================= */}
            <ExtraSection>
                {/* Estudiantes por semestre + Proyectos */}
                <TwoColumnGrid>
                    <SectionCard>
                        <SectionHeader>
                            <SectionTitle>
                                <Users size={18} style={{ marginRight: 6 }} />
                                Estudiantes por semestre
                            </SectionTitle>
                        </SectionHeader>
                        <SimpleTable>
                            <thead>
                                <tr>
                                    <th>Semestre</th>
                                    <th style={{ textAlign: "right" }}>N° Estudiantes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentsBySemester.map((row) => (
                                    <tr key={row.semester}>
                                        <td>{row.semester}</td>
                                        <td style={{ textAlign: "right" }}>{row.count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </SimpleTable>
                    </SectionCard>

                    <SectionCard>
                        <SectionHeader>
                            <SectionTitle>
                                <Activity size={18} style={{ marginRight: 6 }} />
                                Proyectos / Casos activos
                            </SectionTitle>
                        </SectionHeader>
                        <ProjectStatsRow>
                            <ProjectStatBox>
                                <ProjectStatLabel>Activos</ProjectStatLabel>
                                <ProjectStatNumber>{projectStats.active}</ProjectStatNumber>
                            </ProjectStatBox>
                            <ProjectStatBox>
                                <ProjectStatLabel>Destacados</ProjectStatLabel>
                                <ProjectStatNumber>{projectStats.featured}</ProjectStatNumber>
                            </ProjectStatBox>
                        </ProjectStatsRow>
                        <SmallHint>
                            Datos consolidados de los proyectos registrados en la carrera.
                        </SmallHint>
                    </SectionCard>
                </TwoColumnGrid>

                {/* Ferias + Alertas IA */}
                <TwoColumnGrid style={{ marginTop: "1.5rem" }}>
                    <SectionCard>
                        <SectionHeader>
                            <SectionTitle>
                                <Calendar size={18} style={{ marginRight: 6 }} />
                                Ferias y jornadas
                            </SectionTitle>
                        </SectionHeader>
                        <FairsList>
                            {fairs.map((fair) => (
                                <FairItem key={fair.id}>
                                    <div>
                                        <FairName>{fair.name}</FairName>
                                        <FairMeta>
                                            {fair.date} • {fair.projects} proyectos
                                        </FairMeta>
                                    </div>
                                    <FairTag tipo={fair.type}>{fair.type}</FairTag>
                                </FairItem>
                            ))}
                        </FairsList>
                    </SectionCard>

                    <SectionCard>
                        <SectionHeader>
                            <SectionTitle>
                                <AlertTriangle size={18} style={{ marginRight: 6 }} />
                                Alertas de similitud / IA
                            </SectionTitle>
                        </SectionHeader>
                        <IaStats>
                            <IaMainNumber>{iaAlerts.highSimilarityPercent}%</IaMainNumber>
                            <IaLabel>proyectos con similitud alta</IaLabel>
                            <IaDetail>
                                {iaAlerts.flaggedProjects} de {iaAlerts.totalProjects} proyectos
                                fueron marcados para revisión detallada.
                            </IaDetail>
                            <IaLastRun>Último análisis: {iaAlerts.lastRun}</IaLastRun>
                        </IaStats>
                    </SectionCard>
                </TwoColumnGrid>
            </ExtraSection>
        </Container>
    );
};

export default DashboardDi;

/* ========= ESTILOS LOCALES PARA LA PARTE NUEVA ========= */

const ExtraSection = styled.div`
  margin-top: 2rem;
`;

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const SectionCard = styled.div`
  background: #ffffff;
  border-radius: 18px;
  padding: 14px 16px;
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.08);
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

const SimpleTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  thead {
    background: #f9fafb;
  }
  th,
  td {
    padding: 6px 4px;
  }
  th {
    text-align: left;
    font-weight: 600;
    color: #6b7280;
  }
  tbody tr:nth-child(even) {
    background: #f9fafb;
  }
`;

const ProjectStatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 4px;
`;

const ProjectStatBox = styled.div`
  border-radius: 12px;
  background: #f9fafb;
  padding: 8px 10px;
`;

const ProjectStatLabel = styled.div`
  font-size: 12px;
  color: #6b7280;
`;

const ProjectStatNumber = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #111827;
`;

const SmallHint = styled.p`
  margin-top: 8px;
  font-size: 11px;
  color: #9ca3af;
`;

const FairsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 4px;
`;

const FairItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  border-radius: 10px;
  background: #f9fafb;
`;

const FairName = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #111827;
`;

const FairMeta = styled.div`
  font-size: 11px;
  color: #6b7280;
`;

const FairTag = styled.span`
  padding: 3px 8px;
  border-radius: 999px;
  font-size: 11px;
  ${({ tipo }) =>
        tipo === "Próxima"
            ? "background:#DBEAFE;color:#1D4ED8;"
            : "background:#ECFDF5;color:#15803D;"}
`;

const IaStats = styled.div`
  margin-top: 6px;
  text-align: left;
`;

const IaMainNumber = styled.div`
  font-size: 26px;
  font-weight: 700;
  color: #b91c1c;
`;

const IaLabel = styled.div`
  font-size: 13px;
  color: #374151;
`;

const IaDetail = styled.div`
  margin-top: 6px;
  font-size: 12px;
  color: #4b5563;
`;

const IaLastRun = styled.div`
  margin-top: 4px;
  font-size: 11px;
  color: #9ca3af;
`;
