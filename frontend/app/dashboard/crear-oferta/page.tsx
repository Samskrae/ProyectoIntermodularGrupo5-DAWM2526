'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CrearOfertaPage() {
  const { token } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    sector: '',
    ubicacion: '',
    tipo_contrato: 'Full-time',
    salario_min: '',
    salario_max: '',
    vacantes: '1',
    fecha_cierre: '',
    requisitos: '',
    beneficios: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/ofertas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          salario_min: formData.salario_min ? parseInt(formData.salario_min) : null,
          salario_max: formData.salario_max ? parseInt(formData.salario_max) : null,
          vacantes: parseInt(formData.vacantes),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear oferta');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <Link href="/dashboard">
          <button className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-8">
            <ArrowLeft size={20} />
            Volver al Dashboard
          </button>
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Crear Nueva Oferta</h1>

          {success && (
            <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6">
              ¡Oferta creada exitosamente! Serás redirigido al dashboard...
            </div>
          )}

          {error && (
            <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Título */}
            <div>
              <label className="block text-gray-900 font-semibold mb-2">Título de la Oferta *</label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-white text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="ej: Desarrollador Full Stack PHP"
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-gray-900 font-semibold mb-2">Descripción *</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-2 bg-white text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                placeholder="Describe el puesto, responsabilidades, equipo, etc."
              />
            </div>

            {/* Grid 2 columnas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sector */}
              <div>
                <label className="block text-gray-900 font-semibold mb-2">Sector *</label>
                <input
                  type="text"
                  name="sector"
                  value={formData.sector}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-white text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="ej: Tecnología, Finanzas, etc."
                />
              </div>

              {/* Ubicación */}
              <div>
                <label className="block text-gray-900 font-semibold mb-2">Ubicación</label>
                <input
                  type="text"
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="ej: Madrid, España"
                />
              </div>

              {/* Tipo de Contrato */}
              <div>
                <label className="block text-gray-900 font-semibold mb-2">Tipo de Contrato *</label>
                <select
                  name="tipo_contrato"
                  value={formData.tipo_contrato}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Pasantía">Pasantía</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Remoto">Remoto</option>
                </select>
              </div>

              {/* Vacantes */}
              <div>
                <label className="block text-gray-900 font-semibold mb-2">Vacantes *</label>
                <input
                  type="number"
                  name="vacantes"
                  value={formData.vacantes}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-4 py-2 bg-white text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Salario Mínimo */}
              <div>
                <label className="block text-gray-900 font-semibold mb-2">Salario Mínimo</label>
                <input
                  type="number"
                  name="salario_min"
                  value={formData.salario_min}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="0"
                />
              </div>

              {/* Salario Máximo */}
              <div>
                <label className="block text-gray-900 font-semibold mb-2">Salario Máximo</label>
                <input
                  type="number"
                  name="salario_max"
                  value={formData.salario_max}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="0"
                />
              </div>

              {/* Fecha de Cierre */}
              <div>
                <label className="block text-gray-900 font-semibold mb-2">Fecha de Cierre</label>
                <input
                  type="date"
                  name="fecha_cierre"
                  value={formData.fecha_cierre}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Requisitos */}
            <div>
              <label className="block text-gray-900 font-semibold mb-2">Requisitos</label>
              <textarea
                name="requisitos"
                value={formData.requisitos}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 bg-white text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                placeholder="Lista de requisitos (uno por línea)"
              />
            </div>

            {/* Beneficios */}
            <div>
              <label className="block text-gray-900 font-semibold mb-2">Beneficios</label>
              <textarea
                name="beneficios"
                value={formData.beneficios}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 bg-white text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                placeholder="Lista de beneficios (uno por línea)"
              />
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading || success}
                className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? 'Creando...' : success ? 'Creada' : 'Crear Oferta'}
              </button>
              <Link href="/dashboard" className="flex-1">
                <button
                  type="button"
                  className="w-full bg-gray-300 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-400 transition-all"
                >
                  Cancelar
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
