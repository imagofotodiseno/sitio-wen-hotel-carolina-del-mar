import { useLenis } from '@/hooks/useLenis';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/sections/HeroSection';
import AboutSection from '@/sections/AboutSection';
import ServicesSection from '@/sections/ServicesSection';
import ActivitiesSection from '@/sections/ActivitiesSection';
import PlansSection from '@/sections/PlansSection';
import PhotoGallerySection from '@/sections/PhotoGallerySection';
import VideoGallerySection from '@/sections/VideoGallerySection';
import ContactSection from '@/sections/ContactSection';

export default function App() {
  useLenis();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ActivitiesSection />
        <PlansSection />
        <PhotoGallerySection />
        <VideoGallerySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
