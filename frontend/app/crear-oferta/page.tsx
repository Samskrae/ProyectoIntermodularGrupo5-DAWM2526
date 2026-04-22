'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Briefcase, MapPin, DollarSign, FileText, Tag, Users, Check } from 'lucide-react';
import Link from 'next/link';

const COMUNIDADES = [
  "Andalucía", "Aragón", "Asturias", "Baleares", "Canarias", "Cantabria",
  "Castilla-La Mancha", "Castilla y León", "Cataluña", "Comunidad Valenciana",
  "Extremadura", "Galicia", "Madrid", "Murcia", "Navarra", "País Vasco", "La Rioja", "Remoto"
];

const TECNOLOGIAS_LISTA = [
  'React', 'Next.js', 'Vue.js', 'Angular', 'Svelte', 'Tailwind CSS',
  'Bootstrap', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Laravel',
  'Node.js', 'Python', 'Django', 'Express', 'Go', 'Ruby on Rails',
  'PHP', 'Java', 'Spring Boot', 'NestJS', 'PostgreSQL', 'MySQL',
  'MongoDB', 'Redis', 'SQLite', 'Docker', 'Kubernetes', 'Git',
  'GitHub Actions', 'AWS', 'Firebase', 'Vercel', 'React Native',
  'Flutter', 'Swift', 'Kotlin', 'GraphQL'
];

export default function CrearOferta() {
  const { user, userType, token } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    salario_min: '',
    salario_max: '',
    tipo_contrato: 'Tiempo completo',
    ubicacion: 'Madrid',
    vacantes: '1',
  });

  const [tecnologias, setTecnologias] = useState<string[]>([]);

  useEffect(() => {
    if (!user || userType !== 'empresa') {
      router.push('/auth');
    }
  }, [user, userType, router]);

  const formatVisualNumber = (val: string) => {
    if (!val) return "";
    const cleanNumber = val.replace(/\D/g, "");
    return new Intl.NumberFormat('de-DE').format(parseInt(cleanNumber));
  };

  const handleSalarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/g, "");
    setFormData(prev => ({ ...prev, [name]: numericValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const body = {
      ...formData,
      vacantes: parseInt(formData.vacantes) || 1,
      salario_min: formData.salario_min ? parseInt(formData.salario_min) : null,
      salario_max: formData.salario_max ? parseInt(formData.salario_max) : null,
      tecnologias: tecnologias,
      sector: 'Tecnología',
      requisitos: 'Consultar descripción',
      estado: 'activa'
    };

    try {
      const res = await fetch('http://localhost:8000/api/ofertas', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        router.push('/dashboard');
        router.refresh();
      } else {
        alert("Error al crear la oferta.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = "w-full px-6 py-4 bg-white border-2 border-blue-100 rounded-2xl focus:border-blue-600 outline-none transition-all text-gray-800 font-medium shadow-sm shadow-blue-50/50";

  return (
    <div className="min-h-screen bg-[#F0F7FF] pt-24 pb-12 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto px-6">

        <Link href="/dashboard" className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-800 mb-6 uppercase tracking-tight">
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver al panel
        </Link>

        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-10">Publicar Nueva Oferta</h1>

        <form id="crear-oferta-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2.5rem] shadow-xl border border-blue-50 p-8 md:p-10">
              <div className="space-y-8">
                <div>
                  <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
                    <Briefcase size={14} className="text-blue-600" /> Título
                  </label>
                  <input type="text" required value={formData.titulo}
                    onChange={e => setFormData({ ...formData, titulo: e.target.value })}
                    className={inputStyles + " font-bold"} placeholder="Ej: Fullstack Developer" />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
                    <FileText size={14} className="text-blue-600" /> Descripción
                  </label>
                  <textarea required rows={10} value={formData.descripcion}
                    onChange={e => setFormData({ ...formData, descripcion: e.target.value })}
                    className={inputStyles + " resize-none"} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-xl border border-blue-50 p-8 md:p-10">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 mb-6">
                <Tag size={14} className="text-blue-600" /> Tecnologías
              </label>
              <div className="flex flex-wrap gap-2">
                {TECNOLOGIAS_LISTA.map(t => (
                  <button key={t} type="button"
                    onClick={() => setTecnologias(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])}
                    className={`px-4 py-2 rounded-xl font-bold text-xs border-2 transition-all flex items-center gap-2 ${tecnologias.includes(t) ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-100 text-gray-400 hover:border-blue-200'
                      }`}>
                    {t} {tecnologias.includes(t) && <Check size={12} />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-[2.5rem] shadow-xl border border-blue-50 p-8 sticky top-24">
              <h3 className="text-lg font-black text-slate-900 mb-6">Condiciones</h3>

              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 mb-2">
                    <MapPin size={12} className="text-blue-600" /> Ubicación
                  </label>
                  <select
                    value={formData.ubicacion}
                    onChange={e => setFormData({ ...formData, ubicacion: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-blue-50 rounded-xl font-bold text-sm bg-white outline-none focus:border-blue-600"
                  >
                    {COMUNIDADES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Mín (€)</label>
                    <input
                      type="text"
                      name="salario_min"
                      value={formatVisualNumber(formData.salario_min)}
                      onChange={handleSalarioChange}
                      className="w-full px-4 py-3 border-2 border-blue-50 rounded-xl font-bold text-sm outline-none focus:border-blue-600"
                      placeholder="20.000"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Máx (€)</label>
                    <input
                      type="text"
                      name="salario_max"
                      value={formatVisualNumber(formData.salario_max)}
                      onChange={handleSalarioChange}
                      className="w-full px-4 py-3 border-2 border-blue-50 rounded-xl font-bold text-sm outline-none focus:border-blue-600"
                      placeholder="45.000"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 mb-2">
                    <Users size={12} className="text-blue-600" /> Vacantes
                  </label>
                  <input type="number" min="1" value={formData.vacantes}
                    onChange={e => setFormData({ ...formData, vacantes: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-blue-50 rounded-xl font-bold text-sm outline-none focus:border-blue-600" />
                </div>
              </div>

              <button
                type="submit"
                form="crear-oferta-form"
                disabled={loading}
                className="w-full mt-10 py-5 bg-blue-600 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all disabled:bg-slate-200 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : 'Publicar Ahora'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}