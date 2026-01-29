import { Excalidraw } from '@excalidraw/excalidraw';
import React from 'react'

const ExcalidrawComponente = () => {
    return (
        <>
            <div style={{width:'100%', height: "100%" }}>
                <Excalidraw isCollaborating={true}/>
            </div>
        </>
    );
}


export default ExcalidrawComponente;