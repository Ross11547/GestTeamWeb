import styled from "styled-components";

export const TareasContainer = styled.div`
  width: 100%;
  padding: 0 2rem;
`;

export const HeaderTareas = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    color: #2c3e50;
    margin: 0 0 0.5rem 0;
    font-size: 1.75rem;
    font-weight: 700;
  }

  p {
    color: #6b7280;
    margin: 0;
  }
`;

export const AddTaskButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    transform: scale(1.05);
  }
`;

export const FilterBar = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

export const SearchInput = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #f8f9fa;
  border-radius: 10px;
  flex: 1;
  max-width: 400px;

  svg {
    color: #9ca3af;
  }

  input {
    flex: 1;
    border: none;
    background: none;
    outline: none;
    font-size: 0.95rem;
    color: #2c3e50;

    &::placeholder {
      color: #9ca3af;
    }
  }
`;

export const ViewToggle = styled.div`
  display: flex;
  background: #f8f9fa;
  border-radius: 10px;
  overflow: hidden;
`;

export const ToggleBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: ${props => props.active ? 'white' : 'transparent'};
  border: none;
  color: ${props => props.active ? '#2c3e50' : '#6b7280'};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.active ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none'};

  &:hover {
    color: #2c3e50;
  }
`;

export const TasksBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  min-height: 500px;
`;


export const ColumnHeader = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const ColumnTitle = styled.h3`
  margin: 0;
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
`;

export const TaskCount = styled.span`
  background: #e9ecef;
  color: #6b7280;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
`;

export const TasksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  overflow-y: auto;
  padding-right: 0.5rem;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 4px;
  }
`;

export const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

export const TaskPriority = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: ${props => `${props.color}15`};
  color: ${props => props.color};
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
`;

export const TaskTitle = styled.h4`
  margin: 0 0 0.75rem 0;
  color: #2c3e50;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
`;

export const TaskMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const TaskMateria = styled.span`
  color: #6b7280;
  font-size: 0.85rem;
  font-weight: 500;
`;

export const TaskDate = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #9ca3af;
  font-size: 0.85rem;

  svg {
    flex-shrink: 0;
  }
`;

export const TaskStudents = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
`;

export const TaskProgress = styled.div`
  margin: 0.75rem 0;

  span {
    display: block;
    margin-bottom: 0.25rem;
    color: #6b7280;
    font-size: 0.8rem;
    font-weight: 600;
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: #e9ecef;
  border-radius: 3px;
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  width: ${props => props.width}%;
  height: 100%;
  background: ${props => props.color};
  transition: width 0.3s ease;
`;

export const TaskActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid #e9ecef;
`;

export const ActionBtn = styled.button`
  flex: 1;
  padding: 0.4rem;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #e9ecef;
    color: #2c3e50;
  }

  &.delete:hover {
    background: #FFE8E8;
    color: #DC2626;
    border-color: #DC2626;
  }
`;

// Agrega estos estilos a los existentes

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${props => props.isDraggedOver ? '#E8F5FF' : '#f8f9fa'};
  border-radius: 12px;
  padding: 1rem;
  min-height: 400px;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.isDraggedOver ? '#3498DB' : 'transparent'};
`;

export const TaskCard = styled.div`
  background: white;
  padding: 1rem 1rem 1rem 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  cursor: move;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:active {
    cursor: grabbing;
    opacity: 0.5;
  }
`;

export const DragPreview = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 1000;
  opacity: 0.8;
`;