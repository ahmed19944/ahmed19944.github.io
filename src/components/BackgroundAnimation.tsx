import { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface GameElement {
  x: number;
  y: number;
  char: string;
  size: number;
  speed: number;
  opacity: number;
  direction: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elementsRef = useRef<GameElement[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const { theme } = useTheme();

  // Game-related characters and symbols
  const gameChars = ['◆', '▲', '■', '●', '★', '♦', '⌂', '⚡', '◉', '▣'];
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const initElements = () => {
      const elements: GameElement[] = [];
      const elementCount = Math.min(20, Math.floor((canvas.width * canvas.height) / 60000));
      
      for (let i = 0; i < elementCount; i++) {
        elements.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          char: gameChars[Math.floor(Math.random() * gameChars.length)],
          size: Math.random() * 20 + 12,
          speed: Math.random() * 0.3 + 0.1,
          opacity: Math.random() * 0.3 + 0.05,
          direction: Math.random() > 0.5 ? 1 : -1,
        });
      }
      return elements;
    };

    const createParticleBurst = (x: number, y: number) => {
      const burstCount = 20;
      const particles: Particle[] = [];
      
      for (let i = 0; i < burstCount; i++) {
        const angle = (i / burstCount) * Math.PI * 2;
        const speed = 4 + Math.random() * 3;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2,
          life: 1,
          maxLife: 1,
          size: 2 + Math.random() * 2,
          color: 'orange',
        });
      }
      console.log('Burst created with', particles.length, 'particles');
      return particles;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      elementsRef.current = initElements();
    };

    const handleCanvasClick = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      console.log('CLICK DETECTED at:', x, y);
      console.log('Canvas rect:', rect);
      
      const newParticles = createParticleBurst(x, y);
      console.log('Adding', newParticles.length, 'particles');
      particlesRef.current.push(...newParticles);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('click', handleCanvasClick);
    console.log('Window click listener attached');

    const drawIsometricGrid = () => {
      if (!ctx || !canvas) return;

      const time = Date.now() * 0.0003;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Draw perspective grid with vanishing point effect
      const gridSize = 50;
      const depth = 15;

      for (let z = 0; z < depth; z++) {
        const scale = 1 - (z / depth) * 0.8;
        const offsetY = z * 30;
        const baseOpacity = theme === 'dark' ? 0.08 : 0.12;
        const opacity = baseOpacity * (1 - z / depth);
        
        // Horizontal lines (Z depth)
        ctx.strokeStyle = theme === 'dark' 
          ? `rgba(249, 115, 22, ${opacity})` 
          : `rgba(234, 88, 12, ${opacity})`;
        ctx.lineWidth = scale * 1.5;
        
        ctx.beginPath();
        const x1 = centerX - (canvas.width / 2) * scale;
        const x2 = centerX + (canvas.width / 2) * scale;
        const y = centerY - (canvas.height / 4) + offsetY + Math.sin(time + z * 0.5) * 3;
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();
      }

      // Vertical lines (X depth)
      for (let x = -8; x < 8; x++) {
        ctx.strokeStyle = theme === 'dark' 
          ? `rgba(249, 115, 22, ${0.05})` 
          : `rgba(234, 88, 12, ${0.07})`;
        ctx.lineWidth = 1;
        
        ctx.beginPath();
        const x1 = centerX + x * gridSize * 1.5 + Math.sin(time) * 2;
        ctx.moveTo(x1, centerY - canvas.height / 2);
        ctx.lineTo(x1, centerY + canvas.height / 2);
        ctx.stroke();
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear canvas with transparency
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw isometric grid
      drawIsometricGrid();

      // Update and draw particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1; // gravity
        p.life -= 0.02; // faster fade

        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        const alpha = Math.max(0, p.life);
        ctx.globalAlpha = alpha;
        ctx.shadowColor = theme === 'dark' ? 'rgba(249, 115, 22, 1)' : 'rgba(234, 88, 12, 1)';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.fillStyle = theme === 'dark' ? 'rgb(249, 115, 22)' : 'rgb(234, 88, 12)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(2, p.size * alpha), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw and animate game elements
      elementsRef.current.forEach((el) => {
        // Update position - floating movement
        el.y += el.speed * el.direction;
        
        // Gentle horizontal drift
        el.x += Math.sin(Date.now() * 0.001 + el.y * 0.01) * 0.2;

        // Bounce off edges
        if (el.y < -50) {
          el.y = canvas.height + 50;
        } else if (el.y > canvas.height + 50) {
          el.y = -50;
        }
        if (el.x < -50) {
          el.x = canvas.width + 50;
        } else if (el.x > canvas.width + 50) {
          el.x = -50;
        }

        // Draw element with glow effect
        ctx.save();
        
        // Glow
        ctx.shadowColor = theme === 'dark' ? 'rgba(249, 115, 22, 0.5)' : 'rgba(249, 115, 22, 0.3)';
        ctx.shadowBlur = 10;
        
        // Text
        ctx.font = `${el.size}px monospace`;
        ctx.fillStyle = theme === 'dark' 
          ? `rgba(249, 115, 22, ${el.opacity})`
          : `rgba(234, 88, 12, ${el.opacity * 0.8})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(el.char, el.x, el.y);
        
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleCanvasClick);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-auto z-10 cursor-crosshair bg-transparent"
      style={{ opacity: 1 }}
    />
  );
}

