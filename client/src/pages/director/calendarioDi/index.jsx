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
import { Calendar, Clock, Bell, Users, FileText, ChevronRight } from "lucide-react";
import { useColors } from "../../../style/colors";
import HorarioDocente from "../horariosDi/inde";
import EventosDocente from "../eventosDi/index";
import TareasDocente from "../tareasDi/index";
import CardHeader from "../../../components/ui/cardHeader";

const CalendarioDi = () => {
    const ColorsDoc = useColors();
    const [activeTab, setActiveTab] = useState("horario");

    const stats = [
        { icon: Clock, label: "Clases Hoy", value: "3", color: ColorsDoc.primary },
        { icon: Bell, label: "Eventos Próximos", value: "5", color: "#4ECDC4" },
        { icon: FileText, label: "Tareas Pendientes", value: "12", color: "#FFA500" },
        { icon: Users, label: "Reuniones", value: "2", color: "#9B59B6" }
    ];

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
            <CardHeader ColorsMa={ColorsDoc} title="Calendario Académico">
                <QuickStats>
                    {stats.map((stat, index) => (
                        <StatItem key={index} >
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
                    style={{ borderBottom: activeTab === "horario" ? `3px solid ${ColorsDoc.primary}` : 'none' }}
                >
                    <Clock size={20} />
                    Horario de Clases
                </TabButton>
                <TabButton
                    active={activeTab === "eventos"}
                    onClick={() => setActiveTab("eventos")}
                    style={{ borderBottom: activeTab === "eventos" ? `3px solid ${ColorsDoc.primary}` : 'none' }}
                >
                    <Calendar size={20} />
                    Eventos y Fechas
                </TabButton>
                <TabButton
                    active={activeTab === "tareas"}
                    onClick={() => setActiveTab("tareas")}
                    style={{ borderBottom: activeTab === "tareas" ? `3px solid ${ColorsDoc.primary}` : 'none' }}
                >
                    <FileText size={20} />
                    Tareas Programadas
                </TabButton>
            </TabsContainer>

            <ContentArea>
                {renderContent()}
            </ContentArea>
        </Container>
    );
};

export default CalendarioDi;