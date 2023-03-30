import React, { useEffect } from "react";
import { useCanvas } from "./CanvasContext";

export function Canvas() {
  const {
    canvasRef,
    prepareCanvas,
    startDrawing,
    finishDrawing,
    draw,
  } = useCanvas();

  useEffect(() => {
    prepareCanvas();
  }, []);

  return (
    <canvas
      style={{backgroundColor: "white", touchAction: "none"}}
      onPointerDown={startDrawing}
      onPointerUp={finishDrawing}
      onPointerMove={draw}
      ref={canvasRef}
    />
  );
}