'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Check, Layout, PenTool } from 'lucide-react';
import Link from 'next/link';

const COMUNIDADES = [
    "Andalucía", "Aragón", "Asturias", "Baleares", "Canarias", "Cantabria",
    "Castilla y León", "Castilla-La Mancha", "Cataluña", "Comunidad Valenciana",
    "Extremadura", "Galicia", "Madrid", "Murcia", "Navarra", "País Vasco", "La Rioja"
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

export default function EditarOferta() {
    const { token } = useAuth();
    const router = useRouter();
    const params = useParams();
    const id = params?.id;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        titulo: '', descripcion: '', ubicacion: '',
        tipo_contrato: '', salario_min: '', salario_max: '',
        estado: '', vacantes: 1
    });
    const [tecnologias, setTecnologias] = useState<string[]>([]);

    const formatVisualNumber = (val: string | number) => {
        if (val === null || val === undefined || val === '') return "";
        const cleanNumber = String(val).split('.')[0].replace(/\D/g, "");
        return new Intl.NumberFormat('de-DE').format(parseInt(cleanNumber));
    };

    useEffect(() => {
        const fetchOferta = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/ofertas/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
                });
                const json = await response.json();
                const o = json.data || json;

                setFormData({
                    titulo: o.titulo || '',
                    descripcion: o.descripcion || '',
                    ubicacion: o.ubicacion || '',
                    tipo_contrato: o.tipo_contrato || '',
                    salario_min: formatVisualNumber(o.salario_min),
                    salario_max: formatVisualNumber(o.salario_max),
                    estado: o.estado || 'activa',
                    vacantes: o.vacantes || 1
                });
                setTecnologias(o.tecnologias?.map((t: any) => t.nombre) || []);
            } catch (e) { console.error(e); }
            finally { setLoading(false); }
        };
        if (id && token) fetchOferta();
    }, [id, token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const body = {
            ...formData,
            salario_min: formData.salario_min.replace(/\./g, ""),
            salario_max: formData.salario_max.replace(/\./g, ""),
            tecnologias: tecnologias
        };

        try {
            const res = await fetch(`http://localhost:8000/api/ofertas/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(body)
            });
            if (res.ok) {
                router.push(`/dashboard/ofertas/${id}`);
                router.refresh();
            }
        } catch (e) { console.error(e); }
        finally { setSaving(false); }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-12 text-slate-900">
            <div className="max-w-7xl mx-auto px-6">

                {/* Cabecera de Edición */}
                <div className="mb-10">
                    <Link href={`/dashboard/ofertas/${id}`} className="inline-flex items-center text-slate-500 font-black uppercase text-[10px] tracking-widest hover:text-blue-600 transition-all mb-6 group">
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Cancelar y Volver
                    </Link>
                    <h1 className="text-4xl font-black tracking-tighter">EDITAR VACANTE</h1>
                    <p className="text-slate-500 font-bold mt-1 uppercase text-xs tracking-wider">ID de Oferta: #{id}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Bloque Principal Formulario */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-[2.5rem] border-2 border-blue-100 p-10 shadow-sm shadow-blue-900/5">
                            <div className="flex items-center gap-3 mb-8 border-b-2 border-slate-50 pb-6">
                                <Layout className="text-blue-600" size={24} />
                                <h2 className="text-xl font-black uppercase tracking-tight">Información General</h2>
                            </div>

                            <form id="edit-form" onSubmit={handleSubmit} className="space-y-8">
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Título de la Posición</label>
                                    <input type="text" required className="w-full border-2 border-slate-100 bg-slate-50/50 rounded-2xl p-4 font-black text-slate-700 outline-none focus:border-blue-600 focus:bg-white transition-all"
                                        value={formData.titulo} onChange={e => setFormData({ ...formData, titulo: e.target.value })} />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Descripción Detallada</label>
                                    <textarea rows={12} required className="w-full border-2 border-slate-100 bg-slate-50/50 rounded-2xl p-5 font-medium text-slate-600 outline-none focus:border-blue-600 focus:bg-white transition-all leading-relaxed"
                                        value={formData.descripcion} onChange={e => setFormData({ ...formData, descripcion: e.target.value })} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Ubicación</label>
                                        <select className="w-full border-2 border-slate-100 bg-slate-50/50 rounded-2xl p-4 font-black text-slate-700 outline-none focus:border-blue-600 transition-all appearance-none"
                                            value={formData.ubicacion} onChange={e => setFormData({ ...formData, ubicacion: e.target.value })}>
                                            {COMUNIDADES.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Número de Vacantes</label>
                                        <input type="number" min="1" className="w-full border-2 border-slate-100 bg-slate-50/50 rounded-2xl p-4 font-black text-slate-700 outline-none focus:border-blue-600 transition-all"
                                            value={formData.vacantes} onChange={e => setFormData({ ...formData, vacantes: parseInt(e.target.value) || 1 })} />
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Bloque Tecnologías */}
                        <div className="bg-white rounded-[2.5rem] border-2 border-blue-100 p-10 shadow-sm">
                            <div className="flex items-center gap-3 mb-8 border-b-2 border-slate-50 pb-6">
                                <PenTool className="text-blue-600" size={24} />
                                <h2 className="text-xl font-black uppercase tracking-tight">Stack Tecnológico Requerido</h2>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {TECNOLOGIAS_LISTA.map(t => (
                                    <button key={t} type="button"
                                        onClick={() => setTecnologias(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])}
                                        className={`px-5 py-3 rounded-xl font-black text-[10px] uppercase tracking-tighter border-2 transition-all flex items-center gap-2 ${tecnologias.includes(t)
                                            ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-100 scale-105'
                                            : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'
                                            }`}>
                                        {t} {tecnologias.includes(t) && <Check size={12} strokeWidth={4} />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Lateral de Control */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-[2.5rem] border-2 border-blue-100 p-8 shadow-sm h-fit sticky top-24">
                            <h2 className="text-xl font-black mb-8 uppercase tracking-tight border-b-2 border-slate-50 pb-4">Ajustes</h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Salario Mínimo (€)</label>
                                    <div className="relative">
                                        <input type="text" className="w-full border-2 border-slate-100 bg-slate-50/50 rounded-2xl p-4 font-black text-slate-700 outline-none focus:border-blue-600 transition-all pl-10"
                                            value={formData.salario_min} onChange={e => setFormData({ ...formData, salario_min: formatVisualNumber(e.target.value) })} />
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-slate-300">€</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Salario Máximo (€)</label>
                                    <div className="relative">
                                        <input type="text" className="w-full border-2 border-slate-100 bg-slate-50/50 rounded-2xl p-4 font-black text-slate-700 outline-none focus:border-blue-600 transition-all pl-10"
                                            value={formData.salario_max} onChange={e => setFormData({ ...formData, salario_max: formatVisualNumber(e.target.value) })} />
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-slate-300">€</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block tracking-widest">Estado de Publicación</label>
                                    <select className="w-full border-2 border-slate-100 bg-slate-50/50 rounded-2xl p-4 font-black text-slate-700 outline-none focus:border-blue-600 transition-all appearance-none"
                                        value={formData.estado} onChange={e => setFormData({ ...formData, estado: e.target.value })}>
                                        <option value="activa">Activa</option>
                                        <option value="pausada">Pausada</option>
                                        <option value="finalizada">Finalizada</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                form="edit-form"
                                type="submit"
                                disabled={saving}
                                className="w-full mt-10 bg-blue-600 text-white py-5 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-blue-700 hover:-translate-y-1 transition-all shadow-xl shadow-blue-100 disabled:bg-slate-200 disabled:shadow-none active:scale-95 flex items-center justify-center gap-3 border-2 border-blue-700"
                            >
                                {saving ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <Save size={18} strokeWidth={3} />
                                        Guardar Cambios
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}