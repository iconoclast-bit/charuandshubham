import { motion } from 'framer-motion';

interface Lantern {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

const FloatingLanterns = () => {
  // Create lanterns positioned around the edges like in the reference
  const lanterns: Lantern[] = [
    { id: 1, x: 5, y: 10, size: 40, delay: 0 },
    { id: 2, x: 15, y: 25, size: 35, delay: 0.5 },
    { id: 3, x: 8, y: 45, size: 45, delay: 1 },
    { id: 4, x: 12, y: 65, size: 38, delay: 0.3 },
    { id: 5, x: 85, y: 15, size: 42, delay: 0.7 },
    { id: 6, x: 92, y: 30, size: 36, delay: 0.2 },
    { id: 7, x: 88, y: 50, size: 40, delay: 0.8 },
    { id: 8, x: 95, y: 70, size: 34, delay: 0.4 },
    { id: 9, x: 25, y: 8, size: 32, delay: 1.2 },
    { id: 10, x: 75, y: 12, size: 38, delay: 0.6 },
    { id: 11, x: 45, y: 5, size: 30, delay: 1.5 },
    { id: 12, x: 55, y: 8, size: 36, delay: 0.9 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      {lanterns.map((lantern) => (
        <motion.div
          key={lantern.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: [0, -15, 0],
          }}
          transition={{
            opacity: { duration: 1, delay: lantern.delay },
            y: {
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: lantern.delay,
            }
          }}
          className="absolute"
          style={{
            left: `${lantern.x}%`,
            top: `${lantern.y}%`,
            width: lantern.size,
            height: lantern.size * 1.3,
          }}
        >
          {/* Lantern SVG */}
          <svg viewBox="0 0 50 70" className="w-full h-full drop-shadow-lg">
            <defs>
              <radialGradient id={`lanternGlow-${lantern.id}`} cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#FFE4B5" stopOpacity="1" />
                <stop offset="50%" stopColor="#FFA500" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.8" />
              </radialGradient>
              <filter id={`glow-${lantern.id}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Outer glow */}
            <ellipse cx="25" cy="35" rx="20" ry="28" fill="#FFA500" opacity="0.3" filter={`url(#glow-${lantern.id})`} />
            
            {/* Lantern body */}
            <path 
              d="M10 20 Q10 10 25 8 Q40 10 40 20 L38 55 Q25 60 12 55 Z" 
              fill={`url(#lanternGlow-${lantern.id})`}
              stroke="#D4A574"
              strokeWidth="0.5"
            />
            
            {/* Top cap */}
            <ellipse cx="25" cy="10" rx="8" ry="3" fill="#8B4513" />
            
            {/* Bottom opening */}
            <ellipse cx="25" cy="55" rx="12" ry="4" fill="#FF4500" opacity="0.6" />
            
            {/* Inner glow effect */}
            <ellipse cx="25" cy="35" rx="12" ry="18" fill="#FFFFE0" opacity="0.4" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingLanterns;
