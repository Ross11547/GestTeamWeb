// Roxy: Pizarras simulando conexión a BD

import React, { useState, useEffect } from "react";
import { Plus, Users, User, UsersRound } from "lucide-react";
import ExcalidrawComponente from "../../../components/excalidraw";
import {
  BoardCard,
  BoardsGrid,
  CardDate,
  CardHeaders,
  CardTitle,
  CloseButton,
  Container,
  Header,
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  NewBoardButton,
  TabButton,
  TabsContainer,
  TabsList,
  FormGroup,
  FormActions,
} from "../../../style/estudiante/styledPizarra";
import { ROUTES } from "../../../enums/routes/Routes";
import { useNavigate } from "react-router-dom";
import CardHeader from "../../../components/ui/cardHeader";
import { useColors } from "../../../style/colors";
import {
  getBoards,
  getStudents,
  getFaculties,
  createBoard,
} from "../../../data/pizarraService.jsx";

const Pizarra = () => {
  const ColorsPi = useColors();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("individual");
  const [showModal, setShowModal] = useState(false);

  const [boardName, setBoardName] = useState("");
  const [boardType, setBoardType] = useState("individual");
  const [boardDate, setBoardDate] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedFaculties, setSelectedFaculties] = useState([]);

  const [students, setStudents] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [boards, setBoards] = useState({
    individual: [],
    grupal: [],
    colaborativo: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Cargar datos simulados de "BD"
  useEffect(() => {
    const loadData = async () => {
      try {
        const [boardsData, studentsData, facultiesData] = await Promise.all([
          getBoards(),
          getStudents(),
          getFaculties(),
        ]);

        setBoards(boardsData);
        setStudents(studentsData);
        setFaculties(facultiesData);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las pizarras.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleCreateBoard = async () => {
    try {
      const newBoardData = {
        name: boardName,
        type: boardType,
        date: boardDate,
        students: selectedStudents,
        faculties: selectedFaculties,
      };

      const created = await createBoard(newBoardData);

      setBoards((prev) => ({
        ...prev,
        [created.type]: [...(prev[created.type] || []), created],
      }));

      // limpiar...
      setBoardName("");
      setBoardType("individual");
      setBoardDate("");
      setSelectedStudents([]);
      setSelectedFaculties([]);
      setShowModal(false);

      navigate(ROUTES.EXCALIDRAW, { state: { boardId: created.id } });
    } catch (err) {
      console.error(err);
      setError("No se pudo crear la pizarra.");
    }
  };


  const getIcon = (type) => {
    switch (type) {
      case "individual":
        return <User size={20} color="#10B981" />;
      case "grupal":
        return <Users size={20} color="#b9b910" />;
      case "colaborativo":
        return <UsersRound size={20} color="#8B5CF6" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Container>
        <p>Cargando pizarras...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <p>{error}</p>
      </Container>
    );
  }

  return (
    <Container>
      <CardHeader title="Pizarras">
        <Header>
          <NewBoardButton
            style={{ background: ColorsPi.primary }}
            onClick={() => setShowModal(true)}
          >
            <Plus size={20} />
            Nueva Pizarra
          </NewBoardButton>
        </Header>
      </CardHeader>

      <TabsContainer>
        <TabsList>
          {["individual", "grupal", "colaborativo"].map((tab) => (
            <TabButton
              ColorsPi={ColorsPi}
              key={tab}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "individual" && <User size={16} />}
              {tab === "grupal" && <Users size={16} />}
              {tab === "colaborativo" && <UsersRound size={16} />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </TabButton>
          ))}
        </TabsList>

        <BoardsGrid>
          {(boards[activeTab] || []).map((board) => (
            <BoardCard
              key={board.id}
              onClick={() =>
                navigate(ROUTES.EXCALIDRAW, {
                  state: { boardId: board.id },
                })
              }
              style={{ cursor: "pointer" }}
            >
              <CardHeaders>
                <CardTitle>{board.title}</CardTitle>
                {getIcon(board.type)}
              </CardHeaders>
              <CardDate>
                Creada el: {new Date(board.date).toLocaleDateString("es-BO")}
              </CardDate>
            </BoardCard>
          ))}
        </BoardsGrid>


      </TabsContainer>

      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Nueva Pizarra</ModalTitle>
              <CloseButton onClick={() => setShowModal(false)}>
                &times;
              </CloseButton>
            </ModalHeader>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateBoard();
              }}
            >
              <FormGroup>
                <label htmlFor="boardName">Nombre de la Pizarra</label>
                <input
                  type="text"
                  id="boardName"
                  value={boardName}
                  onChange={(e) => setBoardName(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="boardType">Tipo</label>
                <select
                  id="boardType"
                  value={boardType}
                  onChange={(e) => setBoardType(e.target.value)}
                  required
                >
                  <option value="individual">Individual</option>
                  <option value="grupal">Grupal</option>
                  <option value="colaborativo">Colaborativo</option>
                </select>
              </FormGroup>

              {boardType === "grupal" && (
                <FormGroup>
                  <label htmlFor="students">Seleccionar Estudiantes</label>
                  <select
                    id="students"
                    multiple
                    value={selectedStudents}
                    onChange={(e) =>
                      setSelectedStudents(
                        Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        )
                      )
                    }
                  >
                    {students.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name}
                      </option>
                    ))}
                  </select>
                </FormGroup>
              )}

              {boardType === "colaborativo" && (
                <FormGroup>
                  <label htmlFor="faculties">
                    Seleccionar Otras Facultades
                  </label>
                  <select
                    id="faculties"
                    multiple
                    value={selectedFaculties}
                    onChange={(e) =>
                      setSelectedFaculties(
                        Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        )
                      )
                    }
                  >
                    {faculties.map((faculty) => (
                      <option key={faculty.id} value={faculty.id}>
                        {faculty.name}
                      </option>
                    ))}
                  </select>
                </FormGroup>
              )}

              <FormGroup>
                <label htmlFor="boardDate">Fecha</label>
                <input
                  type="date"
                  id="boardDate"
                  value={boardDate}
                  onChange={(e) => setBoardDate(e.target.value)}
                  required
                />
              </FormGroup>

              <FormActions>
                <button type="submit">Crear</button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
              </FormActions>
            </form>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default Pizarra;
