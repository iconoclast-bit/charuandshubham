import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex flex-col items-center"
    >
      <div className="relative">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-gold rounded-lg flex items-center justify-center shadow-gold">
          <span className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground">
            {value.toString().padStart(2, '0')}
          </span>
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gold-light rounded-full animate-pulse" />
      </div>
      <span className="mt-2 font-body text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
    </motion.div>
  );

  return (
    <div className="flex items-center justify-center gap-4 md:gap-6">
      <TimeBlock value={timeLeft.days} label="Days" />
      <span className="font-display text-3xl text-gold mt-[-1.5rem]">:</span>
      <TimeBlock value={timeLeft.hours} label="Hours" />
      <span className="font-display text-3xl text-gold mt-[-1.5rem]">:</span>
      <TimeBlock value={timeLeft.minutes} label="Minutes" />
      <span className="font-display text-3xl text-gold mt-[-1.5rem]">:</span>
      <TimeBlock value={timeLeft.seconds} label="Seconds" />
    </div>
  );
};

export default CountdownTimer;
