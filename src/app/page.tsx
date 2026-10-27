"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Check,
  CheckCircle2,
  ChevronRight,
  Code2,
  Command,
  Copy,
  Download,
  FileCheck2,
  FileText,
  FolderOpen,
  Globe2,
  Home,
  Layers3,
  Mail,
  Menu,
  MessageCircle,
  Network,
  Pause,
  Play,
  Plus,
  RefreshCw,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Square,
  Terminal,
  Users,
  Video,
  X,
  Zap,
} from "lucide-react";
import { DownloadButton, DownloadModal } from "./components/DownloadModal";

const navigation = [
  { label: "Product", href: "#product" },
  { label: "System", href: "#system" },
  { label: "Workflow", href: "#workflow" },
  { label: "Integrations", href: "#integrations" },
  { label: "Research", href: "#research" },
];

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const pixelLetters = {
  M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
};

function PixelMark({ blue = false }: { blue?: boolean }) {
  return (
    <svg viewBox="0 0 54 54" aria-hidden="true" className="pixel-mark">
      {[
        [0, 0], [1, 0], [0, 1], [2, 1], [0, 2], [1, 2], [2, 2],
        [1, 3], [2, 3], [1, 4], [2, 4], [1, 5], [2, 5],
      ].map(([x, y], index) => (
        <rect key={index} x={x * 15 + 1} y={y * 8 + 1} width="13" height="6" fill={blue ? "#FEFEF7" : "#030302"} />
      ))}
    </svg>
  );
}

function PixelWordmark({ inverted = false }: { inverted?: boolean }) {
  const cells: Array<{ x: number; y: number; letter: string; index: number }> = [];
  Object.entries(pixelLetters).forEach(([letter, rows], letterIndex) => {
    rows.forEach((row, y) => {
      row.split("").forEach((active, x) => {
        if (active === "1") cells.push({ x, y, letter, index: letterIndex });
      });
    });
  });

  const gradientId = inverted ? "mia-blue-footer" : "mia-blue";

  return (
    <svg className="wordmark" viewBox="0 0 1000 200" role="img" aria-label="MIA">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#366CC5" />
          <stop offset="0.58" stopColor="#366CC5" />
          <stop offset="1" stopColor="#A9B5B9" />
        </linearGradient>
      </defs>
      {cells.map(({ x, y, letter, index }) => (
        <rect
          key={`${letter}-${x}-${y}`}
          x={index * 338 + x * 55}
          y={y * 27}
          width="49"
          height="21"
          fill={
            letter === "M"
              ? (inverted ? "#FEFEF7" : "#030302")
              : letter === "I"
              ? "#366CC5"
              : `url(#${gradientId})`
          }
        />
      ))}
    </svg>
  );
}

function NetworkOrb() {
  const nodes = [
    [76, 62], [120, 30], [170, 73], [205, 37], [243, 92], [182, 132],
    [128, 118], [58, 128], [36, 83], [102, 86], [154, 76], [210, 122],
  ];
  const links = [[0, 1], [0, 9], [0, 8], [1, 2], [1, 3], [2, 4], [2, 9], [2, 10], [3, 10], [4, 5], [4, 11], [5, 6], [5, 11], [6, 7], [6, 9], [7, 8], [8, 9], [9, 10], [10, 11]];
  return (
    <motion.div
      className="network-orb"
      aria-label="Connected meeting intelligence network illustration"
      role="img"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 280 164" aria-hidden="true">
        <circle cx="140" cy="82" r="70" className="orb-ring" />
        <circle cx="140" cy="82" r="48" className="orb-ring orb-ring-inner" />
        {links.map(([from, to], index) => (
          <line key={index} x1={nodes[from][0]} y1={nodes[from][1]} x2={nodes[to][0]} y2={nodes[to][1]} className="orb-line" />
        ))}
        {nodes.map(([x, y], index) => <circle key={index} cx={x} cy={y} r={index % 3 === 0 ? 4 : 2.5} className="orb-node" />)}
        <circle cx="140" cy="82" r="7" className="orb-core" />
      </svg>
      <span className="orb-label">context / 014</span>
    </motion.div>
  );
}

