// Roxy: Horario Director mejorado con diseño premium

import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { 
    Calendar, 
    ChevronLeft, 
    ChevronRight, 
    Clock,
    GraduationCap,
    MapPin,
    Users,
    Filter,
    Grid3x3,
    BookOpen,
    Layers,
    Download,
    Printer,
    Settings,
    ChevronDown
} from "lucide-react";
import { useColors } from "../../../style/colors";

// Días y horas base
const HORAS = [
    "07:00", "07:30", "08:00", "08:30", "09:00", "09:30",
    "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
    "19:00", "19:30", "20:00",
];

const DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

const SEMESTRES = [
    { id: "1er", label: "1er Semestre", icon: "" },
    { id: "3er", label: "3er Semestre", icon: "" },
    { id: "5to", label: "5to Semestre", icon: "" },
    { id: "7mo", label: "7mo Semestre", icon: "" },
];

const HORARIO_SEMESTRES = {
    "1er Semestre": {
        lunes: [
            {
                inicio: "08:00",
                fin: "09:30",
                materia: "Introducción a la Programación",
                profesor: "Dr. Carlos Mendoza",
                aula: "Aula 101",
                color: "#3498DB",
                estudiantes: 35,
                tipo: "Teórica"
            },
        ],
        martes: [
            {
                inicio: "10:30",
                fin: "12:00",
                materia: "Matemática I",
                profesor: "Ing. María Rodríguez",
                aula: "Aula 102",
                color: "#E67E22",
                estudiantes: 40,
                tipo: "Teórica"
            },
        ],
        miercoles: [],
        jueves: [
            {
                inicio: "08:00",
                fin: "09:30",
                materia: "Lógica de Sistemas",
                profesor: "Lic. Pedro Gutiérrez",
                aula: "Aula 103",
                color: "#9B59B6",
                estudiantes: 30,
                tipo: "Práctica"
            },
        ],
        viernes: [],
    },
    "3er Semestre": {
        lunes: [
            {
                inicio: "09:30",
                fin: "11:00",
                materia: "Estructuras de Datos",
                profesor: "Dr. Ana López",
                aula: "Lab 201",
                color: "#16A085",
                estudiantes: 28,
                tipo: "Laboratorio"
            },
        ],
        martes: [
            {
                inicio: "14:00",
                fin: "16:30",
                materia: "Base de Datos I",
                profesor: "Ing. Roberto Silva",
                aula: "Lab 202",
                color: "#9B59B6",
                estudiantes: 32,
                tipo: "Laboratorio"
            },
        ],
        miercoles: [],
        jueves: [
            {
                inicio: "07:30",
                fin: "09:00",
                materia: "Probabilidad y Estadística",
                profesor: "Lic. Laura Fernández",
                aula: "Aula 204",
                color: "#E74C3C",
                estudiantes: 38,
                tipo: "Teórica"
            },
        ],
        viernes: [],
    },
    "5to Semestre": {
        lunes: [
            {
                inicio: "07:30",
                fin: "10:00",
                materia: "Ingeniería de Software I",
                profesor: "Dr. Juan Pérez",
                aula: "Aula 301",
                color: "#3498DB",
                estudiantes: 25,
                tipo: "Teórica"
            },
            {
                inicio: "14:00",
                fin: "16:30",
                materia: "Bases de Datos Avanzadas",
                profesor: "Ing. Sandra Martínez",
                aula: "Lab 301",
                color: "#9B59B6",
                estudiantes: 22,
                tipo: "Laboratorio"
            },
        ],
        martes: [
            {
                inicio: "10:30",
                fin: "13:00",
                materia: "Programación Avanzada",
                profesor: "Dr. Miguel Torres",
                aula: "Lab 202",
                color: "#E67E22",
                estudiantes: 20,
                tipo: "Laboratorio"
            },
        ],
        miercoles: [
            {
                inicio: "07:30",
                fin: "10:00",
                materia: "Ingeniería de Software I",
                profesor: "Dr. Juan Pérez",
                aula: "Aula 301",
                color: "#3498DB",
                estudiantes: 25,
                tipo: "Práctica"
            },
            {
                inicio: "14:00",
                fin: "16:30",
                materia: "Bases de Datos Avanzadas",
                profesor: "Ing. Sandra Martínez",
                aula: "Lab 301",
                color: "#9B59B6",
                estudiantes: 22,
                tipo: "Laboratorio"
            },
        ],
        jueves: [
            {
                inicio: "10:30",
                fin: "13:00",
                materia: "Programación Avanzada",
                profesor: "Dr. Miguel Torres",
                aula: "Lab 202",
                color: "#E67E22",
                estudiantes: 20,
                tipo: "Laboratorio"
            },
        ],
        viernes: [
            {
                inicio: "14:00",
                fin: "16:30",
                materia: "Arquitectura de Software",
                profesor: "Ing. David García",
                aula: "Aula 405",
                color: "#16A085",
                estudiantes: 18,
                tipo: "Teórica"
            },
        ],
    },
    "7mo Semestre": {
        lunes: [
            {
                inicio: "18:00",
                fin: "19:30",
                materia: "Proyecto Integrador II",
                profesor: "Dr. Fernando Vargas",
                aula: "Lab 401",
                color: "#8E44AD",
                estudiantes: 15,
                tipo: "Proyecto"
            },
        ],
        martes: [],
        miercoles: [
            {
                inicio: "16:00",
                fin: "18:30",
                materia: "Seguridad Informática",
                profesor: "Ing. Patricia Rojas",
                aula: "Lab 402",
                color: "#C0392B",
                estudiantes: 18,
                tipo: "Laboratorio"
            },
        ],
        jueves: [],
        viernes: [
            {
                inicio: "07:30",
                fin: "09:30",
                materia: "Gestión de Proyectos de TI",
                profesor: "MBA. Carlos Jiménez",
                aula: "Aula 403",
                color: "#27AE60",
                estudiantes: 20,
                tipo: "Seminario"
            },
        ],
    },
};

