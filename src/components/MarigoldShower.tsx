import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

const MarigoldShower = ({ isActive }: { isActive: boolean }) => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (isActive) {
      const newPetals: Petal[] = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 4 + Math.random() * 3,
        size: 15 + Math.random() * 20,
        rotation: Math.random() * 360,
      }));
      setPetals(newPetals);
    } else {
      setPetals([]);
    }
  }, [isActive]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      <AnimatePresence>
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            initial={{ 
              y: -50, 
              x: `${petal.x}vw`, 
              rotate: 0,
              opacity: 0 
            }}
            animate={{ 
              y: '110vh', 
              rotate: 360,
              opacity: [0, 1, 1, 0],
              x: [
                `${petal.x}vw`,
                `${petal.x + 5}vw`,
                `${petal.x - 5}vw`,
                `${petal.x + 3}vw`,
              ]
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute"
            style={{ 
              width: petal.size,
              height: petal.size,
            }}
          >
            {/* Marigold Petal SVG */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <radialGradient id={`marigold-${petal.id}`} cx="50%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#FFD93D" />
                  <stop offset="50%" stopColor="#FF9F1C" />
                  <stop offset="100%" stopColor="#F77F00" />
                </radialGradient>
              </defs>
              <ellipse 
                cx="50" 
                cy="50" 
                rx="30" 
                ry="45" 
                fill={`url(#marigold-${petal.id})`}
                transform={`rotate(${petal.rotation} 50 50)`}
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MarigoldShower;
