import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f8f9fa;
`;

export const HeaderHorario = styled.div`
  padding: 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0 0 30px 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;

  h1 {
    color: white;
    margin: 0;
    font-size: 2.5rem;
    font-weight: 700;
  }

  p {
    color: rgba(255, 255, 255, 0.9);
    margin: 0.5rem 0 0 0;
    font-size: 1.1rem;
  }
`;

export const ViewToggle = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  overflow: hidden;
`;

export const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.3)' : 'transparent'};
  border: none;
  color: #000000;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
`;

export const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

export const WeekSelector = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 16px;
  margin: 0 2rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    color: #2c3e50;
    font-size: 1.1rem;
  }
`;

export const WeekButton = styled.button`
  padding: 0.5rem;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #e9ecef;
    color: #2c3e50;
  }
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: 80px repeat(5, 1fr);
  background: white;
  border-radius: 16px;
  margin: 0 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

export const TimeColumn = styled.div`
  background: #f8f9fa;
  border-right: 1px solid #e9ecef;
`;

export const TimeSlot = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  color: #6b7280;
  font-weight: 500;
  border-bottom: 1px solid #e9ecef;
`;

export const DayColumn = styled.div`
  border-right: 1px solid #e9ecef;
  position: relative;

  &:last-child {
    border-right: none;
  }
`;

export const DayHeader = styled.div`
  padding: 1rem;
  text-align: center;
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #e9ecef;
`;

export const ClassBlock = styled.div`
  position: absolute;
  left: 5px;
  right: 5px;
  padding: 0.75rem;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 10;
  }
`;

export const ClassTitle = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ClassDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  opacity: 0.95;
  margin-bottom: 0.25rem;
`;

export const ClassRoom = styled.div`
  font-size: 0.85rem;
  opacity: 0.9;
  font-weight: 500;
`;

export const LegendContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  margin: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  h3 {
    color: #2c3e50;
    margin: 0 0 1rem 0;
    font-size: 1.1rem;
  }
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #6b7280;
  font-size: 0.9rem;

  span {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    flex-shrink: 0;
  }
`;