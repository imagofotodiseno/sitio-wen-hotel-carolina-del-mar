import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const videos = [
  {
    title: 'Hotel Carolina Del Mar Bahía Solano',
    id: 'hotel-intro',
    thumbnail: 'https://hotelcarolinadelmarbahiasolano.com/wp-content/uploads/2024/05/Paisaje-de-la-Bahia-noche-3-scaled.jpg',
  },
  {
    title: 'Lugares de Bahía Solano',
    id: 'lugares',
    thumbnail: 'https://hotelcarolinadelmarbahiasolano.com/wp-content/uploads/2024/05/Paisaje-de-la-Bahia-atardecer-scaled.jpg',
  },
  {
    title: 'Nuestras comodidades',
    id: 'comodidades',
    thumbnail: 'https://hotelcarolinadelmarbahiasolano.com/wp-content/uploads/2024/05/DSC_0993-scaled.jpg',
  },
  {
    title: 'Nuestros espacios',
    id: 'espacios',
    thumbnail: 'https://hotelcarolinadelmarbahiasolano.com/wp-content/uploads/2024/05/DSC_0995-scaled.jpg',
  },
];

export default function VideoGallerySection() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string>('');
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(gridRef.current?.children || [], {
        opacity: 0,
        scale: 0.95,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const openVideo = (videoId: string) => {
    setActiveVideo(videoId);
    setVideoModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    setVideoModalOpen(false);
    setActiveVideo('');
    document.body.style.overflow = '';
  };

  useEffect(() => {
    if (!videoModalOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeVideo();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [videoModalOpen]);

  return (
    <section className="bg-sand py-14 md:py-16">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-medium uppercase tracking-[0.1em] text-teal mb-3">
            VIDEOS
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-text-dark">
            Conoce Más Sobre Nosotros
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group cursor-pointer"
              onClick={() => openVideo(video.id)}
            >
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play size={24} className="text-teal ml-1" fill="#0B7A75" />
                  </div>
                </div>
              </div>
              <h4 className="mt-3 text-sm font-medium text-text-dark text-center">
                {video.title}
              </h4>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {videoModalOpen && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={closeVideo}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-10"
            onClick={closeVideo}
          >
            <X size={32} />
          </button>
          <div
            className="w-[90vw] max-w-4xl aspect-video rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube-nocookie.com/embed?playlist=${activeVideo === 'hotel-intro' ? 'dQw4w9WgXcQ' : activeVideo === 'lugares' ? 'dQw4w9WgXcQ' : activeVideo === 'comodidades' ? 'dQw4w9WgXcQ' : 'dQw4w9WgXcQ'}&autoplay=1&rel=0`}
              title="Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
