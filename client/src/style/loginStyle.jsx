import styled from "styled-components";
import { Colors, ColorsLogin } from "./colors";
import FondoForm from "../assets/img/FondoCuatro.png";

export const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
`;

export const ImgForm = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
`;

export const LoginFormContainer = styled.div`
  width: 600px;
  height: 575px;
  display: flex;
  background-image: url(${FondoForm}); 
  background-size: cover; 
  background-repeat: no-repeat;
  background-position: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-right: 300px;
  border-radius: 50px;
  overflow: visible; 
  z-index: 1;
`;

export const LogoContainer = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LogoImage = styled.img`
  width: 100px;
  height: auto;
`;

export const LoginTitle = styled.h1`
  font-size: 30px;
  color: ${ColorsLogin.secondary200};
  margin-bottom: 20px;
  opacity: 0.9;

`;

export const Form = styled.form`
  width: 300px;
  height: 240px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  margin: 10px auto;
  overflow: visible; 
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background: ${Colors.white};
  color: ${Colors.black};
  border: 1px solid ${Colors.white};
  border-radius: 12px;
  outline: none;
  transition: all 0.3s ease;
`;

export const StyledLabel = styled.label`
  position: absolute;
  left: 15px;
  opacity: 0.9;
  top: ${props => (props.active ? '-12px' : '10px')};
  font-size: ${props => (props.active ? '16px' : '16px')};
  color: ${props => (props.active ? ColorsLogin.secondary200 : Colors.black)};
  background: ${Colors.white};
  z-index: 2; 
  padding: 0 5px; 
  border-radius: 12px;
  transition: all 0.3s ease;
  pointer-events: none; 
`;

export const LoginButton = styled.button`
  width: 100%;
  height: 45px;
  background: ${ColorsLogin.secondary200};
  color: ${Colors.white};
  padding: 12px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  opacity: 0.9;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color:${ColorsLogin.secondary200};
    color: ${Colors.white}; 
    transform: scale(1.02);
    opacity: 0.8;
  }
`;