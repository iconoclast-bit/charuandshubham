import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';
import bgmusic from '@/assets/bgmusic.mp3';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showPrompt, setShowPrompt] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
      setShowPrompt(false);
    }
  };

  useEffect(() => {
    // Auto-play music on mount
    const playMusic = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          // Autoplay was prevented, user interaction required
          setIsPlaying(false);
          console.log('Autoplay prevented, user interaction required');
        }
      }
    };

    // Small delay to ensure audio element is ready
    const timer = setTimeout(() => {
      playMusic();
    }, 500);

    // Hide prompt after 10 seconds
    const promptTimer = setTimeout(() => setShowPrompt(false), 10000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(promptTimer);
    };
  }, []);

  return (
    <>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src={bgmusic}
      />

      {/* Music Control Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-24 right-6 z-50"
      >
        {/* Prompt Tooltip */}
        <AnimatePresence>
          {showPrompt && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap"
            >
              <div className="bg-background/95 backdrop-blur-md border border-gold/30 rounded-lg px-4 py-2 shadow-gold">
                <p className="text-sm text-foreground flex items-center gap-2">
                  <Music className="w-4 h-4 text-gold" />
                  Click to play music
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Control Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleMusic}
          className={`
            w-14 h-14 rounded-full shadow-lg flex items-center justify-center
            transition-all duration-300
            ${isPlaying 
              ? 'bg-gradient-gold text-primary-foreground' 
              : 'bg-background/90 backdrop-blur-md border border-gold/30 text-gold hover:bg-gold/10'
            }
          `}
        >
          {isPlaying ? (
            <Volume2 className="w-6 h-6" />
          ) : (
            <VolumeX className="w-6 h-6" />
          )}
        </motion.button>

        {/* Animated Ring when playing */}
        {isPlaying && (
          <motion.div
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 rounded-full border-2 border-gold pointer-events-none"
          />
        )}
      </motion.div>
    </>
  );
};

export default BackgroundMusic;
