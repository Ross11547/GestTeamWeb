
let boardsDB = {
    individual: [
        { id: 1, title: "Mi primera pizarra", date: "2024-02-01", type: "individual" },
        { id: 2, title: "Notas personales", date: "2024-02-05", type: "individual" },
    ],
    grupal: [
        { id: 3, title: "Proyecto Equipo A", date: "2024-02-03", type: "grupal" },
        { id: 4, title: "Lluvia de ideas", date: "2024-02-06", type: "grupal" },
    ],
    colaborativo: [
        { id: 5, title: "Workshop Design", date: "2024-02-04", type: "colaborativo" },
        { id: 6, title: "Planificación Q1", date: "2024-02-07", type: "colaborativo" },
    ],
};

const studentsDB = [
    { id: "stu-1", name: "Juan Pérez" },
    { id: "stu-2", name: "María López" },
    { id: "stu-3", name: "Carlos García" },
];

const facultiesDB = [
    { id: "fac-1", name: "Ingeniería de Sistemas" },
    { id: "fac-2", name: "Ingeniería Comercial" },
    { id: "fac-3", name: "Psicología" },
];

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getBoards() {
    await delay(200);
    return JSON.parse(JSON.stringify(boardsDB));
}

export async function createBoard(board) {
    await delay(200);
    const newId =
        Math.max(
            ...Object.values(boardsDB)
                .flat()
                .map((b) => b.id),
            0
        ) + 1;

    const newBoard = {
        id: newId,
        title: board.name,
        date: board.date,
        type: board.type,
        students: board.students || [],
        faculties: board.faculties || [],
    };

    if (!boardsDB[board.type]) {
        boardsDB[board.type] = [];
    }
    boardsDB[board.type].push(newBoard);

    return newBoard;
}

export async function getStudents() {
    await delay(200);
    return JSON.parse(JSON.stringify(studentsDB));
}

export async function getFaculties() {
    await delay(200);
    return JSON.parse(JSON.stringify(facultiesDB));
}
