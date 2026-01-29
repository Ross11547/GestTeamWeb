import React, { useState, useEffect } from "react";
import { DesktopMenu, MenuLink, Navbar, NavContent } from "./home";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../enums/routes/Routes";
import { Menu, X } from "lucide-react";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Configuración de rutas
  const menuItems = [
    { name: "Inicio", path: "/" },
    { name: "Caracteristicas", path: "/caracteristicas" },
    { name: "Plataformas", path: "/plataformas" },
    { name: "Contacto", path: "/contacto" },
    { name: "Centro de ayuda", path: "/centroAyuda" },
    

  ];

  // Detectar scroll para efecto glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogin = () => {
    navigate(ROUTES.LOGIN);
  };

  return (
    <>
      <StyledNavbar isScrolled={isScrolled}>
        <NavContainer>
          <Logo onClick={() => navigate("/")}>
            <LogoText>GestTeam</LogoText>
          </Logo>

          <DesktopMenuContainer>
            {menuItems.map((item) => (
              <StyledMenuLink
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                isActive={location.pathname === item.path}
              >
                {item.name}
              </StyledMenuLink>
            ))}
          </DesktopMenuContainer>

          {/* Login Button */}
          <ButtonLogin onClick={handleLogin}>
            Iniciar Sesión
          </ButtonLogin>

          {/* Mobile Menu Button */}
          <MobileMenuButton 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </MobileMenuButton>
        </NavContainer>
      </StyledNavbar>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen}>
        <MobileMenuContent>
          {menuItems.map((item) => (
            <MobileMenuItem
              key={item.name}
              onClick={() => handleNavigation(item.path)}
              isActive={location.pathname === item.path}
            >
              {item.name}
            </MobileMenuItem>
          ))}
          <MobileLoginButton onClick={handleLogin}>
            Iniciar Sesión
          </MobileLoginButton>
        </MobileMenuContent>
      </MobileMenu>

      {/* Overlay para cerrar menu móvil */}
      {isMobileMenuOpen && (
        <Overlay onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </>
  );
};

export default Nav;

// Styled Components
const StyledNavbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: ${props => props.isScrolled 
    ? 'rgba(255, 255, 255, 0.95)' 
    : 'rgba(255, 255, 255, 0.1)'};
  backdrop-filter: ${props => props.isScrolled ? 'blur(20px)' : 'blur(5px)'};
  border-bottom: ${props => props.isScrolled 
    ? '1px solid rgba(233, 90, 12, 0.1)' 
    : '1px solid transparent'};
  box-shadow: ${props => props.isScrolled 
    ? '0 4px 20px rgba(0, 0, 0, 0.1)' 
    : 'none'};
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const LogoText = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  color: rgb(233, 90, 12);
  margin: 0;
  background: linear-gradient(135deg, rgb(233, 90, 12), #ef4444);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const DesktopMenuContainer = styled.div`
  display: none;
  gap: 2rem;
  align-items: center;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const StyledMenuLink = styled.button`
  background: none;
  border: none;
  color: ${props => props.isActive ? 'rgb(233, 90, 12)' : '#374151'};
  font-size: 1rem;
  font-weight: ${props => props.isActive ? '600' : '500'};
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: ${props => props.isActive ? '80%' : '0'};
    height: 2px;
    background: rgb(233, 90, 12);
    transition: width 0.3s ease;
  }

  &:hover {
    color: rgb(233, 90, 12);
    background: rgba(233, 90, 12, 0.1);
    transform: translateY(-2px);

    &::after {
      width: 80%;
    }
  }
`;

const ButtonLogin = styled.button`
  background: linear-gradient(135deg, rgb(233, 90, 12), #ef4444);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 10px rgba(233, 90, 12, 0.3);
  display: none;

  @media (min-width: 768px) {
    display: block;
  }

  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 6px 20px rgba(233, 90, 12, 0.4);
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #374151;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;

  @media (min-width: 768px) {
    display: none;
  }

  &:hover {
    background: rgba(233, 90, 12, 0.1);
    color: rgb(233, 90, 12);
    transform: scale(1.1);
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 280px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  z-index: 200;
  transform: translateX(${props => props.isOpen ? '0' : '100%'});
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileMenuContent = styled.div`
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const MobileMenuItem = styled.button`
  background: none;
  border: none;
  color: ${props => props.isActive ? 'rgb(233, 90, 12)' : '#374151'};
  font-size: 1.1rem;
  font-weight: ${props => props.isActive ? '600' : '500'};
  cursor: pointer;
  padding: 1rem;
  border-radius: 0.75rem;
  text-align: left;
  transition: all 0.3s ease;
  background: ${props => props.isActive ? 'rgba(233, 90, 12, 0.1)' : 'transparent'};

  &:hover {
    background: rgba(233, 90, 12, 0.1);
    color: rgb(233, 90, 12);
    transform: translateX(5px);
  }
`;

const MobileLoginButton = styled.button`
  background: linear-gradient(135deg, rgb(233, 90, 12), #ef4444);
  color: white;
  padding: 1rem;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  font-weight: 600;
  margin-top: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 15px rgba(233, 90, 12, 0.4);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 150;
  backdrop-filter: blur(2px);

  @media (min-width: 768px) {
    display: none;
  }
`;