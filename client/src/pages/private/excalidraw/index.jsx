import React from 'react'
import styled from 'styled-components';
import ExcalidrawComponente from '../../../components/excalidraw';

const Excalidraw = () => {
    return (
        <ExcalidrawContainer>
            <ExcalidrawComponente />
        </ExcalidrawContainer>
    )
}

export default Excalidraw

const ExcalidrawContainer = styled.div`
  height: 100vh;
  margin-top: 1rem;
  background-color: #feffdc;
  border-radius: 1rem;
`;