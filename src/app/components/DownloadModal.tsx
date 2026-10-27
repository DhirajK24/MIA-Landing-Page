"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  Copy,
  Cpu,
  Download,
  ExternalLink,
  Laptop,
  Monitor,
  ShieldCheck,
  Sparkles,
  Terminal,
  X,
  Zap,
} from "lucide-react";

type Platform = "windows" | "macos" | "linux";

interface PlatformConfig {
  id: Platform;
  name: string;
  badge: string;
  fileName: string;
  fileSize: string;
  arch: string;
  installerType: string;
  downloadUrl: string;
  cliCommand: string;
  cliLabel: string;
}

const platforms: Record<Platform, PlatformConfig> = {
  windows: {
    id: "windows",
    name: "Windows",
    badge: "Windows 11 / 10",
    fileName: "MIA_0.4.1_x64-setup.exe",
    fileSize: "57.4 MB",
    arch: "x64 (NSIS Installer)",
    installerType: "NSIS Setup (.exe)",
    downloadUrl: "/downloads/MIA_0.4.1_x64-setup.exe",
    cliCommand: "winget install mia.desktop",
    cliLabel: "Windows Package Manager",
  },
  macos: {
    id: "macos",
    name: "macOS",
    badge: "Universal",
    fileName: "MIA-Desktop-v0.4.1-Universal.dmg",
    fileSize: "72.1 MB",
    arch: "Apple Silicon & Intel",
    installerType: "Disk Image (.dmg)",
    downloadUrl: "/downloads/MIA-Desktop-v0.4.1-Universal.dmg",
    cliCommand: "brew install --cask mia",
    cliLabel: "Homebrew Cask",
  },
  linux: {
    id: "linux",
    name: "Linux",
    badge: "x86_64",
    fileName: "MIA-Desktop-v0.4.1.AppImage",
    fileSize: "64.5 MB",
    arch: "x86_64 & ARM64",
    installerType: "Universal AppImage",
    downloadUrl: "/downloads/MIA-Desktop-v0.4.1.AppImage",
    cliCommand: "curl -fsSL https://mia.engine/install.sh | bash",
    cliLabel: "Shell Script",
  },
};

