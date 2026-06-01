"use client";

import DashboardWrapper from "./DashboardWrapper";

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <DashboardWrapper>
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold opacity-20 uppercase tracking-tighter">{title}</h1>
          <p className="text-white/40 font-medium">Módulo en desarrollo para la Fase 3</p>
        </div>
      </div>
    </DashboardWrapper>
  );
}
