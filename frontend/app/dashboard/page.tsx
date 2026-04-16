'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { Building2, Users, Briefcase, TrendingUp, Eye, Edit, Trash2, Plus, BarChart3 } from 'lucide-react';
import Link from 'next/link';

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
      let ofertasData = null;
      let postulacionesData = null;

      // Fetch ofertas de la empresa
      const ofertasResponse = await fetch('http://localhost:8000/api/mis-ofertas', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (ofertasResponse.ok) {
        ofertasData = await ofertasResponse.json();
        setOfertas(ofertasData.data || []);
      }

      // Fetch postulaciones a las ofertas de la empresa
      const postulacionesResponse = await fetch('http://localhost:8000/api/postulaciones-mis-ofertas', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (postulacionesResponse.ok) {
        postulacionesData = await postulacionesResponse.json();
        setPostulaciones(postulacionesData.data || []);
      }

      // Calcular estadísticas
      const totalOfertas = ofertasData?.data?.length || 0;
      const totalPostulaciones = postulacionesData?.data?.length || 0;
      const activas = ofertasData?.data?.filter((o: Oferta) => o.estado === 'activa').length || 0;

      setStats({
        totalOfertas,
        totalPostulaciones,
        activas,
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
        setOfertas(ofertas.filter(oferta => oferta.id !== id));
        // Actualizar estadísticas
        setStats(prev => ({
          ...prev,
          totalOfertas: prev.totalOfertas - 1,
          activas: prev.activas - (ofertas.find(o => o.id === id)?.estado === 'activa' ? 1 : 0)
        }));
      }
    } catch (error) {
      console.error('Error deleting oferta:', error);
    }
  };

  if (!user || userType !== 'empresa') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Acceso denegado. Solo empresas pueden acceder a este panel.</p>
          <Link href="/">
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
              Volver al inicio
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard - {user.nombre_comercial}</h1>
          <p className="text-gray-600">Gestiona tus ofertas y postulaciones</p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Total Ofertas</p>
                <p className="text-4xl font-bold text-indigo-600">{stats.totalOfertas}</p>
              </div>
              <BarChart3 className="text-indigo-600" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Ofertas Activas</p>
                <p className="text-4xl font-bold text-green-600">{stats.activas}</p>
              </div>
              <Eye className="text-green-600" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Postulaciones</p>
                <p className="text-4xl font-bold text-blue-600">{stats.totalPostulaciones}</p>
              </div>
              <Users className="text-blue-600" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Tasa de Respuesta</p>
                <p className="text-4xl font-bold text-orange-600">
                  {stats.totalOfertas > 0 ? Math.round((stats.totalPostulaciones / stats.totalOfertas) * 100) : 0}%
                </p>
              </div>
              <TrendingUp className="text-orange-600" size={40} />
            </div>
          </div>
        </div>

        {/* Botón crear oferta */}
        <div className="mb-8">
          <Link href="/crear-oferta">
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all">
              <Plus size={20} />
              Crear Nueva Oferta
            </button>
          </Link>
        </div>

        {/* Lista de Ofertas */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Mis Ofertas de Empleo</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Título</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tipo</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Estado</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Postulaciones</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {ofertas.length > 0 ? (
                  ofertas.map((oferta) => (
                    <tr key={oferta.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{oferta.titulo}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{oferta.tipo_contrato}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            oferta.estado === 'activa'
                              ? 'bg-green-100 text-green-800'
                              : oferta.estado === 'pausada'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {oferta.estado || 'activa'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                        {postulaciones.filter(p => p.oferta.titulo === oferta.titulo).length}
                      </td>
                      <td className="px-6 py-4 text-sm flex gap-2">
                        <Link href={`/dashboard/ofertas/${oferta.id}`}>
                          <button className="bg-blue-100 text-blue-600 p-2 rounded hover:bg-blue-200 transition">
                            <Eye size={16} />
                          </button>
                        </Link>
                        <Link href={`/dashboard/ofertas/${oferta.id}/editar`}>
                          <button className="bg-yellow-100 text-yellow-600 p-2 rounded hover:bg-yellow-200 transition">
                            <Edit size={16} />
                          </button>
                        </Link>
                        <button
                          onClick={() => deleteOferta(oferta.id)}
                          className="bg-red-100 text-red-600 p-2 rounded hover:bg-red-200 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-600">
                      No hay ofertas. <Link href="/crear-oferta" className="text-indigo-600 hover:underline">Crear una</Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Postulaciones Recibidas */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Postulaciones Recibidas</h2>
          </div>
          <div className="p-6">
            {postulaciones.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay postulaciones aún</h3>
                <p className="text-gray-600">Las postulaciones a tus ofertas aparecerán aquí</p>
              </div>
            ) : (
              <div className="space-y-4">
                {postulaciones.map((postulacion) => (
                  <div key={postulacion.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {postulacion.alumno.nombre}
                        </h3>
                        <p className="text-gray-600 mb-2">{postulacion.alumno.email}</p>
                        <p className="text-sm text-gray-500 mb-2">
                          Postulación a: <span className="font-medium">{postulacion.oferta.titulo}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                          Fecha: {new Date(postulacion.fecha_postulacion).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                      <div className="ml-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          postulacion.estado === 'pendiente'
                            ? 'bg-yellow-100 text-yellow-800'
                            : postulacion.estado === 'aceptada'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {postulacion.estado.charAt(0).toUpperCase() + postulacion.estado.slice(1)}
                        </span>
                      </div>
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
