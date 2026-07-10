import React, { useState } from "react";
import {
  LoginContainer, BackgroundImage, LoginFormContainer, LoginTitle, LoginButton,
  LogoImage, LogoContainer, Form, InputWrapper, StyledLabel, StyledInput
} from "../../style/loginStyle.jsx";
import Fondo from "../../assets/img/FondoCinco.png";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../enums/routes/Routes.js";
import { toast } from "sonner";
import { useUser } from "../../context/useContext.jsx";
import { Url } from "../../config.js";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [isActive, setIsActive] = useState(false);
  const [form, setForm] = useState({ correo: "", password: "" });

  const handleFocus = () => setIsActive(true);
  const handleBlur = (e) => setIsActive(Boolean(e.target.value));
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const base = Url.endsWith("/") ? Url.slice(0, -1) : Url;
    const response = await fetch(`${base}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.mensaje || "Error al iniciar sesión");
      return;
    }

    if (data?.token) localStorage.setItem("gt_token", data.token);

    const { mensaje, data: payload } = data;

    if (mensaje === "Inicio de sesión correcto") {
      login(payload);
      toast.success(mensaje);
      navigate(
        payload.rol === "Admin" ? ROUTES.DASHBOARDADMIN : payload.rol === "Director" ? ROUTES.DASHBOARDDI : payload.rol === "Docente" ? ROUTES.DASHBOARDDOCENTE : ROUTES.DASHBOARD
      );
    } else {
      toast.error(mensaje || "Error al iniciar sesión");
    }
  } catch (error) {
    console.error(error);
    toast.error("Error de conexión con el servidor");
  }
};


  return (
    <LoginContainer>
      <BackgroundImage src={Fondo} alt="Imagen de fondo" />
      <LoginFormContainer>
        <LogoContainer>
          <LogoImage src="" alt="" />
        </LogoContainer>
        <LoginTitle>Login</LoginTitle>
        <Form onSubmit={handleSubmit}>
          <InputWrapper>
            <StyledInput
              name="correo"
              value={form.correo}
              onChange={handleChange}
              type="email"
              active={isActive}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
            <StyledLabel active={isActive}>Correo</StyledLabel>
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              active={isActive}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
            <StyledLabel active={isActive}>Contraseña</StyledLabel>
          </InputWrapper>
          <LoginButton type="submit">Ingresar</LoginButton>
        </Form>
      </LoginFormContainer>
    </LoginContainer>
  );
};

export default Login;
