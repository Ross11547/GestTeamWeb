import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f8f9fa;
`;

export const HeaderReportes = styled.div`
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

export const ExportActions = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }
`;

export const TabsNav = styled.div`
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

export const ReportsContent = styled.div`
  padding: 2rem;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

export const MetricCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${props => props.color || '#3498DB'};
  }
`;

export const MetricValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

export const MetricLabel = styled.div`
  color: #6b7280;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
`;

export const MetricChange = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${props => props.trend === 'up' ? '#4ECDC4' : '#FF6B6B'};
`;

export const ChartCard = styled.div`
width: 100%;
height: 400px;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
`;

export const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const ChartTitle = styled.h3`
  margin: 0;
  color: #2c3e50;
  font-size: 1.25rem;
  font-weight: 600;
`;

export const ChartFilter = styled.div`
  select {
    padding: 0.5rem 1rem;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    background: white;
    color: #6b7280;
    cursor: pointer;
    font-size: 0.9rem;

    &:focus {
      outline: none;
      border-color: #3498db;
    }
  }
`;

export const TableCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
`;

export const TableReport = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    tr {
      border-bottom: 2px solid #e9ecef;
    }

    th {
      padding: 0.75rem;
      text-align: left;
      color: #6b7280;
      font-weight: 600;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid #f8f9fa;
      transition: background 0.3s ease;

      &:hover {
        background: #f8f9fa;
      }
    }

    td {
      padding: 1rem 0.75rem;
      color: #2c3e50;

      svg {
        vertical-align: middle;
      }
    }
  }
`;