'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          ConectorTalento
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <div className={`${isOpen ? 'block' : 'hidden'} md:block absolute md:static top-full left-0 right-0 md:top-auto md:right-auto bg-white md:bg-transparent border-b md:border-b-0 md:flex gap-8 p-6 md:p-0 items-start md:items-center`}>
          <Link href="/" className="block md:inline text-gray-700 hover:text-blue-600 transition">
            Inicio
          </Link>
          <Link href="/ofertas" className="block md:inline text-gray-700 hover:text-blue-600 transition">
            Ofertas
          </Link>
          <Link href="/tendencias" className="block md:inline text-gray-700 hover:text-blue-600 transition">
            Tendencias
          </Link>
          
          {user ? (
            <>
              {user.alumno_id && (
                <Link href="/postulaciones" className="block md:inline text-gray-700 hover:text-blue-600 transition">
                  Mis Postulaciones
                </Link>
              )}
              {user.empresa_id && (
                <Link href="/dashboard" className="block md:inline text-gray-700 hover:text-blue-600 transition">
                  Dashboard
                </Link>
              )}
              <Link href="/perfil" className="block md:inline text-gray-700 hover:text-blue-600 transition">
                Perfil
              </Link>
              <div className="flex flex-col md:flex-row gap-3 md:gap-2 items-start md:items-center ml-4 md:ml-0 pt-4 md:pt-0 border-t md:border-t-0">
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <User className="w-4 h-4" />
                  <span className="font-medium truncate max-w-[150px]">
                    {user.nombre || user.nombre_comercial || user.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition font-semibold"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </>
          ) : (
            <Link href="/auth" className="block md:inline bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
