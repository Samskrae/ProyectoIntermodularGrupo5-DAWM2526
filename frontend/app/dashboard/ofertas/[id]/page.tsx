'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, MapPin, Users, Building2, Mail, Phone, Calendar, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface Oferta {
  id: number;
  titulo: string;
  descripcion: string;
  salario_min?: number;
  salario_max?: number;
  tipo_contrato: string;
  ubicacion: string;
  empresa: {
    nombre_comercial: string;
    email: string;
    telefono?: string;
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
    };
  }>;
  created_at: string;
  estado: string;
}

export default function OfertaDetail() {
  const { user, userType, token } = useAuth();
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [oferta, setOferta] = useState<Oferta | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);

  // Función para formatear el salario (14.500 €)
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    if (!user || userType !== 'empresa') {
      router.push('/auth');
      return;
    }
    if (id) fetchOfertaDetail();
  }, [user, userType, id, router]);

  const fetchOfertaDetail = async () => {
    if (!id || !token) return;
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/api/ofertas/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        setOferta(jsonResponse.data || jsonResponse);
      } else if (response.status === 404) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error fetching:', error);
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
        setOferta(prev => prev ? {
          ...prev,
          postulaciones: (prev.postulaciones || []).map(p =>
            p.id === postulacionId ? { ...p, estado: newStatus } : p
          )
        } : null);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!oferta) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center text-indigo-600 font-bold hover:gap-2 transition-all mb-6 group">
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:translate-x-[-4px] transition-transform" />
            Volver a la gestión
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">{oferta.titulo}</h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-500 font-medium">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-indigo-500" />
                  <span>{oferta.empresa?.nombre_comercial}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-indigo-500" />
                  <span>{oferta.ubicacion}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className={`px-5 py-2 rounded-2xl text-xs font-black uppercase tracking-widest ${oferta.estado === 'activa' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                {oferta.estado || 'activa'}
              </span>
              <div className="flex gap-2">
                <Link href={`/dashboard/ofertas/${oferta.id}/editar`}>
                  <button className="bg-white border border-gray-200 text-yellow-600 p-3 rounded-2xl hover:bg-yellow-50 transition shadow-sm">
                    <Edit className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-black text-gray-900 mb-5 border-b border-gray-50 pb-4">Descripción del Puesto</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap font-medium">{oferta.descripcion}</p>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-black text-gray-900 mb-5 border-b border-gray-50 pb-4">Stack Tecnológico</h2>
              <div className="flex flex-wrap gap-3">
                {oferta.tecnologias?.map((tech, index) => (
                  <span key={index} className="bg-indigo-50 text-indigo-600 px-5 py-2 rounded-xl text-sm font-bold border border-indigo-100">
                    {tech.nombre}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-black text-gray-900 mb-6 tracking-tight">Ficha Técnica</h2>
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-2xl">
                  <p className="text-[10px] uppercase font-black text-gray-400 mb-1 tracking-widest">Contrato</p>
                  <p className="font-bold text-gray-800">{oferta.tipo_contrato}</p>
                </div>
                {oferta.salario_min && (
                  <div className="bg-gray-50 p-4 rounded-2xl">
                    <p className="text-[10px] uppercase font-black text-gray-400 mb-1 tracking-widest">Rango Salarial</p>
                    <p className="font-bold text-gray-800">
                      {formatCurrency(oferta.salario_min)} - {oferta.salario_max ? formatCurrency(oferta.salario_max) : 'A convenir'}
                    </p>
                  </div>
                )}
                <div className="bg-gray-100 p-4 rounded-2xl border border-gray-200">
                  <p className="text-[10px] uppercase font-black text-gray-500 mb-1 tracking-widest">Publicado el</p>
                  <p className="font-bold text-gray-900">{new Date(oferta.created_at).toLocaleDateString('es-ES')}</p>
                </div>
              </div>
            </div>

            <div className="bg-indigo-600 rounded-[2.5rem] shadow-xl p-8 text-white">
              <div className="flex items-center gap-4 mb-2">
                <Users className="w-8 h-8 opacity-50" />
                <h2 className="text-4xl font-black">{oferta.postulaciones?.length || 0}</h2>
              </div>
              <p className="text-indigo-100 font-bold uppercase text-xs tracking-widest">Candidatos inscritos</p>
            </div>
          </div>
        </div>

        {/* Candidatos */}
        <div className="mt-12 bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-10 py-8 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-2xl font-black text-gray-900">Gestión de Candidatos</h2>
          </div>
          <div className="p-10">
            {(!oferta.postulaciones || oferta.postulaciones.length === 0) ? (
              <div className="text-center py-20 text-gray-400 font-bold italic">No hay postulaciones aún.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {oferta.postulaciones.map((postulacion) => (
                  <div key={postulacion.id} className="border-2 border-gray-50 rounded-[2rem] p-8 hover:border-indigo-100 transition-all">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-xl font-black text-gray-900 mb-2">{postulacion.alumno.nombre}</h3>
                        <div className="space-y-2 text-sm text-gray-500 font-medium">
                          <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-indigo-400" />{postulacion.alumno.email}</div>
                          <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-indigo-400" />Inscrito el {new Date(postulacion.fecha_postulacion).toLocaleDateString('es-ES')}</div>
                        </div>
                      </div>
                      <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${postulacion.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                        }`}>
                        {postulacion.estado}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => updatePostulacionStatus(postulacion.id, 'aceptada')}
                        className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all"
                      >
                        Aceptar
                      </button>
                      <button
                        onClick={() => updatePostulacionStatus(postulacion.id, 'rechazada')}
                        className="flex-1 bg-red-50 text-red-600 py-3 rounded-xl font-bold hover:bg-red-100 transition-all"
                      >
                        Rechazar
                      </button>
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