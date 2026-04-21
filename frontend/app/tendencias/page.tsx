'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, Award, Users, Star } from 'lucide-react';
import { motion } from 'framer-motion';

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
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- PROCESAMIENTO DE DATOS ---
  const techStats = ofertas.reduce((acc: Record<string, { total: number, sumaSalario: number }>, oferta) => {
    (oferta.tecnologias || []).forEach(tech => {
      if (!acc[tech.nombre]) acc[tech.nombre] = { total: 0, sumaSalario: 0 };
      acc[tech.nombre].total += 1;
      acc[tech.nombre].sumaSalario += Number(oferta.salario_min);
    });
    return acc;
  }, {});

  const rankingData = Object.entries(techStats).map(([name, stats]) => ({
    name,
    total: stats.total,
    avgSalary: Math.round(stats.sumaSalario / stats.total),
    score: stats.total * (stats.sumaSalario / stats.total)
  }));

  const topDemand = [...rankingData].sort((a, b) => b.total - a.total).slice(0, 8);
  const topRelevance = [...rankingData].sort((a, b) => b.score - a.score);
  const liderMercado = topRelevance[0];

  const contratoData = Object.entries(
    ofertas.reduce((acc: Record<string, number>, o) => {
      acc[o.tipo_contrato] = (acc[o.tipo_contrato] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'];

  return (
    <div className="min-h-screen pt-28 pb-12 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header - Tendencias CT */}
        <div className="mb-14">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-block">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                Tendencias CT
              </h1>
              {/* Línea que cubre exactamente el ancho del texto */}
              <div className="h-1.5 w-full bg-blue-600 mt-1 rounded-full"></div>
            </div>
            <p className="text-gray-500 text-lg mt-4 font-medium italic">
              Análisis estadístico basado en {ofertas.length} registros.
            </p>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-96 text-gray-400 font-medium">Cargando base de datos estadística...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* GRÁFICO 1: MÁXIMA DEMANDA */}
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                <TrendingUp className="text-blue-600 w-5 h-5" /> Máxima Demanda
              </h2>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topDemand} layout="vertical" margin={{ left: 30, right: 30 }}>
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#1e40af" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={100} axisLine={false} tickLine={false} className="font-bold text-gray-600" />
                    <Tooltip
                      cursor={{ fill: '#f1f5f9', opacity: 0.4 }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white px-3 py-1 shadow-md border border-gray-100 rounded-lg text-sm font-bold text-blue-700">
                              {payload[0].value}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="total" fill="url(#barGradient)" radius={[0, 12, 12, 0]} barSize={26} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* GRÁFICO 2: MEDIA SALARIAL */}
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                <Award className="text-emerald-600 w-5 h-5" /> Media Salarial
              </h2>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={topDemand}>
                    <defs>
                      <linearGradient id="colorSalario" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 700 }} axisLine={false} tickLine={false} />
                    <YAxis hide domain={['auto', 'auto']} />
                    <Tooltip
                      formatter={(val: any) => [`${Number(val).toLocaleString('es-ES')}€`]}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    />
                    <Area type="monotone" dataKey="avgSalary" stroke="#059669" fill="url(#colorSalario)" strokeWidth={4} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* GRÁFICO 3: CONTRATACIÓN */}
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Contratación</h2>
              <p className="text-gray-400 text-xs mb-8 uppercase font-bold tracking-widest">Distribución por modalidad</p>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={contratoData} innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="value" stroke="none">
                      {contratoData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px' }} />
                    <Legend verticalAlign="bottom" iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* INSIGHTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-blue-700 p-8 rounded-[3rem] text-white shadow-2xl">
                <span className="text-blue-200 text-[10px] font-bold uppercase tracking-widest">Líder por Relevancia</span>
                <div className="text-3xl font-black mt-4 flex items-center justify-between">
                  {liderMercado?.name || '---'}
                  <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                </div>
                <p className="text-blue-100 text-xs mt-4 leading-relaxed opacity-80">
                  Máximo equilibrio detectado entre demanda activa y nivel salarial.
                </p>
              </div>

              <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-xl">
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Retribución Media Líder</span>
                <div className="text-3xl font-black mt-4 text-gray-900">
                  {liderMercado?.avgSalary ? `${liderMercado.avgSalary.toLocaleString('es-ES')}€` : '---'}
                </div>
                <p className="text-gray-400 text-xs mt-4 font-bold uppercase tracking-tight italic">Bruto Anual</p>
              </div>

              {/* Resumen de Análisis con Azul Suave (#1E293B) */}
              <div className="sm:col-span-2 bg-[#1E293B] p-9 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl border border-slate-700">
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-blue-600 p-3 rounded-xl shadow-lg">
                      <Users className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold">Resumen de Análisis</h3>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
                    {liderMercado ? (
                      <>
                        El análisis actual posiciona a <span className="text-white font-bold">{liderMercado.name}</span> como la competencia más sólida.
                        Ocupa el <span className="text-blue-400 font-bold">{Math.round((liderMercado.total / ofertas.length) * 100)}%</span> del mercado analizado con una media salarial competitiva.
                      </>
                    ) : "No hay suficientes datos para generar un resumen detallado."}
                  </p>
                </div>
                <TrendingUp className="absolute -right-10 -bottom-10 w-48 h-48 text-white opacity-[0.02] rotate-12" />
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}