import { useEffect, useRef } from 'react';
import SectionHeader from '@/components/SectionHeader';
import { useBatchScrollEntrance } from '@/hooks/useScrollEntrance';
import { Waves, Fish, TreePalm, Users, Umbrella, Utensils } from 'lucide-react';

const activities = [
  {
    icon: Waves,
    title: 'Avistamiento de Ballenas',
    desc: 'Realiza un emocionante tour en barco y sé testigo de estos majestuosos mamíferos marinos en su hábitat natural.',
  },
  {
    icon: Fish,
    title: 'Pesca Deportiva',
    desc: 'En Bahía Solano, tendrás la oportunidad de pescar algunas de las especies más codiciadas del Pacífico, como el pez vela, el atún y el dorado.',
  },
  {
    icon: TreePalm,
    title: 'Senderismo en la Selva',
    desc: 'Embárcate en una aventura a través de exuberantes selvas tropicales y descubre la increíble biodiversidad de la región.',
  },
  {
    icon: Users,
    title: 'Visita a Comunidades Locales',
    desc: 'Sumérgete en la cultura y la tradición de las comunidades afrocolombianas que habitan en Bahía Solano.',
  },
  {
    icon: Umbrella,
    title: 'Relajación en la Playa',
    desc: 'No puedes visitar Bahía Solano sin pasar tiempo en sus hermosas playas de arena dorada.',
  },
  {
    icon: Utensils,
    title: 'Gastronomía Local',
    desc: 'No te pierdas la oportunidad de probar la deliciosa cocina del Pacífico en los restaurantes locales.',
  },
];

function drawLeaf(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(size * 0.5, -size * 0.5, size, -size * 0.2, 0, -size);
  ctx.bezierCurveTo(-size, -size * 0.2, -size * 0.5, -size * 0.5, 0, 0);
  ctx.closePath();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.fill();
  ctx.restore();
}

export default function ActivitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardsRef = useBatchScrollEntrance<HTMLDivElement>({
    y: 0,
    scale: 0.95,
    duration: 0.5,
    stagger: 0.08,
  });

  // Nature Particles Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const PARTICLE_COUNT = 35;
    let particles: Array<{
      x: number; y: number; size: number;
      speedY: number; speedX: number;
      rotation: number; rotSpeed: number;
    }> = [];
    let w = 0, h = 0;
    let animationId: number;
    let isVisible = false;

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      w = parent.offsetWidth;
      h = parent.offsetHeight;
      canvas!.width = w;
      canvas!.height = h;
    }

    function createParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: 4 + Math.random() * 8,
          speedY: 0.3 + Math.random() * 0.7,
          speedX: (Math.random() - 0.5) * 0.3,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.02,
        });
      }
    }

    function animate() {
      if (!isVisible) return;
      ctx!.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.2;
        p.rotation += p.rotSpeed;
        if (p.y > h + 15) {
          p.y = -15;
          p.x = Math.random() * w;
        }
        drawLeaf(ctx!, p.x, p.y, p.size, p.rotation);
      }
      animationId = requestAnimationFrame(animate);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          animate();
        } else {
          cancelAnimationFrame(animationId);
        }
      },
      { threshold: 0.1 }
    );

    resize();
    createParticles();
    observer.observe(sectionRef.current!);

    const handleResize = () => {
      resize();
      createParticles();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-teal py-20 md:py-24 lg:py-28 overflow-hidden"
    >
      {/* Nature Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6">
        <SectionHeader
          label="DESCUBRE BAHÍA SOLANO"
          title="Experiencias Inolvidables"
          description="Bahía Solano, ubicada en la costa del Pacífico colombiano, es un paraíso tropical que ofrece una amplia gama de actividades para disfrutar durante tu visita."
          light
        />

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {activities.map((activity) => (
            <div
              key={activity.title}
              className="bg-white/[0.08] border border-white/15 rounded-2xl p-8 md:p-10 text-center hover:bg-white/[0.14] hover:border-white/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex justify-center mb-5">
                <activity.icon size={48} className="text-white" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-xl md:text-[22px] text-white mb-3">
                {activity.title}
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                {activity.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
