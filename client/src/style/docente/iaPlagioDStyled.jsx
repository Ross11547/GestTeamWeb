import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f8f9fa;
  padding-bottom: 2rem;
`;

export const HeaderPlagio = styled.div`
  padding: 2.5rem;
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

export const UploadSection = styled.div`
  padding: 0 2rem;
  margin-bottom: 2rem;
`;

export const DropZone = styled.div`
  background: ${(props) => (props.isDragging ? "#E8F5FF" : "white")};
  border: 3px dashed
    ${(props) => {
    if (props.isDragging) return "#3498DB";
    if (props.hasFile) return "#4ECDC4";
    return "#CBD5E0";
  }};
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    border-color: #3498db;
    background: #f8f9fa;
  }

  h3 {
    margin: 1rem 0 0.5rem 0;
    color: #2c3e50;
    font-size: 1.5rem;
  }

  p {
    color: #6b7280;
    margin-bottom: 1.5rem;
  }

  button {
    padding: 0.75rem 2rem;
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
  }

  span {
    display: block;
    margin-top: 1rem;
    color: #9ca3af;
    font-size: 0.85rem;
  }
`;

export const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const FileName = styled.h3`
  margin: 0;
  color: #2c3e50;
  font-size: 1.25rem;
`;

export const FileSize = styled.p`
  margin: 0;
  color: #6b7280;
`;

export const AnalyzeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover:not(:disabled) {
    transform: scale(1.05);
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const RemoveFileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background: #ffe8e8;
    color: #dc2626;
    border-color: #dc2626;
  }
`;


export const ResultsSection = styled.div`
  padding: 0 2rem;
`;

export const OverviewCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const MetricCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.12);
  }
`;

export const MetricIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const MetricValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

export const MetricLabel = styled.div`
  color: #6b7280;
  font-size: 0.95rem;
  font-weight: 500;
`;

export const ChartContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

export const ProgressRing = styled.div`
  position: relative;
  width: 200px;
  height: 200px;

  svg {
    transform: rotate(-90deg);
  }
`;

export const ProgressText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  span {
    display: block;
    font-size: 2.5rem;
    font-weight: 700;
    color: #2c3e50;
  }

  label {
    color: #6b7280;
    font-size: 0.95rem;
  }
`;

export const AlertSection = styled.div`
  margin-bottom: 2rem;
`;

export const AlertCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: ${(props) => (props.nivel === "alto" ? "#FFE8E8" : "#FFF4E6")};
  border-left: 4px solid
    ${(props) => (props.nivel === "alto" ? "#FF6B6B" : "#FFA500")};
  border-radius: 8px;
  margin-bottom: 1rem;
  color: ${(props) => (props.nivel === "alto" ? "#DC2626" : "#EA580C")};

  svg {
    flex-shrink: 0;
  }
`;

export const DetailedReport = styled.div`
  display: grid;
  gap: 2rem;
`;

export const ReportSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
`;

export const SectionHeader = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0 0 1.5rem 0;
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 600;
`;

export const SourcesList = styled.div`
  display: grid;
  gap: 1rem;
`;

export const SourceCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    background: #e9ecef;
    transform: translateX(5px);
  }
`;

export const SourceType = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: ${(props) => {
    switch (props.tipo) {
      case "web":
        return "#3498DB15";
      case "universidad":
        return "#FFA50015";
      case "libro":
        return "#4ECDC415";
      case "ia":
        return "#9B59B615";
      default:
        return "#f8f9fa";
    }
  }};
  color: ${(props) => {
    switch (props.tipo) {
      case "web":
        return "#3498DB";
      case "universidad":
        return "#FFA500";
      case "libro":
        return "#4ECDC4";
      case "ia":
        return "#9B59B6";
      default:
        return "#6b7280";
    }
  }};
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 600;
  min-width: 80px;
  text-align: center;
`;

export const SourceInfo = styled.div`
  flex: 1;

  p {
    margin: 0.25rem 0;
    color: #6b7280;
    font-size: 0.9rem;
  }
`;

export const SourceTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
`;

export const SourceMatch = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.25rem 0.75rem;
  background: #ffe8e8;
  color: #dc2626;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  width: fit-content;
`;

export const SourceLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #3498db;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: #2980b9;
    transform: scale(1.05);
  }
