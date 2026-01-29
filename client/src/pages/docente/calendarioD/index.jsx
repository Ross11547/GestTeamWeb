import React, { useState } from "react";
import {
    Container,
    HeaderCalendario,
    TabsContainer,
    TabButton,
    ContentArea,
    QuickStats,
    StatItem,
    StatIcon,
    StatInfo,
    StatValue,
    StatLabel
} from "../../../style/docente/calendarioDStyled";
import {
    Calendar,
    Clock,
    Bell,
    Users,
    FileText
} from "lucide-react";
import { useColors } from "../../../style/colors";
import HorarioDocente from "../horariosD/inde";
import EventosDocente from "../eventosD/index";
import TareasDocente from "../tareasD/index";
import { useUser } from "../../../context/useContext";
import CardHeader from "../../../components/ui/cardHeader";

// 🔹 Helper: stats simulados según el docente logueado
const getCalendarStatsForTeacher = (user, ColorsDoc) => {
    const email = (user?.email || user?.correo || "").toLowerCase();

    // Docente 1: Redes I, Redes II, Seguridad Informática
    const redesStats = [
        { icon: Clock, label: "Clases Hoy", value: "2", color: ColorsDoc.primary },
        { icon: Bell, label: "Eventos Próximos", value: "3", color: ColorsDoc.secondary },
        { icon: FileText, label: "Tareas Pendientes", value: "5", color: "#FFA500" },
        { icon: Users, label: "Reuniones", value: "1", color: "#9B59B6" }
    ];

    // Docente 2: Sistemas de Control, Integrador Final, Embebidos
    const controlStats = [
        { icon: Clock, label: "Clases Hoy", value: "3", color: ColorsDoc.primary },
        { icon: Bell, label: "Eventos Próximos", value: "4", color: ColorsDoc.secondary },
        { icon: FileText, label: "Tareas Pendientes", value: "8", color: "#FFA500" },
        { icon: Users, label: "Reuniones", value: "2", color: "#9B59B6" }
    ];

    // Docente 3: Testing
    const testingStats = [
        { icon: Clock, label: "Clases Hoy", value: "1", color: ColorsDoc.primary },
        { icon: Bell, label: "Eventos Próximos", value: "2", color: ColorsDoc.secondary },
        { icon: FileText, label: "Tareas Pendientes", value: "4", color: "#FFA500" },
        { icon: Users, label: "Reuniones", value: "0", color: "#9B59B6" }
    ];

    if (email === "cbbe.gustavo.rivera@unifranz.edu.bo") return redesStats;
    if (email === "cbbe.fernando.hinojosa.sa@unifranz.edu.bo") return controlStats;
    if (email === "cbbe.gabriela.becerra.vi@unifranz.edu.bo") return testingStats;

    // Default
    return [
        { icon: Clock, label: "Clases Hoy", value: "3", color: ColorsDoc.primary },
        { icon: Bell, label: "Eventos Próximos", value: "5", color: ColorsDoc.secondary },
        { icon: FileText, label: "Tareas Pendientes", value: "12", color: "#FFA500" },
        { icon: Users, label: "Reuniones", value: "2", color: "#9B59B6" }
    ];
};

const CalendarioD = () => {
    const ColorsDoc = useColors();
    const { user } = useUser();
    const [activeTab, setActiveTab] = useState("horario");

    // 🔹 Stats dinámicos según el docente
    const stats = getCalendarStatsForTeacher(user, ColorsDoc);

    const renderContent = () => {
        switch (activeTab) {
            case "horario":
                return <HorarioDocente />;
            case "eventos":
                return <EventosDocente ColorsDoc={ColorsDoc} />;
            case "tareas":
                return <TareasDocente ColorsDoc={ColorsDoc} />;
            default:
                return <HorarioDocente />;
        }
    };

    return (
        <Container>
            <CardHeader ColorsMa={ColorsDoc}  title="Calendario Académico">
                <QuickStats>
                    {stats.map((stat, index) => (
                        <StatItem key={index}>
                            <StatIcon style={{ background: `${stat.color}15` }}>
                                <stat.icon size={24} color={stat.color} />
                            </StatIcon>
                            <StatInfo>
                                <StatValue style={{ color: "black" }}>{stat.value}</StatValue>
                                <StatLabel style={{ color: "black" }}>{stat.label}</StatLabel>
                            </StatInfo>
                        </StatItem>
                    ))}
                </QuickStats>
            </CardHeader>

            <TabsContainer>
                <TabButton
                    active={activeTab === "horario"}
                    onClick={() => setActiveTab("horario")}
                    style={{
                        borderBottom:
                            activeTab === "horario"
                                ? `3px solid ${ColorsDoc.primary}`
                                : "none"
                    }}
                >
                    <Clock size={20} />
                    Horario de Clases
                </TabButton>
                <TabButton
                    active={activeTab === "eventos"}
                    onClick={() => setActiveTab("eventos")}
                    style={{
                        borderBottom:
                            activeTab === "eventos"
                                ? `3px solid ${ColorsDoc.primary}`
                                : "none"
                    }}
                >
                    <Calendar size={20} />
                    Eventos y Fechas
                </TabButton>
                <TabButton
                    active={activeTab === "tareas"}
                    onClick={() => setActiveTab("tareas")}
                    style={{
                        borderBottom:
                            activeTab === "tareas"
                                ? `3px solid ${ColorsDoc.primary}`
                                : "none"
                    }}
                >
                    <FileText size={20} />
                    Tareas Programadas
                </TabButton>
            </TabsContainer>

            <ContentArea>{renderContent()}</ContentArea>
        </Container>
    );
};

export default CalendarioD;
