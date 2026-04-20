'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, LogOut, User, Building2, TrendingUp, Briefcase, Home } from 'lucide-react';
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

  // Clase para el efecto de la línea azul en el hover
  const linkStyles = "relative group text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 px-1";
  const underlineStyles = "absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:shadow-[0_0_8px_rgba(37,99,235,0.6)] group-hover:w-full";

  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* 1. Logo */}
        <div className="flex-shrink-0 w-48">
          <Link href="/" className="font-bold text-xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-blue-600" />
            <span>ConectorTalento</span>
          </Link>
        </div>

        {/* Botón menú móvil */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* 2. Desktop Menu - CENTRADO */}
        <div className={`
          ${isOpen ? 'flex' : 'hidden'} 
          md:flex absolute md:static top-full left-0 right-0 
          flex-col md:flex-row flex-1 justify-center 
          bg-white md:bg-transparent border-b md:border-b-0 
          gap-8 p-6 md:p-0 items-start md:items-center
        `}>
          <Link href="/" className={linkStyles}>
            <span>Inicio</span>
            <span className={underlineStyles}></span>
          </Link>

          <Link href="/ofertas" className={linkStyles}>
            <span>Ofertas</span>
            <span className={underlineStyles}></span>
          </Link>

          <Link href="/tendencias" className={linkStyles}>
            <span>Tendencias</span>
            <span className={underlineStyles}></span>
          </Link>

          {user && (
            <>
              {userType === 'alumno' && (
                <Link href="/postulaciones" className={linkStyles}>
                  <span>Mis Postulaciones</span>
                  <span className={underlineStyles}></span>
                </Link>
              )}
              {userType === 'empresa' && (
                <>
                  <Link href="/dashboard" className={linkStyles}>
                    <span>Dashboard</span>
                    <span className={underlineStyles}></span>
                  </Link>
                  <Link href="/crear-oferta" className={linkStyles}>
                    <span>Crear Oferta</span>
                    <span className={underlineStyles}></span>
                  </Link>
                </>
              )}
              <Link href="/perfil" className={linkStyles}>
                <span>Perfil</span>
                <span className={underlineStyles}></span>
              </Link>
            </>
          )}
        </div>

        {/* 3. Derecha: User Info & Logout (Separados) */}
        <div className="hidden md:flex flex-shrink-0 w-48 justify-end items-center gap-4">
          {user ? (
            <>
              {/* Bloque de Usuario (Icono dinámico) */}
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100 shadow-sm">
                {userType === 'empresa' ? (
                  <Building2 className="w-4 h-4 text-blue-600" />
                ) : (
                  <User className="w-4 h-4 text-blue-600" />
                )}
                <span className="text-xs font-semibold text-gray-700 truncate max-w-[80px]">
                  {user.nombre || user.nombre_comercial || user.email}
                </span>
              </div>

              {/* Botón Logout Separado */}
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200 shadow-sm border border-transparent hover:border-red-100"
                title="Cerrar Sesión"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </>
          ) : (
            <Link href="/auth" className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-transform active:scale-95">
              <span className="text-white font-semibold">Entrar</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}