import { motion } from 'framer-motion';

interface LanternProps {
  style: React.CSSProperties;
  delay: number;
  duration: number;
  size: number;
}

const LanternSVG = ({ size }: { size: number }) => (
  <svg
     width={size}
     height={size * 1.5}
     viewBox="0 0 60 90"
     fill="none"
     xmlns="http://www.w3.org/2000/svg"
     style={{
       filter: 'drop-shadow(0 0 15px rgba(255, 180, 50, 0.8)) drop-shadow(0 0 30px rgba(255, 140, 0, 0.5))'
     }}
  >
    <ellipse cx="30" cy="45" rx="22" ry="30" fill="url(#lanternGradient)" />
    <ellipse cx="30" cy="45" rx="18" ry="25" fill="url(#innerGlow)" />
    <ellipse cx="30" cy="18" rx="12" ry="4" fill="#D4A85A" />
    <ellipse cx="30" cy="17" rx="10" ry="3" fill="#E8C07A" />
    <ellipse cx="30" cy="75" rx="18" ry="6" fill="#C4984A" />
    <ellipse cx="30" cy="74" rx="14" ry="4" fill="#FF8C00" opacity="0.8" />
    <path d="M30 10 L30 5" stroke="#B8986A" strokeWidth="2" strokeLinecap="round" />
    <ellipse cx="30" cy="70" rx="8" ry="4" fill="#FFDD44" opacity="0.9" />
    <defs>
      <radialGradient id="lanternGradient" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#FFCC44" />
        <stop offset="50%" stopColor="#FF9933" />
        <stop offset="100%" stopColor="#E67300" />
      </radialGradient>
      <radialGradient id="innerGlow" cx="0.5" cy="0.6" r="0.5">
        <stop offset="0%" stopColor="#FFEE88" stopOpacity="0.9" />
        <stop offset="60%" stopColor="#FFAA33" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#FF8800" stopOpacity="0.3" />
      </radialGradient>
    </defs>
  </svg>
);

const Lantern = ({ style, delay, duration, size }: LanternProps) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ ...style, zIndex: 30 }}
    initial={{ opacity: 0, y: 80 }}
    animate={{ 
       opacity: [0, 1, 1, 0.9, 1],
      y: [80, 0, -20, -10, -30],
    }}
    transition={{
      duration: duration,
      delay: delay,
      repeat: Infinity,
      repeatType: 'mirror',
      ease: 'easeInOut'
    }}
  >
    <motion.div
      animate={{
        rotate: [-2, 3, -3, 2, -2],
        x: [0, 4, -3, 5, 0]
      }}
      transition={{
        duration: duration * 0.6,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
        delay: delay * 0.5
      }}
    >
      <LanternSVG size={size} />
    </motion.div>
  </motion.div>
);

const FloatingLanterns = () => {
  const lanterns: LanternProps[] = [
    { style: { top: '60%', left: '5%' }, delay: 0, duration: 5, size: 45 }, // Moved down from 5% to 60%
    { style: { top: '8%', right: '10%' }, delay: 0.4, duration: 5.5, size: 50 },
    { style: { top: '15%', left: '8%' }, delay: 0.8, duration: 6, size: 38 },
    { style: { top: '15%', right: '5%' }, delay: 1.2, duration: 5.8, size: 42 },
    { style: { top: '35%', left: '8%' }, delay: 1.6, duration: 6.5, size: 35 },
    { style: { top: '50%', right: '8%' }, delay: 0.6, duration: 5.2, size: 48 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 20 }}>
      {lanterns.map((lantern, index) => (
        <Lantern key={index} {...lantern} />
      ))}
    </div>
  );
};

export default FloatingLanterns;

