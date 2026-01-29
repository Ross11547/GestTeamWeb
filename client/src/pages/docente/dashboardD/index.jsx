// Roxy: Dashboard Docente simulando 3 perfiles distintos según el usuario

import React, { useState, useEffect } from "react";
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
    NotificationBadge
} from "../../../style/docente/dashboardDocenteStyled";
import {
    Book,
    Users,
    Calendar,
    Clock,
    FileText,
    Award,
    Bell,
    ChevronRight
} from "lucide-react";
import { useColors } from "../../../style/colors";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/useContext"; // <- importante
import CardHeader from "../../../components/ui/cardHeader";

// Helper: devuelve data simulada según el docente logueado
const getDashboardDataForTeacher = (user, ColorsDoc) => {
    // CONFIG 1: Docente de Redes I, Redes II, Seguridad Informática
    const redesConfig = {
        subtitle: "Redes y Seguridad Informática",
        stats: [
            { id: 1, label: "Materias Activas", value: 3, icon: Book, color: ColorsDoc.primary },
            { id: 2, label: "Total Estudiantes", value: 92, icon: Users, color: ColorsDoc.secondary },
            { id: 3, label: "Proyectos de Red en curso", value: 6, icon: FileText, color: "#FF6B6B" },
            { id: 4, label: "Aprobación promedio", value: "81%", icon: Award, color: "#4ECDC4" }
        ],
        todayClasses: [
            { id: 1, time: "07:30 - 09:00", title: "Redes I", room: "Lab Redes 201", students: 30 },
            { id: 2, time: "09:30 - 11:00", title: "Redes II", room: "Lab Redes 202", students: 32 },
            { id: 3, time: "14:00 - 16:00", title: "Seguridad Informática", room: "Aula 305", students: 30 }
        ],
        recentActivity: [
            { id: 1, text: "Subido informe de topología para Redes II", time: "Hace 1 hora", type: "entrega" },
            { id: 2, text: "Configuración de firewall entregada por 18 estudiantes", time: "Hace 4 horas", type: "quiz" },
            { id: 3, text: "Reunión con coordinación sobre laboratorio de redes", time: "Ayer", type: "reunion" },
            { id: 4, text: "Fecha límite próxima: Proyecto de segmentación VLANs", time: "En 3 días", type: "examen" }
        ]
    };

    const controlConfig = {
        subtitle: "Control, Integrador Final y Embebidos",
        stats: [
            { id: 1, label: "Materias Activas", value: 3, icon: Book, color: ColorsDoc.primary },
            { id: 2, label: "Total Estudiantes", value: 78, icon: Users, color: ColorsDoc.secondary },
            { id: 3, label: "Proyectos en laboratorio", value: 9, icon: FileText, color: "#FF6B6B" },
            { id: 4, label: "Proyectos listos para feria", value: 4, icon: Award, color: "#4ECDC4" }
        ],
        todayClasses: [
            { id: 1, time: "08:00 - 10:00", title: "Sistemas de Control", room: "Lab Control 101", students: 26 },
            { id: 2, time: "11:00 - 13:00", title: "Programación de Sistemas Embebidos", room: "Lab Embebidos 204", students: 24 },
            { id: 3, time: "15:00 - 17:30", title: "Integrador Final", room: "Sala de proyectos", students: 28 }
        ],
        recentActivity: [
            { id: 1, text: "Subido avance de prototipo con PID", time: "Hace 30 minutos", type: "entrega" },
            { id: 2, text: "Validado esquema de sensores en Integrador Final", time: "Hace 3 horas", type: "quiz" },
            { id: 3, text: "Reunión de revisión de rúbricas de feria", time: "Ayer", type: "reunion" },
            { id: 4, text: "Deadline prototipo funcional de embebidos", time: "En 5 días", type: "examen" }
        ]
    };

    // CONFIG 3: Docente de Testing
    const testingConfig = {
        subtitle: "Calidad y Testing de Software",
        stats: [
            { id: 1, label: "Materias Activas", value: 1, icon: Book, color: ColorsDoc.primary },
            { id: 2, label: "Total Estudiantes", value: 41, icon: Users, color: ColorsDoc.secondary },
            { id: 3, label: "Casos de prueba en revisión", value: 14, icon: FileText, color: "#FF6B6B" },
            { id: 4, label: "Cobertura promedio", value: "72%", icon: Award, color: "#4ECDC4" }
        ],
        todayClasses: [
            { id: 1, time: "18:30 - 20:00", title: "Testing de Software", room: "Lab QA 101", students: 41 }
        ],
        recentActivity: [
            { id: 1, text: "Nuevo set de pruebas para módulo de login", time: "Hace 2 horas", type: "entrega" },
            { id: 2, text: "12 estudiantes completaron práctica de CI/CD + tests", time: "Hace 6 horas", type: "quiz" },
            { id: 3, text: "Reunión para definir criterios de aceptación", time: "Hace 2 días", type: "reunion" },
            { id: 4, text: "Fecha límite próxima: Plan de pruebas final", time: "En 1 semana", type: "examen" }
        ]
    };

    const defaultConfig = {
        subtitle: "Gestión Académica",
        stats: [
            { id: 1, label: "Materias Activas", value: 4, icon: Book, color: ColorsDoc.primary },
            { id: 2, label: "Total Estudiantes", value: 127, icon: Users, color: ColorsDoc.secondary },
            { id: 3, label: "Tareas Pendientes", value: 23, icon: FileText, color: "#FF6B6B" },
            { id: 4, label: "Promedio General", value: "78%", icon: Award, color: "#4ECDC4" }
        ],
        todayClasses: [
            { id: 1, time: "07:30 - 10:00", title: "Ingeniería de Software I", room: "Aula 301", students: 35 },
            { id: 2, time: "10:30 - 13:00", title: "Programación Avanzada", room: "Lab 202", students: 28 },
            { id: 3, time: "14:00 - 16:30", title: "Arquitectura de Software", room: "Aula 405", students: 32 }
        ],
        recentActivity: [
            { id: 1, text: "Nueva entrega: Proyecto Final - Ing. Software", time: "Hace 2 horas", type: "entrega" },
            { id: 2, text: "15 estudiantes completaron el Quiz #3", time: "Hace 5 horas", type: "quiz" },
            { id: 3, text: "Reunión de coordinación programada", time: "Hace 1 día", type: "reunion" },
            { id: 4, text: "Fecha límite próxima: Parcial Prog. Avanzada", time: "En 2 días", type: "examen" }
        ]
    };

    const email = (user?.email || user?.correo || "").toLowerCase();

    if (email === "cbbe.gustavo.rivera@unifranz.edu.bo") return redesConfig;
    if (email === "cbbe.fernando.hinojosa.sa@unifranz.edu.bo") return controlConfig;
    if (email === "cbbe.gabriela.becerra.vi@unifranz.edu.bo") return testingConfig;

    return defaultConfig;
};

