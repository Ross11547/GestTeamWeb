import React, { useState } from "react";
import {
    RevisionContainer,
    HeaderRevision,
    StudentsTable,
    TableHeader,
    TableRow,
    TableCell,
    StudentInfo,
    StudentAvatar,
    StudentName,
    SubmissionStatus,
    GradeInput,
    ActionButtons,
    ReviewButton,
    QuickActions,
    FilterSection,
    StatusFilter,
    SearchBar,
    BulkActions,
    CheckboxAll,
    ProgressBar,
    ProgressFill
} from "../../../style/docente/revisionDStyled";
import { Check, X, Clock, FileText, Download, MessageSquare, Eye, Filter, Search } from "lucide-react";

const ESTUDIANTES_DATA = [
    {
        id: 1,
        nombre: "Ana María García",
        avatar: "https://i.pravatar.cc/150?img=1",
        entregado: true,
        fechaEntrega: "2024-12-08 14:30",
        archivo: "proyecto_final_ana.pdf",
        calificacion: 85,
        revisado: true,
        comentarios: 3
    },
    {
        id: 2,
        nombre: "Carlos Rodríguez",
        avatar: "https://i.pravatar.cc/150?img=2",
        entregado: true,
        fechaEntrega: "2024-12-07 22:15",
        archivo: "proyecto_carlos.pdf",
        calificacion: null,
        revisado: false,
        comentarios: 0
    },
    {
        id: 3,
        nombre: "María López",
        avatar: "https://i.pravatar.cc/150?img=3",
        entregado: true,
        fechaEntrega: "2024-12-09 09:45",
        archivo: "tarea_maria.pdf",
        calificacion: 92,
        revisado: true,
        comentarios: 5
    },
    {
        id: 4,
        nombre: "Juan Pérez",
        avatar: "https://i.pravatar.cc/150?img=4",
        entregado: false,
        fechaEntrega: null,
        archivo: null,
        calificacion: null,
        revisado: false,
        comentarios: 0
    },
    {
        id: 5,
        nombre: "Laura Martínez",
        avatar: "https://i.pravatar.cc/150?img=5",
        entregado: true,
        fechaEntrega: "2024-12-08 18:20",
        archivo: "proyecto_laura.pdf",
        calificacion: 78,
        revisado: true,
        comentarios: 2
    }
];

