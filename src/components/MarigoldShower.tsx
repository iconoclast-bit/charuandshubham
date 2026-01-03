import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Marigold {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  type: 'full' | 'petal';
}

const MarigoldShower = ({ isActive }: { isActive: boolean }) => {
  const [marigolds, setMarigolds] = useState<Marigold[]>([]);

  useEffect(() => {
    if (isActive) {
      const newMarigolds: Marigold[] = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 5 + Math.random() * 4,
        size: 20 + Math.random() * 25,
        rotation: Math.random() * 360,
        type: Math.random() > 0.4 ? 'full' : 'petal',
      }));
      setMarigolds(newMarigolds);
    } else {
      setMarigolds([]);
    }
  }, [isActive]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      <AnimatePresence>
        {marigolds.map((marigold) => (
          <motion.div
            key={marigold.id}
            initial={{ 
              y: -80, 
              x: `${marigold.x}vw`, 
              rotate: 0,
              opacity: 0 
            }}
            animate={{ 
              y: '110vh', 
              rotate: marigold.type === 'petal' ? 720 : 360,
              opacity: [0, 1, 1, 0.8, 0],
              x: [
                `${marigold.x}vw`,
                `${marigold.x + 3}vw`,
                `${marigold.x - 3}vw`,
                `${marigold.x + 2}vw`,
                `${marigold.x}vw`,
              ]
            }}
            transition={{
              duration: marigold.duration,
              delay: marigold.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute"
            style={{ 
              width: marigold.size,
              height: marigold.size,
            }}
          >
            {marigold.type === 'full' ? (
              /* Full Marigold Flower */
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                <defs>
                  <radialGradient id={`marigoldCenter-${marigold.id}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#8B4513" />
                    <stop offset="100%" stopColor="#D2691E" />
                  </radialGradient>
                  <radialGradient id={`marigoldPetal-${marigold.id}`} cx="50%" cy="20%" r="80%">
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="40%" stopColor="#FFA500" />
                    <stop offset="100%" stopColor="#FF8C00" />
                  </radialGradient>
                </defs>
                
                {/* Outer petals layer */}
                {[...Array(12)].map((_, i) => (
                  <ellipse
                    key={`outer-${i}`}
                    cx="50"
                    cy="20"
                    rx="12"
                    ry="20"
                    fill={`url(#marigoldPetal-${marigold.id})`}
                    transform={`rotate(${i * 30} 50 50)`}
                  />
                ))}
                
                {/* Middle petals layer */}
                {[...Array(10)].map((_, i) => (
                  <ellipse
                    key={`middle-${i}`}
                    cx="50"
                    cy="28"
                    rx="10"
                    ry="16"
                    fill={`url(#marigoldPetal-${marigold.id})`}
                    transform={`rotate(${i * 36 + 18} 50 50)`}
                  />
                ))}
                
                {/* Inner petals layer */}
                {[...Array(8)].map((_, i) => (
                  <ellipse
                    key={`inner-${i}`}
                    cx="50"
                    cy="35"
                    rx="8"
                    ry="12"
                    fill="#FFB347"
                    transform={`rotate(${i * 45 + 22} 50 50)`}
                  />
                ))}
                
                {/* Center */}
                <circle cx="50" cy="50" r="10" fill={`url(#marigoldCenter-${marigold.id})`} />
              </svg>
            ) : (
              /* Single Petal */
              <svg viewBox="0 0 60 100" className="w-full h-full drop-shadow-sm">
                <defs>
                  <linearGradient id={`petalGrad-${marigold.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="50%" stopColor="#FFA500" />
                    <stop offset="100%" stopColor="#FF8C00" />
                  </linearGradient>
                </defs>
                <ellipse 
                  cx="30" 
                  cy="50" 
                  rx="25" 
                  ry="45" 
                  fill={`url(#petalGrad-${marigold.id})`}
                  transform={`rotate(${marigold.rotation} 30 50)`}
                />
                {/* Petal detail lines */}
                <path 
                  d="M30 10 Q35 50 30 90" 
                  stroke="#D2691E" 
                  strokeWidth="1" 
                  fill="none" 
                  opacity="0.3"
                  transform={`rotate(${marigold.rotation} 30 50)`}
                />
              </svg>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MarigoldShower;
