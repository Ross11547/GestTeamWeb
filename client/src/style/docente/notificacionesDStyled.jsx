import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f8f9fa;
`;

export const HeaderNotificaciones = styled.div`
  padding: 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0 0 30px 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;

  h1 {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: white;
    margin: 0;
    font-size: 2.5rem;
    font-weight: 700;
  }

  p {
    color: rgba(255, 255, 255, 0.9);
    margin: 0.5rem 0 0 3rem;
    font-size: 1.1rem;
  }
`;

export const MarkAllButton = styled.button`
  width: 100%;
  height: 45px;
  background:black;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  border-radius: 10px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    color: #2c3e50;
  }
`;

export const NotificationFilters = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0 2rem;
  margin-bottom: 2rem;
  overflow-x: auto;
`;

export const FilterChip = styled.button`
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 20px;
  color: #6b7280;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: #f8f9fa;
    transform: scale(1.05);
  }
`;

export const NotificationsList = styled.div`
  padding: 0 2rem 2rem;
`;

export const NotificationCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: ${props => props.leida ? 'white' : '#FFF9F0'};
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  border-left: 4px solid ${props => props.importante ? '#FFA500' : 'transparent'};
  transition: all 0.3s ease;
  opacity: ${props => props.leida ? '0.8' : '1'};

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.12);
    opacity: 1;
  }
`;

export const NotificationIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const NotificationContent = styled.div`
  flex: 1;
`;

export const NotificationTitle = styled.h3`
  display: flex;
  align-items: center;
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
`;

export const NotificationMessage = styled.p`
  margin: 0 0 0.75rem 0;
  color: #6b7280;
  line-height: 1.5;
`;

export const NotificationMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const NotificationTime = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #9ca3af;
  font-size: 0.85rem;
`;

export const NotificationActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ActionBtn = styled.button`
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

  &.delete:hover {
    background: #FFE8E8;
    color: #FF6B6B;
    border-color: #FF6B6B;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;

  h3 {
    margin: 1rem 0 0.5rem 0;
    color: #2c3e50;
    font-size: 1.5rem;
  }

  p {
    color: #9ca3af;
    margin: 0;
  }
`;