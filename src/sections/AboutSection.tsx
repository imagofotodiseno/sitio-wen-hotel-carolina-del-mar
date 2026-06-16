import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/SectionHeader';
import { Leaf, Utensils, Wifi } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Leaf,
    title: 'Habitaciones temáticas',
    desc: 'Cada habitación es un homenaje a la flora y fauna de nuestra región',
  },
  {
    icon: Utensils,
    title: 'Gastronomía local',
    desc: 'Platos característicos de la cocina del Pacífico colombiano',
  },
  {
    icon: Wifi,
    title: 'Internet Starlink',
    desc: 'Wi-Fi satelital de alta velocidad en todas las instalaciones',
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        opacity: 0,
        x: -30,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });

      gsap.from(rightRef.current, {
        opacity: 0,
        x: 30,
        duration: 0.7,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });

      gsap.from(featuresRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="quienes-somos" ref={sectionRef} className="bg-sand py-20 md:py-24 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <SectionHeader
          label="SOBRE NOSOTROS"
          title="Tu Puerta al Paraíso del Pacífico"
        />

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mt-12">
          {/* Left - Text */}
          <div ref={leftRef} className="lg:w-[55%]">
            <p className="text-base leading-[1.7] text-text-dark/90 mb-5">
              El Hotel Carolina del Mar S.A.S es producto de la juntanza de nativos de la región para ofrecer a sus visitantes una experiencia ecoturística inolvidable. Hemos hecho de sus pasillos, habitaciones y espacios comunes, una expresión de la diversidad natural, gastronómica y cultural del Pacífico colombiano.
            </p>
            <p className="text-base leading-[1.7] text-text-dark/90 mb-5">
              Entrar en nuestras instalaciones es sumergirse en su asombrosa fauna, en su fascinante flora y en sus milenarias tradiciones. El Hotel Carolina del Mar S.A.S, ubicado en el casco urbano, es su mejor opción mientras visita Bahía Solano.
            </p>
            <p className="text-base leading-[1.7] text-text-dark/90 mb-8">
              Su perfecta combinación entre lo moderno y lo tradicional, le garantiza un ambiente familiar, personalizado, cálido y seguro. Su agradable ambiente natural le hará sentir que se encuentra en el corazón de la biodiversidad.
            </p>

            {/* Features */}
            <div ref={featuresRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {features.map((f) => (
                <div key={f.title} className="flex flex-col items-start">
                  <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center mb-3">
                    <f.icon size={20} className="text-teal" />
                  </div>
                  <h4 className="text-sm font-medium text-text-dark mb-1">{f.title}</h4>
                  <p className="text-xs text-text-grey leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Image */}
          <div ref={rightRef} className="lg:w-[45%]">
            <div className="rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
              <img
                src="https://hotelcarolinadelmarbahiasolano.com/wp-content/uploads/2024/05/Imagen-de-WhatsApp-2024-05-23-a-las-12.22.05_56c18828.jpg"
                alt="Hotel Carolina del Mar - Nuestras Instalaciones"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            <p className="text-[13px] text-text-grey mt-3 text-center">
              Nuestras Instalaciones — Bahía Solano, Chocó
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
