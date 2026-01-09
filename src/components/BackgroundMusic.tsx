import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';
import bgmusic from '@/assets/bgmusic.mp3';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Manual play failed:", e));
      }
      // Note: We don't set setIsPlaying here manually anymore.
      // We let the onPlay/onPause events handle it for perfect sync.
      setShowPrompt(false);
    }
  };

  useEffect(() => {
    // 1. ATTEMPT AUTO-PLAY ON LOAD
    const attemptAutoPlay = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          // If successful, the onPlay event will update state
        } catch (error) {
          console.log("Auto-play blocked by browser. Waiting for interaction...");
        }
      }
    };
    
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => attemptAutoPlay(), 1000);

    // 2. THE INTERACTION TRAP
    // This function runs on the FIRST tap/scroll anywhere on the site
    const unlockAudio = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => {
            // Success! Remove the traps so we don't keep firing this
            cleanupListeners();
          })
          .catch((e) => {
            // Interaction happened, but browser still said no. Keep listeners active.
            console.log("Interaction unlock failed:", e);
          });
      }
    };

    const cleanupListeners = () => {
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
      document.removeEventListener('scroll', unlockAudio);
      document.removeEventListener('keydown', unlockAudio);
    };

    // Add "Trap" listeners to the entire document
    document.addEventListener('click', unlockAudio);
    document.addEventListener('touchstart', unlockAudio);
    document.addEventListener('scroll', unlockAudio); // Even scrolling counts as interaction now
    document.addEventListener('keydown', unlockAudio);

    // Hide prompt after 15 seconds
    const promptTimer = setTimeout(() => setShowPrompt(false), 15000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(promptTimer);
      cleanupListeners();
    };
  }, []);

  return (
    <>
      {/* AUDIO ELEMENT 
        - We use onPlay/onPause to update state. 
        - This ensures the icon ALWAYS matches reality.
      */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src={bgmusic}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Music Control Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-24 right-6 z-50"
      >
        {/* Prompt Tooltip - Only shows if NOT playing */}
        <AnimatePresence>
          {showPrompt && !isPlaying && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap"
            >
              <div className="bg-background/95 backdrop-blur-md border border-gold/30 rounded-lg px-4 py-2 shadow-gold">
                <p className="text-sm text-foreground flex items-center gap-2">
                  <Music className="w-4 h-4 text-gold" />
                  Tap to play music
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