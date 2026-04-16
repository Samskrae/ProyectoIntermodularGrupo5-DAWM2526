import { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, MapPin, Euro, Clock, Briefcase, Send, CheckCircle2 } from 'lucide-react';

export function Empresa() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    empresa: '',
    titulo: '',
    descripcion: '',
    ubicacion: '',
    tipo: 'Tiempo Completo',
    salarioMin: '',
    salarioMax: '',
    tecnologias: '',
    contacto: '',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        empresa: '',
        titulo: '',
        descripcion: '',
        ubicacion: '',
        tipo: 'Tiempo Completo',
        salarioMin: '',
        salarioMax: '',
        tecnologias: '',
        contacto: '',
        email: ''
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-2xl mb-6">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-[#111727] mb-4">
            Portal de{' '}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] bg-clip-text text-transparent">
              Empresas
            </span>
          </h1>
          <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
            Publica tu oferta de empleo y conecta con talento joven cualificado
          </p>
        </motion.div>

        {/* Success Message */}
        {submitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mb-8 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-500 rounded-2xl p-6"
          >
            <div className="flex items-center space-x-4">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
              <div>
                <h3 className="text-xl font-bold text-green-800 mb-1">¡Oferta Publicada!</h3>
                <p className="text-green-700">Tu oferta de empleo ha sido enviada correctamente. Nos pondremos en contacto pronto.</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-[#2563EB]/10"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información de la Empresa */}
            <div>
              <h3 className="text-2xl font-bold text-[#111727] mb-6 flex items-center">
                <Building2 className="w-6 h-6 mr-2 text-[#2563EB]" />
                Información de la Empresa
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#111727] mb-2">Nombre de la Empresa *</label>
                  <input
                    type="text"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#F3F4F6] rounded-xl border-2 border-transparent focus:border-[#2563EB] focus:bg-white transition-all outline-none"
                    placeholder="Ej: TechStartup SL"
                  />
                </div>
                <div>
                  <label className="block text-[#111727] mb-2">Email de Contacto *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#F3F4F6] rounded-xl border-2 border-transparent focus:border-[#2563EB] focus:bg-white transition-all outline-none"
                    placeholder="contacto@empresa.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[#111727] mb-2">Persona de Contacto</label>
                  <input
                    type="text"
                    name="contacto"
                    value={formData.contacto}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F3F4F6] rounded-xl border-2 border-transparent focus:border-[#2563EB] focus:bg-white transition-all outline-none"
                    placeholder="Nombre del responsable de RRHH"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-[#F3F4F6] my-8"></div>

            {/* Detalles de la Oferta */}
            <div>
              <h3 className="text-2xl font-bold text-[#111727] mb-6 flex items-center">
                <Briefcase className="w-6 h-6 mr-2 text-[#2563EB]" />
                Detalles de la Oferta
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-[#111727] mb-2">Título del Puesto *</label>
                  <input
                    type="text"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#F3F4F6] rounded-xl border-2 border-transparent focus:border-[#2563EB] focus:bg-white transition-all outline-none"
                    placeholder="Ej: Desarrollador Frontend React"
                  />
                </div>
                
                <div>
                  <label className="block text-[#111727] mb-2">Descripción del Puesto *</label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-[#F3F4F6] rounded-xl border-2 border-transparent focus:border-[#2563EB] focus:bg-white transition-all outline-none resize-none"
                    placeholder="Describe las responsabilidades, requisitos y beneficios del puesto..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#111727] mb-2 flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-[#6B7280]" />
                      Ubicación *
                    </label>
                    <input
                      type="text"
                      name="ubicacion"
                      value={formData.ubicacion}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#F3F4F6] rounded-xl border-2 border-transparent focus:border-[#2563EB] focus:bg-white transition-all outline-none"
                      placeholder="Ciudad o Remoto"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[#111727] mb-2 flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-[#6B7280]" />
                      Tipo de Contrato *
                    </label>
                    <select
                      name="tipo"
                      value={formData.tipo}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#F3F4F6] rounded-xl border-2 border-transparent focus:border-[#2563EB] focus:bg-white transition-all outline-none appearance-none"
                    >
                      <option value="Tiempo Completo">Tiempo Completo</option>
                      <option value="Medio Tiempo">Medio Tiempo</option>
                      <option value="Prácticas">Prácticas</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#111727] mb-2 flex items-center">
                    <Euro className="w-4 h-4 mr-1 text-[#6B7280]" />
                    Rango Salarial (Anual)
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      name="salarioMin"
                      value={formData.salarioMin}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#F3F4F6] rounded-xl border-2 border-transparent focus:border-[#2563EB] focus:bg-white transition-all outline-none"
                      placeholder="Mínimo (€)"
                    />
                    <input
                      type="number"
                      name="salarioMax"
                      value={formData.salarioMax}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#F3F4F6] rounded-xl border-2 border-transparent focus:border-[#2563EB] focus:bg-white transition-all outline-none"
                      placeholder="Máximo (€)"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#111727] mb-2">Tecnologías Requeridas</label>
                  <input
                    type="text"
                    name="tecnologias"
                    value={formData.tecnologias}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#F3F4F6] rounded-xl border-2 border-transparent focus:border-[#2563EB] focus:bg-white transition-all outline-none"
                    placeholder="Ej: React, TypeScript, Node.js (separadas por comas)"
                  />
                  <p className="text-sm text-[#6B7280] mt-2">Separa las tecnologías con comas</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Publicar Oferta</span>
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-[#EFF6FF] rounded-2xl p-6 border border-[#2563EB]/20"
        >
          <h3 className="text-xl font-bold text-[#111727] mb-4">Beneficios de Publicar con Nosotros</h3>
          <ul className="space-y-3 text-[#6B7280]">
            <li className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-[#2563EB] mr-2 flex-shrink-0 mt-0.5" />
              <span>Acceso directo a talento joven cualificado y motivado</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-[#2563EB] mr-2 flex-shrink-0 mt-0.5" />
              <span>Plataforma gratuita para empresas colaboradoras del centro educativo</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-[#2563EB] mr-2 flex-shrink-0 mt-0.5" />
              <span>Candidatos con formación actualizada en las últimas tecnologías</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-[#2563EB] mr-2 flex-shrink-0 mt-0.5" />
              <span>Proceso de selección simplificado y ágil</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
