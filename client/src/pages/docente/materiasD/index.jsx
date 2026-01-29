// Roxy: Materias Docente simulando 3 perfiles distintos según el usuario

import React, { useState } from "react";
import {
    Container,
    HeaderSection,
    TitleSection,
    TabsContainer,
    Tab,
    SubjectsGrid,
    SubjectCard,
    SubjectHeader,
    SubjectImage,
    SubjectContent,
    SubjectTitle,
    SubjectInfo,
    InfoItem,
    ActionButtons,
    ActionButton,
    Badge,
    ContentSection,
    FilterBar,
    SearchInput,
    FilterButton
} from "../../../style/docente/materiasDStyled";
import {
    Book,
    Users,
    Calendar,
    Clock,
    FileText,
    Edit,
    Eye,
    BarChart,
    Filter
} from "lucide-react";
import { useColors } from "../../../style/colors";
import EntregasDocente from "../entregasD/index.jsx";
import RevisionDocente from "../revisionD/index.jsx";
import RubricasDocente from "../rubricasD/index.jsx";
import CardHeader from "../../../components/ui/cardHeader.jsx";
import { useUser } from "../../../context/useContext"; // 🔹 importante

const getMateriasForTeacher = (user) => {
    const email = (user?.email || user?.correo || "").toLowerCase();

    const materiasRedes = [
        {
            id: 1,
            nombre: "Redes I",
            codigo: "RED-101",
            estudiantes: 30,
            horario: "LUN-MIE 08:00-09:30",
            aula: "Lab Redes 201",
            semestre: "4to Semestre",
            tareasPendientes: 5,
            imagen:
                "https://img.redestelecom.es/wp-content/uploads/2024/04/22124120/Conexiones-con-perifericos--1620x1080.jpg"
        },
        {
            id: 2,
            nombre: "Redes II",
            codigo: "RED-201",
            estudiantes: 32,
            horario: "MAR-JUE 09:30-11:00",
            aula: "Lab Redes 202",
            semestre: "5to Semestre",
            tareasPendientes: 7,
            imagen:
                "https://rafaeldelpozo.wordpress.com/wp-content/uploads/2018/01/redes_windows-840x503.jpg?w=640"
        },
        {
            id: 3,
            nombre: "Seguridad Informática",
            codigo: "SEG-301",
            estudiantes: 30,
            horario: "VIE 14:00-16:00",
            aula: "Aula 305",
            semestre: "6to Semestre",
            tareasPendientes: 3,
            imagen:
                "https://287524.fs1.hubspotusercontent-na1.net/hubfs/287524/Imported_Blog_Media/tips-super-basicos-de-seguridad-informatica-5-Dec-17-2022-06-01-39-3384-PM.png"
        }
    ];

    const materiasControl = [
        {
            id: 4,
            nombre: "Sistemas de Control",
            codigo: "CTL-401",
            estudiantes: 26,
            horario: "LUN-MIE 10:00-12:00",
            aula: "Lab Control 101",
            semestre: "7mo Semestre",
            tareasPendientes: 4,
            imagen:
                "https://emacstores.com/wp-content/uploads/2021/09/seguridad-industrial.jpg" // pon tu imagen
        },
        {
            id: 5,
            nombre: "Programación de Sistemas Embebidos",
            codigo: "EMB-402",
            estudiantes: 24,
            horario: "MAR-JUE 15:00-17:00",
            aula: "Lab Embebidos 204",
            semestre: "7mo Semestre",
            tareasPendientes: 6,
            imagen:
                "https://94fa3c88.delivery.rocketcdn.me/es/files/2024/07/sistemas-embebidos-datascientest-1024x585.jpg"
        },
        {
            id: 6,
            nombre: "Proyecto Integrador Final",
            codigo: "INT-501",
            estudiantes: 28,
            horario: "VIE 08:00-11:00",
            aula: "Sala de Proyectos",
            semestre: "8vo Semestre",
            tareasPendientes: 10,
            imagen:
                "https://0701.static.prezi.com/preview/v2/3yn5c74r2hyyww6ililwzeu3gh6jc3sachvcdoaizecfr3dnitcq_3_0.png"
        }
    ];

    const materiasTesting = [
        {
            id: 7,
            nombre: "Testing de Software",
            codigo: "TES-301",
            estudiantes: 41,
            horario: "MAR-JUE 18:30-20:00",
            aula: "Lab QA 101",
            semestre: "6to Semestre",
            tareasPendientes: 9,
            imagen:
                "https://cdn.prod.website-files.com/619e15d781b21202de206fb5/6304ea816823cf0a4b06f777_what-is-testing.jpg"
        }
    ];

    if (email === "cbbe.gustavo.rivera@unifranz.edu.bo") return materiasRedes;
    if (email === "cbbe.fernando.hinojosa.sa@unifranz.edu.bo") return materiasControl;
    if (email === "cbbe.gabriela.becerra.vi@unifranz.edu.bo") return materiasTesting;

    return [
        {
            id: 1,
            nombre: "Ingeniería de Software I",
            codigo: "INF-401",
            estudiantes: 35,
            horario: "LUN-MIE 07:30-10:00",
            aula: "Aula 301",
            semestre: "5to Semestre",
            tareasPendientes: 8,
            imagen:
                "https://concepto.de/wp-content/uploads/2015/03/software-1-e1550080097569.jpg"
        },
        {
            id: 2,
            nombre: "Programación Avanzada",
            codigo: "INF-302",
            estudiantes: 28,
            horario: "MAR-JUE 10:30-13:00",
            aula: "Lab 202",
            semestre: "4to Semestre",
            tareasPendientes: 5,
            imagen:
                "https://concepto.de/wp-content/uploads/2020/08/Programacion-informatica-scaled-e1724960033513.jpg"
        }
    ];
};

