'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function EditarOferta() {
    const { user, userType, token } = useAuth();
    const router = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Estado del formulario
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        requisitos: '',
        ubicacion: '',
        tipo_contrato: 'Tiempo Completo',
        jornada: 'Completa',
        salario_min: '',
        salario_max: '',
        estado: 'activa'
    });

    useEffect(() => {
        if (!user || userType !== 'empresa') {
            router.push('/auth');
            return;
        }
        fetchOferta();
    }, [params.id]);

    const fetchOferta = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/ofertas/${params.id}`, {
                headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
            });
            if (response.ok) {
                const data = await response.json();
                const o = data.data;
                setFormData({
                    titulo: o.titulo,
                    descripcion: o.descripcion,
                    requisitos: o.requisitos || '',
                    ubicacion: o.ubicacion,
                    tipo_contrato: o.tipo_contrato,
                    jornada: o.jornada || 'Completa',
                    salario_min: o.salario_min || '',
                    salario_max: o.salario_max || '',
                    estado: o.estado
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
            const response = await fetch(`http://localhost:8000/api/ofertas/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                router.push(`/dashboard/ofertas/${params.id}`);
            } else {
                alert('Error al actualizar la oferta');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="pt-24 text-center">Cargando datos...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-4">
                <Link href={`/dashboard/ofertas/${params.id}`} className="inline-flex items-center text-indigo-600 mb-6">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Volver al detalle
                </Link>

                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Editar Oferta de Empleo</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Título de la vacante</label>
                                <input
                                    type="text" required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                                    value={formData.titulo}
                                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Ubicación</label>
                                <input
                                    type="text" required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                                    value={formData.ubicacion}
                                    onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Estado</label>
                                <select
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                                    value={formData.estado}
                                    onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                                >
                                    <option value="activa">Activa</option>
                                    <option value="pausada">Pausada</option>
                                    <option value="finalizada">Finalizada</option>
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                                <textarea
                                    rows={4} required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                                    value={formData.descripcion}
                                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={saving}
                                className="inline-flex items-center bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                {saving ? 'Guardando...' : 'Guardar Cambios'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}