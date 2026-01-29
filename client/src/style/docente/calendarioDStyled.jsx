import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f8f9fa;
`;

export const HeaderCalendario = styled.div`
  padding: 2.5rem;
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
    margin: 0.5rem 0 2rem 0;
    font-size: 1.1rem;
  }
`;

export const QuickStats = styled.div`
  width: 50%;
  height: 50%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
`;

export const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
`;

export const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StatValue = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
`;

export const StatLabel = styled.span`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.9);
`;

export const TabsContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding: 0 2rem;
  background: white;
  border-radius: 16px;
  margin: 0 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

export const TabButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  color: ${props => props.active ? '#2c3e50' : '#9ca3af'};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    color: #2c3e50;
  }
`;

export const ContentArea = styled.div`
  padding: 2rem 0;
`;