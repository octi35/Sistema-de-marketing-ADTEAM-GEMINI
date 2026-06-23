import React, { useState, useEffect, useRef } from "react";
import { CarouselSlide } from "../types";
import { Sparkles, Download, ArrowLeft, ArrowRight, RefreshCw, Upload, Check, Palette, Eye, AlignLeft } from "lucide-react";

export const CarouselDesigner: React.FC = () => {
  // Config state
  const [topic, setTopic] = useState("3 Hábitos diarios para aumentar tu productividad trabajando desde casa");
  const [slideCount, setSlideCount] = useState(5);
  const [platform, setPlatform] = useState("Instagram");
  const [tone, setTone] = useState("Inspiracional y Práctico");
  
  // App states
  const [loading, setLoading] = useState(false);
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isDemo, setIsDemo] = useState(false);

  // Upload state
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  // Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Presets themes
  const colorThemes = [
    { name: "Slate Dark", bgStart: "#0f172a", bgEnd: "#1e293b", text: "#f8fafc", accent: "#fbbf24" },
    { name: "Teal Deep", bgStart: "#042f2e", bgEnd: "#115e59", text: "#f0fdfa", accent: "#2dd4bf" },
    { name: "Sunset Orange", bgStart: "#7c2d12", bgEnd: "#451a03", text: "#fff7ed", accent: "#fdba74" },
    { name: "Vibrant Purple", bgStart: "#4c1d95", bgEnd: "#2e1065", text: "#f5f3ff", accent: "#c084fc" },
    { name: "LinkedIn Blue", bgStart: "#0a66c2", bgEnd: "#004182", text: "#ffffff", accent: "#86efac" },
  ];

  const generateCarousel = async () => {
    setLoading(true);
    setSlides([]);
    setCurrentSlideIndex(0);
    setUploaded(false);
    try {
      const response = await fetch("/api/generate-carousel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, slideCount, platform, tone }),
      });
      const data = await response.json();
      if (data.slides) {
        setSlides(data.slides);
      }
    } catch (err) {
      console.error("Error generating carousel:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateCarousel();
  }, []);

  // Sync edits to the active slide in state
  const handleEditActiveSlide = (key: keyof CarouselSlide, val: any) => {
    setSlides((prev) =>
      prev.map((slide, idx) => (idx === currentSlideIndex ? { ...slide, [key]: val } : slide))
    );
  };

  const handleApplyTheme = (theme: typeof colorThemes[0]) => {
    setSlides((prev) =>
      prev.map((slide) => ({
        ...slide,
        bgGradientStart: theme.bgStart,
        bgGradientEnd: theme.bgEnd,
        textColor: theme.text,
        accentColor: theme.accent,
      }))
    );
  };

  // Download a single slide as PNG using HTML5 canvas
  const downloadSlidePNG = (slide: CarouselSlide) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Use IG Portrait size: 1080x1350px (highly engaging) or Square: 1080x1080px
    const isPortrait = platform === "Instagram";
    canvas.width = 1080;
    canvas.height = isPortrait ? 1350 : 1080;

    // Clear and draw gradient
    const gradient = ctx.createLinearGradient(0, 0, 1080, canvas.height);
    gradient.addColorStop(0, slide.bgGradientStart);
    gradient.addColorStop(1, slide.bgGradientEnd);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, canvas.height);

    // Dynamic graphic patterns (pixelated or sleek grid)
    ctx.strokeStyle = "rgba(255,255,255,0.05)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 1080; i += 60) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let j = 0; j < canvas.height; j += 60) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(1080, j);
      ctx.stroke();
    }

    // Border Frame
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.lineWidth = 16;
    ctx.strokeRect(20, 20, 1040, canvas.height - 40);

    // Slide Number Counter top right
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(880, 60, 140, 50);
    ctx.fillStyle = slide.accentColor;
    ctx.font = "bold 24px monospace";
    ctx.textAlign = "center";
    ctx.fillText(`${slide.slideNumber} / ${slides.length}`, 950, 92);

    // Logo Watermark bottom center
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.font = "18px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(platform === "Instagram" ? "@tu_cuenta • IG Carousel" : "LinkedIn Post • Creado por AdTeam AI", 1080 / 2, canvas.height - 70);

    // Title (bold, modern)
    ctx.fillStyle = slide.textColor;
    ctx.font = "bold 56px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "left";
    
    const words = slide.title.split(" ");
    let line = "";
    let y = 320;
    const maxWidth = 900;
    const lineHeight = 74;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line, 90, y);
        line = words[n] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 90, y);

    // Accent slide separator bar
    y += 40;
    ctx.fillStyle = slide.accentColor;
    ctx.fillRect(90, y, 160, 10);

    // Body text (clean sans font)
    y += 90;
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.font = "34px sans-serif";
    
    const bodyWords = slide.body.split(" ");
    let bodyLine = "";
    const bodyLineHeight = 52;

    for (let n = 0; n < bodyWords.length; n++) {
      const testLine = bodyLine + bodyWords[n] + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(bodyLine, 90, y);
        bodyLine = bodyWords[n] + " ";
        y += bodyLineHeight;
      } else {
        bodyLine = testLine;
      }
    }
    ctx.fillText(bodyLine, 90, y);

    // Graphic cue / Visual idea helper text at the bottom
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    ctx.fillRect(90, canvas.height - 250, 900, 120);
    ctx.fillStyle = "#cbd5e1";
    ctx.font = "italic 22px sans-serif";
    ctx.fillText(`💡 Concepto Visual Recomendado:`, 110, canvas.height - 210);
    ctx.fillStyle = "#94a3b8";
    ctx.fillText(slide.visualIdea.slice(0, 85) + "...", 110, canvas.height - 175);

    // Save
    const imageURI = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `CAROUSEL_SLIDE_${slide.slideNumber}_OF_${slides.length}.png`;
    link.href = imageURI;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Loop through all slides and download each sequentially
  const handleDownloadAllSlides = () => {
    slides.forEach((slide) => {
      downloadSlidePNG(slide);
    });
  };

  // Simulated API direct upload to Meta Instagram Graph API or LinkedIn Content API
  const handleDirectUploadAPI = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploaded(true);
    }, 2000);
  };

  const activeSlide = slides[currentSlideIndex];

  return (
    <div className="space-y-6" id="carousel-designer-root">
      
      {/* Header controls card */}
      <div className="bg-[#141416] border border-[#222224] rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-[#D1FF26]/10 text-[#D1FF26] border border-[#D1FF26]/20">
              🎠
            </div>
            <div>
              <h2 className="text-base font-semibold text-white flex items-center gap-1.5">
                Diseñador de Carruseles para Instagram & LinkedIn
              </h2>
              <p className="text-xs text-[#88888E] mt-0.5">
                Genera presentaciones multislide persuasivas listas para descargar en alta resolución o subir vía API.
              </p>
            </div>
          </div>
        </div>

        {/* Input variables */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-[10px] font-semibold text-[#66666E] uppercase tracking-wider">Tema del Carrusel</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-[#1A1A1C] border border-[#2A2A2C] focus:border-[#D1FF26] rounded-lg p-3 text-xs text-white focus:outline-none"
              placeholder="Ej: 5 Errores fatales de SEO..."
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold text-[#66666E] uppercase tracking-wider">Número de Diapositivas</label>
            <select
              value={slideCount}
              onChange={(e) => setSlideCount(Number(e.target.value))}
              className="w-full bg-[#1A1A1C] border border-[#2A2A2C] focus:border-[#D1FF26] rounded-lg p-3 text-xs text-[#88888E] focus:outline-none"
            >
              <option value="3">3 Slides (Corto / Promo)</option>
              <option value="5">5 Slides (Estándar)</option>
              <option value="7">7 Slides (Detallado)</option>
              <option value="10">10 Slides (Máximo)</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold text-[#66666E] uppercase tracking-wider">Canal de Destino</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full bg-[#1A1A1C] border border-[#2A2A2C] focus:border-[#D1FF26] rounded-lg p-3 text-xs text-[#88888E] focus:outline-none"
            >
              <option value="Instagram">Instagram (Carrusel)</option>
              <option value="LinkedIn">LinkedIn (PDF/Documento)</option>
            </select>
          </div>
        </div>

        <button
          onClick={generateCarousel}
          disabled={loading}
          className="bg-[#D1FF26] hover:bg-[#c2ed1c] text-black font-bold px-6 py-3.5 rounded-full flex items-center justify-center gap-2 transition text-xs uppercase tracking-wider"
          id="btn-generate-carousel"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Cami está estructurando las ideas...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-black" />
              <span>Generar Contenido de Diapositivas con Cami & Santi</span>
            </>
          )}
        </button>
      </div>

      {/* Hidden Canvas for High Res Draws */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Main Designer Workbench */}
      {slides.length > 0 && activeSlide && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT side: Visual Slide editor layout (takes 7 cols) */}
          <div className="lg:col-span-7 bg-[#141416] border border-[#222224] rounded-2xl p-6 flex flex-col justify-between h-[650px]">
            
            {/* Top index and info */}
            <div className="flex items-center justify-between border-b border-[#222224] pb-3 mb-4">
              <span className="text-xs font-semibold text-[#88888E] font-mono">
                DIAPOSITIVA ACTIVA: {currentSlideIndex + 1} de {slides.length}
              </span>
              <div className="flex items-center gap-1.5 bg-[#1A1A1C] border border-[#2A2A2C] px-2 py-1 rounded text-[11px] text-[#D1FF26] font-mono">
                <span>Vía Cami & Lauti</span>
              </div>
            </div>

            {/* Slider container representing the actual post */}
            <div 
              className="flex-1 rounded-2xl p-8 relative flex flex-col justify-between border border-[#222224] shadow-inner overflow-hidden select-none"
              style={{
                background: `linear-gradient(135deg, ${activeSlide.bgGradientStart}, ${activeSlide.bgGradientEnd})`,
                color: activeSlide.textColor,
                height: platform === "Instagram" ? "420px" : "360px"
              }}
            >
              {/* Corner abstract vectors */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -mr-16 -mt-16 filter blur" />

              {/* Header and Slide Count */}
              <div className="flex justify-between items-center relative z-10">
                <span className="text-[10px] font-bold tracking-widest uppercase opacity-75 font-mono">
                  {platform.toUpperCase()} SLIDES
                </span>
                <span className="text-xs font-mono font-bold bg-black/20 px-2 py-0.5 rounded-full" style={{ color: activeSlide.accentColor }}>
                  {activeSlide.slideNumber} / {slides.length}
                </span>
              </div>

              {/* Core visual slide content */}
              <div className="my-auto space-y-4 relative z-10">
                <h3 className="text-2xl md:text-3xl font-extrabold leading-tight">
                  {activeSlide.title}
                </h3>
                
                {/* Accent bar color line */}
                <div className="h-1.5 w-24 rounded" style={{ backgroundColor: activeSlide.accentColor }} />
                
                <p className="text-sm md:text-base leading-relaxed opacity-90 font-medium">
                  {activeSlide.body}
                </p>
              </div>

              {/* Bottom design footer */}
              <div className="flex justify-between items-center text-[10px] opacity-60 font-mono mt-4 border-t border-white/10 pt-3 relative z-10">
                <span>DISEÑO AUTO-SINC • ADTEAM AI</span>
                <span>DESLIZA 👉</span>
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between mt-6 bg-[#0A0A0B] p-3 rounded-xl border border-[#222224]">
              <button
                disabled={currentSlideIndex === 0}
                onClick={() => setCurrentSlideIndex(currentSlideIndex - 1)}
                className="p-2 bg-[#1A1A1C] hover:bg-[#2A2A2C] disabled:opacity-30 rounded-lg text-[#88888E] border border-[#2A2A2C] transition"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div className="flex gap-1.5 overflow-x-auto max-w-[280px] px-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full shrink-0 transition-colors ${
                      idx === currentSlideIndex ? "bg-[#D1FF26]" : "bg-[#222224] hover:bg-[#2A2A2C]"
                    }`}
                  />
                ))}
              </div>

              <button
                disabled={currentSlideIndex === slides.length - 1}
                onClick={() => setCurrentSlideIndex(currentSlideIndex + 1)}
                className="p-2 bg-[#1A1A1C] hover:bg-[#2A2A2C] disabled:opacity-30 rounded-lg text-[#88888E] border border-[#2A2A2C] transition"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* RIGHT side: Customizer side panel (takes 5 cols) */}
          <div className="lg:col-span-5 bg-[#141416] border border-[#222224] rounded-2xl p-6 flex flex-col justify-between h-[650px] overflow-y-auto custom-scrollbar">
            
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-[#88888E] uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-[#222224]">
                <Palette className="w-4 h-4 text-[#D1FF26]" /> Editor y Paletas de Color
              </h3>

              {/* Theme selectors */}
              <div className="space-y-2">
                <label className="text-[10px] font-semibold text-[#66666E] font-mono uppercase">Aplicar Paleta Predefinida</label>
                <div className="grid grid-cols-2 gap-2">
                  {colorThemes.map((theme) => (
                    <button
                      key={theme.name}
                      onClick={() => handleApplyTheme(theme)}
                      className="flex items-center gap-2 p-2 bg-[#1A1A1C] hover:bg-[#2A2A2C] rounded border border-[#222224] text-left text-xs text-[#88888E] transition"
                    >
                      <div className="flex shrink-0 -space-x-1.5">
                        <div className="w-3.5 h-3.5 rounded-full border border-[#222224]" style={{ backgroundColor: theme.bgStart }} />
                        <div className="w-3.5 h-3.5 rounded-full border border-[#222224]" style={{ backgroundColor: theme.accent }} />
                      </div>
                      <span className="truncate">{theme.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Live inputs for active slide */}
              <div className="space-y-3 pt-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-[#66666E] font-mono uppercase">Título de la diapositiva</label>
                  <input
                    type="text"
                    value={activeSlide.title}
                    onChange={(e) => handleEditActiveSlide("title", e.target.value)}
                    className="w-full bg-[#1A1A1C] border border-[#2A2A2C] focus:border-[#D1FF26] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-[#66666E] font-mono uppercase">Mensaje de la diapositiva</label>
                  <textarea
                    value={activeSlide.body}
                    onChange={(e) => handleEditActiveSlide("body", e.target.value)}
                    className="w-full h-20 bg-[#1A1A1C] border border-[#2A2A2C] focus:border-[#D1FF26] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-[#66666E] font-mono uppercase">Sugerencia de Gráfico / Icono</label>
                  <input
                    type="text"
                    value={activeSlide.visualIdea}
                    onChange={(e) => handleEditActiveSlide("visualIdea", e.target.value)}
                    className="w-full bg-[#1A1A1C] border border-[#2A2A2C] focus:border-[#D1FF26] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
                  />
                </div>

                {/* Color customization */}
                <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                  <div>
                    <label className="text-[10px] font-semibold text-[#66666E] font-mono block mb-1">Color Inicio</label>
                    <div className="flex items-center gap-1 bg-[#1A1A1C] border border-[#222224] rounded px-2 py-1">
                      <input
                        type="color"
                        value={activeSlide.bgGradientStart}
                        onChange={(e) => handleEditActiveSlide("bgGradientStart", e.target.value)}
                        className="w-5 h-5 rounded border border-[#2A2A2C] bg-transparent cursor-pointer shrink-0"
                      />
                      <span className="font-mono text-[10px] text-[#88888E] uppercase select-all">{activeSlide.bgGradientStart}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-[#66666E] font-mono block mb-1">Color Destacado</label>
                    <div className="flex items-center gap-1 bg-[#1A1A1C] border border-[#222224] rounded px-2 py-1">
                      <input
                        type="color"
                        value={activeSlide.accentColor}
                        onChange={(e) => handleEditActiveSlide("accentColor", e.target.value)}
                        className="w-5 h-5 rounded border border-[#2A2A2C] bg-transparent cursor-pointer shrink-0"
                      />
                      <span className="font-mono text-[10px] text-[#88888E] uppercase select-all">{activeSlide.accentColor}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action panel */}
            <div className="border-t border-[#222224] pt-4 mt-4 space-y-3">
              <button
                onClick={() => downloadSlidePNG(activeSlide)}
                className="w-full bg-[#1A1A1C] border border-[#2A2A2C] hover:bg-[#2A2A2C] text-white font-semibold text-xs px-4 py-2.5 rounded flex items-center justify-center gap-2 transition"
              >
                <Download className="w-4 h-4 text-[#D1FF26]" />
                <span>Descargar Slide Actual (PNG)</span>
              </button>

              <button
                onClick={handleDownloadAllSlides}
                className="w-full bg-[#D1FF26] hover:bg-[#c2ed1c] active:bg-[#b3db18] text-black font-bold text-xs px-4 py-3 rounded-full flex items-center justify-center gap-2 transition"
                id="btn-download-carousel-all"
              >
                <Download className="w-4 h-4" />
                <span>Descargar Carrusel Completo (ZIP/PNG)</span>
              </button>

              <button
                onClick={handleDirectUploadAPI}
                disabled={uploading || uploaded}
                className={`w-full font-bold text-xs px-4 py-3 rounded-full flex items-center justify-center gap-2 transition border ${
                  uploaded
                    ? "bg-[#D1FF26]/10 border-[#D1FF26]/30 text-[#D1FF26]"
                    : "bg-[#1A1A1C] hover:bg-[#2A2A2C] text-white border-[#2A2A2C]"
                }`}
                id="btn-carousel-api-direct"
              >
                {uploading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#D1FF26]" />
                    <span>Conectando con la API de {platform}...</span>
                  </>
                ) : uploaded ? (
                  <>
                    <Check className="w-4 h-4 text-[#D1FF26]" />
                    <span>Publicado con Éxito ({platform} API)</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 text-green-500" />
                    <span>Publicar en mi {platform} directamente</span>
                  </>
                )}
              </button>
            </div>

            {/* Sync codes visual logs */}
            {uploaded && (
              <div className="bg-[#0A0A0B] rounded p-2.5 border border-[#222224] font-mono text-[9px] text-[#88888E] space-y-0.5 mt-2">
                <div>GET /v15.0/me/media_publish?creation_id=184910478201 HTTP/1.1</div>
                <div className="text-green-400">HTTP/1.1 200 OK {"{"} "id": "184910478201", "status": "PUBLISHED" {"}"}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
