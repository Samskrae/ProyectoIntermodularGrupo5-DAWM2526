'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { Users, Eye, Edit, Trash2, Plus, BarChart3, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { user, userType, token } = useAuth();
  const router = useRouter();
  const [ofertas, setOfertas] = useState<any[]>([]);
  const [postulaciones, setPostulaciones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, activas: 0, candidatos: 0 });

  useEffect(() => {
    if (!user || userType !== 'empresa') {
      router.push('/auth');
      return;
    }
    fetchData();
  }, [user, userType]);

  const fetchData = async () => {
    try {
      const [ofertasRes, postulacionesRes] = await Promise.all([
        fetch('http://localhost:8000/api/mis-ofertas', {
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
        }),
        fetch('http://localhost:8000/api/postulaciones-mis-ofertas', {
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
        })
      ]);

      const oJson = await ofertasRes.json();
      const pJson = await postulacionesRes.json();

      // Extracción segura de arrays según la estructura de Laravel
      const listaOfertas = Array.isArray(oJson) ? oJson : (oJson.data || oJson.ofertas || []);
      const listaPostulaciones = Array.isArray(pJson) ? pJson : (pJson.data || pJson.postulaciones || []);

      setOfertas(listaOfertas);
      setPostulaciones(listaPostulaciones);

      setStats({
        total: listaOfertas.length,
        activas: listaOfertas.filter((o: any) => o.estado === 'activa' || !o.estado).length,
        candidatos: listaPostulaciones.length
      });

    } catch (error) {
      console.error('Error sincronizando panel:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteOferta = async (id: number) => {
    if (!confirm('¿Seguro que quieres eliminar esta vacante permanentemente?')) return;
    try {
      const res = await fetch(`http://localhost:8000/api/ofertas/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
      });
      if (res.ok) fetchData();
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#F0F7FF] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F0F7FF] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header Principal */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Panel de {user?.nombre_comercial || 'Empresa'}
            </h1>
            <p className="text-slate-500 font-medium mt-1 text-lg">Gestiona tus vacantes y revisa candidatos.</p>
          </div>
          <Link href="/crear-oferta">
            <button className="flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all uppercase text-sm tracking-widest">
              <Plus size={20} strokeWidth={3} />
              Nueva Oferta
            </button>
          </Link>
        </div>

        {/* Tarjetas de Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: 'Ofertas Totales', val: stats.total, icon: BarChart3, color: 'text-blue-600' },
            { label: 'Vacantes Activas', val: stats.activas, icon: Eye, color: 'text-emerald-600' },
            { label: 'Candidatos Totales', val: stats.candidatos, icon: Users, color: 'text-blue-600' }
          ].map((item, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              key={i}
              className="bg-white rounded-[2rem] shadow-xl shadow-blue-900/5 border border-blue-50 p-7 flex items-center justify-between"
            >
              <div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{item.label}</p>
                <p className={`text-4xl font-black ${item.color}`}>{item.val}</p>
              </div>
              <item.icon className={`${item.color} opacity-20`} size={48} />
            </motion.div>
          ))}
        </div>

        {/* Tabla de Vacantes */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-blue-50 overflow-hidden">
          <div className="px-8 py-6 border-b border-blue-50 bg-white flex justify-between items-center">
            <h2 className="text-xl font-black text-slate-900">Mis Vacantes Publicadas</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-slate-400 uppercase text-[10px] font-black tracking-widest border-b border-blue-50">
                  <th className="px-8 py-5">Posición y Contrato</th>
                  <th className="px-8 py-5 text-center">Estado</th>
                  <th className="px-8 py-5 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-50">
                {ofertas.length > 0 ? ofertas.map((o) => (
                  <tr key={o.id} className="hover:bg-blue-50/40 transition-colors group">
                    <td className="px-8 py-5">
                      <p className="font-bold text-slate-800 text-lg leading-tight group-hover:text-blue-600 transition-colors">
                        {o.titulo}
                      </p>
                      <p className="text-[10px] text-slate-400 font-black uppercase mt-1">
                        {o.tipo_contrato || 'No especificado'}
                      </p>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${o.estado === 'activa' || !o.estado ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                        {o.estado || 'activa'}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex justify-end gap-2">
                        {/* BOTÓN VER (EL OJO) */}
                        <Link href={`/dashboard/ofertas/${o.id}`} title="Ver detalles">
                          <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                            <Eye size={18} />
                          </button>
                        </Link>

                        {/* BOTÓN EDITAR */}
                        <Link href={`/dashboard/ofertas/${o.id}/editar`} title="Editar vacante">
                          <button className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                            <Edit size={18} />
                          </button>
                        </Link>

                        {/* BOTÓN ELIMINAR */}
                        <button
                          onClick={() => deleteOferta(o.id)}
                          title="Eliminar vacante"
                          className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={3} className="px-8 py-20 text-center text-slate-400 font-medium italic">
                      Aún no has publicado ninguna oferta de empleo.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}