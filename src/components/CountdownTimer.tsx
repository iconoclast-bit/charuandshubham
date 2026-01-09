import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const weddingDate = new Date('2026-02-12T18:00:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimeBlock = ({ value, label, index }: { value: number; label: string; index: number }) => {
    const digits = value.toString().padStart(2, '0').split('');
    
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        whileInView={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="flex flex-col items-center"
      >
        <div className="relative group">
          {/* Glow Effect */}
          <div className="absolute -inset-2 bg-gold/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Card Container */}
          <div className="relative flex gap-1">
            {digits.map((digit, digitIndex) => (
              <div
                key={digitIndex}
                className="relative w-10 h-14 md:w-14 md:h-20 perspective-1000"
              >
                {/* Glass Card */}
                <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border border-gold/30 rounded-xl overflow-hidden">
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent" />
                  
                  {/* Top Reflection */}
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-cream/10 to-transparent" />
                  
                  {/* Number with Flip Animation */}
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={digit}
                      initial={{ rotateX: -90, opacity: 0 }}
                      animate={{ rotateX: 0, opacity: 1 }}
                      exit={{ rotateX: 90, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="absolute inset-0 flex items-center justify-center font-heading text-2xl md:text-4xl font-bold text-cream"
                    >
                      {digit}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>

          {/* Floating Particles */}
          <motion.div
            className="absolute -top-1 -right-1 w-2 h-2 bg-gold rounded-full"
            animate={{ 
              y: [-2, -8, -2],
              opacity: [0.5, 1, 0.5],
              scale: [0.8, 1, 0.8]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
          />
        </div>

        {/* Label */}
        <motion.span 
          className="mt-3 font-body text-xs md:text-sm text-cream/70 uppercase tracking-[0.2em]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 + index * 0.1 }}
          viewport={{ once: true }}
        >
          {label}
        </motion.span>
      </motion.div>
    );
  };

  const Separator = ({ index }: { index: number }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
      viewport={{ once: true }}
      className="flex flex-col gap-2 mx-1 md:mx-3 mt-[-1rem]"
    >
      <motion.div 
        className="w-2 h-2 bg-gold rounded-full"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
      />
      <motion.div 
        className="w-2 h-2 bg-gold rounded-full"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 + index * 0.2 }}
      />
    </motion.div>
  );

  return (
    <div className="flex items-start justify-center gap-2 md:gap-4">
      <TimeBlock value={timeLeft.days} label="Days" index={0} />
      <Separator index={0} />
      <TimeBlock value={timeLeft.hours} label="Hours" index={1} />
      <Separator index={1} />
      <TimeBlock value={timeLeft.minutes} label="Minutes" index={2} />
      <Separator index={2} />
      <TimeBlock value={timeLeft.seconds} label="Seconds" index={3} />
    </div>
  );
};

export default CountdownTimer;