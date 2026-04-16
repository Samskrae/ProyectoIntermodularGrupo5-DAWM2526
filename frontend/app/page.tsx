'use client';

import Link from 'next/link';
import { Briefcase, TrendingUp, Users, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white overflow-hidden pt-32 pb-24">
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Tagline */}
            <motion.div 
              className="inline-flex items-center space-x-2 bg-white rounded-full px-4 py-2 mb-8 shadow-md"
              variants={itemVariants}
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Tu futuro profesional empieza aquí</span>
            </motion.div>
            
            {/* Main Heading */}
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              variants={itemVariants}
            >
              Conectamos{' '}
              <span className="text-blue-600">Talento</span>
              {' '}con{' '}
              <span className="text-blue-600">Oportunidades</span>
            </motion.h1>
            
            {/* Description */}
            <motion.p 
              className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Plataforma diseñada para facilitar tu inserción laboral con ofertas exclusivas de empresas locales y análisis de tendencias del mercado.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <Link href="/ofertas">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center space-x-2 w-full sm:w-auto">
                  <span>Explorar Ofertas</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/tendencias">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-50 transition-all border-2 border-blue-600 w-full sm:w-auto">
                  Ver Tendencias
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 
            className="text-4xl font-bold text-center text-gray-900 mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            ¿Por qué elegirnos?
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div 
                  key={index} 
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-blue-300"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <Icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section 
        className="py-16 bg-gradient-to-r from-blue-600 to-blue-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              key={0} 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0 * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-white mb-2">150+</div>
              <div className="text-blue-100">Ofertas Activas</div>
            </motion.div>
            <motion.div 
              key={1} 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-white mb-2">80+</div>
              <div className="text-blue-100">Empresas Aliadas</div>
            </motion.div>
            <motion.div 
              key={2} 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2 * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-white mb-2">95%</div>
              <div className="text-blue-100">Tasa de Inserción</div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Final Section */}
      <motion.section 
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Listo para empezar?</h2>
          <p className="text-xl text-gray-600 mb-8">Regístrate hoy y accede a las mejores oportunidades laborales</p>
          <Link href="/auth">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-blue-700 transition-all hover:scale-105">
              Crear Cuenta
            </button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
