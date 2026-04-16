import { Link } from 'react-router';
import { Briefcase, TrendingUp, Users, ArrowRight, Sparkles, Target, Rocket } from 'lucide-react';
import { motion } from 'motion/react';

export function Home() {
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

  const stats = [
    { value: '150+', label: 'Ofertas Activas' },
    { value: '80+', label: 'Empresas Aliadas' },
    { value: '95%', label: 'Tasa de Inserción' }
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#EFF6FF] via-[#DBEAFE] to-[#EFF6FF] opacity-50" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#2563EB] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-[#1D4ED8] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-[#1E3A8A] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center space-x-2 bg-white rounded-full px-4 py-2 mb-6 shadow-md"
            >
              <Sparkles className="w-5 h-5 text-[#2563EB]" />
              <span className="text-sm font-medium text-[#1E3A8A]">Tu futuro profesional empieza aquí</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-[#111727] mb-6 leading-tight">
              Conectamos{' '}
              <span className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] bg-clip-text text-transparent">
                Talento
              </span>
              {' '}con{' '}
              <span className="bg-gradient-to-r from-[#1D4ED8] to-[#1E3A8A] bg-clip-text text-transparent">
                Oportunidades
              </span>
            </h1>
            
            <p className="text-xl text-[#6B7280] mb-10 max-w-2xl mx-auto">
              Plataforma diseñada para facilitar tu inserción laboral con ofertas exclusivas de empresas locales y análisis de tendencias del mercado.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/ofertas">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center space-x-2"
                >
                  <span>Explorar Ofertas</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/tendencias">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-[#2563EB] px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow border-2 border-[#2563EB]"
                >
                  Ver Tendencias
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-[#DBEAFE]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#111727] mb-4">
              ¿Cómo te ayudamos?
            </h2>
            <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
              Herramientas diseñadas para maximizar tus oportunidades laborales
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-[#EFF6FF] p-8 rounded-2xl border border-[#2563EB]/10 hover:border-[#2563EB]/30 transition-all"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#111727] mb-3">{feature.title}</h3>
                  <p className="text-[#6B7280] leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#EFF6FF] to-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] rounded-3xl p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            </div>
            
            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">
                ¿Eres una empresa?
              </h2>
              <p className="text-xl text-[#DBEAFE] mb-8 max-w-2xl mx-auto">
                Publica tus ofertas de empleo y conecta con talento joven cualificado
              </p>
              <Link to="/empresa">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-[#2563EB] px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow inline-flex items-center space-x-2"
                >
                  <Target className="w-5 h-5" />
                  <span>Publicar Oferta</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
