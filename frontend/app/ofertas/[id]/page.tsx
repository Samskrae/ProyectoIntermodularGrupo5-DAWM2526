'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Navigation from '@/app/components/Navigation';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { ArrowLeft, Briefcase, MapPin, DollarSign, Calendar, CheckCircle } from 'lucide-react';

interface Oferta {
  id: number;
  titulo: string;
  descripcion: string;
  sector: string;
  ubicacion?: string;
  tipo_contrato: string;
  salario_min?: number;
  salario_max?: number;
  vacantes: number;
  fecha_cierre?: string;
  requisitos?: string;
  beneficios?: string;
  estado: string;
  empresa: {
    id: number;
    nombre_comercial: string;
  };
}

export default function OfertaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, userType, token } = useAuth();
  const [oferta, setOferta] = useState<Oferta | null>(null);
  const [loading, setLoading] = useState(true);
  const [aplicando, setAplicando] = useState(false);
  const [cartaPresentacion, setCartaPresentacion] = useState('');
  const [aplicado, setAplicado] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const ofertaId = params.id as string;

  useEffect(() => {
    fetchOferta();
  }, [ofertaId]);

  const fetchOferta = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/ofertas/${ofertaId}`);
      if (response.ok) {
        const responseData = await response.json();
        setOferta(responseData.data || responseData);
      } else {
        console.error('Error: Oferta no encontrada o error en el servidor');
        setOferta(null);
      }
    } catch (error) {
      console.error('Error fetching oferta:', error);
      setOferta(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAplicar = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userType !== 'alumno') {
      setMensaje('Solo los alumnos pueden postularse');
      return;
    }

    setAplicando(true);
    try {
      const response = await fetch('http://localhost:8000/api/postulaciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          oferta_id: parseInt(ofertaId),
          carta_presentacion: cartaPresentacion,
        }),
      });

      if (response.ok) {
        setAplicado(true);
        setMensaje('¡Postulación enviada exitosamente!');
        setCartaPresentacion('');
      } else if (response.status === 409) {
        setMensaje('Ya te has postulado a esta oferta');
      } else {
        setMensaje('Error al enviar la postulación');
      }
    } catch (error) {
      console.error('Error applying:', error);
      setMensaje('Error al enviar la postulación');
    } finally {
      setAplicando(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <p className="text-gray-800">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!oferta) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <p className="text-gray-800 text-lg">Oferta no encontrada</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Botón atrás */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft size={20} />
          Volver
        </button>

        {/* Header de oferta */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="mb-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{oferta.titulo}</h1>
            <p className="text-xl text-blue-600 font-semibold">{oferta.empresa.nombre_comercial}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {oferta.ubicacion && (
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-blue-500" />
                <div>
                  <p className="text-xs text-gray-700">Ubicación</p>
                  <p className="font-semibold text-gray-900">{oferta.ubicacion}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Briefcase size={20} className="text-blue-500" />
              <div>
                <p className="text-xs text-gray-700">Tipo</p>
                <p className="font-semibold text-gray-900">{oferta.tipo_contrato}</p>
              </div>
            </div>

            {oferta.salario_min && oferta.salario_max && (
              <div className="flex items-center gap-2">
                <DollarSign size={20} className="text-green-500" />
                <div>
                  <p className="text-xs text-gray-700">Salario</p>
                  <p className="font-semibold text-gray-900">${oferta.salario_min} - ${oferta.salario_max}</p>
                </div>
              </div>
            )}

            {oferta.fecha_cierre && (
              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-orange-500" />
                <div>
                  <p className="text-xs text-gray-700">Cierra</p>
                  <p className="font-semibold text-gray-900">{new Date(oferta.fecha_cierre).toLocaleDateString()}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {oferta.sector}
            </span>
            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
              {oferta.vacantes} vacante{oferta.vacantes > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenido principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Descripción */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Descripción del Puesto</h2>
              <p className="text-gray-800 whitespace-pre-wrap">{oferta.descripcion}</p>
            </div>

            {/* Requisitos */}
            {oferta.requisitos && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Requisitos</h2>
                <p className="text-gray-800 whitespace-pre-wrap">{oferta.requisitos}</p>
              </div>
            )}

            {/* Beneficios */}
            {oferta.beneficios && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Beneficios</h2>
                <div className="space-y-2">
                  {oferta.beneficios.split('\n').map((beneficio, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-800">{beneficio}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar con formulario de postulación */}
          <ProtectedRoute userType="alumno">
            <div className="bg-white rounded-lg shadow-md p-8 h-fit sticky top-24">
              {aplicado ? (
                <div className="text-center">
                  <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">¡Postulación Enviada!</h3>
                  <p className="text-gray-800 mb-4">
                    Tu postulación ha sido enviada exitosamente. La empresa revisará tu solicitud pronto.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Postúlate Ahora</h3>
                  <form onSubmit={handleAplicar} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Carta de Presentación (Opcional)
                      </label>
                      <textarea
                        value={cartaPresentacion}
                        onChange={(e) => setCartaPresentacion(e.target.value)}
                        placeholder="Cuéntanos por qué eres el candidato ideal para este puesto..."
                        className="w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        rows={6}
                      />
                    </div>

                    {mensaje && (
                      <div
                        className={`p-3 rounded-lg text-sm ${
                          aplicado
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {mensaje}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={aplicando}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition"
                    >
                      {aplicando ? 'Enviando...' : 'Enviar Postulación'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </ProtectedRoute>
        </div>
      </div>
    </div>
  );
}
