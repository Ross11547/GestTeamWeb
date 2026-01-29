import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import styled, { keyframes, css } from "styled-components";
import Nav from "./navbar";
import Background from "../../components/ui/backgrount";
import { Platforms } from "./Platforms";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Container>
      <Background />
    </Container>
  );
};

export default Home;
export const pulse = keyframes`
  0%, 100% { 
    opacity: 1;
  }
  50% { 
    opacity: 0.7;
  }
`;

export const bounceIn = keyframes`
  0% { 
    transform: scale(0.8);
    opacity: 0;
  }
  60% { 
    transform: scale(1.02);
    opacity: 1;
  }
  100% { 
    transform: scale(1);
  }
`;

export const scaleIn = keyframes`
  0% { 
    transform: scaleX(0);
    opacity: 0;
  }
  100% { 
    transform: scaleX(1);
    opacity: 1;
  }
`;

export const fadeUp = keyframes`
  0% { 
    transform: translateY(30px);
    opacity: 0;
  }
  100% { 
    transform: translateY(0);
    opacity: 1;
  }
`;

export const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { 
    transform: translateY(0);
  }
  40% { 
    transform: translateY(-15px);
  }
  60% { 
    transform: translateY(-5px);
  }
`;

// Solo animaciones sutiles adicionales
export const slideDown = keyframes`
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const glow = keyframes`
  0%, 100% {
    box-shadow: 0 2px 10px rgba(233, 90, 12, 0.2);
  }
  50% {
    box-shadow: 0 4px 20px rgba(233, 90, 12, 0.4);
  }
`;

export const Container = styled.div`
  width: 100%;
  background: #eceef07c;
`;

export const Particle = styled.div`
  position: absolute;
  animation: ${pulse} 4s infinite;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
`;

export const Navbar = styled.nav`
  width: 100%;
  height: 100px;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 1;
  animation: ${slideDown} 0.8s ease-out;
`;

export const NavContent = styled.div`
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  margin: 20px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 1px 5px 5px #e9e7e7;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 5px 15px 8px rgba(233, 90, 12, 0.1);
  }
`;

export const Logo = styled.div`
  color: #000;
  font-size: 1.5rem;
  font-weight: bold;
  animation: ${fadeUp} 1s ease-out;
  transition: color 0.3s ease;

  &:hover {
    color: rgb(233, 90, 12);
  }
`;

export const DesktopMenu = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
  }
  gap: 50px;
  animation: ${fadeUp} 1s ease-out 0.2s both;
`;

export const MenuLink = styled.a`
  color: #7d7d82;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 0;
    height: 2px;
    background: rgb(233, 90, 12);
    transition: width 0.3s ease;
  }

  &:hover {
    color: rgb(233, 90, 12);
    transform: translateY(-1px);

    &::after {
      width: 100%;
    }
  }
`;

export const MobileMenuButton = styled.button`
  color: white;
  padding: 0.5rem;
  transition: transform 0.2s ease;

  @media (min-width: 768px) {
    display: none;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

export const MobileMenu = styled.div`
  background: rgba(30, 58, 138, 0.95);
  backdrop-filter: blur(12px);
  animation: ${slideDown} 0.3s ease-out;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const MobileMenuLink = styled.a`
  display: block;
  color: white;
  text-align: center;
  padding: 0.75rem 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(30, 64, 175, 0.8);
  }
`;

export const HeroSection = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
`;

export const HeroContent = styled.div`
  text-align: center;
  z-index: 10;
  display: flex;
  flex-direction: column;
`;

export const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  color: #000;
  margin-bottom: 1rem;
  animation: ${bounceIn} 1.2s ease-out;
  transition: all 0.3s ease;

  @media (min-width: 768px) {
    font-size: 6rem;
  }

  &:hover {
    color: rgb(233, 90, 12);
    transform: scale(1.02);
  }
`;

export const HeroDivider = styled.div`
  width: 8rem;
  height: 2px;
  background: linear-gradient(90deg, #ef4444, rgb(233, 90, 12));
  margin: 0 auto;
  animation: ${scaleIn} 1s ease-out 0.3s both;
`;

export const HeroText = styled.p`
  font-size: 1.25rem;
  color: #000;
  margin-bottom: 3rem;
  animation: ${fadeUp} 1s ease-out 0.5s both;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const Button = styled.button`
  width: 10%;
  height: 50px;
  background: ${({ primary }) => (primary ? "rgb(233, 90, 12)" : "white")};
  color: ${({ primary }) => (primary ? "white" : "#1e3a8a")};
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(233, 90, 12, 0.3);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
  animation: ${fadeUp} 1s ease-out 0.7s both;
`;

export const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  animation: ${bounce} 2s infinite;
  z-index: 20;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(-50%) scale(1.1);
  }
`;

export const DecorativeElement = styled.div`
  position: absolute;
  background: ${({ color }) => color};
  border-radius: 50%;
  animation: ${pulse} 3s infinite;
  filter: blur(20px);
`;
