"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

export default function DashboardWrapper({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-white selection:bg-orange/30">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 glass-panel border-b border-white/5 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-white/70 hover:text-white transition-colors"
            >
              <Menu size={24} />
            </button>
            <span className="font-black tracking-tighter text-lg uppercase">Interauto <span className="text-orange">Pro</span></span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange to-yellow p-[1px]">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-[10px] font-bold">JD</div>
          </div>
        </header>

        <main className="flex-1 lg:ml-64 relative">
          {children}
        </main>
      </div>
    </div>
  );
}
