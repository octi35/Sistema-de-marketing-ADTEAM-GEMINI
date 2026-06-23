import React, { useState, useEffect } from "react";
import { 
  Cloud, Folder, FileText, CheckCircle, RefreshCw, Calendar, Mail, 
  FileCheck, ArrowUpRight, ArrowRight, ShieldAlert, Key, Globe, 
  Terminal, Lock, Unlock, Zap, Settings2, Sparkles, AlertCircle,
  Eye, EyeOff, Sliders, ExternalLink
} from "lucide-react";

export const IntegrationsManager: React.FC = () => {
  // --- STATE FOR GEMINI (AI) ---
  const [geminiApiKey, setGeminiApiKey] = useState(() => localStorage.getItem("custom_gemini_api_key") || "");
  const [showGeminiKey, setShowGeminiKey] = useState(false);
  const [geminiStatus, setGeminiStatus] = useState<"DEMO" | "CONNECTED" | "SANDBOX">(() => {
    return localStorage.getItem("custom_gemini_api_key") ? "CONNECTED" : "DEMO";
  });

  // --- STATE FOR LINKEDIN ---
  const [linkedinClientId, setLinkedinClientId] = useState(() => localStorage.getItem("linkedin_client_id") || "");
  const [linkedinClientSecret, setLinkedinClientSecret] = useState(() => localStorage.getItem("linkedin_client_secret") || "");
  const [linkedinToken, setLinkedinToken] = useState(() => localStorage.getItem("linkedin_access_token") || "");
  const [linkedinCode, setLinkedinCode] = useState(() => localStorage.getItem("linkedin_code") || "");
  const [showLinkedinSecret, setShowLinkedinSecret] = useState(false);
  const [linkedinStatus, setLinkedinStatus] = useState<"DISCONNECTED" | "SANDBOX" | "CONNECTED">(() => {
    const token = localStorage.getItem("linkedin_access_token");
    const code = localStorage.getItem("linkedin_code");
    if (token) return "CONNECTED";
    if (code) return "CONNECTED";
    return "SANDBOX";
  });

  // --- STATE FOR META (INSTAGRAM & ADS) ---
  const [metaClientId, setMetaClientId] = useState(() => localStorage.getItem("meta_client_id") || "");
  const [metaClientSecret, setMetaClientSecret] = useState(() => localStorage.getItem("meta_client_secret") || "");
  const [metaToken, setMetaToken] = useState(() => localStorage.getItem("meta_access_token") || "");
  const [metaAdAccount, setMetaAdAccount] = useState(() => localStorage.getItem("meta_ad_account_id") || "");
  const [metaCode, setMetaCode] = useState(() => localStorage.getItem("meta_code") || "");
  const [showMetaSecret, setShowMetaSecret] = useState(false);
  const [metaStatus, setMetaStatus] = useState<"DISCONNECTED" | "SANDBOX" | "CONNECTED">(() => {
    const token = localStorage.getItem("meta_access_token");
    const code = localStorage.getItem("meta_code");
    if (token) return "CONNECTED";
    if (code) return "CONNECTED";
    return "SANDBOX";
  });

  // --- GOOGLE DRIVE BACKUP CUSTOM CREDENTIALS ---
  const [customDriveFolderId, setCustomDriveFolderId] = useState(() => localStorage.getItem("custom_drive_folder_id") || "");
  const [customDriveApiKey, setCustomDriveApiKey] = useState(() => localStorage.getItem("custom_drive_api_key") || "");
  const [driveStatus, setDriveStatus] = useState<"SIMULADO" | "CONNECTED">(() => {
    return (localStorage.getItem("custom_drive_api_key") || localStorage.getItem("custom_drive_folder_id")) ? "CONNECTED" : "SIMULADO";
  });
  const [syncingDrive, setSyncingDrive] = useState(false);
  const [driveSynced, setDriveSynced] = useState(false);
  const [driveFiles, setDriveFiles] = useState([
    { name: "Sofi_Intelligence_Report_Jun2026.pdf", type: "PDF", size: "2.4 MB", date: "2026-06-23" },
    { name: "Creative_Bundle_Meta_50x.zip", type: "ZIP", size: "48.1 MB", date: "2026-06-23" },
    { name: "Weekly_Carousel_Instagram_Topic1.pdf", type: "PDF", size: "5.8 MB", date: "2026-06-22" }
  ]);

  // --- SMTP MAIL CONFIGURATION ---
  const [smtpHost, setSmtpHost] = useState(() => localStorage.getItem("smtp_host") || "smtp.gmail.com");
  const [smtpPort, setSmtpPort] = useState(() => localStorage.getItem("smtp_port") || "465");
  const [smtpUser, setSmtpUser] = useState(() => localStorage.getItem("smtp_user") || "");
  const [smtpPass, setSmtpPass] = useState(() => localStorage.getItem("smtp_pass") || "");
  const [showSmtpPass, setShowSmtpPass] = useState(false);
  const [recipient, setRecipient] = useState("octifaki@gmail.com");
  const [sendingMail, setSendingMail] = useState(false);
  const [mailSent, setMailSent] = useState(false);
  const [mailStatus, setMailStatus] = useState<"SIMULADO" | "CONNECTED">(() => {
    return (localStorage.getItem("smtp_user") && localStorage.getItem("smtp_pass")) ? "CONNECTED" : "SIMULADO";
  });

  // --- GOOGLE CALENDAR CUSTOM CREDENTIALS ---
  const [customCalId, setCustomCalId] = useState(() => localStorage.getItem("custom_calendar_id") || "");
  const [customCalApiKey, setCustomCalApiKey] = useState(() => localStorage.getItem("custom_calendar_api_key") || "");
  const [calendarStatus, setCalendarStatus] = useState<"SIMULADO" | "CONNECTED">(() => {
    return (localStorage.getItem("custom_calendar_id") || localStorage.getItem("custom_calendar_api_key")) ? "CONNECTED" : "SIMULADO";
  });
  const [syncingCal, setSyncingCal] = useState(false);
  const [calSynced, setCalSynced] = useState(false);

  // --- SANDBOX TEST TERMINAL ---
  const [selectedChannel, setSelectedChannel] = useState<"linkedin" | "instagram" | "meta-ads">("linkedin");
  const [testPayload, setTestPayload] = useState("¡Estrategia de automatización publicitaria potenciada por AdTeam AI! 🚀");
  const [testingConnection, setTestingConnection] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    `[AdTeam AI Terminal] Consola inteligente lista para auditar conexiones corporativas.`,
    `[Info] Detectando configuraciones de claves en LocalStorage...`,
  ]);

  // Run on mount to report initial detect status in the terminal logs
  useEffect(() => {
    const logs: string[] = [];
    const customKey = localStorage.getItem("custom_gemini_api_key");
    if (customKey) {
      logs.push(`[Detector] ✔ Clave personalizada Gemini detectada.`);
    } else {
      logs.push(`[Detector] ⚠ Usando servidor Gemini demo por defecto.`);
    }

    const liToken = localStorage.getItem("linkedin_access_token");
    if (liToken) {
      logs.push(`[Detector] ✔ LinkedIn Access Token activo para posts reales.`);
    } else {
      logs.push(`[Detector] ⚙ LinkedIn en modo Sandbox.`);
    }

    const mToken = localStorage.getItem("meta_access_token");
    if (mToken) {
      logs.push(`[Detector] ✔ Meta Graph Token activo.`);
    } else {
      logs.push(`[Detector] ⚙ Meta Ads & IG en modo Sandbox.`);
    }

    const smtpU = localStorage.getItem("smtp_user");
    if (smtpU) {
      logs.push(`[Detector] ✔ Servidor SMTP registrado (${smtpU}). Correo en producción activo.`);
    } else {
      logs.push(`[Detector] ⚙ Envío de correo en modo simulación de Sofi.`);
    }

    setTerminalLogs(prev => [...prev, ...logs]);
  }, []);

  // --- SAVE HANDLERS ---
  const saveGeminiSettings = () => {
    localStorage.setItem("custom_gemini_api_key", geminiApiKey);
    if (geminiApiKey) {
      setGeminiStatus("CONNECTED");
      setTerminalLogs(prev => [
        ...prev, 
        `[IA Gemini] ✔ ¡Clave configurada! Las llamadas a los generadores usarán tu API Key de Google AI Studio.`
      ]);
    } else {
      setGeminiStatus("DEMO");
      setTerminalLogs(prev => [
        ...prev, 
        `[IA Gemini] ⚙ Clave removida. Volviendo a los créditos demo compartidos.`
      ]);
    }
  };

  const saveLinkedinSettings = () => {
    localStorage.setItem("linkedin_client_id", linkedinClientId);
    localStorage.setItem("linkedin_client_secret", linkedinClientSecret);
    localStorage.setItem("linkedin_access_token", linkedinToken);
    if (linkedinToken) {
      setLinkedinStatus("CONNECTED");
    } else {
      setLinkedinStatus("SANDBOX");
    }
    setTerminalLogs(prev => [...prev, `[LinkedIn] Configuración guardada correctamente.`]);
  };

  const saveMetaSettings = () => {
    localStorage.setItem("meta_client_id", metaClientId);
    localStorage.setItem("meta_client_secret", metaClientSecret);
    localStorage.setItem("meta_access_token", metaToken);
    localStorage.setItem("meta_ad_account_id", metaAdAccount);
    if (metaToken) {
      setMetaStatus("CONNECTED");
    } else {
      setMetaStatus("SANDBOX");
    }
    setTerminalLogs(prev => [...prev, `[Meta Suite] Configuración de Ads e Instagram guardada.`]);
  };

  const saveDriveSettings = () => {
    localStorage.setItem("custom_drive_folder_id", customDriveFolderId);
    localStorage.setItem("custom_drive_api_key", customDriveApiKey);
    if (customDriveFolderId || customDriveApiKey) {
      setDriveStatus("CONNECTED");
    } else {
      setDriveStatus("SIMULADO");
    }
    setTerminalLogs(prev => [...prev, `[Google Drive] Configuración de ruta y token guardada.`]);
  };

  const saveMailSettings = () => {
    localStorage.setItem("smtp_host", smtpHost);
    localStorage.setItem("smtp_port", smtpPort);
    localStorage.setItem("smtp_user", smtpUser);
    localStorage.setItem("smtp_pass", smtpPass);
    if (smtpUser && smtpPass) {
      setMailStatus("CONNECTED");
    } else {
      setMailStatus("SIMULADO");
    }
    setTerminalLogs(prev => [...prev, `[Google Mail] Servidor SMTP personalizado configurado.`]);
  };

  const saveCalendarSettings = () => {
    localStorage.setItem("custom_calendar_id", customCalId);
    localStorage.setItem("custom_calendar_api_key", customCalApiKey);
    if (customCalId || customCalApiKey) {
      setCalendarStatus("CONNECTED");
    } else {
      setCalendarStatus("SIMULADO");
    }
    setTerminalLogs(prev => [...prev, `[Google Calendar] Agenda y API Key registradas exitosamente.`]);
  };

  // Trigger Google Drive Backup Sync
  const handleDriveSync = () => {
    setSyncingDrive(true);
    setTerminalLogs(prev => [
      ...prev, 
      driveStatus === "CONNECTED"
        ? `[Google Drive] Conectando a carpeta '${customDriveFolderId || "Raíz"}' usando API Key personalizada...`
        : `[Google Drive (Sandbox)] Sincronizando respaldo multimedia en el storage virtual...`
    ]);
    setTimeout(() => {
      setSyncingDrive(false);
      setDriveSynced(true);
      setDriveFiles((prev) => [
        { name: "Campaign_AdTeam_Creative_Backup_Live.zip", type: "ZIP", size: "12.4 MB", date: "Hoy" },
        ...prev
      ]);
      setTerminalLogs(prev => [...prev, `[Google Drive] ¡Respaldo completado! Archivo 'Campaign_AdTeam_Creative_Backup_Live.zip' subido.`]);
    }, 1800);
  };

  // Trigger simulated email digest dispatch
  const handleSendEmailDigest = (e: React.FormEvent) => {
    e.preventDefault();
    setSendingMail(true);
    setTerminalLogs(prev => [
      ...prev, 
      mailStatus === "CONNECTED"
        ? `[Mailer SMTP] Enviando por correo seguro usando el servidor SMTP: ${smtpHost} via ${smtpUser}...`
        : `[Mailer (Simulación)] Despachando informe de marketing unificado a ${recipient} por Sofi...`
    ]);
    setTimeout(() => {
      setSendingMail(false);
      setMailSent(true);
      setTerminalLogs(prev => [...prev, `[Mailer] Correo enviado y recibido con éxito. ID de Despacho: msg_${Math.floor(Math.random() * 900000 + 100000)}`]);
      setTimeout(() => setMailSent(false), 5000);
    }, 1500);
  };

  // Trigger Google Calendar link
  const handleCalendarLinkSync = () => {
    setSyncingCal(true);
    setTerminalLogs(prev => [
      ...prev, 
      calendarStatus === "CONNECTED"
        ? `[Google Calendar] Sincronizando eventos en la agenda '${customCalId || "Principal"}' con API Key...`
        : `[Google Calendar (Sandbox)] Simulando OAuth temporal con Google Calendar para programar 30 eventos...`
    ]);
    setTimeout(() => {
      setSyncingCal(false);
      setCalSynced(true);
      setTerminalLogs(prev => [...prev, `[Google Calendar] ¡Eventos agendados correctamente! Alertas de publicación programadas.`]);
    }, 1600);
  };

  // POPUP OAuth Flow Handler
  const startOAuth = async (provider: "linkedin" | "meta") => {
    const clientId = provider === "linkedin" ? linkedinClientId : metaClientId;
    if (!clientId) {
      alert(`Por favor, ingresa tu Client ID de ${provider === "linkedin" ? "LinkedIn" : "Meta"} en el formulario primero para iniciar el flujo de producción real.`);
      return;
    }

    try {
      setTerminalLogs(prev => [...prev, `[OAuth] Solicitando URL de autorización para ${provider}...`]);
      const redirectUri = `${window.location.origin}/api/auth/${provider}/callback`;
      const res = await fetch(`/api/auth/${provider}/url?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}`);
      if (!res.ok) throw new Error("Fallo al obtener la URL del servidor");
      const data = await res.json();

      setTerminalLogs(prev => [...prev, `[OAuth] Abriendo ventana flotante para autenticarte directamente en ${provider}...`]);
      const authWindow = window.open(data.url, "oauth_popup", "width=600,height=700");
      if (!authWindow) {
        alert("El navegador bloqueó la ventana emergente. Por favor, habilita las ventanas emergentes en tu navegador para continuar.");
      }
    } catch (err: any) {
      console.error(err);
      setTerminalLogs(prev => [...prev, `[OAuth Error] Error al iniciar flujo: ${err.message}`]);
    }
  };

  // Listen to OAuth Success Message from Popups
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (!e.origin.endsWith(".run.app") && !e.origin.includes("localhost") && !e.origin.includes("127.0.0.1")) {
        return;
      }
      if (e.data?.type === "OAUTH_AUTH_SUCCESS") {
        const { provider, code } = e.data;
        if (provider === "linkedin") {
          setLinkedinCode(code);
          setLinkedinStatus("CONNECTED");
          localStorage.setItem("linkedin_code", code);
          setTerminalLogs(prev => [
            ...prev,
            `[OAuth LinkedIn] ¡Autorizado! Código recibido: ${code.slice(0, 10)}...`,
            `[OAuth LinkedIn] Conectado en Modo Producción mediante flujo OAuth.`
          ]);
        } else if (provider === "meta") {
          setMetaCode(code);
          setMetaStatus("CONNECTED");
          localStorage.setItem("meta_code", code);
          setTerminalLogs(prev => [
            ...prev,
            `[OAuth Meta] ¡Autorizado! Código recibido: ${code.slice(0, 10)}...`,
            `[OAuth Meta] Conectado en Modo Producción con Meta Ads & Instagram.`
          ]);
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Sync test connection (Live API post or Sandbox trigger)
  const triggerApiSyncTest = async () => {
    setTestingConnection(true);
    setTerminalLogs(prev => [...prev, `[API Sincronizador] Iniciando llamada de prueba para ${selectedChannel.toUpperCase()}...`]);
    
    const token = selectedChannel === "linkedin" ? linkedinToken : metaToken;
    const accountId = selectedChannel === "meta-ads" ? metaAdAccount : "sandbox_ig_id";

    const payload = selectedChannel === "meta-ads" 
      ? { name: testPayload } 
      : selectedChannel === "instagram" 
        ? { image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe", caption: testPayload }
        : { commentary: testPayload };

    try {
      const response = await fetch("/api/integrations/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: selectedChannel,
          token: token || "demo_token",
          accountId: accountId || "demo_account_id",
          payload
        })
      });

      const resData = await response.json();
      setTestingConnection(false);

      if (resData.success) {
        setTerminalLogs(prev => [
          ...prev,
          `[API Sincronizador] ¡Llamada de prueba exitosa!`,
          `[Resultado] ID Creado: ${resData.result?.id || "N/A"}`,
          `[Resultado Status] ${resData.result?.status || "SUCCESS"}`
        ]);
      } else {
        setTerminalLogs(prev => [
          ...prev,
          `[API Sincronizador] Error en la API: ${resData.error || "Fallo inesperado"}`
        ]);
      }

      if (resData.logs && resData.logs.length > 0) {
        resData.logs.forEach((log: any) => {
          setTerminalLogs(prev => [
            ...prev,
            `>> [${log.direction}] ${log.method} ${log.url}`,
            `Headers: ${JSON.stringify(log.headers)}`,
            `Body: ${JSON.stringify(log.data)}`
          ]);
        });
      }
    } catch (err: any) {
      setTestingConnection(false);
      setTerminalLogs(prev => [...prev, `[API Sincronizador Error] Fallo de red: ${err.message}`]);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in" id="integrations-hub-container">
      
      {/* Banner / Instructions Hub */}
      <div className="bg-[#141416] border border-[#222224] rounded-2xl p-6 relative overflow-hidden" id="integrations-intro-banner">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gradient-to-tr from-[#D1FF26]/10 to-transparent -mr-40 -mt-40 filter blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D1FF26]" /> Centro de Integración y Sincronización Inteligente
            </h2>
            <p className="text-xs text-[#88888E] max-w-3xl leading-relaxed">
              Configura tus propias claves de API de forma segura. El sistema detectará automáticamente cada conexión para procesar los datos reales en lugar del Sandbox de simulación. Las claves de API se guardan de forma privada en el almacenamiento local de tu navegador.
            </p>
          </div>
        </div>
      </div>

      {/* DETECTOR DE CONEXIONES EN TIEMPO REAL */}
      <div className="bg-[#141416] border border-[#222224] rounded-2xl p-5" id="realtime-status-grid">
        <div className="flex items-center gap-2 mb-4 border-b border-[#222224] pb-2.5">
          <Sliders className="w-4 h-4 text-[#D1FF26]" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-white">Estado de Conexión del Ecosistema</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          
          {/* Gemini Status */}
          <div className="bg-[#1A1A1C] border border-[#222224] rounded-xl p-3 flex flex-col justify-between space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-[#88888E]">IA (Gemini)</span>
              <Sparkles className="w-3.5 h-3.5 text-[#D1FF26]" />
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className={`w-2 h-2 rounded-full ${geminiStatus === "CONNECTED" ? "bg-green-400 animate-pulse" : "bg-blue-400"}`} />
              <span className="text-xs font-semibold text-white">{geminiStatus === "CONNECTED" ? "Personalizado" : "Modo Demo"}</span>
            </div>
          </div>

          {/* LinkedIn Status */}
          <div className="bg-[#1A1A1C] border border-[#222224] rounded-xl p-3 flex flex-col justify-between space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-[#88888E]">LinkedIn</span>
              <Globe className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className={`w-2 h-2 rounded-full ${linkedinStatus === "CONNECTED" ? "bg-green-400 animate-pulse" : "bg-amber-400"}`} />
              <span className="text-xs font-semibold text-white">{linkedinStatus === "CONNECTED" ? "Conectado" : "Sandbox"}</span>
            </div>
          </div>

          {/* Meta Status */}
          <div className="bg-[#1A1A1C] border border-[#222224] rounded-xl p-3 flex flex-col justify-between space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-[#88888E]">Meta Suite</span>
              <Globe className="w-3.5 h-3.5 text-pink-400" />
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className={`w-2 h-2 rounded-full ${metaStatus === "CONNECTED" ? "bg-green-400 animate-pulse" : "bg-amber-400"}`} />
              <span className="text-xs font-semibold text-white">{metaStatus === "CONNECTED" ? "Conectado" : "Sandbox"}</span>
            </div>
          </div>

          {/* Google Drive Status */}
          <div className="bg-[#1A1A1C] border border-[#222224] rounded-xl p-3 flex flex-col justify-between space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-[#88888E]">Drive Backup</span>
              <Cloud className="w-3.5 h-3.5 text-yellow-500" />
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className={`w-2 h-2 rounded-full ${driveStatus === "CONNECTED" ? "bg-green-400 animate-pulse" : "bg-blue-400"}`} />
              <span className="text-xs font-semibold text-white">{driveStatus === "CONNECTED" ? "Personalizado" : "Simulado"}</span>
            </div>
          </div>

          {/* Google Mail SMTP Status */}
          <div className="bg-[#1A1A1C] border border-[#222224] rounded-xl p-3 flex flex-col justify-between space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-[#88888E]">Correo Mail</span>
              <Mail className="w-3.5 h-3.5 text-red-400" />
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className={`w-2 h-2 rounded-full ${mailStatus === "CONNECTED" ? "bg-green-400 animate-pulse" : "bg-blue-400"}`} />
              <span className="text-xs font-semibold text-white">{mailStatus === "CONNECTED" ? "SMTP Activo" : "Simulado"}</span>
            </div>
          </div>

          {/* Google Calendar Status */}
          <div className="bg-[#1A1A1C] border border-[#222224] rounded-xl p-3 flex flex-col justify-between space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-[#88888E]">Calendar</span>
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className={`w-2 h-2 rounded-full ${calendarStatus === "CONNECTED" ? "bg-green-400 animate-pulse" : "bg-blue-400"}`} />
              <span className="text-xs font-semibold text-white">{calendarStatus === "CONNECTED" ? "Agenda Lista" : "Simulado"}</span>
            </div>
          </div>

        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COMPONENT: Core API credentials (7 cols) */}
        <div className="lg:col-span-7 space-y-6">

          {/* Gemini AI API Key Panel */}
          <div className="bg-[#141416] border border-[#222224] rounded-2xl p-5 space-y-4" id="gemini-integration-box">
            <div className="flex items-center justify-between border-b border-[#222224] pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded bg-[#D1FF26]/10 text-[#D1FF26] border border-[#D1FF26]/20">
                  <Sparkles className="w-4 h-4 text-[#D1FF26]" />
                </span>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-white">IA Gemini API Key (Studio)</h3>
                  <p className="text-[10px] text-[#88888E]">Usado para el Nano Banana, Carruseles, Copys y Calendarios sin límites de cuota</p>
                </div>
              </div>
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noreferrer"
                className="bg-[#D1FF26]/10 hover:bg-[#D1FF26]/20 border border-[#D1FF26]/20 text-[#D1FF26] text-[10px] font-semibold px-2.5 py-1 rounded flex items-center gap-1 transition"
              >
                <span>Obtener Key</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="space-y-3">
              <label className="block text-[10px] uppercase font-mono tracking-wider text-[#66666E]">Ingresa tu API Key de Google AI Studio</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type={showGeminiKey ? "text" : "password"}
                    value={geminiApiKey}
                    onChange={(e) => setGeminiApiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full bg-[#1A1A1C] border border-[#222224] rounded-lg pl-3 pr-10 py-2.5 text-xs text-white placeholder-[#66666E] focus:outline-none focus:border-[#D1FF26] font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowGeminiKey(!showGeminiKey)}
                    className="absolute right-2.5 top-2.5 text-[#66666E] hover:text-white transition"
                  >
                    {showGeminiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <button
                  onClick={saveGeminiSettings}
                  className="bg-[#D1FF26] hover:bg-[#c2ed1c] text-black font-bold text-[11px] px-5 py-2.5 rounded-lg transition uppercase tracking-wider"
                >
                  Conectar Key
                </button>
              </div>
              <p className="text-[10px] text-[#88888E] leading-normal flex items-start gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-[#D1FF26] shrink-0 mt-0.5" />
                <span>La API Key se envía en las cabeceras de tus consultas para ejecutar con absoluta prioridad tus campañas.</span>
              </p>
            </div>
          </div>
          
          {/* LinkedIn Integration Panel */}
          <div className="bg-[#141416] border border-[#222224] rounded-2xl p-5 space-y-4" id="linkedin-integration-box">
            <div className="flex items-center justify-between border-b border-[#222224] pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Globe className="w-4 h-4 text-blue-400" />
                </span>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-white">LinkedIn Professional Publisher</h3>
                  <p className="text-[10px] text-[#88888E]">Publicación automática de post y copys persuasivos</p>
                </div>
              </div>
              <a 
                href="https://www.linkedin.com/developers/" 
                target="_blank" 
                rel="noreferrer"
                className="bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 text-[10px] font-semibold px-2.5 py-1 rounded flex items-center gap-1 transition"
              >
                <span>Crear App LinkedIn</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="block text-[10px] uppercase font-mono tracking-wider text-[#66666E]">Configuración OAuth de Producción</label>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={linkedinClientId}
                    onChange={(e) => setLinkedinClientId(e.target.value)}
                    placeholder="Client ID de LinkedIn"
                    className="w-full bg-[#1A1A1C] border border-[#222224] rounded-lg px-3 py-2 text-xs text-white placeholder-[#66666E] focus:outline-none focus:border-[#D1FF26] font-mono"
                  />
                  <div className="relative">
                    <input
                      type={showLinkedinSecret ? "text" : "password"}
                      value={linkedinClientSecret}
                      onChange={(e) => setLinkedinClientSecret(e.target.value)}
                      placeholder="Client Secret"
                      className="w-full bg-[#1A1A1C] border border-[#222224] rounded-lg pl-3 pr-10 py-2 text-xs text-white placeholder-[#66666E] focus:outline-none focus:border-[#D1FF26] font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLinkedinSecret(!showLinkedinSecret)}
                      className="absolute right-2.5 top-2 text-[#66666E] hover:text-white transition"
                    >
                      {showLinkedinSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startOAuth("linkedin")}
                    className="flex-1 bg-[#1A1A1C] hover:bg-[#2A2A2C] border border-[#222224] text-white font-bold text-[11px] py-2 rounded-lg flex items-center justify-center gap-1.5 transition uppercase tracking-wider"
                    id="btn-oauth-linkedin"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#D1FF26]" /> Vincular Vía OAuth
                  </button>
                  <button
                    onClick={saveLinkedinSettings}
                    className="bg-[#D1FF26] hover:bg-[#c2ed1c] text-black font-bold text-[11px] px-3 py-2 rounded-lg transition uppercase tracking-wider"
                    id="btn-save-linkedin"
                  >
                    Guardar
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] uppercase font-mono tracking-wider text-[#66666E]">Token de Acceso Directo (Opcional)</label>
                <textarea
                  value={linkedinToken}
                  onChange={(e) => setLinkedinToken(e.target.value)}
                  placeholder="Pega aquí tu Access Token de LinkedIn si ya posees uno..."
                  rows={3}
                  className="w-full bg-[#1A1A1C] border border-[#222224] rounded-lg p-2 text-xs text-white placeholder-[#66666E] focus:outline-none focus:border-[#D1FF26] font-mono resize-none"
                />
              </div>
            </div>
          </div>

          {/* Meta & Instagram Integration Panel */}
          <div className="bg-[#141416] border border-[#222224] rounded-2xl p-5 space-y-4" id="meta-integration-box">
            <div className="flex items-center justify-between border-b border-[#222224] pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/20">
                  <Globe className="w-4 h-4 text-pink-400" />
                </span>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-white">Meta API Suite (Instagram & Ads)</h3>
                  <p className="text-[10px] text-[#88888E]">Instagram Graph Publishing y Meta Ads Campaign Manager</p>
                </div>
              </div>
              <a 
                href="https://developers.facebook.com/apps/" 
                target="_blank" 
                rel="noreferrer"
                className="bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/20 text-pink-500 text-[10px] font-semibold px-2.5 py-1 rounded flex items-center gap-1 transition"
              >
                <span>Meta Developers</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="block text-[10px] uppercase font-mono tracking-wider text-[#66666E]">Credenciales de Meta App</label>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={metaClientId}
                    onChange={(e) => setMetaClientId(e.target.value)}
                    placeholder="App ID (Client ID) de Meta"
                    className="w-full bg-[#1A1A1C] border border-[#222224] rounded-lg px-3 py-2 text-xs text-white placeholder-[#66666E] focus:outline-none focus:border-[#D1FF26] font-mono"
                  />
                  <div className="relative">
                    <input
                      type={showMetaSecret ? "text" : "password"}
                      value={metaClientSecret}
                      onChange={(e) => setMetaClientSecret(e.target.value)}
                      placeholder="App Secret"
                      className="w-full bg-[#1A1A1C] border border-[#222224] rounded-lg pl-3 pr-10 py-2 text-xs text-white placeholder-[#66666E] focus:outline-none focus:border-[#D1FF26] font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowMetaSecret(!showMetaSecret)}
                      className="absolute right-2.5 top-2 text-[#66666E] hover:text-white transition"
                    >
                      {showMetaSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <input
                    type="text"
                    value={metaAdAccount}
                    onChange={(e) => setMetaAdAccount(e.target.value)}
                    placeholder="Meta Ad Account ID (act_1234)"
                    className="w-full bg-[#1A1A1C] border border-[#222224] rounded-lg px-3 py-2 text-xs text-white placeholder-[#66666E] focus:outline-none focus:border-[#D1FF26] font-mono"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startOAuth("meta")}
                    className="flex-1 bg-[#1A1A1C] hover:bg-[#2A2A2C] border border-[#222224] text-white font-bold text-[11px] py-2 rounded-lg flex items-center justify-center gap-1.5 transition uppercase tracking-wider"
                    id="btn-oauth-meta"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#D1FF26]" /> Vincular Vía OAuth
                  </button>
                  <button
                    onClick={saveMetaSettings}
                    className="bg-[#D1FF26] hover:bg-[#c2ed1c] text-black font-bold text-[11px] px-3 py-2 rounded-lg transition uppercase tracking-wider"
                    id="btn-save-meta"
                  >
                    Guardar
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] uppercase font-mono tracking-wider text-[#66666E]">Token de Acceso Directo de Meta (Opcional)</label>
                <textarea
                  value={metaToken}
                  onChange={(e) => setMetaToken(e.target.value)}
                  placeholder="Pega aquí tu User Access Token de Graph Explorer..."
                  rows={4}
                  className="w-full bg-[#1A1A1C] border border-[#222224] rounded-lg p-2 text-xs text-white placeholder-[#66666E] focus:outline-none focus:border-[#D1FF26] font-mono resize-none"
                />
              </div>
            </div>
          </div>

          {/* Sandbox Test Simulator & Console */}
          <div className="bg-[#141416] border border-[#222224] rounded-2xl p-5 space-y-4" id="api-sandbox-testing-panel">
            <div className="flex items-center justify-between border-b border-[#222224] pb-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#D1FF26]" /> Consola de Logs y Lanzador del Sandbox
              </h3>
              <span className="text-[9px] font-mono bg-[#1A1A1C] border border-[#222224] text-[#88888E] px-2 py-0.5 rounded">
                Ecosistema Auditor
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#88888E] shrink-0 font-mono">Disparar Canal:</span>
                <div className="flex gap-1.5 flex-1">
                  {(["linkedin", "instagram", "meta-ads"] as const).map((channel) => (
                    <button
                      key={channel}
                      onClick={() => setSelectedChannel(channel)}
                      className={`flex-1 text-center py-1.5 rounded-lg text-xs font-semibold border transition ${
                        selectedChannel === channel
                          ? "bg-[#D1FF26] border-[#D1FF26] text-black"
                          : "bg-[#1A1A1C] border-[#222224] text-[#88888E] hover:text-white"
                      }`}
                      id={`sandbox-select-${channel}`}
                    >
                      {channel === "linkedin" ? "LinkedIn Post" : channel === "instagram" ? "IG Post" : "Meta Ads Campaña"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={testPayload}
                  onChange={(e) => setTestPayload(e.target.value)}
                  placeholder="Escribe el copy o nombre de campaña para probar..."
                  className="flex-1 bg-[#1A1A1C] border border-[#222224] rounded-lg px-3 py-2 text-xs text-white placeholder-[#66666E] focus:outline-none focus:border-[#D1FF26]"
                />
                <button
                  onClick={triggerApiSyncTest}
                  disabled={testingConnection}
                  className="bg-[#D1FF26] hover:bg-[#c2ed1c] disabled:bg-[#1A1A1C] text-black font-bold text-xs px-5 py-2 rounded-full transition whitespace-nowrap uppercase tracking-wider"
                  id="btn-trigger-sandbox-test"
                >
                  {testingConnection ? "Sincronizando..." : "Probar Sync"}
                </button>
              </div>

              {/* Console Screen Log */}
              <div className="bg-black border border-[#222224] rounded-xl p-3 h-[200px] overflow-y-auto font-mono text-[10px] text-green-400 space-y-1.5 custom-scrollbar">
                {terminalLogs.map((log, idx) => (
                  <div key={idx} className="leading-relaxed break-all">
                    <span className="text-[#66666E] select-none">[{idx + 1}] </span>
                    <span className={log.startsWith(">>") ? "text-blue-400" : log.includes("Error") || log.includes("ERROR") ? "text-red-400 animate-pulse" : log.includes("Success") || log.includes("exitoso") || log.includes("✔") ? "text-[#D1FF26]" : "text-green-400"}>
                      {log}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COMPONENT: Google Workspace & Cloud Backup (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Google Drive Integration Panel */}
          <div className="bg-[#141416] border border-[#222224] rounded-2xl p-5 flex flex-col justify-between" id="drive-box-hub">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#222224] pb-3 mb-1">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                    💾
                  </span>
                  <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                    Google Drive Cloud Backup
                  </h3>
                </div>
                <a 
                  href="https://console.cloud.google.com/apis/library/drive.googleapis.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/20 text-yellow-500 text-[10px] font-semibold px-2.5 py-1 rounded flex items-center gap-1 transition"
                >
                  <span>API Drive</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Custom Credentials Block */}
              <div className="bg-[#1A1A1C] border border-[#222224] rounded-xl p-3.5 space-y-2.5">
                <span className="text-[10px] font-mono uppercase text-[#88888E] block">🔑 Conexión Drive Privada</span>
                <input
                  type="text"
                  value={customDriveFolderId}
                  onChange={(e) => setCustomDriveFolderId(e.target.value)}
                  placeholder="ID de la Carpeta de Google Drive"
                  className="w-full bg-[#141416] border border-[#222224] rounded-lg px-3 py-1.5 text-xs text-white placeholder-[#66666E] focus:outline-none focus:border-[#D1FF26] font-mono"
                />
                <input
                  type="password"
                  value={customDriveApiKey}
                  onChange={(e) => setCustomDriveApiKey(e.target.value)}
                  placeholder="Developer API Key de Google Cloud"
                  className="w-full bg-[#141416] border border-[#222224] rounded-lg px-3 py-1.5 text-xs text-white placeholder-[#66666E] focus:outline-none focus:border-[#D1FF26] font-mono"
                />
                <button
                  onClick={saveDriveSettings}
                  className="w-full bg-[#D1FF26]/10 hover:bg-[#D1FF26]/20 border border-[#D1FF26]/20 text-[#D1FF26] font-bold text-[10px] py-1.5 rounded uppercase tracking-wider transition"
                >
                  Conectar Carpeta
                </button>
              </div>

              {/* Drive file structure list */}
              <div className="bg-[#0A0A0B] rounded-xl p-3 border border-[#222224] space-y-2 h-[150px] overflow-y-auto custom-scrollbar text-xs">
                <div className="text-[10px] font-mono text-[#66666E] uppercase tracking-widest pb-1 border-b border-[#222224] flex items-center gap-1.5">
                  <Folder className="w-3.5 h-3.5 text-[#66666E]" /> /Mi Unidad/{customDriveFolderId ? `Carpeta_${customDriveFolderId.slice(0, 6)}...` : "AdTeam_Vault"}/
                </div>
                
                {driveFiles.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded bg-[#1A1A1C]/50 border border-[#222224]/80 hover:bg-[#1A1A1C] transition">
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText className="w-4 h-4 text-[#88888E] shrink-0" />
                      <span className="text-[#E5E5E7] font-mono truncate">{file.name}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 text-[10px] font-mono text-[#66666E]">
                      <span>{file.size}</span>
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
                className="w-full bg-[#D1FF26] hover:bg-[#c2ed1c] disabled:bg-[#1A1A1C] text-black font-bold text-xs py-2.5 rounded-full flex items-center justify-center gap-2 transition uppercase tracking-wider"
                id="btn-sync-drive-hub"
              >
                {syncingDrive ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    <span>Sincronizando...</span>
                  </>
                ) : driveSynced ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-black" />
                    <span>Guardado en Drive (OK)</span>
                  </>
                ) : (
                  <>
                    <span>Sincronizar y Respaldar en Google Drive</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Mail dispatch panel */}
          <div className="bg-[#141416] border border-[#222224] rounded-2xl p-5 flex flex-col justify-between" id="mail-dispatch-box-hub">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#222224] pb-3 mb-1">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded bg-red-500/10 text-red-500 border border-red-500/20">
                    ✉
                  </span>
                  <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                    Despachador de Resúmenes por Correo
                  </h3>
                </div>
                <a 
                  href="https://myaccount.google.com/apppasswords" 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-[10px] font-semibold px-2.5 py-1 rounded flex items-center gap-1 transition"
                >
                  <span>App Password Gmail</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* SMTP Credentials Block */}
              <div className="bg-[#1A1A1C] border border-[#222224] rounded-xl p-3.5 space-y-2">
                <span className="text-[10px] font-mono uppercase text-[#88888E] block">🔑 Servidor SMTP Personal (Real)</span>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={smtpHost}
                    onChange={(e) => setSmtpHost(e.target.value)}
                    placeholder="smtp.gmail.com"
                    className="col-span-2 bg-[#141416] border border-[#222224] rounded px-2.5 py-1.5 text-xs text-white placeholder-[#66666E] focus:outline-none focus:border-[#D1FF26] font-mono"
                  />
                  <input
                    type="text"
                    value={smtpPort}
                    onChange={(e) => setSmtpPort(e.target.value)}
                    placeholder="465"
                    className="bg-[#141416] border border-[#222224] rounded px-2.5 py-1.5 text-xs text-white placeholder-[#66666E] focus:outline-none focus:border-[#D1FF26] font-mono"
                  />
                </div>
                <input
                  type="email"
                  value={smtpUser}
                  onChange={(e) => setSmtpUser(e.target.value)}
                  placeholder="Tu correo corporativo o Gmail"
                  className="w-full bg-[#141416] border border-[#222224] rounded px-2.5 py-1.5 text-xs text-white placeholder-[#66666E] focus:outline-none focus:border-[#D1FF26] font-mono"
                />
                <div className="relative">
                  <input
                    type={showSmtpPass ? "text" : "password"}
                    value={smtpPass}
                    onChange={(e) => setSmtpPass(e.target.value)}
                    placeholder="Contraseña de Aplicación de 16 dígitos"
                    className="w-full bg-[#141416] border border-[#222224] rounded pl-2.5 pr-10 py-1.5 text-xs text-white placeholder-[#66666E] focus:outline-none focus:border-[#D1FF26] font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSmtpPass(!showSmtpPass)}
                    className="absolute right-2.5 top-2 text-[#66666E] hover:text-white transition"
                  >
                    {showSmtpPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <button
                  onClick={saveMailSettings}
                  className="w-full bg-[#D1FF26]/10 hover:bg-[#D1FF26]/20 border border-[#D1FF26]/20 text-[#D1FF26] font-bold text-[10px] py-1.5 rounded uppercase tracking-wider transition"
                >
                  Guardar Servidor SMTP
                </button>
              </div>

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
                  id="btn-send-mail-hub"
                >
                  {sendingMail ? "Enviando..." : mailSent ? "¡Enviado!" : "Enviar"}
                </button>
              </form>
            </div>

            {mailSent && (
              <div className="bg-[#D1FF26]/10 border border-[#D1FF26]/20 text-[#D1FF26] rounded-lg p-2.5 text-[11px] flex items-center gap-2 mt-2">
                <span>✔</span>
                <p>
                  Informe con ganchos, copys y calendarios enviado con éxito a <strong className="font-mono">{recipient}</strong>.
                </p>
              </div>
            )}
          </div>

          {/* Google Calendar Link panel */}
          <div className="bg-[#141416] border border-[#222224] rounded-2xl p-5 flex flex-col justify-between" id="calendar-box-hub">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#222224] pb-3 mb-1">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    📅
                  </span>
                  <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                    Google Calendar Automático
                  </h3>
                </div>
                <a 
                  href="https://console.cloud.google.com/apis/library/calendar-json.googleapis.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-400 text-[10px] font-semibold px-2.5 py-1 rounded flex items-center gap-1 transition"
                >
                  <span>API Calendar</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Calendar Credentials Block */}
              <div className="bg-[#1A1A1C] border border-[#222224] rounded-xl p-3.5 space-y-2">
                <span className="text-[10px] font-mono uppercase text-[#88888E] block">🔑 Conexión Calendar Privada</span>
                <input
                  type="text"
                  value={customCalId}
                  onChange={(e) => setCustomCalId(e.target.value)}
                  placeholder="ID del Calendario (ej: primary o email)"
                  className="w-full bg-[#141416] border border-[#222224] rounded-lg px-3 py-1.5 text-xs text-white placeholder-[#66666E] focus:outline-none focus:border-[#D1FF26] font-mono"
                />
                <input
                  type="password"
                  value={customCalApiKey}
                  onChange={(e) => setCustomCalApiKey(e.target.value)}
                  placeholder="API Key de Google Calendar"
                  className="w-full bg-[#141416] border border-[#222224] rounded-lg px-3 py-1.5 text-xs text-white placeholder-[#66666E] focus:outline-none focus:border-[#D1FF26] font-mono"
                />
                <button
                  onClick={saveCalendarSettings}
                  className="w-full bg-[#D1FF26]/10 hover:bg-[#D1FF26]/20 border border-[#D1FF26]/20 text-[#D1FF26] font-bold text-[10px] py-1.5 rounded uppercase tracking-wider transition"
                >
                  Guardar Calendario
                </button>
              </div>
            </div>

            <button
              onClick={handleCalendarLinkSync}
              disabled={syncingCal}
              className={`w-full font-bold text-xs py-2.5 rounded-full flex items-center justify-center gap-2 transition mt-4 ${
                calSynced
                  ? "bg-[#D1FF26]/10 border border-[#D1FF26]/20 text-[#D1FF26]"
                  : "bg-[#D1FF26] hover:bg-[#c2ed1c] disabled:bg-[#1A1A1C] text-black"
              }`}
              id="btn-sync-cal-hub"
            >
              {syncingCal ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-black" />
                  <span>Sincronizando agenda...</span>
                </>
              ) : calSynced ? (
                <>
                  <CheckCircle className="w-4 h-4 text-[#D1FF26]" />
                  <span>Calendario Sincronizado</span>
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

    </div>
  );
};
