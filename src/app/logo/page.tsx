"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy, Download, Sparkles, Layers } from "lucide-react";

interface LogoItem {
  id: string;
  title: string;
  description: string;
  svgFile: string;
  pngFile: string;
  dimensions: string;
  dark?: boolean;
  featured?: boolean;
  badge?: string;
}

const logoAssets: LogoItem[] = [
  {
    id: "mark-glass",
    title: "12. Glass (Light) App Icon",
    description: "Modern frosted translucent glass icon with glossy specular sheen, ambient drop shadow, and vibrant MIA blue data blocks.",
    svgFile: "/logo-glass.svg",
    pngFile: "/logo-glass.png",
    dimensions: "512 × 512 (Vector) / 1024 × 1024 (PNG)",
    dark: false,
    featured: true,
    badge: "12th Variation",
  },
  {
    id: "mark-blue",
    title: "1. Blue (Original) App Icon",
    description: "Square app icon & favicon with the 13-rect pixel matrix on vibrant MIA blue background.",
    svgFile: "/logo-mark.svg",
    pngFile: "/logo-mark.png",
    dimensions: "512 × 512 (Vector) / 1024 × 1024 (PNG)",
    dark: false,
  },
  {
    id: "mark-dark",
    title: "2. Dark App Icon",
    description: "Square dark navy badge with cream-white pixel matrix, matching the hero system icon.",
    svgFile: "/logo-mark-dark.svg",
    pngFile: "/logo-mark-dark.png",
    dimensions: "512 × 512 (Vector) / 1024 × 1024 (PNG)",
    dark: true,
  },
  {
    id: "logo-light",
    title: "Brand Logo (Primary / Light)",
    description: "Complete horizontal lockup: blue pixel badge and ink black wordmark with red accent slash.",
    svgFile: "/logo.svg",
    pngFile: "/logo.png",
    dimensions: "280 × 64 (Vector) / 1120 × 256 (PNG)",
    dark: false,
  },
  {
    id: "logo-dark",
    title: "Brand Logo (Inverted / Dark)",
    description: "Complete horizontal lockup for dark surfaces with cream-white typography.",
    svgFile: "/logo-dark.svg",
    pngFile: "/logo-dark.png",
    dimensions: "280 × 64 (Vector) / 1120 × 256 (PNG)",
    dark: true,
  },
  {
    id: "wordmark-light",
    title: "Hero Pixel Wordmark (Light)",
    description: "Large pixel art 'MIA' display mark with dark M, blue I, and gradient A.",
    svgFile: "/mia-wordmark.svg",
    pngFile: "/mia-wordmark.png",
    dimensions: "1000 × 200 (Vector) / 2000 × 400 (PNG)",
    dark: false,
  },
  {
    id: "wordmark-dark",
    title: "Footer Pixel Wordmark (Inverted)",
    description: "Large pixel art 'MIA' display mark with cream-white M for dark backgrounds.",
    svgFile: "/mia-wordmark-dark.svg",
    pngFile: "/mia-wordmark-dark.png",
    dimensions: "1000 × 200 (Vector) / 2000 × 400 (PNG)",
    dark: true,
  },
];

