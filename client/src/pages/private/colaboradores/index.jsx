// Roxy: lista de colaboraciones simulando BD

import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { Users, ArrowRightIcon, UsersRound, User } from "lucide-react";
import CardHeader from "../../../components/ui/cardHeader";
import {
  Container,
  CardContent,
  CardHeaders,
  CardImage,
  CollaboratorCard,
  CollaboratorsGrid,
  EnterButton,
  Name,
  ParticipantCircle,
  ParticipantsContainer,
  Role,
} from "../../../style/estudiante/colaborativoStyled";
import { useColors } from "../../../style/colors";
import { useNavigate } from "react-router-dom";
import { getColaboraciones } from "../../../data/colaboradoresService.jsx";

const Colaboradores = () => {
  const ColorCol = useColors();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [collaborators, setCollaborators] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getColaboraciones();
        setCollaborators(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las colaboraciones.");
      }
    };
    load();
  }, []);

  const filteredCollaborators = useMemo(() => {
    return collaborators.filter(
      (collaborator) =>
        collaborator.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        collaborator.role
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        collaborator.careers.some((career) =>
          career.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  }, [searchQuery, collaborators]);

  return (
    <Container>
      <CardHeader title="Colaboraciones" />
      {error && <p>{error}</p>}

      <CollaboratorsGrid>
        {filteredCollaborators.map((collaborator) => (
          <CollaboratorCard key={collaborator.id}>
            <CardHeaders>
              <CardImage
                src={collaborator.image}
                alt={`Imagen de ${collaborator.name}`}
              />
            </CardHeaders>
            <CardContent>
              <Name>{collaborator.role}</Name>
              <Role>{collaborator.name}</Role>

              {collaborator?.careers?.map((v, i) => (
                <Carrear key={i}>
                  <CarrearLabel>{v}</CarrearLabel>
                </Carrear>
              ))}

              <ParticipantsContainer>
                {collaborator.participants.slice(0, 3).map((participant, index) => (
                  <ParticipantCircle key={index}>
                    <img src={participant} alt="Participant" />
                  </ParticipantCircle>
                ))}
                {collaborator.participants.length > 3 && (
                  <ParticipantCircle>
                    +{collaborator.participants.length - 3}
                  </ParticipantCircle>
                )}
              </ParticipantsContainer>

              <EnterButton
                style={{ background: ColorCol.primary }}
                onClick={() =>
                  navigate(`/estudiante/colaboraciones/${collaborator.id}`)
                }
              >
                Entrar <ArrowRightIcon size={18} />
              </EnterButton>
            </CardContent>
          </CollaboratorCard>
        ))}
      </CollaboratorsGrid>
    </Container>
  );
};

export default Colaboradores;

const Carrear = styled.div`
  display: flex;
`;
const CarrearLabel = styled.h3`
  font-size: 14px;
  margin-right: 4px;
`;
