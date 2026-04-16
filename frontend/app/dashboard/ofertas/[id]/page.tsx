'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, MapPin, Clock, Users, Building2, Mail, Phone, Calendar, CheckCircle, XCircle, AlertCircle, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface Oferta {
  id: number;
  titulo: string;
  descripcion: string;
  requisitos: string;
  salario_min?: number;
  salario_max?: number;
  tipo_contrato: string;
  ubicacion: string;
  jornada: string;
  empresa: {
    nombre_comercial: string;
    email: string;
    telefono?: string;
    descripcion?: string;
  };
  tecnologias: Array<{ nombre: string }>;
  postulaciones: Array<{
    id: number;
    estado: string;
    fecha_postulacion: string;
    carta_presentacion?: string;
    alumno: {
      id: number;
      nombre: string;
      email: string;
      telefono?: string;
      perfil_profesional?: {
        resumen?: string;
        experiencia?: string;
        educacion?: string;
      };
    };
  }>;
  created_at: string;
  estado: string;
}

export default function OfertaDetail() {
  const { user, userType, token } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [oferta, setOferta] = useState<Oferta | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);

  useEffect(() => {
    if (!user || userType !== 'empresa') {
      router.push('/auth');
      return;
    }
    if (params.id) {
      fetchOfertaDetail();
    }
  }, [user, userType, params.id, router]);

  const fetchOfertaDetail = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/ofertas/${params.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setOferta(data.data);
      } else if (response.status === 404) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error fetching oferta detail:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePostulacionStatus = async (postulacionId: number, newStatus: string) => {
    setUpdatingStatus(postulacionId);
    try {
      const response = await fetch(`http://localhost:8000/api/postulaciones/${postulacionId}/estado`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ estado: newStatus })
      });

      if (response.ok) {
        // Actualizar el estado local
        setOferta(prev => prev ? {
          ...prev,
          postulaciones: prev.postulaciones.map(p =>
            p.id === postulacionId ? { ...p, estado: newStatus } : p
          )
        } : null);
      }
    } catch (error) {
      console.error('Error updating postulacion status:', error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const deleteOferta = async () => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta oferta? Esta acción no se puede deshacer.')) return;

    try {
      const response = await fetch(`http://localhost:8000/api/ofertas/${params.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        router.push('/dashboard');
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
          <p className="mt-4 text-gray-600">Cargando detalles de la oferta...</p>
        </div>
      </div>
    );
  }

  if (!oferta) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Oferta no encontrada</p>
          <Link href="/dashboard">
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
              Volver al dashboard
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
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Dashboard
          </Link>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{oferta.titulo}</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  <span>{oferta.empresa.nombre_comercial}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{oferta.ubicacion}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{oferta.jornada}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                oferta.estado === 'activa'
                  ? 'bg-green-100 text-green-800'
                  : oferta.estado === 'pausada'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {oferta.estado.charAt(0).toUpperCase() + oferta.estado.slice(1)}
              </span>
              <div className="flex gap-2">
                <Link href={`/dashboard/ofertas/${oferta.id}/editar`}>
                  <button className="bg-yellow-100 text-yellow-600 p-2 rounded hover:bg-yellow-200 transition">
                    <Edit className="w-4 h-4" />
                  </button>
                </Link>
                <button
                  onClick={deleteOferta}
                  className="bg-red-100 text-red-600 p-2 rounded hover:bg-red-200 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Información de la Oferta */}
          <div className="lg:col-span-2 space-y-6">
            {/* Descripción */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Descripción del Puesto</h2>
              <p className="text-gray-700 leading-relaxed">{oferta.descripcion}</p>
            </div>

            {/* Requisitos */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Requisitos</h2>
              <p className="text-gray-700 leading-relaxed">{oferta.requisitos}</p>
            </div>

            {/* Tecnologías */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Tecnologías Requeridas</h2>
              <div className="flex flex-wrap gap-2">
                {oferta.tecnologias.map((tech, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {tech.nombre}
                  </span>
                ))}
              </div>
            </div>

            {/* Información de Contacto */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Información de Contacto</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{oferta.empresa.email}</span>
                </div>
                {oferta.empresa.telefono && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{oferta.empresa.telefono}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Panel Lateral */}
          <div className="space-y-6">
            {/* Detalles del Puesto */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Detalles del Puesto</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Tipo de Contrato</p>
                  <p className="font-medium text-gray-900">{oferta.tipo_contrato}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Jornada</p>
                  <p className="font-medium text-gray-900">{oferta.jornada}</p>
                </div>
                {oferta.salario_min && oferta.salario_max && (
                  <div>
                    <p className="text-sm text-gray-600">Salario</p>
                    <p className="font-medium text-gray-900">€{oferta.salario_min} - €{oferta.salario_max}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600">Fecha de Publicación</p>
                  <p className="font-medium text-gray-900">
                    {new Date(oferta.created_at).toLocaleDateString('es-ES')}
                  </p>
                </div>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Estadísticas</h2>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{oferta.postulaciones.length}</p>
                  <p className="text-sm text-gray-600">Postulaciones</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Postulaciones */}
        <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Postulaciones Recibidas</h2>
          </div>

          <div className="p-6">
            {oferta.postulaciones.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay postulaciones aún</h3>
                <p className="text-gray-600">Las postulaciones aparecerán aquí cuando los candidatos se postulen</p>
              </div>
            ) : (
              <div className="space-y-6">
                {oferta.postulaciones.map((postulacion) => (
                  <div key={postulacion.id} className="border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {postulacion.alumno.nombre}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            <span>{postulacion.alumno.email}</span>
                          </div>
                          {postulacion.alumno.telefono && (
                            <div className="flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              <span>{postulacion.alumno.telefono}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(postulacion.fecha_postulacion).toLocaleDateString('es-ES')}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          postulacion.estado === 'pendiente'
                            ? 'bg-yellow-100 text-yellow-800'
                            : postulacion.estado === 'aceptada'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {postulacion.estado === 'pendiente' && <AlertCircle className="w-4 h-4 inline mr-1" />}
                          {postulacion.estado === 'aceptada' && <CheckCircle className="w-4 h-4 inline mr-1" />}
                          {postulacion.estado === 'rechazada' && <XCircle className="w-4 h-4 inline mr-1" />}
                          {postulacion.estado.charAt(0).toUpperCase() + postulacion.estado.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Carta de Presentación */}
                    {postulacion.carta_presentacion && (
                      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Carta de Presentación</h4>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{postulacion.carta_presentacion}</p>
                      </div>
                    )}

                    {/* Perfil Profesional */}
                    {postulacion.alumno.perfil_profesional && (
                      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Perfil Profesional</h4>
                        {postulacion.alumno.perfil_profesional.resumen && (
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Resumen:</strong> {postulacion.alumno.perfil_profesional.resumen}
                          </p>
                        )}
                        {postulacion.alumno.perfil_profesional.experiencia && (
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Experiencia:</strong> {postulacion.alumno.perfil_profesional.experiencia}
                          </p>
                        )}
                        {postulacion.alumno.perfil_profesional.educacion && (
                          <p className="text-sm text-gray-700">
                            <strong>Educación:</strong> {postulacion.alumno.perfil_profesional.educacion}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Acciones */}
                    <div className="flex gap-2">
                      {postulacion.estado === 'pendiente' && (
                        <>
                          <button
                            onClick={() => updatePostulacionStatus(postulacion.id, 'aceptada')}
                            disabled={updatingStatus === postulacion.id}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition disabled:opacity-50"
                          >
                            {updatingStatus === postulacion.id ? 'Actualizando...' : 'Aceptar'}
                          </button>
                          <button
                            onClick={() => updatePostulacionStatus(postulacion.id, 'rechazada')}
                            disabled={updatingStatus === postulacion.id}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition disabled:opacity-50"
                          >
                            {updatingStatus === postulacion.id ? 'Actualizando...' : 'Rechazar'}
                          </button>
                        </>
                      )}
                      {postulacion.estado === 'aceptada' && (
                        <button
                          onClick={() => updatePostulacionStatus(postulacion.id, 'rechazada')}
                          disabled={updatingStatus === postulacion.id}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition disabled:opacity-50"
                        >
                          {updatingStatus === postulacion.id ? 'Actualizando...' : 'Rechazar'}
                        </button>
                      )}
                      {postulacion.estado === 'rechazada' && (
                        <button
                          onClick={() => updatePostulacionStatus(postulacion.id, 'aceptada')}
                          disabled={updatingStatus === postulacion.id}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition disabled:opacity-50"
                        >
                          {updatingStatus === postulacion.id ? 'Actualizando...' : 'Aceptar'}
                        </button>
                      )}
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
