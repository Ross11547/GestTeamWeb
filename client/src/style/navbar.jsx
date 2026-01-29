import styled, { createGlobalStyle, css } from "styled-components";
import { ColorsEstu, ColorsLogin, Colors } from "./colors";

export const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export const colors = {
  primary: "#fcbf49",
  background: {
    light: "rgba(255, 255, 255, 0.9)",
    dark: "#f0f4f8",
  },
  text: {
    dark: "#1f2937",
    light: "#6b7280",
  },
  accent: {
    red: "#ef4444",
    green: "#10b981",
  },
};

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: start;
`;

export const smoothTransition = css`
  transition: all 0.4s ease-in-out;
`;

export const AppContainer = styled.div`
  ${flexCenter};
  width: 100%;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
`;

export const FotoPerfil = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 20px;
  border-radius: 12px;
`;

export const SidebarWrapper = styled.div`
  width: ${(props) => (props.minimized ? "80px" : "300px")};
  height: 100%;
  background-color: ${colors.background.light};
  backdrop-filter: blur(15px);
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  ${smoothTransition};
  display: flex;
  flex-direction: column;
`;

export const SidebarContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: ${(props) => (props.minimized ? "20px 10px" : "20px")};
  opacity: ${(props) => (props.minimized ? 0 : 1)};
  ${smoothTransition};
  display: ${(props) => (props.minimized ? "none" : "block")};
`;

export const ToggleButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: ${colors.background.dark};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  ${flexCenter};
  cursor: pointer;
  ${smoothTransition};
  z-index: 10;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
    background-color: ${(props) => (props.Colors.primary300)};
    font-weight: 800;
    color: white;
  }
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;
export const Profile = styled.div`
  margin-top: 70px;
  margin-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 15px;
  margin-bottom: 5px;
  border-radius: 10px;
  cursor: pointer;
  ${smoothTransition};
  background-color: ${(props) =>
    props.active ? props.Colors.secundary : "transparent"};
    //////
  color: ${(props) => (props.active ? props.Colors.primary : colors.text.dark)};
  font-weight: ${props => props.active ? '600' : '400'};
  &:hover {
    background-color: ${(props) =>
      props.active ? props.Colors.gray : props.Colors.gray};
  }
`;

export const IconWrapper = styled.div`
  margin-right: 15px;
  opacity: ${(props) => (props.active ? 1 : 0.7)};
`;

export const Badge = styled.span`
  background-color: ${colors.accent.red};
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.7em;
  margin-left: auto;
`;

export const SectionTitle = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${Colors.greyDark};
  font-size: 0.8em;
  margin: 20px 0 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
`;

export const Calen = styled.div`
  color: ${Colors.greyDark};
  cursor: pointer;
  &:hover {
    color: ${(props) => props.Colors.primary};
  }
`;

export const TitleMenu = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${colors.text.light};
  font-size: 0.8em;
  margin: 10px 0px 0px 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;
export const ServiceSection = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 10px;
`;

export const ServiceItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border-radius: 8px;
  ${smoothTransition};

  &:hover {
    background-color: ${colors.background.dark};
  }
`;

export const CreateTaskButton = styled.button`
  //width: calc(100% - 40px);
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 15px;
  background: transparent;
  ${flexCenter};
  cursor: pointer;
  font-weight: bold;
  ${smoothTransition};
  color: ${(props) => (props.Colors.primary)};
  font-size: 16px;
  &:hover {
    color: ${(props) => (props.Colors.primary200)};
    padding-left: 25px;
    transition: 0.5s;
  }
`;
export const CreateTaskButto2 = styled.button`
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 20px;
  left: 15px;
  color: white;
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  ${smoothTransition};
  font-size: 25px;
  &:hover {
    background-color: #ffde59;
  }
`;

export const MinimizedIconContainer = styled.div`
  ${flexCenter};
  flex-direction: column;
  width: 100%;
  padding: 20px 0;
`;
