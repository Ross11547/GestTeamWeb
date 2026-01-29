import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 1.5rem;
  min-height: 100vh;
  background: #f8f9fa;
`;

export const HeaderDashboard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-radius: 20px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transform: translate(100px, -100px);
  }
`;

export const WelcomeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 1;
`;

export const WelcomeText = styled.h1`
  font-size: 2rem;
  color: white;
  font-weight: 700;
  margin: 0;
`;

export const DateText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  margin: 0;
  text-transform: capitalize;
`;

export const NotificationBadge = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.75rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }

  svg {
    color: white;
  }

  span {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #FF6B6B;
    color: white;
    font-size: 0.75rem;
    padding: 2px 6px;
    border-radius: 10px;
    font-weight: bold;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.12);
  }
`;

export const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const StatContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const StatNumber = styled.h3`
  font-size: 1.75rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
`;

export const StatLabel = styled.p`
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0;
`;

export const ScheduleSection = styled.div`
  width: 100%;
`;

export const ScheduleCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
`;

export const ClassItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  background: #f8f9fa;
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background: #e9ecef;
    transform: translateX(5px);
  }
`;

export const ClassTime = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-weight: 600;
  min-width: 140px;
`;

export const ClassInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const ClassTitle = styled.h4`
  margin: 0;
  color: #2c3e50;
  font-weight: 600;
`;

export const ClassRoom = styled.p`
  margin: 0;
  color: #6b7280;
  font-size: 0.9rem;
`;

export const ActivitySection = styled.div`
  width: 100%;
`;

export const ActivityCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
`;

export const ActivityItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #e9ecef;

  &:last-child {
    border-bottom: none;
  }
`;

export const ActivityDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-top: 5px;
  flex-shrink: 0;
  background: ${props => {
        switch (props.type) {
            case 'entrega': return '#4ECDC4';
            case 'quiz': return '#9B59B6';
            case 'reunion': return '#3498DB';
            case 'examen': return '#FF6B6B';
            default: return '#6b7280';
        }
    }};
`;

export const ActivityContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const ActivityText = styled.p`
  margin: 0;
  color: #2c3e50;
  font-size: 0.95rem;
`;

export const ActivityTime = styled.span`
  color: #9ca3af;
  font-size: 0.85rem;
`;

export const QuickAccessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

export const QuickCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

export const QuickIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const QuickTitle = styled.h3`
  margin: 0;
  color: #2c3e50;
  font-weight: 600;
  text-align: center;
`;