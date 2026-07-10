import { Router } from "express";
import { resumenDashboard, crecimientoEstudiantes } from "../controllers/dashboard.controller.js";

const router = Router();

router.get("/dashboard/summary", resumenDashboard);
router.get("/dashboard/student-growth", crecimientoEstudiantes);

export default router;
