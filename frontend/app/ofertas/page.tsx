'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, Briefcase, DollarSign, Clock, Filter, Tag, ChevronRight, FileText, Globe } from 'lucide-react';

// --- CONFIGURACIÓN ---
const COMUNIDADES = [
  "Andalucía", "Aragón", "Asturias", "Baleares", "Canarias", "Cantabria",
  "Castilla y León", "Castilla-La Mancha", "Cataluña", "Comunidad Valenciana",
  "Extremadura", "Galicia", "Madrid", "Murcia", "Navarra", "País Vasco", "La Rioja", "Remoto"
];

const TIPOS_CONTRATO = ["Tiempo completo", "Tiempo parcial", "Contrato temporal", "Freelance", "Prácticas"];

// Estilos para tipos de contrato con bordes más definidos
const getContratoStyle = (tipo: string) => {
  const t = tipo.toLowerCase();
  if (t.includes('completo')) return 'bg-slate-900 text-white border-slate-900';
  if (t.includes('parcial')) return 'bg-amber-100 text-amber-800 border-amber-300';
  if (t.includes('temporal')) return 'bg-purple-100 text-purple-800 border-purple-300';
  if (t.includes('freelance')) return 'bg-emerald-100 text-emerald-800 border-emerald-300';
  return 'bg-blue-100 text-blue-800 border-blue-300'; // Prácticas / Otros
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
    // Bordes subidos de -100 a -200/300 para más definición
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    orange: 'bg-orange-50 text-orange-700 border-orange-200',
    pink: 'bg-pink-50 text-pink-700 border-pink-200',
    gray: 'bg-slate-50 text-slate-700 border-slate-200'
  };
  return styles[color];
};

