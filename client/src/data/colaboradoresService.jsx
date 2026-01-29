// Roxy: BD falsa para colaboraciones

const colaboracionesDB = [
    {
        id: 1,
        name: "Maria Rene",
        role: "Heladeria Flavor burst",
        tipo: "Privado",
        careers: ["Ingeniería Comercial", "Sistemas"],
        image:
            "https://static.vecteezy.com/system/resources/previews/001/961/501/large_2x/various-of-ice-cream-flavor-free-photo.jpg",
        participants: [
            "https://randomuser.me/api/portraits/women/1.jpg",
            "https://randomuser.me/api/portraits/men/2.jpg",
            "https://randomuser.me/api/portraits/women/3.jpg",
        ],
        faculties: [
            {
                id: "fac-icom",
                name: "Ingeniería Comercial",
                careers: ["Ingeniería Comercial"],
                students: [
                    { id: "stu-1", name: "Ana Rivas", career: "Ingeniería Comercial" },
                    { id: "stu-2", name: "Luis Ortega", career: "Ingeniería Comercial" },
                ],
            },
            {
                id: "fac-sis",
                name: "Ingeniería de Sistemas",
                careers: ["Ingeniería de Sistemas"],
                students: [
                    { id: "stu-3", name: "Juan Pérez", career: "Ingeniería de Sistemas" },
                ],
            },
        ],
        boards: [
            {
                id: "B-FLA-1",
                title: "Pizarra de branding",
                type: "colaborativo",
                lastUpdate: "2024-09-10",
            },
            {
                id: "B-FLA-2",
                title: "Flujos del local",
                type: "grupal",
                lastUpdate: "2024-09-18",
            },
        ],
        documents: [
            {
                id: "DOC-FLA-1",
                title: "Brief del cliente",
                type: "PDF",
                status: "Aprobado",
                url: "/docs/brief-flavor-burst.pdf", // archivo dentro de public/docs
            },
            {
                id: "DOC-FLA-2",
                title: "Propuesta de mejora",
                type: "PDF",
                status: "En revisión",
                url: "/docs/propuesta-mejora.pdf",
            },
        ]
        ,
        progress: 0.65,
        tasks: [
            { id: "T1", title: "Definir sabores principales", status: "Completo" },
            { id: "T2", title: "Diseñar flujo de atención", status: "En progreso" },
            { id: "T3", title: "Probar panel de control", status: "Pendiente" },
        ],
    },
    {
        id: 2,
        name: "Richard Torrico",
        role: "Juego carreras",
        tipo: "Publico",
        careers: ["Diseño gráfico", "Sistemas"],
        image:
            "https://dinorank.com/img/dinobrain/40201/imagen8bcea1cbac00982d05796412ddcf2fb5.jpg",
        participants: [
            "https://randomuser.me/api/portraits/women/4.jpg",
            "https://randomuser.me/api/portraits/men/5.jpg",
            "https://randomuser.me/api/portraits/women/6.jpg",
        ],
        faculties: [
            {
                id: "fac-dis",
                name: "Diseño Gráfico",
                careers: ["Diseño Gráfico"],
                students: [
                    { id: "stu-4", name: "Carla Gutiérrez", career: "Diseño Gráfico" },
                ],
            },
            {
                id: "fac-sis",
                name: "Ingeniería de Sistemas",
                careers: ["Ingeniería de Sistemas"],
                students: [
                    { id: "stu-5", name: "Diego Castro", career: "Ingeniería de Sistemas" },
                ],
            },
        ],
        boards: [
            {
                id: "B-JUE-1",
                title: "Ideas de niveles",
                type: "grupal",
                lastUpdate: "2024-09-12",
            },
        ],
        documents: [
            {
                id: "DOC-JUE-1",
                title: "GDD (Game Design Document)",
                type: "PDF",
                status: "Aprobado",
                url: "#",
            },
        ],
        progress: 0.4,
        tasks: [
            { id: "T1", title: "Definir mecánicas base", status: "Completo" },
            { id: "T2", title: "Diseñar HUD", status: "En progreso" },
            { id: "T3", title: "Implementar ranking online", status: "Pendiente" },
        ],
    },
    {
        id: 3,
        name: "Yblin Vargas",
        role: "Integrador II",
        tipo: "Colaborativo",
        careers: ["Sistemas", "Ingeniería de sistemas"],
        image:
            "https://colombia.unir.net/wp-content/uploads/sites/4/2021/07/business-team-connect-pieces-of-gears-teamwork-partnership-and-picture-id1203832818.jpg",
        participants: [
            "https://randomuser.me/api/portraits/women/7.jpg",
            "https://randomuser.me/api/portraits/men/8.jpg",
            "https://randomuser.me/api/portraits/women/9.jpg",
        ],
        faculties: [
            {
                id: "fac-sis",
                name: "Ingeniería de Sistemas",
                careers: ["Ingeniería de Sistemas"],
                students: [
                    { id: "stu-6", name: "Juan Rivera", career: "Ingeniería de Sistemas" },
                    { id: "stu-7", name: "Pedro Molina", career: "Ingeniería de Sistemas" },
                ],
            },
        ],
        boards: [
            {
                id: "B-INT-1",
                title: "Tablero general Integrador II",
                type: "colaborativo",
                lastUpdate: "2024-09-20",
            },
        ],
        documents: [
            {
                id: "DOC-INT-1",
                title: "Lineamientos del integrador",
                type: "PDF",
                status: "Aprobado",
                url: "#",
            },
        ],
        progress: 0.8,
        tasks: [
            { id: "T1", title: "Definir entregables por equipo", status: "Completo" },
            { id: "T2", title: "Unificar rúbricas", status: "En progreso" },
            { id: "T3", title: "Configurar ferias", status: "Pendiente" },
        ],
    },
];

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getColaboraciones() {
    await delay(200);
    // lista básica para tarjetas
    return colaboracionesDB.map(
        ({ faculties, boards, documents, progress, tasks, ...rest }) => rest
    );
}

export async function getColaboracionById(id) {
    await delay(200);
    const colab = colaboracionesDB.find((c) => c.id === Number(id));
    if (!colab) throw new Error("Colaboración no encontrada");
    return colab;
}
