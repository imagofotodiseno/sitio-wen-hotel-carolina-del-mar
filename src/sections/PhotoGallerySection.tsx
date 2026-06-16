import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/SectionHeader';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { src: 'https://hotelcarolinadelmarbahiasolano.com/wp-content/uploads/2024/05/Cascada-de-Nabuga-scaled.jpg', alt: 'Cascada de Nabugá' },
  { src: 'https://hotelcarolinadelmarbahiasolano.com/wp-content/uploads/2024/06/Bahia-Solano-Lancha.jpg', alt: 'Bahía Solano - Lancha' },
  { src: 'https://hotelcarolinadelmarbahiasolano.com/wp-content/uploads/2024/05/Paisaje-Ciudad-mutis-noche-1-scaled.jpg', alt: 'Ciudad Mutis de noche' },
  { src: 'https://hotelcarolinadelmarbahiasolano.com/wp-content/uploads/2024/05/IMG-20240523-WA0011.jpg', alt: 'Paisaje de Bahía Solano' },
  { src: 'https://hotelcarolinadelmarbahiasolano.com/wp-content/uploads/2024/05/IMG-20240523-WA0020.jpg', alt: 'Naturaleza del Pacífico' },
  { src: 'https://hotelcarolinadelmarbahiasolano.com/wp-content/uploads/2024/05/IMG-20240523-WA0023.jpg', alt: 'Flora tropical' },
  { src: 'https://hotelcarolinadelmarbahiasolano.com/wp-content/uploads/2024/05/Paisaje-Playas-El-Almejal-scaled.jpg', alt: 'Playa El Almejal' },
  { src: 'https://hotelcarolinadelmarbahiasolano.com/wp-content/uploads/2024/05/IMG-20240523-WA0025.jpg', alt: 'Ballena Yubarta' },
  { src: 'https://hotelcarolinadelmarbahiasolano.com/wp-content/uploads/2024/05/Paisaje-de-la-Bahia-atardecer-scaled.jpg', alt: 'Atardecer en Bahía Solano' },
  { src: 'https://hotelcarolinadelmarbahiasolano.com/wp-content/uploads/2024/05/IMG-20240523-WA0028.jpg', alt: 'Fauna local' },
  { src: 'https://hotelcarolinadelmarbahiasolano.com/wp-content/uploads/2024/06/Imagen-de-WhatsApp-2024-05-29-a-las-23.01.56_3b89fb36.jpg', alt: 'Rana arborícola' },
  { src: 'https://hotelcarolinadelmarbahiasolano.com/wp-content/uploads/2024/06/Imagen-de-WhatsApp-2024-05-29-a-las-23.02.33_b850f67d.jpg', alt: 'Fauna del Pacífico' },
  { src: 'https://hotelcarolinadelmarbahiasolano.com/wp-content/uploads/2024/06/Coco.jpg', alt: 'Coco tropical' },
  { src: 'https://hotelcarolinadelmarbahiasolano.com/wp-content/uploads/2024/05/MG_2946.jpg', alt: 'Paisaje natural' },
  { src: 'https://hotelcarolinadelmarbahiasolano.com/wp-content/uploads/2024/05/MG_3145.jpg', alt: 'Selva tropical' },
  { src: 'https://hotelcarolinadelmarbahiasolano.com/wp-content/uploads/2024/05/MG_3208-scaled.jpg', alt: 'Biodiversidad' },
  { src: 'https://hotelcarolinadelmarbahiasolano.com/wp-content/uploads/2024/05/MG_4049.jpg', alt: 'Naturaleza del Chocó' },
  { src: 'https://hotelcarolinadelmarbahiasolano.com/wp-content/uploads/2024/05/MG_4065.jpg', alt: 'Flora del Pacífico' },
];

export default function PhotoGallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(gridRef.current?.children || [], {
        opacity: 0,
        y: () => 20 + Math.random() * 20,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const goTo = useCallback((dir: number) => {
    setCurrentIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return galleryImages.length - 1;
      if (next >= galleryImages.length) return 0;
      return next;
    });
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goTo(-1);
      if (e.key === 'ArrowRight') goTo(1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, goTo]);

  return (
    <section className="bg-white py-20 md:py-24 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <SectionHeader
          label="GALERÍA"
          title="Bahía Solano en Imágenes"
        />

        {/* Masonry Grid */}
        <div
          ref={gridRef}
          className="columns-1 sm:columns-2 lg:columns-3 gap-3 mt-12"
        >
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="break-inside-avoid mb-3 rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(i)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-auto object-cover group-hover:scale-[1.02] group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-10"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 z-10"
            onClick={(e) => { e.stopPropagation(); goTo(-1); }}
          >
            <ChevronLeft size={40} />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 z-10"
            onClick={(e) => { e.stopPropagation(); goTo(1); }}
          >
            <ChevronRight size={40} />
          </button>
          <img
            src={galleryImages[currentIndex].src}
            alt={galleryImages[currentIndex].alt}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {galleryImages[currentIndex].alt}
          </p>
        </div>
      )}
    </section>
  );
}
