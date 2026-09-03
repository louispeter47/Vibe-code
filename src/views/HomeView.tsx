import React, { useState } from "react";
import { NavigationPage } from "../types";
import { SAMPLE_TARGETS, THREAT_VECTORS } from "../data/mockData";
import { evaluateForensicTarget } from "../utils/analyzer";
import {
  Shield,
  Search,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Radio,
  FileSearch,
  Cpu,
  Layers,
  ExternalLink,
  MapPin,
  Sparkles,
  PhoneCall,
} from "lucide-react";

interface HomeViewProps {
  onNavigate: (page: NavigationPage) => void;
  onAnalyzeTarget: (target: string) => void;
  onOpenReportModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onAnalyzeTarget,
  onOpenReportModal,
}) => {
  const [interceptorType, setInterceptorType] = useState<"url" | "phone">("url");
  const [interceptorInput, setInterceptorInput] = useState("");
  const [interceptorPreview, setInterceptorPreview] = useState<{
    analyzed: boolean;
    status: string;
    risk: number;
    target: string;
  } | null>(null);

  const handleRunInterceptor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!interceptorInput.trim()) return;

    const evalResult = evaluateForensicTarget(interceptorInput.trim());

    setInterceptorPreview({
      analyzed: true,
      target: interceptorInput.trim(),
      status: evalResult.statusLabel,
      risk: evalResult.scamRiskIndex,
    });
  };

  const handleFullConsoleDeepDive = () => {
    if (interceptorInput.trim()) {
      onAnalyzeTarget(interceptorInput.trim());
    } else {
      onNavigate("scam-checker");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-12 sm:space-y-20 pb-16">
      {/* Active Sentinel Feed Ticker */}
      <section
        id="sentinel-ticker"
        className="bg-[#edf4ff] border-y border-[#c0c7d6]/40 py-2.5 px-4 overflow-hidden select-none"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#186a22] animate-ping"></span>
            <span className="font-bold text-[#005cab] uppercase tracking-wider">
              SENTINEL FEED:
            </span>
          </div>
          <div className="truncate text-[#404753] flex-1 text-center sm:text-left">
            <span className="font-semibold text-[#b51a1e] mr-2">[ALERT UG-2026-441]</span>
            <span>Active WhatsApp fake parcel collection bot spreading across Kampala & Entebbe.</span>
          </div>
          <button
            onClick={() => {
              onNavigate("scam-checker");
            }}
            className="hidden sm:inline-flex items-center gap-1 text-[#005cab] hover:underline font-bold"
          >
            <span>Open Threat Scanner</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </section>

      {/* Hero Section */}
      <section id="hero-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Hero Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#d4e3ff] text-[#004786] rounded-full text-xs font-mono font-bold tracking-wide border border-[#a5c8ff]">
              <Radio className="w-3.5 h-3.5 animate-pulse text-[#005cab]" />
              <span>OPERATIONAL DEFENSE v4.2 • EAST AFRICA SOVEREIGN NODE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black text-[#131c25] leading-[1.1] tracking-tight font-['Hanken_Grotesk']">
              Intelligent cyber defense against predatory syndicates.
            </h1>

            <p className="text-base sm:text-lg text-[#404753] leading-relaxed max-w-2xl font-normal">
              ScamAdvisor empowers citizens to verify suspicious web links, mobile money handles, and fake
              investment portals in real-time. Stand firm against the advance-fee scams, bogus trading bots,
              and romance extortion schemes of "Yahoo Boys" across East Africa and worldwide.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-start-check-btn"
                onClick={() => {
                  onNavigate("scam-checker");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#005cab] hover:bg-[#004786] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] text-base"
              >
                <Search className="w-5 h-5" />
                <span>Start Scam Check</span>
              </button>
              <button
                id="hero-read-mission-btn"
                onClick={() => {
                  onNavigate("about-us");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#e6effb] hover:bg-[#dae3f0] text-[#005cab] font-bold rounded-xl transition-colors text-base border border-[#c0c7d6]/50"
              >
                <span>Read Our Mission</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Zero-Log Protocol Badge */}
            <div className="p-3.5 bg-[#f7fff1] rounded-xl border border-[#358438]/20 flex items-center gap-3 text-xs text-[#186a22]">
              <Lock className="w-4 h-4 text-[#186a22] flex-shrink-0" />
              <span className="font-mono font-medium">
                Zero-Log Protocol: 100% Client-Side Privacy / Cryptographic Threat Verification
              </span>
            </div>

            {/* 3 Metric Cards */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
              <div className="p-4 bg-white rounded-xl border border-[#c0c7d6]/50 shadow-sm">
                <div className="text-xl sm:text-2xl font-black text-[#005cab] font-mono">100%</div>
                <div className="text-xs font-semibold text-[#131c25] mt-0.5">Free & Public</div>
                <div className="text-[11px] text-[#404753] mt-0.5">Zero monetization</div>
              </div>
              <div className="p-4 bg-white rounded-xl border border-[#c0c7d6]/50 shadow-sm">
                <div className="text-xl sm:text-2xl font-black text-[#186a22] font-mono">0 Log</div>
                <div className="text-xs font-semibold text-[#131c25] mt-0.5">Zero-Knowledge</div>
                <div className="text-[11px] text-[#404753] mt-0.5">Instant memory triage</div>
              </div>
              <div className="p-4 bg-white rounded-xl border border-[#c0c7d6]/50 shadow-sm">
                <div className="text-xl sm:text-2xl font-black text-[#b51a1e] font-mono">8.4M+</div>
                <div className="text-xs font-semibold text-[#131c25] mt-0.5">Def-Index Records</div>
                <div className="text-[11px] text-[#404753] mt-0.5">Syndicate blacklists</div>
              </div>
            </div>
          </div>

          {/* Hero Right Column: Vector Scanner Visualizer Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-[#c0c7d6]/60 relative overflow-hidden space-y-5">
              <div className="flex items-center justify-between border-b border-[#c0c7d6]/40 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#b51a1e] animate-pulse"></div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#131c25]">
                    VECTOR SCANNER RADAR
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#005cab] bg-[#edf4ff] px-2 py-0.5 rounded border border-[#a5c8ff]/40">
                  NODE: UG-KLA-01
                </span>
              </div>

              {/* Lottie Animation Radar */}
              <div className="relative w-full aspect-square max-h-[300px] flex items-center justify-center bg-[#131c25] rounded-xl overflow-hidden shadow-inner">
                <iframe
                  src="https://lottie.host/embed/53ef6fb5-8875-4b5f-81e1-cb4006aa8c7c/P0U9eYRek3.lottie"
                  className="w-full h-full border-0 pointer-events-none opacity-90 scale-105"
                  title="ScamAdvisor Vector Scanner Animation"
                ></iframe>
                <div className="absolute top-3 left-3 bg-[#131c25]/80 backdrop-blur-md px-2.5 py-1 rounded border border-[#a5c8ff]/30 text-[10px] font-mono text-[#a5c8ff]">
                  REAL-TIME SWEEP: ACTIVE
                </div>
                <div className="absolute bottom-3 right-3 bg-[#131c25]/80 backdrop-blur-md px-2.5 py-1 rounded border border-[#88d982]/30 text-[10px] font-mono text-[#88d982]">
                  TELEMETRY: SYNCHRONIZED
                </div>
              </div>

              {/* Live Scanner Metrics */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div className="p-2.5 bg-[#edf4ff] rounded-lg">
                  <span className="text-[#404753] block text-[10px]">Response Time</span>
                  <strong className="text-[#005cab] text-sm font-bold">240ms</strong>
                </div>
                <div className="p-2.5 bg-[#edf4ff] rounded-lg">
                  <span className="text-[#404753] block text-[10px]">Heuristics</span>
                  <strong className="text-[#005cab] text-sm font-bold">14 Rules</strong>
                </div>
                <div className="p-2.5 bg-[#ffdad6] rounded-lg border border-[#ffb4ac]/50">
                  <span className="text-[#93000e] block text-[10px]">Signatures</span>
                  <strong className="text-[#93000e] text-sm font-bold">1 Match</strong>
                </div>
              </div>

              <div className="text-xs text-[#404753] leading-relaxed bg-[#f7f9ff] p-3 rounded-lg border border-[#c0c7d6]/40">
                Cross-checks automated domain lookup registries, WHOIS privacy masks, international
                anti-fraud honeypots, and East African syndicate blacklist hashes.
              </div>

              <button
                onClick={() => {
                  onNavigate("scam-checker");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full py-2.5 bg-[#005cab] hover:bg-[#004786] text-white text-xs font-bold font-mono uppercase tracking-wider rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span>Launch Full Verification Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Threat Interceptor Component */}
      <section id="threat-interceptor" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#e6effb] to-[#edf4ff] rounded-3xl p-6 sm:p-10 border border-[#c0c7d6]/70 shadow-lg space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#005cab] bg-white/80 px-3 py-1 rounded-full border border-[#a5c8ff]">
                Live Threat Interceptor
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#131c25] mt-2 font-['Hanken_Grotesk']">
                Instant Threat Screening
              </h2>
              <p className="text-sm text-[#404753] mt-1">
                Enter any web domain, payment gateway link, or suspicious contact to test instantly.
              </p>
            </div>

            {/* Segmented Switcher */}
            <div className="flex items-center bg-white p-1 rounded-xl border border-[#c0c7d6]/60 shadow-sm self-start md:self-center">
              <button
                type="button"
                onClick={() => {
                  setInterceptorType("url");
                  setInterceptorInput("");
                  setInterceptorPreview(null);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  interceptorType === "url"
                    ? "bg-[#005cab] text-white"
                    : "text-[#404753] hover:text-[#131c25]"
                }`}
              >
                Network URL / Domain
              </button>
              <button
                type="button"
                onClick={() => {
                  setInterceptorType("phone");
                  setInterceptorInput("");
                  setInterceptorPreview(null);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  interceptorType === "phone"
                    ? "bg-[#005cab] text-white"
                    : "text-[#404753] hover:text-[#131c25]"
                }`}
              >
                Phone / Telegram Handle
              </button>
            </div>
          </div>

          {/* Quick Preset Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-mono text-[#404753] font-semibold">Presets:</span>
            {SAMPLE_TARGETS.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setInterceptorInput(sample.value);
                  setInterceptorPreview(null);
                }}
                className="text-xs px-2.5 py-1 bg-white hover:bg-[#d4e3ff] text-[#005cab] border border-[#c0c7d6]/60 rounded-lg transition-colors font-mono"
              >
                {sample.label}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleRunInterceptor} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#707785]" />
              <input
                type="text"
                value={interceptorInput}
                onChange={(e) => {
                  setInterceptorInput(e.target.value);
                  setInterceptorPreview(null);
                }}
                placeholder={
                  interceptorType === "url"
                    ? "e.g. http://fx-arbitrage-payout-vault.net/app-download.apk"
                    : "e.g. +234 812 991 4302 or @vault_payout_bot"
                }
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#c0c7d6] rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#005cab] shadow-sm text-[#131c25]"
              />
            </div>
            <button
              type="submit"
              disabled={!interceptorInput.trim()}
              className="px-6 py-3.5 bg-[#005cab] hover:bg-[#004786] disabled:opacity-50 text-white font-bold rounded-xl transition-colors text-sm shadow-sm flex items-center justify-center gap-2 flex-shrink-0"
            >
              <Cpu className="w-4 h-4" />
              <span>Triage Target</span>
            </button>
          </form>

          {/* Inline Triage Result Banner */}
          {interceptorPreview && (
            <div
              className={`p-5 rounded-2xl border transition-all animate-in fade-in duration-200 ${
                interceptorPreview.risk > 50
                  ? "bg-[#ffdad6] border-[#ffb4ac] text-[#93000e]"
                  : "bg-[#f7fff1] border-[#88d982] text-[#186a22]"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {interceptorPreview.risk > 50 ? (
                      <AlertTriangle className="w-5 h-5 text-[#b51a1e]" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-[#186a22]" />
                    )}
                    <span className="font-bold text-base font-['Hanken_Grotesk']">
                      {interceptorPreview.status}
                    </span>
                  </div>
                  <div className="font-mono text-xs opacity-90 break-all">
                    Evaluated Target: {interceptorPreview.target}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs font-mono block">Scam Risk</span>
                    <strong className="text-2xl font-black font-mono">
                      {interceptorPreview.risk}%
                    </strong>
                  </div>
                  <button
                    type="button"
                    onClick={handleFullConsoleDeepDive}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase font-mono tracking-wider transition-all shadow-sm ${
                      interceptorPreview.risk > 50
                        ? "bg-[#b51a1e] hover:bg-[#93000e] text-white"
                        : "bg-[#186a22] hover:bg-[#002204] text-white"
                    }`}
                  >
                    Inspect Full Forensic Dossier
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How ScamAdvisor Protects You (3 Steps) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#005cab] bg-[#edf4ff] px-3 py-1 rounded-full border border-[#a5c8ff]">
            Defense Pipeline
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#131c25] font-['Hanken_Grotesk']">
            How ScamAdvisor Protects You
          </h2>
          <p className="text-sm text-[#404753]">
            Engineered from ground up to deliver zero-knowledge, deterministic cybersecurity triage in milliseconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-2xl border border-[#c0c7d6]/60 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#d4e3ff] text-[#005cab] flex items-center justify-center font-bold text-lg font-mono">
              01
            </div>
            <h3 className="font-bold text-lg text-[#131c25]">
              Upload or Paste
            </h3>
            <p className="text-sm text-[#404753] leading-relaxed">
              Feed any suspicious web link, direct APK download, screenshot, voice memo, or mobile money
              phone handle into the ingestion console.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#005cab]">
              <FileSearch className="w-4 h-4" />
              <span>Multi-Format Telemetry Ingestion</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-2xl border border-[#c0c7d6]/60 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#ffdad6] text-[#b51a1e] flex items-center justify-center font-bold text-lg font-mono">
              02
            </div>
            <h3 className="font-bold text-lg text-[#131c25]">
              Automated Analysis
            </h3>
            <p className="text-sm text-[#404753] leading-relaxed">
              Our 14-point heuristics pipeline cross-references domain WHOIS tenure, syndicate blacklists,
              known advance-fee scripts, and executable payload hashes.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#b51a1e]">
              <Cpu className="w-4 h-4" />
              <span>Vector Threat Matching</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-2xl border border-[#c0c7d6]/60 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#a3f69c]/40 text-[#186a22] flex items-center justify-center font-bold text-lg font-mono">
              03
            </div>
            <h3 className="font-bold text-lg text-[#131c25]">
              Score & Alternatives
            </h3>
            <p className="text-sm text-[#404753] leading-relaxed">
              Receive a split Legitimacy vs Risk Index, deep forensic breakdown, and regulated, official
              banking and application alternatives to stay safe.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#186a22]">
              <Layers className="w-4 h-4" />
              <span>Safe Entity Redirection</span>
            </div>
          </div>
        </div>
      </section>

      {/* Scam Vectors Under Containment */}
      <section id="scam-vectors" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#b51a1e] bg-[#ffdad6] px-3 py-1 rounded-full border border-[#ffb4ac]">
              Active Threat Landscape
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#131c25] mt-2 font-['Hanken_Grotesk']">
              Scam Vectors Under Containment
            </h2>
            <p className="text-sm text-[#404753] mt-1">
              Active syndication patterns continuously tracked and filtered across East African hubs.
            </p>
          </div>
          <button
            onClick={onOpenReportModal}
            className="self-start sm:self-auto text-xs font-mono font-bold text-[#b51a1e] hover:underline flex items-center gap-1.5"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Submit new vector report</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {THREAT_VECTORS.map((vector) => (
            <div
              key={vector.id}
              className="bg-white rounded-2xl p-6 border border-[#c0c7d6]/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      vector.badgeColor === "critical"
                        ? "bg-[#ffdad6] text-[#93000e] border border-[#ffb4ac]"
                        : vector.badgeColor === "high"
                        ? "bg-[#ffdad6]/60 text-[#b51a1e]"
                        : "bg-[#edf4ff] text-[#005cab] border border-[#a5c8ff]"
                    }`}
                  >
                    {vector.badge}
                  </span>
                  <span className="text-xs font-mono text-[#707785]">VEC_#{vector.id}</span>
                </div>
                <h3 className="font-bold text-base text-[#131c25]">
                  {vector.title}
                </h3>
                <p className="text-xs text-[#404753] leading-relaxed">
                  {vector.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#c0c7d6]/40 grid grid-cols-2 gap-2 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-[#707785] block">Avg Victim Loss</span>
                  <strong className="text-[#b51a1e] font-bold">{vector.avgLoss}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#707785] block">Threats Blocked</span>
                  <strong className="text-[#005cab] font-bold">{vector.blockedCount}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rooted in East Africa, Guarding Global Citizens */}
      <section id="regional-presence" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#c0c7d6]/60 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Content Column */}
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 flex flex-col justify-center">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#186a22] bg-[#f7fff1] px-3 py-1 rounded-full border border-[#88d982] self-start">
              SOVEREIGN OPERATIONS // UGANDA BASE
            </span>

            <h2 className="text-2xl sm:text-4xl font-bold text-[#131c25] leading-tight font-['Hanken_Grotesk']">
              Rooted in East Africa, Guarding Global Citizens
            </h2>

            <p className="text-sm sm:text-base text-[#404753] leading-relaxed">
              While cybercrime syndicates ("Yahoo Boys") operate globally, their predatory tentacles disproportionately
              target everyday workers, retirees, and youth across East and West Africa through fake arbitrage
              platforms and extortion loops. ScamAdvisor operates from Uganda as a self-funded, solo-engineered
              defense shield to neutralize these threats before funds leave victims' accounts.
            </p>

            {/* Verification Meters */}
            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="font-bold text-[#131c25]">Regional Threat Mitigation Rate</span>
                  <span className="font-bold text-[#186a22]">94.8%</span>
                </div>
                <div className="w-full h-2.5 bg-[#e6effb] rounded-full overflow-hidden">
                  <div className="h-full bg-[#186a22] rounded-full w-[94.8%] transition-all duration-1000"></div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="font-bold text-[#131c25]">False Positive Resistance Index</span>
                  <span className="font-bold text-[#005cab]">99.2%</span>
                </div>
                <div className="w-full h-2.5 bg-[#e6effb] rounded-full overflow-hidden">
                  <div className="h-full bg-[#005cab] rounded-full w-[99.2%] transition-all duration-1000"></div>
                </div>
              </div>
            </div>

            {/* Verification Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-[#004786]">
              <span className="px-3 py-1 bg-[#edf4ff] rounded-lg border border-[#a5c8ff]">
                ✓ ISO/IEC 27032 Aligned Heuristics
              </span>
              <span className="px-3 py-1 bg-[#edf4ff] rounded-lg border border-[#a5c8ff]">
                ✓ Open Global Blacklist Ingestion
              </span>
            </div>
          </div>

          {/* Map Graphic Column */}
          <div className="lg:col-span-5 bg-[#131c25] p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden text-white">
            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#a5c8ff]">
                <MapPin className="w-4 h-4 text-[#ffb4ac]" />
                <span>KAMPALA SOVEREIGN HUB</span>
              </div>
              <h3 className="text-xl font-bold font-['Hanken_Grotesk'] text-white">
                0.3476° N, 32.5825° E
              </h3>
              <p className="text-xs text-[#c0c7d6]">
                East African Time (UTC+3) • Telemetry Nodes Synced Across 184 Countries
              </p>
            </div>

            {/* Kampala HQ Map Image */}
            <div className="relative my-6 rounded-2xl overflow-hidden border border-[#28313b] shadow-2xl group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpTrSFK7GwvgqB3s7l7UxnUUdilf2QeA9i4YbZwpf7cBYY_jNCS_ZdiJPVtUNbVUhWXER9jzbO2RXgO9MU8BxG-nA3CMeyU7CLoCEf-ZfR327c29961ijONn8rvyRvfW30g06H0pbxMrZBC3Fdfvcc9VyVpPQ5vi9SaqcCG1o4GpHysVS4tW7a4rzjMSYUQFlBkLNhi-sKqnoZu4GjYBWfA3s_O8pV46hFqL_b-MciSPgj2KVF4AlJsw"
                alt="Kampala Uganda Regional Cyber Defense Node Map"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131c25] via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 bg-[#131c25]/90 backdrop-blur-md px-3 py-1 rounded-lg border border-[#a5c8ff]/30 text-[11px] font-mono text-[#a5c8ff]">
                RADAR: 24/7 ACTIVE INTAKE
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between text-xs font-mono text-[#c0c7d6] pt-2 border-t border-[#28313b]">
              <span>LEAD: BABU LOUIS PETER</span>
              <span className="text-[#88d982]">NODE_STATUS: GREEN</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Bottom CTA Banner */}
      <section id="bottom-cta-banner" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#005cab] via-[#0075d6] to-[#004786] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-xs font-mono font-bold uppercase tracking-wider rounded-full text-[#d4e3ff]">
              IMMEDIATE PROTECTION
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-['Hanken_Grotesk'] leading-tight">
              Suspect a scam right now?
            </h2>
            <p className="text-base text-[#e6effb] leading-relaxed max-w-2xl">
              Don't click that withdrawal link or send mobile money to an unverified broker.
              Analyze the URL or phone number through our cryptographic threat engine in 3 seconds.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  onNavigate("scam-checker");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-6 py-3.5 bg-white hover:bg-[#edf4ff] text-[#005cab] text-sm font-bold rounded-xl shadow-md transition-all active:scale-[0.98]"
              >
                Open Scam & Threat Verification Console
              </button>
              <button
                onClick={() => {
                  onNavigate("about-us");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-6 py-3.5 bg-white/15 hover:bg-white/25 text-white text-sm font-bold rounded-xl backdrop-blur-md transition-colors border border-white/30"
              >
                Read Mission Briefing
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
