'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, userType, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          ConectorTalento
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Menu */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:block absolute md:static top-full left-0 right-0 md:top-auto md:right-auto bg-white md:bg-transparent border-b md:border-b-0 md:flex gap-8 p-6 md:p-0 items-start md:items-center`}>
          <Link href="/" className="block md:inline text-gray-700 hover:text-blue-600 transition font-medium">
            Inicio
          </Link>
          <Link href="/ofertas" className="block md:inline text-gray-700 hover:text-blue-600 transition font-medium">
            Ofertas
          </Link>
          <Link href="/tendencias" className="block md:inline text-gray-700 hover:text-blue-600 transition font-medium">
            Tendencias
          </Link>
          
          {user ? (
            <>
              {userType === 'alumno' && (
                <Link href="/postulaciones" className="block md:inline text-gray-700 hover:text-blue-600 transition font-medium">
                  Mis Postulaciones
                </Link>
              )}
              {userType === 'empresa' && (
                <>
                  <Link href="/dashboard" className="block md:inline text-gray-700 hover:text-blue-600 transition font-medium">
                    Dashboard
                  </Link>
                  <Link href="/crear-oferta" className="block md:inline text-gray-700 hover:text-blue-600 transition font-medium">
                    Crear Oferta
                  </Link>
                </>
              )}
              <Link href="/perfil" className="block md:inline text-gray-700 hover:text-blue-600 transition font-medium">
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
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-start md:items-center ml-4 md:ml-0 pt-4 md:pt-0 border-t md:border-t-0 md:border-l md:pl-8">
              <Link href="/auth" className="block md:inline bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition">
                <span className="text-white font-semibold">Entrar</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
