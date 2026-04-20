'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, Briefcase, DollarSign, Clock, Filter, Tag, ChevronRight, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

// --- CONFIGURACIÓN ---
const CAPITALES_ESPAÑA = [
  "Madrid", "Barcelona", "Valencia", "Sevilla", "Zaragoza", "Málaga", "Murcia", "Palma", "Las Palmas de Gran Canaria",
  "Bilbao", "Alicante", "Córdoba", "Valladolid", "Vigo", "Gijón", "Hospitalet de Llobregat", "Vitoria", "A Coruña", "Granada", "Elche"
];

const TIPOS_CONTRATO = ["Tiempo completo", "Tiempo parcial", "Contrato temporal", "Freelance", "Prácticas"];

const TECNOLOGIAS_DATA = [
  { categoria: 'Frontend', nombres: ['React', 'Next.js', 'Vue.js', 'Angular', 'Svelte', 'Tailwind CSS', 'Bootstrap', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3'] },
  { categoria: 'Backend', nombres: ['Laravel', 'Node.js', 'Python', 'Django', 'Express', 'Go', 'Ruby on Rails', 'PHP', 'Java', 'Spring Boot', 'NestJS'] },
  { categoria: 'Database & Cloud', nombres: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite', 'AWS', 'Firebase', 'Vercel'] },
  { categoria: 'DevOps & Tooling', nombres: ['Docker', 'Kubernetes', 'Git', 'GitHub Actions', 'GraphQL'] },
  { categoria: 'Móvil', nombres: ['React Native', 'Flutter', 'Swift', 'Kotlin'] }
];

const getTechBadgeStyle = (tech: string) => {
  const t = tech.toLowerCase();
  if (['react', 'next.js', 'typescript', 'tailwind css'].some(x => t.includes(x))) return 'bg-blue-50 text-blue-600 border-blue-100';
  if (['node.js', 'python', 'django', 'mongodb'].some(x => t.includes(x))) return 'bg-emerald-50 text-emerald-600 border-emerald-100';
  if (['laravel', 'php', 'mysql', 'sql'].some(x => t.includes(x))) return 'bg-indigo-50 text-indigo-600 border-indigo-100';
  if (['java', 'spring boot', 'angular'].some(x => t.includes(x))) return 'bg-red-50 text-red-600 border-red-100';
  return 'bg-amber-50 text-amber-600 border-amber-100';
};

interface Tecnologia { id: number; nombre: string; }
interface Empresa { id: number; nombre_comercial: string; }
interface OfertaEmpleo {
  id: number;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  salario_min: number;
  salario_max: number;
  tipo_contrato: string;
  created_at: string;
  empresa: Empresa;
  tecnologias: Tecnologia[];
}

export default function Ofertas() {
  const [ofertas, setOfertas] = useState<OfertaEmpleo[]>([]);
  const [filteredOfertas, setFilteredOfertas] = useState<OfertaEmpleo[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('todos');
  const [ubicacionFiltro, setUbicacionFiltro] = useState('todas');
  const [techFiltro, setTechFiltro] = useState<string[]>([]);

  const [salarioMin, setSalarioMin] = useState<number | ''>('');
  const [salarioInput, setSalarioInput] = useState('');

  useEffect(() => { fetchOfertas(); }, []);

  const fetchOfertas = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/ofertas');
      if (response.ok) {
        const data = await response.json();
        const lista = data.data || data;
        setOfertas(lista);
        setFilteredOfertas(lista);
      }
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  const handleSalarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    if (rawValue === '') {
      setSalarioInput('');
      setSalarioMin('');
      return;
    }
    const numericValue = parseInt(rawValue);
    setSalarioMin(numericValue);
    setSalarioInput(numericValue.toLocaleString('es-ES'));
  };

  useEffect(() => {
    let filtered = ofertas;
    if (searchTerm) {
      filtered = filtered.filter(o =>
        o.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.empresa?.nombre_comercial?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (tipoFiltro !== 'todos') filtered = filtered.filter(o => o.tipo_contrato === tipoFiltro);
    if (ubicacionFiltro !== 'todas') filtered = filtered.filter(o => o.ubicacion === ubicacionFiltro);
    if (salarioMin !== '') filtered = filtered.filter(o => o.salario_min >= salarioMin);
    if (techFiltro.length > 0) {
      filtered = filtered.filter(o =>
        techFiltro.every(t => o.tecnologias?.some(ot => ot.nombre === t))
      );
    }
    setFilteredOfertas(filtered);
  }, [searchTerm, tipoFiltro, ubicacionFiltro, techFiltro, salarioMin, ofertas]);

  const toggleTech = (tech: string) => {
    setTechFiltro(prev => prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]);
  };

  return (
    <div className="min-h-screen pt-28 pb-12 bg-[#F1F5F9]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12 relative overflow-hidden bg-blue-600 rounded-[2rem] p-12 text-white shadow-2xl">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-5xl font-extrabold mb-4 tracking-tight">Explora tu futuro</h1>
            <p className="text-blue-100 text-lg">
              Hay <span className="text-white font-bold">{filteredOfertas.length} oportunidades</span> esperándote.
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar de Filtros (Restaurado Completo) */}
          <aside className="lg:w-80">
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-sm sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                <Filter className="w-5 h-5 text-blue-600" />
                <h2 className="font-bold text-gray-900">Filtros Avanzados</h2>
              </div>

              {/* Filtro Contrato */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-500" /> Tipo de Contrato
                </label>
                <select
                  value={tipoFiltro}
                  onChange={(e) => setTipoFiltro(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-blue-600 outline-none"
                >
                  <option value="todos">Todos los contratos</option>
                  {TIPOS_CONTRATO.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* Filtro Salario con punto automático */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-500" /> Salario Mínimo (€)
                </label>
                <input
                  type="text"
                  placeholder="Ej: 30.000"
                  value={salarioInput}
                  onChange={handleSalarioChange}
                  className="w-full px-4 py-2.5 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-blue-600 outline-none"
                />
              </div>

              {/* Filtro Ubicación */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500" /> Ubicación
                </label>
                <select
                  value={ubicacionFiltro}
                  onChange={(e) => setUbicacionFiltro(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-blue-600 outline-none"
                >
                  <option value="todas">Cualquier ciudad</option>
                  {CAPITALES_ESPAÑA.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Tecnologías por Categorías (RECUPERADO) */}
              <div className="space-y-6 pt-6 border-t border-gray-100">
                <label className="block text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-blue-600" /> Tecnologías
                </label>
                {TECNOLOGIAS_DATA.map((cat, idx) => (
                  <div key={cat.categoria} className={`space-y-2 ${idx !== 0 ? 'pt-4 border-t border-gray-50' : ''}`}>
                    <p className="text-[10px] uppercase tracking-widest font-black text-gray-400">{cat.categoria}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.nombres.map(tech => (
                        <button
                          key={tech}
                          onClick={() => toggleTech(tech)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all border-2 ${techFiltro.includes(tech)
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-500 border-gray-100 hover:border-blue-200'
                            }`}
                        >
                          {tech}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => { setSearchTerm(''); setTipoFiltro('todos'); setUbicacionFiltro('todas'); setTechFiltro([]); setSalarioMin(''); setSalarioInput(''); }}
                className="w-full mt-10 py-3 text-xs font-bold text-red-500 hover:bg-red-50 border-2 border-red-100 rounded-xl transition-all"
              >
                Resetear Filtros
              </button>
            </div>
          </aside>

          {/* Listado */}
          <div className="flex-1 space-y-6">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Puesto, empresa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white border-2 border-gray-200 rounded-2xl shadow-sm focus:border-blue-600 outline-none transition-all"
              />
            </div>

            {loading ? (
              <div className="text-center py-20"><div className="w-10 h-10 border-4 border-t-blue-600 rounded-full animate-spin mx-auto" /></div>
            ) : filteredOfertas.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-gray-200">
                <Briefcase className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500 font-bold">No hay ofertas con estos criterios.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOfertas.map((oferta) => (
                  <motion.div key={oferta.id} layout className="bg-white rounded-3xl p-7 border-2 border-gray-100 shadow-sm hover:border-blue-300 transition-all group">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-blue-600">{oferta.titulo}</h3>
                          <span className="bg-blue-600 text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase">
                            {oferta.tipo_contrato}
                          </span>
                        </div>
                        <p className="text-blue-600 font-bold mb-4">{oferta.empresa?.nombre_comercial}</p>

                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 mb-6">
                          <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-blue-500" /> {oferta.ubicacion}</div>
                          <div className="flex items-center gap-1.5">
                            <DollarSign className="w-4 h-4 text-emerald-500" />
                            {Number(oferta.salario_min).toLocaleString('es-ES')}€ - {Number(oferta.salario_max).toLocaleString('es-ES')}€
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-orange-500" />
                            {new Date(oferta.created_at).toLocaleDateString('es-ES')}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {oferta.tecnologias?.map(t => (
                            <span key={t.id} className={`text-[11px] font-bold px-3 py-1.5 rounded-xl border ${getTechBadgeStyle(t.nombre)}`}>
                              {t.nombre}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Link href={`/ofertas/${oferta.id}`}>
                          <button className="bg-white text-blue-600 border-2 border-blue-600 px-5 py-2 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2 text-sm">
                            Ver Detalles <ChevronRight className="w-4 h-4" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}