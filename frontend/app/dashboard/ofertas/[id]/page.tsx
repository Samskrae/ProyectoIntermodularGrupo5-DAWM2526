'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { ArrowLeft, CheckCircle, XCircle, Clock } from 'lucide-react';
import Link from 'next/link';

interface Postulante {
  id: number;
  alumno: {
    id: number;
    nombre: string;
    email: string;
  };
  estado: string;
  carta_presentacion?: string;
  fecha_postulacion: string;
}

interface Oferta {
  id: number;
  titulo: string;
}

export default function PostulacionesOfertaPage() {
  const params = useParams();
  const router = useRouter();
  const { token } = useAuth();
  const [oferta, setOferta] = useState<Oferta | null>(null);
  const [postulantes, setPostulantes] = useState<Postulante[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [params.id]);

  const fetchData = async () => {
    try {
      // Obtener oferta
      const ofertaRes = await fetch(`http://localhost:8000/api/ofertas/${params.id}`);
      const ofertaData = await ofertaRes.json();
      setOferta(ofertaData);

      // Obtener postulaciones
      const postulacionesRes = await fetch(
        `http://localhost:8000/api/ofertas/${params.id}/postulaciones`,
        {
          headers: { 'Authorization': `Bearer ${token}` },
        }
      );
      const postulacionesData = await postulacionesRes.json();
      setPostulantes(postulacionesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateEstado = async (postulacionId: number, nuevoEstado: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/postulaciones/${postulacionId}/estado`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ estado: nuevoEstado }),
        }
      );
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error updating estado:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <Link href="/dashboard">
          <button className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-8">
            <ArrowLeft size={20} />
            Volver al Dashboard
          </button>
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Postulaciones para: {oferta?.titulo}
        </h1>
        <p className="text-gray-600 mb-8">Total: {postulantes.length} postulante(s)</p>

        {/* Lista de Postulantes */}
        <div className="space-y-4">
          {postulantes.length > 0 ? (
            postulantes.map((postulante) => (
              <div key={postulante.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{postulante.alumno.nombre}</h3>
                    <p className="text-gray-600">{postulante.alumno.email}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Postulado: {new Date(postulante.fecha_postulacion).toLocaleDateString('es-ES')}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {postulante.estado === 'pendiente' && <Clock className="text-yellow-600" size={24} />}
                    {postulante.estado === 'aceptada' && <CheckCircle className="text-green-600" size={24} />}
                    {postulante.estado === 'rechazada' && <XCircle className="text-red-600" size={24} />}
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        postulante.estado === 'pendiente'
                          ? 'bg-yellow-100 text-yellow-800'
                          : postulante.estado === 'aceptada'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {postulante.estado}
                    </span>
                  </div>
                </div>

                {postulante.carta_presentacion && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Carta de Presentación:</p>
                    <p className="text-gray-700 whitespace-pre-wrap">{postulante.carta_presentacion}</p>
                  </div>
                )}

                {postulante.estado === 'pendiente' && (
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => updateEstado(postulante.id, 'aceptada')}
                      className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={18} />
                      Aceptar
                    </button>
                    <button
                      onClick={() => updateEstado(postulante.id, 'rechazada')}
                      className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                    >
                      <XCircle size={18} />
                      Rechazar
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <p className="text-gray-600 text-lg">No hay postulaciones para esta oferta</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
