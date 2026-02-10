'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface Tendencia {
  id: number;
  nombre: string;
  descripcion: string;
  demanda_relativa: number;
  tendencia: string;
  categoria: string;
}

export default function Tendencias() {
  const [tendencias, setTendencias] = useState<Tendencia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTendencias();
  }, []);

  const fetchTendencias = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/tendencias');
      if (response.ok) {
        const data = await response.json();
        setTendencias(data.data || data);
      }
    } catch (error) {
      console.error('Error fetching tendencias:', error);
    } finally {
      setLoading(false);
    }
  };

  // Preparar datos para gráficos
  const chartData = tendencias.slice(0, 10).map(t => ({
    name: t.nombre,
    demanda: t.demanda_relativa,
    categoria: t.categoria
  }));

  const categoriaData = tendencias.reduce((acc: any[], t) => {
    const existing = acc.find(item => item.name === t.categoria);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: t.categoria, value: 1 });
    }
    return acc;
  }, []);

  const COLORS = ['#2563eb', '#1d4ed8', '#1e3a8a', '#0369a1', '#0ea5e9'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-2">Tendencias del Mercado</h1>
          <p className="text-xl text-gray-600">Análisis de tecnologías y habilidades más demandadas</p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-4">Cargando tendencias...</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Gráfico de Barras */}
            {chartData.length > 0 && (
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  <span>Tecnologías por Demanda</span>
                </h2>
                
                <div className="w-full h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                        formatter={(value) => `${value}%`}
                      />
                      <Bar dataKey="demanda" fill="#2563eb" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}

            {/* Gráfico de Pastel */}
            {categoriaData.length > 0 && (
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Distribución por Categoría</h2>
                
                <div className="w-full h-96 flex justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoriaData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoriaData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value} tendencias`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}

            {/* Lista de Tendencias */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Todas las Tendencias</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tendencias.map((tendencia, index) => (
                  <motion.div
                    key={tendencia.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{tendencia.nombre}</h3>
                        <span className="inline-block mt-2 bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                          {tendencia.categoria}
                        </span>
                      </div>
                      <div className={`text-2xl font-bold ${tendencia.demanda_relativa > 70 ? 'text-green-600' : tendencia.demanda_relativa > 40 ? 'text-yellow-600' : 'text-orange-600'}`}>
                        {tendencia.demanda_relativa}%
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{tendencia.descripcion}</p>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${tendencia.demanda_relativa > 70 ? 'bg-green-500' : tendencia.demanda_relativa > 40 ? 'bg-yellow-500' : 'bg-orange-500'}`}
                        style={{ width: `${tendencia.demanda_relativa}%` }}
                      ></div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500">
                        Tendencia: <span className="font-semibold text-gray-700">{tendencia.tendencia}</span>
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Insights */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white"
            >
              <h2 className="text-2xl font-bold mb-4">Insights Clave</h2>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-white bg-opacity-20 rounded-full text-sm font-bold">•</span>
                  <span>Las tecnologías backend siguen siendo las más demandadas en el mercado laboral</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-white bg-opacity-20 rounded-full text-sm font-bold">•</span>
                  <span>Frameworks modernos como React y Vue lideran en demanda de frontend</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-white bg-opacity-20 rounded-full text-sm font-bold">•</span>
                  <span>Cloud computing y DevOps tienen crecimiento exponencial en búsquedas</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