export function DownloadButton({
  onOpenModal,
  className = "",
}: {
  onOpenModal: () => void;
  className?: string;
}) {
  const [detectedOs, setDetectedOs] = useState<Platform>("windows");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ua = navigator.userAgent;
      if (ua.includes("Mac")) setDetectedOs("macos");
      else if (ua.includes("Linux")) setDetectedOs("linux");
      else setDetectedOs("windows");
    }
  }, []);

  const osInfo = platforms[detectedOs];

  return (
    <div className={`inline-flex items-center group ${className}`}>
      <motion.button
        type="button"
        onClick={onOpenModal}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative inline-flex items-center gap-2.5 min-h-[38px] px-3.5 py-1.5 rounded-full bg-[#030302] text-[#FEFEF7] border border-[#366CC5]/40 hover:border-[#366CC5] transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(54,108,197,0.3)] font-mono text-[10px] tracking-wider uppercase cursor-pointer"
      >
        {/* Pulsing version pill */}
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#366CC5]/20 text-[#366CC5] font-semibold text-[9px] border border-[#366CC5]/30">
          <span className="w-1.5 h-1.5 rounded-full bg-[#366CC5] animate-pulse" />
          v0.4.1
        </span>

        {/* Action text with detected OS */}
        <span className="font-medium tracking-normal text-[11px] text-[#FEFEF7]">
          Download for {osInfo.name}
        </span>

        {/* Animated download arrow */}
        <motion.span
          className="w-5 h-5 rounded-full bg-[#366CC5] text-[#FEFEF7] grid place-items-center ml-0.5"
          animate={{ y: [0, -1.5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Download size={11} strokeWidth={2.5} />
        </motion.span>
      </motion.button>
    </div>
  );
}

export function DownloadModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("windows");
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ua = navigator.userAgent;
      if (ua.includes("Mac")) setSelectedPlatform("macos");
      else if (ua.includes("Linux")) setSelectedPlatform("linux");
      else setSelectedPlatform("windows");
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const platform = platforms[selectedPlatform];

  const handleStartDownload = (targetPlatform: PlatformConfig) => {
    setDownloading(true);
    setDownloadProgress(10);
    setDownloadComplete(false);

    // Trigger actual browser download
    const link = document.createElement("a");
    link.href = targetPlatform.downloadUrl;
    link.download = targetPlatform.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Interactive realistic progress simulation
    const timer1 = setTimeout(() => setDownloadProgress(45), 350);
    const timer2 = setTimeout(() => setDownloadProgress(85), 750);
    const timer3 = setTimeout(() => {
      setDownloadProgress(100);
      setDownloading(false);
      setDownloadComplete(true);
    }, 1150);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  const copyCli = async () => {
    try {
      await navigator.clipboard.writeText(platform.cliCommand);
      setCopiedCli(true);
      setTimeout(() => setCopiedCli(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Blurred Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#030302]/70 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#FEFEF7] text-[#030302] border border-[#030302]/20 rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Top Bar with Pixel Brand */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#030302]/10 bg-[#030302] text-[#FEFEF7]">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded bg-[#366CC5] grid place-items-center">
                  <span className="w-3.5 h-3.5 bg-[#FEFEF7] block rounded-sm" />
                </div>
                <div className="flex items-center gap-2 font-mono text-xs tracking-wider">
                  <strong>MIA DESKTOP</strong>
                  <span className="text-[#366CC5]">/ v0.4.1</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-[#FEFEF7]/80">
                    STABLE
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-7 h-7 rounded-full grid place-items-center text-[#FEFEF7]/70 hover:text-[#FEFEF7] hover:bg-white/10 transition"
                aria-label="Close download modal"
              >
                <X size={15} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8">
              {/* Header Headline */}
              <div className="text-center max-w-md mx-auto mb-7">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#366CC5] font-semibold tracking-widest mb-1.5">
                  <Sparkles size={12} /> Local Meeting Intelligence
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                  Get MIA for your machine
                </h2>
                <p className="text-xs text-[#030302]/65 mt-1.5">
                  Runs 100% on-device with zero cloud telemetry. Real-time transcription, summaries, and action extraction.
                </p>
              </div>

              {/* Platform Selector Tabs */}
              <div className="grid grid-cols-3 gap-2 p-1 bg-[#030302]/5 rounded-xl border border-[#030302]/10 mb-6 font-mono text-xs">
                {(Object.keys(platforms) as Platform[]).map((key) => {
                  const p = platforms[key];
                  const isActive = selectedPlatform === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setSelectedPlatform(key);
                        setDownloadComplete(false);
                      }}
                      className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg transition-all ${
                        isActive
                          ? "bg-white text-[#030302] font-semibold shadow-sm border border-[#030302]/10"
                          : "text-[#030302]/60 hover:text-[#030302] hover:bg-white/50"
                      }`}
                    >
                      <Laptop size={14} className={isActive ? "text-[#366CC5]" : ""} />
                      <span>{p.name}</span>
                      <span className="text-[9px] opacity-60 hidden sm:inline">
                        ({p.badge})
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Main Active Platform Card */}
              <div className="border border-[#366CC5]/30 rounded-xl p-5 bg-[#366CC5]/5 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-base text-[#030302]">
                        {platform.name} Installer
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#366CC5]/15 text-[#366CC5] font-medium">
                        {platform.installerType}
                      </span>
                    </div>
                    <p className="text-xs text-[#030302]/60 font-mono mt-1">
                      {platform.fileName} · {platform.fileSize} · {platform.arch}
                    </p>
                  </div>

                  {/* Download Action Button */}
                  <motion.button
                    type="button"
                    onClick={() => handleStartDownload(platform)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={downloading}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#366CC5] text-[#FEFEF7] font-mono text-xs font-semibold hover:bg-[#030302] transition shadow-md whitespace-nowrap cursor-pointer"
                  >
                    <Download size={15} />
                    <span>Download {platform.name}</span>
                  </motion.button>
                </div>

                {/* Simulated Download Progress Bar */}
                {downloading && (
                  <div className="mt-4 pt-3 border-t border-[#366CC5]/20">
                    <div className="flex justify-between text-[11px] font-mono mb-1 text-[#366CC5]">
                      <span>Starting download...</span>
                      <span>{downloadProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#366CC5]/20 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-[#366CC5] rounded-full"
                        style={{ width: `${downloadProgress}%` }}
                        transition={{ ease: "easeOut" }}
                      />
                    </div>
                  </div>
                )}

                {downloadComplete && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 pt-3 border-t border-[#366CC5]/20 flex items-center gap-2 text-xs text-green-700 font-mono"
                  >
                    <Check size={14} className="text-green-600" />
                    <span>Download started! Check your browser downloads folder to open {platform.fileName}.</span>
                  </motion.div>
                )}
              </div>

              {/* Command Line / Quick Install */}
              <div className="border border-[#030302]/15 rounded-xl p-4 bg-[#030302] text-[#FEFEF7] font-mono text-xs mb-6">
                <div className="flex items-center justify-between text-[10px] text-[#FEFEF7]/60 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Terminal size={12} className="text-[#366CC5]" />
                    {platform.cliLabel} Command
                  </span>
                  <span>Terminal Quick Install</span>
                </div>
                <div className="flex items-center justify-between bg-white/5 rounded-lg p-2.5 border border-white/10">
                  <code className="text-[#FEFEF7] text-xs select-all">
                    <span className="text-[#AF140B] mr-2">$</span>
                    {platform.cliCommand}
                  </code>
                  <button
                    type="button"
                    onClick={copyCli}
                    className="p-1.5 rounded hover:bg-white/10 text-[#FEFEF7]/80 hover:text-[#FEFEF7] transition cursor-pointer"
                    title="Copy command"
                  >
                    {copiedCli ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              {/* Three Value Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-start gap-2.5 p-3 rounded-lg border border-[#030302]/10 bg-white">
                  <ShieldCheck size={16} className="text-[#366CC5] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold">100% Private</h4>
                    <p className="text-[10px] text-[#030302]/60 mt-0.5">
                      Whisper AI runs locally. Audio never leaves your RAM.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-lg border border-[#030302]/10 bg-white">
                  <Zap size={16} className="text-[#AF140B] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold">Instant Hotkey</h4>
                    <p className="text-[10px] text-[#030302]/60 mt-0.5">
                      Press <kbd className="px-1 py-0.5 rounded bg-black/5 font-mono text-[9px]">{selectedPlatform === "macos" ? "⌘+Shift+M" : "Win+Shift+M"}</kbd> to record anywhere.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-lg border border-[#030302]/10 bg-white">
                  <Cpu size={16} className="text-[#366CC5] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold">Zero Latency</h4>
                    <p className="text-[10px] text-[#030302]/60 mt-0.5">
                      Sub-100ms transcription with Metal / DirectML hardware acceleration.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-[#030302]/10 bg-[#030302]/5 flex items-center justify-between text-[10px] font-mono text-[#030302]/50">
              <span>SHA-256: 0D520AE5... · NSIS Code Signed</span>
              <a
                href="https://github.com/DhirajK24/MIA-Landing-Page/releases"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#366CC5] inline-flex items-center gap-1"
              >
                Release Notes <ExternalLink size={10} />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

