'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, Briefcase, DollarSign, Clock, Filter, Tag, ChevronRight, FileText, Globe, Trash2 } from 'lucide-react';

// --- CONFIGURACIÓN ---
const COMUNIDADES = [
  "Andalucía", "Aragón", "Asturias", "Baleares", "Canarias", "Cantabria",
  "Castilla y León", "Castilla-La Mancha", "Cataluña", "Comunidad Valenciana",
  "Extremadura", "Galicia", "Madrid", "Murcia", "Navarra", "País Vasco", "La Rioja", "Remoto"
];

const TIPOS_CONTRATO = ["Tiempo completo", "Tiempo parcial", "Contrato temporal", "Freelance", "Prácticas"];

const getContratoStyle = (tipo: string) => {
  const t = tipo.toLowerCase();
  if (t.includes('completo')) return 'bg-slate-900 text-white border-slate-900';
  if (t.includes('parcial')) return 'bg-amber-100 text-amber-800 border-amber-400';
  if (t.includes('temporal')) return 'bg-purple-100 text-purple-800 border-purple-400';
  if (t.includes('freelance')) return 'bg-emerald-100 text-emerald-800 border-emerald-400';
  return 'bg-blue-100 text-blue-800 border-blue-400';
};

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

// Estilo de inputs con borde azul más oscuro (blue-200)
const inputBaseStyles = "w-full px-4 py-3 bg-slate-50 border-2 border-blue-200 rounded-xl focus:border-blue-600 focus:ring-0 outline-none transition-all font-bold text-slate-700 placeholder:text-slate-400";

