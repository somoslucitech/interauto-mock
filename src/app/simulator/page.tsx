"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  ChevronRight, 
  CreditCard, 
  Wallet,
  CheckCircle2,
  FileText,
  Mail,
  Car,
  ChevronLeft,
  Calendar,
  ShieldCheck,
  User,
  ArrowRight,
  Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

const BRANDS = [
  { id: "jac", name: "JAC", logo: "https://www.jac.com.cn/upload/images/2021/11/17/1637110825001.png" },
  { id: "dodge", name: "Dodge", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Dodge_logo.svg/1200px-Dodge_logo.svg.png" },
  { id: "jeep", name: "Jeep", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Jeep_logo.svg/1200px-Jeep_logo.svg.png" },
];

const VEHICLES = [
  { id: 1, brand: "jac", name: "JAC T8 Pro 4x4", price: 32500, category: "Pickup", image: "/images/vehicles/jac-t8.jpg" },
  { id: 2, brand: "jac", name: "JAC JS8 SUV", price: 29800, category: "SUV", image: "/images/vehicles/jac-js8.jpg" },
  { id: 3, brand: "dodge", name: "Dodge Durango SRT", price: 85000, category: "SUV", image: "/images/vehicles/dodge-durango.jpg" },
  { id: 4, brand: "dodge", name: "Dodge Ram 1500", price: 72000, category: "Pickup", image: "/images/vehicles/ram-1500.jpg" },
  { id: 5, brand: "jeep", name: "Jeep Grand Cherokee", price: 68000, category: "SUV", image: "/images/vehicles/jeep-grand-cherokee.jpg" },
  { id: 6, brand: "jeep", name: "Jeep Wrangler Rubicon", price: 75000, category: "Off-Road", image: "/images/vehicles/jeep-wrangler.jpg" },
];

const BANKS = [
  { id: 1, name: "Banesco", initial_pct: 30, term: 48, rate: 12, color: "text-orange" },
  { id: 2, name: "Mercantil", initial_pct: 40, term: 36, rate: 10, color: "text-aquamarine" },
  { id: 3, name: "BBVA Provincial", initial_pct: 20, term: 60, rate: 15, color: "text-yellow" },
];

export default function SimulatorPage() {
  const [step, setStep] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState<any>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [selectedBank, setSelectedBank] = useState<any>(null);
  const [paymentType, setPaymentType] = useState<"contado" | "financiamiento">("financiamiento");
  const [clientData, setClientData] = useState({ name: "", email: "", phone: "" });

  const calculateFinance = () => {
    if (!selectedVehicle || !selectedBank) return { initial: 0, monthly: 0, total: 0 };
    const initial = selectedVehicle.price * (selectedBank.initial_pct / 100);
    const amountToFinance = selectedVehicle.price - initial;
    const monthly = (amountToFinance * (1 + (selectedBank.rate / 100))) / selectedBank.term;
    const total = initial + (monthly * selectedBank.term);
    return { initial, monthly, total };
  };

  const { initial, monthly, total } = calculateFinance();

  const handleBrandSelect = (brand: any) => {
    setSelectedBrand(brand);
    setStep(2);
  };

  const filteredVehicles = VEHICLES.filter(v => v.brand === selectedBrand?.id);

  return (
    <div className="flex min-h-screen bg-background text-white selection:bg-orange/30">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-10 relative">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange/5 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-aquamarine/5 rounded-full blur-[120px] -z-10" />

        <header className="mb-12 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tighter text-white mb-2">
              Cotizador <span className="text-orange">PRO</span>
            </h1>
            <p className="text-white/50 font-medium">Configuración de propuesta comercial</p>
          </div>
          
          <div className="flex items-center glass-card px-6 py-3 rounded-2xl">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="flex items-center">
                <div 
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 relative z-10",
                    step === s ? "bg-orange text-white orange-glow scale-110" : 
                    step > s ? "bg-aquamarine text-white" : "bg-white/10 text-white/30"
                  )}
                >
                  {step > s ? <CheckCircle2 size={16} /> : s}
                </div>
                {s < 5 && (
                  <div className="w-10 h-[2px] -mx-[1px] relative overflow-hidden bg-white/10">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: step > s ? "100%" : "0%" }}
                      className="h-full bg-aquamarine"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-12 gap-10">
          {/* Main Flow */}
          <div className="col-span-8 space-y-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">1. Seleccione la Marca</h2>
                    <p className="text-white/40 text-sm">El catálogo se actualizará automáticamente al seleccionar</p>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    {BRANDS.map((brand) => (
                      <motion.div 
                        key={brand.id}
                        whileHover={{ y: -10, scale: 1.02 }}
                        onClick={() => handleBrandSelect(brand)}
                        className={cn(
                          "p-10 rounded-[40px] glass-card flex flex-col items-center gap-6 cursor-pointer transition-all duration-300",
                          selectedBrand?.id === brand.id ? "border-orange/50 bg-orange/5 shadow-2xl shadow-orange/10" : "hover:border-white/20"
                        )}
                      >
                        <div className="w-24 h-24 relative p-4 bg-white rounded-3xl overflow-hidden flex items-center justify-center">
                          <img src={brand.logo} alt={brand.name} className="object-contain w-full h-full" />
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tighter">{brand.name}</h3>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <button onClick={() => setStep(1)} className="w-10 h-10 glass-card rounded-xl flex items-center justify-center hover:text-orange transition-colors">
                      <ChevronLeft size={20} />
                    </button>
                    <div>
                      <h2 className="text-2xl font-bold">Vehículos {selectedBrand?.name}</h2>
                      <p className="text-white/40 text-sm">Inventario actualizado en tiempo real</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    {filteredVehicles.map((v) => (
                      <motion.div 
                        key={v.id}
                        whileHover={{ y: -5 }}
                        onClick={() => setSelectedVehicle(v)}
                        className={cn(
                          "group cursor-pointer rounded-3xl overflow-hidden glass-card transition-all relative",
                          selectedVehicle?.id === v.id ? "border-orange/50 ring-1 ring-orange/30 shadow-2xl shadow-orange/10" : ""
                        )}
                      >
                        <div className="aspect-[16/10] relative bg-white/5">
                          <img src={v.image} alt={v.name} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                          <div className="absolute bottom-5 left-6">
                            <span className="text-[10px] bg-orange/20 text-orange px-2 py-1 rounded-md font-bold uppercase tracking-widest mb-2 inline-block">
                              {v.category}
                            </span>
                            <h3 className="text-xl font-bold text-white group-hover:text-orange transition-colors">{v.name}</h3>
                          </div>
                        </div>
                        <div className="p-6 flex justify-between items-center">
                          <div className="space-y-1">
                            <p className="text-[10px] text-white/30 uppercase font-bold tracking-tighter">Precio de Venta</p>
                            <span className="text-2xl font-black text-white">${v.price.toLocaleString()}</span>
                          </div>
                          <div className={cn(
                            "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500",
                            selectedVehicle?.id === v.id ? "bg-orange border-orange text-white orange-glow" : "border-white/10 text-transparent"
                          )}>
                            <CheckCircle2 size={20} />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {selectedVehicle && (
                    <motion.button 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onClick={() => setStep(3)}
                      className="w-full btn-primary py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 group mt-4 uppercase tracking-tighter"
                    >
                      Continuar con {selectedVehicle.name}
                      <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                    </motion.button>
                  )}
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4">
                    <button onClick={() => setStep(2)} className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center hover:text-orange transition-colors">
                      <ChevronLeft size={24} />
                    </button>
                    <div>
                      <h2 className="text-2xl font-bold">Modalidad de Pago</h2>
                      <p className="text-white/40 text-sm">Define la estructura financiera</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div 
                      onClick={() => setPaymentType("contado")}
                      className={cn(
                        "p-10 rounded-[40px] glass-card transition-all cursor-pointer flex flex-col items-center gap-6 text-center group",
                        paymentType === "contado" ? "border-aquamarine/40 bg-aquamarine/5" : "hover:border-white/20"
                      )}
                    >
                      <div className={cn(
                        "w-24 h-24 rounded-3xl flex items-center justify-center transition-all duration-500", 
                        paymentType === "contado" ? "bg-aquamarine text-white aquamarine-glow rotate-12" : "bg-white/5 text-white/20 group-hover:rotate-6"
                      )}>
                        <Wallet size={48} />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-black text-2xl uppercase tracking-tighter">De Contado</h3>
                        <p className="text-sm text-white/40 leading-relaxed font-medium">Pago único con beneficios exclusivos e impuestos preferenciales.</p>
                      </div>
                    </div>

                    <div 
                      onClick={() => setPaymentType("financiamiento")}
                      className={cn(
                        "p-10 rounded-[40px] glass-card transition-all cursor-pointer flex flex-col items-center gap-6 text-center group",
                        paymentType === "financiamiento" ? "border-orange/40 bg-orange/5" : "hover:border-white/20"
                      )}
                    >
                      <div className={cn(
                        "w-24 h-24 rounded-3xl flex items-center justify-center transition-all duration-500", 
                        paymentType === "financiamiento" ? "bg-orange text-white orange-glow -rotate-12" : "bg-white/5 text-white/20 group-hover:-rotate-6"
                      )}>
                        <CreditCard size={48} />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-black text-2xl uppercase tracking-tighter">Financiamiento</h3>
                        <p className="text-sm text-white/40 leading-relaxed font-medium">Planes flexibles de 12 a 60 meses con aliados bancarios.</p>
                      </div>
                    </div>
                  </div>

                  {paymentType === "financiamiento" && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-6 pt-4"
                    >
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="text-aquamarine" size={20} />
                        <h3 className="font-bold text-lg">Aliados Bancarios Disponibles</h3>
                      </div>
                      <div className="grid grid-cols-3 gap-6">
                        {BANKS.map((b) => (
                          <div 
                            key={b.id}
                            onClick={() => setSelectedBank(b)}
                            className={cn(
                              "p-6 rounded-3xl glass-card transition-all cursor-pointer relative overflow-hidden group",
                              selectedBank?.id === b.id ? "border-white/30 bg-white/5 ring-1 ring-white/10" : ""
                            )}
                          >
                            <div className="flex items-center justify-between mb-4 relative z-10">
                              <span className={cn("font-black tracking-tighter", b.color)}>{b.name}</span>
                              {selectedBank?.id === b.id && <CheckCircle2 size={18} className="text-aquamarine" />}
                            </div>
                            <div className="space-y-2 relative z-10">
                              <div className="flex flex-col text-[10px] uppercase tracking-widest font-bold text-white/30">
                                <span>Inicial: <span className="text-white">{b.initial_pct}%</span></span>
                                <span className="mt-1">Plazo: <span className="text-white">{b.term} Meses</span></span>
                              </div>
                              <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold text-white/30 pt-2 border-t border-white/5">
                                <span>Tasa Anual</span>
                                <span className="text-white">{b.rate}%</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <motion.button 
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(4)}
                    disabled={paymentType === "financiamiento" && !selectedBank}
                    className="w-full btn-primary py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 group uppercase tracking-tighter disabled:opacity-20"
                  >
                    Siguiente: Datos del Cliente
                    <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
                  </motion.button>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div 
                  key="step4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4">
                    <button onClick={() => setStep(3)} className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center hover:text-orange transition-colors">
                      <ChevronLeft size={24} />
                    </button>
                    <div>
                      <h2 className="text-2xl font-bold">Datos del Prospecto</h2>
                      <p className="text-white/40 text-sm">Información para el envío de la propuesta</p>
                    </div>
                  </div>

                  <div className="glass-card p-10 rounded-[40px] space-y-6">
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-black text-white/30 ml-2">Nombre Completo</label>
                        <div className="relative">
                          <User className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                          <input 
                            type="text" 
                            value={clientData.name}
                            onChange={(e) => setClientData({...clientData, name: e.target.value})}
                            placeholder="Ej. Juan Perez"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white focus:outline-none focus:border-orange/50 transition-all font-semibold"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-black text-white/30 ml-2">Correo Electrónico</label>
                        <div className="relative">
                          <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                          <input 
                            type="email" 
                            value={clientData.email}
                            onChange={(e) => setClientData({...clientData, email: e.target.value})}
                            placeholder="juan@email.com"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white focus:outline-none focus:border-orange/50 transition-all font-semibold"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-black text-white/30 ml-2">Teléfono de Contacto</label>
                      <input 
                        type="text" 
                        value={clientData.phone}
                        onChange={(e) => setClientData({...clientData, phone: e.target.value})}
                        placeholder="+58 412 0000000"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-orange/50 transition-all font-semibold"
                      />
                    </div>
                  </div>

                  <button 
                    onClick={() => setStep(5)}
                    disabled={!clientData.name || !clientData.email}
                    className="w-full btn-primary py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 group uppercase tracking-tighter disabled:opacity-20"
                  >
                    Generar Propuesta Final
                    <FileText size={22} className="group-hover:scale-110 transition-transform" />
                  </button>
                </motion.div>
              )}

              {step === 5 && (
                <motion.div 
                  key="step5"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-8"
                >
                  <div className="glass-card p-12 rounded-[50px] relative overflow-hidden border-aquamarine/20 shadow-2xl shadow-aquamarine/5">
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-aquamarine/10 rounded-full blur-[80px]" />
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-orange/10 rounded-full blur-[80px]" />
                    
                    <div className="relative z-10 text-center space-y-8">
                      <div className="w-24 h-24 bg-aquamarine/10 text-aquamarine rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-12">
                        <CheckCircle2 size={56} />
                      </div>
                      
                      <div className="space-y-2">
                        <h2 className="text-4xl font-black tracking-tighter">¡Propuesta Generada!</h2>
                        <p className="text-white/40 font-medium">Lista para revisión y envío digital.</p>
                      </div>

                      <div className="grid grid-cols-2 gap-8 py-10 border-y border-white/5 my-10">
                        <div className="text-center space-y-2">
                          <p className="text-[10px] uppercase tracking-widest font-black text-white/30">Inversión Inicial</p>
                          <p className="text-5xl font-black text-orange tracking-tighter">${initial.toLocaleString()}</p>
                        </div>
                        <div className="text-center space-y-2">
                          <p className="text-[10px] uppercase tracking-widest font-black text-white/30">Cuota Mensual</p>
                          <p className="text-5xl font-black text-white tracking-tighter">${monthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4">
                        <div className="flex gap-4">
                          <button className="flex-1 bg-white/5 border border-white/10 py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-white/10 transition-all uppercase tracking-tighter">
                            <FileText size={24} className="text-aquamarine" />
                            Visualizar PDF
                          </button>
                          <button className="flex-1 btn-primary py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all uppercase tracking-tighter">
                            <Mail size={24} />
                            Enviar por Email
                          </button>
                        </div>
                        <button 
                          onClick={() => {
                            setStep(1);
                            setSelectedBrand(null);
                            setSelectedVehicle(null);
                            setSelectedBank(null);
                            setClientData({ name: "", email: "", phone: "" });
                          }}
                          className="py-4 text-white/30 hover:text-white transition-all font-bold uppercase text-xs tracking-widest"
                        >
                          Realizar nueva cotización
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Sidebar: Context Summary */}
          <div className="col-span-4">
            <div className="sticky top-10 glass-panel border border-white/5 rounded-[40px] p-8 space-y-8">
              <h3 className="text-xl font-black uppercase tracking-tighter border-b border-white/5 pb-6">Configuración Actual</h3>
              
              {selectedBrand ? (
                <div className="space-y-8">
                  {/* Brand Display */}
                  <div className="flex items-center gap-4 p-4 rounded-3xl bg-white/5 border border-white/10">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-2">
                      <img src={selectedBrand.logo} className="w-full h-full object-contain" />
                    </div>
                    <span className="font-black uppercase tracking-tighter">{selectedBrand.name}</span>
                  </div>

                  {selectedVehicle && (
                    <div className="space-y-4">
                      <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 relative group bg-white/5">
                        <img src={selectedVehicle.image} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="bg-white text-black px-4 py-2 rounded-xl font-bold text-xs uppercase">Ver Ficha</span>
                        </div>
                      </div>
                      <div className="px-2">
                        <h4 className="text-lg font-bold">{selectedVehicle.name}</h4>
                        <p className="text-sm text-white/40 font-medium">ID Stock: #ITA-2024-0{selectedVehicle.id}</p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    {selectedVehicle && (
                      <div className="flex justify-between items-center text-sm px-2">
                        <span className="text-white/30 font-bold uppercase tracking-widest text-[10px]">Precio Lista</span>
                        <span className="font-black text-lg">${selectedVehicle.price.toLocaleString()}</span>
                      </div>
                    )}
                    
                    {selectedBank && (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-3 bg-white/5 p-5 rounded-3xl border border-white/10"
                      >
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-white/40 font-bold">Plan Aliado:</span>
                          <span className={cn("font-black", selectedBank.color)}>{selectedBank.name}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-white/40 font-bold">Plazo Elegido:</span>
                          <span className="font-bold text-white">{selectedBank.term} Meses</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-white/40 font-bold">Total a pagar:</span>
                          <span className="font-bold text-white">${total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>
                      </motion.div>
                    )}

                    {clientData.name && (
                      <div className="bg-aquamarine/5 border border-aquamarine/20 p-5 rounded-3xl space-y-2">
                        <p className="text-[10px] text-aquamarine font-black uppercase tracking-widest">Prospecto</p>
                        <p className="text-sm font-bold truncate">{clientData.name}</p>
                        <p className="text-xs text-white/40 truncate">{clientData.email}</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center space-y-6">
                  <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                    <Layers className="text-white/10" size={48} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-white/40">Esperando Selección</p>
                    <p className="text-[10px] text-white/20 uppercase font-black tracking-widest px-8">Inicia seleccionando una de nuestras marcas aliadas</p>
                  </div>
                </div>
              )}

              {/* Trust Signals */}
              <div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-aquamarine" />
                  <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Calculo SSL</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-orange" />
                  <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Validez 15d</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
