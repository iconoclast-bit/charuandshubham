import HeroSection from '@/components/HeroSection';
import EventCard from '@/components/EventCard';
import FamilyCredits from '@/components/FamilyCredits';
import FooterSection from '@/components/FooterSection';
import RSVPButton from '@/components/RSVPButton';
import BackgroundMusic from '@/components/BackgroundMusic';
import VenueSection from '@/components/VenueSection';
import PhotoGallery from '@/components/PhotoGallery';

// Import assets
import carnivalImg from '@/assets/carnival.png';
import haldibgImg from '@/assets/haldibg.png';
import sangeetImg from '@/assets/sangeet.png';
import sangeetbgImg from '@/assets/sangeetbg.png';
import weddingbgImg from '@/assets/weddingbg.png';

const weddingData = {
  bride: "Charu Srivastava",
  groom: "Shubham Srivastava",
  dates: "10-12 Feb 2026",
  events: [
    {
      name: "Haldi & Mehendi",
      date: "10th Feb 2026",
      time: "2:00 PM",
      location: "Gurjar Bhavan, Sec 16 & Sec 49 (Home)",
      asset: carnivalImg,
      bg: haldibgImg,
      effect: 'marigold' as const,
    },
    {
      name: "Tilak",
      date: "11th Feb 2026",
      time: "3:00 PM",
      location: "Kisan Bhavan, Sec 16",
      bg: haldibgImg,
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
      bg: weddingbgImg,
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
    <main className="bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Event Cards with Sticky Scroll */}
      <section className="relative">
        {weddingData.events.map((event, index) => (
          <EventCard
            key={event.name}
            event={event}
            backgroundImage={event.bg}
            foregroundImage={event.asset}
            video={event.video}
            index={index}
            effect={event.effect}
            totalCards={weddingData.events.length}
          />
        ))}
      </section>

      {/* Venue Maps Section */}
      <VenueSection />

      {/* Photo Gallery */}
      <PhotoGallery />

      {/* Family Credits */}
      <FamilyCredits />

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
