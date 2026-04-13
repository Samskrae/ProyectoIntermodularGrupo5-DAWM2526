'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building2, Mail, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function RegistroEmpresa() {
  const router = useRouter();
  const { login, register, user } = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    nombre_comercial: '',
    sector: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });

  useEffect(() => {
    if (user) router.push('/perfil');
  }, [user, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      if (isLogin) {
        await login(formData.email, formData.password, 'empresa');
        setMessage({ type: 'success', text: '¡Login exitoso! Redirigiendo...' });
        setTimeout(() => router.push('/dashboard'), 1200);
      } else {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Las contraseñas no coinciden');
        }
        if (!formData.termsAccepted) {
          throw new Error('Debes aceptar los términos y condiciones');
        }

        await register(
          {
            nombre_comercial: formData.nombre_comercial,
            sector: formData.sector,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.confirmPassword
          },
          'empresa'
        );

        setMessage({ type: 'success', text: '¡Registro exitoso! Redirigiendo...' });
        setTimeout(() => router.push('/dashboard'), 1200);
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Error de conexión. Intenta más tarde.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Acceso Empresas' : 'Únete como Empresa'}
            </h1>
            <p className="text-gray-600">
              {isLogin ? 'Inicia sesión en tu cuenta empresarial' : 'Registra tu empresa y accede a nuestro talento'}
            </p>
          </div>

          <div className="flex mb-8 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => {
                setIsLogin(false);
                setMessage({ type: '', text: '' });
              }}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                !isLogin ? 'bg-blue-600 text-white' : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Registrarse
            </button>
            <button
              onClick={() => {
                setIsLogin(true);
                setMessage({ type: '', text: '' });
              }}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                isLogin ? 'bg-blue-600 text-white' : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Iniciar Sesión
            </button>
          </div>

          {message.text && (
            <div
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
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Nombre Comercial</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      name="nombre_comercial"
                      value={formData.nombre_comercial}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Sector</label>
                  <input
                    type="text"
                    name="sector"
                    value={formData.sector}
                    onChange={handleChange}
                    placeholder="Ej: Tecnología, Finanzas"
                    className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Confirmar Contraseña</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="w-4 h-4 mt-1 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                  <label className="text-sm text-gray-800 font-medium">Acepto los términos y condiciones</label>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? (isLogin ? 'Iniciando sesión...' : 'Registrando...') : isLogin ? 'Iniciar Sesión' : 'Registrar Empresa'}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-800 text-sm">
              ¿Eres alumno?{' '}
              <Link href="/auth" className="text-blue-600 hover:underline font-semibold">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
