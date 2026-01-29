import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./enums/routes/Routes.js";
import Inicio from "./pages/private/inicio/index.jsx";
import Materia from "./pages/private/materias/index.jsx";
import Colaboracion from "./pages/private/colaboradores/index.jsx";
import Pizarra from "./pages/private/pizarra/index.jsx";
import Login from "./pages/public/login.jsx";
import Layout from "./pages/private/layout.jsx";
import Excalidraw from "./pages/private/excalidraw/index.jsx";
import Notificacion from "./pages/private/notificaciones/index.jsx";
import CalendarioUni from "./pages/private/calendario/index.jsx";
import { useUser } from "./context/useContext.jsx";
import Docente from "./pages/admin/docente/index.jsx";
import Directores from "./pages/admin/directores/index.jsx";
import Facultades from "./pages/admin/facultades/index.jsx";
import Alumno from "./pages/admin/alumno/index.jsx";
import Dashboard from "./pages/admin/dashboard/index.jsx";
import Proyecto from "./pages/private/proyecto/index.jsx";
import ProyectoUno from "./pages/private/proyecto/index1.jsx";
import LayoutI from "./pages/public/layout.jsx";
import Contacto from "./pages/public/contacto.jsx";
import Home from "./pages/public/home.jsx";
import PlagioIA from "./pages/docente/plagio/index.jsx";
import Caracteristicas from "./pages/public/caracteristicas.jsx";
import Plataformas from "./pages/public/plataformas.jsx";
import CentroAyuda from "./pages/public/centroAyuda.jsx";
import CarrerasCRUD from "./pages/admin/carreras/index.jsx";
import SemestreCRUD from "./pages/admin/semestres/index.jsx";
import MateriasCRUD from "./pages/admin/materiasCrud/index.jsx";
import GeneralInformacion from "./pages/admin/general/index.jsx";
import HorariosCRUD from "./pages/admin/horarios/index.jsx";
import DashboardD from "./pages/docente/dashboardD/index.jsx";
import EntregasD from "./pages/docente/entregasD/index.jsx";
import MateriasD from "./pages/docente/materiasD/index.jsx";
import ColaboracionD from "./pages/docente/colaboracionD/index.jsx";
import RevisionD from "./pages/docente/revisionD/index.jsx";
import RubricasD from "./pages/docente/rubricasD/index.jsx";
import NotificacionesD from "./pages/docente/notificacionesD/index.jsx";
import HorariosD from "./pages/docente/horariosD/inde.jsx";
import RecursosD from "./pages/docente/recursos.D/index.jsx";
import CalendarioD from "./pages/docente/calendarioD/index.jsx";
import EventosD from "./pages/docente/eventosD/index.jsx";
import TareasD from "./pages/docente/tareasD/index.jsx";
import DashboardDi from "./pages/director/dashboardDi/index.jsx";
import ReportesDi from "./pages/director/reportesDi/index.jsx";
import MateriasDi from "./pages/director/materiasDi/index.jsx";
import EntregasDi from "./pages/director/entregasDi/index.jsx";
import RevisionDi from "./pages/director/revisionDi/index.jsx";
import RubricasDi from "./pages/director/rubricasDi/index.jsx";
import CalendarioDi from "./pages/director/calendarioDi/index.jsx";
import EventosDi from "./pages/director/eventosDi/index.jsx";
import TareasDi from "./pages/director/tareasDi/index.jsx";
import NotificacionesDi from "./pages/director/notificacionesDi/index.jsx";
import RecursosDi from "./pages/director/recursos.Di/index.jsx";
import HorarioDi from "./pages/director/horariosDi/inde.jsx";
import MateriaDetalle from "./pages/private/materias/materiaDetalle.jsx";
import ColaboracionDetalle from "./pages/private/colaboradores/colaboracionDetalle.jsx";

