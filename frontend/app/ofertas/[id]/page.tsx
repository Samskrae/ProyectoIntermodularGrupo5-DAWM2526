'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Navigation from '@/app/components/Navigation';
import { ArrowLeft, Briefcase, MapPin, DollarSign, Calendar, CheckCircle, Lock, Tag, Trash2 } from 'lucide-react';

// --- CONFIGURACIÓN DE COLORES (COHERENTE CON EL LISTADO) ---
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

interface Tecnologia { id: number; nombre: string; }

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
  created_at: string;
  tecnologias?: Tecnologia[];
  empresa: { id: number; nombre_comercial: string; };
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
    if (ofertaId) fetchOferta();
  }, [ofertaId]);

  const fetchOferta = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/ofertas/${ofertaId}`);
      if (response.ok) {
        const responseData = await response.json();
        setOferta(responseData.data || responseData);
      }
    } catch (error) {
      console.error('Error fetching oferta:', error);
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
    <div className="min-h-screen bg-[#F8FAFC] text-center py-20 font-bold text-slate-600 tracking-widest uppercase text-xs">Cargando oferta...</div>
  );

  if (!oferta) return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center py-20">
      <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">Oferta no encontrada</h2>
      <button onClick={() => router.push('/ofertas')} className="text-blue-600 font-black border-2 border-blue-600 px-6 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition-all">Volver al listado</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navigation />

      <div className="max-w-5xl mx-auto px-6 py-12 pt-32">
        <button
          onClick={() => router.push('/ofertas')}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 font-black uppercase text-xs tracking-widest transition-all group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Volver a todas las ofertas
        </button>

        {/* Header de oferta con Estilo Robusto */}
        <div className="bg-white rounded-[2.5rem] p-10 mb-8 border-2 border-blue-200 shadow-sm">
          <div className="mb-8">
            <h1 className="text-5xl font-black text-slate-900 mb-3 tracking-tighter leading-tight">{oferta.titulo}</h1>
            <p className="text-2xl text-blue-600 font-black tracking-tight uppercase">{oferta.empresa.nombre_comercial}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 pb-10 border-b-2 border-slate-50">
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 p-3 rounded-2xl border-2 border-blue-100">
                <MapPin size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ubicación</p>
                <p className="font-bold text-slate-800">{oferta.ubicacion || 'Remoto'}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-blue-50 p-3 rounded-2xl border-2 border-blue-100">
                <Briefcase size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contrato</p>
                <p className="font-bold text-slate-800">{oferta.tipo_contrato}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-emerald-50 p-3 rounded-2xl border-2 border-emerald-100">
                <DollarSign size={24} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Salario Anual</p>
                <p className="font-bold text-slate-800">
                  {new Intl.NumberFormat('es-ES').format(oferta.salario_min || 0)}€
                  {oferta.salario_max && ` - ${new Intl.NumberFormat('es-ES').format(oferta.salario_max)}€`}
                </p>
              </div>
            </div>
          </div>

          {/* Tecnologías con los Colores Respetados */}
          <div className="flex flex-wrap gap-2">
            {oferta.tecnologias && oferta.tecnologias.length > 0 ? (
              oferta.tecnologias.map((tech) => (
                <span key={tech.id} className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tighter border-2 shadow-sm ${getTechBadgeStyle(tech.nombre)}`}>
                  {tech.nombre}
                </span>
              ))
            ) : (
              <span className="text-slate-400 font-bold italic text-sm">Sin tecnologías especificadas</span>
            )}
          </div>

          <div className="mt-8 flex items-center gap-4 text-slate-500 font-bold text-xs uppercase tracking-widest">
            <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg">
              <span className="text-slate-900">{oferta.vacantes}</span> {oferta.vacantes === 1 ? 'vacante' : 'vacantes'}
            </div>
            <span className="text-slate-300">|</span>
            <div className="italic">
              Publicado el {new Date(oferta.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2rem] p-10 border-2 border-blue-200 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight border-b-4 border-blue-600 inline-block">Descripción</h2>
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap font-medium">{oferta.descripcion}</p>
            </div>

            {oferta.requisitos && (
              <div className="bg-white rounded-[2rem] p-10 border-2 border-blue-200 shadow-sm">
                <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight border-b-4 border-blue-600 inline-block">Requisitos</h2>
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap font-medium">{oferta.requisitos}</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2.5rem] p-8 border-2 border-blue-200 shadow-xl sticky top-32">
              {aplicado ? (
                <div className="text-center py-6">
                  <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-emerald-50">
                    <CheckCircle size={40} className="text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tighter uppercase">¡Postulado!</h3>
                  <p className="text-slate-500 font-bold text-sm tracking-tight">Tu solicitud se ha enviado correctamente a la empresa.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">Postularse</h3>
                  {userType === 'alumno' ? (
                    <form onSubmit={handleAplicar} className="space-y-5">
                      <div>
                        <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-3">Carta de presentación</label>
                        <textarea
                          value={cartaPresentacion}
                          onChange={(e) => setCartaPresentacion(e.target.value)}
                          placeholder="Diles por qué eres el candidato ideal..."
                          className="w-full px-5 py-4 bg-slate-50 text-slate-900 border-2 border-blue-100 rounded-2xl focus:border-blue-600 outline-none transition-all resize-none font-bold placeholder:text-slate-300"
                          rows={6}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={aplicando}
                        className="w-full bg-blue-600 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-blue-700 disabled:bg-slate-200 shadow-lg shadow-blue-100 transition-all active:scale-95"
                      >
                        {aplicando ? 'Enviando...' : 'Enviar Candidatura'}
                      </button>
                    </form>
                  ) : (
                    <div className="text-center space-y-6">
                      <div className="bg-slate-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto border-2 border-slate-200">
                        <Lock size={24} className="text-slate-400" />
                      </div>
                      <p className="text-slate-500 font-bold text-sm">
                        {userType === 'empresa' ? "Acceso solo para alumnos." : "Identifícate como alumno para aplicar."}
                      </p>
                      {!user && (
                        <button onClick={() => router.push('/login-alumno')} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-slate-100">
                          Ir al Login
                        </button>
                      )}
                    </div>
                  )}
                  {mensaje && !aplicado && (
                    <div className="mt-6 flex items-center justify-center gap-2 p-4 rounded-2xl bg-red-50 border-2 border-red-100 text-red-600 text-xs font-black uppercase tracking-widest">
                      {mensaje}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}