import React, { useState } from "react";
import {
    TareasContainer,
    HeaderTareas,
    TasksBoard,
    ColumnContainer,
    ColumnHeader,
    ColumnTitle,
    TaskCount,
    TasksList,
    TaskCard,
    TaskHeader,
    TaskPriority,
    TaskTitle,
    TaskMeta,
    TaskDate,
    TaskMateria,
    TaskStudents,
    TaskProgress,
    ProgressBar,
    ProgressFill,
    TaskActions,
    ActionBtn,
    AddTaskButton,
    FilterBar,
    ViewToggle,
    ToggleBtn,
    SearchInput,
    DragPreview
} from "../../../style/docente/tareasDStyled";
import {
    Plus, Calendar, Users, Clock, CheckCircle,
    AlertCircle, MoreVertical, Grid3x3, List,
    Search, Filter, Edit, Trash2, Eye, GripVertical
} from "lucide-react";

const TareasD = ({ ColorsDoc }) => {
    const [tareas, setTareas] = useState({
        pendientes: [
            {
                id: 1,
                titulo: "Revisar Proyecto Final",
                materia: "Ingeniería de Software I",
                fechaLimite: "2024-12-15",
                prioridad: "alta",
                estudiantes: 28,
                progreso: 0
            },
            {
                id: 2,
                titulo: "Preparar Examen Parcial",
                materia: "Programación Avanzada",
                fechaLimite: "2024-12-18",
                prioridad: "media",
                estudiantes: 35,
                progreso: 0
            },
            {
                id: 3,
                titulo: "Actualizar Material de Clase",
                materia: "Bases de Datos Avanzadas",
                fechaLimite: "2024-12-20",
                prioridad: "baja",
                estudiantes: 30,
                progreso: 0
            }
        ],
        enProgreso: [
            {
                id: 4,
                titulo: "Calificar Tareas Semana 12",
                materia: "Arquitectura de Software",
                fechaLimite: "2024-12-12",
                prioridad: "alta",
                estudiantes: 32,
                progreso: 60
            }
        ],
        revision: [
            {
                id: 6,
                titulo: "Validar Rúbricas de Evaluación",
                materia: "Programación Avanzada",
                fechaLimite: "2024-12-13",
                prioridad: "alta",
                estudiantes: 35,
                progreso: 85
            }
        ],
        completadas: [
            {
                id: 8,
                titulo: "Registro de Asistencias",
                materia: "Todas las materias",
                fechaLimite: "2024-12-10",
                prioridad: "baja",
                estudiantes: 125,
                progreso: 100
            }
        ]
    });

    const [draggedTask, setDraggedTask] = useState(null);
    const [draggedFrom, setDraggedFrom] = useState(null);
    const [draggedOver, setDraggedOver] = useState(null);
    const [vistaActiva, setVistaActiva] = useState('kanban');
    const [searchQuery, setSearchQuery] = useState('');

    const handleDragStart = (e, task, fromColumn) => {
        setDraggedTask(task);
        setDraggedFrom(fromColumn);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e, column) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setDraggedOver(column);
    };

    const handleDrop = (e, toColumn) => {
        e.preventDefault();

        if (draggedTask && draggedFrom && draggedFrom !== toColumn) {
            const sourceTasks = [...tareas[draggedFrom]];
            const destTasks = [...tareas[toColumn]];

            // Remover de la columna origen
            const taskIndex = sourceTasks.findIndex(t => t.id === draggedTask.id);
            sourceTasks.splice(taskIndex, 1);

            // Actualizar progreso basado en la columna destino
            let updatedTask = { ...draggedTask };
            if (toColumn === 'enProgreso') {
                updatedTask.progreso = 25;
            } else if (toColumn === 'revision') {
                updatedTask.progreso = 75;
            } else if (toColumn === 'completadas') {
                updatedTask.progreso = 100;
            } else {
                updatedTask.progreso = 0;
            }

            // Agregar a la columna destino
            destTasks.push(updatedTask);

            setTareas({
                ...tareas,
                [draggedFrom]: sourceTasks,
                [toColumn]: destTasks
            });
        }

        setDraggedTask(null);
        setDraggedFrom(null);
        setDraggedOver(null);
    };

    const getPriorityColor = (prioridad) => {
        switch (prioridad) {
            case 'alta': return '#FF6B6B';
            case 'media': return '#FFA500';
            case 'baja': return '#4ECDC4';
            default: return '#6b7280';
        }
    };

    const getPriorityIcon = (prioridad) => {
        switch (prioridad) {
            case 'alta': return <AlertCircle size={14} />;
            case 'media': return <Clock size={14} />;
            case 'baja': return <CheckCircle size={14} />;
            default: return null;
        }
    };

    const getColumnColor = (column) => {
        switch (column) {
            case 'pendientes': return '#6b7280';
            case 'enProgreso': return ColorsDoc.primary;
            case 'revision': return '#FFA500';
            case 'completadas': return '#4ECDC4';
            default: return '#6b7280';
        }
    };

    const getDaysRemaining = (fecha) => {
        const today = new Date();
        const deadline = new Date(fecha);
        const diffTime = deadline - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return <span style={{ color: '#FF6B6B' }}>Vencida</span>;
        if (diffDays === 0) return <span style={{ color: '#FFA500' }}>Hoy</span>;
        if (diffDays === 1) return <span style={{ color: '#FFA500' }}>Mañana</span>;
        return `${diffDays} días`;
    };

    const deleteTask = (columnId, taskId) => {
        const updatedTasks = tareas[columnId].filter(task => task.id !== taskId);
        setTareas({
            ...tareas,
            [columnId]: updatedTasks
        });
    };

    const updateTaskProgress = (columnId, taskId, newProgress) => {
        const updatedTasks = tareas[columnId].map(task =>
            task.id === taskId ? { ...task, progreso: newProgress } : task
        );
        setTareas({
            ...tareas,
            [columnId]: updatedTasks
        });
    };

    const columns = [
        { id: 'pendientes', title: 'Pendientes', tasks: tareas.pendientes },
        { id: 'enProgreso', title: 'En Progreso', tasks: tareas.enProgreso },
        { id: 'revision', title: 'En Revisión', tasks: tareas.revision },
        { id: 'completadas', title: 'Completadas', tasks: tareas.completadas }
    ];

    return (
        <TareasContainer>
            <HeaderTareas>
                <div>
                    <h2>Gestión de Tareas</h2>
                    <p>Arrastra las tareas entre columnas para cambiar su estado</p>
                </div>

                <AddTaskButton style={{ background: ColorsDoc.primary }}>
                    <Plus size={20} />
                    Nueva Tarea
                </AddTaskButton>
            </HeaderTareas>

            <FilterBar>
                <SearchInput>
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Buscar tareas..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </SearchInput>

                <ViewToggle>
                    <ToggleBtn
                        active={vistaActiva === 'kanban'}
                        onClick={() => setVistaActiva('kanban')}
                    >
                        <Grid3x3 size={18} />
                        Kanban
                    </ToggleBtn>
                    <ToggleBtn
                        active={vistaActiva === 'lista'}
                        onClick={() => setVistaActiva('lista')}
                    >
                        <List size={18} />
                        Lista
                    </ToggleBtn>
                </ViewToggle>

                <button style={{
                    padding: '0.75rem 1rem',
                    background: 'white',
                    border: '1px solid #e9ecef',
                    borderRadius: '10px',
                    color: '#6b7280',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer'
                }}>
                    <Filter size={18} />
                    Filtros
                </button>
            </FilterBar>

            <TasksBoard>
                {columns.map(column => (
                    <ColumnContainer
                        key={column.id}
                        onDragOver={(e) => handleDragOver(e, column.id)}
                        onDrop={(e) => handleDrop(e, column.id)}
                        isDraggedOver={draggedOver === column.id}
                    >
                        <ColumnHeader style={{ borderTop: `4px solid ${getColumnColor(column.id)}` }}>
                            <ColumnTitle>{column.title}</ColumnTitle>
                            <TaskCount>{column.tasks.length}</TaskCount>
                        </ColumnHeader>

                        <TasksList>
                            {column.tasks.map(tarea => (
                                <TaskCard
                                    key={tarea.id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, tarea, column.id)}
                                >
                                    <div style={{
                                        position: 'absolute',
                                        left: '0.5rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        cursor: 'grab',
                                        color: '#CBD5E0'
                                    }}>
                                        <GripVertical size={16} />
                                    </div>

                                    <TaskHeader>
                                        <TaskPriority color={getPriorityColor(tarea.prioridad)}>
                                            {getPriorityIcon(tarea.prioridad)}
                                            {tarea.prioridad}
                                        </TaskPriority>
                                        <button style={{
                                            background: 'none',
                                            border: 'none',
                                            color: '#6b7280',
                                            cursor: 'pointer'
                                        }}>
                                            <MoreVertical size={18} />
                                        </button>
                                    </TaskHeader>

                                    <TaskTitle>{tarea.titulo}</TaskTitle>

                                    <TaskMeta>
                                        <TaskMateria>{tarea.materia}</TaskMateria>
                                        <TaskDate>
                                            <Calendar size={14} />
                                            {getDaysRemaining(tarea.fechaLimite)}
                                        </TaskDate>
                                    </TaskMeta>

                                    <TaskStudents>
                                        <Users size={14} />
                                        {tarea.estudiantes} estudiantes
                                    </TaskStudents>

                                    {tarea.progreso !== undefined && (
                                        <TaskProgress>
                                            <span>{tarea.progreso}%</span>
                                            <ProgressBar>
                                                <ProgressFill
                                                    width={tarea.progreso}
                                                    color={tarea.progreso === 100 ? '#4ECDC4' : ColorsDoc.primary}
                                                />
                                            </ProgressBar>
                                            {column.id === 'enProgreso' && (
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    value={tarea.progreso}
                                                    onChange={(e) => updateTaskProgress(column.id, tarea.id, parseInt(e.target.value))}
                                                    style={{
                                                        width: '100%',
                                                        marginTop: '0.5rem',
                                                        cursor: 'pointer'
                                                    }}
                                                />
                                            )}
                                        </TaskProgress>
                                    )}

                                    <TaskActions>
                                        <ActionBtn title="Ver detalles">
                                            <Eye size={16} />
                                        </ActionBtn>
                                        <ActionBtn title="Editar">
                                            <Edit size={16} />
                                        </ActionBtn>
                                        <ActionBtn
                                            title="Eliminar"
                                            className="delete"
                                            onClick={() => deleteTask(column.id, tarea.id)}
                                        >
                                            <Trash2 size={16} />
                                        </ActionBtn>
                                    </TaskActions>
                                </TaskCard>
                            ))}

                            {column.id === 'pendientes' && (
                                <AddTaskButton
                                    style={{
                                        background: 'transparent',
                                        border: `2px dashed ${ColorsDoc.primary}`,
                                        color: ColorsDoc.primary,
                                        width: '100%',
                                        marginTop: '1rem'
                                    }}
                                >
                                    <Plus size={20} />
                                    Agregar Tarea
                                </AddTaskButton>
                            )}
                        </TasksList>
                    </ColumnContainer>
                ))}
            </TasksBoard>
        </TareasContainer>
    );
};

export default TareasD;