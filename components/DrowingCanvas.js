import React, { useState, useRef, useEffect } from 'react';

const DrawingCanvas = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [ctx, setCtx] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.lineWidth = 20;
    context.strokeStyle = '#333';
    context.shadowColor = '#333';
    context.shadowBlur = 5;
    setCtx(context);
  }, []);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDrawing(true);
    const { offsetX, offsetY } = e.nativeEvent;
    setLastX(offsetX);
    setLastY(offsetY);
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    drawLine(lastX, lastY, offsetX, offsetY);
    setLastX(offsetX);
    setLastY(offsetY);
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    setIsDrawing(false);
  };

  const drawLine = (x1, y1, x2, y2) => {
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  };

  const handleClear = (e) => {
    e.preventDefault();
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  return (
    <div className="container">
      <canvas
        ref={canvasRef}
        className="drawing-area"
        height="500"
        width="500"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      />
      <button className="clear-button" type="button" onClick={handleClear}>
        Clear
      </button>
    </div>
  );
};

export default DrawingCanvas;