export default function Ofertas() {
  const [ofertas, setOfertas] = useState<any[]>([]);
  const [filteredOfertas, setFilteredOfertas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('todos');
  const [ubicacionFiltro, setUbicacionFiltro] = useState('todas');
  const [techFiltro, setTechFiltro] = useState<string[]>([]);
  const [salarioMin, setSalarioMin] = useState<number | ''>('');
  const [salarioInput, setSalarioInput] = useState('');

  const resetFilters = () => {
    setSearchTerm('');
    setTipoFiltro('todos');
    setUbicacionFiltro('todas');
    setTechFiltro([]);
    setSalarioMin('');
    setSalarioInput('');
  };

  useEffect(() => {
    const fetchOfertas = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/ofertas');
        const data = await response.json();
        setOfertas(data.data || data);
        setFilteredOfertas(data.data || data);
      } catch (error) { console.error(error); } finally { setLoading(false); }
    };
    fetchOfertas();
  }, []);

  useEffect(() => {
    let filtered = ofertas;
    if (searchTerm) filtered = filtered.filter(o => o.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || o.empresa?.nombre_comercial?.toLowerCase().includes(searchTerm.toLowerCase()));
    if (tipoFiltro !== 'todos') filtered = filtered.filter(o => o.tipo_contrato === tipoFiltro);
    if (ubicacionFiltro !== 'todas') filtered = filtered.filter(o => o.ubicacion === ubicacionFiltro);
    if (salarioMin !== '') filtered = filtered.filter(o => Number(o.salario_min) >= salarioMin);
    if (techFiltro.length > 0) filtered = filtered.filter(o => techFiltro.every(t => o.tecnologias?.some((ot: any) => ot.nombre === t)));
    setFilteredOfertas(filtered);
  }, [searchTerm, tipoFiltro, ubicacionFiltro, techFiltro, salarioMin, ofertas]);

  return (
    <div className="min-h-screen pt-28 pb-12 bg-[#F8FAFC]">
      {/* Estilos para la barra azulilla y scrollbars */}
      <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 8px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #eff6ff; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #bfdbfe; border-radius: 10px; border: 2px solid #eff6ff; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3b82f6; }
            `}</style>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 bg-gradient-to-r from-blue-600 to-blue-400 rounded-[2.5rem] p-12 text-white shadow-lg border-b-4 border-blue-700/20">
          <h1 className="text-6xl font-black mb-4 tracking-tighter">Explora las Ofertas</h1>
          <p className="text-blue-50 text-xl font-medium max-w-2xl">
            Hay <span className="text-white font-black underline decoration-white/40 underline-offset-4">{filteredOfertas.length} posiciones</span> esperándote.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <aside className="lg:w-80">
            <div className="bg-white rounded-[2rem] p-8 border-2 border-blue-200 shadow-sm sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
              <div className="flex items-center gap-2 mb-8 border-b-2 border-slate-100 pb-4">
                <Filter className="w-5 h-5 text-blue-600" />
                <h2 className="font-black text-slate-800 uppercase tracking-wider text-sm">Filtros</h2>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Contrato</label>
                  <select value={tipoFiltro} onChange={(e) => setTipoFiltro(e.target.value)} className={inputBaseStyles}>
                    <option value="todos">Cualquier tipo</option>
                    {TIPOS_CONTRATO.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Salario Mínimo</label>
                  <input type="text" placeholder="Ej: 30.000" value={salarioInput}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setSalarioInput(val ? parseInt(val).toLocaleString('es-ES') : '');
                      setSalarioMin(val ? parseInt(val) : '');
                    }} className={inputBaseStyles} />
                </div>

                <div>
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Ubicación</label>
                  <select value={ubicacionFiltro} onChange={(e) => setUbicacionFiltro(e.target.value)} className={inputBaseStyles}>
                    <option value="todas">Toda España</option>
                    {COMUNIDADES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="pt-6 border-t-2 border-slate-100 space-y-6">
                  {TECNOLOGIAS_DATA.map((cat) => (
                    <div key={cat.categoria} className="space-y-2">
                      <p className="text-[9px] uppercase font-black text-slate-400">{cat.categoria}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.nombres.map(tech => (
                          <button key={tech} onClick={() => setTechFiltro(prev => prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech])}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border-2 transition-all ${techFiltro.includes(tech) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-blue-200 hover:border-blue-400'}`}>
                            {tech}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Botón Borrar Filtros - Rojo y con Borde Rojo */}
                <button
                  onClick={resetFilters}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 border-2 border-red-600 bg-red-50 text-red-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm shadow-red-100"
                >
                  <Trash2 size={14} /> Borrar Filtros
                </button>
              </div>
            </div>
          </aside>

          {/* Listado */}
          <div className="flex-1 space-y-6">
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600" />
              <input type="text" placeholder="Busca por cargo o empresa..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-white border-2 border-blue-200 rounded-[1.5rem] shadow-sm focus:border-blue-600 outline-none transition-all text-slate-700 font-bold" />
            </div>

            <div className="space-y-4">
              {filteredOfertas.map((oferta) => (
                <div key={oferta.id} className="bg-white rounded-[2rem] p-8 border-2 border-blue-200 shadow-sm hover:border-blue-600 transition-all">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">{oferta.titulo}</h3>
                        <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest border-2 ${getContratoStyle(oferta.tipo_contrato)}`}>
                          {oferta.tipo_contrato}
                        </span>
                      </div>
                      <p className="text-blue-600 font-black text-sm mb-6 uppercase tracking-wider">{oferta.empresa?.nombre_comercial}</p>

                      <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-600 mb-8 font-bold">
                        <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400" /> {oferta.ubicacion}</div>
                        <div className="flex items-center gap-2 text-slate-950"><DollarSign className="w-4 h-4 text-emerald-600" />
                          {Number(oferta.salario_min).toLocaleString('es-ES')}€ - {Number(oferta.salario_max).toLocaleString('es-ES')}€
                        </div>
                        <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-400" />
                          {new Date(oferta.created_at).toLocaleDateString('es-ES')}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {oferta.tecnologias?.map((t: any) => (
                          <span key={t.id} className={`text-[10px] font-black px-3 py-1.5 rounded-xl border-2 uppercase tracking-tighter ${getTechBadgeStyle(t.nombre)}`}>
                            {t.nombre}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Link href={`/ofertas/${oferta.id}`}>
                        <button className="bg-white text-slate-950 border-2 border-blue-200 px-6 py-3 rounded-2xl font-black hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all flex items-center gap-2 text-xs uppercase tracking-widest shadow-sm">
                          Detalles <ChevronRight className="w-4 h-4" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}