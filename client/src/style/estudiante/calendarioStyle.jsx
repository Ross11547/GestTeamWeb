// Styled Components
export const UserRoleBadge = styled.div`
  background: ${props => props.role === 'docente' ? ColorsLogin.secondary100 : '#16a34a'};
  color: ${Colors.white};
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
`;

export const CalendarLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 32px;
  margin-top: 24px;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const CalendarSection = styled.div``;

export const CalendarContainer = styled.div`
  background: ${Colors.white};
  border-radius: 16px;
  border: 1px solid #e9ecef;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  
  .rbc-calendar {
    font-family: inherit;
  }
  
  .rbc-month-view {
    border: none;
  }
  
  .rbc-header {
    background: ${ColorsLogin.secondary100};
    color: ${Colors.white};
    font-weight: 600;
    padding: 12px 8px;
    border: none;
    border-radius: 8px 8px 0 0;
    text-transform: uppercase;
    font-size: 0.85rem;
  }
  
  .rbc-month-row {
    border: none;
  }
  
  .rbc-day-bg {
    border: 1px solid #f1f3f4;
    
    &:hover {
      background: #f8f9fa;
    }
  }
  
  .rbc-date-cell {
    padding: 8px;
    font-weight: 500;
    color: ${Colors.greyDark};
  }
  
  .rbc-off-range-bg {
    background: #f8f9fa;
  }
  
  .rbc-today {
    background: ${ColorsLogin.secondary100}10;
  }
  
  .rbc-event {
    border: none !important;
    border-radius: 4px !important;
    padding: 2px 4px !important;
    margin: 1px 0 !important;
    font-size: 10px !important;
    font-weight: 500 !important;
  }
`;

export const CalendarToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 16px 0;
  border-bottom: 2px solid #f1f3f4;
`;

export const NavigationSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const NavButton = styled.button`
  background: ${ColorsLogin.secondary100};
  color: ${Colors.white};
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${ColorsLogin.secondary200};
    transform: translateY(-1px);
  }
`;

export const MonthLabel = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${Colors.greyDark};
  min-width: 200px;
  text-align: center;
`;

export const ActionsSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  background: ${Colors.white};
  cursor: pointer;
  font-weight: 500;
  
  &:focus {
    outline: none;
    border-color: ${ColorsLogin.secondary100};
  }
`;

export const AddEventButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${ColorsLogin.secondary100};
  color: ${Colors.white};
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${ColorsLogin.secondary200};
    transform: translateY(-1px);
  }
`;

export const EventContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: white;
  font-size: 10px;
  font-weight: 500;
`;

export const EventTitle = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SidebarSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StatsCard = styled.div`
  background: ${Colors.white};
  border-radius: 12px;
  border: 1px solid #e9ecef;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

export const StatsTitle = styled.h3`
  margin: 0 0 16px 0;
  color: ${Colors.greyDark};
  font-size: 1.1rem;
  font-weight: 600;
`;

export const StatsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StatIcon = styled.div`
  width: 32px;
  height: 32px;
  background: #f8f9fa;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StatText = styled.div``;

export const StatNumber = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${Colors.greyDark};
`;

export const StatLabel = styled.div`
  font-size: 0.8rem;
  color: ${Colors.greyLight};
`;

export const ActivitiesCard = styled.div`
  background: ${Colors.white};
  border-radius: 12px;
  border: 1px solid #e9ecef;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

export const CardTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 16px 0;
  color: ${Colors.greyDark};
  font-size: 1.1rem;
  font-weight: 600;
`;

export const ActivitiesList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f3f4;
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${ColorsLogin.secondary100};
    border-radius: 2px;
  }
`;

export const EmptyMessage = styled.div`
  text-align: center;
  color: ${Colors.greyLight};
  font-style: italic;
  padding: 20px;
`;

export const ActivityItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f1f3f4;
  opacity: ${props => props.completed ? 0.7 : 1};
  
  &:last-child {
    border-bottom: none;
  }
`;

export const ActivityIcon = styled.div`
  width: 32px;
  height: 32px;
  background: ${props => props.color}15;
  color: ${props => props.color};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const ActivityContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ActivityTitle = styled.div`
  font-weight: 600;
  color: ${Colors.greyDark};
  margin-bottom: 4px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
`;

export const ActivityMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 4px;
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${Colors.greyLight};
  font-size: 0.75rem;
`;

export const ActivityDescription = styled.div`
  font-size: 0.8rem;
  color: ${Colors.greyLight};
  line-height: 1.4;
`;