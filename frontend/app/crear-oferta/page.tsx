'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, X } from 'lucide-react';
import Link from 'next/link';

interface Tecnologia {
  id: number;
  nombre: string;
}

export default function CrearOferta() {
  const { user, userType, token } = useAuth();
  const router = useRouter();
  const [tecnologias, setTecnologias] = useState<Tecnologia[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    salario_min: '',
    salario_max: '',
    tipo_contrato: 'Tiempo completo',
    ubicacion: '',
    tecnologias: [] as number[]
  });

  useEffect(() => {
    if (!user || userType !== 'empresa') {
      router.push('/auth');
      return;
    }
    fetchTecnologias();
  }, [user, userType, router]);

  const fetchTecnologias = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/tecnologias', {
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTecnologias(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching tecnologias:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTecnologiaToggle = (tecnologiaId: number) => {
    setFormData(prev => ({
      ...prev,
      tecnologias: prev.tecnologias.includes(tecnologiaId)
        ? prev.tecnologias.filter(id => id !== tecnologiaId)
        : [...prev.tecnologias, tecnologiaId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validación frontend
    if (formData.tecnologias.length === 0) {
      alert('Debes seleccionar al menos una tecnología requerida.');
      setLoading(false);
      return;
    }

    try {
      const ofertaData = {
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        salario_min: formData.salario_min ? parseInt(formData.salario_min) : null,
        salario_max: formData.salario_max ? parseInt(formData.salario_max) : null,
        tipo_contrato: formData.tipo_contrato,
        ubicacion: formData.ubicacion,
        tecnologias: formData.tecnologias
      };

      const response = await fetch('http://localhost:8000/api/ofertas', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(ofertaData)
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        const errorData = await response.json();
        alert('Error al crear la oferta: ' + (errorData.message || 'Error desconocido'));
      }
    } catch (error) {
      console.error('Error creating oferta:', error);
      alert('Error al crear la oferta. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (!user || userType !== 'empresa') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver al Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Crear Nueva Oferta de Empleo</h1>
          <p className="text-gray-600">Publica una nueva oportunidad laboral para tu empresa</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Título */}
            <div className="md:col-span-2">
              <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-2">
                Título de la Oferta *
              </label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                required
                value={formData.titulo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: Desarrollador Full Stack Senior"
              />
            </div>

            {/* Descripción */}
            <div className="md:col-span-2">
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
                Descripción *
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                required
                rows={6}
                value={formData.descripcion}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe las responsabilidades, requisitos y beneficios de la posición..."
              />
            </div>

            {/* Salario Mínimo */}
            <div>
              <label htmlFor="salario_min" className="block text-sm font-medium text-gray-700 mb-2">
                Salario Mínimo (€)
              </label>
              <input
                type="number"
                id="salario_min"
                name="salario_min"
                value={formData.salario_min}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="25000"
                min="0"
              />
            </div>

            {/* Salario Máximo */}
            <div>
              <label htmlFor="salario_max" className="block text-sm font-medium text-gray-700 mb-2">
                Salario Máximo (€)
              </label>
              <input
                type="number"
                id="salario_max"
                name="salario_max"
                value={formData.salario_max}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="35000"
                min="0"
              />
            </div>

            {/* Tipo de Contrato */}
            <div>
              <label htmlFor="tipo_contrato" className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Contrato *
              </label>
              <select
                id="tipo_contrato"
                name="tipo_contrato"
                required
                value={formData.tipo_contrato}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Tiempo completo">Tiempo completo</option>
                <option value="Tiempo parcial">Tiempo parcial</option>
                <option value="Contrato temporal">Contrato temporal</option>
                <option value="Freelance">Freelance</option>
                <option value="Prácticas">Prácticas</option>
              </select>
            </div>

            {/* Ubicación */}
            <div>
              <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700 mb-2">
                Ubicación
              </label>
              <input
                type="text"
                id="ubicacion"
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: Madrid, España"
              />
            </div>
          </div>

          {/* Tecnologías */}
          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Tecnologías Requeridas *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {tecnologias.map((tecnologia) => (
                <label key={tecnologia.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.tecnologias.includes(tecnologia.id)}
                    onChange={() => handleTecnologiaToggle(tecnologia.id)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{tecnologia.nombre}</span>
                </label>
              ))}
            </div>
            {tecnologias.length === 0 && (
              <p className="text-sm text-gray-500 mt-2">Cargando tecnologías...</p>
            )}
          </div>

          {/* Actions */}
          <div className="mt-8 flex justify-end space-x-4">
            <Link
              href="/dashboard"
              className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creando...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Crear Oferta
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}