const HorarioDi = () => {
    const colors = useColors();
    const [currentWeek, setCurrentWeek] = useState(new Date());
    const [semestreActivo, setSemestreActivo] = useState("5to Semestre");
    const [vistaActiva, setVistaActiva] = useState("semana");
    const [hoveredClass, setHoveredClass] = useState(null);

    const getWeekDates = () => {
        const start = new Date(currentWeek);
        const day = start.getDay();
        const diff = start.getDate() - day + (day === 0 ? -6 : 1);
        start.setDate(diff);

        const dates = [];
        for (let i = 0; i < 5; i++) {
            const date = new Date(start);
            date.setDate(start.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    const weekDates = getWeekDates();

    const navigateWeek = (direction) => {
        const newWeek = new Date(currentWeek);
        newWeek.setDate(newWeek.getDate() + direction * 7);
        setCurrentWeek(newWeek);
    };

    const calculateBlockHeight = (inicio, fin) => {
        const [inicioHora, inicioMin] = inicio.split(":").map(Number);
        const [finHora, finMin] = fin.split(":").map(Number);
        const duracionMinutos = finHora * 60 + finMin - (inicioHora * 60 + inicioMin);
        return (duracionMinutos / 30) * 50; // 50px por bloque de 30 min
    };

    const calculateBlockPosition = (inicio) => {
        const [hora, minutos] = inicio.split(":").map(Number);
        const minutosDesde7 = (hora - 7) * 60 + minutos;
        return (minutosDesde7 / 30) * 50 + 60; // 60px offset for header
    };

    const formatDateRange = () => {
        const start = weekDates[0];
        const end = weekDates[4];
        return `${start.toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
        })} - ${end.toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })}`;
    };

    const getLegendItems = () => {
        const horario = HORARIO_SEMESTRES[semestreActivo] || {};
        const mapa = new Map();

        Object.keys(horario).forEach((dia) => {
            (horario[dia] || []).forEach((clase) => {
                if (!mapa.has(clase.materia)) {
                    mapa.set(clase.materia, {
                        color: clase.color,
                        profesor: clase.profesor
                    });
                }
            });
        });

        return Array.from(mapa.entries()).map(([materia, data]) => ({
            materia,
            ...data
        }));
    };

    const legendItems = getLegendItems();
    const horarioActual = HORARIO_SEMESTRES[semestreActivo] || {};

    const getTotalClases = () => {
        return Object.values(horarioActual).reduce((acc, dia) => acc + dia.length, 0);
    };

    const getTotalHoras = () => {
        let total = 0;
        Object.values(horarioActual).forEach(dia => {
            dia.forEach(clase => {
                const [inicioHora, inicioMin] = clase.inicio.split(":").map(Number);
                const [finHora, finMin] = clase.fin.split(":").map(Number);
                total += (finHora * 60 + finMin - (inicioHora * 60 + inicioMin)) / 60;
            });
        });
        return total.toFixed(1);
    };

    return (
        <MainContainer>
            {/* Header con título y acciones */}
            <HeaderSection>
                <HeaderContent>
                    <TitleSection>
                        <MainTitle>
                            <Calendar size={28} />
                            Horario Académico
                        </MainTitle>
                        <Subtitle>Gestión de horarios por semestre</Subtitle>
                    </TitleSection>
                    
                    <HeaderActions>
                        <ActionButton color={colors.primary}>
                            <Download size={18} />
                            Exportar
                        </ActionButton>
                        <ActionButton color={colors.primary}>
                            <Printer size={18} />
                            Imprimir
                        </ActionButton>
                        <ActionButton primary color={colors.primary}>
                            <Settings size={18} />
                            Configurar
                        </ActionButton>
                    </HeaderActions>
                </HeaderContent>

                {/* Estadísticas rápidas */}
                <StatsRow>
                    <StatCard color="#3498DB">
                        <StatIcon>
                            <BookOpen size={20} />
                        </StatIcon>
                        <StatInfo>
                            <StatValue>{getTotalClases()}</StatValue>
                            <StatLabel>Clases/Semana</StatLabel>
                        </StatInfo>
                    </StatCard>
                    
                    <StatCard color="#E67E22">
                        <StatIcon>
                            <Clock size={20} />
                        </StatIcon>
                        <StatInfo>
                            <StatValue>{getTotalHoras()}</StatValue>
                            <StatLabel>Horas/Semana</StatLabel>
                        </StatInfo>
                    </StatCard>
                    
                    <StatCard color="#9B59B6">
                        <StatIcon>
                            <Users size={20} />
                        </StatIcon>
                        <StatInfo>
                            <StatValue>{legendItems.length}</StatValue>
                            <StatLabel>Materias</StatLabel>
                        </StatInfo>
                    </StatCard>
                    
                    <StatCard color="#16A085">
                        <StatIcon>
                            <MapPin size={20} />
                        </StatIcon>
                        <StatInfo>
                            <StatValue>8</StatValue>
                            <StatLabel>Aulas</StatLabel>
                        </StatInfo>
                    </StatCard>
                </StatsRow>
            </HeaderSection>

            {/* Controles */}
            <ControlsSection>
                {/* Selector de semana */}
                <WeekNavigator>
                    <NavButton onClick={() => navigateWeek(-1)} color={colors.primary}>
                        <ChevronLeft size={20} />
                    </NavButton>
                    
                    <CurrentWeek>
                        <WeekIcon>
                            <Calendar size={18} />
                        </WeekIcon>
                        <WeekText>{formatDateRange()}</WeekText>
                        <TodayButton color={colors.primary}>Hoy</TodayButton>
                    </CurrentWeek>
                    
                    <NavButton onClick={() => navigateWeek(1)} color={colors.primary}>
                        <ChevronRight size={20} />
                    </NavButton>
                </WeekNavigator>

                {/* Selector de semestre */}
                <SemesterSelector>
                    {SEMESTRES.map((sem) => (
                        <SemesterButton
                            key={sem.id}
                            active={semestreActivo === sem.label}
                            onClick={() => setSemestreActivo(sem.label)}
                            color={colors.primary}
                        >
                            <SemesterIcon>{sem.icon}</SemesterIcon>
                            <SemesterLabel>{sem.label}</SemesterLabel>
                        </SemesterButton>
                    ))}
                </SemesterSelector>

                {/* Selector de vista */}
                <ViewSelector>
                    <ViewButton 
                        active={vistaActiva === 'semana'}
                        onClick={() => setVistaActiva('semana')}
                        color={colors.primary}
                    >
                        <Grid3x3 size={16} />
                        Semana
                    </ViewButton>
                    <ViewButton 
                        active={vistaActiva === 'lista'}
                        onClick={() => setVistaActiva('lista')}
                        color={colors.primary}
                    >
                        <Layers size={16} />
                        Lista
                    </ViewButton>
                </ViewSelector>
            </ControlsSection>

            {/* Calendario Principal */}
            <CalendarContainer>
                <CalendarGrid>
                    {/* Columna de horas */}
                    <TimeColumn>
                        <TimeHeader />
                        {HORAS.map((hora) => (
                            <TimeSlot key={hora}>
                                <TimeText>{hora}</TimeText>
                            </TimeSlot>
                        ))}
                    </TimeColumn>

                    {/* Columnas de días */}
                    {DIAS.map((dia, index) => (
                        <DayColumn key={dia}>
                            <DayHeader color={colors.primary}>
                                <DayName>{dia}</DayName>
                                <DayDate>
                                    {weekDates[index].toLocaleDateString("es-ES", {
                                        day: "numeric",
                                        month: "short"
                                    })}
                                </DayDate>
                            </DayHeader>

                            <DayContent>
                                {/* Líneas de guía */}
                                {HORAS.map((_, idx) => (
                                    <GridLine key={idx} />
                                ))}
                                
                                {/* Bloques de clases */}
                                {horarioActual[dia.toLowerCase()]?.map((clase, idx) => (
                                    <ClassBlock
                                        key={idx}
                                        color={clase.color}
                                        style={{
                                            height: `${calculateBlockHeight(clase.inicio, clase.fin)}px`,
                                            top: `${calculateBlockPosition(clase.inicio)}px`,
                                        }}
                                        onMouseEnter={() => setHoveredClass(`${dia}-${idx}`)}
                                        onMouseLeave={() => setHoveredClass(null)}
                                        hovered={hoveredClass === `${dia}-${idx}`}
                                    >
                                        <ClassHeader>
                                            <ClassType>{clase.tipo}</ClassType>
                                            <ClassStudents>
                                                <Users size={12} />
                                                {clase.estudiantes}
                                            </ClassStudents>
                                        </ClassHeader>
                                        
                                        <ClassTitle>{clase.materia}</ClassTitle>
                                        
                                        <ClassInfo>
                                            <ClassTime>
                                                <Clock size={12} />
                                                {clase.inicio} - {clase.fin}
                                            </ClassTime>
                                        </ClassInfo>
                                        
                                        <ClassFooter>
                                            <ClassRoom>
                                                <MapPin size={12} />
                                                {clase.aula}
                                            </ClassRoom>
                                            <ClassProfessor>
                                                <GraduationCap size={12} />
                                                {clase.profesor}
                                            </ClassProfessor>
                                        </ClassFooter>

                                        {hoveredClass === `${dia}-${idx}` && (
                                            <ClassTooltip>
                                                Click para ver detalles
                                            </ClassTooltip>
                                        )}
                                    </ClassBlock>
                                ))}
                            </DayContent>
                        </DayColumn>
                    ))}
                </CalendarGrid>
            </CalendarContainer>

            {/* Leyenda mejorada */}
            <LegendSection>
                <LegendHeader>
                    <LegendTitle>
                        <Filter size={20} />
                        Materias del {semestreActivo}
                    </LegendTitle>
                    <LegendCount>{legendItems.length} materias activas</LegendCount>
                </LegendHeader>
                
                <LegendGrid>
                    {legendItems.map((item) => (
                        <LegendCard key={item.materia}>
                            <LegendColor color={item.color} />
                            <LegendInfo>
                                <LegendMateria>{item.materia}</LegendMateria>
                                <LegendProfesor>
                                    <GraduationCap size={12} />
                                    {item.profesor}
                                </LegendProfesor>
                            </LegendInfo>
                        </LegendCard>
                    ))}
                    
                    {legendItems.length === 0 && (
                        <EmptyLegend>
                            <EmptyIcon></EmptyIcon>
                            <EmptyText>Sin clases registradas para este semestre</EmptyText>
                        </EmptyLegend>
                    )}
                </LegendGrid>
            </LegendSection>
        </MainContainer>
    );
};

export default HorarioDi;

/* ---------- ANIMACIONES ---------- */

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
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
`;

/* ---------- CONTENEDOR PRINCIPAL ---------- */

const MainContainer = styled.div`
    min-height: 100vh;
    background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
    padding: 24px;
    
    @media (max-width: 768px) {
        padding: 16px;
    }
`;

/* ---------- HEADER ---------- */

const HeaderSection = styled.div`
    background: white;
    border-radius: 24px;
    padding: 32px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
    margin-bottom: 24px;
    animation: ${fadeIn} 0.4s ease;
`;

const HeaderContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;
    
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 20px;
    }
`;

const TitleSection = styled.div``;

const MainTitle = styled.h1`
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0 0 8px 0;
    font-size: 32px;
    font-weight: 800;
    color: #111827;
`;

const Subtitle = styled.p`
    margin: 0;
    font-size: 16px;
    color: #6b7280;
`;

const HeaderActions = styled.div`
    display: flex;
    gap: 12px;
`;

const ActionButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: ${props => props.primary ? props.color : 'white'};
    color: ${props => props.primary ? 'white' : props.color};
    border: 2px solid ${props => props.color};
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px ${props => props.color}30;
        background: ${props => props.primary ? props.color + 'ee' : props.color + '10'};
    }
`;

const StatsRow = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
`;

const StatCard = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px;
    background: ${props => props.color}08;
    border-radius: 16px;
    border: 1px solid ${props => props.color}20;
    transition: all 0.2s ease;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px ${props => props.color}15;
        background: ${props => props.color}12;
    }
`;

const StatIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: white;
    border-radius: 12px;
    flex-shrink: 0;
`;

const StatInfo = styled.div``;

const StatValue = styled.div`
    font-size: 24px;
    font-weight: 700;
    color: #111827;
`;

const StatLabel = styled.div`
    font-size: 12px;
    color: #6b7280;
`;

/* ---------- CONTROLES ---------- */

const ControlsSection = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 24px;
    flex-wrap: wrap;
    animation: ${slideIn} 0.4s ease;
    
    @media (max-width: 1024px) {
        flex-direction: column;
    }
`;

const WeekNavigator = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const NavButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        border-color: ${props => props.color};
        background: ${props => props.color}08;
        transform: scale(1.1);
        
        svg {
            color: ${props => props.color};
        }
    }
`;

const CurrentWeek = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 16px;
`;

const WeekIcon = styled.div`
    display: flex;
    color: #6b7280;
`;

const WeekText = styled.span`
    font-size: 15px;
    font-weight: 600;
    color: #111827;
    min-width: 280px;
    text-align: center;
`;

const TodayButton = styled.button`
    padding: 6px 16px;
    background: ${props => props.color}15;
    color: ${props => props.color};
    border: none;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        background: ${props => props.color};
        color: white;
        transform: scale(1.05);
    }
