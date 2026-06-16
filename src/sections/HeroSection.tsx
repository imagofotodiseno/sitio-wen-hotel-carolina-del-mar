import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Calendar, ChevronDown } from 'lucide-react';
import { getLenis } from '@/hooks/useLenis';

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      videoRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: 'power2.out' }
    )
      .fromTo(
        textRef.current?.children || [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(
        widgetRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.3'
      );

    return () => { tl.kill(); };
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo('#contactenos');
    }
  };

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative min-h-[100dvh] overflow-hidden bg-navy flex items-center justify-center"
      style={{ minHeight: '700px' }}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Fallback image for no-script */}
      <noscript>
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
          alt="Bahía Solano"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      </noscript>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45 z-[1]" />

      {/* Hero Text */}
      <div
        ref={textRef}
        className="absolute z-[2] text-center px-4"
        style={{ top: '18%' }}
      >
        <span className="inline-block text-xs font-medium uppercase tracking-[0.12em] text-white/70 mb-4">
          BAHÍA SOLANO, CHOCÓ
        </span>
        <h1 className="font-display text-white text-[clamp(36px,5.5vw,72px)] leading-[1.1] drop-shadow-lg"
          style={{ textShadow: '0 2px 40px rgba(0,0,0,0.3)' }}>
          Donde el Pacífico<br />Te Espera
        </h1>
        <p className="mt-5 text-[clamp(13px,1.1vw,16px)] text-white/85 max-w-[520px] mx-auto leading-relaxed">
          Hospedaje de lujo en el corazón de la biodiversidad colombiana. Vive la cultura, la naturaleza y la calidez del Pacífico.
        </p>
      </div>


    </section>
  );
}
