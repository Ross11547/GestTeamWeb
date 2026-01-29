import styled from "styled-components";
import { Colors, ColorsEstu } from "../colors";

export const Container = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: #f9fafb;
`;

export const Header = styled.div`
  width: 25%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items:flex-end;
`;

export const NewBoardButton = styled.button`
  width: 200px;
  height: 50px;
  display: flex;
  justify-content:center;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #F8E061ff, #ffc107);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s;
  margin-top:20px;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }
`;

export const TabsContainer = styled.div`
  margin-top: 2rem;
`;

export const TabsList = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const TabButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  background-color: ${(props) => (props.active ? props.ColorsPi.primary300 : 'transparent')};
  color: ${(props) => (props.active ? props.ColorsPi.primary: props.ColorsPi.primary100)};
  border: 2px solid ${(props) => (props.active ? props.ColorsPi.primary : 'transparent')};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${(props) => props.ColorsPi.primary300 };
    color: ${(props) =>  props.ColorsPi.primary};
  }
`;

export const BoardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

export const BoardCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

export const CardHeaders = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CardTitle = styled.h3`
  color: ${Colors.black};
  font-size: 18px;
`;

export const CardDate = styled.p`
  color: ${Colors.greyLight};
  font-size: 15px;
`;

export const Modal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background:${Colors.white};
  padding: 2rem;
  border-radius: 1rem;
  width: 80%;
  max-width: 900px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #feffdc;
  padding-bottom: 1rem;
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  color: ${Colors.black};
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${Colors.greyLight};

  &:hover {
    color: ${Colors.black};
  }
`;
export const FormGroup = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: ${Colors.black};
    margin-bottom: 5px;
  }

  input,
  select {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid ${Colors.greyLight};
    border-radius: 5px;
    background: ${Colors.white};
    color: ${Colors.black};

    &:focus {
      outline: none;
      border-color: ${Colors.greyLight};
      
    }
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  button {
    padding: 10px 15px;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:first-child {
      background-color: ${ColorsEstu.primary400};
      color: white;

      &:hover {
        background-color: ${ColorsEstu.primary900};
      }
    }

    &:last-child {
      background-color: #f3f4f6;
      color: ${Colors.black};

      &:hover {
        background-color: #e5e7eb;
      }
    }
  }
`;

export const ExcalidrawContainer = styled.div`
  height: 60vh;
  margin-top: 1rem;
  background-color: #feffdc;
  border-radius: 1rem;
`;