// Estilo base para inputs y selects con borde más grueso (border-2) y oscuro (blue-100)
const inputBaseStyles = "w-full px-4 py-3 bg-slate-50 border-2 border-blue-100 rounded-xl focus:border-blue-600 focus:ring-0 outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400";

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

  useEffect(() => {
    const fetchOfertas = async () => {
      try {
        // Simulación de fetch. Reemplazar con tu llamada real a la API
        const response = await fetch('http://localhost:8000/api/ofertas');
        const data = await response.json();
        const lista = data.data || data;
        setOfertas(lista);
        setFilteredOfertas(lista);
      } catch (error) {
        console.error(error);
        // Datos de prueba por si falla la API
        const dummyData = [
          { id: 1, titulo: 'Senior Frontend Developer', empresa: { nombre_comercial: 'TechSolutions' }, ubicacion: 'Madrid', salario_min: 45000, salario_max: 55000, tipo_contrato: 'Tiempo completo', created_at: new Date(), tecnologias: [{ id: 1, nombre: 'React' }, { id: 2, nombre: 'TypeScript' }] },
          { id: 2, titulo: 'Backend Engineer (Python)', empresa: { nombre_comercial: 'DataCo' }, ubicacion: 'Barcelona', salario_min: 50000, salario_max: 60000, tipo_contrato: 'Tiempo completo', created_at: new Date(), tecnologias: [{ id: 3, nombre: 'Python' }, { id: 4, nombre: 'Docker' }] },
        ];
        setOfertas(dummyData);
        setFilteredOfertas(dummyData);
      } finally {
        setLoading(false);
      }
    };
    fetchOfertas();
  }, []);

  useEffect(() => {
    let filtered = ofertas;
    if (searchTerm) {
      filtered = filtered.filter(o => o.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || o.empresa?.nombre_comercial?.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (tipoFiltro !== 'todos') filtered = filtered.filter(o => o.tipo_contrato === tipoFiltro);
    if (ubicacionFiltro !== 'todas') filtered = filtered.filter(o => o.ubicacion === ubicacionFiltro);
    if (salarioMin !== '') filtered = filtered.filter(o => Number(o.salario_min) >= salarioMin);
    if (techFiltro.length > 0) {
      filtered = filtered.filter(o => techFiltro.every(t => o.tecnologias?.some((ot: any) => ot.nombre === t)));
    }
    setFilteredOfertas(filtered);
  }, [searchTerm, tipoFiltro, ubicacionFiltro, techFiltro, salarioMin, ofertas]);

  return (
    <div className="min-h-screen pt-28 pb-12 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header - Se mantiene igual */}
        <div className="mb-12 bg-gradient-to-r from-blue-600 to-blue-400 rounded-[2.5rem] p-12 text-white shadow-lg">
          <h1 className="text-6xl font-black mb-4 tracking-tighter">Explora las Ofertas</h1>
          <p className="text-blue-50 text-xl font-medium max-w-2xl">
            Hay <span className="text-white font-black underline decoration-white/40 underline-offset-4">{filteredOfertas.length} posiciones</span> esperándote.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar - Borde general aumentado (border-2) y más oscuro (blue-100) */}
          <aside className="lg:w-80">
            <div className="bg-white rounded-[2rem] p-8 border-2 border-blue-100 shadow-sm sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
              <div className="flex items-center gap-2 mb-8 border-b-2 border-slate-100 pb-4">
                <Filter className="w-5 h-5 text-blue-600" />
                <h2 className="font-black text-slate-800 uppercase tracking-wider text-sm">Filtros</h2>
              </div>

              <div className="mb-8">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Contrato</label>
                <select value={tipoFiltro} onChange={(e) => setTipoFiltro(e.target.value)} className={inputBaseStyles}>
                  <option value="todos">Cualquier tipo</option>
                  {TIPOS_CONTRATO.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="mb-8">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Salario Mínimo</label>
                <input type="text" placeholder="Ej: 30.000" value={salarioInput}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    setSalarioInput(val ? parseInt(val).toLocaleString('es-ES') : '');
                    setSalarioMin(val ? parseInt(val) : '');
                  }} className={inputBaseStyles} />
              </div>

              <div className="mb-8">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Ubicación</label>
                <select value={ubicacionFiltro} onChange={(e) => setUbicacionFiltro(e.target.value)} className={inputBaseStyles}>
                  <option value="todas">Toda España</option>
                  {COMUNIDADES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="space-y-6 pt-6 border-t-2 border-slate-100">
                {TECNOLOGIAS_DATA.map((cat) => (
                  <div key={cat.categoria} className="space-y-2">
                    <p className="text-[9px] uppercase font-black text-slate-400">{cat.categoria}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.nombres.map(tech => (
                        <button key={tech} onClick={() => setTechFiltro(prev => prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech])}
                          // Borde por defecto aumentado a border-2 y blue-100
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border-2 transition-all ${techFiltro.includes(tech) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-blue-100 hover:border-blue-300'}`}>
                          {tech}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Listado */}
          <div className="flex-1 space-y-6">
            {/* Buscador - Borde aumentado a border-2 y blue-100 */}
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600" />
              <input type="text" placeholder="Busca por cargo o empresa..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-white border-2 border-blue-100 rounded-[1.5rem] shadow-sm focus:border-blue-600 outline-none transition-all text-slate-700 font-medium placeholder:text-slate-400" />
            </div>

            {loading ? (
              <div className="text-center py-20"><div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto" /></div>
            ) : filteredOfertas.length === 0 ? (
              <div className="bg-white rounded-[2rem] p-16 text-center border-2 border-blue-100 shadow-sm">
                <Globe className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-800">No hay ofertas</h3>
                <p className="text-slate-500">Prueba a cambiar los filtros.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOfertas.map((oferta) => (
                  // Tarjeta - Borde aumentado a border-2 y blue-100
                  <div key={oferta.id} className="bg-white rounded-[2rem] p-8 border-2 border-blue-100 shadow-sm hover:border-blue-600 transition-all">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-black text-slate-900 tracking-tight">{oferta.titulo}</h3>
                          {/* Badge Contrato - Borde añadido (border) */}
                          <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest border ${getContratoStyle(oferta.tipo_contrato)}`}>
                            {oferta.tipo_contrato}
                          </span>
                        </div>
                        <p className="text-blue-600 font-black text-sm mb-6 uppercase tracking-wider">{oferta.empresa?.nombre_comercial}</p>

                        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-600 mb-8 font-medium">
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
                            // Badge Tech - Borde subido de grosor en getTechBadgeStyle
                            <span key={t.id} className={`text-[10px] font-black px-3 py-1.5 rounded-xl border uppercase tracking-tighter ${getTechBadgeStyle(t.nombre)}`}>
                              {t.nombre}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Link href={`/ofertas/${oferta.id}`}>
                          {/* Botón Detalles - Borde aumentado a border-2 y blue-100 */}
                          <button className="bg-white text-slate-950 border-2 border-blue-100 px-6 py-3 rounded-2xl font-black hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all flex items-center gap-2 text-xs uppercase tracking-widest shadow-sm">
                            Detalles <ChevronRight className="w-4 h-4" />
                          </button>
                        </Link>
                      </div>
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