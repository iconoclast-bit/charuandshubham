import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  color: string;
  delay: number;
}

interface Burst {
  id: number;
  x: number;
  y: number;
  particles: Particle[];
}

const colors = ['#FFD700', '#FFA500', '#FF6B6B', '#FFE66D', '#FFAA00'];

const FireworksEffect = ({ isActive }: { isActive: boolean }) => {
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    if (!isActive) {
      setBursts([]);
      return;
    }

    const createBurst = () => {
      const x = 20 + Math.random() * 60;
      const y = 20 + Math.random() * 40;
      const particleCount = 12;
      
      const particles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: 0,
        y: 0,
        angle: (360 / particleCount) * i,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.2,
      }));

      return {
        id: Date.now() + Math.random(),
        x,
        y,
        particles,
      };
    };

    // Initial bursts
    setBursts([createBurst(), createBurst()]);

    const interval = setInterval(() => {
      setBursts(prev => {
        const newBursts = [...prev, createBurst()];
        // Keep only last 5 bursts
        if (newBursts.length > 5) {
          return newBursts.slice(-5);
        }
        return newBursts;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      <AnimatePresence>
        {bursts.map((burst) => (
          <div
            key={burst.id}
            className="absolute"
            style={{
              left: `${burst.x}%`,
              top: `${burst.y}%`,
            }}
          >
            {/* Center glow */}
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-light blur-md"
            />
            
            {/* Particles */}
            {burst.particles.map((particle) => (
              <motion.div
                key={particle.id}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  scale: 1,
                  opacity: 1 
                }}
                animate={{ 
                  x: Math.cos((particle.angle * Math.PI) / 180) * 80,
                  y: Math.sin((particle.angle * Math.PI) / 180) * 80,
                  scale: 0,
                  opacity: 0,
                }}
                transition={{
                  duration: 1,
                  delay: particle.delay,
                  ease: "easeOut",
                }}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: particle.color,
                  boxShadow: `0 0 10px ${particle.color}`,
                }}
              />
            ))}

            {/* Sparkle trails */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  opacity: 1,
                  scale: 1,
                }}
                animate={{ 
                  x: Math.cos((i * 45 * Math.PI) / 180) * 50,
                  y: Math.sin((i * 45 * Math.PI) / 180) * 50 + 20,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.3,
                  ease: "easeOut",
                }}
                className="absolute w-1 h-1 bg-gold-light rounded-full"
              />
            ))}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FireworksEffect;
