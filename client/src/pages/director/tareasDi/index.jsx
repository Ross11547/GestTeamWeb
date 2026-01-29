// Roxy: Tareas del Director (entregas/avances + calendario + mover cards)

import React, { useState, useMemo } from "react";
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
} from "../../../style/docente/tareasDStyled";
import {
    Plus,
    Calendar,
    Users,
    Clock,
    CheckCircle,
    AlertCircle,
    MoreVertical,
    Grid3x3,
    List,
    Search,
    Filter,
    Edit,
    Trash2,
    Eye,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import styled from "styled-components";

const TAREAS_DATA_INICIAL = {
    pendientes: [
        {
            id: 1,
            titulo: "Entrega Hito 2 - GestTeam",
            materia: "Ingeniería de Software I",
            fechaLimite: "2024-12-15",
            prioridad: "alta",
            estudiantes: 28,
            progreso: 0,
            tipo: "entrega",
        },
        {
            id: 2,
            titulo: "Definir alcance Proyecto API",
            materia: "Programación Avanzada",
            fechaLimite: "2024-12-18",
            prioridad: "media",
            estudiantes: 35,
            progreso: 0,
            tipo: "avance",
        },
        {
            id: 3,
            titulo: "Subir documento de modelo BD",
            materia: "Bases de Datos Avanzadas",
            fechaLimite: "2024-12-20",
            prioridad: "baja",
            estudiantes: 30,
            progreso: 0,
            tipo: "entrega",
        },
    ],
    enProgreso: [
        {
            id: 4,
            titulo: "Revisión avance prototipo GestTeam",
            materia: "Arquitectura de Software",
            fechaLimite: "2024-12-12",
            prioridad: "alta",
            estudiantes: 32,
            progreso: 60,
            tipo: "avance",
        },
        {
            id: 5,
            titulo: "Seguimiento integración API",
            materia: "Ingeniería de Software I",
            fechaLimite: "2024-12-14",
            prioridad: "media",
            estudiantes: 28,
            progreso: 35,
            tipo: "avance",
        },
    ],
    revision: [
        {
            id: 6,
            titulo: "Validar rúbricas de proyecto",
            materia: "Programación Avanzada",
            fechaLimite: "2024-12-13",
            prioridad: "alta",
            estudiantes: 35,
            progreso: 85,
            tipo: "avance",
        },
        {
            id: 7,
            titulo: "Revisión entregas intermedias",
            materia: "Bases de Datos Avanzadas",
            fechaLimite: "2024-12-11",
            prioridad: "media",
            estudiantes: 30,
            progreso: 90,
            tipo: "entrega",
        },
    ],
    completadas: [
        {
            id: 8,
            titulo: "Entrega Hito 1 - todos los grupos",
            materia: "Todas las materias",
            fechaLimite: "2024-12-10",
            prioridad: "baja",
            estudiantes: 125,
            progreso: 100,
            tipo: "entrega",
        },
        {
            id: 9,
            titulo: "Cierre de revisión Hito 1",
            materia: "Arquitectura de Software",
            fechaLimite: "2024-12-08",
            prioridad: "alta",
            estudiantes: 32,
            progreso: 100,
            tipo: "avance",
        },
    ],
};

const COLUMN_ORDER = ["pendientes", "enProgreso", "revision", "completadas"];

const TareasDi = ({ ColorsDoc }) => {
    const [tareas, setTareas] = useState(TAREAS_DATA_INICIAL);
    const [vistaActiva, setVistaActiva] = useState("kanban");
    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [newTask, setNewTask] = useState({
        titulo: "",
        materia: "",
        fechaLimite: "",
        prioridad: "media",
        estudiantes: 30,
        progreso: 0,
        tipo: "entrega",
        columna: "pendientes",
    });

    const getPriorityColor = (prioridad) => {
        switch (prioridad) {
            case "alta":
                return "#FF6B6B";
            case "media":
                return "#FFA500";
            case "baja":
                return "#4ECDC4";
            default:
                return "#6b7280";
        }
    };

    const getPriorityIcon = (prioridad) => {
        switch (prioridad) {
            case "alta":
                return <AlertCircle size={14} />;
            case "media":
                return <Clock size={14} />;
            case "baja":
                return <CheckCircle size={14} />;
            default:
                return null;
        }
    };

    const getColumnColor = (column) => {
        switch (column) {
            case "pendientes":
                return "#6b7280";
            case "enProgreso":
                return ColorsDoc.primary;
            case "revision":
                return "#FFA500";
            case "completadas":
                return "#4ECDC4";
            default:
                return "#6b7280";
        }
    };

    const getDaysRemaining = (fecha) => {
        if (!fecha) return "-";
        const today = new Date();
        const deadline = new Date(fecha + "T00:00:00");
        const diffTime = deadline - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0)
            return <span style={{ color: "#FF6B6B" }}>Vencida</span>;
        if (diffDays === 0)
            return <span style={{ color: "#FFA500" }}>Hoy</span>;
        if (diffDays === 1)
            return <span style={{ color: "#FFA500" }}>Mañana</span>;
        return `${diffDays} días`;
    };

    const columns = [
        { id: "pendientes", title: "Pendientes", tasks: tareas.pendientes },
        { id: "enProgreso", title: "En Progreso", tasks: tareas.enProgreso },
        { id: "revision", title: "En Revisión", tasks: tareas.revision },
        { id: "completadas", title: "Completadas", tasks: tareas.completadas },
    ];

    // ==== mover cards entre columnas (simula drag & drop) ====
    const moveTask = (taskId, fromColumnId, direction) => {
        const currentIndex = COLUMN_ORDER.indexOf(fromColumnId);
        const newIndex = currentIndex + direction;
        if (newIndex < 0 || newIndex >= COLUMN_ORDER.length) return;
        const toColumnId = COLUMN_ORDER[newIndex];

        setTareas((prev) => {
            const fromList = [...prev[fromColumnId]];
            const toList = [...prev[toColumnId]];

            const taskIndex = fromList.findIndex((t) => t.id === taskId);
            if (taskIndex === -1) return prev;

            const [task] = fromList.splice(taskIndex, 1);

            // si llega a "completadas", fuerzo progreso 100 para que se vea en calendario como completado
            const updatedTask =
                toColumnId === "completadas" && task.progreso < 100
                    ? { ...task, progreso: 100 }
                    : task;

            toList.push(updatedTask);

            return {
                ...prev,
                [fromColumnId]: fromList,
                [toColumnId]: toList,
            };
        });
    };

    // ==== búsqueda ====
    const filteredColumns = useMemo(() => {
        const query = searchQuery.toLowerCase();
        if (!query) return columns;
        return columns.map((col) => ({
            ...col,
            tasks: col.tasks.filter(
                (t) =>
                    t.titulo.toLowerCase().includes(query) ||
                    t.materia.toLowerCase().includes(query)
            ),
        }));
    }, [columns, searchQuery]);

    // ==== eventos de calendario a partir de tareas ====
    const eventosCalendario = useMemo(() => {
        const allTasks = [
            ...tareas.pendientes,
            ...tareas.enProgreso,
            ...tareas.revision,
            ...tareas.completadas,
        ];
        return allTasks
            .filter((t) => t.fechaLimite)
            .map((t) => ({
                id: `EV-${t.id}`,
                fecha: t.fechaLimite,
                titulo: t.titulo,
                materia: t.materia,
                tipo: t.tipo,
                estado:
                    t.progreso === 100
                        ? "Completado"
                        : t.progreso > 0
                            ? "En progreso"
                            : "Pendiente",
            }))
            .sort((a, b) => a.fecha.localeCompare(b.fecha));
    }, [tareas]);

    // ==== crear nueva tarea ====
    const handleCreateTask = (e) => {
        e.preventDefault();
        const nuevaTarea = {
            id: Date.now(),
            ...newTask,
            estudiantes: Number(newTask.estudiantes || 0),
            progreso: Number(newTask.progreso || 0),
        };

        setTareas((prev) => ({
            ...prev,
            [newTask.columna]: [...prev[newTask.columna], nuevaTarea],
        }));

        setShowModal(false);
        setNewTask({
            titulo: "",
            materia: "",
            fechaLimite: "",
            prioridad: "media",
            estudiantes: 30,
            progreso: 0,
            tipo: "entrega",
            columna: "pendientes",
        });
    };

    return (
        <TareasContainer>
            <HeaderTareas>
                <div>
                    <h2>Gestión de entregas y avances</h2>
                    <p>
                        Administra fechas de entrega y avances de proyectos. Todo se refleja
                        en el calendario.
                    </p>
                </div>

                <AddTaskButton
                    style={{ background: ColorsDoc.primary }}
                    onClick={() => setShowModal(true)}
                >
                    <Plus size={20} />
                    Nueva entrega / avance
                </AddTaskButton>
            </HeaderTareas>

            <FilterBar>
                <SearchInput>
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Buscar por título o materia..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </SearchInput>

                <ViewToggle>
                    <ToggleBtn
                        active={vistaActiva === "kanban"}
                        onClick={() => setVistaActiva("kanban")}
                    >
                        <Grid3x3 size={18} />
                        Kanban
                    </ToggleBtn>
                    <ToggleBtn
                        active={vistaActiva === "lista"}
                        onClick={() => setVistaActiva("lista")}
                    >
                        <List size={18} />
                        Lista
                    </ToggleBtn>
                </ViewToggle>

                <button
                    style={{
                        padding: "0.75rem 1rem",
                        background: "white",
                        border: "1px solid #e9ecef",
                        borderRadius: "10px",
                        color: "#6b7280",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        cursor: "pointer",
                    }}
                >
                    <Filter size={18} />
                    Filtros
                </button>
            </FilterBar>

            {/* KANBAN */}
            {vistaActiva === "kanban" && (
                <TasksBoard>
                    {filteredColumns.map((column) => (
                        <ColumnContainer key={column.id}>
                            <ColumnHeader
                                style={{
                                    borderTop: `4px solid ${getColumnColor(column.id)}`,
                                }}
                            >
                                <ColumnTitle>{column.title}</ColumnTitle>
                                <TaskCount>{column.tasks.length}</TaskCount>
                            </ColumnHeader>

                            <TasksList>
                                {column.tasks.map((tarea) => (
                                    <TaskCard key={tarea.id}>
                                        <TaskHeader>
                                            <TaskPriority
                                                color={getPriorityColor(tarea.prioridad)}
                                            >
                                                {getPriorityIcon(tarea.prioridad)}
                                                {tarea.prioridad} • {tarea.tipo}
                                            </TaskPriority>
                                            <button
                                                style={{
                                                    background: "none",
                                                    border: "none",
                                                    color: "#6b7280",
                                                    cursor: "pointer",
                                                }}
                                            >
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
                                                        color={
                                                            tarea.progreso === 100
                                                                ? "#4ECDC4"
                                                                : ColorsDoc.primary
                                                        }
                                                    />
                                                </ProgressBar>
                                            </TaskProgress>
                                        )}

                                        <TaskActions>
                                            {/* mover izquierda */}
                                            <ActionBtn
                                                title="Mover a la columna anterior"
                                                onClick={() =>
                                                    moveTask(tarea.id, column.id, -1)
                                                }
                                            >
                                                <ChevronLeft size={16} />
                                            </ActionBtn>

                                            {/* mover derecha */}
                                            <ActionBtn
                                                title="Mover a la siguiente columna"
                                                onClick={() =>
                                                    moveTask(tarea.id, column.id, 1)
                                                }
                                            >
                                                <ChevronRight size={16} />
                                            </ActionBtn>

                                            <ActionBtn title="Ver detalles">
                                                <Eye size={16} />
                                            </ActionBtn>
                                            <ActionBtn title="Editar">
                                                <Edit size={16} />
                                            </ActionBtn>
                                            <ActionBtn
                                                title="Eliminar"
                                                className="delete"
                                            >
                                                <Trash2 size={16} />
                                            </ActionBtn>
                                        </TaskActions>
                                    </TaskCard>
                                ))}

                                {/* botón rápido en pendientes */}
                                {column.id === "pendientes" && (
                                    <AddTaskButton
                                        style={{
                                            background: "transparent",
                                            border: `2px dashed ${ColorsDoc.primary}`,
                                            color: ColorsDoc.primary,
                                            width: "100%",
                                            marginTop: "1rem",
                                        }}
                                        onClick={() => {
                                            setNewTask((prev) => ({
                                                ...prev,
                                                columna: "pendientes",
                                            }));
                                            setShowModal(true);
                                        }}
                                    >
                                        <Plus size={20} />
                                        Agregar entrega / avance
                                    </AddTaskButton>
                                )}
                            </TasksList>
                        </ColumnContainer>
                    ))}
                </TasksBoard>
            )}

            {/* LISTA */}
            {vistaActiva === "lista" && (
                <ListaWrapper>
                    <table>
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Materia</th>
                                <th>Tipo</th>
                                <th>Fecha límite</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {eventosCalendario.map((ev) => (
                                <tr key={ev.id}>
                                    <td>{ev.titulo}</td>
                                    <td>{ev.materia}</td>
                                    <td>{ev.tipo}</td>
                                    <td>{ev.fecha}</td>
                                    <td>{ev.estado}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </ListaWrapper>
            )}

            {/* RESUMEN CALENDARIO */}
            <CalendarSummary>
                <h3>Resumen en calendario (entregas y avances)</h3>
                {eventosCalendario.length === 0 && (
                    <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                        No hay entregas ni avances registrados.
                    </p>
                )}
                <CalendarSummaryList>
                    {eventosCalendario.map((ev) => (
                        <CalendarSummaryItem key={ev.id}>
                            <div className="fecha">
                                {new Date(ev.fecha + "T00:00:00").toLocaleDateString(
                                    "es-ES",
                                    {
                                        day: "2-digit",
                                        month: "2-digit",
                                    }
                                )}
                            </div>
                            <div className="contenido">
                                <strong>{ev.titulo}</strong>
                                <div className="meta">
                                    <span>{ev.materia}</span>
                                    <span>• {ev.tipo}</span>
                                    <span>• {ev.estado}</span>
                                </div>
                            </div>
                        </CalendarSummaryItem>
                    ))}
                </CalendarSummaryList>
            </CalendarSummary>

            {/* MODAL NUEVA TAREA */}
            {showModal && (
                <ModalOverlay onClick={() => setShowModal(false)}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <h3>Nueva entrega / avance</h3>
                        <form onSubmit={handleCreateTask}>
                            <FieldGroup>
                                <label>Título</label>
                                <input
                                    type="text"
                                    value={newTask.titulo}
                                    onChange={(e) =>
                                        setNewTask((prev) => ({
                                            ...prev,
                                            titulo: e.target.value,
                                        }))
                                    }
                                    required
                                />
                            </FieldGroup>

                            <FieldGroup>
                                <label>Materia</label>
                                <input
                                    type="text"
                                    value={newTask.materia}
                                    onChange={(e) =>
                                        setNewTask((prev) => ({
                                            ...prev,
                                            materia: e.target.value,
                                        }))
                                    }
                                    required
                                />
                            </FieldGroup>

                            <FieldGroup>
                                <label>Tipo</label>
                                <select
                                    value={newTask.tipo}
                                    onChange={(e) =>
                                        setNewTask((prev) => ({
                                            ...prev,
                                            tipo: e.target.value,
                                        }))
                                    }
                                >
                                    <option value="entrega">Entrega</option>
                                    <option value="avance">Avance de proyecto</option>
                                </select>
                            </FieldGroup>

                            <FieldGroup>
                                <label>Fecha límite</label>
                                <input
                                    type="date"
                                    value={newTask.fechaLimite}
                                    onChange={(e) =>
                                        setNewTask((prev) => ({
                                            ...prev,
                                            fechaLimite: e.target.value,
                                        }))
                                    }
                                    required
                                />
                            </FieldGroup>

                            <FieldRow>
                                <FieldGroup>
                                    <label>Prioridad</label>
                                    <select
                                        value={newTask.prioridad}
                                        onChange={(e) =>
                                            setNewTask((prev) => ({
                                                ...prev,
                                                prioridad: e.target.value,
                                            }))
                                        }
                                    >
                                        <option value="alta">Alta</option>
                                        <option value="media">Media</option>
                                        <option value="baja">Baja</option>
                                    </select>
                                </FieldGroup>
                                <FieldGroup>
                                    <label>Estudiantes</label>
                                    <input
                                        type="number"
                                        min={1}
                                        value={newTask.estudiantes}
                                        onChange={(e) =>
                                            setNewTask((prev) => ({
                                                ...prev,
                                                estudiantes: e.target.value,
                                            }))
                                        }
                                    />
                                </FieldGroup>
                            </FieldRow>

                            <FieldGroup>
                                <label>Columna inicial</label>
                                <select
                                    value={newTask.columna}
                                    onChange={(e) =>
                                        setNewTask((prev) => ({
                                            ...prev,
                                            columna: e.target.value,
                                        }))
                                    }
                                >
                                    <option value="pendientes">Pendientes</option>
                                    <option value="enProgreso">En Progreso</option>
                                    <option value="revision">En Revisión</option>
                                    <option value="completadas">Completadas</option>
                                </select>
                            </FieldGroup>

                            <ModalActions>
                                <button type="button" onClick={() => setShowModal(false)}>
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    style={{ background: ColorsDoc.primary }}
                                >
                                    Guardar
                                </button>
                            </ModalActions>
                        </form>
                    </ModalContent>
                </ModalOverlay>
            )}
        </TareasContainer>
    );
};

export default TareasDi;

// ================== Estilos locales extra ==================

const ListaWrapper = styled.div`
  margin-top: 1.5rem;
  background: #ffffff;
  border-radius: 14px;
  padding: 0.75rem 1rem;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }
  th,
  td {
    padding: 6px 8px;
    border-bottom: 1px solid #e5e7eb;
  }
  th {
    text-align: left;
    color: #6b7280;
    font-weight: 600;
  }
`;

const CalendarSummary = styled.div`
  margin-top: 2rem;
  background: #f9fafb;
  border-radius: 16px;
  padding: 1rem 1.2rem;
`;

const CalendarSummaryList = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const CalendarSummaryItem = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  padding: 6px 8px;
  border-radius: 10px;
  background: #ffffff;
  .fecha {
    min-width: 52px;
    text-align: center;
    font-weight: 600;
    font-size: 13px;
    color: #111827;
  }
  .contenido {
    flex: 1;
  }
  .meta {
    font-size: 11px;
    color: #6b7280;
    display: flex;
    gap: 0.35rem;
    flex-wrap: wrap;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 40;
`;

const ModalContent = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 1.2rem 1.4rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.25);
  h3 {
    margin: 0 0 0.75rem 0;
    font-size: 16px;
    font-weight: 600;
  }
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.6rem;
  label {
    font-size: 12px;
    margin-bottom: 2px;
    color: #4b5563;
  }
  input,
  select {
    border-radius: 10px;
    border: 1px solid #e5e7eb;
    padding: 6px 8px;
    font-size: 13px;
    outline: none;
  }
`;

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`;

const ModalActions = styled.div`
  margin-top: 0.8rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  button {
    border-radius: 999px;
    border: none;
    padding: 6px 12px;
    font-size: 13px;
    cursor: pointer;
  }
  button:first-child {
    background: #e5e7eb;
    color: #374151;
  }
  button:last-child {
    color: #ffffff;
  }
`;
