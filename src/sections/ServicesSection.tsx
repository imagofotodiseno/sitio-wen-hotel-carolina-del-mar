import { useState } from 'react';
import SectionHeader from '@/components/SectionHeader';
import { useBatchScrollEntrance } from '@/hooks/useScrollEntrance';
import { Utensils, Leaf, Wine, Wifi, Calendar, Clock, ChevronDown } from 'lucide-react';

const rooms = [
  {
    name: 'Fauna Superior',
    tagline: 'Nuestra habitación premium con jacuzzi privado.',
    image: 'https://hotelcarolinadelmarbahiasolano.com/wp-content/uploads/2024/05/DSC_0993-scaled.jpg',
    amenities: ['Cama Doble', 'Baño privado con jacuzzi', 'TV LCD', 'Mini bar', 'Internet Wi-Fi', 'Escritorio para lectura o estudio', 'Aire acondicionado', 'Secador de pelo', 'Cajilla de seguridad', 'Habitaciones completamente insonorizadas', 'Balcón'],
  },
  {
    name: 'Fauna Ejecutiva',
    tagline: 'Confort y elegancia para tu estadía.',
    image: 'https://hotelcarolinadelmarbahiasolano.com/wp-content/uploads/2024/05/Habitacion-Flora-Standard-Doble-scaled.jpg',
    amenities: ['Cama Doble', 'TV LCD', 'Mini bar', 'Internet Wi-Fi', 'Escritorio para lectura o estudio', 'Baño privado', 'Aire acondicionado', 'Secador de pelo', 'Cajilla de seguridad', 'Habitaciones completamente insonorizadas'],
  },
  {
    name: 'Fauna Ejecutiva Doble',
    tagline: 'Espacio ideal para compartir.',
    image: 'https://hotelcarolinadelmarbahiasolano.com/wp-content/uploads/2024/05/DSC_0995-scaled.jpg',
    amenities: ['Dos camas doble', 'TV LCD', 'Mini bar', 'Internet Wi-Fi', 'Baño privado', 'Aire acondicionado', 'Secador de pelo', 'Cajilla de seguridad', 'Habitaciones completamente insonorizadas'],
  },
  {
    name: 'Flora Standard',
    tagline: 'Comodidad esencial con vista a la naturaleza.',
    image: 'https://hotelcarolinadelmarbahiasolano.com/wp-content/uploads/2024/05/Habitacion-Flora-Standard-Triple-scaled.jpg',
    amenities: ['Cama Doble', 'TV LCD', 'Internet Wi-Fi', 'Escritorio para lectura o estudio', 'Baño privado', 'Ventilador', 'Habitaciones completamente insonorizadas'],
  },
  {
    name: 'Flora Standard Doble',
    tagline: 'Perfecta para viajes en grupo.',
    image: 'https://hotelcarolinadelmarbahiasolano.com/wp-content/uploads/2024/05/IMG-20240523-WA0020.jpg',
    amenities: ['Dos camas doble', 'TV LCD', 'Internet Wi-Fi', 'Baño privado', 'Ventilador', 'Habitaciones completamente insonorizadas'],
  },
  {
    name: 'Flora Standard Triple',
    tagline: 'Espacio familiar con camarote.',
    image: 'https://hotelcarolinadelmarbahiasolano.com/wp-content/uploads/2024/05/IMG-20240523-WA0024.jpg',
    amenities: ['Una cama doble y un Camarote', 'TV LCD', 'Internet Wi-Fi', 'Baño privado', 'Aire acondicionado', 'Habitaciones completamente insonorizadas'],
  },
];

const services = [
  {
    icon: Utensils,
    title: 'Restaurante',
    desc: 'Ofrecemos platos característicos de la gastronomía del Pacífico colombiano y los más variados sabores de la tradicional cocina chocoana. Cubrimos eventos sociales, reuniones, banquetes y cumpleaños.',
  },
  {
    icon: Leaf,
    title: 'Plantas Curativas',
    desc: 'Con nosotros conocerás las plantas curativas de la región usadas por sabedores y curanderos para tratar diversas enfermedades, curar mordeduras y alejar energías dañinas.',
  },
  {
    icon: Wine,
    title: 'Bebidas Típicas',
    desc: 'El Viche, el Arrechón y el Curao son bebidas tradicionales del Pacífico a las que se les atribuyen propiedades curativas y afrodisiacas muy apetecidas por viajeros.',
  },
  {
    icon: Wifi,
    title: 'Wi-Fi Starlink',
    desc: 'Contamos con servicio permanente de Internet Satelital Starlink con cobertura en todas las instalaciones del hotel.',
  },
];