`;

const SemesterSelector = styled.div`
    display: flex;
    gap: 8px;
    padding: 8px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    flex: 1;
    
    @media (max-width: 1024px) {
        width: 100%;
    }
`;

const SemesterButton = styled.button`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 16px;
    background: ${props => props.active ? props.color : 'white'};
    color: ${props => props.active ? 'white' : '#6b7280'};
    border: 2px solid ${props => props.active ? props.color : '#e5e7eb'};
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        border-color: ${props => props.color};
        background: ${props => props.active ? props.color : props.color + '08'};
        color: ${props => props.active ? 'white' : props.color};
        transform: translateY(-2px);
    }
`;

const SemesterIcon = styled.span`
    font-size: 18px;
`;

const SemesterLabel = styled.span`
    @media (max-width: 480px) {
        display: none;
    }
`;

const ViewSelector = styled.div`
    display: flex;
    gap: 4px;
    padding: 4px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const ViewButton = styled.button`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    background: ${props => props.active ? props.color : 'transparent'};
    color: ${props => props.active ? 'white' : '#6b7280'};
    border: none;
    border-radius: 12px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        background: ${props => props.active ? props.color : props.color + '15'};
        color: ${props => props.active ? 'white' : props.color};
    }
`;

/* ---------- CALENDARIO ---------- */

