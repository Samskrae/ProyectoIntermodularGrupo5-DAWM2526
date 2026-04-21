'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { Building2, Users, Briefcase, TrendingUp, Eye, Edit, Trash2, Plus, BarChart3 } from 'lucide-react';
import Link from 'next/link';

// --- INTERFACES ---
interface Oferta {
  id: number;
  titulo: string;
  descripcion: string;
  salario_min?: number;
  salario_max?: number;
  tipo_contrato: string;
  sector?: string;
  estado?: string;
  postulaciones?: number;
  empresa: {
    nombre_comercial: string;
  };
  tecnologias: Array<{ nombre: string }>;
  created_at: string;
}

interface Postulacion {
  id: number;
  estado: string;
  fecha_postulacion: string;
  oferta: {
    titulo: string;
  };
  alumno: {
    nombre: string;
    email: string;
  };
}

export default function Dashboard() {
  const { user, userType, token } = useAuth();
  const router = useRouter();
  const [ofertas, setOfertas] = useState<Oferta[]>([]);
  const [postulaciones, setPostulaciones] = useState<Postulacion[]>([]);
  const [stats, setStats] = useState({
    totalOfertas: 0,
    totalPostulaciones: 0,
    activas: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || userType !== 'empresa') {
      router.push('/auth');
      return;
    }
    fetchData();
  }, [user, userType, router]);

  const fetchData = async () => {
    try {
      // 1. Ejecución paralela para mejorar velocidad
      const [ofertasRes, postulacionesRes] = await Promise.all([
        fetch('http://localhost:8000/api/mis-ofertas', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        }),
        fetch('http://localhost:8000/api/postulaciones-mis-ofertas', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        })
      ]);

      const oJson = await ofertasRes.json();
      const pJson = await postulacionesRes.json();

      // 2. Extracción segura de arrays (soporta {data: []} o [])
      const listaOfertas = Array.isArray(oJson) ? oJson : (oJson.data || []);
      const listaPostulaciones = Array.isArray(pJson) ? pJson : (pJson.data || []);

      setOfertas(listaOfertas);
      setPostulaciones(listaPostulaciones);

      // 3. Cálculo de estadísticas basado en los datos reales procesados
      setStats({
        totalOfertas: listaOfertas.length,
        totalPostulaciones: listaPostulaciones.length,
        activas: listaOfertas.filter((o: Oferta) => o.estado === 'activa' || !o.estado).length,
      });

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteOferta = async (id: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta oferta?')) return;

    try {
      const response = await fetch(`http://localhost:8000/api/ofertas/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        const nuevasOfertas = ofertas.filter(oferta => oferta.id !== id);
        setOfertas(nuevasOfertas);
        setStats(prev => ({
          ...prev,
          totalOfertas: nuevasOfertas.length,
          activas: nuevasOfertas.filter(o => o.estado === 'activa' || !o.estado).length
        }));
      }
    } catch (error) {
      console.error('Error deleting oferta:', error);
    }
  };

  if (!user || userType !== 'empresa') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] pt-24 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl">
          <p className="text-red-600 font-bold mb-4">Acceso Restringido</p>
          <Link href="/">
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700 transition-all font-semibold">
              Volver al inicio
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium italic">Sincronizando panel de control...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">
            Dashboard — {user.nombre_comercial}
          </h1>
          <p className="text-gray-500 font-medium">Gestión integral de vacantes y candidatos activos.</p>
        </div>

        {/* Estadísticas con sombras reforzadas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Total Ofertas', val: stats.totalOfertas, icon: BarChart3, color: 'text-indigo-600' },
            { label: 'Ofertas Activas', val: stats.activas, icon: Eye, color: 'text-green-600' },
            { label: 'Postulaciones', val: stats.totalPostulaciones, icon: Users, color: 'text-blue-600' },
            {
              label: 'Tasa Respuesta',
              val: `${stats.totalOfertas > 0 ? Math.round((stats.totalPostulaciones / stats.totalOfertas) * 100) : 0}%`,
              icon: TrendingUp,
              color: 'text-orange-600'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-[2rem] shadow-md border border-gray-100 p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{item.label}</p>
                  <p className={`text-3xl font-black ${item.color}`}>{item.val}</p>
                </div>
                <item.icon className={`${item.color} opacity-20`} size={44} />
              </div>
            </div>
          ))}
        </div>

        {/* Acción Principal */}
        <div className="mb-10">
          <Link href="/crear-oferta">
            <button className="flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all">
              <Plus size={22} strokeWidth={3} />
              Crear Nueva Oferta
            </button>
          </Link>
        </div>

        {/* Tabla de Ofertas */}
        <div className="bg-white rounded-[2.5rem] shadow-md border border-gray-100 overflow-hidden mb-10">
          <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-900">Mis Ofertas Publicadas</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 uppercase text-[10px] font-black tracking-widest border-b border-gray-100">
                  <th className="px-8 py-5">Título de la posición</th>
                  <th className="px-8 py-5">Contrato</th>
                  <th className="px-8 py-5">Estado</th>
                  <th className="px-8 py-5 text-center">Candidatos</th>
                  <th className="px-8 py-5 text-right">Gestión</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {ofertas.length > 0 ? (
                  ofertas.map((oferta) => (
                    <tr key={oferta.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-8 py-5 font-bold text-gray-800">{oferta.titulo}</td>
                      <td className="px-8 py-5 text-sm text-gray-500 font-medium">{oferta.tipo_contrato}</td>
                      <td className="px-8 py-5 text-sm">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tight ${oferta.estado === 'activa' || !oferta.estado
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                          }`}>
                          {oferta.estado || 'activa'}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-center font-black text-gray-700">
                        {postulaciones.filter(p => p.oferta?.titulo === oferta.titulo).length}
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex justify-end gap-3">
                          <Link href={`/dashboard/ofertas/${oferta.id}`}>
                            <button className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition shadow-sm">
                              <Eye size={18} />
                            </button>
                          </Link>
                          <Link href={`/dashboard/ofertas/${oferta.id}/editar`}>
                            <button className="p-2.5 bg-yellow-50 text-yellow-600 rounded-xl hover:bg-yellow-100 transition shadow-sm">
                              <Edit size={18} />
                            </button>
                          </Link>
                          <button
                            onClick={() => deleteOferta(oferta.id)}
                            className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition shadow-sm"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-8 py-16 text-center text-gray-400 italic">
                      No se han encontrado ofertas registradas.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Postulaciones Recibidas */}
        <div className="bg-white rounded-[2.5rem] shadow-md border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-900">Últimas Postulaciones</h2>
          </div>
          <div className="p-8">
            {postulaciones.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-400 font-medium">Aún no has recibido postulaciones en tus ofertas activas.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {postulaciones.map((postulacion) => (
                  <div key={postulacion.id} className="border border-gray-100 rounded-3xl p-6 hover:shadow-lg hover:border-indigo-100 transition-all group">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-black text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
                          {postulacion.alumno.nombre}
                        </h3>
                        <p className="text-gray-400 text-sm font-medium mb-4">{postulacion.alumno.email}</p>

                        <div className="space-y-2">
                          <p className="text-xs text-gray-500 uppercase font-black tracking-widest">Postulación a:</p>
                          <p className="text-sm font-bold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg inline-block">
                            {postulacion.oferta?.titulo}
                          </p>
                        </div>
                        <p className="text-[11px] text-gray-400 mt-4 font-bold uppercase">
                          Fecha: {new Date(postulacion.fecha_postulacion).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${postulacion.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-700' :
                        postulacion.estado === 'aceptada' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                        {postulacion.estado}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}