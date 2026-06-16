export default function Footer() {
  return (
    <footer className="bg-navy border-t border-white/8 py-8">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px]">
        <p className="text-white/50">
          Copyright © 2025 | HOTEL Carolina del Mar
        </p>
        <a href="#" className="text-white/50 hover:text-teal transition-colors">
          Términos y condiciones
        </a>
        <p className="text-white/50">
          Diseñado con ❤ para el Pacífico
        </p>
      </div>
    </footer>
  );
}