const CalendarContainer = styled.div`
    background: white;
    border-radius: 24px;
    padding: 24px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
    margin-bottom: 24px;
    overflow-x: auto;
    animation: ${fadeIn} 0.5s ease;
    
    &::-webkit-scrollbar {
        height: 8px;
    }
    
    &::-webkit-scrollbar-thumb {
        background: #e5e7eb;
        border-radius: 999px;
    }
`;

const CalendarGrid = styled.div`
    display: grid;
    grid-template-columns: 80px repeat(5, 1fr);
    min-width: 900px;
    gap: 2px;
    background: #f3f4f6;
    border-radius: 16px;
    overflow: hidden;
`;

const TimeColumn = styled.div`
    background: white;
`;

const TimeHeader = styled.div`
    height: 60px;
    background: #f9fafb;
    border-bottom: 2px solid #e5e7eb;
`;

const TimeSlot = styled.div`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-bottom: 1px solid #f3f4f6;
    position: relative;
    
    &:hover {
        background: #f9fafb;
    }
`;

const TimeText = styled.span`
    font-size: 12px;
    font-weight: 500;
    color: #6b7280;
`;

const DayColumn = styled.div`
    background: white;
    position: relative;
`;

const DayHeader = styled.div`
    height: 60px;
    background: ${props => props.color}08;
    border-bottom: 3px solid ${props => props.color};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: sticky;
    top: 0;
    z-index: 10;
`;

