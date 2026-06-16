import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, Facebook, Instagram } from 'lucide-react';
import { getLenis } from '@/hooks/useLenis';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'INICIO', href: '#inicio' },
  { label: 'QUIENES SOMOS', href: '#quienes-somos' },
  { label: 'SERVICIOS', href: '#servicios' },
  { label: 'PLANES', href: '#planes' },
  { label: 'CONTÁCTENOS', href: '#contactenos' },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: '#inicio',
      start: 'bottom top+=64',
      onEnter: () => setIsScrolled(true),
      onLeaveBack: () => setIsScrolled(false),
    });

    return () => { trigger.kill(); };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(href);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 h-16 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/97 backdrop-blur-md border-b border-divider shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => handleNavClick(e, '#inicio')}
            className="flex items-center gap-2"
          >
            <img 
              src={`${import.meta.env.BASE_URL}imagenes/Icono-hotel-carolina-del-mar-bahia-solano.svg`} 
              alt="Hotel Carolina del Mar" 
              className={`h-12 w-auto transition-all duration-300 ${isScrolled ? '' : 'brightness-0 invert'}`} 
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-[13px] font-medium tracking-[0.04em] transition-colors hover:text-teal ${
                  isScrolled ? 'text-text-dark' : 'text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social + Hamburger */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3">
              <a href="https://www.facebook.com/people/Hotel-Carolina-Del-Mar/61556785224331" target="_blank" rel="noopener noreferrer"
                className={`transition-colors hover:text-teal ${isScrolled ? 'text-text-grey' : 'text-white/80'}`}>
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/hotelcarolinadelmar_/" target="_blank" rel="noopener noreferrer"
                className={`transition-colors hover:text-teal ${isScrolled ? 'text-text-grey' : 'text-white/80'}`}>
                <Instagram size={18} />
              </a>
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 transition-colors ${isScrolled ? 'text-text-dark' : 'text-white'}`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 transition-all duration-300 lg:hidden ${
        mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="pt-20 px-6 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="py-3 text-sm font-medium tracking-[0.04em] text-text-dark hover:text-teal border-b border-divider transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-4 mt-6 pt-4 border-t border-divider">
              <a href="https://www.facebook.com/people/Hotel-Carolina-Del-Mar/61556785224331" target="_blank" rel="noopener noreferrer" className="text-text-grey hover:text-teal transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/hotelcarolinadelmar_/" target="_blank" rel="noopener noreferrer" className="text-text-grey hover:text-teal transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
