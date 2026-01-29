// Roxy: "BD falsa" para materias, proyectos, entregas y pizarras

const materiasDB = [
    {
        id: 1,
        name: "Ingeniería de Software I",
        teacher: "Yblin Vargas",
        schedule: "07:30 am a 10:00 am",
        classroom: "Aula 301",
        image:
            "https://concepto.de/wp-content/uploads/2015/03/software-1-e1550080097569.jpg",
        projects: [
            {
                id: "ISW1-P1",
                title: "GestTeam - Gestión académica",
                description:
                    "Plataforma web para gestión de materias, proyectos, ferias y rúbricas.",
                status: "En curso",
                progress: 0.7,
                startDate: "2024-08-05",
                endDate: "2024-11-30",
            },
            {
                id: "ISW1-P2",
                title: "Módulo de reportes",
                description:
                    "Generación de reportes PDF/Excel para directores de carrera.",
                status: "Pendiente",
                progress: 0.2,
                startDate: "2024-09-15",
                endDate: "2024-12-20",
            },
        ],
        deliveries: [
            {
                id: "ISW1-E1",
                title: "Hito 1 - Levantamiento de requerimientos",
                dueDate: "2024-09-09",
                status: "Entregado",
                grade: 95,
            },
            {
                id: "ISW1-E2",
                title: "Hito 2 - Prototipo de baja fidelidad",
                dueDate: "2024-10-06",
                status: "Entregado",
                grade: 90,
            },
            {
                id: "ISW1-E3",
                title: "Hito 3 - Prototipo funcional",
                dueDate: "2024-11-10",
                status: "Pendiente",
                grade: null,
            },
        ],
        boards: [
            {
                id: "ISW1-B1",
                title: "Backlog general del proyecto",
                lastUpdate: "2024-09-10",
                url: "https://trello.com/",
            },
            {
                id: "ISW1-B2",
                title: "Sprint actual",
                lastUpdate: "2024-09-18",
                url: "https://github.com/",
            },
        ],
    },
    {
        id: 2,
        name: "Programación Avanzada",
        teacher: "Carlos Mendoza",
        schedule: "10:30 am a 1:00 pm",
        classroom: "Aula 302",
        image:
            "https://concepto.de/wp-content/uploads/2020/08/Programacion-informatica-scaled-e1724960033513.jpg",
        projects: [
            {
                id: "PA-P1",
                title: "API REST GestTeam",
                description:
                    "API en Node.js + Prisma para gestión de usuarios, roles y proyectos.",
                status: "En curso",
                progress: 0.5,
                startDate: "2024-08-10",
                endDate: "2024-11-25",
            },
        ],
        deliveries: [
            {
                id: "PA-E1",
                title: "Laboratorio 1 - Endpoints CRUD",
                dueDate: "2024-09-12",
                status: "Entregado",
                grade: 90,
            },
            {
                id: "PA-E2",
                title: "Laboratorio 2 - Autenticación y roles",
                dueDate: "2024-10-10",
                status: "Pendiente",
                grade: null,
            },
        ],
        boards: [
            {
                id: "PA-B1",
                title: "Tareas pendientes API",
                lastUpdate: "2024-09-08",
                url: "https://github.com/",
            },
        ],
    },
    {
        id: 3,
        name: "Bases de Datos",
        teacher: "María González",
        schedule: "2:00 pm a 4:30 pm",
        classroom: "Aula 303",
        image:
            "https://www.ymant.com/wp-content/uploads/2017/02/Base-de-Datos-YMANT.jpg.webp",
        projects: [
            {
                id: "BD-P1",
                title: "Modelo relacional GestTeam",
                description: "Diseño del esquema de BD para la plataforma GestTeam.",
                status: "Terminado",
                progress: 1,
                startDate: "2024-08-15",
                endDate: "2024-09-20",
            },
        ],
        deliveries: [
            {
                id: "BD-E1",
                title: "Entrega modelo E/R",
                dueDate: "2024-09-05",
                status: "Entregado",
                grade: 92,
            },
        ],
        boards: [
            {
                id: "BD-B1",
                title: "Tickets de cambios de esquema",
                lastUpdate: "2024-09-15",
                url: "https://jira.atlassian.com/",
            },
        ],
    },
];

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getMaterias() {
    await delay(300); 
    return materiasDB.map(({ projects, deliveries, boards, ...rest }) => rest);
}

export async function getMateriaById(id) {
    await delay(300);
    const materia = materiasDB.find((m) => m.id === Number(id));
    if (!materia) {
        throw new Error("Materia no encontrada");
    }
    return materia;
}
