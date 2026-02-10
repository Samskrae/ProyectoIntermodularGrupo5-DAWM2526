'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Mail, LogOut, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ProtectedRoute } from '../components/ProtectedRoute';

function PerfilContent() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  if (!user) {
    return null;
  }

  const isEmpresa = !!user.nombre_comercial;
  const userName = isEmpresa ? user.nombre_comercial : user.nombre;

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Card Principal */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{userName || 'Usuario'}</h1>
                  <p className="text-gray-600">{isEmpresa ? 'Cuenta Empresa' : 'Cuenta Alumno'}</p>
                </div>
              </div>
            </div>

            {/* Información */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {/* Email */}
              <motion.div
                variants={itemVariants}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <Mail className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Correo Electrónico</p>
                  <p className="text-lg font-semibold text-gray-900">{user.email}</p>
                </div>
              </motion.div>

              {/* ID */}
              <motion.div
                variants={itemVariants}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <User className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">ID de Usuario</p>
                  <p className="text-lg font-semibold text-gray-900">#{user.id}</p>
                </div>
              </motion.div>

              {/* Fecha de Registro */}
              {user.created_at && (
                <motion.div
                  variants={itemVariants}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                >
                  <Calendar className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Miembro desde</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(user.created_at).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Acciones */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-gray-200"
            >
              <button
                onClick={handleLogout}
                className="flex-1 flex items-center justify-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all font-semibold"
              >
                <LogOut className="w-5 h-5" />
                <span>Cerrar Sesión</span>
              </button>
              <button
                onClick={() => router.push('/')}
                className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all font-semibold"
              >
                <span>Volver al Inicio</span>
              </button>
            </motion.div>
          </div>

          {/* Info adicional según tipo */}
          {isEmpresa && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg"
            >
              <p className="text-sm text-blue-800">
                ℹ️ <span className="font-semibold">Como empresa,</span> puedes crear ofertas de empleo y ver los candidatos que se postulen.
              </p>
            </motion.div>
          )}

          {!isEmpresa && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-green-50 border-l-4 border-green-600 p-6 rounded-lg"
            >
              <p className="text-sm text-green-800">
                ✓ <span className="font-semibold">Como alumno,</span> puedes explorar ofertas, ver tendencias del mercado y postularte a empleos.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default function Perfil() {
  return (
    <ProtectedRoute userType="any">
      <PerfilContent />
    </ProtectedRoute>
  );
}