// 12 App Icon Styles
const iconVariations = [
  { id: 1, name: "1. Blue (Original)", bg: "linear-gradient(135deg, #2F80ED 0%, #1B63D8 100%)", fg: "#FFFFFF", border: "transparent" },
  { id: 2, name: "2. Dark", bg: "linear-gradient(135deg, #090D16 0%, #111827 100%)", fg: "#FFFFFF", border: "transparent" },
  { id: 3, name: "3. Purple", bg: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)", fg: "#FFFFFF", border: "transparent" },
  { id: 4, name: "4. Pink", bg: "linear-gradient(135deg, #E11D48 0%, #BE123C 100%)", fg: "#FFFFFF", border: "transparent" },
  { id: 5, name: "5. Green", bg: "linear-gradient(135deg, #10B981 0%, #047857 100%)", fg: "#FFFFFF", border: "transparent" },
  { id: 6, name: "6. Teal", bg: "linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)", fg: "#FFFFFF", border: "transparent" },
  { id: 7, name: "7. Orange", bg: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)", fg: "#FFFFFF", border: "transparent" },
  { id: 8, name: "8. Red", bg: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)", fg: "#FFFFFF", border: "transparent" },
  { id: 9, name: "9. Yellow", bg: "linear-gradient(135deg, #FACC15 0%, #EAB308 100%)", fg: "#FFFFFF", border: "transparent" },
  { id: 10, name: "10. Black & White", bg: "#FFFFFF", fg: "#090D16", border: "rgba(0,0,0,0.12)" },
  { id: 11, name: "11. Gradient", bg: "linear-gradient(135deg, #2563EB 0%, #9333EA 50%, #F43F5E 100%)", fg: "#FFFFFF", border: "transparent" },
  { id: 12, name: "12. Glass (Light)", bg: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(226,238,252,0.9) 100%)", fg: "linear-gradient(180deg, #3A84F7 0%, #1B63D8 100%)", border: "rgba(155, 196, 245, 0.7)", glass: true },
];

export default function LogoDownloadPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copySvgCode = async (svgFile: string, id: string) => {
    try {
      const res = await fetch(svgFile);
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="min-h-screen bg-[#FEFEF7] text-[#030302] p-6 md:p-12 font-sans selection:bg-[#366CC5]/20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-[#030302]/15 gap-4">
          <div>
            <Link
              href="/"
              style={{ color: "#366CC5" }}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#366CC5] hover:underline mb-3"
            >
              <ArrowLeft size={14} /> Back to Landing Page
            </Link>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#030302]">
              MIA Brand Assets & Logos
            </h1>
            <p className="text-sm md:text-base text-[#030302]/65 mt-2">
              Official vectors (SVG) and high-resolution raster files (PNG), including the <strong>12. Glass (Light)</strong> edition.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              style={{ color: "#366CC5", backgroundColor: "rgba(54, 108, 197, 0.1)" }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium"
            >
              <Sparkles size={13} /> {logoAssets.length} Assets Available
            </span>
          </div>
        </div>

        {/* Grid of Logos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {logoAssets.map((logo) => (
            <div
              key={logo.id}
              className={`border rounded-xl overflow-hidden bg-white shadow-sm flex flex-col transition hover:shadow-md ${
                logo.featured ? "border-[#366CC5] ring-2 ring-[#366CC5]/20" : "border-[#030302]/15"
              }`}
            >
              {/* Preview Area */}
              <div
                className={`p-10 flex items-center justify-center min-h-[220px] relative ${
                  logo.dark
                    ? "bg-[#030302] border-b border-white/10"
                    : logo.featured
                    ? "bg-gradient-to-br from-[#F0F6FE] to-[#E3EEFC] border-b border-[#366CC5]/20"
                    : "bg-[#F7F7F0] border-b border-[#030302]/10"
                }`}
              >
                {logo.badge && (
                  <span className="absolute top-3.5 right-3.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#366CC5] text-white text-[10px] font-mono font-semibold shadow-sm">
                    <Sparkles size={11} /> {logo.badge}
                  </span>
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.svgFile}
                  alt={logo.title}
                  className="max-h-[140px] max-w-[85%] object-contain drop-shadow-sm"
                />
              </div>

              {/* Details & Actions */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg text-[#030302] flex items-center gap-2">
                      {logo.title}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#030302]/5 text-[#030302]/65">
                      {logo.dark ? "Dark Theme" : "Light Theme"}
                    </span>
                  </div>
                  <p className="text-xs text-[#030302]/65 mt-1">{logo.description}</p>
                  <p style={{ color: "#366CC5" }} className="text-[11px] font-mono mt-2 font-medium">
                    Dimensions: {logo.dimensions}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 mt-6 pt-4 border-t border-[#030302]/10">
                  {/* SVG Download Button */}
                  <a
                    href={logo.svgFile}
                    download
                    style={{ backgroundColor: "#366CC5", color: "#FEFEF7" }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-mono font-medium hover:opacity-90 active:scale-95 transition shadow-sm"
                  >
                    <Download size={13} style={{ color: "#FEFEF7" }} />
                    <span>Download SVG</span>
                  </a>

                  {/* PNG Download Button */}
                  <a
                    href={logo.pngFile}
                    download
                    style={{ backgroundColor: "#030302", color: "#FEFEF7" }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-mono font-medium hover:opacity-85 active:scale-95 transition shadow-sm"
                  >
                    <Download size={13} style={{ color: "#FEFEF7" }} />
                    <span>Download PNG</span>
                  </a>

                  {/* Copy SVG Button */}
                  <button
                    type="button"
                    onClick={() => copySvgCode(logo.svgFile, logo.id)}
                    style={{ color: "#030302" }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-[#030302]/20 text-xs font-mono hover:border-[#366CC5] hover:text-[#366CC5] hover:bg-[#366CC5]/5 transition ml-auto cursor-pointer"
                  >
                    {copiedId === logo.id ? (
                      <>
                        <Check size={13} className="text-green-600" />
                        <span className="text-green-600 font-medium">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>Copy SVG</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 12 Color Variations Grid */}
        <div className="mt-16 pt-10 border-t border-[#030302]/15">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-mono text-[#366CC5] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <Layers size={13} /> Complete Icon Palette
              </span>
              <h2 className="text-2xl font-semibold tracking-tight text-[#030302] mt-1">
                All 12 App Icon Variations
              </h2>
            </div>
            <span className="text-xs font-mono text-[#030302]/50">
              12 Styles Available
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {iconVariations.map((icon) => (
              <div
                key={icon.id}
                className={`p-3.5 rounded-xl border flex flex-col items-center text-center transition ${
                  icon.id === 12
                    ? "border-[#366CC5] bg-[#366CC5]/5 shadow-sm ring-2 ring-[#366CC5]/20"
                    : "border-[#030302]/10 bg-white hover:border-[#030302]/25"
                }`}
              >
                {/* Mini Render of Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center p-2.5 shadow-sm relative overflow-hidden"
                  style={{
                    background: icon.bg,
                    border: `1px solid ${icon.border}`,
                  }}
                >
                  {/* Frosted sheen for glass */}
                  {icon.glass && (
                    <div className="absolute inset-0 bg-gradient-to-b from-white/70 to-transparent pointer-events-none" />
                  )}
                  {/* 13 Rectangular Blocks SVG */}
                  <svg viewBox="0 0 54 54" className="w-11 h-11 relative z-10" fill="none">
                    <g fill={icon.id === 12 ? "#2F80ED" : icon.fg}>
                      {[
                        [0, 0], [1, 0], [0, 1], [2, 1], [0, 2], [1, 2], [2, 2],
                        [1, 3], [2, 3], [1, 4], [2, 4], [1, 5], [2, 5],
                      ].map(([x, y], idx) => (
                        <rect
                          key={idx}
                          x={x * 15 + 6}
                          y={y * 8 + 4}
                          width="13"
                          height="6"
                          rx="1"
                        />
                      ))}
                    </g>
                  </svg>
                </div>

                <span className="text-[11px] font-medium text-[#030302] mt-2.5 leading-snug">
                  {icon.name}
                </span>

                {icon.id === 12 ? (
                  <a
                    href="/logo-glass.svg"
                    download
                    className="mt-2 inline-flex items-center gap-1 text-[10px] font-mono text-[#366CC5] font-semibold hover:underline"
                  >
                    <Download size={10} /> Get SVG
                  </a>
                ) : icon.id === 1 ? (
                  <a
                    href="/logo-mark.svg"
                    download
                    className="mt-2 inline-flex items-center gap-1 text-[10px] font-mono text-[#030302]/60 hover:text-[#366CC5]"
                  >
                    <Download size={10} /> Get SVG
                  </a>
                ) : icon.id === 2 ? (
                  <a
                    href="/logo-mark-dark.svg"
                    download
                    className="mt-2 inline-flex items-center gap-1 text-[10px] font-mono text-[#030302]/60 hover:text-[#366CC5]"
                  >
                    <Download size={10} /> Get SVG
                  </a>
                ) : (
                  <span className="text-[9px] font-mono text-[#030302]/40 mt-2">
                    Palette Style
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-14 pt-8 border-t border-[#030302]/15 text-center text-xs font-mono text-[#030302]/50">
          MIA Brand & Logo Assets · High Resolution Vectors & Pixel Outlines
        </div>
      </div>
    </div>
  );
}
