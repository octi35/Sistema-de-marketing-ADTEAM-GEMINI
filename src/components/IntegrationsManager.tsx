import React, { useState } from "react";
import { Cloud, Folder, FileText, CheckCircle, RefreshCw, Calendar, Mail, FileCheck, ArrowUpRight, ArrowRight, ShieldAlert } from "lucide-react";

export const IntegrationsManager: React.FC = () => {
  // Drive sync state
  const [syncingDrive, setSyncingDrive] = useState(false);
  const [driveSynced, setDriveSynced] = useState(false);
  const [driveFiles, setDriveFiles] = useState([
    { name: "Sofi_Intelligence_Report_Jun2026.pdf", type: "PDF", size: "2.4 MB", date: "2026-06-23" },
    { name: "Creative_Bundle_Meta_50x.zip", type: "ZIP", size: "48.1 MB", date: "2026-06-23" },
    { name: "Weekly_Carousel_Instagram_Topic1.pdf", type: "PDF", size: "5.8 MB", date: "2026-06-22" }
  ]);

  // Mail digest state
  const [recipient, setRecipient] = useState("octifaki@gmail.com");
  const [sendingMail, setSendingMail] = useState(false);
  const [mailSent, setMailSent] = useState(false);

  // Calendar OAuth setup
  const [syncingCal, setSyncingCal] = useState(false);
  const [calSynced, setCalSynced] = useState(false);

  // Trigger Google Drive Backup Sync
  const handleDriveSync = () => {
    setSyncingDrive(true);
    setTimeout(() => {
      setSyncingDrive(false);
      setDriveSynced(true);
      // Append a new file representing the latest action
      setDriveFiles((prev) => [
        { name: "Campaign_AdTeam_Creative_Backup_Live.zip", type: "ZIP", size: "12.4 MB", date: "Hoy" },
        ...prev
      ]);
    }, 1800);
  };

  // Trigger simulated email digest dispatch
  const handleSendEmailDigest = (e: React.FormEvent) => {
    e.preventDefault();
    setSendingMail(true);
    setTimeout(() => {
      setSendingMail(false);
      setMailSent(true);
      setTimeout(() => setMailSent(false), 5000);
    }, 1500);
  };

  // Trigger Google Calendar link
  const handleCalendarLinkSync = () => {
    setSyncingCal(true);
    setTimeout(() => {
      setSyncingCal(false);
      setCalSynced(true);
    }, 1600);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="integrations-manager-root">
      
      {/* Google Drive Integration Panel (takes 6 cols) */}
      <div className="lg:col-span-6 bg-[#141416] border border-[#222224] rounded-2xl p-5 flex flex-col justify-between h-[520px]">
        <div>
          <div className="flex items-center justify-between border-b border-[#222224] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded bg-[#D1FF26]/10 text-[#D1FF26] border border-[#D1FF26]/20">
                💾
              </span>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                Reserva de Activos en Google Drive
              </h3>
            </div>
            <span className="text-[10px] font-mono bg-[#D1FF26]/10 border border-[#D1FF26]/20 text-[#D1FF26] px-2 py-0.5 rounded">
              Drive API Connected
            </span>
          </div>

          <p className="text-xs text-[#88888E] leading-relaxed mb-4">
            Resguarda automáticamente tus creativos de alta resolución (PNG) y reportes de analítica directo en tu carpeta corporativa de Google Drive.
          </p>

          {/* Drive file structure list */}
          <div className="bg-[#0A0A0B] rounded-xl p-3 border border-[#222224] space-y-2 h-[240px] overflow-y-auto custom-scrollbar">
            <div className="text-[10px] font-mono text-[#66666E] uppercase tracking-widest pb-1 border-b border-[#222224] flex items-center gap-1.5">
              <Folder className="w-3.5 h-3.5 text-[#66666E]" /> /Mi Unidad/AdTeam_AI_Marketing_Vault/
            </div>
            
            {driveFiles.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded bg-[#1A1A1C]/50 border border-[#222224]/80 hover:bg-[#1A1A1C] transition text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className="w-4 h-4 text-[#88888E] shrink-0" />
                  <span className="text-[#E5E5E7] font-mono truncate">{file.name}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0 text-[10px] font-mono text-[#66666E]">
                  <span>{file.size}</span>
                  <span>•</span>
                  <span>{file.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sync actions */}
        <div className="border-t border-[#222224] pt-4 mt-4">
          <button
            onClick={handleDriveSync}
            disabled={syncingDrive}
            className="w-full bg-[#D1FF26] hover:bg-[#c2ed1c] disabled:bg-[#1A1A1C] text-black font-bold text-xs py-3 rounded-full flex items-center justify-center gap-2 transition"
            id="btn-drive-backup-sync"
          >
            {syncingDrive ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-black" />
                <span>Subiendo imágenes PNG a Google Drive...</span>
              </>
            ) : driveSynced ? (
              <>
                <CheckCircle className="w-4 h-4 text-black" />
                <span>Activos Guardados en Google Drive (OK)</span>
              </>
            ) : (
              <>
                <span>Sincronizar y Respaldar en Google Drive</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Google Calendar & Mail integration form (takes 6 cols) */}
      <div className="lg:col-span-6 space-y-6">
        
        {/* Mail dispatch panel */}
        <div className="bg-[#141416] border border-[#222224] rounded-2xl p-5 flex flex-col justify-between h-[250px]">
          <div>
            <div className="flex items-center justify-between border-b border-[#222224] pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded bg-[#D1FF26]/10 text-[#D1FF26] border border-[#D1FF26]/20">
                  ✉
                </span>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                  Despachador de Resúmenes por Correo
                </h3>
              </div>
            </div>

            <p className="text-xs text-[#88888E] leading-relaxed mb-3">
              Envía un informe de inteligencia de ventas semanal unificado (por Sofi) directamente a tu correo electrónico.
            </p>

            <form onSubmit={handleSendEmailDigest} className="flex gap-2">
              <input
                type="email"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                required
                className="bg-[#1A1A1C] border border-[#2A2A2C] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D1FF26] flex-1 font-mono"
                placeholder="tu@email.com"
              />
              <button
                type="submit"
                disabled={sendingMail || mailSent}
                className="bg-[#D1FF26] hover:bg-[#c2ed1c] disabled:bg-[#1A1A1C] text-black font-bold text-xs px-5 py-2.5 rounded-full shrink-0 transition uppercase tracking-wider"
                id="btn-send-mail-form"
              >
                {sendingMail ? "Enviando..." : mailSent ? "¡Enviado!" : "Enviar"}
              </button>
            </form>
          </div>

          {mailSent && (
            <div className="bg-[#D1FF26]/10 border border-[#D1FF26]/20 text-[#D1FF26] rounded-lg p-2.5 text-[11px] flex items-center gap-2 mt-2">
              <span>✔</span>
              <p>
                Informe con ganchos, copys y calendarios despachado con éxito a <strong className="font-mono">{recipient}</strong>.
              </p>
            </div>
          )}
        </div>

        {/* Google Calendar Link panel */}
        <div className="bg-[#141416] border border-[#222224] rounded-2xl p-5 flex flex-col justify-between h-[244px]">
          <div>
            <div className="flex items-center justify-between border-b border-[#222224] pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded bg-[#D1FF26]/10 text-[#D1FF26] border border-[#D1FF26]/20">
                  📅
                </span>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                  Google Calendar Automático
                </h3>
              </div>
            </div>

            <p className="text-xs text-[#88888E] leading-relaxed mb-4">
              Sincroniza tus horas de publicación recomendadas y copies directamente en tu agenda personal de Google Calendar para alertas automáticas en tu celular.
            </p>
          </div>

          <button
            onClick={handleCalendarLinkSync}
            disabled={syncingCal}
            className={`w-full font-bold text-xs py-3 rounded-full flex items-center justify-center gap-2 transition ${
              calSynced
                ? "bg-[#D1FF26]/10 border border-[#D1FF26]/20 text-[#D1FF26]"
                : "bg-[#D1FF26] hover:bg-[#c2ed1c] disabled:bg-[#1A1A1C] text-black"
            }`}
            id="btn-calendar-sync-direct"
          >
            {syncingCal ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-black" />
                <span>Estableciendo conexión segura OAuth...</span>
              </>
            ) : calSynced ? (
              <>
                <CheckCircle className="w-4 h-4 text-[#D1FF26]" />
                <span>Calendario Google Sincronizado</span>
              </>
            ) : (
              <>
                <span>Sincronizar Eventos con Google Calendar</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