const RevisionD = ({ materia, ColorsDoc }) => {
    const [estudiantes, setEstudiantes] = useState(ESTUDIANTES_DATA);
    const [filterStatus, setFilterStatus] = useState("todos");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectAll, setSelectAll] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState([]);

    const handleGradeChange = (studentId, grade) => {
        setEstudiantes(prev => prev.map(est =>
            est.id === studentId ? { ...est, calificacion: grade, revisado: true } : est
        ));
    };

    const getStatusIcon = (entregado, revisado) => {
        if (!entregado) return <X size={20} color="#FF6B6B" />;
        if (revisado) return <Check size={20} color="#4ECDC4" />;
        return <Clock size={20} color="#FFA500" />;
    };

    const getStatusText = (entregado, revisado) => {
        if (!entregado) return "No entregado";
        if (revisado) return "Revisado";
        return "Pendiente";
    };

    const filteredEstudiantes = estudiantes.filter(est => {
        const matchesSearch = est.nombre.toLowerCase().includes(searchQuery.toLowerCase());

        if (filterStatus === "todos") return matchesSearch;
        if (filterStatus === "entregados") return est.entregado && !est.revisado && matchesSearch;
        if (filterStatus === "revisados") return est.revisado && matchesSearch;
        if (filterStatus === "no_entregados") return !est.entregado && matchesSearch;

        return matchesSearch;
    });

    const totalEntregados = estudiantes.filter(e => e.entregado).length;
    const totalRevisados = estudiantes.filter(e => e.revisado).length;
    const progressPercentage = (totalRevisados / totalEntregados) * 100 || 0;

    return (
        <RevisionContainer>
            <HeaderRevision>
                <div>
                    <h2>{materia ? materia.nombre : 'Todas las Materias'} - Revisión de Tareas</h2>
                    <ProgressBar>
                        <ProgressFill width={progressPercentage} color={ColorsDoc.primary} />
                        <span>{totalRevisados} de {totalEntregados} revisados</span>
                    </ProgressBar>
                </div>

                <QuickActions>
                    <ReviewButton style={{ background: ColorsDoc.primary }}>
                        <Download size={18} />
                        Descargar Todos
                    </ReviewButton>
                    <ReviewButton style={{ background: ColorsDoc.secondary }}>
                        <FileText size={18} />
                        Exportar Notas
                    </ReviewButton>
                </QuickActions>
            </HeaderRevision>

            <FilterSection>
                <SearchBar>
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Buscar estudiante..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </SearchBar>

                <StatusFilter>
                    <button
                        className={filterStatus === 'todos' ? 'active' : ''}
                        onClick={() => setFilterStatus('todos')}
                    >
                        Todos ({estudiantes.length})
                    </button>
                    <button
                        className={filterStatus === 'entregados' ? 'active' : ''}
                        onClick={() => setFilterStatus('entregados')}
                    >
                        Por Revisar ({estudiantes.filter(e => e.entregado && !e.revisado).length})
                    </button>
                    <button
                        className={filterStatus === 'revisados' ? 'active' : ''}
                        onClick={() => setFilterStatus('revisados')}
                    >
                        Revisados ({totalRevisados})
                    </button>
                    <button
                        className={filterStatus === 'no_entregados' ? 'active' : ''}
                        onClick={() => setFilterStatus('no_entregados')}
                    >
                        No Entregados ({estudiantes.filter(e => !e.entregado).length})
                    </button>
                </StatusFilter>
            </FilterSection>

            <StudentsTable>
                <TableHeader>
                    <TableRow>
                        <TableCell header>
                            <CheckboxAll
                                type="checkbox"
                                checked={selectAll}
                                onChange={(e) => setSelectAll(e.target.checked)}
                            />
                        </TableCell>
                        <TableCell header>Estudiante</TableCell>
                        <TableCell header>Estado</TableCell>
                        <TableCell header>Fecha Entrega</TableCell>
                        <TableCell header>Archivo</TableCell>
                        <TableCell header>Calificación</TableCell>
                        <TableCell header>Acciones</TableCell>
                    </TableRow>
                </TableHeader>
                <tbody>
                    {filteredEstudiantes.map(estudiante => (
                        <TableRow key={estudiante.id}>
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={selectedStudents.includes(estudiante.id)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedStudents([...selectedStudents, estudiante.id]);
                                        } else {
                                            setSelectedStudents(selectedStudents.filter(id => id !== estudiante.id));
                                        }
                                    }}
                                />
                            </TableCell>
                            <TableCell>
                                <StudentInfo>
                                    <StudentAvatar src={estudiante.avatar} alt={estudiante.nombre} />
                                    <StudentName>{estudiante.nombre}</StudentName>
                                </StudentInfo>
                            </TableCell>
                            <TableCell>
                                <SubmissionStatus status={estudiante.entregado ? (estudiante.revisado ? 'revisado' : 'pendiente') : 'no_entregado'}>
                                    {getStatusIcon(estudiante.entregado, estudiante.revisado)}
                                    {getStatusText(estudiante.entregado, estudiante.revisado)}
                                </SubmissionStatus>
                            </TableCell>
                            <TableCell>
                                {estudiante.fechaEntrega || '-'}
                            </TableCell>
                            <TableCell>
                                {estudiante.archivo ? (
                                    <a href="#" style={{ color: ColorsDoc.primary, textDecoration: 'none' }}>
                                        {estudiante.archivo}
                                    </a>
                                ) : '-'}
                            </TableCell>
                            <TableCell>
                                {estudiante.entregado ? (
                                    <GradeInput>
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={estudiante.calificacion || ''}
                                            onChange={(e) => handleGradeChange(estudiante.id, e.target.value)}
                                            placeholder="-"
                                        />
                                        <span>/100</span>
                                    </GradeInput>
                                ) : '-'}
                            </TableCell>
                            <TableCell>
                                <ActionButtons>
                                    {estudiante.entregado && (
                                        <>
                                            <button title="Ver trabajo">
                                                <Eye size={18} />
                                            </button>
                                            <button title="Comentarios">
                                                <MessageSquare size={18} />
                                                {estudiante.comentarios > 0 && <span>{estudiante.comentarios}</span>}
                                            </button>
                                            <button title="Descargar">
                                                <Download size={18} />
                                            </button>
                                        </>
                                    )}
                                </ActionButtons>
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </StudentsTable>
        </RevisionContainer>
    );
};

export default RevisionD;