'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Check } from 'lucide-react';
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

    // Función de formateo limpia
    const formatVisualNumber = (val: string | number) => {
    if (val === null || val === undefined || val === '') return "";
    // Convertimos a string y quitamos TODO lo que no sea número (incluyendo decimales .00)
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
    // AQUÍ ESTÁ EL ARREGLO: Limpiamos los decimales del backend antes de mostrar
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
    // Quitamos los puntos de miles para enviar número puro al back
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

    if (loading) return <div className="pt-24 text-center font-bold text-blue-700 uppercase">Cargando...</div>;

    return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-6">
            <Link href={`/dashboard/ofertas/${id}`}
                className="inline-flex items-center text-blue-700 font-bold mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Volver
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl border-2 border-gray-300 p-8 shadow-sm">
                        <h1
                            className="text-2xl font-black mb-8 text-gray-800 border-b-2 border-gray-100 pb-4 uppercase">
                            Editar Oferta</h1>
                        <form id="edit-form" onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-[11px] font-black text-gray-500 uppercase mb-2">Título de
                                    la Vacante</label>
                                <input type="text" required
                                    className="w-full border-2 border-gray-300 rounded-xl p-3 font-bold text-gray-700 outline-none focus:border-blue-700"
                                    value={formData.titulo} onChange={e=> setFormData({...formData, titulo:
                                e.target.value})} />
                            </div>
                            <div>
                                <label
                                    className="block text-[11px] font-black text-gray-500 uppercase mb-2">Descripción</label>
                                <textarea rows={10} required
                                    className="w-full border-2 border-gray-300 rounded-xl p-4 font-medium text-gray-600 outline-none focus:border-blue-700"
                                    value={formData.descripcion} onChange={e=> setFormData({...formData, descripcion: e.target.value})} />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[11px] font-black text-gray-500 uppercase mb-2">Ubicación</label>
                                        <select className="w-full border-2 border-gray-300 rounded-xl p-3 font-bold text-gray-700 bg-white"
                                            value={formData.ubicacion} onChange={e => setFormData({...formData, ubicacion: e.target.value})}>
                                            {COMUNIDADES.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-black text-gray-500 uppercase mb-2">Vacantes</label>
                                        <input type="number" min="1" className="w-full border-2 border-gray-300 rounded-xl p-3 font-bold text-gray-700 outline-none"
                                            value={formData.vacantes} onChange={e => setFormData({...formData, vacantes: parseInt(e.target.value) || 1})} />
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="bg-white rounded-2xl border-2 border-gray-300 p-8 shadow-sm">
                            <h2 className="text-lg font-black mb-6 text-gray-800 uppercase border-b-2 border-gray-100 pb-2">Tecnologías</h2>
                            <div className="flex flex-wrap gap-2">
                                {TECNOLOGIAS_LISTA.map(t => (
                                    <button key={t} type="button" 
                                        onClick={() => setTecnologias(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])}
                                        className={`px-4 py-2 rounded-xl font-bold text-xs border-2 transition-all flex items-center gap-2 ${
                                            tecnologias.includes(t) ? 'border-blue-700 bg-blue-50 text-blue-800' : 'border-gray-200 bg-white text-gray-400'
                                        }`}>
                                        {t} {tecnologias.includes(t) && <Check className="w-3 h-3" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border-2 border-gray-300 p-8 shadow-sm h-fit sticky top-24">
                        <h2 className="text-lg font-black mb-6 text-gray-800 uppercase border-b-2 border-gray-200 pb-2">Condiciones</h2>
                        <div className="space-y-5">
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">Salario Mínimo (€)</label>
                                <input type="text" className="w-full border-2 border-gray-300 rounded-xl p-3 font-bold text-gray-700 outline-none focus:border-blue-700"
                                    value={formData.salario_min} onChange={e => setFormData({...formData, salario_min: formatVisualNumber(e.target.value)})} />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">Salario Máximo (€)</label>
                                <input type="text" className="w-full border-2 border-gray-300 rounded-xl p-3 font-bold text-gray-700 outline-none focus:border-blue-700"
                                    value={formData.salario_max} onChange={e => setFormData({...formData, salario_max: formatVisualNumber(e.target.value)})} />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">Estado</label>
                                <select className="w-full border-2 border-gray-300 rounded-xl p-3 font-bold text-gray-700 bg-white"
                                    value={formData.estado} onChange={e => setFormData({...formData, estado: e.target.value})}>
                                    <option value="activa">🟢 Activa</option>
                                    <option value="pausada">🟡 Pausada</option>
                                    <option value="finalizada">🔴 Finalizada</option>
                                </select>
                            </div>
                        </div>
                        <button form="edit-form" type="submit" disabled={saving}
                            className="w-full mt-8 bg-blue-700 text-white py-4 rounded-xl font-black hover:bg-blue-800 transition active:scale-[0.98]">
                            <Save className="w-5 h-5 inline mr-2" /> {saving ? 'GUARDANDO...' : 'GUARDAR CAMBIOS'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}