import { useEffect, useRef } from 'react';

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize) + 1;
    const rainDrops: number[] = Array(columns).fill(1).map(() => Math.random() * -100);

    const chars = '01010101010101010101ABCDEFUXSSQLI'.split('');

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00e676';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < rainDrops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;

        // Draw character
        ctx.fillText(text, x, y);

        // Reset to top or update position
        if (y > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        } else {
          rainDrops[i]++;
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-20 pointer-events-none"
      style={{ opacity: 0.18 }}
    />
  );
}
