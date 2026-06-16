import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/SectionHeader';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    title: 'El Canto de las Ballenas',
    badge: 'TEMPORADA: JULIO – OCTUBRE',
    image: 'https://hotelcarolinadelmarbahiasolano.com/wp-content/uploads/2024/05/IMG-20240523-WA0025.jpg',
    price: '$1.450.000',
    childPrice: '$1.200.000',
    description: 'A finales de julio comienza un fascinante e increíble espectáculo de la naturaleza. La gigante Ballena Yubarta visita a Bahía Solano como parte de su recorrido desde el sur de Chile hasta Costa Rica, buscando aguas cálidas en temporada de reproducción.',
    includes: [
      'Traslado aeropuerto – hotel – aeropuerto',
      'Alojamiento en habitación Standard',
      'Alimentación completa (desayuno, almuerzo, cena)',
      'Tour "El Canto de las Ballenas" (parada en Playa Huina)',
      'Día de sol en Playa Blanca (Parque Natural Ensenada de Utría)',
      'Tour "El Canto de las Ballenas" (parada en playa Nabugá)',
      'Paseo por el Malecón de Ciudad Mutis',
      'Guía turístico, IVA y Seguro Hotelero',
    ],
  },
  {
    title: 'Playas, Manglares y Esteros',
    badge: 'DISPONIBLE TODO EL AÑO',
    image: 'https://hotelcarolinadelmarbahiasolano.com/wp-content/uploads/2024/05/Paisaje-Playas-El-Almejal-scaled.jpg',
    price: '$1.450.000',
    childPrice: '$1.200.000',
    description: 'Las vacaciones son una oportunidad para disfrutar en familia, buscar la tranquilidad y el arrullo de la naturaleza, conocer otros horizontes y sentir la riqueza cultural del pueblo colombiano.',
    includes: [
      'Traslado aeropuerto – hotel – aeropuerto',
      'Alojamiento en habitación Standard',
      'Alimentación completa (desayuno, almuerzo, cena)',
      'Parque Natural Ensenada de Utría, senderismo y baño de sol',
      'Recorriendo los Manglares del Pacífico en canoas',
      'La Cascada de Nabugá, aguas cristalinas de la serranía',
      'Paseo por el Malecón de Ciudad Mutis',
      'Guía turístico, IVA y Seguro Hotelero',
    ],
  },
];

export default function PlansSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current?.children || [], {
        opacity: 0,
        y: 50,
        duration: 0.7,
        stagger: 0.15,
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
    <section id="planes" ref={sectionRef} className="bg-sand py-20 md:py-24 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <SectionHeader
          label="NUESTROS PLANES"
          title="Vive Bahía Solano al Máximo"
        />

        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className="bg-white rounded-[20px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
            >
              <div className="relative aspect-video">
                <img
                  src={plan.image}
                  alt={plan.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-teal text-white text-[11px] font-medium uppercase tracking-[0.06em] px-3.5 py-1.5 rounded-lg">
                  {plan.badge}
                </div>
              </div>
              <div className="p-8 md:p-9">
                <h3 className="font-display text-2xl md:text-[28px] text-text-dark mb-2">
                  {plan.title}
                </h3>
                <div className="flex flex-wrap items-baseline gap-3 mb-4">
                  <span className="text-lg md:text-xl font-semibold text-teal">
                    {plan.price} COP / persona
                  </span>
                  <span className="text-sm text-text-grey">
                    Niños 5–7 años: {plan.childPrice}
                  </span>
                </div>
                <p className="text-sm text-text-grey leading-relaxed mb-6">
                  {plan.description}
                </p>
                <div className="mb-4">
                  <h4 className="text-xs font-medium uppercase tracking-[0.08em] text-text-dark mb-3">
                    El paquete incluye:
                  </h4>
                  <ul className="space-y-2">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[13px] text-text-grey">
                        <Check size={16} className="text-teal mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-[13px] italic text-text-grey">
                  El plan NO incluye tiquetes aéreos, pero podemos ayudar a tramitarlos.
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a href="#" className="text-sm font-medium text-teal hover:underline transition-all">
            TÉRMINOS Y CONDICIONES
          </a>
        </div>
      </div>
    </section>
  );
}
