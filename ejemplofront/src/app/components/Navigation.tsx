import { Link, useLocation } from 'react-router';
import { Briefcase, TrendingUp, Home, User, Building2 } from 'lucide-react';
import { motion } from 'motion/react';
import logoImage from 'figma:asset/2d63db91a5fe372760877ace448291b67f7f93d3.png';

export function Navigation() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Inicio', icon: Home },
    { path: '/ofertas', label: 'Ofertas', icon: Briefcase },
    { path: '/tendencias', label: 'Tendencias', icon: TrendingUp },
  ];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-md bg-white/60 rounded-2xl shadow-lg border border-[#2563EB]/10 px-6 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src={logoImage} 
                alt="Zona Rincón" 
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-[#111727]">
                Zona Rincón
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              {/* Navigation Links */}
              <div className="flex items-center space-x-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="relative px-4 py-2 rounded-lg transition-colors"
                    >
                      <div className={`flex items-center space-x-2 ${
                        isActive ? 'text-[#2563EB]' : 'text-[#6B7280] hover:text-[#1D4ED8]'
                      }`}>
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </div>
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-[#DBEAFE] rounded-lg -z-10"
                          transition={{ type: 'spring', duration: 0.5 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Separator */}
              <div className="w-px h-8 bg-[#2563EB]/20" />

              {/* Empresa Button */}
              <Link to="/registro-empresa">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 text-[#2563EB] hover:bg-[#DBEAFE] rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Building2 className="w-5 h-5" />
                  <span>Soy Empresa</span>
                </motion.button>
              </Link>

              {/* Login Button */}
              <Link to="/entrar">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white px-6 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-shadow flex items-center space-x-2"
                >
                  <User className="w-5 h-5" />
                  <span>Entrar</span>
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}