`;

export const ComparisonText = styled.div`
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
`;

export const CopiedText = styled.div`
  padding: 1rem;
  background: ${(props) => {
    switch (props.tipo) {
      case "web":
        return "#FFE8E8";
      case "universidad":
        return "#FFF4E6";
      case "ia":
        return "#F3E8FF";
      default:
        return "#f8f9fa";
    }
  }};
  border-left: 4px solid
    ${(props) => {
    switch (props.tipo) {
      case "web":
        return "#FF6B6B";
      case "universidad":
        return "#FFA500";
      case "ia":
        return "#9B59B6";
      default:
        return "#6b7280";
    }
  }};
  border-radius: 4px;
  font-style: italic;
  color: #2c3e50;
  line-height: 1.6;
`;

export const OriginalText = styled.div`
  padding: 1rem;
  background: #e8fbf8;
  border-left: 4px solid #4ecdc4;
  margin-bottom: 1rem;
  border-radius: 4px;
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

export const AnalyzingOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

export const AnalyzingContent = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 20px;
  max-width: 500px;
  width: 90%;
  text-align: center;

  .shield-pulse {
    animation: ${pulse} 2s infinite;
  }

  h2 {
    margin: 1rem 0;
    color: #2c3e50;
  }

  p {
    color: #6b7280;
    margin-bottom: 2rem;
  }
`;

export const AnalyzingStep = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  opacity: ${(props) =>
    props.active ? "1" : props.completed ? "0.6" : "0.3"};
  transition: all 0.3s ease;
`;

export const StepIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.completed ? "#4ECDC4" : props.active ? "#3498DB" : "#e9ecef"};
  color: ${(props) =>
    props.completed || props.active ? "white" : "#9ca3af"};
  transition: all 0.3s ease;

  svg {
    animation: ${(props) => (props.active ? spin : "none")} 1s linear infinite;
  }
`;

export const StepText = styled.span`
  flex: 1;
  text-align: left;
  color: ${(props) =>
    props.completed ? "#4ECDC4" : props.active ? "#2c3e50" : "#9ca3af"};
  font-weight: ${(props) => (props.active ? "600" : "400")};
`;

export const LoadingBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  margin: 1rem 0;
  position: relative;

  div {
    height: 100%;
    background: linear-gradient(90deg, #3498db, #2ecc71);
    transition: width 0.3s ease;
  }

  span {
    position: absolute;
    top: -20px;
    right: 0;
    font-size: 0.8rem;
    color: #6b7280;
  }
`;
export const HighlightedDocumentWrapper = styled.div`
  margin-top: 2rem;
`;

export const HighlightedDocumentTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #111827;
  font-size: 1.1rem;
  font-weight: 600;
`;

export const HighlightedDocumentInfo = styled.p`
  margin: 0 0 1rem 0;
  color: #6b7280;
  font-size: 0.85rem;
`;

export const HighlightedDocumentBox = styled.div`
  background: #f9fafb;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  max-height: 380px;
  overflow-y: auto;
  font-size: 0.92rem;
  line-height: 1.6;
  color: #111827;
  white-space: pre-wrap;
`;

export const HighlightSpan = styled.span`
  background: ${(props) => {
    switch (props.tipo) {
      case "web":
        return "rgba(239, 68, 68, 0.16)"; // rojo suave
      case "universidad":
        return "rgba(249, 115, 22, 0.16)"; // naranja suave
      case "ia":
        return "rgba(139, 92, 246, 0.16)"; // violeta suave
      case "original":
        return "rgba(34, 197, 94, 0.12)"; // verde suave
      default:
        return "transparent";
    }
  }};
  border-bottom: ${(props) => {
    switch (props.tipo) {
      case "web":
        return "2px solid #ef4444";
      case "universidad":
        return "2px solid #f97316";
      case "ia":
        return "2px dashed #8b5cf6";
      case "original":
        return "1px dashed #22c55e";
      default:
        return "none";
    }
  }};
  border-radius: 3px;
  padding: 0 1px;
`;

export const HighlightLegend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.75rem;
  font-size: 0.8rem;
  color: #4b5563;
`;

export const LegendItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
`;

export const LegendColor = styled.span`
  width: 14px;
  height: 8px;
  border-radius: 999px;
  background: ${(props) => props.bg || "#e5e7eb"};
  border: 1px solid ${(props) => props.border || "transparent"};
`;

