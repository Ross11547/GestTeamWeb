import React, { useState } from "react";
import {
    Container,
    HeaderHorario,
    WeekSelector,
    WeekButton,
    CalendarGrid,
    TimeColumn,
    TimeSlot,
    DayColumn,
    DayHeader,
    ClassBlock,
    ClassTitle,
    ClassDetails,
    ClassRoom,
    LegendContainer,
    LegendItem,
    ExportButton,
    ViewToggle,
    ToggleButton
} from "../../../style/docente/horarioDStyled";
import { Calendar, ChevronLeft, ChevronRight, Download, Grid, List, Clock } from "lucide-react";
import { useColors } from "../../../style/colors";
import CardHeader from "../../../components/ui/cardHeader";
import { Header, NewBoardButton } from "../../../style/estudiante/styledPizarra";

const HORARIO_DATA = {
    lunes: [
        { inicio: "07:30", fin: "10:00", materia: "Ingeniería de Software I", aula: "Aula 301", color: "#3498DB" },
        { inicio: "14:00", fin: "16:30", materia: "Bases de Datos Avanzadas", aula: "Lab 301", color: "#9B59B6" }
    ],
    martes: [
        { inicio: "10:30", fin: "13:00", materia: "Programación Avanzada", aula: "Lab 202", color: "#E67E22" }
    ],
    miercoles: [
        { inicio: "07:30", fin: "10:00", materia: "Ingeniería de Software I", aula: "Aula 301", color: "#3498DB" },
        { inicio: "14:00", fin: "16:30", materia: "Bases de Datos Avanzadas", aula: "Lab 301", color: "#9B59B6" }
    ],
    jueves: [
        { inicio: "10:30", fin: "13:00", materia: "Programación Avanzada", aula: "Lab 202", color: "#E67E22" }
    ],
    viernes: [
        { inicio: "14:00", fin: "16:30", materia: "Arquitectura de Software", aula: "Aula 405", color: "#16A085" }
    ]
};

const HORAS = [
    "07:00", "07:30", "08:00", "08:30", "09:00", "09:30",
    "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
    "19:00", "19:30", "20:00"
];

const DIAS = ["lunes", "martes", "miercoles", "jueves", "viernes"];

const HorarioD
    = () => {
        const ColorsDoc = useColors();
        const [currentWeek, setCurrentWeek] = useState(new Date());
        const [viewMode, setViewMode] = useState('grid');

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
            newWeek.setDate(newWeek.getDate() + (direction * 7));
            setCurrentWeek(newWeek);
        };

        const calculateBlockHeight = (inicio, fin) => {
            const [inicioHora, inicioMin] = inicio.split(':').map(Number);
            const [finHora, finMin] = fin.split(':').map(Number);

            const duracionMinutos = (finHora * 60 + finMin) - (inicioHora * 60 + inicioMin);
            return (duracionMinutos / 30) * 40;
        };

        const calculateBlockPosition = (inicio) => {
            const [hora, minutos] = inicio.split(':').map(Number);
            const minutosDesde7 = (hora - 7) * 60 + minutos;
            return (minutosDesde7 / 30) * 40;
        };

        const formatDateRange = () => {
            const start = weekDates[0];
            const end = weekDates[4];

            return `${start.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })} - ${end.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}`;
        };

        return (
            <Container>
                {/* <CardHeader ColorsMa={ColorsDoc} title="Mi Horario" parrafo={`Horario de clases - ${formatDateRange()}`}>
                    <Header>
                        <ViewToggle style={{ background: ColorsDoc.primary }}>
                            <ToggleButton
                                active={viewMode === 'grid'}
                                onClick={() => setViewMode('grid')}
                            >
                                <Grid size={18} />
                                Grilla
                            </ToggleButton>
                            <ToggleButton
                                active={viewMode === 'list'}
                                onClick={() => setViewMode('list')}
                            >
                                <List size={18} />
                                Lista
                            </ToggleButton>
                        </ViewToggle>

                        <ExportButton>
                            <Download size={18} />
                            Exportar
                        </ExportButton>
                    </Header>
                </CardHeader> */}

                <WeekSelector>
                    <WeekButton onClick={() => navigateWeek(-1)}>
                        <ChevronLeft size={20} />
                    </WeekButton>

                    <span>
                        <Calendar size={20} />
                        {formatDateRange()}
                    </span>

                    <WeekButton onClick={() => navigateWeek(1)}>
                        <ChevronRight size={20} />
                    </WeekButton>
                </WeekSelector>

                <CalendarGrid>
                    <TimeColumn>
                        <DayHeader style={{ visibility: 'hidden' }}>Hora</DayHeader>
                        {HORAS.map(hora => (
                            <TimeSlot key={hora}>{hora}</TimeSlot>
                        ))}
                    </TimeColumn>

                    {DIAS.map((dia, index) => (
                        <DayColumn key={dia}>
                            <DayHeader style={{ background: ColorsDoc.primary }}>
                                <div>{dia.charAt(0).toUpperCase() + dia.slice(1)}</div>
                                <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>
                                    {weekDates[index].toLocaleDateString('es-ES', { day: 'numeric' })}
                                </div>
                            </DayHeader>

                            <div style={{ position: 'relative', height: `${HORAS.length * 40}px` }}>
                                {HORARIO_DATA[dia]?.map((clase, idx) => (
                                    <ClassBlock
                                        key={idx}
                                        style={{
                                            background: clase.color,
                                            height: `${calculateBlockHeight(clase.inicio, clase.fin)}px`,
                                            top: `${calculateBlockPosition(clase.inicio)}px`
                                        }}
                                    >
                                        <ClassTitle>{clase.materia}</ClassTitle>
                                        <ClassDetails>
                                            <Clock size={14} />
                                            {clase.inicio} - {clase.fin}
                                        </ClassDetails>
                                        <ClassRoom>{clase.aula}</ClassRoom>
                                    </ClassBlock>
                                ))}
                            </div>
                        </DayColumn>
                    ))}
                </CalendarGrid>

                <LegendContainer>
                    <h3>Leyenda de Materias</h3>
                    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                        <LegendItem>
                            <span style={{ background: '#3498DB' }}></span>
                            Ingeniería de Software I
                        </LegendItem>
                        <LegendItem>
                            <span style={{ background: '#E67E22' }}></span>
                            Programación Avanzada
                        </LegendItem>
                        <LegendItem>
                            <span style={{ background: '#9B59B6' }}></span>
                            Bases de Datos Avanzadas
                        </LegendItem>
                        <LegendItem>
                            <span style={{ background: '#16A085' }}></span>
                            Arquitectura de Software
                        </LegendItem>
                    </div>
                </LegendContainer>
            </Container>
        );
    };

export default HorarioD
    ;