const DayName = styled.div`
    font-size: 14px;
    font-weight: 700;
    color: #111827;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

const DayDate = styled.div`
    font-size: 12px;
    color: #6b7280;
    margin-top: 2px;
`;

const DayContent = styled.div`
    position: relative;
    height: ${HORAS.length * 50}px;
`;

const GridLine = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    height: 50px;
    border-bottom: 1px solid #f3f4f6;
    
    &:nth-child(even) {
        background: #fafafa;
    }
`;

const ClassBlock = styled.div`
    position: absolute;
    left: 8px;
    right: 8px;
    background: ${props => props.color};
    border-radius: 12px;
    padding: 12px;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: ${props => props.hovered ? 5 : 3};
    box-shadow: 0 2px 8px ${props => props.color}40;
    
    &:hover {
        transform: ${props => props.hovered ? 'scale(1.05)' : 'scale(1.02)'};
        box-shadow: 0 8px 20px ${props => props.color}60;
        z-index: 5;
    }
`;

const ClassHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
`;

const ClassType = styled.span`
    font-size: 10px;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.25);
    padding: 2px 6px;
    border-radius: 999px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

const ClassStudents = styled.span`
    display: flex;
    align-items: center;
    gap: 2px;
    font-size: 10px;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.25);
    padding: 2px 6px;
    border-radius: 999px;
`;

