import React, { useState } from "react";
import SidebarNavigation from "../../components/sidebar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Toaster } from 'sonner';

export const theme = {
  colors: {
    primary: "#007BFF", 
    secondary: "#6C757D",
    background: "#F8F9FA", // Fondo claro
    content: "#FFFFFF", // Fondo del contenido
    text: {
      light: "#FFFFFF", // Texto claro
      dark: "#212529", // Texto oscuro
    },
  },
};

const Layout = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <Container theme={theme}>
      <SidebarWrapper isExpanded={isSidebarExpanded} theme={theme}>
        <SidebarNavigation
          minimized={!isSidebarExpanded}
          toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)}
        />
        <Toaster richColors position="top-right" />
      </SidebarWrapper>
      <ContentWrapper isExpanded={isSidebarExpanded} theme={theme}>
        <Outlet />
      </ContentWrapper>
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  //background-color: ${({ theme }) => theme.colors.background || "#FFFFFF"};
`;

const SidebarWrapper = styled.div`
  //width: ${({ isExpanded }) => (isExpanded ? "300px" : "100px")};
  transition: width 0.3s ease;
  background-color: ${({ theme }) => theme.colors.sidebar};
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 16px;
  // margin-left: ${({ isExpanded }) => (isExpanded ? "80px" : "100px")};
  transition: margin-left 0.3s ease;
  background-color: ${({ theme }) => theme.colors.content};
  overflow-y: scroll;
`;