function IntelligenceVisual() {
  return (
    <div className="intelligence-visual">
      <div className="visual-topline"><span>LIVE SIGNAL</span><span>01—03 / 2026</span></div>
      <svg viewBox="0 0 520 690" role="img" aria-label="Abstract red human silhouette built from meeting intelligence signals" className="silhouette-svg">
        <defs>
          <linearGradient id="silhouette-red" x1="0.1" y1="0" x2="0.85" y2="1">
            <stop offset="0" stopColor="#513239" />
            <stop offset="0.42" stopColor="#AF140B" />
            <stop offset="1" stopColor="#030302" />
          </linearGradient>
          <radialGradient id="signal-glow">
            <stop offset="0" stopColor="#AF140B" stopOpacity="0.9" />
            <stop offset="1" stopColor="#AF140B" stopOpacity="0" />
          </radialGradient>
          <clipPath id="silhouette-clip">
            <path d="M253 116c-42 0-69 36-69 83 0 31 11 51 28 64-43 19-73 53-90 100l-63 180h387l-64-180c-17-47-47-81-90-100 17-13 28-33 28-64 0-47-27-83-67-83Z" />
          </clipPath>
        </defs>
        <circle cx="265" cy="325" r="195" fill="url(#signal-glow)" opacity="0.35" />
        <g clipPath="url(#silhouette-clip)">
          <rect width="520" height="690" fill="url(#silhouette-red)" />
          {Array.from({ length: 16 }).map((_, index) => (
            <path key={index} d={`M${-80 + index * 50} 100 L${180 + index * 50} 690`} stroke="#FEFEF7" strokeOpacity={index % 3 === 0 ? "0.2" : "0.08"} strokeWidth={index % 4 === 0 ? "20" : "7"} />
          ))}
          <path d="M60 470 C180 410 210 520 310 442 S430 438 520 380" fill="none" stroke="#366CC5" strokeWidth="4" strokeOpacity="0.8" />
          <path d="M0 260 C125 338 200 230 315 302 S440 366 550 260" fill="none" stroke="#FEFEF7" strokeWidth="2" strokeOpacity="0.7" />
          <g fill="#FEFEF7" opacity="0.8">
            <circle cx="178" cy="280" r="4" /><circle cx="287" cy="360" r="5" /><circle cx="342" cy="225" r="3" /><circle cx="245" cy="510" r="4" /><circle cx="386" cy="488" r="4" />
          </g>
        </g>
        <path d="M253 116c-42 0-69 36-69 83 0 31 11 51 28 64-43 19-73 53-90 100l-63 180h387l-64-180c-17-47-47-81-90-100 17-13 28-33 28-64 0-47-27-83-67-83Z" fill="none" stroke="#FEFEF7" strokeOpacity="0.58" strokeWidth="1" />
        <path d="M36 560H486" stroke="#FEFEF7" strokeOpacity="0.4" />
        <path d="M72 579H264" stroke="#366CC5" strokeWidth="4" />
        <text x="72" y="610" fill="#FEFEF7" fontFamily="monospace" fontSize="10" letterSpacing="2">LISTEN / MAP / ACT</text>
      </svg>
      <div className="visual-caption"><span>meeting intelligence</span><span className="caption-dot" /> <span>human context layer</span></div>
    </div>
  );
}

