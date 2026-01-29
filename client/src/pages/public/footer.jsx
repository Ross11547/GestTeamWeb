import React from "react";

import styled, { keyframes } from "styled-components"
import { useState } from "react"


const FooterContainer = styled.footer`
  width: 100%;
  padding: 50px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background: linear-gradient(to right, #ffffff, #f8f9fa, #ffffff);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 10px;
    background-size: 200% 100%;
  }
`

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 40px;
  }
`

const CompanySection = styled.div`
  flex: 2;
  margin-right: 60px;
  
  @media (max-width: 768px) {
    margin-right: 0;
  }
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  
  img {
    height: 36px;
    width: 36px;
    margin-right: 12px;
    border-radius: 8px;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: rotate(5deg) scale(1.1);
    }
  }
  
  h2 {
    font-size: 20px;
    font-weight: 700;
    color: #000;
    letter-spacing: -0.5px;
  }
`

const CompanyDescription = styled.p`
  color: #555;
  line-height: 1.7;
  font-size: 15px;
  max-width: 350px;
  margin-bottom: 24px;
`

const SocialIcons = styled.div`
  display: flex;
  gap: 18px;
  margin-top: 20px;
`

const SocialIcon = styled.a`
  color: #333;
  transition: all 0.3s ease;
  
  &:hover {
    color: #ec9020;
    transform: translateY(-3px);
  }
  
  svg {
    width: 22px;
    height: 22px;
  }
`

const DownloadSection = styled.div`
  margin-top: 30px;
  
  h3 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 15px;
    color: #000;
  }
`

const DownloadButtons = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`

const DownloadButton = styled.a`
  display: flex;
  align-items: center;
  background: #000;
  color: white;
  border-radius: 8px;
  padding: 8px 16px;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    background: #222;
  }
  
  img {
    height: 20px;
    margin-right: 8px;
  }
  
  .button-text {
    display: flex;
    flex-direction: column;
  }
  
  .small-text {
    font-size: 9px;
    opacity: 0.9;
  }
  
  .big-text {
    font-size: 14px;
    font-weight: 500;
  }
`

const LinksSection = styled.div`
  display: flex;
  flex: 3;
  justify-content: space-between;
  animation-delay: 0.2s;
  animation-fill-mode: both;
  
  @media (max-width: 992px) {
    flex-wrap: wrap;
    gap: 40px;
  }
`

const LinkColumn = styled.div`
  min-width: 160px;
  
  @media (max-width: 480px) {
    min-width: 100%;
    margin-bottom: 30px;
  }
`

const ColumnTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #000;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 30px;
    height: 3px;
    background: #ec9020;
    border-radius: 3px;
  }
`

const LinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const LinkItem = styled.li`
  margin-bottom: 14px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateX(5px);
  }
`

const FooterLink = styled.a`
  color: #555;
  text-decoration: none;
  font-size: 15px;
  transition: color 0.3s ease;
  display: inline-block;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 1px;
    bottom: -2px;
    left: 0;
    background-color: #ec9020;
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: #ec9020;
    
    &::after {
      width: 100%;
    }
  }
`

const BottomFooter = styled.div`
  width:100%;
  height:auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
  padding-top: 25px;
  border-top: 1px solid #eee;
  animation-delay: 0.4s;
  animation-fill-mode: both;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`

const Copyright = styled.p`
width:100%;
  height:auto;
  color: #666;
  font-size: 14px;
  text-align:center;
`

const LegalLinks = styled.div`
  display: flex;
  gap: 30px;
  
  @media (max-width: 480px) {
    flex-wrap: wrap;
    gap: 20px;
  }
`

const LegalLink = styled.a`
  color: #666;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 1px;
    bottom: -2px;
    left: 0;
    background-color: #666;
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: #333;
    
    &::after {
      width: 100%;
    }
  }
`

const NewsletterForm = styled.form`
  margin-top: 20px;
  display: flex;
  max-width: 350px;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`

const EmailInput = styled.input`
  padding: 12px 16px;
  border-radius: 8px 0 0 8px;
  border: 1px solid #ddd;
  flex: 1;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #ec9020;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
  
  @media (max-width: 480px) {
    border-radius: 8px;
    margin-bottom: 10px;
  }
`

const SubscribeButton = styled.button`
  background: #ec9020;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 0 8px 8px 0;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #9b5806;
  }
  
  @media (max-width: 480px) {
    border-radius: 8px;
  }
`

export const Footer = () => {
  const [email, setEmail] = useState("")

  return (
    <FooterContainer>
      <FooterContent>
        <CompanySection>
          <Logo>
            <h2>UNIFRANZ</h2>
          </Logo>
          <CompanyDescription>
            La Universidad Privada Franz Tamayo impulsa el desarrollo académico mediante el uso de tecnología, promoviendo la gestión, organización y seguimiento de los trabajos estudiantiles en un entorno moderno, seguro y accesible.
          </CompanyDescription>




          {/* <DownloadSection>
            <h3>Descarga la aplicación móvil</h3>
            <DownloadButtons>
              <DownloadButton href="#" aria-label="Get it on Google Play">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="button-text">
                  <span className="small-text">DISPONIBLE EN</span>
                  <span className="big-text">Google Play</span>
                </div>
              </DownloadButton>
            </DownloadButtons>
          </DownloadSection> */}
        </CompanySection>

        <LinksSection>
          <LinkColumn>
            <ColumnTitle>Servicios</ColumnTitle>
            <LinksList>
              <LinkItem>
                <FooterLink href="#">Gestión Académica</FooterLink>
              </LinkItem>
              <LinkItem>
                <FooterLink href="#">Seguimiento de Proyectos</FooterLink>
              </LinkItem>
              <LinkItem>
                <FooterLink href="#">Evaluaciones</FooterLink>
              </LinkItem>
              <LinkItem>
                <FooterLink href="#">Actualizaciones</FooterLink>
              </LinkItem>
            </LinksList>
          </LinkColumn>

          <LinkColumn>
            <ColumnTitle>Recursos</ColumnTitle>
            <LinksList>
              <LinkItem>
                <FooterLink href="#">Documentación</FooterLink>
              </LinkItem>
              <LinkItem>
                <FooterLink href="#">Soporte Técnico</FooterLink>
              </LinkItem>
              <LinkItem>
                <FooterLink href="#">Noticias UNIFRANZ</FooterLink>
              </LinkItem>
              <LinkItem>
                <FooterLink href="#">Eventos</FooterLink>
              </LinkItem>
            </LinksList>
          </LinkColumn>

          <LinkColumn>
            <ColumnTitle>Universidad</ColumnTitle>
            <LinksList>
              <LinkItem>
                <FooterLink href="#">Acerca de UNIFRANZ</FooterLink>
              </LinkItem>
              <LinkItem>
                <FooterLink href="#">Carreras</FooterLink>
              </LinkItem>
              <LinkItem>
                <FooterLink href="#">Contacto</FooterLink>
              </LinkItem>
              <LinkItem>
                <FooterLink href="#">Admisión</FooterLink>
              </LinkItem>
            </LinksList>
          </LinkColumn>
        </LinksSection>
      </FooterContent>

      <BottomFooter>
        <Copyright>© 2025 Universidad Privada Franz Tamayo. Todos los derechos reservados.</Copyright>
        {/*         <LegalLinks>
          <LegalLink href="#">Política de Privacidad</LegalLink>
          <LegalLink href="#">Términos de Uso</LegalLink>
        </LegalLinks> */}
      </BottomFooter>
    </FooterContainer>
  )
}

export default Footer
