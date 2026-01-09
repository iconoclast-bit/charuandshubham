import HeroSection from '@/components/HeroSection';
import TimelineScroll from '@/components/TimelineScroll';
import FooterSection from '@/components/FooterSection';
import RSVPButton from '@/components/RSVPButton';
import BackgroundMusic from '@/components/BackgroundMusic';
import VenueSection from '@/components/VenueSection';
import PhotoGallery from '@/components/PhotoGallery';

// Import assets
import carnivalImg from '@/assets/carnival.png';
import haldibgImg from '@/assets/haldibg.png';
import haldibg3Img from '@/assets/haldibg-3.png';
import haldi10bgImg from '@/assets/haldi10bg.png';
import sangeetImg from '@/assets/sangeet.png';
import sangeetbgImg from '@/assets/sangeetbg.png';
import tilakbgImg from '@/assets/tilakbg.png';
import weddingbgImg from '@/assets/weddingbg.png';
import haldiMehandiFImg from '@/assets/HaldiMehandiF.png';
import haldiMehandiMImg from '@/assets/HaldiMehandiM.png';

const weddingData = {
  bride: "Charu Srivastava",
  groom: "Shubham Srivastava",
  dates: "11-12 Feb 2026",
  events: [
    {
      name: "Haldi & Mehendi",
      date: "10th Feb 2026",
      time: "2:00 PM",
      location: "Gurjar Bhavan, Sec 16",
      bg: haldi10bgImg,
      effect: 'marigold' as const,
    },
    {
      name: "Tilak",
      date: "11th Feb 2026",
      time: "3:00 PM",
      location: "Kisan Bhavan, Sec 16",
      bg: tilakbgImg,
      effect: 'marigold' as const,
    },
    {
      name: "Sagai & Sangeet",
      date: "11th Feb 2026",
      time: "5:00 PM",
      location: "Kisan Bhavan, Sec 16",
      asset: sangeetImg,
      bg: sangeetbgImg,
      effect: 'fireworks' as const,
    },
    {
      name: "Phoolon ki Haldi",
      date: "12th Feb 2026",
      time: "10:00 AM",
      location: "Kisan Bhavan, Sec 16",
      note: "Theme: Shades of Blue",
      asset: carnivalImg,
      bg: haldibg3Img,
      effect: 'marigold' as const,
    },
    {
      name: "The Wedding",
      date: "12th Feb 2026",
      time: "6:00 PM",
      location: "The Grand Ambience, Fbd-Ggn Road",
      video: "/assets/wedding_video.mp4",
      bg: weddingbgImg,
      effect: 'fireworks' as const,
    },
  ],
};

const Index = () => {
  return (
    <main className="bg-transparent">
      {/* Hero Section */}
      <HeroSection />

      {/* Event Cards with Timeline Scroll */}
      <TimelineScroll events={weddingData.events} />

      {/* Photo Gallery */}
      <PhotoGallery />

      {/* Venue Maps Section */}
      <VenueSection />

      {/* Footer with Countdown */}
      <FooterSection />

      {/* Background Music Control */}
      <BackgroundMusic />

      {/* Floating RSVP Button */}
      <RSVPButton />
    </main>
  );
};

export default Index;
