import React from "react";
import Logo from "../../assets/img/headerPort.svg";
import {
  BackgroundIllustration,
  Header,
  HeaderContent,
  HeaderTitle,
  ImgLogo,
  Parrafo,
  Title,
} from "../../style/estudiante/materiasStyled.jsx";
import { useColors } from "../../style/colors.jsx";

const CardHeader = ({ title, parrafo, children }) => {
  const ColorsCard=useColors();
  return (
    <Header ColorsCard={ColorsCard}>
      <HeaderTitle>
        <Title>{title}</Title>
        <Parrafo>{parrafo}</Parrafo>
      </HeaderTitle>
      <HeaderContent>{children}</HeaderContent>
      <BackgroundIllustration>
        <ImgLogo src={Logo}  />
      </BackgroundIllustration>
    </Header>
  );
};

export default CardHeader;
