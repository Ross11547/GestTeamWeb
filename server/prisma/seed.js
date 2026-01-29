import {
    Prisma,
    PrismaClient
} from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
    console.log("Seeding database");
    await prisma.rol.createMany({
        data: [{
                nombre: "Admin"
            },
            {
                nombre: "Estudiante"
            },
            {
                nombre: "Director"
            },
            {
                nombre: "Docente"
            }
        ]
    })
    console.log("Roles creados.");

    await prisma.facultad.createMany({
        data: [{
                nombre: "Ingeniería de Sistemas",
                theme: {
                    primary: "#fcbf49",
                    primary100: "#FFDE59",
                    primary200: "#FFE680",
                    primary300: "#FFD700",
                    primary800: "#F8E061ff",
                    primary900: "#ffc107",
                    primary400: "#E6B800",
                    primary500: "#CC9A00",
                    primary600: "#B38600",
                    primary700: "#996F00"
                },
            },
            {
                nombre: "Ciencias de la Salud",
                theme: {
                    primary: "#007bff",
                    primary100: "#66b2ff",
                    primary200: "#99ccff",
                    primary300: "#cce5ff",
                    primary800: "#0056b3",
                    primary900: "#004080",
                    primary400: "#3399ff",
                    primary500: "#267fdd",
                    primary600: "#1a66bb",
                    primary700: "#0d4d99"
                },
            },
        ],
    });
    console.log("Facultades creadas.");
    await prisma.usuario.createMany({
        data: [{
                nombre: "Admin",
                apellido: "Pérez",
                telefono: "123456789",
                ci: 9876543,
                correo: "admin.sa@unifranz.edu.bo",
                password: "123456",
                idRol: 1,
                idFacultad:1,
                activo: true
            },
            {
                nombre: "Rossana",
                apellido: "Trujillo",
                telefono: "63986377",
                ci: 9876543,
                correo: "cbbe.rossanaangela.trujillo.sa@unifranz.edu.bo",
                password: "Z20Xd#efb0",
                idRol: 2,
                idFacultad:1,
                activo: true
            },
            {
                nombre: "Miguel",
                apellido: "Pérez",
                telefono: "123456789",
                ci: 9876543,
                correo: "estudianteMed.sa@unifranz.edu.bo",
                password: "123456",
                idRol: 2,
                idFacultad:2,
                activo: true
            }
        ],
    });
    console.log("Usuarios creados.");

    console.log("Seeding completado!");
}

main()
    .catch((e) => {
        console.error("Error seeding database", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });