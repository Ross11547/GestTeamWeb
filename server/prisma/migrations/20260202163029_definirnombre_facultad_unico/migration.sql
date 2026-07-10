-- DropIndex
DROP INDEX "Facultad_institucionId_idx";

-- CreateIndex
CREATE INDEX "Facultad_institucionId_nombre_idx" ON "Facultad"("institucionId", "nombre");
