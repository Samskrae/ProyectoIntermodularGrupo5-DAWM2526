import { motion } from 'motion/react';
import { Building2, Target, Users, TrendingUp, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router';

export function RegistroEmpresa() {
  const beneficios = [
    {
      icon: Target,
      title: 'Talento Cualificado',
      description: 'Accede a candidatos con formación actualizada en las últimas tecnologías del mercado.'
    },
    {
      icon: Users,
      title: 'Proceso Simplificado',
      description: 'Sistema de gestión de candidaturas ágil y eficiente para tu empresa.'
    },
    {
      icon: TrendingUp,
      title: 'Sin Coste',
      description: 'Plataforma gratuita para empresas colaboradoras del centro educativo.'
    }
  ];

  const stats = [
    { value: '500+', label: 'Estudiantes Activos' },
    { value: '80+', label: 'Empresas Colaborando' },
    { value: '95%', label: 'Tasa de Éxito' }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden mb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#EFF6FF] via-[#DBEAFE] to-[#EFF6FF] opacity-50" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#2563EB] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-[#1D4ED8] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center space-x-2 bg-white rounded-full px-4 py-2 mb-6 shadow-md"
            >
              <Sparkles className="w-5 h-5 text-[#2563EB]" />
              <span className="text-sm font-medium text-[#1E3A8A]">Portal Exclusivo para Empresas</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-[#111727] mb-6 leading-tight">
              Encuentra el{' '}
              <span className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] bg-clip-text text-transparent">
                Talento
              </span>
              {' '}que Necesitas
            </h1>
            
            <p className="text-xl text-[#6B7280] mb-10 max-w-2xl mx-auto">
              Conecta con estudiantes y alumni cualificados. Publica tus ofertas de empleo de forma gratuita y encuentra al candidato ideal para tu empresa.
            </p>
            
            <Link to="/empresa">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white px-10 py-5 rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center space-x-2 mx-auto"
              >
                <span>Publicar Mi Primera Oferta</span>
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="mb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 text-center shadow-lg border border-[#2563EB]/10"
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-[#6B7280]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="mb-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#111727] mb-4">
              ¿Por qué publicar con nosotros?
            </h2>
            <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
              Ventajas exclusivas para empresas colaboradoras
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {beneficios.map((beneficio, index) => {
              const Icon = beneficio.icon;
              return (
                <motion.div
                  key={beneficio.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-2xl border border-[#2563EB]/10 hover:border-[#2563EB]/30 transition-all"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#111727] mb-3">{beneficio.title}</h3>
                  <p className="text-[#6B7280] leading-relaxed">{beneficio.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="mb-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#111727] mb-4">
              Proceso Simple en 3 Pasos
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              { numero: '1', titulo: 'Crea tu Oferta', descripcion: 'Completa el formulario con los detalles del puesto, requisitos y condiciones.' },
              { numero: '2', titulo: 'Revisión y Publicación', descripcion: 'Nuestro equipo revisa tu oferta y la publica en la plataforma en menos de 24h.' },
              { numero: '3', titulo: 'Recibe Candidaturas', descripcion: 'Los candidatos interesados aplican directamente. Tú decides a quién contactar.' }
            ].map((paso, index) => (
              <motion.div
                key={paso.numero}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-6 bg-white p-6 rounded-2xl border border-[#2563EB]/10"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-white">{paso.numero}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#111727] mb-2">{paso.titulo}</h3>
                  <p className="text-[#6B7280]">{paso.descripcion}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section>
        <div className="max-w-5xl mx-auto px-6">
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
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">
                ¿Listo para encontrar tu próximo talento?
              </h2>
              <p className="text-xl text-[#DBEAFE] mb-8 max-w-2xl mx-auto">
                Únete a las empresas que ya están encontrando candidatos cualificados
              </p>
              <Link to="/empresa">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-[#2563EB] px-10 py-5 rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow inline-flex items-center space-x-2"
                >
                  <span>Comenzar Ahora</span>
                  <ArrowRight className="w-6 h-6" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
