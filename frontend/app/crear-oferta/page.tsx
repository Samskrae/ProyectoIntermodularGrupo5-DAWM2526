'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Briefcase, MapPin, DollarSign, FileText, Tag, AlertCircle, Users, Activity } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Tecnologia {
  id: number;
  nombre: string;
}

const COMUNIDADES = [
  "Andalucía", "Aragón", "Asturias", "Baleares", "Canarias", "Cantabria",
  "Castilla-La Mancha", "Castilla y León", "Cataluña", "Comunidad Valenciana",
  "Extremadura", "Galicia", "Madrid", "Murcia", "Navarra", "País Vasco", "La Rioja", "Ceuta", "Melilla", "Remoto"
];

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
    ubicacion: 'Madrid',
    vacantes: '1',
    estado: 'activa',
    tecnologias: [] as number[]
  });

  useEffect(() => {
    if (!user || userType !== 'empresa') {
      router.push('/auth');
      return;
    }
    fetchTecnologias();
  }, [user, userType]);

  const fetchTecnologias = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/tecnologias', {
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        const data = await response.json();
        setTecnologias(data.data || data);
      }
    } catch (error) {
      console.error('Error fetching tecnologias:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatCurrencyInput = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleSalarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/g, "");
    setFormData(prev => ({ ...prev, [name]: numericValue }));
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

    if (formData.tecnologias.length === 0) {
      alert('Debes seleccionar al menos una tecnología.');
      setLoading(false);
      return;
    }

    try {
      const nombresTecnologias = formData.tecnologias.map(id => {
        return tecnologias.find(t => t.id === id)?.nombre;
      }).filter(Boolean);

      const ofertaData = {
        ...formData,
        salario_min: formData.salario_min ? parseInt(formData.salario_min) : null,
        salario_max: formData.salario_max ? parseInt(formData.salario_max) : null,
        vacantes: parseInt(formData.vacantes),
        tecnologias: nombresTecnologias
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

      if (response.ok) router.push('/dashboard');
      else alert('Error al crear la oferta');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = "w-full px-6 py-4 bg-white border-2 border-blue-100 rounded-2xl focus:border-blue-600 focus:bg-white outline-none transition-all text-gray-800 font-medium placeholder:text-gray-300 shadow-sm shadow-blue-50/50";

  return (
    <div className="min-h-screen bg-[#F0F7FF] pt-24 pb-12 font-sans">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <Link href="/dashboard" className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-800 mb-4 group uppercase tracking-tight">
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Volver al panel
            </Link>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Creador de Ofertas</h1>
          </div>
          <div className="hidden md:block">
            <div className="bg-blue-600 p-4 rounded-2xl flex items-center gap-3 shadow-lg shadow-blue-200">
              <AlertCircle className="text-white" />
              <p className="text-xs text-white font-bold leading-tight">
                Publicación <br /> inmediata.
              </p>
            </div>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Columna Principal */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-blue-50 p-8 md:p-10">
              <div className="space-y-8">

                {/* Título y Vacantes */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="md:col-span-3">
                    <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
                      <Briefcase size={14} className="text-blue-600" /> Título de la posición
                    </label>
                    <input
                      type="text"
                      name="titulo"
                      required
                      value={formData.titulo}
                      onChange={handleInputChange}
                      placeholder="Ej: Desarrollador React Senior"
                      className={inputStyles + " font-bold"}
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
                      <Users size={14} className="text-blue-600" /> Vacantes
                    </label>
                    <input
                      type="number"
                      name="vacantes"
                      min="1"
                      required
                      value={formData.vacantes}
                      onChange={handleInputChange}
                      className={inputStyles + " font-bold text-center"}
                    />
                  </div>
                </div>

                {/* Descripción */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
                    <FileText size={14} className="text-blue-600" /> Descripción detallada
                  </label>
                  <textarea
                    name="descripcion"
                    required
                    rows={10}
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    placeholder="Escribe aquí los detalles del puesto..."
                    className={inputStyles + " resize-none"}
                  />
                </div>
              </div>
            </div>

            {/* Selector de Tecnologías */}
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-blue-50 p-8 md:p-10">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 mb-6">
                <Tag size={14} className="text-blue-600" /> Tecnologías Requeridas
              </label>
              <div className="flex flex-wrap gap-3">
                {tecnologias.map((tech) => (
                  <button
                    key={tech.id}
                    type="button"
                    onClick={() => handleTecnologiaToggle(tech.id)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all border-2 ${formData.tecnologias.includes(tech.id)
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200'
                      : 'bg-white border-blue-100 text-slate-400 hover:border-blue-300'
                      }`}
                  >
                    {tech.nombre}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Columna Lateral */}
          <div className="space-y-6">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-blue-50 p-8">
              <h3 className="text-lg font-black text-slate-900 mb-6">Condiciones</h3>

              <div className="space-y-6">
                {/* Estado de la Oferta */}
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                    <Activity size={12} className="text-blue-600" /> Estado Inicial
                  </label>
                  <select
                    name="estado"
                    value={formData.estado}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all text-sm font-bold appearance-none cursor-pointer ${formData.estado === 'activa' ? 'border-green-100 bg-green-50 text-green-700 focus:border-green-500' :
                        formData.estado === 'pausada' ? 'border-amber-100 bg-amber-50 text-amber-700 focus:border-amber-500' :
                          'border-red-100 bg-red-50 text-red-700 focus:border-red-500'
                      }`}
                  >
                    <option value="activa">Activa</option>
                    <option value="pausada">Pausada</option>
                    <option value="finalizada">Finalizada</option>
                  </select>
                </div>

                {/* Ubicación */}
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                    <MapPin size={12} className="text-blue-600" /> Ubicación
                  </label>
                  <select
                    name="ubicacion"
                    value={formData.ubicacion}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border-2 border-blue-100 rounded-xl focus:border-blue-600 outline-none transition-all text-sm font-bold appearance-none cursor-pointer"
                  >
                    {COMUNIDADES.map(com => (
                      <option key={com} value={com}>{com}</option>
                    ))}
                  </select>
                </div>

                {/* Contrato */}
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                    <FileText size={12} className="text-blue-600" /> Contrato
                  </label>
                  <select
                    name="tipo_contrato"
                    value={formData.tipo_contrato}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border-2 border-blue-100 rounded-xl focus:border-blue-600 outline-none transition-all text-sm font-bold appearance-none cursor-pointer"
                  >
                    <option value="Tiempo completo">Tiempo completo</option>
                    <option value="Tiempo parcial">Tiempo parcial</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Prácticas">Prácticas</option>
                  </select>
                </div>

                {/* Salarios */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                      <DollarSign size={12} className="text-blue-600" /> Mín (€)
                    </label>
                    <input
                      type="text"
                      name="salario_min"
                      value={formatCurrencyInput(formData.salario_min)}
                      onChange={handleSalarioChange}
                      placeholder="20.000"
                      className="w-full px-4 py-3 bg-white border-2 border-blue-100 rounded-xl focus:border-blue-600 outline-none transition-all text-sm font-bold"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                      Máx (€)
                    </label>
                    <input
                      type="text"
                      name="salario_max"
                      value={formatCurrencyInput(formData.salario_max)}
                      onChange={handleSalarioChange}
                      placeholder="45.000"
                      className="w-full px-4 py-3 bg-white border-2 border-blue-100 rounded-xl focus:border-blue-600 outline-none transition-all text-sm font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-blue-600 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:translate-y-0 flex items-center justify-center gap-3"
            >
              {loading ? 'Publicando...' : <><Save size={18} /> Publicar ahora</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}