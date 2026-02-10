'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import Navigation from '@/app/components/Navigation';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { Briefcase, Calendar, CheckCircle, XCircle, Clock, Trash2 } from 'lucide-react';

interface Postulacion {
  id: number;
  estado: string;
  carta_presentacion?: string;
  fecha_postulacion: string;
  fecha_respuesta?: string;
  oferta: {
    id: number;
    titulo: string;
    descripcion: string;
    empresa: {
      nombre_comercial: string;
    };
  };
}

const estadoConfig = {
  pendiente: { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-100', label: 'Pendiente' },
  aceptada: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100', label: 'Aceptada' },
  rechazada: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-100', label: 'Rechazada' },
  retirada: { icon: Trash2, color: 'text-gray-500', bg: 'bg-gray-100', label: 'Retirada' },
};

function PostulacionesContent() {
  const { token } = useAuth();
  const [postulaciones, setPostulaciones] = useState<Postulacion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPostulaciones();
  }, []);

  const fetchPostulaciones = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/mis-postulaciones', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPostulaciones(data);
      }
    } catch (error) {
      console.error('Error fetching postulaciones:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRetirar = async (postulacionId: number) => {
    if (confirm('¿Estás seguro de que deseas retirar esta postulación?')) {
      try {
        const response = await fetch(`http://localhost:8000/api/postulaciones/${postulacionId}/retirar`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setPostulaciones(postulaciones.filter(p => p.id !== postulacionId));
        }
      } catch (error) {
        console.error('Error retirar postulación:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Cargando postulaciones...</p>
      </div>
    );
  }

  if (postulaciones.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <Briefcase size={48} className="text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 text-lg mb-4">No tienes postulaciones aún</p>
        <p className="text-gray-400">Comienza a explorar ofertas y postúlate a las que te interesen</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {postulaciones.map((postulacion) => {
        const config = estadoConfig[postulacion.estado as keyof typeof estadoConfig] || estadoConfig.pendiente;
        const IconComponent = config.icon;

        return (
          <div key={postulacion.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {postulacion.oferta.titulo}
                </h3>
                <p className="text-gray-600">{postulacion.oferta.empresa.nombre_comercial}</p>
              </div>

              <div className={`flex items-center gap-2 ${config.bg} px-4 py-2 rounded-full`}>
                <IconComponent size={20} className={config.color} />
                <span className={`font-semibold ${config.color}`}>{config.label}</span>
              </div>
            </div>

            <p className="text-gray-700 mb-4 text-sm line-clamp-2">
              {postulacion.oferta.descripcion}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Postulada: {new Date(postulacion.fecha_postulacion).toLocaleDateString()}</span>
              </div>

              {postulacion.fecha_respuesta && (
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>Respuesta: {new Date(postulacion.fecha_respuesta).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            {postulacion.carta_presentacion && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 font-semibold mb-1">Tu carta de presentación:</p>
                <p className="text-gray-700 text-sm">{postulacion.carta_presentacion}</p>
              </div>
            )}

            {postulacion.estado === 'pendiente' && (
              <button
                onClick={() => handleRetirar(postulacion.id)}
                className="mt-4 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition"
              >
                Retirar Postulación
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function MisPostulacionesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />

      <ProtectedRoute userType="alumno">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Mis Postulaciones</h1>
            <p className="text-gray-600">Revisa el estado de todas tus solicitudes</p>
          </div>

          <PostulacionesContent />
        </div>
      </ProtectedRoute>
    </div>
  );
}
