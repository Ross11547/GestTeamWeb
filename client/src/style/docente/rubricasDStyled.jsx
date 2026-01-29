import styled from "styled-components";

export const RubricasContainer = styled.div`
  width: 100%;
`;

export const HeaderRubricas = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    color: #2c3e50;
    margin: 0 0 0.5rem 0;
    font-weight: 700;
  }

  p {
    color: #6b7280;
    margin: 0;
  }
`;

export const CreateButton = styled.button`
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

export const RubricasList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const RubricaCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;

  ${props => props.expanded && `
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.12);
  `}
`;

export const RubricaHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #f8f9fa;
  }
`;

export const RubricaTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1.25rem;
  font-weight: 600;
`;

export const RubricaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #6b7280;
  font-size: 0.9rem;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const EditButton = styled.button`
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

export const DeleteButton = styled(EditButton)`
  &:hover {
    background: #FFE8E8;
    color: #FF6B6B;
    border-color: #FF6B6B;
  }
`;

export const ApplyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    transform: scale(1.05);
  }
`;

export const RubricaCriteria = styled.div`
  padding: 0 1.5rem 1.5rem;
  border-top: 1px solid #e9ecef;
`;

export const RubricaMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;

  h4 {
    margin: 0;
    color: #2c3e50;
    font-weight: 600;
  }

  span {
    color: #6b7280;
    font-size: 0.9rem;
    font-weight: 600;
  }
`;

export const CriteriaItem = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 12px;
`;

export const CriteriaHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h4 {
    margin: 0;
    color: #2c3e50;
    font-size: 1.1rem;
  }

  span {
    background: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    color: #6b7280;
    font-size: 0.85rem;
    font-weight: 600;
  }
`;

export const CriteriaLevels = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

export const LevelCard = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const LevelScore = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

export const LevelDescription = styled.p`
  color: #6b7280;
  font-size: 0.85rem;
  margin: 0;
  line-height: 1.4;
`;