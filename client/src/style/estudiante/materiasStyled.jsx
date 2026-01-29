import styled from "styled-components";
import {  ColorsLogin,ColorsEstu } from "../colors";
export const Container = styled.div`
  width: 100%;
  padding: 1rem;
  height: 100vh;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #fff;
  font-weight: bold;
`;

export const Parrafo = styled.p`
  width: 35%;
  height: 100%;
  color: white;
  font-size: 1.1rem;
  margin-bottom: 10px;
`;

export const SubjectsGrid = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

export const SubjectCard = styled.div`
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid #e0e0e0;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: linear-gradient(
      90deg, ${ColorsLogin.secondary100} 0%, ${ColorsEstu.primary} 100%);
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
`;

export const SubjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;

  ${SubjectCard}:hover & {
    transform: scale(1.1);
  }
`;

export const SubjectContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
`;

export const SubjectTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.75rem;
  text-align: center;
`;

export const SubjectDetail = styled.p`
  color: #6b7280;
  font-size: 1rem;
  margin: 0.25rem 0;
  text-align: center;
  font-weight: 500;
`;

export const CardHeader = styled.div``;
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 280px;
  color: #333;
  //background: linear-gradient(135deg, ${ColorsEstu.primary} 0%, #ffd54f 100%);
  background: linear-gradient(135deg, ${(props) => props.ColorsCard.primary} 0%,${(props) => props.ColorsCard.primary100} 100%);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  padding: 20px;
  position: relative;
  flex-direction: column;
`;

export const HeaderContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 20px;
`;

/* export const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
  font-weight: bold;
`; */

export const SearchBar = styled.input`
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 30px;
  width: 300px;
  font-size: 1rem;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
    width: 320px;
  }
`;

export const IconWrapper = styled.span`
  margin-right: 0.5rem;
  display: inline-flex;
  align-items: center;
  color: #333;
`;

export const BackgroundIllustration = styled.div`
  position: absolute;
  top: 10px;
  right: 0;
  bottom: 0;
  width: 40%;

  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ImgLogo = styled.img`
  width: 350px;
  height: 350px;
`;
export const HeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

  width: 100%;
`;

export const TableCont = styled.div`
  width: 100%;
  height: 455px;
`;

export const TableContainer = styled.div`
  width: 100%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
`;

export const TableStyled = styled.table`
  width: 100%;
  height: 50px;
  border-collapse: separate;
  border-spacing: 0;
`;

export const TableHeader = styled.thead`
  background: ${ColorsEstu.primary};
`;

export const TableHeaderRow = styled.tr`
  transition: background 0.3s ease;
`;

export const TableHeaderCell = styled.th`
  padding: 15px;
  text-align: left;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
  text-align: center;
`;

export const TableRow = styled.tr`
  transition: background 0.3s ease;
  cursor: pointer;
  &:hover {
    background: rgba(224, 224, 224, 0.25);
  }
`;

export const TableCell = styled.td`
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
  color: #000;
  font-size: 0.9rem;
  font-weight: bold;
`;

export const H1Division = styled.h1`
  width: 200px;
  text-align: center;
  bottom: 20px;
  left: 20px;
  background: ${ColorsEstu.primary};
  color: white;
  border: none;
  padding: 15px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 20px;
`;

export const ProfileUser = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  padding: 20px;
`;
export const ImgProfile = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 20px;
  margin: 0px 10px;
  object-fit: cover;
`;
export const Divlabel = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
`;
export const LabelUser = styled.label`
  display: flex;
  flex-direction: column;
  color: #6b7280;
  font-size: 700;
  font-size: 17px;
  margin: 5px;
`;
