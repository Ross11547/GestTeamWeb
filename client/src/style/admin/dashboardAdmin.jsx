import styled from "styled-components";
import { ColorsLogin, Colors } from "../colors";

export const DashboardWrapper = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding-bottom: 40px;
`;

export const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

export const PageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding: 28px 32px;
  background: ${Colors.white};
  border-radius: 12px;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

export const HeaderTitle = styled.h1`
  color: ${Colors.greyDark};
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const HeaderMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${Colors.greyLight};
  font-size: 0.95rem;
  font-weight: 500;
  padding: 10px 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const Card = styled.div`
  background: ${Colors.white};
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 16px rgba(248, 156, 94, 0.12);
    border-color: ${ColorsLogin.secondary100};
    transform: translateY(-2px);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

export const CardTitle = styled.h3`
  color: ${Colors.greyDark};
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const CardValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${ColorsLogin.secondary200};
  line-height: 1;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const IconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 10px;
  background: ${ColorsLogin.secondary100};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${Colors.white};
  box-shadow: 0 4px 12px rgba(248, 156, 94, 0.2);
`;

export const TrendText = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${Colors.greyLight};
  font-size: 0.85rem;
  font-weight: 500;
  
  span {
    color: ${Colors.greyLight};
  }
`;

export const ChartCard = styled.div`
  grid-column: 1 / -1;
  background: ${Colors.white};
  border-radius: 12px;
  padding: 28px;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  margin-top: 16px;
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }
`;

export const CardCharts = styled.div`
  grid-column: 1 / -1;
  background: ${Colors.white};
  border-radius: 12px;
  padding: 28px;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  margin-top: 16px;
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }
`;

export const ChartTitle = styled.h2`
  color: ${Colors.greyDark};
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0 0 24px 0;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding-bottom: 16px;
  border-bottom: 2px solid #f1f3f4;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 2px;
    background: ${ColorsLogin.secondary100};
  }
`;

// Responsive optimizations
export const ResponsiveCard = styled(Card)`
  @media (max-width: 768px) {
    padding: 20px;
    
    ${CardValue} {
      font-size: 2rem;
    }
    
    ${IconWrapper} {
      width: 48px;
      height: 48px;
    }
  }
`;

export const ResponsiveChart = styled.div`
  @media (max-width: 768px) {
    ${ChartCard}, ${CardCharts} {
      padding: 20px;
      margin-top: 12px;
    }
    
    ${ChartTitle} {
      font-size: 1.2rem;
      margin-bottom: 20px;
    }
  }
`;

// Tooltip styles
export const TooltipContent = styled.div`
  background: ${Colors.white};
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  
  .label {
    color: ${Colors.greyDark};
    font-weight: 600;
    margin-bottom: 4px;
  }
  
  .value {
    color: ${ColorsLogin.secondary200};
    font-weight: 700;
  }
`;