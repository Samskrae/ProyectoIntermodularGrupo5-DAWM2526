'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, Briefcase, DollarSign, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface Tecnologia {
  id: number;
  nombre: string;
}

interface Empresa {
  id: number;
  nombre_comercial: string;
}

interface OfertaEmpleo {
  id: number;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  salario_min: number;
  salario_max: number;
  tipo_contrato: string;
  fecha_publicacion: string;
  empresa_id: number;
  empresa: Empresa;
  tecnologias: Tecnologia[];
}

export default function Ofertas() {
  const [ofertas, setOfertas] = useState<OfertaEmpleo[]>([]);
  const [filteredOfertas, setFilteredOfertas] = useState<OfertaEmpleo[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('todos');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOfertas();
  }, []);

  const fetchOfertas = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/ofertas');
      if (response.ok) {
        const data = await response.json();
        setOfertas(data.data || data);
        setFilteredOfertas(data.data || data);
      }
    } catch (error) {
      console.error('Error fetching ofertas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = ofertas;

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(oferta =>
        oferta.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        oferta.empresa.nombre_comercial.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por tipo de contrato
    if (tipoFiltro !== 'todos') {
      filtered = filtered.filter(oferta => oferta.tipo_contrato === tipoFiltro);
    }

    setFilteredOfertas(filtered);
  }, [searchTerm, tipoFiltro, ofertas]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-2">Ofertas de Empleo</h1>
          <p className="text-xl text-gray-800">Descubre las mejores oportunidades para tu carrera profesional</p>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Búsqueda */}
            <div className="relative">
              <Search className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Buscar ofertas, empresas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white text-gray-900 placeholder-gray-500 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Filtro por tipo */}
            <select
              value={tipoFiltro}
              onChange={(e) => setTipoFiltro(e.target.value)}
              className="px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="todos">Todos los tipos</option>
              <option value="Tiempo Completo">Tiempo Completo</option>
              <option value="Tiempo Parcial">Tiempo Parcial</option>
              <option value="Contrato">Contrato</option>
              <option value="Prácticas">Prácticas</option>
            </select>
          </div>

          {/* Resultados */}
          <div className="mt-4 text-sm text-gray-800">
            Se encontraron <span className="font-bold text-blue-600">{filteredOfertas.length}</span> ofertas
          </div>
        </motion.div>

        {/* Lista de Ofertas */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-800 mt-4">Cargando ofertas...</p>
          </div>
        ) : filteredOfertas.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl">
            <Briefcase className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-800 text-lg">No se encontraron ofertas con los filtros seleccionados</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredOfertas.map((oferta) => (
              <motion.div
                key={oferta.id}
                variants={itemVariants}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-blue-300"
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{oferta.titulo}</h3>
                    <p className="text-blue-600 font-semibold">{oferta.empresa.nombre_comercial}</p>
                  </div>
                  <Link href={`/ofertas/${oferta.id}`}>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all">
                      Ver Detalles
                    </button>
                  </Link>
                </div>

                <p className="text-gray-800 mb-6 line-clamp-2">{oferta.descripcion}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center space-x-2 text-gray-800">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span>{oferta.ubicacion}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-gray-800">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                    <span>{oferta.tipo_contrato}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-gray-800">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    <span>${oferta.salario_min?.toLocaleString() || 'No especificado'} - ${oferta.salario_max?.toLocaleString() || 'No especificado'}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span>{new Date(oferta.fecha_publicacion).toLocaleDateString('es-ES')}</span>
                  </div>
                </div>

                {/* Tecnologías */}
                {oferta.tecnologias && oferta.tecnologias.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {oferta.tecnologias.map((tech) => (
                      <span
                        key={tech.id}
                        className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full"
                      >
                        {tech.nombre}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