export default function ServicesSection() {
  const roomsRef = useBatchScrollEntrance<HTMLDivElement>({
    y: 40,
    duration: 0.6,
    stagger: 0.1,
  });

  const servicesRef = useBatchScrollEntrance<HTMLDivElement>({
    y: 30,
    duration: 0.5,
    stagger: 0.1,
    delay: 0.3,
  });

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [roomType, setRoomType] = useState('Fauna Superior');

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hola, me gustaría solicitar una reserva:\n\n*Fecha:* ${date}\n*Hora:* ${time}\n*Acomodación:* ${roomType}`;
    const url = `https://wa.me/573113974930?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="servicios" className="bg-white py-20 md:py-24 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <SectionHeader
          label="NUESTROS SERVICIOS"
          title="Servicios del Hotel"
          description="El Hotel Carolina del Mar le ofrece renovados espacios para reuniones, banquetes, eventos sociales y excelente hospedaje."
        />

        <div className="mt-16 text-center max-w-4xl mx-auto">
          <h3 className="text-3xl font-display text-text-dark mb-6">HABITACIONES</h3>
          <p className="text-base text-text-grey leading-relaxed">
            Cada habitación es un homenaje a las especies de flora y fauna de nuestra región. Toda ella te conecta a los paisajes, ecosistemas y ciclos vitales de plantas, animales y microorganismos que habitan el inmenso mar o en los estuarios costeros del Pacífico. Mediante un QR podrás informarte sobre toda esta riqueza natural de nuestro territorio narrada por nuestros pescadores artesanales, piangüeras, tejedoras y cuidadores ambientales.
          </p>
        </div>

        {/* Room Cards */}
        <div ref={roomsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {rooms.map((room) => (
            <div
              key={room.name}
              className="bg-sand rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-0 left-0 bg-teal text-white text-[11px] font-medium uppercase tracking-[0.06em] px-3.5 py-1.5 rounded-br-lg">
                  {room.name}
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs text-text-grey mb-3 italic">{room.tagline}</p>
                <ul className="space-y-1">
                  {room.amenities.map((a) => (
                    <li key={a} className="text-[13px] text-text-grey flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-teal mt-2 flex-shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Reserva / Booking Widget */}
        <div className="mt-16 max-w-4xl mx-auto bg-sand p-6 md:p-8 rounded-2xl shadow-sm border border-divider">
          <h4 className="text-xl font-display text-text-dark mb-6 text-center">Reserva tu Habitación</h4>
          <form onSubmit={handleWhatsAppSubmit} className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="block text-[11px] font-medium uppercase tracking-[0.08em] text-text-grey mb-1.5">
                Fecha
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-11 bg-white border border-divider rounded-lg px-3 pr-10 text-sm text-text-dark focus:outline-none focus:border-teal transition-colors"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-grey pointer-events-none" />
              </div>
            </div>

            <div className="flex-1 w-full">
              <label className="block text-[11px] font-medium uppercase tracking-[0.08em] text-text-grey mb-1.5">
                Hora
              </label>
              <div className="relative">
                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full h-11 bg-white border border-divider rounded-lg px-3 pr-10 text-sm text-text-dark focus:outline-none focus:border-teal transition-colors"
                />
                <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-grey pointer-events-none" />
              </div>
            </div>

            <div className="flex-1 w-full">
              <label className="block text-[11px] font-medium uppercase tracking-[0.08em] text-text-grey mb-1.5">
                Tipo de Acomodación
              </label>
              <div className="relative">
                <select
                  required
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full h-11 bg-white border border-divider rounded-lg px-3 pr-8 text-sm text-text-dark focus:outline-none focus:border-teal transition-colors appearance-none"
                >
                  {rooms.map(r => (
                    <option key={r.name} value={r.name}>{r.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-grey pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto h-11 px-7 bg-teal text-white text-[13px] font-medium uppercase tracking-[0.06em] rounded-lg hover:bg-dark-teal hover:-translate-y-px transition-all duration-200 whitespace-nowrap"
            >
              RESERVAR POR WHATSAPP
            </button>
          </form>
        </div>

        {/* Additional Services */}
        <div ref={servicesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {services.map((s) => (
            <div key={s.title} className="flex flex-col items-start p-6 bg-sand rounded-xl">
              <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center mb-4">
                <s.icon size={22} className="text-teal" />
              </div>
              <h4 className="text-base font-medium text-text-dark mb-2">{s.title}</h4>
              <p className="text-[13px] text-text-grey leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
