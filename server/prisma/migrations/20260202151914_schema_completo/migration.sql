-- CreateEnum
CREATE TYPE "TipoEvaluadorProyecto" AS ENUM ('DOCENTE', 'DIRECTOR', 'ADMIN', 'JURADO');

-- CreateEnum
CREATE TYPE "EstadoSolicitudAcceso" AS ENUM ('PENDIENTE', 'APROBADA', 'RECHAZADA', 'EXPIRADA');

-- CreateEnum
CREATE TYPE "TipoRecursoAcceso" AS ENUM ('DOCUMENTOS', 'CODIGO', 'AMBOS');

-- CreateEnum
CREATE TYPE "TipoReporte" AS ENUM ('DASHBOARD', 'AVANCE_SEMESTRE', 'TOP_PROYECTOS', 'PLAGIO_RESUMEN', 'DOCENTES_DESEMPENO');

-- CreateTable
CREATE TABLE "EvaluacionProyecto" (
    "id" SERIAL NOT NULL,
    "proyectoId" INTEGER NOT NULL,
    "periodoId" INTEGER,
    "evaluadorId" INTEGER NOT NULL,
    "tipoEvaluador" "TipoEvaluadorProyecto" NOT NULL,
    "puntaje" DOUBLE PRECISION NOT NULL,
    "comentario" TEXT DEFAULT '',
    "criteriosJson" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EvaluacionProyecto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProyectoDestacado" (
    "id" SERIAL NOT NULL,
    "proyectoId" INTEGER NOT NULL,
    "periodoId" INTEGER,
    "idFacultad" INTEGER,
    "idCarrera" INTEGER,
    "motivo" TEXT DEFAULT '',
    "orden" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProyectoDestacado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SolicitudAccesoProyecto" (
    "id" SERIAL NOT NULL,
    "proyectoId" INTEGER NOT NULL,
    "solicitanteId" INTEGER NOT NULL,
    "aprobadorId" INTEGER,
    "estado" "EstadoSolicitudAcceso" NOT NULL DEFAULT 'PENDIENTE',
    "tipo" "TipoRecursoAcceso" NOT NULL DEFAULT 'AMBOS',
    "motivo" TEXT DEFAULT '',
    "respuesta" TEXT DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "usuarioId" INTEGER,

    CONSTRAINT "SolicitudAccesoProyecto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReporteGenerado" (
    "id" SERIAL NOT NULL,
    "tipo" "TipoReporte" NOT NULL,
    "periodoId" INTEGER,
    "generadoPorId" INTEGER NOT NULL,
    "filtrosJson" JSONB,
    "resultadoJson" JSONB NOT NULL,
    "archivoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReporteGenerado_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EvaluacionProyecto_proyectoId_idx" ON "EvaluacionProyecto"("proyectoId");

-- CreateIndex
CREATE INDEX "EvaluacionProyecto_periodoId_idx" ON "EvaluacionProyecto"("periodoId");

-- CreateIndex
CREATE INDEX "EvaluacionProyecto_evaluadorId_idx" ON "EvaluacionProyecto"("evaluadorId");

-- CreateIndex
CREATE UNIQUE INDEX "ProyectoDestacado_proyectoId_key" ON "ProyectoDestacado"("proyectoId");

-- CreateIndex
CREATE INDEX "ProyectoDestacado_periodoId_idx" ON "ProyectoDestacado"("periodoId");

-- CreateIndex
CREATE INDEX "ProyectoDestacado_idFacultad_idx" ON "ProyectoDestacado"("idFacultad");

-- CreateIndex
CREATE INDEX "ProyectoDestacado_idCarrera_idx" ON "ProyectoDestacado"("idCarrera");

-- CreateIndex
CREATE INDEX "SolicitudAccesoProyecto_proyectoId_idx" ON "SolicitudAccesoProyecto"("proyectoId");

-- CreateIndex
CREATE INDEX "SolicitudAccesoProyecto_solicitanteId_idx" ON "SolicitudAccesoProyecto"("solicitanteId");

-- CreateIndex
CREATE INDEX "SolicitudAccesoProyecto_aprobadorId_idx" ON "SolicitudAccesoProyecto"("aprobadorId");

-- CreateIndex
CREATE INDEX "SolicitudAccesoProyecto_estado_idx" ON "SolicitudAccesoProyecto"("estado");

-- CreateIndex
CREATE INDEX "ReporteGenerado_tipo_idx" ON "ReporteGenerado"("tipo");

-- CreateIndex
CREATE INDEX "ReporteGenerado_periodoId_idx" ON "ReporteGenerado"("periodoId");

-- CreateIndex
CREATE INDEX "ReporteGenerado_generadoPorId_idx" ON "ReporteGenerado"("generadoPorId");

-- AddForeignKey
ALTER TABLE "EvaluacionProyecto" ADD CONSTRAINT "EvaluacionProyecto_proyectoId_fkey" FOREIGN KEY ("proyectoId") REFERENCES "Proyecto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluacionProyecto" ADD CONSTRAINT "EvaluacionProyecto_periodoId_fkey" FOREIGN KEY ("periodoId") REFERENCES "PeriodoAcademico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluacionProyecto" ADD CONSTRAINT "EvaluacionProyecto_evaluadorId_fkey" FOREIGN KEY ("evaluadorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProyectoDestacado" ADD CONSTRAINT "ProyectoDestacado_proyectoId_fkey" FOREIGN KEY ("proyectoId") REFERENCES "Proyecto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProyectoDestacado" ADD CONSTRAINT "ProyectoDestacado_periodoId_fkey" FOREIGN KEY ("periodoId") REFERENCES "PeriodoAcademico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProyectoDestacado" ADD CONSTRAINT "ProyectoDestacado_idFacultad_fkey" FOREIGN KEY ("idFacultad") REFERENCES "Facultad"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProyectoDestacado" ADD CONSTRAINT "ProyectoDestacado_idCarrera_fkey" FOREIGN KEY ("idCarrera") REFERENCES "Carrera"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolicitudAccesoProyecto" ADD CONSTRAINT "SolicitudAccesoProyecto_proyectoId_fkey" FOREIGN KEY ("proyectoId") REFERENCES "Proyecto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolicitudAccesoProyecto" ADD CONSTRAINT "SolicitudAccesoProyecto_solicitanteId_fkey" FOREIGN KEY ("solicitanteId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolicitudAccesoProyecto" ADD CONSTRAINT "SolicitudAccesoProyecto_aprobadorId_fkey" FOREIGN KEY ("aprobadorId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolicitudAccesoProyecto" ADD CONSTRAINT "SolicitudAccesoProyecto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReporteGenerado" ADD CONSTRAINT "ReporteGenerado_periodoId_fkey" FOREIGN KEY ("periodoId") REFERENCES "PeriodoAcademico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReporteGenerado" ADD CONSTRAINT "ReporteGenerado_generadoPorId_fkey" FOREIGN KEY ("generadoPorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
