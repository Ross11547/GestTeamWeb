-- CreateEnum
CREATE TYPE "RolColaboradorPizarra" AS ENUM ('OWNER', 'EDITOR', 'VIEWER');

-- CreateTable
CREATE TABLE "Pizarra" (
    "id" SERIAL NOT NULL,
    "proyectoId" INTEGER NOT NULL,
    "equipoId" INTEGER,
    "periodoId" INTEGER,
    "nombre" TEXT NOT NULL,
    "dataJson" JSONB NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "creadoPorId" INTEGER NOT NULL,
    "esPublica" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pizarra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PizarraColaborador" (
    "id" SERIAL NOT NULL,
    "pizarraId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "rol" "RolColaboradorPizarra" NOT NULL DEFAULT 'EDITOR',
    "agregadoPorId" INTEGER,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PizarraColaborador_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Pizarra_proyectoId_idx" ON "Pizarra"("proyectoId");

-- CreateIndex
CREATE INDEX "Pizarra_equipoId_idx" ON "Pizarra"("equipoId");

-- CreateIndex
CREATE INDEX "Pizarra_periodoId_idx" ON "Pizarra"("periodoId");

-- CreateIndex
CREATE INDEX "Pizarra_creadoPorId_idx" ON "Pizarra"("creadoPorId");

-- CreateIndex
CREATE INDEX "Pizarra_createdAt_idx" ON "Pizarra"("createdAt");

-- CreateIndex
CREATE INDEX "PizarraColaborador_usuarioId_idx" ON "PizarraColaborador"("usuarioId");

-- CreateIndex
CREATE INDEX "PizarraColaborador_pizarraId_idx" ON "PizarraColaborador"("pizarraId");

-- CreateIndex
CREATE UNIQUE INDEX "PizarraColaborador_pizarraId_usuarioId_key" ON "PizarraColaborador"("pizarraId", "usuarioId");

-- AddForeignKey
ALTER TABLE "Pizarra" ADD CONSTRAINT "Pizarra_proyectoId_fkey" FOREIGN KEY ("proyectoId") REFERENCES "Proyecto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pizarra" ADD CONSTRAINT "Pizarra_equipoId_fkey" FOREIGN KEY ("equipoId") REFERENCES "Equipo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pizarra" ADD CONSTRAINT "Pizarra_periodoId_fkey" FOREIGN KEY ("periodoId") REFERENCES "PeriodoAcademico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pizarra" ADD CONSTRAINT "Pizarra_creadoPorId_fkey" FOREIGN KEY ("creadoPorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PizarraColaborador" ADD CONSTRAINT "PizarraColaborador_pizarraId_fkey" FOREIGN KEY ("pizarraId") REFERENCES "Pizarra"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PizarraColaborador" ADD CONSTRAINT "PizarraColaborador_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PizarraColaborador" ADD CONSTRAINT "PizarraColaborador_agregadoPorId_fkey" FOREIGN KEY ("agregadoPorId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
