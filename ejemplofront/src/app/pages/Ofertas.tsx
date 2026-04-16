import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Briefcase, Building2, Search, Filter, Euro } from 'lucide-react';

interface Oferta {
  id: number;
  titulo: string;
  empresa: string;
  ubicacion: string;
  tipo: string;
  salario: string;
  descripcion: string;
  tecnologias: string[];
  publicado: string;
}

export function Ofertas() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTipo, setFilterTipo] = useState('all');

  const ofertas: Oferta[] = [
    {
      id: 1,
      titulo: 'Desarrollador Frontend React',
      empresa: 'TechStartup SL',
      ubicacion: 'Madrid',
      tipo: 'Tiempo Completo',
      salario: '25.000 - 32.000€',
      descripcion: 'Buscamos desarrollador frontend con experiencia en React y TypeScript para unirse a nuestro equipo.',
      tecnologias: ['React', 'TypeScript', 'Tailwind CSS'],
      publicado: 'Hace 2 días'
    },
    {
      id: 2,
      titulo: 'Full Stack Developer Junior',
      empresa: 'Innovatech Solutions',
      ubicacion: 'Barcelona',
      tipo: 'Tiempo Completo',
      salario: '22.000 - 28.000€',
      descripcion: 'Oportunidad para desarrollador junior con conocimientos en Node.js y bases de datos.',
      tecnologias: ['Node.js', 'MongoDB', 'React'],
      publicado: 'Hace 3 días'
    },
    {
      id: 3,
      titulo: 'Diseñador UX/UI',
      empresa: 'Creative Digital',
      ubicacion: 'Valencia',
      tipo: 'Medio Tiempo',
      salario: '18.000 - 24.000€',
      descripcion: 'Diseñador creativo para proyectos web y mobile con enfoque en experiencia de usuario.',
      tecnologias: ['Figma', 'Adobe XD', 'Photoshop'],
      publicado: 'Hace 1 semana'
    },
    {
      id: 4,
      titulo: 'Backend Developer Python',
      empresa: 'DataFlow Systems',
      ubicacion: 'Sevilla',
      tipo: 'Tiempo Completo',
      salario: '28.000 - 35.000€',
      descripcion: 'Desarrollador backend especializado en Python y Django para aplicaciones empresariales.',
      tecnologias: ['Python', 'Django', 'PostgreSQL'],
      publicado: 'Hace 4 días'
    },
    {
      id: 5,
      titulo: 'DevOps Engineer',
      empresa: 'CloudTech Pro',
      ubicacion: 'Remoto',
      tipo: 'Tiempo Completo',
      salario: '30.000 - 38.000€',
      descripcion: 'Ingeniero DevOps para gestión de infraestructura cloud y CI/CD.',
      tecnologias: ['Docker', 'Kubernetes', 'AWS'],
      publicado: 'Hace 5 días'
    },
    {
      id: 6,
      titulo: 'Desarrollador Mobile Flutter',
      empresa: 'AppMakers Studio',
      ubicacion: 'Málaga',
      tipo: 'Prácticas',
      salario: '12.000 - 15.000€',
      descripcion: 'Prácticas en desarrollo de aplicaciones móviles multiplataforma con Flutter.',
      tecnologias: ['Flutter', 'Dart', 'Firebase'],
      publicado: 'Hace 1 día'
    }
  ];

  const filteredOfertas = ofertas.filter(oferta => {
    const matchesSearch = oferta.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         oferta.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         oferta.tecnologias.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterTipo === 'all' || oferta.tipo === filterTipo;
    return matchesSearch && matchesFilter;
  });

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
            Ofertas de{' '}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] bg-clip-text text-transparent">
              Empleo
            </span>
          </h1>
          <p className="text-xl text-[#6B7280]">
            Encuentra la oportunidad perfecta para iniciar tu carrera profesional
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 bg-white rounded-2xl p-6 shadow-lg border border-[#2563EB]/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
              <input
                type="text"
                placeholder="Buscar por título, empresa o tecnología..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#F3F4F6] rounded-xl border-2 border-transparent focus:border-[#2563EB] focus:bg-white transition-all outline-none"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
              <select
                value={filterTipo}
                onChange={(e) => setFilterTipo(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#F3F4F6] rounded-xl border-2 border-transparent focus:border-[#2563EB] focus:bg-white transition-all outline-none appearance-none"
              >
                <option value="all">Todos los tipos</option>
                <option value="Tiempo Completo">Tiempo Completo</option>
                <option value="Medio Tiempo">Medio Tiempo</option>
                <option value="Prácticas">Prácticas</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Ofertas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredOfertas.map((oferta, index) => (
            <motion.div
              key={oferta.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-[#2563EB]/10 hover:border-[#2563EB]/30 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#111727] mb-2">{oferta.titulo}</h3>
                  <div className="flex items-center space-x-2 text-[#6B7280] mb-3">
                    <Building2 className="w-4 h-4" />
                    <span className="text-sm">{oferta.empresa}</span>
                  </div>
                </div>
                <div className="bg-[#DBEAFE] text-[#2563EB] px-3 py-1 rounded-lg text-sm font-medium">
                  {oferta.tipo}
                </div>
              </div>

              <p className="text-[#6B7280] mb-4 line-clamp-2">{oferta.descripcion}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {oferta.tecnologias.map((tech) => (
                  <span
                    key={tech}
                    className="bg-[#EFF6FF] text-[#1D4ED8] px-3 py-1 rounded-lg text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#F3F4F6]">
                <div className="flex items-center space-x-4 text-sm text-[#6B7280]">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{oferta.ubicacion}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Euro className="w-4 h-4" />
                    <span>{oferta.salario}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-sm text-[#6B7280]">
                  <Clock className="w-4 h-4" />
                  <span>{oferta.publicado}</span>
                </div>
              </div>

              <button className="w-full mt-4 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white py-3 rounded-xl font-medium hover:shadow-lg transition-shadow">
                Ver Detalles
              </button>
            </motion.div>
          ))}
        </div>

        {filteredOfertas.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Briefcase className="w-20 h-20 text-[#6B7280] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#111727] mb-2">No se encontraron ofertas</h3>
            <p className="text-[#6B7280]">Intenta ajustar tus filtros de búsqueda</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
