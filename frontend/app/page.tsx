'use client';

import Link from 'next/link';
import { Briefcase, TrendingUp, Users, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

// Subcomponente para la animación de números
function Counter({ value }: { value: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000, bounce: 0 });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        (ref.current as HTMLElement).textContent = Math.floor(latest).toString();
      }
    });
  }, [springValue]);

  return <span ref={ref}>0</span>;
}

export default function HomePage() {
  const features = [
    {
      icon: Briefcase,
      title: 'Ofertas Exclusivas',
      description: 'Accede a oportunidades laborales de empresas colaboradoras que confían en nuestro talento.'
    },
    {
      icon: TrendingUp,
      title: 'Tendencias del Mercado',
      description: 'Descubre las tecnologías y habilidades más demandadas mediante análisis de datos en tiempo real.'
    },
    {
      icon: Users,
      title: 'Red de Empresas',
      description: 'Conecta con empresas locales comprometidas con la formación y el desarrollo profesional.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F1F5F9]"> {/* Un tono más bajo que el anterior para que resalten las cards */}
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Tagline Sin Hover */}
            <div className="inline-flex items-center space-x-2 bg-white border border-blue-200 rounded-full px-5 py-2 mb-8 shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600">Tu futuro profesional empieza aquí</span>
            </div>

            {/* Título original recuperado */}
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Conectamos{' '}
              <span className="text-blue-600">Talento</span>
              {' '}con{' '}
              <span className="text-blue-600">Oportunidades</span>
            </h1>

            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
              Plataforma diseñada para facilitar tu inserción laboral con ofertas exclusivas de empresas locales y análisis de tendencias del mercado.
            </p>

            {/* Botones Equilibrados con Diferenciación de Hovers */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/ofertas" className="w-full sm:w-auto">
                <button className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold border-[3px] border-blue-600 shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:border-blue-700 transition-all duration-200 flex items-center justify-center space-x-2 w-full">
                  <span>Explorar Ofertas</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>

              <Link href="/tendencias" className="w-full sm:w-auto">
                <button className="bg-transparent text-blue-600 border-[3px] border-blue-600 px-10 py-4 rounded-xl font-bold hover:bg-blue-600/10 transition-all duration-200 w-full">
                  Ver Tendencias
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Bordes más marcados */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="group bg-white rounded-3xl p-10 shadow-sm border-2 border-gray-200 transition-all hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                    <Icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section - Azul Corporativo en lugar de oscuro */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto bg-blue-600 rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl shadow-blue-600/30">
          <div className="absolute inset-0 opacity-10 bg-white/10 blur-3xl rounded-full -top-1/2" />
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Ofertas Activas', value: 150, suffix: '+' },
              { label: 'Empresas Aliadas', value: 80, suffix: '+' },
              { label: 'Tasa de Inserción', value: 95, suffix: '%' },
            ].map((stat, i) => (
              <div key={i} className="text-center md:border-r last:border-none border-blue-400/50">
                <div className="text-4xl font-extrabold text-white mb-1 flex justify-center items-center">
                  <Counter value={stat.value} />{stat.suffix}
                </div>
                <div className="text-blue-100 font-medium tracking-wide uppercase text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final - Integrado en el tema azul */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white border-2 border-blue-100 rounded-[2.5rem] p-16 shadow-xl"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              ¿Listo para dar el <span className="text-blue-600">salto?</span>
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-xl mx-auto">
              Regístrate hoy y accede a las mejores oportunidades laborales diseñadas para tu perfil.
            </p>

            <Link href="/auth">
              <button className="bg-blue-600 text-white px-12 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all flex items-center space-x-3 mx-auto">
                <span>Crear Cuenta</span>
                <CheckCircle2 className="w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}