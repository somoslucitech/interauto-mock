"use client";

import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Users, 
  FileCheck, 
  Car,
  MoreVertical,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const STATS = [
  { label: "Cotizaciones Mes", value: "482", trend: "+12.5%", positive: true, icon: FileCheck, color: "text-orange" },
  { label: "Ventas Cerradas", value: "38", trend: "+5.2%", positive: true, icon: TrendingUp, color: "text-aquamarine" },
  { label: "Clientes Nuevos", value: "124", trend: "-2.1%", positive: false, icon: Users, color: "text-yellow" },
  { label: "Meta Mensual", value: "85%", trend: "+10%", positive: true, icon: Target, color: "text-white" },
];

const RECENT_QUOTES = [
  { id: "COT-4592", client: "Carlos Mendoza", vehicle: "Toyota Fortuner", total: "$65,000", status: "Enviada", date: "Hace 2 horas" },
  { id: "COT-4591", client: "María González", vehicle: "Corolla Hybrid", total: "$32,000", status: "Cerrada", date: "Hace 5 horas" },
  { id: "COT-4590", client: "Empresa TransCar", vehicle: "Hilux Revo (x2)", total: "$96,000", status: "Pendiente", date: "Ayer" },
  { id: "COT-4589", client: "Roberto Rivas", vehicle: "Land Cruiser", total: "$120,000", status: "Vencida", date: "Ayer" },
];

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-background text-white">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-10 relative">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orange/5 rounded-full blur-[150px] -z-10" />

        <header className="mb-12 flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={18} className="text-yellow" />
              <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Gestión de Inteligencia</p>
            </div>
            <h1 className="text-4xl font-black tracking-tighter">Panel de <span className="text-aquamarine">Control</span></h1>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-2xl shadow-orange/20 uppercase tracking-tighter"
          >
            <Plus size={24} />
            Actualizar Inventario
          </motion.button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-8 mb-10">
          {STATS.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[32px] glass-card group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={cn("p-4 rounded-2xl bg-white/5 group-hover:scale-110 transition-transform duration-500", stat.color)}>
                  <stat.icon size={28} />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg",
                  stat.positive ? "bg-aquamarine/10 text-aquamarine" : "bg-red-500/10 text-red-500"
                )}>
                  {stat.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {stat.trend}
                </div>
              </div>
              <p className="text-[10px] text-white/30 font-black uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl font-black tracking-tighter">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-10">
          {/* Recent Activity Table */}
          <div className="col-span-8 glass-panel border-white/5 rounded-[40px] overflow-hidden">
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <h3 className="font-black uppercase tracking-tighter text-xl">Monitor de Cotizaciones</h3>
              <button className="text-[10px] font-black text-orange uppercase tracking-widest hover:brightness-125 transition-all">Exportar Reporte</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 text-[10px] uppercase tracking-[0.2em] text-white/30">
                    <th className="px-8 py-5 font-black">Identificador</th>
                    <th className="px-8 py-5 font-black">Modelo</th>
                    <th className="px-8 py-5 font-black">Inversión</th>
                    <th className="px-8 py-5 font-black">Status</th>
                    <th className="px-8 py-5 font-black"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {RECENT_QUOTES.map((quote) => (
                    <tr key={quote.id} className="group hover:bg-white/5 transition-all cursor-pointer">
                      <td className="px-8 py-6">
                        <p className="font-black text-sm group-hover:text-orange transition-colors">{quote.id}</p>
                        <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider">{quote.client}</p>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-sm font-bold text-white/80">{quote.vehicle}</p>
                        <p className="text-[10px] text-white/20 font-medium">{quote.date}</p>
                      </td>
                      <td className="px-8 py-6 text-sm font-black text-white">{quote.total}</td>
                      <td className="px-8 py-6">
                        <span className={cn(
                          "text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border",
                          quote.status === "Cerrada" ? "bg-aquamarine/10 text-aquamarine border-aquamarine/20" :
                          quote.status === "Enviada" ? "bg-orange/10 text-orange border-orange/20" :
                          quote.status === "Pendiente" ? "bg-yellow/10 text-yellow border-yellow/20" :
                          "bg-red-500/10 text-red-500 border-red-500/20"
                        )}>
                          {quote.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button className="text-white/20 hover:text-white transition-colors">
                          <MoreVertical size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions / Performance */}
          <div className="col-span-4 space-y-8">
            <div className="glass-panel border-white/5 rounded-[40px] p-8">
              <h3 className="font-black uppercase tracking-tighter text-xl mb-8">Performance <span className="text-orange">Elite</span></h3>
              <div className="space-y-8">
                {[
                  { name: "Juan Delgado", sales: 12, target: 15, color: "bg-orange" },
                  { name: "Elena Rivas", sales: 9, target: 10, color: "bg-aquamarine" },
                  { name: "Marcos Peña", sales: 5, target: 10, color: "bg-yellow" },
                ].map((v) => (
                  <div key={v.name} className="space-y-3">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-sm font-black">{v.name}</p>
                        <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Ventas: {v.sales}</p>
                      </div>
                      <span className="text-xs font-black text-white/60">{Math.round((v.sales/v.target)*100)}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-[2px]">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(v.sales / v.target) * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={cn("h-full rounded-full", v.color)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-orange to-yellow rounded-[40px] p-10 text-background relative overflow-hidden group cursor-pointer shadow-2xl shadow-orange/20"
            >
              <div className="relative z-10">
                <h3 className="font-black text-3xl tracking-tighter mb-2">Reporte Mayo</h3>
                <p className="text-background/70 text-sm font-bold leading-tight mb-6">Análisis detallado de conversión y stock.</p>
                <button className="bg-background text-orange px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                  Descargar PDF
                </button>
              </div>
              <TrendingUp size={160} className="absolute -bottom-6 -right-6 text-background/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700" />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
