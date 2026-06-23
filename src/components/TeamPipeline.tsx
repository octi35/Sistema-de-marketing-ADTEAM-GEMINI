import React, { useState } from "react";
import { PixelAvatar } from "./AgentProfiles";
import { Play, Check, RefreshCw, Award, ArrowUpRight, ShieldAlert, FileText, ChevronRight } from "lucide-react";

export const TeamPipeline: React.FC = () => {
  const [compiling, setCompiling] = useState(false);
  const [compiledReport, setCompiledReport] = useState<string | null>(null);

  // Kanban pipeline columns & cards matching the agency flow
  const columns = [
    {
      title: "Métricas (Mateo)",
      icon: "📊",
      color: "border-[#222224] bg-[#1A1A1C]/20",
      cards: [
        { id: "c-1", title: "Auditar CTR Meta Feed", desc: "Monitorear la fatiga del gancho principal en la campaña de domótica.", tag: "Métricas" },
        { id: "c-2", title: "Informe de Competidores", desc: "Análisis del mix de carruseles de la marca líder del nicho.", tag: "Competidores" }
      ]
    },
    {
      title: "Estrategia (Santi)",
      icon: "🧭",
      color: "border-[#222224] bg-[#1A1A1C]/20",
      cards: [
        { id: "c-3", title: "Definir Mix Semanal", desc: "Decidir el balance: 4 Reels, 2 Carruseles, 1 Post largo LinkedIn.", tag: "Plan Semanal" },
        { id: "c-4", title: "Selección de CTAs", desc: "Optimizar el botón hacia la agenda de ventas de alto valor.", tag: "Conversión" }
      ]
    },
    {
      title: "Ideas (Cami)",
      icon: "💡",
      color: "border-[#222224] bg-[#1A1A1C]/20",
      cards: [
        { id: "c-5", title: "30+ Ángulos de Domótica", desc: "Lluvia de ideas basada en ahorro energético en el hogar.", tag: "Lluvia de Ideas" },
        { id: "c-6", title: "Elegir Top 7 Ganadores", desc: "Filtrar los 7 mejores conceptos para pasar to Lauti.", tag: "Curaduría" }
      ]
    },
    {
      title: "Guiones (Lauti)",
      icon: "✍",
      color: "border-[#222224] bg-[#1A1A1C]/20",
      cards: [
        { id: "c-7", title: "Copys PAS Domótica", desc: "Escribir copys con dolor y agitación sobre facturas de luz.", tag: "Redacción Copy" },
        { id: "c-8", title: "Script de Video Hook", desc: "Guiones para reels con gancho de curiosidad extrema en segundo 2.", tag: "Guión de Video" }
      ]
    },
    {
      title: "Publicación (Facu)",
      icon: "📅",
      color: "border-[#222224] bg-[#1A1A1C]/20",
      cards: [
        { id: "c-9", title: "Agendar mes de Junio", desc: "Subir al programador las 30 publicaciones automatizadas.", tag: "Agenda" },
        { id: "c-10", title: "Auditar Embudos DM", desc: "Chequear que la palabra clave INFO dispare correctamente.", tag: "DM Funnel" }
      ]
    }
  ];

  const handleCompileSofiReport = () => {
    setCompiling(true);
    setCompiledReport(null);
    setTimeout(() => {
      setCompiling(false);
      setCompiledReport(`REPORTE DE INTELIGENCIA DE VENTAS - UNIFICADO POR SOFI
Preparado: 30 de Mayo de 2026 • Base analítica: Ventas NUEVAS de alto valor (>$2.000)

1. SÍNTESIS DEL AUDITOR DE MÉTRICAS (Mateo):
- Se detectó fatiga publicitaria en la campaña de Meta Ads Feed. El CTR promedio cayó a 1.2% en anuncios con ganchos tradicionales.
- Se recomienda pausar (MATAR) el gancho de advertencia directa y duplicar el presupuesto en el gancho de curiosidad ("Por esto tu competencia...").
- Los carruseles interactivos en Instagram registran un engagement récord del 5.2%.

2. BLUEPRINT DE ESTRATEGIA (Santi):
- Mix Semanal Recomendado: 4 Reels rápidos (Hooks de Lauti) y 2 Carruseles de valor (LinkedIn/IG) enfocados en eficiencia.
- CTA Recomendado: Cambiar "Comprar ahora" por "Más información" para nutrir primero en DM mediante el embudo de Facu.

3. HOOKS SELECCIONADOS (Cami & Lauti):
- Gancho Ganador #1: "¿Por qué el 99% de los anuncios fallan en el segundo 3? Por esto..."
- Gancho Ganador #2: "El truco de un solo clic para generar 50 creativos de publicidad..."

4. AGENDA Y AUTOMATIZACIÓN (Facu):
- Se programaron con éxito las 30 publicaciones del calendario mensual.
- La automatización de mensajes directos para el disparador 'INFO' está activa y registrando una tasa de conversión del 28.4%.

5. ACCIONES RECOMENDADAS PARA EL DIRECTOR:
- Descargar el paquete de 50 creativos en formato PNG de alta resolución.
- Sincronizar el plan mensual de 30 días con Google Calendar.
- Mantener la automatización activa las 24 horas del día.`);
    }, 2000);
  };

  return (
    <div className="space-y-6" id="team-pipeline-root">
      
      {/* Kanban and flow pipeline section */}
      <div className="bg-[#141416] border border-[#222224] rounded-2xl p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222224] pb-4">
          <div className="flex items-center gap-3">
            <PixelAvatar agentId="sofi" size="sm" />
            <div>
              <h2 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
                Tablero de Control Pipeline Semanal (Sofi)
              </h2>
              <p className="text-xs text-[#88888E] mt-0.5">
                Supervisa el flujo del equipo y asegura que el contenido pase por todas las etapas de validación a tiempo.
              </p>
            </div>
          </div>

          <button
            onClick={handleCompileSofiReport}
            disabled={compiling}
            className="bg-[#D1FF26] hover:bg-[#c2ed1c] disabled:bg-[#1A1A1C] text-black font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition tracking-wider uppercase"
            id="btn-compile-report"
          >
            {compiling ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Compilando Reportes del Equipo...</span>
              </>
            ) : (
              <>
                <Award className="w-4 h-4 text-black" />
                <span>Consolidar Informe Inteligente de Ventas</span>
              </>
            )}
          </button>
        </div>

        {/* Pipeline horizontal columns list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
          {columns.map((col, idx) => (
            <div key={idx} className={`border rounded-2xl p-3 flex flex-col h-[340px] justify-between ${col.color}`}>
              <div>
                <div className="flex items-center justify-between border-b border-[#222224]/80 pb-2 mb-3">
                  <span className="text-xs font-semibold text-[#88888E] font-mono flex items-center gap-1.5">
                    <span>{col.icon}</span> {col.title}
                  </span>
                  <span className="text-[10px] bg-[#0A0A0B] px-1.5 py-0.5 rounded text-[#66666E] font-mono">
                    {col.cards.length}
                  </span>
                </div>

                <div className="space-y-2 overflow-y-auto max-h-[240px] pr-1 custom-scrollbar">
                  {col.cards.map((card) => (
                    <div key={card.id} className="bg-[#0A0A0B] p-2.5 rounded-lg border border-[#222224] hover:border-[#2A2A2C] transition space-y-1.5">
                      <span className="text-[8px] bg-[#1A1A1C] border border-[#222224]/80 px-1.5 py-0.5 rounded text-[#88888E] font-mono">
                        {card.tag}
                      </span>
                      <h4 className="text-xs font-semibold text-[#E5E5E7] leading-snug">{card.title}</h4>
                      <p className="text-[10px] text-[#66666E] leading-normal">{card.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column connector indicator at bottom */}
              {idx < 4 && (
                <div className="hidden lg:flex items-center justify-center text-[#66666E] font-bold text-xs pt-1 border-t border-[#222224]/80">
                  <span>Paso Siguiente</span>
                  <ChevronRight className="w-4 h-4 text-[#66666E] shrink-0" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Compiled Report presentation card */}
      {compiledReport && (
        <div className="bg-[#141416] border border-[#222224] rounded-2xl p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-[#222224] pb-3">
            <h3 className="text-xs font-semibold text-white uppercase tracking-widest font-mono flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#D1FF26]" /> REPORTE EJECUTIVO INTEGRADO DE VENTAS
            </h3>
            <button
              onClick={() => {
                navigator.clipboard.writeText(compiledReport);
                alert("¡Informe copiado al portapapeles con éxito!");
              }}
              className="text-[10px] bg-[#0A0A0B] text-[#88888E] hover:text-[#D1FF26] px-3 py-1.5 rounded-full border border-[#222224] font-mono transition"
            >
              Copiar Informe Completo
            </button>
          </div>

          <pre className="bg-[#0A0A0B] border border-[#222224] rounded-xl p-5 font-mono text-[11px] text-[#88888E] leading-relaxed whitespace-pre-wrap select-text h-[350px] overflow-y-auto custom-scrollbar">
            {compiledReport}
          </pre>
        </div>
      )}
    </div>
  );
};
