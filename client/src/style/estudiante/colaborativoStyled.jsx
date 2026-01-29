import styled, { keyframes } from "styled-components";
import { ColorsEstu } from "../colors";

export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  width: 100%;
  padding: 1rem;
`;

export const CollaboratorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

export const CollaboratorCard = styled.div`
  height: 360px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 0.6s ease forwards;
  position: relative;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
`;

export const CardHeaders = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(20%) brightness(90%);
  transition: transform 0.4s ease;

  ${CollaboratorCard}:hover & {
    transform: scale(1.05);
  }
`;

export const CardContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Name = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  text-align: center;
`;

export const Role = styled.p`
  color: #6b7280;
  font-size: 1rem;
  margin-bottom: 0.75rem;
  text-align: center;
`;

export const ParticipantsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const ParticipantCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e0e0e0;
  border: 2px solid white;
  margin: 0 -10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const EnterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${ColorsEstu.primary};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${ColorsEstu.primary100};
    transform: translateX(5px);
  }
`;
