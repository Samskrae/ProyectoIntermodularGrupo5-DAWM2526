'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building2, Mail, User, Lock, MapPin, Globe, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function RegistroEmpresa() {
  const router = useRouter();
  const { register, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre_comercial: '',
    sector: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (user) {
      router.push('/perfil');
    }
  }, [user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      if (formData.password !== formData.confirmPassword) {
        setMessage({ type: 'error', text: 'Las contraseñas no coinciden' });
        setLoading(false);
        return;
      }

      if (!formData.termsAccepted) {
        setMessage({ type: 'error', text: 'Debes aceptar los términos y condiciones' });
        setLoading(false);
        return;
      }

      await register({
        nombre_comercial: formData.nombre_comercial,
        sector: formData.sector,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword
      }, 'empresa');

      setMessage({ type: 'success', text: '¡Registro exitoso! Redirigiendo...' });
      setTimeout(() => {
        router.push('/perfil');
      }, 1500);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Error de conexión. Intenta más tarde.' });
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-2">Únete como Empresa</h1>
            <p className="text-xl text-gray-600">Registra tu empresa y accede a nuestro talento</p>
          </div>

          {/* Messages */}
          {message.text && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <span>{message.text}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Información de tu Empresa</h2>

            {/* Nombre Comercial */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre Comercial *</label>
              <div className="relative">
                <Building2 className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="nombre_comercial"
                  value={formData.nombre_comercial}
                  onChange={handleChange}
                  placeholder="Nombre de tu empresa"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Sector */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sector *</label>
              <input
                type="text"
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                placeholder="Ej: Tecnología, Finanzas, etc."
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Empresarial *</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="empresa@example.com"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Contraseña *</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Mínimo 8 caracteres"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Confirmar Contraseña */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Confirmar Contraseña *</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirma tu contraseña"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Términos */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="w-4 h-4 mt-1 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
              <label className="text-sm text-gray-600">
                Acepto los{' '}
                <a href="#" className="text-blue-600 hover:underline font-semibold">
                  términos y condiciones
                </a>{' '}
                y reconozco que he leído la{' '}
                <a href="#" className="text-blue-600 hover:underline font-semibold">
                  política de privacidad
                </a>
              </label>
            </div>

            {/* Botón Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Registrando...</span>
                </div>
              ) : (
                'Registrar Empresa'
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              ¿Ya tienes una cuenta?{' '}
              <Link href="/auth" className="text-blue-600 hover:underline font-semibold">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
