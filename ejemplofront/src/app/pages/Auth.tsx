import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Lock, UserPlus, LogIn, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router';

export function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de autenticación con el backend
    // Por ahora redirigimos al perfil
    navigate('/perfil');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-md mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-2xl mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-[#111727] mb-2">
            {isLogin ? 'Bienvenido' : 'Crear Cuenta'}
          </h1>
          <p className="text-[#6B7280]">
            {isLogin 
              ? 'Inicia sesión para acceder a tu perfil' 
              : 'Regístrate para comenzar a buscar empleo'
            }
          </p>
        </motion.div>

        {/* Toggle Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex bg-[#F3F4F6] rounded-xl p-1 mb-8"
        >
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 rounded-lg font-medium transition-all ${
              isLogin 
                ? 'bg-white text-[#2563EB] shadow-md' 
                : 'text-[#6B7280]'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 rounded-lg font-medium transition-all ${
              !isLogin 
                ? 'bg-white text-[#2563EB] shadow-md' 
                : 'text-[#6B7280]'
            }`}
          >
            Registrarse
          </button>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-[#2563EB]/10"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-[#111727] mb-2">Nombre Completo</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required={!isLogin}
                    className="w-full pl-12 pr-4 py-3 bg-[#F3F4F6] rounded-xl border-2 border-transparent focus:border-[#2563EB] focus:bg-white transition-all outline-none"
                    placeholder="Tu nombre completo"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[#111727] mb-2">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-[#F3F4F6] rounded-xl border-2 border-transparent focus:border-[#2563EB] focus:bg-white transition-all outline-none"
                  placeholder="correo@ejemplo.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#111727] mb-2">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-12 py-3 bg-[#F3F4F6] rounded-xl border-2 border-transparent focus:border-[#2563EB] focus:bg-white transition-all outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#2563EB]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-[#111727] mb-2">Confirmar Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required={!isLogin}
                    className="w-full pl-12 pr-4 py-3 bg-[#F3F4F6] rounded-xl border-2 border-transparent focus:border-[#2563EB] focus:bg-white transition-all outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-[#6B7280] text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  <span className="text-sm text-[#6B7280]">Recordarme</span>
                </label>
                <button type="button" className="text-sm text-[#2563EB] hover:text-[#1D4ED8]">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
            >
              {isLogin ? (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Iniciar Sesión</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span>Crear Cuenta</span>
                </>
              )}
            </motion.button>
          </form>

          {!isLogin && (
            <div className="mt-6 p-4 bg-[#EFF6FF] rounded-xl">
              <p className="text-sm text-[#6B7280] text-center">
                Al registrarte, aceptas nuestros{' '}
                <button className="text-[#2563EB] hover:underline">términos de servicio</button>
                {' '}y{' '}
                <button className="text-[#2563EB] hover:underline">política de privacidad</button>
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
