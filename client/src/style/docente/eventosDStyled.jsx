import styled from "styled-components";

export const EventosContainer = styled.div`
  width: 100%;
  padding: 0 2rem;
`;

export const HeaderEventos = styled.div`
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

export const CreateEventButton = styled.button`
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

export const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

export const FilterChip = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #e9ecef;
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const CalendarView = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
`;

export const MonthHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h3 {
    margin: 0;
    color: #2c3e50;
    font-size: 1.5rem;
    font-weight: 600;
    text-transform: capitalize;
  }

  button {
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
  }
`;

export const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const DayLabel = styled.div`
  text-align: center;
  font-weight: 600;
  color: #6b7280;
  font-size: 0.85rem;
  text-transform: uppercase;
  padding: 0.5rem;
`;

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
`;

export const DayCell = styled.div`
  aspect-ratio: 1;
  padding: 0.5rem;
  border-radius: 8px;
  background: ${props => props.isToday ? '#E8F5FF' : props.currentMonth ? 'white' : '#f8f9fa'};
  border: 1px solid ${props => props.isToday ? '#3498DB' : '#e9ecef'};
  opacity: ${props => props.currentMonth ? '1' : '0.5'};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: ${props => props.hasEvents ? '#FFF4E6' : '#f8f9fa'};
    transform: scale(1.05);
  }
`;

export const DayNumber = styled.div`
  font-weight: ${props => props.isToday ? '700' : '500'};
  color: ${props => props.isToday ? '#3498DB' : '#2c3e50'};
  font-size: 0.9rem;
`;

export const EventDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${props => props.color};
`;

export const UpcomingSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  height: fit-content;
`;

export const SectionTitle = styled.h3`
  margin: 0 0 1.5rem 0;
  color: #2c3e50;
  font-size: 1.25rem;
  font-weight: 600;
`;

export const EventsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const EventCard = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    background: #e9ecef;
    transform: translateX(5px);
  }
`;

export const EventDate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  background: white;
  border-radius: 10px;
  min-width: 60px;
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.9rem;
  gap: 0.25rem;
`;

export const EventTime = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 400;
`;

export const EventContent = styled.div`
  flex: 1;
`;

export const EventType = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: ${props => {
        switch (props.tipo) {
            case 'entrega': return '#FFE8E8';
            case 'examen': return '#E8F5FF';
            case 'reunion': return '#F3E8FF';
            case 'presentacion': return '#E8FBF8';
            case 'administrativo': return '#FFF4E6';
            default: return '#f8f9fa';
        }
    }};
  color: ${props => {
        switch (props.tipo) {
            case 'entrega': return '#DC2626';
            case 'examen': return '#1E40AF';
            case 'reunion': return '#7C3AED';
            case 'presentacion': return '#0D9488';
            case 'administrativo': return '#EA580C';
            default: return '#6b7280';
        }
    }};
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`;

export const EventTitle = styled.h4`
  margin: 0 0 0.25rem 0;
  color: #2c3e50;
  font-size: 1rem;
  font-weight: 600;
`;

export const EventDescription = styled.p`
  margin: 0;
  color: #6b7280;
  font-size: 0.85rem;
  line-height: 1.4;
`;

export const EventActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ActionButton = styled.button`
  padding: 0.4rem;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.3s ease;

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