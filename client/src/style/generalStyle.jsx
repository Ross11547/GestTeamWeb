import styled from "styled-components";
import { ColorsLogin, Colors } from "./colors";

export const PageWrapper = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding: 24px;
`;

export const Container = styled.div`
  max-width: ${props => props.wide ? '3000px' : '1200px'};
  margin: 0 auto;
  transition: max-width 0.3s ease;
`;

export const PageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  background: ${Colors.white};
  padding: 28px 32px;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

export const Title = styled.h1`
  color: ${ColorsLogin.secondary100};
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: ${Colors.white};
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 24px;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  transition: all 0.2s ease;
  
  &:focus-within {
    border-color: ${ColorsLogin.secondary100};
    box-shadow: 0 0 0 3px rgba(248, 156, 94, 0.1);
  }
`;

export const SearchInput = styled.input`
  border: none;
  background: transparent;
  flex-grow: 1;
  margin-left: 12px;
  font-size: 1rem;
  color: ${Colors.greyDark};
  font-family: inherit;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${Colors.greyLight};
  }
`;

// Contenedor con scroll horizontal controlado
export const TableWrapper = styled.div`
  background: ${Colors.white};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid #e9ecef;
  overflow: hidden;
  position: relative;
`;

export const TableScrollContainer = styled.div`
  overflow-x: auto;
  overflow-y: visible;
  
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f3f4;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 4px;

  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 1000px; /* Ancho mínimo para que se vea bien */
`;

export const TableHeader = styled.th`
  background: ${ColorsLogin.secondary100};
  color: ${Colors.white};
  padding: 16px 14px;
  text-align: left;
  font-weight: 600;
  font-size: 0.9rem;
  border: none;
  white-space: nowrap;
  position: sticky;
  top: 0;
  z-index: 10;
  
  /* Anchos mínimos para cada columna */
  &:nth-child(1) { min-width: 120px; } /* Nombre */
  &:nth-child(2) { min-width: 120px; } /* Apellido */
  &:nth-child(3) { min-width: 200px; } /* Email */
  &:nth-child(4) { min-width: 140px; } /* Carrera */
  &:nth-child(5) { min-width: 140px; } /* Facultad */
  &:nth-child(6) { min-width: 80px; }  /* CI */
  &:nth-child(7) { min-width: 100px; } /* Código */
  &:nth-child(8) { min-width: 100px; } /* Teléfono */
  &:nth-child(9) { min-width: 100px; width: 100px; } /* Acciones - fijo */
  
  /* Para tablas simples */
  &.simple {
    &:nth-child(1) { min-width: 200px; }
    &:nth-child(2) { min-width: 300px; }
    &:nth-child(3) { min-width: 120px; width: 120px; }
  }
`;

export const TableRow = styled.tr`
  transition: background-color 0.2s ease;
  border-bottom: 1px solid #f1f3f4;

  &:hover {
    background: #f8f9fa;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.td`
  padding: 14px;
  color: ${Colors.greyDark};
  font-size: 0.9rem;
  vertical-align: middle;
  border: none;
  
  /* Permitir salto de línea en celdas de contenido */
  &:not(:last-child) {
    word-wrap: break-word;
    max-width: 0; /* Truco para que funcione el word-wrap con table layout */
  }
  
  /* Celda de acciones siempre fija */
  &:last-child {
    white-space: nowrap;
    width: 100px;
    text-align: center;
  }
`;

export const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => props.color || Colors.greyDark};
  cursor: pointer;
  margin: 0 4px;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${props => props.color || Colors.greyDark}15;
    transform: translateY(-1px);
  }
`;

export const FloatingButton = styled.button`
  position: fixed;
  bottom: 32px;
  right: 32px;
  background: ${ColorsLogin.secondary100};
  color: ${Colors.white};
  border: none;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(248, 156, 94, 0.3);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 100;

  &:hover {
    background: ${ColorsLogin.secondary200};
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 12px 32px rgba(248, 156, 94, 0.4);
  }
`;

// Modal
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  backdrop-filter: blur(4px);
`;

export const ModalContent = styled.div`
  background: ${Colors.white};
  border-radius: 16px;
  padding: 32px;
  width: ${props => {
    if (props.size === 'small') return '450px';
    if (props.size === 'large') return '700px';
    return '580px';
  }};
  max-width: 95vw;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border: 1px solid #e9ecef;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f1f3f4;
`;

export const ModalTitle = styled.h2`
  color: ${ColorsLogin.secondary100};
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
`;

// Formulario
export const Form = styled.form`
  display: grid;
  grid-template-columns: ${props => {
    if (props.columns === 2) return '1fr 1fr';
    return '1fr';
  }};
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  
  &.full-width {
    grid-column: 1 / -1;
  }
`;

export const Label = styled.label`
  color: ${Colors.greyDark};
  margin-bottom: 6px;
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Input = styled.input`
  padding: 12px 14px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  color: ${Colors.greyDark};
  transition: all 0.2s ease;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${ColorsLogin.secondary100};
    box-shadow: 0 0 0 3px rgba(248, 156, 94, 0.1);
  }
  
  &:disabled {
    background: #f8f9fa;
    color: ${Colors.greyLight};
    cursor: not-allowed;
  }
  
  &[readonly] {
    background: #f8f9fa;
    border-color: #dee2e6;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
`;

export const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  font-family: inherit;

  &.primary {
    background: ${ColorsLogin.secondary100};
    color: ${Colors.white};
    
    &:hover {
      background: ${ColorsLogin.secondary200};
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(248, 156, 94, 0.3);
    }
  }

  &.secondary {
    background: ${Colors.white};
    color: ${Colors.greyDark};
    border: 2px solid #e9ecef;
    
    &:hover {
      background: #f8f9fa;
      border-color: ${Colors.greyLight};
    }
  }
`;

// Estados especiales
export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${Colors.greyLight};
  
  svg {
    margin-bottom: 16px;
    opacity: 0.5;
  }
  
  h3 {
    margin: 0 0 8px 0;
    color: ${Colors.greyDark};
  }
  
  p {
    margin: 0;
    font-size: 0.9rem;
  }
`;

// Chips para colores
export const Chip = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 6px;
  margin: 0 3px 3px 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
  position: relative;
  cursor: help;
  
  &:hover::after {
    content: attr(title);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: ${Colors.greyDark};
    color: ${Colors.white};
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    white-space: nowrap;
    z-index: 10;
    margin-bottom: 4px;
  }
`;


// Loading states
export const LoadingRow = styled(TableRow)`
  td {
    padding: 20px 14px;
  }
`;

export const LoadingCell = styled(TableCell)`
  .skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    height: 16px;
    border-radius: 4px;
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;