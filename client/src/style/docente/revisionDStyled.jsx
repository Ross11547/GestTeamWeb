import styled from "styled-components";

export const RevisionContainer = styled.div`
  width: 100%;
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
`;

export const HeaderRevision = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;

  h2 {
    color: #2c3e50;
    margin: 0 0 1rem 0;
    font-weight: 700;
  }
`;

export const ProgressBar = styled.div`
  position: relative;
  width: 300px;
  height: 8px;
  background: #e9ecef;
  border-radius: 10px;
  overflow: hidden;

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 0.75rem;
    color: #6b7280;
    background: white;
    padding: 0 0.5rem;
    white-space: nowrap;
  }
`;

export const ProgressFill = styled.div`
  width: ${props => props.width}%;
  height: 100%;
  background: ${props => props.color};
  transition: width 0.3s ease;
`;

export const QuickActions = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ReviewButton = styled.button`
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
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e9ecef;
`;

export const SearchBar = styled.div`
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

export const StatusFilter = styled.div`
  display: flex;
  gap: 1rem;

  button {
    padding: 0.5rem 1rem;
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    color: #6b7280;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #e9ecef;
    }

    &.active {
      background: #3498db;
      color: white;
      border-color: #3498db;
    }
  }
`;

export const StudentsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
`;

export const TableHeader = styled.thead`
  background: #f8f9fa;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #e9ecef;
  transition: background 0.3s ease;

  &:hover {
    background: #f8f9fa;
  }
`;

export const TableCell = styled.td`
  padding: 1rem;
  text-align: ${props => props.header ? 'left' : 'left'};
  color: ${props => props.header ? '#6b7280' : '#2c3e50'};
  font-weight: ${props => props.header ? '600' : '400'};
  font-size: ${props => props.header ? '0.85rem' : '0.95rem'};
  text-transform: ${props => props.header ? 'uppercase' : 'none'};
  letter-spacing: ${props => props.header ? '0.5px' : '0'};
`;

export const CheckboxAll = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

export const StudentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const StudentAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export const StudentName = styled.span`
  font-weight: 500;
  color: #2c3e50;
`;

export const SubmissionStatus = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  background: ${props => {
    switch(props.status) {
      case 'revisado': return '#E8FBF8';
      case 'pendiente': return '#FFF4E6';
      case 'no_entregado': return '#FFE8E8';
      default: return '#f8f9fa';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'revisado': return '#4ECDC4';
      case 'pendiente': return '#FFA500';
      case 'no_entregado': return '#FF6B6B';
      default: return '#6b7280';
    }
  }};
`;

export const GradeInput = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input {
    width: 60px;
    padding: 0.5rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    text-align: center;
    font-weight: 600;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
    }
  }

  span {
    color: #9ca3af;
    font-size: 0.9rem;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;

  button {
    position: relative;
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

    span {
      position: absolute;
      top: -5px;
      right: -5px;
      background: #FF6B6B;
      color: white;
      font-size: 0.7rem;
      padding: 2px 5px;
      border-radius: 10px;
    }
  }
`;

export const BulkActions = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
`;