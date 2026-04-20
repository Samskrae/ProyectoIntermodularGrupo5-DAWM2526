'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Navigation from '@/app/components/Navigation';
import { ArrowLeft, Briefcase, MapPin, DollarSign, Calendar, CheckCircle, Lock, Tag } from 'lucide-react';

interface Tecnologia {
  id: number;
  nombre: string;
}

interface Oferta {
  id: number;
  titulo: string;
  descripcion: string;
  ubicacion?: string;
  tipo_contrato: string;
  salario_min?: number;
  salario_max?: number;
  vacantes: number;
  fecha_cierre?: string;
  requisitos?: string;
  beneficios?: string;
  estado: string;
  created_at: string; // Añadida para la fecha
  tecnologias?: Tecnologia[]; // Añadida para las etiquetas
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
    if (ofertaId) {
      fetchOferta();
    }
  }, [ofertaId]);

  const fetchOferta = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/ofertas/${ofertaId}`);
      if (response.ok) {
        const responseData = await response.json();
        setOferta(responseData.data || responseData);
      } else {
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
    if (!user || userType !== 'alumno') {
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
      setMensaje('Error al enviar la postulación');
    } finally {
      setAplicando(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 text-center py-20">Cargando oferta...</div>
  );

  if (!oferta) return (
    <div className="min-h-screen bg-gray-50 text-center py-20">
      <h2 className="text-2xl font-bold">Oferta no encontrada</h2>
      <button onClick={() => router.push('/ofertas')} className="text-blue-600 mt-4 underline">Volver</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <button
          onClick={() => router.push('/ofertas')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium"
        >
          <ArrowLeft size={20} />
          Volver a todas las ofertas
        </button>

        {/* Header de oferta */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="mb-6">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{oferta.titulo}</h1>
            <p className="text-xl text-blue-600 font-bold">{oferta.empresa.nombre_comercial}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            <div className="flex items-center gap-3">
              <MapPin size={22} className="text-blue-500" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Ubicación</p>
                <p className="font-semibold text-gray-800">{oferta.ubicacion || 'Remoto'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Briefcase size={22} className="text-blue-500" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Contrato</p>
                <p className="font-semibold text-gray-800">{oferta.tipo_contrato}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DollarSign size={22} className="text-green-500" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Salario</p>
                <p className="font-semibold text-gray-800">
                  {new Intl.NumberFormat('es-ES').format(oferta.salario_min || 0)}€
                  {oferta.salario_max && ` - ${new Intl.NumberFormat('es-ES').format(oferta.salario_max)}€`}
                </p>
              </div>
            </div>
          </div>

          {/* Tecnologías como Badges */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
            {oferta.tecnologias && oferta.tecnologias.length > 0 ? (
              oferta.tecnologias.map((tech) => (
                <span key={tech.id} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold shadow-sm flex items-center gap-1">
                  <Tag size={14} />
                  {tech.nombre}
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-sm italic">Sin tecnologías especificadas</span>
            )}
          </div>

          {/* Vacantes y Fecha en texto normal */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-gray-600 text-sm">
            {oferta.vacantes > 0 && (
              <div className="flex items-center gap-1">
                <span className="font-bold text-gray-900">{oferta.vacantes}</span>
                {oferta.vacantes === 1 ? 'vacante disponible' : 'vacantes disponibles'}
              </div>
            )}
            <span className="hidden sm:inline text-gray-300">|</span>
            <div className="flex items-center gap-1 italic">
              Publicado el {new Date(oferta.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Descripción del Puesto</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{oferta.descripcion}</p>
            </div>

            {oferta.requisitos && (
              <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Requisitos</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{oferta.requisitos}</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-xl p-8 h-fit sticky top-24 border border-blue-100">
              {aplicado ? (
                <div className="text-center py-4">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">¡Todo listo!</h3>
                  <p className="text-gray-600 text-sm">Tu postulación está en manos de la empresa.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Postulación</h3>
                  {userType === 'alumno' ? (
                    <form onSubmit={handleAplicar} className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Carta de presentación</label>
                        <textarea
                          value={cartaPresentacion}
                          onChange={(e) => setCartaPresentacion(e.target.value)}
                          placeholder="Convénceles: ¿Por qué tú?"
                          className="w-full px-4 py-3 bg-gray-50 text-gray-900 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
                          rows={5}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={aplicando}
                        className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 disabled:bg-gray-300 shadow-lg transition"
                      >
                        {aplicando ? 'Enviando...' : 'Aplicar a esta oferta'}
                      </button>
                    </form>
                  ) : (
                    <div className="text-center space-y-4">
                      <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                        <Lock size={20} className="text-gray-500" />
                      </div>
                      <p className="text-gray-600 text-sm">
                        {userType === 'empresa' ? "Las empresas no pueden postularse." : "Inicia sesión como alumno."}
                      </p>
                      {!user && (
                        <button onClick={() => router.push('/login-alumno')} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition">
                          Ir al Login
                        </button>
                      )}
                    </div>
                  )}
                  {mensaje && !aplicado && <p className="mt-4 text-center text-sm font-medium text-red-600 bg-red-50 p-2 rounded-lg">{mensaje}</p>}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}