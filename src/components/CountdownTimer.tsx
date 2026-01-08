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
    const displayValue = value.toString().padStart(2, '0');
    
    return (
      <div className="flex flex-col items-center">
        {/* Modern Trendy Card Design */}
        <div className="relative">
          {/* Outer Glow Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/30 via-gold/20 to-gold/30 rounded-2xl blur-sm opacity-50" />
          
          {/* Main Card */}
          <div className="relative bg-gradient-to-br from-background/40 via-background/30 to-background/20 backdrop-blur-2xl border border-gold/40 rounded-2xl px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6 shadow-xl">
            {/* Number Display - Large and Bold */}
            <div className="text-center">
              <span className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gold block leading-none" style={{ textShadow: '0 2px 12px rgba(212, 175, 55, 0.4)' }}>
                {displayValue}
              </span>
            </div>
          </div>
        </div>

        {/* Label - Clean Typography */}
        <span className="mt-3 sm:mt-4 font-body text-xs sm:text-sm md:text-base text-cream/80 uppercase tracking-widest font-light">
          {label}
        </span>
      </div>
    );
  };

  const Separator = () => (
    <div className="flex items-center justify-center mx-2 sm:mx-3 md:mx-4">
      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gold rounded-full" />
    </div>
  );

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-4 md:gap-6 lg:gap-8 flex-wrap">
      <TimeBlock value={timeLeft.days} label="Days" index={0} />
      <Separator />
      <TimeBlock value={timeLeft.hours} label="Hours" index={1} />
      <Separator />
      <TimeBlock value={timeLeft.minutes} label="Minutes" index={2} />
      <Separator />
      <TimeBlock value={timeLeft.seconds} label="Seconds" index={3} />
    </div>
  );
};

export default CountdownTimer;