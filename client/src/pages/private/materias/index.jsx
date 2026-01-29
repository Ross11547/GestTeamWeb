// Roxy: vista "Mis materias" simulando conexión a BD

import React, { useState, useMemo, useEffect } from "react";
import {
  SubjectsGrid,
  Container,
  ImageContainer,
  SubjectCard,
  SubjectContent,
  SubjectDetail,
  SubjectImage,
  SubjectTitle,
  TableContainer,
  H1Division,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableHeaderRow,
  TableRow,
  TableStyled,
  ProfileUser,
  ImgProfile,
  Divlabel,
  LabelUser,
  TableCont,
} from "../../../style/estudiante/materiasStyled";
import CardHeader from "../../../components/ui/cardHeader";
import Director from "../../../assets/img/perfilUser1.webp";
import { useColors } from "../../../style/colors";
import { useNavigate } from "react-router-dom";
import { getMaterias } from "../../../data/materiaDetalle.jsx";

const Materias = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const ColorsMa = useColors();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const data = await getMaterias();
        setSubjects(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar tus materias.");
      } finally {
        setLoading(false);
      }
    };

    fetchMaterias();
  }, []);

  const filteredSubjects = useMemo(() => {
    return subjects.filter(
      (subject) =>
        subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.teacher.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, subjects]);

  // Tabla de evaluaciones (puede quedarse hardcodeada o moverla también al servicio)
  const data = [
    {
      asignatura: "INGENIERÍA DE SISTEMAS",
      dia: "VIE",
      hito1: "09/08/2024",
      hito2: "06/09/2024",
      hito3: "25/10/2024",
      hito4: "22/11/2024",
      hito5: "20/12/2024",
    },
    {
      asignatura: "INGENIERÍA DE SOFTWARE I",
      dia: "MIE",
      hito1: "07/08/2024",
      hito2: "04/09/2024",
      hito3: "16/10/2024",
      hito4: "20/11/2024",
      hito5: "18/12/2024",
    },
    {
      asignatura: "PROGRAMACION AVANZADA",
      dia: "JUE",
      hito1: "08/08/2024",
      hito2: "12/09/2024",
      hito3: "17/10/2024",
      hito4: "21/11/2024",
      hito5: "19/12/2024",
    },
    {
      asignatura: "PREPARACION Y EVALUACION DE PROYECTOS",
      dia: "MAR",
      hito1: "13/08/2024",
      hito2: "03/09/2024",
      hito3: "22/10/2024",
      hito4: "26/11/2024",
      hito5: "17/12/2024",
    },
    {
      asignatura: "PROYECTO INTEGRADOR INTERMEDIO I",
      dia: "LUN",
      hito1: "12/08/2024",
      hito2: "02/09/2024",
      hito3: "21/10/2024",
      hito4: "25/11/2024",
      hito5: "21/12/2024",
    },
    {
      asignatura: "SISTEMAS DE COMUNICACIONES",
      dia: "VIE",
      hito1: "09/08/2024",
      hito2: "13/09/2024",
      hito3: "18/10/2024",
      hito4: "22/11/2024",
      hito5: "13/12/2024",
    },
    {
      asignatura: "SISTEMAS DIGITALES",
      dia: "JUE",
      hito1: "08/08/2024",
      hito2: "05/09/2024",
      hito3: "24/10/2024",
      hito4: "21/11/2024",
      hito5: "19/12/2024",
    },
    {
      asignatura: "SISTEMAS OPERATIVOS MOVILES Y EMBEBIDOS",
      dia: "MAR",
      hito1: "13/08/2024",
      hito2: "10/09/2024",
      hito3: "15/10/2024",
      hito4: "19/11/2024",
      hito5: "17/12/2024",
    },
  ];

  return (
    <Container>
      <CardHeader ColorsMa={ColorsMa} title="Mis materias">
        <ProfileUser>
          <ImgProfile src={Director} alt="Directora de carrera" />
          <Divlabel>
            <LabelUser>
              <strong>Nombre</strong>
              Ingeniera fabiola cadima
            </LabelUser>
            <LabelUser>
              <strong>Telefono</strong>
              +591 68984585
            </LabelUser>
            <LabelUser>
              <strong>Correo</strong>
              cbbe.fabiola.cadima@unifranz.doc.bo
            </LabelUser>
          </Divlabel>
        </ProfileUser>
      </CardHeader>

      {/* Si tienes un input de búsqueda en CardHeader podrías pasar setSearchQuery como prop, 
          aquí lo dejo simple */}
      {loading && <p>Cargando materias...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <>
          <H1Division style={{ background: ColorsMa.primary }}>Materias</H1Division>
          <SubjectsGrid>
            {filteredSubjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate(`/estudiante/materiadetalle/${subject.id}`)
                }
              >
                <ImageContainer>
                  <SubjectImage
                    src={subject.image}
                    alt={`Imagen de ${subject.name}`}
                  />
                </ImageContainer>
                <SubjectContent>
                  <SubjectTitle>{subject.name}</SubjectTitle>
                  <SubjectDetail>Prof. {subject.teacher}</SubjectDetail>
                  <SubjectDetail>{subject.schedule}</SubjectDetail>
                  <SubjectDetail>{subject.classroom}</SubjectDetail>
                </SubjectContent>
              </SubjectCard>
            ))}
          </SubjectsGrid>

          <H1Division style={{ background: ColorsMa.primary }}>
            Evaluaciones
          </H1Division>
          <TableCont>
            <TableContainer>
              <TableStyled>
                <TableHeader>
                  <TableHeaderRow>
                    <TableHeaderCell style={{ background: ColorsMa.primary }}>
                      ASIGNATURA
                    </TableHeaderCell>
                    <TableHeaderCell style={{ background: ColorsMa.primary }}>
                      DÍA
                    </TableHeaderCell>
                    <TableHeaderCell style={{ background: ColorsMa.primary }}>
                      HITO 1
                    </TableHeaderCell>
                    <TableHeaderCell style={{ background: ColorsMa.primary }}>
                      HITO 2
                    </TableHeaderCell>
                    <TableHeaderCell style={{ background: ColorsMa.primary }}>
                      HITO 3
                    </TableHeaderCell>
                    <TableHeaderCell style={{ background: ColorsMa.primary }}>
                      HITO 4
                    </TableHeaderCell>
                    <TableHeaderCell style={{ background: ColorsMa.primary }}>
                      HITO 5
                    </TableHeaderCell>
                  </TableHeaderRow>
                </TableHeader>
                <tbody>
                  {data.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.asignatura}</TableCell>
                      <TableCell>{item.dia}</TableCell>
                      <TableCell>{item.hito1}</TableCell>
                      <TableCell>{item.hito2}</TableCell>
                      <TableCell>{item.hito3}</TableCell>
                      <TableCell>{item.hito4}</TableCell>
                      <TableCell>{item.hito5}</TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </TableStyled>
            </TableContainer>
          </TableCont>
        </>
      )}
    </Container>
  );
};

export default Materias;
