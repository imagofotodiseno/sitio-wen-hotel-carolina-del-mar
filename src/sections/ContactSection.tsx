import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/SectionHeader';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');

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
        delay: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  return (
    <section id="contactenos" ref={sectionRef} className="bg-navy py-20 md:py-24 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <SectionHeader
          label="CONTÁCTENOS"
          title="Reserva Tu Experiencia"
          description="Las vacaciones son una oportunidad para disfrutar en familia, para buscar la tranquilidad y el arrullo de la naturaleza, conocer otros horizontes e intercambiar la riqueza cultural del pueblo colombiano."
          light
        />

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mt-12">
          {/* Left - Contact Info */}
          <div ref={leftRef} className="lg:w-[45%]">
            <div>
              <span className="text-sm font-medium uppercase tracking-[0.06em] text-white/50">
                Oficina Principal
              </span>
              <div className="mt-4 flex items-start gap-3">
                <MapPin size={20} className="text-teal mt-1 flex-shrink-0" />
                <p className="text-base text-white leading-[1.8]">
                  Bahía Solano (Chocó, Colombia)<br />
                  Carrera 1 entre calles 3 y 4<br />
                  Barrio El Carmen
                </p>
              </div>
            </div>

            <div className="h-px bg-white/15 my-6" />

            <div>
              <span className="text-sm font-medium uppercase tracking-[0.06em] text-white/50">
                Contáctenos
              </span>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-teal flex-shrink-0" />
                  <p className="text-base text-white">311 397 4930 – 313 728 7687</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-teal flex-shrink-0" />
                  <a href="mailto:hotelcarolinadelmarsas@gmail.com" className="text-base text-teal hover:underline">
                    hotelcarolinadelmarsas@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="h-px bg-white/15 my-6" />

            <div>
              <span className="text-sm font-medium uppercase tracking-[0.06em] text-white/50">
                Síguenos
              </span>
              <div className="mt-4 flex items-center gap-4">
                <a
                  href="https://www.facebook.com/people/Hotel-Carolina-Del-Mar/61556785224331"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/8 border border-white/15 flex items-center justify-center text-white hover:text-teal hover:border-teal/50 transition-colors"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://www.instagram.com/hotelcarolinadelmar_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/8 border border-white/15 flex items-center justify-center text-white hover:text-teal hover:border-teal/50 transition-colors"
                >
                  <Instagram size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div ref={rightRef} className="lg:w-[55%]">
            <div className="bg-white/[0.06] border border-white/12 rounded-2xl p-8 md:p-10">
              {formState === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-teal/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-display text-white mb-2">¡Mensaje Enviado!</h3>
                  <p className="text-white/70 text-sm">Gracias por contactarnos. Te responderemos pronto.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-[0.06em] text-white/50 mb-2">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-white/8 border border-white/15 rounded-lg px-4 py-3 text-white text-[15px] placeholder:text-white/35 focus:outline-none focus:border-teal transition-colors"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-[0.06em] text-white/50 mb-2">
                      Correo electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full bg-white/8 border border-white/15 rounded-lg px-4 py-3 text-white text-[15px] placeholder:text-white/35 focus:outline-none focus:border-teal transition-colors"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-[0.06em] text-white/50 mb-2">
                      Asunto *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-white/8 border border-white/15 rounded-lg px-4 py-3 text-white text-[15px] placeholder:text-white/35 focus:outline-none focus:border-teal transition-colors"
                      placeholder="¿Sobre qué nos quieres contactar?"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-[0.06em] text-white/50 mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full bg-white/8 border border-white/15 rounded-lg px-4 py-3 text-white text-[15px] placeholder:text-white/35 focus:outline-none focus:border-teal transition-colors resize-none"
                      placeholder="Cuéntanos sobre tu estadía ideal..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={formState === 'loading'}
                    className="w-full h-12 bg-teal text-white text-[13px] font-medium uppercase tracking-[0.06em] rounded-lg hover:bg-dark-teal transition-colors disabled:opacity-60"
                  >
                    {formState === 'loading' ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
