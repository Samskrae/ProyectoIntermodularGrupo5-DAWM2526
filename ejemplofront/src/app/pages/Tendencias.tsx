import { motion } from 'motion/react';
import { TrendingUp, Code, Award, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

export function Tendencias() {
  const tecnologiasData = [
    { nombre: 'React', demanda: 95, color: '#2563EB' },
    { nombre: 'TypeScript', demanda: 88, color: '#1D4ED8' },
    { nombre: 'Node.js', demanda: 82, color: '#1E3A8A' },
    { nombre: 'Python', demanda: 79, color: '#2563EB' },
    { nombre: 'Docker', demanda: 75, color: '#1D4ED8' },
    { nombre: 'AWS', demanda: 71, color: '#1E3A8A' },
    { nombre: 'MongoDB', demanda: 68, color: '#2563EB' },
    { nombre: 'Vue.js', demanda: 64, color: '#1D4ED8' },
  ];

  const frameworksData = [
    { name: 'React', value: 35, color: '#2563EB' },
    { name: 'Vue.js', value: 20, color: '#1D4ED8' },
    { name: 'Angular', value: 18, color: '#1E3A8A' },
    { name: 'Svelte', value: 12, color: '#6B7280' },
    { name: 'Otros', value: 15, color: '#DBEAFE' },
  ];

  const habilidadesTop = [
    { nombre: 'Desarrollo Web', porcentaje: 92, icon: Code },
    { nombre: 'Cloud Computing', porcentaje: 78, icon: Zap },
    { nombre: 'DevOps', porcentaje: 71, icon: TrendingUp },
    { nombre: 'UI/UX Design', porcentaje: 65, icon: Award },
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
            Tendencias del{' '}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] bg-clip-text text-transparent">
              Mercado
            </span>
          </h1>
          <p className="text-xl text-[#6B7280]">
            Descubre las tecnologías y habilidades más demandadas según análisis de portales de empleo
          </p>
        </motion.div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-2xl p-6 text-white"
          >
            <TrendingUp className="w-10 h-10 mb-4 opacity-80" />
            <div className="text-3xl font-bold mb-1">1,240</div>
            <div className="text-sm text-[#DBEAFE]">Ofertas Analizadas</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 border border-[#2563EB]/10"
          >
            <Code className="w-10 h-10 mb-4 text-[#2563EB]" />
            <div className="text-3xl font-bold text-[#111727] mb-1">42</div>
            <div className="text-sm text-[#6B7280]">Tecnologías Rastreadas</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 border border-[#2563EB]/10"
          >
            <Award className="w-10 h-10 mb-4 text-[#1D4ED8]" />
            <div className="text-3xl font-bold text-[#111727] mb-1">85%</div>
            <div className="text-sm text-[#6B7280]">Precisión de Datos</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 border border-[#2563EB]/10"
          >
            <Zap className="w-10 h-10 mb-4 text-[#1E3A8A]" />
            <div className="text-3xl font-bold text-[#111727] mb-1">24h</div>
            <div className="text-sm text-[#6B7280]">Actualización</div>
          </motion.div>
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-[#2563EB]/10"
          >
            <h3 className="text-2xl font-bold text-[#111727] mb-6">Tecnologías Más Demandadas</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={tecnologiasData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis 
                  dataKey="nombre" 
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #2563EB20',
                    borderRadius: '12px',
                    padding: '12px'
                  }}
                  cursor={{ fill: '#DBEAFE' }}
                />
                <Bar dataKey="demanda" radius={[8, 8, 0, 0]}>
                  {tecnologiasData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-[#2563EB]/10"
          >
            <h3 className="text-2xl font-bold text-[#111727] mb-6">Frameworks Frontend</h3>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={frameworksData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {frameworksData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #2563EB20',
                    borderRadius: '12px',
                    padding: '12px'
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => <span style={{ color: '#111727' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Top Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-[#2563EB]/10"
        >
          <h3 className="text-2xl font-bold text-[#111727] mb-6">Habilidades Más Valoradas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {habilidadesTop.map((habilidad, index) => {
              const Icon = habilidad.icon;
              return (
                <motion.div
                  key={habilidad.nombre}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="relative"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-[#DBEAFE] rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#2563EB]" />
                    </div>
                    <span className="font-medium text-[#111727]">{habilidad.nombre}</span>
                  </div>
                  <div className="relative h-3 bg-[#F3F4F6] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${habilidad.porcentaje}%` }}
                      transition={{ delay: 0.9 + index * 0.1, duration: 1 }}
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] rounded-full"
                    />
                  </div>
                  <div className="mt-2 text-right text-sm font-bold text-[#2563EB]">
                    {habilidad.porcentaje}%
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 bg-gradient-to-r from-[#EFF6FF] to-[#DBEAFE] rounded-2xl p-8 border border-[#2563EB]/20"
        >
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-[#2563EB] rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#111727] mb-2">Insights del Mercado</h3>
              <ul className="space-y-2 text-[#6B7280]">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-[#2563EB] rounded-full mt-2 mr-2 flex-shrink-0" />
                  <span>React se mantiene como el framework frontend más demandado con un crecimiento del 12% este trimestre</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-[#2563EB] rounded-full mt-2 mr-2 flex-shrink-0" />
                  <span>TypeScript ha superado a JavaScript en preferencia empresarial, presente en el 88% de ofertas</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-[#2563EB] rounded-full mt-2 mr-2 flex-shrink-0" />
                  <span>Las habilidades en Cloud Computing (AWS, Azure) han incrementado su demanda un 25% en el último año</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
