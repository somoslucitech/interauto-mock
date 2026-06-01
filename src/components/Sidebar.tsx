"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Calculator, 
  LayoutDashboard, 
  History, 
  Settings, 
  LogOut,
  ChevronRight,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { name: "Cotizador", icon: Calculator, href: "/simulator", color: "text-orange" },
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin", color: "text-aquamarine" },
  { name: "Historial", icon: History, href: "/history", color: "text-yellow" },
  { name: "Configuración", icon: Settings, href: "/settings", color: "text-white/60" },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <div className={cn(
        "w-64 h-screen glass-panel border-r border-white/5 flex flex-col fixed left-0 top-0 z-50 transition-transform duration-500 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-8 mb-6 flex justify-between items-center">
          <div className="relative w-full h-14">
            <Image 
              src="/images/logo.jpg" 
              alt="Interauto" 
              fill 
              className="object-contain object-left filter brightness-110"
            />
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden p-2 text-white/50 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-3 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center justify-between px-5 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                  isActive 
                    ? "bg-white/5 border border-white/10 text-white shadow-xl shadow-black/20" 
                    : "text-white/50 hover:bg-white/5 hover:text-white"
                )}
              >
                <div className="flex items-center gap-4 relative z-10">
                  <item.icon size={22} className={cn("transition-colors", isActive ? item.color : "group-hover:" + item.color)} />
                  <span className="font-semibold tracking-tight">{item.name}</span>
                </div>
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute left-0 w-1 h-6 bg-orange rounded-full"
                  />
                )}
                {isActive && <ChevronRight size={16} className="text-white/40" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-6">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-orange to-yellow p-[2px]">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-white font-bold">
                  JD
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-aquamarine rounded-full border-2 border-background" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">Juan Delgado</p>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Vendedor Senior</p>
            </div>
          </div>
          
          <Link 
            href="/" 
            className="flex items-center gap-3 px-5 py-3.5 rounded-2xl text-white/40 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-sm">Cerrar Sesión</span>
          </Link>
        </div>
      </div>
    </>
  );
}