function Navbar({ onOpenDownload }: { onOpenDownload: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "site-header-scrolled" : ""}`}>
      <a href="#top" className="brand" aria-label="MIA home">
        <span className="brand-mark"><PixelMark /></span>
        <span>MIA<span className="brand-slash">/</span></span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navigation.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
      </nav>
      <div className="header-actions">
        <a href="#footer" className="header-signin">Sign in</a>
        <button
          type="button"
          onClick={onOpenDownload}
          className="button button-dark button-small cursor-pointer"
        >
          Download Software <ArrowUpRight size={14} />
        </button>
      </div>
      <button type="button" className="mobile-menu-button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <AnimatePresence>
        {open && <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mobile-nav" aria-label="Mobile navigation">
          {navigation.map((item) => <a key={item.label} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
          <button
            type="button"
            className="button button-dark w-full justify-center cursor-pointer"
            onClick={() => {
              setOpen(false);
              onOpenDownload();
            }}
          >
            Download Software <ArrowUpRight size={14} />
          </button>
        </motion.nav>}
      </AnimatePresence>
    </header>
  );
}

function Hero({ onOpenDownload }: { onOpenDownload: () => void }) {
  return (
    <section id="top" className="hero">
      <motion.div
        className="hero-intro"
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: easeOutExpo }}
      >
        <span>MEETING INTELLIGENCE / ACTION ENGINE</span>
        <span>PRODUCT 001 / 2026</span>
      </motion.div>
      <motion.div
        className="wordmark-wrap"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.1, ease: easeOutExpo }}
      >
        <PixelWordmark />
      </motion.div>
      <div className="hero-grid">
        <motion.div
          className="hero-column hero-about"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: easeOutExpo }}
        >
          <div className="hero-icon"><PixelMark blue /></div>
          <div className="eyebrow">[01] — about the system</div>
          <h1>Make every<br /><em>conversation</em><br />count.</h1>
          <p className="hero-description">MIA turns the moving parts of a meeting into a clear, living record of what was said, decided, and set in motion.</p>
          <NetworkOrb />
          <div className="column-footnote"><span>01</span><span>Listen deeply.<br />Move clearly.</span></div>
        </motion.div>
        <motion.div
          className="hero-column hero-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.28, ease: easeOutExpo }}
        >
          <IntelligenceVisual />
        </motion.div>
        <motion.div
          className="hero-column hero-value"
          id="start"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.35, ease: easeOutExpo }}
        >
          <div className="eyebrow">[02] — the value layer</div>
          <h2>From noise<br />to <span>next.</span></h2>
          <p>Context-aware intelligence that catches the meaning between the lines and gives your team a reliable place to begin.</p>
          <div className="correction-card">
            <div className="correction-header"><span>CONTEXT CORRECTION</span><span className="status-live"><i />LIVE</span></div>
            <div className="correction-row correction-before"><span>00:14:08</span><s>“send the doc to the whole coarse”</s></div>
            <div className="correction-row correction-after"><span>00:14:08</span><strong>“send the doc to the whole <mark>course</mark>”</strong></div>
            <div className="correction-note"><Sparkles size={12} /> signal resolved from product context</div>
          </div>
          <div className="hero-buttons">
            <button
              type="button"
              onClick={onOpenDownload}
              className="button button-blue cursor-pointer"
            >
              Download Software <Download size={14} />
            </button>
            <a href="#workflow" className="button button-outline">How it works <ArrowDownRight size={15} /></a>
          </div>
          <div className="column-footnote"><span>02</span><span>Built for the<br />conversation after.</span></div>
        </motion.div>
      </div>
      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          SCROLL TO EXPLORE
        </motion.span>
        <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDownRight size={15} />
        </motion.div>
      </motion.div>
    </section>
  );
}

function SignalStrip() {
  return (
    <motion.div
      className="signal-strip"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: easeOutExpo }}
    >
      <span><i className="blue-dot" />SYSTEM ONLINE</span>
      <span><AudioLines size={13} /> LIVE TRANSCRIPTION</span>
      <span><Network size={13} /> CONTEXT GRAPH ACTIVE</span>
      <span><span className="signal-number">04.8</span> SEC TO INSIGHT</span>
    </motion.div>
  );
}

const previewStages = ["recording", "transcript", "summary", "actions"] as const;
type PreviewStage = typeof previewStages[number];

const previewStageLabels: Record<PreviewStage, string> = {
  recording: "Record",
  transcript: "Transcribe",
  summary: "Understand",
  actions: "Act",
};

function ProductPreview() {
  const [stage, setStage] = useState<PreviewStage>("recording");
  const [paused, setPaused] = useState(false);
  const stageIndex = previewStages.indexOf(stage);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reducedMotion) return;
    const timer = window.setInterval(() => {
      setStage((current) => previewStages[(previewStages.indexOf(current) + 1) % previewStages.length]);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [paused]);

  const railItems = [
    { label: "Home", icon: Home, target: "recording" as PreviewStage },
    { label: "Meeting notes", icon: FileText, target: "transcript" as PreviewStage },
    { label: "Action register", icon: FileCheck2, target: "actions" as PreviewStage },
  ];

  return (
    <section id="product" className="product-preview-section">
      <motion.div
        className="product-preview-heading"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: easeOutExpo }}
      >
        <div>
          <span className="section-index">PRODUCT / 001 — THE ACTUAL WORKSPACE</span>
          <h2>A closer look<br />at <em>the signal.</em></h2>
        </div>
        <p>The landing page should feel like the product: calm at first glance, precise when you lean in. Press a step or let MIA move through the full meeting workflow.</p>
      </motion.div>
      <motion.div
        className="workflow-ribbon"
        role="tablist"
        aria-label="MIA workflow stages"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, delay: 0.1, ease: easeOutExpo }}
      >
        {previewStages.map((item, index) => (
          <button key={item} type="button" role="tab" aria-selected={stage === item} className={stage === item ? "active" : ""} onClick={() => setStage(item)}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <i />
            {previewStageLabels[item]}
            {index < previewStages.length - 1 && <ArrowRight size={13} />}
          </button>
        ))}
      </motion.div>
      <motion.div
        className="app-window"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.75, delay: 0.15, ease: easeOutExpo }}
      >
        <div className="app-window-header"><div className="app-window-brand"><span className="app-window-logo"><PixelMark blue /></span><strong>MIA</strong><span>/ meeting intelligence</span></div><div className="app-window-status"><i /> local workspace <span>v0.4.1</span></div></div>
        <div className="app-window-body">
          <aside className="app-sidebar">
            <div className="app-sidebar-search"><Search size={14} /><span>Search meeting content...</span></div>
            <div className="app-sidebar-nav">{railItems.map((item) => <button type="button" key={item.label} onClick={() => setStage(item.target)} className={stage === item.target || (item.target === "transcript" && stage === "summary") ? "active" : ""}><item.icon size={15} /><span>{item.label}</span></button>)}</div>
            <div className="app-meeting-list"><span className="app-sidebar-label">MEETING NOTES</span>{["Product Feature Prioritization", "Security and Product Planning", "Helicopter Usage, Costs"].map((meeting, index) => <button type="button" key={meeting} className={index === 0 ? "selected" : ""} onClick={() => setStage(index === 0 ? "summary" : "transcript")}><FileText size={13} /><span>{meeting}</span></button>)}</div>
            <div className="app-sidebar-actions"><button type="button" className="record-button" onClick={() => setStage("recording")}><AudioLines size={15} /> Start recording</button><button type="button" className="import-button" onClick={() => setStage("transcript")}><FolderOpen size={15} /> Import audio</button><button type="button"><Settings size={15} /> Settings</button></div>
          </aside>
          <div className="app-content">
            <div className="app-content-top"><span className="app-breadcrumb">Meeting notes <ChevronRight size={12} /> 20_10_26_09_01_47</span><div className="app-content-tools"><button type="button"><Copy size={13} /> Copy</button><button type="button"><FolderOpen size={13} /> Recording</button><button type="button"><Users size={13} /> Speakers</button><button type="button"><RefreshCw size={13} /> Enhance</button><button type="button" className="app-primary-tool"><Sparkles size={13} /> Generate summary</button></div></div>
            <div className="app-stage" aria-live="polite">
              <AnimatePresence mode="wait">
                {stage === "recording" && <motion.div key="recording" className="app-stage-recording" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .35 }}><div className="recording-banner"><i /> Recording <span>00:10</span></div><div className="recording-empty"><div className="recording-wave" aria-hidden="true"><svg viewBox="0 0 900 220" preserveAspectRatio="none"><path d="M-40 130 C90 15 200 42 318 138 S510 265 640 126 S820 12 940 112" /><path d="M-40 155 C90 42 205 74 325 158 S510 278 640 150 S820 45 940 135" /><path d="M-40 99 C90 -4 215 20 328 110 S505 224 630 99 S820 -4 940 84" /></svg></div><div className="listening-orb"><motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} /></div><strong>Listening for speech...</strong><span>Speak to see live transcription</span><div className="audio-bars">{Array.from({ length: 28 }).map((_, index) => <motion.i key={index} animate={{ scaleY: [.25, .55 + ((index * 13) % 50) / 100, .3] }} transition={{ duration: .7 + (index % 4) * .1, repeat: Infinity, delay: index * .025 }} />)}</div></div><div className="recording-controls"><button type="button"><Pause size={14} /></button><button type="button" className="stop-recording" onClick={() => setStage("transcript")}><Square size={13} fill="currentColor" /></button><span><i /> live capture</span></div></motion.div>}
                {stage === "transcript" && <motion.div key="transcript" className="app-stage-transcript" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} transition={{ duration: .35 }}><div className="transcript-header"><span><i /> Recording <strong>00:38</strong></span><button type="button"><Copy size={13} /> Copy transcript</button></div><div className="live-transcript-lines">{[["00:04", "Right. Like if we were any other company when we started a beta program in this last year, what would we be announcing?"], ["00:17", "What do you think, Cindy?"], ["00:20", "Yeah, I think I was inclined to group some things to say like"], ["00:25", "Vulnerability management because there were tiny little N V Cs all the way along, but if you look at over the course of the year..."]].map(([time, text], index) => <motion.div className={index === 3 ? "transcript-highlight" : ""} key={time} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .12 }}><span>{time}</span><p>{text}</p></motion.div>)}</div><div className="transcript-listening"><i /> Listening...</div></motion.div>}
                {stage === "summary" && <motion.div key="summary" className="app-stage-summary" initial={{ opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.01 }} transition={{ duration: .35 }}><div className="report-header"><div><span className="app-kicker">MEETING REPORT</span><h3>Product Feature Prioritization</h3><p>Generated from 42 minutes of conversation · 6 participants</p></div><button type="button" className="app-primary-tool"><Sparkles size={13} /> Regenerate</button></div><div className="report-split"><div className="report-transcript-mini"><span>TRANSCRIPT / 00:37</span><p>“Let&apos;s go with vulnerability management for now. I would agree on that one.”</p><small>Decision signal detected</small></div><div className="report-summary-prose"><span>EXECUTIVE SUMMARY</span><strong>Vulnerability management is the top priority for the next product cycle.</strong><p>The team aligned on a narrower feature story and a clearer competitor lens.</p></div></div><div className="report-grid"><div className="report-card"><span>DECISIONS</span><strong>03</strong><p>captured and linked to the transcript</p></div><div className="report-card"><span>ACTION ITEMS</span><strong>05</strong><p>owners and due dates detected</p></div></div><div className="report-footer"><span><CheckCircle2 size={14} /> summary is ready</span><button type="button" onClick={() => setStage("actions")}>View action register <ArrowRight size={13} /></button></div></motion.div>}
                {stage === "actions" && <motion.div key="actions" className="app-stage-actions" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} transition={{ duration: .35 }}><div className="report-header"><div><span className="app-kicker">ACTION REGISTER</span><h3>What happens next</h3><p>Tasks extracted from the conversation and ready to route.</p></div><button type="button" className="app-send-button"><Send size={13} /> Send to team</button></div><div className="task-list">{[["Select Vulnerability Management as the top priority", "Dhruvin", "Tuesday"], ["Filter competitors relevant to product stages", "Hitesh", "Wednesday"], ["Update the launch brief with the new narrative", "Dhiraj", "Friday"]].map(([task, owner, due], index) => <div className="task-row" key={task}><span className="task-check"><Check size={12} /></span><div><strong>{task}</strong><span>{owner} · due {due}</span></div><span className="task-index">0{index + 1}</span></div>)}</div><div className="report-footer"><span><Users size={14} /> 3 recipients · individual delivery</span><button type="button" onClick={() => setStage("recording")}>Start another meeting <ArrowRight size={13} /></button></div></motion.div>}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="app-window-footer"><span><i /> {previewStageLabels[stage]} mode</span><span>{paused ? "paused on hover" : `auto-playing / ${stageIndex + 1} of ${previewStages.length}`}</span></div>
      </motion.div>
    </section>
  );
}

function ContextSection() {
  return (
    <section id="system" className="section context-section">
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: easeOutExpo }}
      >
        <div>
          <span className="section-index">01 / CONTEXT ENGINE</span>
          <h2>It hears what<br /><em>you mean.</em></h2>
        </div>
        <p>Transcription is the starting point. MIA reads the intent, terminology, and trajectory of a conversation to make the record useful.</p>
      </motion.div>
      <div className="context-grid">
        <motion.div
          className="transcript-stack"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.1, ease: easeOutExpo }}
        >
          <div className="transcript-panel transcript-raw">
            <div className="panel-top"><span><X size={13} /> raw transcript</span><span>00:14:08</span></div>
            <p>“We should send the doc to the whole <span className="red-underline">coarse</span> before the review.”</p>
            <div className="panel-meta">low confidence / acoustic match</div>
          </div>
          <div className="transcript-connector"><span>context layer</span><ArrowDownRight size={16} /></div>
          <div className="transcript-panel transcript-clean">
            <div className="panel-top"><span><Check size={13} /> MIA corrected</span><span>00:14:08</span></div>
            <p>“We should send the doc to the whole <strong>course</strong> before the review.”</p>
            <div className="panel-meta blue-text">resolved / product vocabulary + thread history</div>
          </div>
        </motion.div>
        <motion.div
          className="context-detail"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.2, ease: easeOutExpo }}
        >
          <motion.div
            className="detail-orbit"
            initial={{ scale: 0.88, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.25, ease: easeOutExpo }}
          >
            <div className="orbit-center"><Sparkles size={20} /></div>
            <span className="orbit-tag tag-one">intent</span>
            <span className="orbit-tag tag-two">memory</span>
            <span className="orbit-tag tag-three">tone</span>
            <span className="orbit-tag tag-four">terms</span>
          </motion.div>
          <div className="detail-list">
            {[
              { num: "01", title: "Semantic intent", desc: "Finds the decision inside the sentence." },
              { num: "02", title: "Contextual memory", desc: "Brings earlier conversations into focus." },
              { num: "03", title: "Human-readable output", desc: "Preserves how your team actually works." },
            ].map((item, index) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: 0.3 + index * 0.1, ease: easeOutExpo }}
              >
                <span>{item.num}</span>
                <strong>{item.title}</strong>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const extractionItems = [
  { number: "01", label: "Decision", text: "Ship the new onboarding flow", icon: CheckCircle2 },
  { number: "02", label: "Owner", text: "Jordan / Product", icon: Users },
  { number: "03", label: "Deadline", text: "Friday, 28 November", icon: Zap },
];

function ActionSection() {
  return (
    <section className="section action-section">
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: easeOutExpo }}
      >
        <div>
          <span className="section-index">02 / ACTION EXTRACTION</span>
          <h2>A meeting<br />that <em>moves.</em></h2>
        </div>
        <p>Every useful conversation leaves a trail. MIA makes the trail visible, assigns the next step, and keeps the signal moving.</p>
      </motion.div>
      <div className="action-grid">
        <motion.div
          className="action-visual"
          initial={{ opacity: 0, scale: 0.96, y: 25 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.1, ease: easeOutExpo }}
        >
          <div className="action-visual-top">
            <span>WEEKLY PRODUCT REVIEW</span>
            <span>4 PARTICIPANTS / 42:16</span>
          </div>
          <div className="waveform">
            {Array.from({ length: 42 }).map((_, index) => (
              <i key={index} style={{ height: `${18 + ((index * 17) % 52)}%` }} />
            ))}
          </div>
          <div className="action-visual-bottom">
            <span className="play-circle"><Play size={11} fill="currentColor" /></span>
            <span>00:18:42 / 42:16</span>
            <span className="visual-tag">ANALYZING <i /></span>
          </div>
          <div className="action-scan" />
        </motion.div>
        <div className="extraction-list">
          {extractionItems.map((item, index) => (
            <motion.div
              className="extraction-item"
              key={item.number}
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.15 + index * 0.1, ease: easeOutExpo }}
            >
              <span className="item-number">{item.number}</span>
              <div className="item-icon"><item.icon size={16} /></div>
              <div><span>{item.label}</span><strong>{item.text}</strong></div>
              <ChevronRight size={16} />
            </motion.div>
          ))}
          <motion.div
            className="extraction-footer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <span><Sparkles size={14} /> 08 signals extracted</span>
            <a href="#console">Open the console <ArrowUpRight size={13} /></a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const features = [
  { icon: AudioLines, title: "Live transcription", text: "An accurate, searchable record while the room is still talking." },
  { icon: Layers3, title: "Decision mapping", text: "Separate decisions, questions, risks, and ideas as they surface." },
  { icon: Send, title: "Action routing", text: "Send the right task to the right tool, with an owner and a date." },
  { icon: Search, title: "Thread memory", text: "Search the connected history of your meetings, not just a file." },
  { icon: ShieldCheck, title: "Private by design", text: "Control what is captured, shared, retained, and remembered." },
  { icon: Code2, title: "Open signals", text: "A clean API for the systems and workflows you already trust." },
];

function FeatureSection() {
  return (
    <section className="section feature-section">
      <motion.div
        className="section-heading compact-heading"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: easeOutExpo }}
      >
        <div>
          <span className="section-index">03 / THE TOOLKIT</span>
          <h2>Small details.<br /><em>Big clarity.</em></h2>
        </div>
        <a href="#integrations" className="text-link">Explore the system <ArrowUpRight size={14} /></a>
      </motion.div>
      <div className="feature-grid">
        {features.map((feature, index) => (
          <motion.article
            className={`feature-card ${index === 1 ? "feature-card-blue" : ""}`}
            key={feature.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.5,
              delay: (index % 3) * 0.1 + Math.floor(index / 3) * 0.08,
              ease: easeOutExpo,
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className="feature-card-top">
              <span>0{index + 1}</span>
              <feature.icon size={18} />
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
            <ArrowUpRight className="feature-arrow" size={17} />
          </motion.article>
        ))}
      </div>
    </section>
  );
}

const consoleTabs = {
  input: { label: "01 / INPUT", title: "Meeting input", lines: ["meeting: weekly product review", "date: 28 nov 2026", "participants: 04", "source: stream_092.mp3", "status: listening..."] },
  transcript: { label: "02 / TRANSCRIPT", title: "Raw transcript", lines: ["> jordan: the new course should be", "> ready for review by friday", "> priya: i'll take the interface", "> action detected: 02"] },
  analysis: { label: "03 / ANALYSIS", title: "AI analysis", lines: ["+ decision: ship onboarding flow", "+ task: complete course copy", "+ owner: jordan", "+ deadline: friday", "+ confidence: 98.4%"] },
  tasks: { label: "04 / OUTPUT", title: "Action register", lines: ["[created] / jordan / course copy", "[created] / priya / interface review", "[linked] / product / launch brief", "sync: complete"] },
};

function ConsoleSection() {
  const [activeTab, setActiveTab] = useState<keyof typeof consoleTabs>("analysis");
  const active = consoleTabs[activeTab];
  return (
    <section id="console" className="console-section">
      <motion.div
        className="console-intro"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: easeOutExpo }}
      >
        <span className="section-index">04 / PROCESSING CONSOLE</span>
        <h2>See the signal<br /><em>become structure.</em></h2>
        <p>One meeting. Four useful views. Move from a live room to a clear next step without losing the texture of the conversation.</p>
      </motion.div>
      <motion.div
        className="console-window"
        initial={{ opacity: 0, y: 35, scale: 0.99 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.75, delay: 0.15, ease: easeOutExpo }}
      >
        <div className="console-bar">
          <div className="window-dots"><i /><i /><i /></div>
          <span className="console-file"><Terminal size={13} /> mia / processor / session-092</span>
          <span className="console-live"><i /> connected</span>
        </div>
        <div className="console-body">
          <div className="console-tabs">
            {(Object.keys(consoleTabs) as Array<keyof typeof consoleTabs>).map((tab) => (
              <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={activeTab === tab ? "active" : ""}>
                <span>{consoleTabs[tab].label}</span>
                <ChevronRight size={13} />
              </button>
            ))}
          </div>
          <div className="console-output">
            <div className="output-heading">
              <span>{active.title}</span>
              <span>RUNNING <i /></span>
            </div>
            <div className="code-lines">
              {active.lines.map((line, index) => (
                <div key={line}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <code className={line.startsWith("+") || line.startsWith("[") ? "code-blue" : ""}>{line}</code>
                </div>
              ))}
            </div>
            <div className="output-footer">
              <span><span className="prompt">$</span> mia process --context=full</span>
              <span>00:00:04.8</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

const integrations = [
  { name: "Google Meet", icon: Video, type: "meet" },
  { name: "Zoom", icon: Video, type: "zoom" },
  { name: "Slack", icon: MessageCircle, type: "slack" },
  { name: "Jira", icon: Layers3, type: "jira" },
  { name: "Notion", icon: FileText, type: "notion" },
  { name: "Email", icon: Mail, type: "email" },
];

function IntegrationSection() {
  return (
    <section id="integrations" className="section integration-section">
      <motion.div
        className="integration-heading"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: easeOutExpo }}
      >
        <span className="section-index">05 / CONNECTED TISSUE</span>
        <h2>Works where<br /><em>work happens.</em></h2>
        <p>Bring MIA into the places where your team already makes decisions. Every signal can keep moving.</p>
      </motion.div>
      <div className="integration-grid">
        {integrations.map((integration, index) => (
          <motion.a
            href="#start"
            className="integration-card"
            key={integration.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: index * 0.07, ease: easeOutExpo }}
            whileHover={{ y: -3, transition: { duration: 0.15 } }}
          >
            <div className={`integration-logo logo-${integration.type}`}><integration.icon size={19} /></div>
            <div>
              <strong>{integration.name}</strong>
              <span>{index < 5 ? "connected" : "available"}</span>
            </div>
            <ArrowUpRight size={15} />
          </motion.a>
        ))}
      </div>
      <motion.div
        className="integration-note"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Command size={15} /> <span>+ your stack</span>
        <span className="integration-rule" />
        <span className="mono-text">API / WEBHOOK / EXPORT</span>
      </motion.div>
    </section>
  );
}

function WorkflowSection() {
  const rows = [
    ["Capture", "notes scattered across tabs", "one living meeting record"],
    ["Understand", "manual clean-up & guessing", "context-aware correction"],
    ["Move", "follow-up becomes another meeting", "actions routed automatically"],
  ];
  return (
    <section id="workflow" className="workflow-section">
      <motion.div
        className="workflow-heading"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: easeOutExpo }}
      >
        <span className="section-index">06 / WORKFLOW COMPARISON</span>
        <h2>The old way<br /><span>stops here.</span></h2>
        <p>Less administrative gravity. More momentum after the call ends.</p>
      </motion.div>
      <div className="comparison-table">
        <motion.div
          className="comparison-head"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
        >
          <span>THE WORK</span>
          <span>WITHOUT MIA</span>
          <span>WITH MIA</span>
        </motion.div>
        {rows.map((row, index) => (
          <motion.div
            className="comparison-row"
            key={row[0]}
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.12, ease: easeOutExpo }}
          >
            <strong><span>0{index + 1}</span>{row[0]}</strong>
            <span className="old-way">{row[1]}</span>
            <span className="new-way"><Check size={14} />{row[2]}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ResearchSection() {
  return (
    <section id="research" className="section research-section">
      <motion.div
        className="research-copy"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: easeOutExpo }}
      >
        <span className="section-index">07 / RESEARCH NOTES</span>
        <h2>Better records<br />make <em>better rooms.</em></h2>
        <p>MIA is built around a simple idea: the quality of the next decision depends on the quality of the last one. We measure the distance between the two.</p>
        <a href="#footer" className="text-link">Read the field notes <ArrowUpRight size={14} /></a>
      </motion.div>
      <div className="metrics-grid">
        {[
          { stat: "98.4", unit: "%", desc: "context resolution\nacross product terms" },
          { stat: "04.8", unit: "s", desc: "average time\nto a first insight" },
          { stat: "3.2", unit: "x", desc: "more actions\nclosed after meetings" },
        ].map((item, index) => (
          <motion.div
            key={item.stat}
            initial={{ opacity: 0, scale: 0.94, y: 22 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: easeOutExpo }}
          >
            <span>{item.stat}<small>{item.unit}</small></span>
            <p>{item.desc.split("\n").map((line, i) => <span key={i}>{line}{i === 0 ? <br /> : null}</span>)}</p>
          </motion.div>
        ))}
        <motion.div
          className="metric-stamp"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="stamp-mark"><PixelMark blue /></div>
          <span>FIELD NOTE<br />NO. 014</span>
        </motion.div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const questions = [
    ["Does MIA record audio or video?", "MIA connects to supported meeting streams and gives teams control over what is captured and retained."],
    ["Can I correct a transcript?", "Yes. MIA keeps the source record and lets you edit, comment, or teach the context layer new vocabulary."],
    ["Where does my data go?", "Data is encrypted in transit and at rest, with configurable retention and enterprise deployment options."],
    ["What happens after the meeting?", "MIA turns the conversation into a clear summary, decisions, and assigned follow-ups that can sync to your existing tools."],
  ];
  return (
    <section className="faq-section">
      <motion.div
        className="faq-title"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: easeOutExpo }}
      >
        <span className="section-index">08 / QUESTIONS</span>
        <h2>Good to<br /><em>know.</em></h2>
      </motion.div>
      <div className="faq-list">
        {questions.map(([question, answer], index) => (
          <motion.div
            className={`faq-item ${open === index ? "faq-open" : ""}`}
            key={question}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: index * 0.08, ease: easeOutExpo }}
          >
            <button type="button" onClick={() => setOpen(open === index ? null : index)} aria-expanded={open === index}>
              <span>{question}</span>
              {open === index ? <X size={17} /> : <Plus size={17} />}
            </button>
            <AnimatePresence>
              {open === index && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {answer}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FinalCTA({ onOpenDownload }: { onOpenDownload: () => void }) {
  return (
    <section className="final-cta">
      <motion.div
        className="final-cta-mark"
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: easeOutExpo }}
      >
        <PixelMark blue />
      </motion.div>
      <motion.span
        className="section-index"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        READY WHEN YOU ARE
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.15, ease: easeOutExpo }}
      >
        Make the next<br /><em>meeting matter.</em>
      </motion.h2>
      <motion.button
        type="button"
        onClick={onOpenDownload}
        className="button button-blue cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        Download MIA Software <Download size={15} />
      </motion.button>
    </section>
  );
}

function Footer() {
  return (
    <motion.footer
      id="footer"
      className="site-footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="footer-top">
        <div className="footer-brand">
          <a href="#top" className="brand footer-logo">
            <span className="brand-mark"><PixelMark blue /></span>
            <span>MIA<span className="brand-slash">/</span></span>
          </a>
          <p>Meeting intelligence for the work that happens next.</p>
        </div>
        <div className="footer-nav">
          <div>
            <span>Explore</span>
            <a href="#system">System</a>
            <a href="#workflow">Workflow</a>
            <a href="#integrations">Integrations</a>
          </div>
          <div>
            <span>Connect</span>
            <a href="#start">Start a session</a>
            <a href="#research">Research notes</a>
            <a href="mailto:hello@mia.engine">hello@mia.engine</a>
          </div>
          <div>
            <span>Elsewhere</span>
            <Link href="/logo">Brand & Logos <ArrowUpRight size={12} /></Link>
            <a href="#footer">Privacy</a>
            <a href="#footer">Terms</a>
            <a href="#footer">Status <ArrowUpRight size={12} /></a>
          </div>
        </div>
      </div>
      <div className="footer-wordmark"><PixelWordmark inverted /></div>
      <div className="footer-bottom">
        <span>© 2026 MIA ENGINE / ALL SIGNALS RESERVED</span>
        <span>MADE FOR THE CONVERSATION AFTER</span>
        <span><Globe2 size={13} /> 37° 46′ 30″ N</span>
      </div>
    </motion.footer>
  );
}

export default function LandingPage() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  return (
    <div className="mia-page">
      <Navbar onOpenDownload={() => setDownloadModalOpen(true)} />
      <main>
        <Hero onOpenDownload={() => setDownloadModalOpen(true)} />
        <SignalStrip />
        <ProductPreview />
        <ContextSection />
        <ActionSection />
        <FeatureSection />
        <ConsoleSection />
        <IntegrationSection />
        <WorkflowSection />
        <ResearchSection />
        <FAQ />
        <FinalCTA onOpenDownload={() => setDownloadModalOpen(true)} />
      </main>
      <Footer />
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />
    </div>
  );
}
