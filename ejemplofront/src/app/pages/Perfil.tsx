import { motion } from 'motion/react';
import { User, Briefcase, CheckCircle2, Clock, XCircle, Mail, MapPin, Calendar, FileText } from 'lucide-react';

export function Perfil() {
  // Mock data - esto vendría del backend
  const usuario = {
    nombre: 'María García López',
    email: 'maria.garcia@email.com',
    telefono: '+34 612 345 678',
    ubicacion: 'Madrid, España',
    cv: 'curriculum_maria_garcia.pdf',
    miembro_desde: 'Enero 2024'
  };

  const candidaturas = [
    {
      id: 1,
      titulo: 'Desarrollador Frontend React',
      empresa: 'TechStartup SL',
      ubicacion: 'Madrid',
      fechaAplicacion: '15 Ene 2024',
      estado: 'En Revisión',
      estadoColor: 'text-[#2563EB] bg-[#DBEAFE]',
      icon: Clock
    },
    {
      id: 2,
      titulo: 'Full Stack Developer Junior',
      empresa: 'Innovatech Solutions',
      ubicacion: 'Barcelona',
      fechaAplicacion: '12 Ene 2024',
      estado: 'Entrevista Programada',
      estadoColor: 'text-green-600 bg-green-50',
      icon: CheckCircle2
    },
    {
      id: 3,
      titulo: 'Diseñador UX/UI',
      empresa: 'Creative Digital',
      ubicacion: 'Valencia',
      fechaAplicacion: '08 Ene 2024',
      estado: 'Rechazada',
      estadoColor: 'text-red-600 bg-red-50',
      icon: XCircle
    },
    {
      id: 4,
      titulo: 'Backend Developer Python',
      empresa: 'DataFlow Systems',
      ubicacion: 'Sevilla',
      fechaAplicacion: '05 Ene 2024',
      estado: 'En Revisión',
      estadoColor: 'text-[#2563EB] bg-[#DBEAFE]',
      icon: Clock
    }
  ];

  const estadisticas = [
    { label: 'Candidaturas', valor: candidaturas.length },
    { label: 'En Proceso', valor: candidaturas.filter(c => c.estado === 'En Revisión').length },
    { label: 'Entrevistas', valor: candidaturas.filter(c => c.estado === 'Entrevista Programada').length }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-[#111727] mb-4">
            Mi{' '}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] bg-clip-text text-transparent">
              Perfil
            </span>
          </h1>
          <p className="text-xl text-[#6B7280]">
            Gestiona tu información y revisa tus candidaturas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Información Personal */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-[#2563EB]/10 sticky top-28"
            >
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-full flex items-center justify-center mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#111727] mb-1 text-center">{usuario.nombre}</h3>
                <p className="text-[#6B7280] text-sm">Estudiante / Alumno</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-[#6B7280] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-[#6B7280]">Email</p>
                    <p className="text-[#111727]">{usuario.email}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#6B7280] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-[#6B7280]">Ubicación</p>
                    <p className="text-[#111727]">{usuario.ubicacion}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-[#6B7280] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-[#6B7280]">Miembro desde</p>
                    <p className="text-[#111727]">{usuario.miembro_desde}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-[#6B7280] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-[#6B7280]">CV</p>
                    <button className="text-[#2563EB] hover:text-[#1D4ED8] text-sm">
                      {usuario.cv}
                    </button>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white py-3 rounded-xl font-medium hover:shadow-lg transition-shadow">
                Editar Perfil
              </button>
            </motion.div>
          </div>

          {/* Main Content - Candidaturas */}
          <div className="lg:col-span-2">
            {/* Estadísticas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-3 gap-4 mb-8"
            >
              {estadisticas.map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-xl p-6 border border-[#2563EB]/10 text-center"
                >
                  <div className="text-3xl font-bold text-[#2563EB] mb-1">{stat.valor}</div>
                  <div className="text-sm text-[#6B7280]">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Lista de Candidaturas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#111727]">Mis Candidaturas</h2>
                <button className="text-[#2563EB] hover:text-[#1D4ED8] text-sm font-medium">
                  Ver Todas
                </button>
              </div>

              <div className="space-y-4">
                {candidaturas.map((candidatura, index) => {
                  const StatusIcon = candidatura.icon;
                  return (
                    <motion.div
                      key={candidatura.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      whileHover={{ y: -2 }}
                      className="bg-white rounded-2xl p-6 shadow-lg border border-[#2563EB]/10 hover:border-[#2563EB]/30 transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-[#111727] mb-2">{candidatura.titulo}</h3>
                          <div className="flex items-center space-x-2 text-[#6B7280] mb-2">
                            <Briefcase className="w-4 h-4" />
                            <span className="text-sm">{candidatura.empresa}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-[#6B7280]">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{candidatura.ubicacion}</span>
                          </div>
                        </div>
                        <div className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center space-x-2 ${candidatura.estadoColor}`}>
                          <StatusIcon className="w-4 h-4" />
                          <span>{candidatura.estado}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-[#F3F4F6]">
                        <div className="text-sm text-[#6B7280]">
                          Aplicada el {candidatura.fechaAplicacion}
                        </div>
                        <button className="text-[#2563EB] hover:text-[#1D4ED8] text-sm font-medium">
                          Ver Detalles →
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Empty State si no hay candidaturas */}
            {candidaturas.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl p-12 text-center border border-[#2563EB]/10"
              >
                <Briefcase className="w-20 h-20 text-[#6B7280] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#111727] mb-2">
                  Aún no tienes candidaturas
                </h3>
                <p className="text-[#6B7280] mb-6">
                  Explora nuestras ofertas y comienza a aplicar
                </p>
                <button className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white px-8 py-3 rounded-xl font-medium">
                  Explorar Ofertas
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
