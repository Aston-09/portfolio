"use client";

import React, { useEffect, useRef } from "react";

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;

    const mouse = {
      x: -9999,
      y: -9999,
      radius: 150,
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    class Particle {
      x: number;
      y: number;
      directionX: number;
      directionY: number;
      size: number;
      color: string;

      constructor(x: number, y: number, directionX: number, directionY: number, size: number, color: string) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        // Edge bouncing
        if (this.x > canvas!.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas!.height || this.y < 0) {
          this.directionY = -this.directionY;
        }

        // Mouse Anti-Gravity Repel Math
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouse.radius - distance) / mouse.radius;
          const pushX = Math.cos(angle) * force * 5;
          const pushY = Math.sin(angle) * force * 5;
          
          this.x -= pushX;
          this.y -= pushY;
        }

        // Apply constant velocity
        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();
      }
    }

    const init = () => {
      particlesArray = [];
      const numberOfParticles = 100;
      
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 2 + 1; // 1px to 3px radius
        const x = Math.random() * (window.innerWidth - size * 2 - size * 2) + size * 2;
        const y = Math.random() * (window.innerHeight - size * 2 - size * 2) + size * 2;
        const directionX = (Math.random() - 0.5) * 1.5;
        const directionY = (Math.random() - 0.5) * 1.5;
        const color = "#777B7E"; 

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
      }
    };

    const connect = () => {
      if (!ctx) return;
      ctx.lineWidth = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distanceSq = dx * dx + dy * dy;

          if (distanceSq < 10000) {
            const distance = Math.sqrt(distanceSq);
            const opacityValue = 1 - (distance / 100);
            ctx.strokeStyle = `rgba(119, 123, 126, ${opacityValue * 0.8})`; // Connective lines
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!ctx) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
    };

    // Initial setup
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        backgroundColor: "#000000",
        pointerEvents: "none" // Allow clicks to pass through to the page elements
      }}
    />
  );
};

export default ParticleCanvas;
