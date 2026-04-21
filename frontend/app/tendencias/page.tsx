'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, Award, Zap, Users, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

// --- INTERFACES ---
interface Tecnologia { id: number; nombre: string; }
interface Oferta {
  id: number;
  titulo: string;
  salario_min: number;
  tipo_contrato: string;
  tecnologias: Tecnologia[];
}

export default function Tendencias() {
  const [ofertas, setOfertas] = useState<Oferta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/ofertas');
      if (res.ok) {
        const data = await res.json();
        setOfertas(data.data || data);
      }
    } catch (error) {
      console.error("Error al cargar datos:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- LÓGICA DE PROCESAMIENTO ---

  const getAvgSalary = (techName: string) => {
    const ofertasConTech = ofertas.filter(o => o.tecnologias?.some(t => t.nombre === techName));
    if (ofertasConTech.length === 0) return 0;
    return ofertasConTech.reduce((sum, o) => sum + Number(o.salario_min), 0) / ofertasConTech.length;
  };

  const techCounts = ofertas.reduce((acc: Record<string, number>, oferta) => {
    // Verificación segura de que existen tecnologías
    (oferta.tecnologias || []).forEach(tech => {
      acc[tech.nombre] = (acc[tech.nombre] || 0) + 1;
    });
    return acc;
  }, {});

  const techChartData = Object.entries(techCounts)
    .map(([name, total]) => ({
      name,
      total,
      avgSalary: getAvgSalary(name)
    }))
    .sort((a, b) => {
      if (b.total !== a.total) return b.total - a.total;
      return b.avgSalary - a.avgSalary;
    })
    .slice(0, 10);

  const techSalaries = techChartData.map(tech => ({
    name: tech.name,
    salario: Math.round(tech.avgSalary)
  }));

  const contratoCounts = ofertas.reduce((acc: Record<string, number>, oferta) => {
    acc[oferta.tipo_contrato] = (acc[oferta.tipo_contrato] || 0) + 1;
    return acc;
  }, {});

  const contratoData = Object.entries(contratoCounts).map(([name, value]) => ({ name, value }));

  const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'];

  return (
    <div className="min-h-screen pt-28 pb-12 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl font-black text-gray-900 flex items-center gap-4 tracking-tight">
              <Zap className="text-blue-600 w-12 h-12" /> Market Tendencies
            </h1>
            <p className="text-gray-500 text-xl mt-3 font-medium">
              Análisis basado en <span className="text-blue-600 font-bold">{ofertas.length} posiciones</span>.
            </p>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center h-96">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-blue-600 font-bold animate-pulse text-xs uppercase tracking-widest">Calculando métricas...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* GRÁFICO 1: DEMANDA (GRADIENTE + FIX TOOLTIP) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100"
            >
              <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
                <TrendingUp className="text-blue-500 w-6 h-6" /> Demanda por Skill
              </h2>
              <div className="h-[380px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={techChartData}
                    layout="vertical"
                    margin={{ left: 40, right: 40 }}
                    barGap={10}
                  >
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#1e3a8a" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                    <XAxis type="number" hide />
                    <YAxis
                      dataKey="name"
                      type="category"
                      width={120}
                      axisLine={false}
                      tickLine={false}
                      className="font-bold text-gray-600"
                    />
                    <Tooltip
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                      itemStyle={{ color: '#1e3a8a', fontWeight: 'bold' }}
                      labelStyle={{ marginBottom: '4px', fontWeight: '800' }}
                      formatter={(val: any) => [val, 'Ofertas totales']}
                    />
                    <Bar
                      dataKey="total"
                      fill="url(#barGradient)"
                      radius={[0, 20, 20, 0]}
                      barSize={30}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* GRÁFICO 2: SALARIOS */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100"
            >
              <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
                <Award className="text-emerald-500 w-6 h-6" /> Salario Medio Estimado
              </h2>
              <div className="h-[380px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={techSalaries}>
                    <defs>
                      <linearGradient id="colorSalario" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 700 }} axisLine={false} tickLine={false} />
                    <YAxis hide domain={['dataMin - 2000', 'dataMax + 2000']} />
                    <Tooltip
                      formatter={(val: any) => [
                        `${Number(val).toLocaleString('es-ES')}€`,
                        'Salario Base'
                      ]}
                      contentStyle={{ borderRadius: '20px', border: 'none' }}
                    />
                    <Area type="monotone" dataKey="salario" stroke="#10b981" fillOpacity={1} fill="url(#colorSalario)" strokeWidth={4} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* GRÁFICO 3: CONTRATOS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100"
            >
              <h2 className="text-2xl font-black text-gray-900 mb-2">Contratación</h2>
              <p className="text-gray-400 text-sm mb-8 font-bold uppercase tracking-widest">Distribución de modalidades</p>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={contratoData}
                      innerRadius={80}
                      outerRadius={110}
                      paddingAngle={8}
                      dataKey="value"
                      stroke="none"
                    >
                      {contratoData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '15px' }} />
                    <Legend verticalAlign="bottom" iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* INSIGHTS (SIN HOVER DE ELEVACIÓN) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-200">
                <span className="text-blue-100 text-[10px] font-black uppercase tracking-widest">🏆 Líder del Mercado</span>
                <div className="text-3xl font-black mt-4 flex items-center justify-between">
                  {techChartData[0]?.name || '---'}
                  <ChevronRight className="w-8 h-8 opacity-50" />
                </div>
                <p className="text-blue-100 text-xs mt-4 font-medium italic leading-relaxed">
                  Posicionado como el skill más relevante por volumen de vacantes y compensación.
                </p>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border-2 border-gray-100 shadow-sm">
                <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">💰 Salario Top Skill</span>
                <div className="text-3xl font-black mt-4 text-gray-900">
                  {techSalaries[0]?.salario ? `${techSalaries[0].salario.toLocaleString('es-ES')}€` : '---'}
                </div>
                <p className="text-gray-400 text-xs mt-4 font-medium uppercase tracking-tight">Promedio Anual Entrada</p>
              </div>

              <div className="sm:col-span-2 bg-gray-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-blue-500 p-3 rounded-2xl">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-black italic tracking-tight">Análisis de Oportunidades</h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                    {techChartData[0] ? (
                      <>
                        Detectamos un fuerte interés en <span className="text-white font-bold">{techChartData[0].name}</span>.
                        Actualmente representa el <span className="text-blue-400 font-black">{Math.round((techChartData[0].total / ofertas.length) * 100)}%</span> del mercado analizado.
                      </>
                    ) : "Sin datos suficientes para el análisis."}
                  </p>
                </div>
                <TrendingUp className="absolute -right-10 -bottom-10 w-48 h-48 text-white opacity-5 rotate-12" />
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}