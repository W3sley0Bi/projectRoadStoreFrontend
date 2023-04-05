import React, { useState, useRef, useEffect } from 'react';
import { Modal, useModal, Button, Text } from "@nextui-org/react";

import { Canvas } from './Canvas'
import { ClearCanvasButton } from './ClearCanvasButton';
const DrawingCanvas = (props) => {
  const { setVisible, bindings } = useModal();

  // const canvasRef = useRef(null);
  const [dataImg, setDataURL] = useState(null);

  const Callback = (prop) => {
    const canvas = prop.current
    if(canvas != null ){
    const dataURL = canvas.toDataURL();
    setDataURL(dataURL);   
    }
  };


  return (
<div>

<Button auto flat onPress={() => setVisible(true)}>
  {props.children}
      </Button>
      {/* <canvas style={{backgroundColor: 'white'}} onMouseDown={startDrawing} ontouchstart={startDrawing} onMouseUp={finishDrawing} onTouchEnd={finishDrawing} onMouseMove={draw} ref={canvasRef}/> */}

      <Modal
        fullScreen
        closeButton
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
        
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Sign
          </Text>
        </Modal.Header>
        <Modal.Body style={{margin: 0, height: "100%", overflow: "hidden"}}>
          
          <Canvas dataBack={Callback}/>

      <ClearCanvasButton/>
    
              </Modal.Body>
        <Modal.Footer>
          <Button flat auto color="error" onPress={() => setVisible(false)}>
            Close
          </Button>
          <Button onPress={()=>  {setVisible(false); props.dataBack({dataImg: dataImg, id:props.id})}}>Agree</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DrawingCanvas;

