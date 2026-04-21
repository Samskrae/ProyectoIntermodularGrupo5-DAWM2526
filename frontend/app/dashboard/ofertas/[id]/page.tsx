'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, MapPin, Users, Building2, Mail, Calendar, Edit, Trash2, DollarSign, Briefcase } from 'lucide-react';
import Link from 'next/link';

// --- CONFIGURACIÓN DE COLORES DE TECNOLOGÍAS ---
const TECNOLOGIAS_DATA = [
  { categoria: 'Frontend', color: 'blue', nombres: ['React', 'Next.js', 'Vue.js', 'Angular', 'Svelte', 'Tailwind CSS', 'Bootstrap', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3'] },
  { categoria: 'Backend', color: 'emerald', nombres: ['Laravel', 'Node.js', 'Python', 'Django', 'Express', 'Go', 'Ruby on Rails', 'PHP', 'Java', 'Spring Boot', 'NestJS'] },
  { categoria: 'Database & Cloud', color: 'indigo', nombres: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite', 'AWS', 'Firebase', 'Vercel'] },
  { categoria: 'DevOps & Tooling', color: 'orange', nombres: ['Docker', 'Kubernetes', 'Git', 'GitHub Actions', 'GraphQL'] },
  { categoria: 'Móvil', color: 'pink', nombres: ['React Native', 'Flutter', 'Swift', 'Kotlin'] }
];

const getTechBadgeStyle = (techName: string) => {
  const category = TECNOLOGIAS_DATA.find(cat => cat.nombres.includes(techName));
  const color = category?.color || 'gray';
  const styles: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-800 border-blue-300',
    emerald: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    indigo: 'bg-indigo-50 text-indigo-800 border-indigo-300',
    orange: 'bg-orange-50 text-orange-800 border-orange-300',
    pink: 'bg-pink-50 text-pink-800 border-pink-300',
    gray: 'bg-slate-50 text-slate-800 border-slate-300'
  };
  return styles[color];
};

interface Oferta {
  id: number;
  titulo: string;
  descripcion: string;
  salario_min?: number;
  salario_max?: number;
  tipo_contrato: string;
  ubicacion: string;
  empresa: { nombre_comercial: string; email: string; telefono?: string; };
  tecnologias: Array<{ nombre: string }>;
  postulaciones: Array<{
    id: number;
    estado: string;
    fecha_postulacion: string;
    carta_presentacion?: string;
    alumno: { id: number; nombre: string; email: string; };
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0,
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
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
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
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!oferta) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header con estilo Dashboard */}
        <div className="mb-10">
          <Link href="/dashboard" className="inline-flex items-center text-slate-500 font-black uppercase text-xs tracking-widest hover:text-blue-600 transition-all mb-8 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Volver al Panel
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-5xl font-black text-slate-900 mb-3 tracking-tighter leading-tight">{oferta.titulo}</h1>
              <div className="flex flex-wrap items-center gap-6 text-slate-500 font-bold uppercase text-[10px] tracking-widest">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-500" />
                  <span>{oferta.empresa?.nombre_comercial}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span>{oferta.ubicacion}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest border-2 ${oferta.estado === 'activa' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                {oferta.estado || 'activa'}
              </span>
              <Link href={`/dashboard/ofertas/${oferta.id}/editar`}>
                <button className="bg-white border-2 border-blue-100 text-blue-600 p-3 rounded-2xl hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm group">
                  <Edit className="w-5 h-5 group-active:scale-90 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2.5rem] shadow-sm border-2 border-blue-50 p-10">
              <h2 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-tight border-b-4 border-blue-600 inline-block">Descripción</h2>
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap font-medium text-lg">{oferta.descripcion}</p>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border-2 border-blue-50 p-10">
              <h2 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-tight border-b-4 border-blue-600 inline-block">Stack Tecnológico</h2>
              <div className="flex flex-wrap gap-3">
                {oferta.tecnologias?.map((tech, index) => (
                  <span key={index} className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-tighter border-2 shadow-sm ${getTechBadgeStyle(tech.nombre)}`}>
                    {tech.nombre}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-[2.5rem] shadow-sm border-2 border-blue-50 p-8">
              <h2 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tight">Ficha Técnica</h2>
              <div className="space-y-6">
                <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-100">
                  <div className="flex items-center gap-3 mb-1">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Contrato</p>
                  </div>
                  <p className="font-black text-slate-800 ml-7">{oferta.tipo_contrato}</p>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-100">
                  <div className="flex items-center gap-3 mb-1">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Salario Anual</p>
                  </div>
                  <p className="font-black text-slate-800 ml-7">
                    {oferta.salario_min ? `${formatCurrency(oferta.salario_min)} - ${oferta.salario_max ? formatCurrency(oferta.salario_max) : 'A convenir'}` : 'Sin especificar'}
                  </p>
                </div>

                <div className="bg-blue-600 p-5 rounded-2xl shadow-lg shadow-blue-100">
                  <div className="flex items-center gap-3 mb-1">
                    <Calendar className="w-4 h-4 text-blue-100" />
                    <p className="text-[10px] uppercase font-black text-blue-100 tracking-widest">Publicado</p>
                  </div>
                  <p className="font-black text-white ml-7 text-lg">{new Date(oferta.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
            </div>

            {/* Contador de Candidatos Estilo Tarjeta Stats */}
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 border-2 border-blue-200 p-10 flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Candidatos Inscritos</p>
                <p className="text-5xl font-black text-blue-600">{oferta.postulaciones?.length || 0}</p>
              </div>
              <Users className="text-blue-100" size={56} strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Listado de Candidatos */}
        <div className="mt-12 bg-white rounded-[3rem] shadow-sm border-2 border-blue-200 overflow-hidden">
          <div className="px-10 py-8 border-b-2 border-slate-50 bg-slate-50/30">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Gestión de Candidatos</h2>
          </div>
          <div className="p-10">
            {(!oferta.postulaciones || oferta.postulaciones.length === 0) ? (
              <div className="text-center py-20 text-slate-300 font-black uppercase tracking-widest italic">No hay postulaciones registradas.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {oferta.postulaciones.map((postulacion) => (
                  <div key={postulacion.id} className="border-2 border-blue-50 rounded-[2rem] p-8 hover:border-blue-200 hover:bg-blue-50/10 transition-all group">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tighter group-hover:text-blue-600 transition-colors">{postulacion.alumno.nombre}</h3>
                        <div className="space-y-3 font-bold text-xs uppercase tracking-tight text-slate-500">
                          <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-blue-400" />{postulacion.alumno.email}</div>
                          <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-blue-400" />Inscrito: {new Date(postulacion.fecha_postulacion).toLocaleDateString('es-ES')}</div>
                        </div>
                      </div>
                      <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 ${postulacion.estado === 'pendiente' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                        postulacion.estado === 'aceptada' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                          'bg-red-50 text-red-600 border-red-200'
                        }`}>
                        {postulacion.estado}
                      </span>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={() => updatePostulacionStatus(postulacion.id, 'aceptada')}
                        disabled={updatingStatus === postulacion.id}
                        className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-700 disabled:bg-slate-200 transition-all shadow-md shadow-blue-100"
                      >
                        Aceptar
                      </button>
                      <button
                        onClick={() => updatePostulacionStatus(postulacion.id, 'rechazada')}
                        disabled={updatingStatus === postulacion.id}
                        className="flex-1 bg-red-50 text-red-600 py-4 rounded-2xl font-black uppercase text-xs tracking-widest border-2 border-red-100 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
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