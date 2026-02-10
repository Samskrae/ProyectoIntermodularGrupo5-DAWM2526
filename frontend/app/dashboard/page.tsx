'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, Users, BarChart3 } from 'lucide-react';

interface Oferta {
  id: number;
  titulo: string;
  descripcion: string;
  sector: string;
  ubicacion?: string;
  tipo_contrato?: string;
  salario_min?: number;
  salario_max?: number;
  vacantes: number;
  estado: string;
  created_at: string;
  postulaciones?: number;
}

export default function DashboardEmpresa() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [ofertas, setOfertas] = useState<Oferta[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalOfertas: 0, totalPostulaciones: 0, activas: 0 });

  useEffect(() => {
    if (user?.user_type !== 'empresa') {
      router.push('/');
      return;
    }
    fetchOfertas();
  }, [user, token]);

  const fetchOfertas = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/mis-ofertas', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setOfertas(data);
      
      // Calcular estadísticas
      const totalPostulaciones = data.reduce((sum: number, o: Oferta) => sum + (o.postulaciones || 0), 0);
      const activas = data.filter((o: Oferta) => o.estado === 'activa').length;
      
      setStats({
        totalOfertas: data.length,
        totalPostulaciones,
        activas,
      });
    } catch (error) {
      console.error('Error fetching ofertas:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteOferta = async (id: number) => {
    if (!confirm('¿Está seguro de que desea eliminar esta oferta?')) return;
    
    try {
      const response = await fetch(`http://localhost:8000/api/ofertas/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        fetchOfertas();
      }
    } catch (error) {
      console.error('Error deleting oferta:', error);
    }
  };

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

  if (user?.user_type !== 'empresa') {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard - {user.nombre_comercial}</h1>
          <p className="text-gray-600">Gestiona tus ofertas y postulaciones</p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
                <p className="text-gray-600 text-sm font-semibold">Postulaciones Totales</p>
                <p className="text-4xl font-bold text-blue-600">{stats.totalPostulaciones}</p>
              </div>
              <Users className="text-blue-600" size={40} />
            </div>
          </div>
        </div>

        {/* Botón crear oferta */}
        <div className="mb-8">
          <Link href="/dashboard/crear-oferta">
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all">
              <Plus size={20} />
              Crear Nueva Oferta
            </button>
          </Link>
        </div>

        {/* Lista de Ofertas */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Título</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Sector</th>
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
                      <td className="px-6 py-4 text-sm text-gray-600">{oferta.sector}</td>
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
                          {oferta.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-medium">{oferta.postulaciones || 0}</td>
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
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-600">
                      No hay ofertas. <Link href="/dashboard/crear-oferta" className="text-indigo-600 hover:underline">Crear una</Link>
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
