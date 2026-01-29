import styled from "styled-components";
import { Colors, ColorsEstu } from "../colors";

export const Container = styled.div`
  width: 100%;
  padding: 1rem;
`;

export const Acciones = styled.div`
  width:30%;
  height: 100%;
  display:flex;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

export const BotonAccion = styled.button`
  width:250px;
  height: 30px;
  display: flex;
  align-items: center;
  gap: 5px;
  background: linear-gradient(135deg,${ColorsEstu.primary800}, ${ColorsEstu.primary900});
  color: ${Colors.white};
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: linear-gradient(135deg, ${ColorsEstu.primary900},${ColorsEstu.primary800});
}
`;

export const BuscarInput = styled.input`
  width: 250px;
  height: 30px;
  padding: 8px;
  border: 1px solid ${Colors.greyLight};
  border-radius: 5px;
`;

export const ContainerNoti = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 15px;
`;

export const Apartado = styled.div`
  width: 50%;
  height: 50%;
`;

export const ApartadoTitulo = styled.h3`
  font-size: 1.2rem;
  color:${Colors.black};
  margin-bottom: 20px;
`;

export const NotificacionesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const NotificacionItemWrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${({ leido }) => (leido ? '#f5f5f5' : '#fff')};
  border: none;
  box-shadow:  0 5px 15px rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
`;

export const IconWrapper = styled.div`
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NotificacionContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Mensaje = styled.p`
  font-size: 1rem;
  color: ${Colors.black};
  margin: 0;
  font-weight: 500;
`;

export const Fecha = styled.small`
  color: ${Colors.greyLight};
  font-size: 0.85rem;
  margin-top: 5px;
`;

export const MarcarLeidoButton = styled.button`
  margin-top: 10px;
  background: ${ColorsEstu.primary200};
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background:${ColorsEstu.primary800};
  }
`;

export const EmptyMessage = styled.p`
  font-size: 1rem;
  color: ${Colors.greyLight};
  text-align: center;
`;