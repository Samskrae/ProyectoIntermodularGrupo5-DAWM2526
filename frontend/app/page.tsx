'use client';

import Link from 'next/link';
import { Briefcase, TrendingUp, Users, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
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
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 opacity-50" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="inline-flex items-center space-x-2 bg-white rounded-full px-4 py-2 mb-6 shadow-md"
              variants={itemVariants}
            >
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Tu futuro profesional empieza aquí</span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
              variants={itemVariants}
            >
              Conectamos{' '}
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Talento
              </span>
              {' '}con{' '}
              <span className="bg-gradient-to-r from-blue-800 to-blue-950 bg-clip-text text-transparent">
                Oportunidades
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Plataforma diseñada para facilitar tu inserción laboral con ofertas exclusivas de empresas locales y análisis de tendencias del mercado.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <Link href="/ofertas">
                <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 w-full sm:w-auto hover:scale-105">
                  <span>Explorar Ofertas</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/tendencias">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all border-2 border-blue-600 w-full sm:w-auto hover:scale-105">
                  Ver Tendencias
                </button>
              </Link>
            </motion.div>
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
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-24">
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

      {/* CTA Section */}
      <motion.section 
        className="py-16 bg-gradient-to-r from-blue-600 to-blue-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">¿Listo para empezar?</h2>
          <p className="text-xl text-blue-100 mb-8">Regístrate hoy y accede a las mejores oportunidades laborales</p>
          <Link href="/auth">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-medium hover:bg-gray-100 transition-all hover:scale-105">
              Crear Cuenta
            </button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
