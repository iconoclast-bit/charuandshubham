import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import flowerImg from '@/assets/flower.jpg';

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
            {/* Flower Image */}
            <img 
              src={flowerImg} 
              alt="Flower petal" 
              className="w-full h-full object-contain"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MarigoldShower;
