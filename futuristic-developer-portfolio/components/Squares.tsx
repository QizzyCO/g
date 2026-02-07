
import React, { useRef, useEffect } from 'react';

interface SquaresProps {
  direction?: 'right' | 'left' | 'up' | 'down' | 'diagonal';
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
  className?: string;
}

const Squares: React.FC<SquaresProps> = ({
  direction = 'right',
  speed = 1,
  borderColor = '#999',
  squareSize = 40,
  hoverFillColor = '#222',
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  const numSquaresX = useRef<number>(0);
  const numSquaresY = useRef<number>(0);
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredSquare = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = x - (gridOffset.current.x % squareSize);
          const squareY = y - (gridOffset.current.y % squareSize);

          if (
            hoveredSquare.current &&
            Math.floor((x - startX) / squareSize) === hoveredSquare.current.x &&
            Math.floor((y - startY) / squareSize) === hoveredSquare.current.y
          ) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(squareX, squareY, squareSize, squareSize);
          }

          ctx.strokeStyle = borderColor;
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }

      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
      );
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      // Use a subtle fade out for the grid edges if needed, though the original code implies full coverage or gradient mask
      // The original code sets fillStyle = gradient and fillRect over the whole canvas.
      // This effectively fades the grid out towards the edges if the gradient is set up that way.
      // Based on original code:
      // gradient.addColorStop(0, 'rgba(0, 0, 0, 0)'); 
      // It doesn't seem to add a second stop? The original code might be missing a stop or rely on default?
      // "gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');" makes the center transparent.
      // We need another stop to make the edges opaque or transparent?
      // Usually a radial gradient mask goes from transparent to background color.
      // But the code: ctx.fillStyle = gradient; ctx.fillRect(0,0,w,h);
      // This draws ON TOP of the grid. So center (0) is transparent (visible grid).
      // Edges should probably be the background color to fade it out?
      // The user code didn't provide the second stop in the snippet "gradient.addColorStop(0, 'rgba(0, 0, 0, 0)'); ... ctx.fillStyle = gradient;".
      // I will assume it meant to fade to black or transparent.
      // Let's verify the user snippet. "gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');" is the only line shown in the snippet block before ctx.fillStyle.
      // I'll add a second stop to match the likely intent of a vignette effect, fading to the background color #0a050d
      gradient.addColorStop(1, '#0a050d'); 

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      switch (direction) {
        case 'right':
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          break;
        case 'left':
          gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
          break;
        case 'up':
          gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
          break;
        case 'down':
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        case 'diagonal':
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        default:
          break;
      }

      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      const hoveredSquareX = Math.floor((mouseX + gridOffset.current.x - startX) / squareSize);
      const hoveredSquareY = Math.floor((mouseY + gridOffset.current.y - startY) / squareSize);

      if (
        !hoveredSquare.current ||
        hoveredSquare.current.x !== hoveredSquareX ||
        hoveredSquare.current.y !== hoveredSquareY
      ) {
        hoveredSquare.current = { x: hoveredSquareX, y: hoveredSquareY };
      }
    };

    const handleMouseLeave = () => {
      hoveredSquare.current = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(requestRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize]);

  return (
    <>
      <style>{`
        .squares-canvas {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }
      `}</style>
      <canvas ref={canvasRef} className={`squares-canvas ${className}`}></canvas>
    </>
  );
};

export default Squares;