const MateriasD = () => {
    const ColorsDoc = useColors();
    const { user } = useUser();

    const [activeTab, setActiveTab] = useState("materias");
    const [selectedMateria, setSelectedMateria] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const materiasData = getMateriasForTeacher(user);

    const filteredMaterias = materiasData.filter(
        (materia) =>
            materia.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
            materia.codigo.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleMateriaClick = (materia) => {
        setSelectedMateria(materia);
        setActiveTab("entregas");
    };

    const renderContent = () => {
        switch (activeTab) {
            case "entregas":
                return (
                    <EntregasDocente materia={selectedMateria} ColorsDoc={ColorsDoc} />
                );
            case "revision":
                return (
                    <RevisionDocente materia={selectedMateria} ColorsDoc={ColorsDoc} />
                );
            case "rubricas":
                return (
                    <RubricasDocente materia={selectedMateria} ColorsDoc={ColorsDoc} />
                );
            default:
                return (
                    <>
                        <FilterBar>
                            <SearchInput
                                type="text"
                                placeholder="Buscar materia o código..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <FilterButton>
                                <Filter size={20} />
                                Filtros
                            </FilterButton>
                        </FilterBar>

                        <SubjectsGrid>
                            {filteredMaterias.map((materia) => (
                                <SubjectCard key={materia.id}>
                                    <SubjectHeader
                                        style={{
                                            background: `linear-gradient(135deg, ${ColorsDoc.primary} 0%, ${ColorsDoc.primary100} 100%)`
                                        }}
                                    >
                                        <Badge>{materia.codigo}</Badge>
                                        {materia.tareasPendientes > 0 && (
                                            <Badge style={{ background: "#FF6B6B" }}>
                                                {materia.tareasPendientes} pendientes
                                            </Badge>
                                        )}
                                    </SubjectHeader>

                                    <SubjectImage src={materia.imagen} alt={materia.nombre} />

                                    <SubjectContent>
                                        <SubjectTitle>{materia.nombre}</SubjectTitle>
                                        <SubjectInfo>
                                            <InfoItem>
                                                <Users size={16} />
                                                {materia.estudiantes} estudiantes
                                            </InfoItem>
                                            <InfoItem>
                                                <Clock size={16} />
                                                {materia.horario}
                                            </InfoItem>
                                            <InfoItem>
                                                <Book size={16} />
                                                {materia.semestre}
                                            </InfoItem>
                                            <InfoItem>
                                                <Calendar size={16} />
                                                {materia.aula}
                                            </InfoItem>
                                        </SubjectInfo>

                                        <ActionButtons>
                                            <ActionButton
                                                onClick={() => handleMateriaClick(materia)}
                                                style={{ background: ColorsDoc.primary }}
                                            >
                                                <Eye size={18} />
                                                Ver Detalles
                                            </ActionButton>
                                            <ActionButton
                                                style={{ background: ColorsDoc.secondary }}
                                            >
                                                <BarChart size={18} />
                                                Estadísticas
                                            </ActionButton>
                                        </ActionButtons>
                                    </SubjectContent>
                                </SubjectCard>
                            ))}
                        </SubjectsGrid>
                    </>
                );
        }
    };

    return (
        <Container>
            <CardHeader
                ColorsMa={ColorsDoc}
                title="Mis materias"
                parrafo="Gestión de materias y actividades académicas"
            />
            <TabsContainer>
                <Tab
                    active={activeTab === "materias"}
                    onClick={() => setActiveTab("materias")}
                    style={{
                        borderBottom:
                            activeTab === "materias"
                                ? `3px solid ${ColorsDoc.primary}`
                                : "none"
                    }}
                >
                    <Book size={20} />
                    Materias
                </Tab>
                <Tab
                    active={activeTab === "entregas"}
                    onClick={() => setActiveTab("entregas")}
                    disabled={!selectedMateria}
                    style={{
                        borderBottom:
                            activeTab === "entregas"
                                ? `3px solid ${ColorsDoc.primary}`
                                : "none"
                    }}
                >
                    <FileText size={20} />
                    Entregas
                </Tab>
                <Tab
                    active={activeTab === "revision"}
                    onClick={() => setActiveTab("revision")}
                    disabled={!selectedMateria}
                    style={{
                        borderBottom:
                            activeTab === "revision"
                                ? `3px solid ${ColorsDoc.primary}`
                                : "none"
                    }}
                >
                    <Edit size={20} />
                    Revisión
                </Tab>
                <Tab
                    active={activeTab === "rubricas"}
                    onClick={() => setActiveTab("rubricas")}
                    disabled={!selectedMateria}
                    style={{
                        borderBottom:
                            activeTab === "rubricas"
                                ? `3px solid ${ColorsDoc.primary}`
                                : "none"
                    }}
                >
                    <BarChart size={20} />
                    Rúbricas
                </Tab>
            </TabsContainer>

            <ContentSection>{renderContent()}</ContentSection>
        </Container>
    );
};

export default MateriasD;