const ClassTitle = styled.div`
    font-size: 13px;
    font-weight: 700;
    margin-bottom: 8px;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const ClassInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 8px;
`;

const ClassTime = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    font-weight: 500;
    opacity: 0.95;
`;

const ClassFooter = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const ClassRoom = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    font-weight: 600;
    opacity: 0.95;
`;

const ClassProfessor = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    opacity: 0.9;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ClassTooltip = styled.div`
    position: absolute;
    bottom: -24px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 10px;
    white-space: nowrap;
    z-index: 10;
    animation: ${fadeIn} 0.2s ease;
`;

/* ---------- LEYENDA ---------- */

const LegendSection = styled.div`
    background: white;
    border-radius: 24px;
    padding: 24px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
    animation: ${slideIn} 0.5s ease;
`;

const LegendHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const LegendTitle = styled.h3`
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: #111827;
`;

const LegendCount = styled.span`
    font-size: 14px;
    color: #6b7280;
    font-weight: 500;
`;

const LegendGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 12px;
`;

const LegendCard = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: #f9fafb;
    border-radius: 12px;
    transition: all 0.2s ease;
    
    &:hover {
        background: #f3f4f6;
        transform: translateX(4px);
    }
`;

const LegendColor = styled.div`
    width: 40px;
    height: 40px;
    background: ${props => props.color};
    border-radius: 10px;
    flex-shrink: 0;
    box-shadow: 0 2px 8px ${props => props.color}40;
`;

const LegendInfo = styled.div`
    flex: 1;
`;

const LegendMateria = styled.div`
    font-size: 14px;
    font-weight: 600;
    color: #111827;
    margin-bottom: 2px;
`;

const LegendProfesor = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: #6b7280;
    
    svg {
        color: #9ca3af;
    }
`;

const EmptyLegend = styled.div`
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    text-align: center;
`;

const EmptyIcon = styled.div`
    font-size: 48px;
    margin-bottom: 12px;
`;

const EmptyText = styled.p`
    font-size: 14px;
    color: #6b7280;
    margin: 0;
`;