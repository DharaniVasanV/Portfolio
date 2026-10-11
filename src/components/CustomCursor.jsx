import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [sparks, setSparks] = useState([]);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  const lastPos = useRef({ x: 0, y: 0, time: performance.now() });
  const sparkIdCounter = useRef(0);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const manageHover = (e) => {
      const target = e.target;
      const isClickable = target.closest('a') !== null || 
                          target.closest('button') !== null || 
                          target.closest('.clickable-cert') !== null || 
                          target.closest('.tech-card') !== null;
      setIsHovering(isClickable);
    };

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const now = performance.now();
      const dt = now - lastPos.current.time;
      
      if (dt > 16) { 
        const dx = e.clientX - lastPos.current.x;
        const dy = e.clientY - lastPos.current.y;
        const velocity = Math.sqrt(dx * dx + dy * dy) / dt;

        if (velocity > 1.2) { 
          const id = sparkIdCounter.current++;
          
          // Random scatter for spark origin
          const scatterX = (Math.random() - 0.5) * 10;
          const scatterY = (Math.random() - 0.5) * 10;
          
          setSparks(s => [...s, { id, x: e.clientX + scatterX, y: e.clientY + scatterY }].slice(-15));
          
          setTimeout(() => {
            setSparks(s => s.filter(spark => spark.id !== id));
          }, 500); 
        }
        
        lastPos.current = { x: e.clientX, y: e.clientY, time: now };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', manageHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', manageHover);
    };
  }, [mouseX, mouseY]);

  if (window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      <motion.div 
        className="custom-cursor-core"
        style={{ x: mouseX, y: mouseY }}
        animate={{ scale: isHovering ? 2 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div 
        className={`custom-cursor-ring ${isHovering ? 'active' : ''}`}
        style={{ x: ringX, y: ringY }}
      />
      
      {sparks.map(spark => (
        <motion.div
          key={spark.id}
          className="cursor-spark"
          initial={{ x: spark.x, y: spark.y, opacity: 0.8, scale: 1 + Math.random() }}
          animate={{ x: spark.x + (Math.random() - 0.5) * 30, y: spark.y - 30 - Math.random() * 20, opacity: 0, scale: 0 }}
          transition={{ duration: 0.4 + Math.random() * 0.2, ease: "easeOut" }}
        />
      ))}
    </>
  );
}
