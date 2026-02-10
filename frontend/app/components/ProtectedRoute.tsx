'use client';

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  userType?: 'alumno' | 'empresa' | 'any';
}

function ProtectedRoute({ children, userType = 'any' }: ProtectedRouteProps) {
  const { user, userType: currentUserType, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // Esperar a cargar

    // Si no hay usuario, redirigir a login
    if (!user) {
      router.push('/auth');
      return;
    }

    // Verificar tipo de usuario si se especifica
    if (userType !== 'any' && currentUserType !== userType) {
      router.push('/'); // Redirigir a inicio si no es el tipo correcto
      return;
    }
  }, [user, currentUserType, isLoading, userType, router]);

  // Mostrar nada mientras carga
  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Verificar tipo nuevamente antes de renderizar
  if (userType !== 'any' && currentUserType !== userType) {
    return null;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
export { ProtectedRoute };
