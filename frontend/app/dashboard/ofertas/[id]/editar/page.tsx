'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function EditarOferta() {
    const { user, userType, token } = useAuth();
    const router = useRouter();
    const params = useParams();
    const id = params?.id;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        ubicacion: '',
        tipo_contrato: 'Tiempo Completo',
        salario_min: '',
        salario_max: '',
        estado: 'activa'
    });

    useEffect(() => {
        if (!user || userType !== 'empresa') {
            router.push('/auth');
            return;
        }
        if (id) fetchOferta();
    }, [id, user, userType]);

    const fetchOferta = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/ofertas/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            if (response.ok) {
                const json = await response.json();
                const o = json.data || json;
                setFormData({
                    titulo: o.titulo || '',
                    descripcion: o.descripcion || '',
                    ubicacion: o.ubicacion || '',
                    tipo_contrato: o.tipo_contrato || 'Tiempo Completo',
                    salario_min: o.salario_min || '',
                    salario_max: o.salario_max || '',
                    estado: o.estado || 'activa'
                });
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const response = await fetch(`http://localhost:8000/api/ofertas/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                router.push(`/dashboard/ofertas/${id}`);
                router.refresh(); // Forzar actualización de datos
            } else {
                alert('Error al actualizar la oferta');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#F8FAFC] pt-24 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-6">
                <Link href={`/dashboard/ofertas/${id}`} className="inline-flex items-center text-indigo-600 font-bold mb-8 group">
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:translate-x-[-4px] transition-transform" />
                    Cancelar y volver
                </Link>

                <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-10">
                    <h1 className="text-3xl font-black text-gray-900 mb-8">Editar Oferta</h1>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2">Título de la vacante</label>
                                <input
                                    type="text" required
                                    className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl p-4 focus:bg-white focus:border-indigo-500 outline-none transition-all font-medium"
                                    value={formData.titulo}
                                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2">Ubicación</label>
                                <input
                                    type="text" required
                                    className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl p-4 focus:bg-white focus:border-indigo-500 outline-none transition-all font-medium"
                                    value={formData.ubicacion}
                                    onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2">Estado de la oferta</label>
                                <select
                                    className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl p-4 focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold text-gray-700"
                                    value={formData.estado}
                                    onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                                >
                                    <option value="activa">🟢 Activa</option>
                                    <option value="pausada">🟡 Pausada</option>
                                    <option value="finalizada">🔴 Finalizada</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2">Salario Mínimo (€)</label>
                                <input
                                    type="number"
                                    className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl p-4 focus:bg-white focus:border-indigo-500 outline-none transition-all font-medium"
                                    value={formData.salario_min}
                                    onChange={(e) => setFormData({ ...formData, salario_min: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2">Salario Máximo (€)</label>
                                <input
                                    type="number"
                                    className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl p-4 focus:bg-white focus:border-indigo-500 outline-none transition-all font-medium"
                                    value={formData.salario_max}
                                    onChange={(e) => setFormData({ ...formData, salario_max: e.target.value })}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2">Descripción del puesto</label>
                                <textarea
                                    rows={6} required
                                    className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl p-4 focus:bg-white focus:border-indigo-500 outline-none transition-all font-medium resize-none"
                                    value={formData.descripcion}
                                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={saving}
                                className="inline-flex items-center bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 disabled:opacity-50"
                            >
                                <Save className="w-5 h-5 mr-2" />
                                {saving ? 'GUARDANDO...' : 'GUARDAR CAMBIOS'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}