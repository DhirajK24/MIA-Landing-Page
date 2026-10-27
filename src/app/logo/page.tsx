"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy, Download, Sparkles } from "lucide-react";

interface LogoItem {
  id: string;
  title: string;
  description: string;
  svgFile: string;
  pngFile: string;
  dimensions: string;
  dark?: boolean;
}

const logoAssets: LogoItem[] = [
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
    id: "mark-blue",
    title: "App Icon (Signature Blue Mark)",
    description: "Square app icon & favicon with the 13-rect pixel matrix on blue background.",
    svgFile: "/logo-mark.svg",
    pngFile: "/logo-mark.png",
    dimensions: "512 × 512 (Vector) / 1024 × 1024 (PNG)",
    dark: false,
  },
  {
    id: "mark-dark",
    title: "App Icon (Black Mark)",
    description: "Square dark badge with cream-white pixel matrix, matching the hero system icon.",
    svgFile: "/logo-mark-dark.svg",
    pngFile: "/logo-mark-dark.png",
    dimensions: "512 × 512 (Vector) / 1024 × 1024 (PNG)",
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
              Official vectors (SVG) and high-resolution raster files (PNG) ready for download.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              style={{ color: "#366CC5", backgroundColor: "rgba(54, 108, 197, 0.1)" }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium"
            >
              <Sparkles size={13} /> 6 Assets Available
            </span>
          </div>
        </div>

        {/* Grid of Logos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {logoAssets.map((logo) => (
            <div
              key={logo.id}
              className="border border-[#030302]/15 rounded-xl overflow-hidden bg-white shadow-sm flex flex-col transition hover:shadow-md"
            >
              {/* Preview Area */}
              <div
                className={`p-10 flex items-center justify-center min-h-[220px] ${
                  logo.dark
                    ? "bg-[#030302] border-b border-white/10"
                    : "bg-[#F7F7F0] border-b border-[#030302]/10"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.svgFile}
                  alt={logo.title}
                  className="max-h-[140px] max-w-[85%] object-contain"
                />
              </div>

              {/* Details & Actions */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg text-[#030302]">{logo.title}</h3>
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
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-[#030302]/20 text-xs font-mono hover:border-[#366CC5] hover:text-[#366CC5] hover:bg-[#366CC5]/5 transition ml-auto"
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

        {/* Footer info */}
        <div className="mt-14 pt-8 border-t border-[#030302]/15 text-center text-xs font-mono text-[#030302]/50">
          MIA Brand & Logo Assets · High Resolution Vectors & Pixel Outlines
        </div>
      </div>
    </div>
  );
}
