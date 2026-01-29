import React from "react";
import Home from "./home";
import Nav from "./navbar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Footer from "./footer";

const LayoutI = () => {
  return (
    <div>
      <Nav />
      <DivOutle>
        <Outlet />
      </DivOutle>
      <Footer />
    </div>
  );
};

export default LayoutI;
const DivOutle = styled.div`
  width: 100vw;
  height: 100%;
`;
