import React, { useState, useRef, useEffect } from 'react';
import { Modal, useModal, Button, Text } from "@nextui-org/react";

import { Canvas } from './Canvas'
import { ClearCanvasButton } from './ClearCanvasButton';
const DrawingCanvas = () => {
  const { setVisible, bindings } = useModal();

  return (
<div>
<Button auto flat onPress={() => setVisible(true)}>
  Sign
      </Button>
      {/* <canvas style={{backgroundColor: 'white'}} onMouseDown={startDrawing} ontouchstart={startDrawing} onMouseUp={finishDrawing} onTouchEnd={finishDrawing} onMouseMove={draw} ref={canvasRef}/> */}

      <Modal
        scroll
        fullScreen
        closeButton
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            ashdjkashdhakjhdjsahjas
          </Text>
        </Modal.Header>
        <Modal.Body>
          {/*  id="modal-description"*/}
          <Canvas/>
      <ClearCanvasButton/>
      
              </Modal.Body>
        <Modal.Footer>
          <Button flat auto color="error" onPress={() => setVisible(false)}>
            Close
          </Button>
          {/* <Button onPress={() => setVisible(false)}>Agree</Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DrawingCanvas;
