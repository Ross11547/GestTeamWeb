import styled from "styled-components";
import { Colors,ColorsEstu } from "../colors";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 1rem;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  height: 120px;
  color: #fff;
  background:${(props) => props.ColorsMed.primary};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  position: relative;
`;

export const SearchBar = styled.input`
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 30px;
  width: 300px;
  font-size: 1rem;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
    width: 320px;
  }
`;

export const TabList = styled.div`
  display: flex;
  gap: 1rem;
  padding-top: 10px;
  overflow-x: auto;
  padding-bottom: 0.5rem;
`;

export const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  background: ${(props) => (props.active ? props.ColorsMed.primary : "white")};
  color: ${(props) => (props.active ? "white" : "#333")};
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    //background: ${(props) => (props.active ? "#FFDE59" : "#FFCC00")};
    transform: translateY(-2px);
    color: ${(props) => (props.active ? "#fff" : props.ColorsMed.primary)};
  }
`;

export const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

export const ProjectCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    transform: translateY(-5px);
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.12);
  }
`;

export const ProjectType = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  background: #ffde59;
  color: #333;
  display: inline-block;
  margin-bottom: 0.75rem;
  font-weight: 600;
`;

export const Rating = styled.div`
  color: #ffcc00;
  margin-bottom: 0.75rem;
`;

export const ProjectTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #333;
  font-weight: 700;
`;

export const ProjectInfo = styled.div`
  font-size: 0.875rem;
  color: #666;

  > div {
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
  }
`;

export const Label = styled.span`
  font-weight: 600;
  color: #333;
  margin-right: 0.5rem;
  min-width: 80px;
`;

export const IconWrapper = styled.span`
  margin-right: 0.5rem;
  display: inline-flex;
  align-items: center;
  color: ${(props) => props.ColorsMed.primary100};
`;

export const ProyectosGrid = styled.div`
  width: 100%;
  height: 545px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 10px 0;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ProyectoCard = styled.div`
  width: 100%;
  height: 355px;
  background: ${Colors.white};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  }
`;

export const ProyectoImagen = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
`;

export const ProyectoContent = styled.div`
  padding: 12px;
`;

export const ProyectoTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  color: ${Colors.black};
`;

export const TipoProyecto = styled.div`
  width: 110px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 13px;
  font-size: 11px;
  font-weight: bold;

  ${(props) => {
    switch (props.tipo) {
      case "Individual":
        return "background-color: #dbeafe; color: #1d4ed8;";
      case "Grupal":
        return "background-color: #dcfce7; color: #15803d;";
      default:
        return "background-color: #f3e8ff; color: #7e22ce;";
    }
  }}
`;

export const InfoGrid = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin: 10px 0;
`;

export const InfoBox = styled.div`
  width: calc(50% - 5px);
  height: 90px;
  background: ${(props) =>
    props.type === "materia" ? props.ColorsMed.primary : Colors.white};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  padding: 10px;

  h3 {
    color: ${(props) =>
      props.type === "materia" ? Colors.white : Colors.gray200};
    font-weight: bold;
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  p {
    padding-top: 4px;
    color: ${(props) =>
      props.type === "materia" ? Colors.white : Colors.gray200};
    font-size: 11px;
    text-align: center;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-top: 4px;
    font-size: 11px;
    list-style: none;
    color: ${(props) =>
      props.type === "materia" ? Colors.white : Colors.gray200};
  }
`;

export const DocentesSection = styled.div`
  width: 100%;
  margin-top: 10px;

  h3 {
    color: ${Colors.gray200};
    font-weight: bold;
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

export const DocentesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

export const DocenteTag = styled.div`
  padding: 8px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${Colors.white};
  color: ${Colors.black};
  border-radius: 10px;
  font-size: 11px;
`;

export const ProyectoTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

export const StarsRow = styled.div`
  display: flex;
  gap: 3px;
  color: ${ColorsEstu.primary};
  svg {
    width: 16px;
    height: 16px;
    fill: ${Colors.primary400};
  }
`;
