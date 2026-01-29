// Roxy: servicio simulado de eventos (base de datos falsa)

const EVENTOS_DATA = [
    {
        id: 1,
        titulo: "Entrega Proyecto Final",
        descripcion:
            "Fecha límite para la entrega del proyecto final de Ingeniería de Software",
        fecha: "2025-12-15",
        hora: "23:59",
        tipo: "entrega",
        materia: "Ingeniería de Software I",
        lugar: "Plataforma Virtual",
        color: "#FF6B6B",
    },
    {
        id: 2,
        titulo: "Examen Parcial",
        descripcion: "Segundo examen parcial - Programación Avanzada",
        fecha: "2024-12-18",
        hora: "10:30",
        tipo: "examen",
        materia: "Programación Avanzada",
        lugar: "Aula 302",
        color: "#3498DB",
    },
    {
        id: 3,
        titulo: "Reunión de Coordinación",
        descripcion: "Reunión mensual con el equipo docente",
        fecha: "2024-12-20",
        hora: "14:00",
        tipo: "reunion",
        materia: "Coordinación Académica",
        lugar: "Sala de Reuniones",
        color: "#9B59B6",
    },
    {
        id: 4,
        titulo: "Presentación de Proyectos",
        descripcion:
            "Presentación final de proyectos - Arquitectura de Software",
        fecha: "2025-12-22",
        hora: "08:00",
        tipo: "presentacion",
        materia: "Arquitectura de Software",
        lugar: "Auditorio Principal",
        color: "#4ECDC4",
    },
    {
        id: 5,
        titulo: "Cierre de Notas",
        descripcion: "Fecha límite para registrar notas del semestre",
        fecha: "2025-12-25",
        hora: "17:00",
        tipo: "administrativo",
        materia: "Todas las materias",
        lugar: "Sistema Académico",
        color: "#E67E22",
    },
];

// Simula una llamada a BD / API
export const getEventos = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(EVENTOS_DATA);
        }, 300); // delay para que parezca petición real
    });
};