const AppRoutes = () => {
  const { user } = useUser();
  return (
    <>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.PRINCIPAL} element={<LayoutI />}>
          <Route path={ROUTES.PRINCIPAL} element={<Home />} />
          <Route path={ROUTES.CARACTERISTICAS} element={<Caracteristicas />} />
          <Route path={ROUTES.PLATAFORMAS} element={<Plataformas />} />
          <Route path={ROUTES.CONTACTO} element={<Contacto />} />
          <Route path={ROUTES.CENTROAYUDA} element={<CentroAyuda />} />
        </Route>

        {user?.rol === "Admin" ? (
          <Route path={ROUTES.ADMIN} element={<Layout />}>
            <Route path={ROUTES.DASHBOARDADMIN} element={<Dashboard />} />
            <Route path={ROUTES.DOCENTE} element={<Docente />} />
            <Route path={ROUTES.DIRECTOCARRERA} element={<Directores />} />
            <Route path={ROUTES.FACULTAD} element={<Facultades />} />
            <Route path={ROUTES.CARRERA} element={<CarrerasCRUD />} />
            <Route path={ROUTES.SEMESTRE} element={<SemestreCRUD />} />
            <Route path={ROUTES.MATERIAS} element={<MateriasCRUD />} />
            <Route path={ROUTES.HORARIO} element={<HorariosCRUD />} />
            <Route path={ROUTES.USUARIO} element={<Alumno />} />
            <Route path={ROUTES.GENERAL} element={<GeneralInformacion />} />
          </Route>
        ) : user?.rol === "Director" ? (
          <Route path={ROUTES.DIRECTOR} element={<Layout />}>
            <Route path={ROUTES.DASHBOARDDI} element={<DashboardDi />} />
            <Route path={ROUTES.REPORTESDI} element={<ReportesDi />} />
            <Route path={ROUTES.MISMATERIASDI} element={<MateriasDi />} />
            <Route path={ROUTES.ENTREGASDI} element={<EntregasDi />} />
            <Route path={ROUTES.REVISIONDI} element={<RevisionDi />} />
            <Route path={ROUTES.RUBRICASDI} element={<RubricasDi />} />
            <Route path={ROUTES.CALENDARIODI} element={<CalendarioDi />} />
            <Route path={ROUTES.EVENTOSDI} element={<EventosDi />} />
            <Route path={ROUTES.TAREASDI} element={<TareasDi />} />
            <Route path={ROUTES.NOTIFICACIONESDI} element={<NotificacionesDi />} />
            <Route path={ROUTES.PLAGIODI} element={<PlagioIA />} />
            <Route path={ROUTES.COLABORACIONESDI} element={<Colaboracion />} />
            <Route path={ROUTES.HORARIODI} element={<HorarioDi />} />
            <Route path={ROUTES.RECURSODI} element={<RecursosDi />} />
            <Route path={ROUTES.PIZARRADI} element={<Pizarra />} />
            <Route path={ROUTES.EXCALIDRAWDI} element={<Excalidraw />} />
          </Route>
        ) : user?.rol === "Docente" ? (
          <Route path={ROUTES.DOCENTES} element={<Layout />}>
            <Route path={ROUTES.DASHBOARDDOCENTE} element={<DashboardD />} />
            <Route path={ROUTES.MISMATERIAS} element={<MateriasD />} />
            <Route path={ROUTES.ENTREGAS} element={<EntregasD />} />
            <Route path={ROUTES.REVISION} element={<RevisionD />} />
            <Route path={ROUTES.RUBRICAS} element={<RubricasD />} />
            <Route path={ROUTES.CALENDARIODOC} element={<CalendarioD />} />
            <Route path={ROUTES.EVENTOS} element={<EventosD />} />
            <Route path={ROUTES.TAREAS} element={<TareasD />} />
            <Route path={ROUTES.NOTIFICACIONESDOC} element={<NotificacionesD />} />
            <Route path={ROUTES.PLAGIO} element={<PlagioIA />} />
            <Route path={ROUTES.COLABORACIONES} element={<Colaboracion />} />
            <Route path={ROUTES.HORARIODOC} element={<HorariosD />} />
            <Route path={ROUTES.RECURSOS} element={<RecursosD />} />
            <Route path={ROUTES.PIZARRADOC} element={<Pizarra />} />
            <Route path={ROUTES.EXCALIDRAWDOC} element={<Excalidraw />} />

          </Route>
        ) : (
          <Route path={ROUTES.ESTUDIANTE} element={<Layout />}>
            <Route path={ROUTES.DASHBOARD} element={<Inicio />} />
            <Route path={ROUTES.MATERIA} element={<Materia />} />
            <Route path={ROUTES.MATERIADETALLE} element={<MateriaDetalle />} />
            <Route path={ROUTES.COLABORACION} element={<Colaboracion />} />
            <Route path={ROUTES.COLABORACIONDETALLE} element={<ColaboracionDetalle />} />
            <Route path={ROUTES.NOTIFICACION} element={<Notificacion />} />
            <Route path={ROUTES.PIZARRA} element={<Pizarra />} />
            <Route path={ROUTES.EXCALIDRAW} element={<Excalidraw />} />
            <Route path={ROUTES.CALENDARIOU} element={<CalendarioUni />} />
            {user?.facultad?.nombre === "Ingeniería de Sistemas" ? (
              <Route path={ROUTES.PROYECTO} element={<ProyectoUno />} />
            ) : (
              <Route path={ROUTES.PROYECTO} element={<Proyecto />} />
            )}
          </Route>
        )}
      </Routes>
    </>
  );
};

export default AppRoutes;
