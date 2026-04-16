'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  nombre?: string;
  nombre_comercial?: string;
  email: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  userType: 'alumno' | 'empresa' | null;
  isLoading: boolean;
  login: (email: string, password: string, type: 'alumno' | 'empresa') => Promise<void>;
  register: (data: any, type: 'alumno' | 'empresa') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userType, setUserType] = useState<'alumno' | 'empresa' | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar datos guardados al montar el componente
  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('auth_user');
    const savedUserType = localStorage.getItem('auth_user_type') as 'alumno' | 'empresa' | null;

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setUserType(savedUserType);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, type: 'alumno' | 'empresa') => {
    setIsLoading(true);
    try {
      // Primero verificar conectividad al backend
      try {
        const healthCheck = await fetch(`http://localhost:8000/api/health`, {
          method: 'GET',
          headers: { 'Accept': 'application/json' }
        });
        
        if (!healthCheck.ok) {
          throw new Error('El servidor no está respondiendo correctamente');
        }
      } catch (error) {
        throw new Error('No se puede conectar al servidor. Verifica que está ejecutándose en http://localhost:8000');
      }

      const endpoint = type === 'alumno' ? '/api/login-alumno' : '/api/login-empresa';

      let response = await fetch(`http://localhost:8000${endpoint}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      let data: any = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      // Fallback UX: si intenta entrar en /auth con una cuenta de empresa,
      // probamos automáticamente el endpoint de empresa para evitar confusión.
      if (!response.ok && type === 'alumno') {
        const maybeEmpresaResponse = await fetch('http://localhost:8000/api/login-empresa', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            email,
            password
          })
        });

        if (maybeEmpresaResponse.ok) {
          response = maybeEmpresaResponse;
          data = await maybeEmpresaResponse.json();
          type = 'empresa';
        }
      }

      if (!response.ok) {
        // Manejar errores de validación de Laravel
        if (data.errors && data.errors.email) {
          const baseMessage = data.errors.email[0];
          if (type === 'alumno') {
            throw new Error(`${baseMessage} Si esta cuenta es de empresa, usa "Acceso Empresas".`);
          }
          throw new Error(baseMessage);
        }
        throw new Error(data.message || 'Error en el login');
      }

      setToken(data.token);
      setUser(data.user);
      setUserType(type);

      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('auth_user', JSON.stringify(data.user));
      localStorage.setItem('auth_user_type', type);
    } catch (error: any) {
      throw new Error(error.message || 'Error de conexión al servidor. Verifica que el backend está ejecutándose en http://localhost:8000');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: any, type: 'alumno' | 'empresa') => {
    setIsLoading(true);
    try {
      // Primero verificar conectividad al backend
      try {
        const healthCheck = await fetch(`http://localhost:8000/api/health`, {
          method: 'GET',
          headers: { 'Accept': 'application/json' }
        });
        
        if (!healthCheck.ok) {
          throw new Error('El servidor no está respondiendo correctamente');
        }
      } catch (error) {
        throw new Error('No se puede conectar al servidor. Verifica que está ejecutándose en http://localhost:8000');
      }
      
      const endpoint = type === 'alumno' ? '/api/register-alumno' : '/api/register-empresa';
      
      const response = await fetch(`http://localhost:8000${endpoint}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();

      if (!response.ok && response.status !== 201) {
        if (responseData.errors) {
          // Extraer el primer error disponible
          const firstError = Object.values(responseData.errors)[0];
          throw new Error(Array.isArray(firstError) ? firstError[0] : firstError);
        }
        throw new Error(responseData.message || 'Error en el registro');
      }

      setToken(responseData.token);
      setUser(responseData.user);
      setUserType(type);

      localStorage.setItem('auth_token', responseData.token);
      localStorage.setItem('auth_user', JSON.stringify(responseData.user));
      localStorage.setItem('auth_user_type', type);
    } catch (error: any) {
      console.error('Register error:', error);
      throw new Error(error.message || 'Error de conexión al servidor. Verifica que el backend está ejecutándose en http://localhost:8000');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setUserType(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_user_type');
  };

  return (
    <AuthContext.Provider value={{ user, token, userType, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
}