const DashboardD = () => {
    const ColorsDoc = useColors();
    const navigate = useNavigate();
    const { user } = useUser(); // <- usuario logueado

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const { stats, todayClasses, recentActivity, subtitle } =
        getDashboardDataForTeacher(user, ColorsDoc);

    const quickAccess = [
        {
            id: 1,
            title: "Mis Materias",
            icon: Book,
            path: "/docente/materias",
            color: ColorsDoc.primary
        },
        {
            id: 2,
            title: "Calendario de Proyectos",
            icon: Calendar,
            path: "/docente/calendario",
            color: ColorsDoc.secondary
        },
        {
            id: 3,
            title: "Recursos y Rúbricas",
            icon: FileText,
            path: "/docente/recursos",
            color: "#9B59B6"
        }
    ];

    const getGreeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12) return "Buenos días";
        if (hour < 19) return "Buenas tardes";
        return "Buenas noches";
    };

    return (
        <Container>

            <CardHeader
                ColorsMa={ColorsDoc}
                title="Bienvenido al Dashboard Docente"
            >
            </CardHeader>

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

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "2rem",
                    marginTop: "2rem"
                }}
            >
                <ScheduleSection>
                    <h2 style={{ marginBottom: "1rem", color: "#2c3e50" }}>
                        Clases de Hoy
                    </h2>
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
                    <h2 style={{ marginBottom: "1rem", color: "#2c3e50" }}>
                        Actividad Reciente
                    </h2>
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

            <h2
                style={{
                    marginTop: "2rem",
                    marginBottom: "1rem",
                    color: "#2c3e50"
                }}
            >
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
        </Container>
    );
};

export default DashboardD;
