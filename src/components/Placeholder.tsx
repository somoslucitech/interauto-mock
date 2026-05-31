"use client";

import Sidebar from "@/components/Sidebar";

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold opacity-20 uppercase tracking-tighter">{title}</h1>
          <p className="text-muted-foreground">Módulo en desarrollo para la Fase 3</p>
        </div>
      </main>
    </div>
  );
}
