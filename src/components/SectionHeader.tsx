import { useScrollEntrance } from '@/hooks/useScrollEntrance';

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  light?: boolean;
}

export default function SectionHeader({ label, title, description, light = false }: SectionHeaderProps) {
  const ref = useScrollEntrance<HTMLDivElement>({ y: 20, duration: 0.6 });

  return (
    <div ref={ref} className="text-center mb-12 md:mb-16">
      <span className={`inline-block text-xs font-medium uppercase tracking-[0.1em] mb-4 ${light ? 'text-white/60' : 'text-teal'}`}>
        {label}
      </span>
      <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl leading-tight ${light ? 'text-white' : 'text-text-dark'}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 max-w-2xl mx-auto text-base leading-relaxed ${light ? 'text-white/85' : 'text-text-grey'}`}>
          {description}
        </p>
      )}
    </div>
  );
}
