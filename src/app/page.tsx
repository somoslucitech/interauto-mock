"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogIn, Lock, User, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/simulator");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden p-4 md:p-6">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-aquamarine/10 rounded-full blur-[120px] animate-pulse" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md p-6 md:p-10 rounded-[40px] glass-panel border border-white/10 shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center mb-8 md:mb-10">
          <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="w-48 h-16 md:w-56 md:h-20 relative mb-6"
          >
            <Image 
              src="/images/logo.jpg" 
              alt="Interauto Logo" 
              fill 
              className="object-contain filter brightness-110"
              priority
            />
          </motion.div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-yellow" />
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase">Sistema Cotizador</h1>
          </div>
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">Fuerza de Ventas Elite</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-2">Usuario</label>
            <div className="relative group">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-orange transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="vendedor@interauto.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-3 md:py-4 text-white focus:outline-none focus:border-orange/50 transition-all font-semibold text-sm md:text-base"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-white/30 uppercase tracking-widest ml-2">Contraseña</label>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-orange transition-colors" size={20} />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-3 md:py-4 text-white focus:outline-none focus:border-orange/50 transition-all font-semibold text-sm md:text-base"
              />
            </div>
          </div>

          <motion.button 
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-4 md:py-5 rounded-2xl text-white font-black text-base md:text-lg flex items-center justify-center gap-3 transition-all disabled:opacity-50 uppercase tracking-tighter mt-4"
          >
            {loading ? (
              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={22} />
                Acceder al Panel
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-8 md:mt-10 pt-8 border-t border-white/5 text-center">
          <p className="text-[9px] md:text-[10px] text-white/20 font-black uppercase tracking-[0.3em]">Inter Auto Premium C.A.</p>
        </div>
      </motion.div>
    </div>
  );
}
