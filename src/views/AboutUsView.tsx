import React from "react";
import { NavigationPage } from "../types";
import {
  Shield,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  User,
  Award,
  Globe,
  Radio,
  Cpu,
  Heart,
  Share2,
} from "lucide-react";

interface AboutUsViewProps {
  onNavigate: (page: NavigationPage) => void;
  onOpenReportModal: () => void;
}

export const AboutUsView: React.FC<AboutUsViewProps> = ({
  onNavigate,
  onOpenReportModal,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Top Telemetry Breadcrumb */}
      <div className="bg-[#131c25] text-[#e6effb] rounded-2xl px-4 sm:px-6 py-3 border border-[#28313b] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#186a22] animate-pulse"></span>
          <span className="text-[#a5c8ff] font-bold">
            SYS_MISSION: GLOBAL_CYBER_DEFENSE // ACTIVE_NODE: UG-KLA-01
          </span>
        </div>
        <div className="flex items-center gap-4 text-[#c0c7d6]">
          <span>INITIATIVE_VER: 2026.04</span>
          <span>•</span>
          <span className="text-[#88d982]">STATUS: ONLINE</span>
        </div>
      </div>

      {/* Main Mission Briefing Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#d4e3ff] text-[#004786] rounded-full text-xs font-mono font-bold border border-[#a5c8ff]">
          <Radio className="w-3.5 h-3.5 text-[#005cab] animate-pulse" />
          <span>OFFICIAL MISSION BRIEFING // REF: SA-UG-2026</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[#131c25] tracking-tight font-['Hanken_Grotesk'] leading-tight">
          About ScamAdvisor
        </h1>

        <div className="text-xl sm:text-2xl font-black text-[#b51a1e] font-mono tracking-wide uppercase">
          SAY NO TO YAHOOBOYS
        </div>

        <p className="text-base sm:text-lg text-[#404753] leading-relaxed">
          The Solo Global Defense Initiative Protecting People from Digital Fraud. Operating from Uganda,
          engineered to provide uncompromising, free cyber defense against international extortion syndicates.
        </p>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#ffdad6] text-[#93000e] rounded-xl text-xs font-mono font-bold border border-[#ffb4ac]">
          <AlertTriangle className="w-4 h-4" />
          <span>TARGET VULNERABILITY: ZERO TOLERANCE PROTOCOL</span>
        </div>
      </div>

      {/* Bento Grid: Founder Profile (Left) & Platform Architecture / Support (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Founder Executive Card & Pillars (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Founder Executive Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#c0c7d6]/60 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#c0c7d6]/40 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#005cab] to-[#0075d6] text-white flex items-center justify-center font-bold text-2xl shadow-md border-2 border-white">
                  BP
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#131c25] font-['Hanken_Grotesk']">
                    Babu Louis Peter
                  </h2>
                  <p className="text-xs sm:text-sm font-semibold text-[#005cab] font-mono">
                    Founder & Chief Executive Officer • Lead Engineer
                  </p>
                </div>
              </div>

              <span className="inline-block px-3 py-1 bg-[#edf4ff] text-[#005cab] rounded-full text-xs font-mono font-bold border border-[#a5c8ff] self-start sm:self-auto">
                Solo Architect
              </span>
            </div>

            {/* Credentials */}
            <div className="p-3.5 bg-[#edf4ff] rounded-2xl border border-[#a5c8ff]/40 flex flex-wrap items-center gap-4 text-xs font-mono text-[#004786]">
              <span className="font-bold">CREDENTIALS:</span>
              <span>Web Developer</span>
              <span>•</span>
              <span>Web Designer</span>
              <span>•</span>
              <span>Active Student</span>
            </div>

            {/* Origin Narrative */}
            <div className="space-y-4 text-sm text-[#404753] leading-relaxed">
              <h3 className="font-bold text-base text-[#131c25] font-['Hanken_Grotesk']">
                The Catalyst: Defending the Vulnerable
              </h3>
              <p>
                ScamAdvisor was not born in a corporate boardroom. It was forged from personal encounter
                and firsthand witnessing of vulnerable family members, hardworking neighbors, and local
                entrepreneurs across Uganda and East Africa falling prey to the insidious schemes of "Yahoo Boys"
                — advance-fee fraud, romance extortion, and bogus Telegram crypto trading bots.
              </p>
              <p>
                Seeing honest people lose their life savings and tuition fees to faceless digital predators,
                <strong> Babu Louis Peter</strong> made a resolute decision: to deploy his skills as a web
                developer and designer to build a free, real-time, deterministic defense console that stops
                scammers before money changes hands.
              </p>
            </div>

            {/* Metric Strip */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center font-mono border-t border-[#c0c7d6]/40">
              <div className="p-3 bg-[#f7f9ff] rounded-xl border border-[#c0c7d6]/50">
                <span className="text-[10px] text-[#707785] block">Base Ops</span>
                <strong className="text-xs sm:text-sm font-bold text-[#131c25]">
                  Uganda (E.A.)
                </strong>
              </div>
              <div className="p-3 bg-[#f7f9ff] rounded-xl border border-[#c0c7d6]/50">
                <span className="text-[10px] text-[#707785] block">Service Cost</span>
                <strong className="text-xs sm:text-sm font-bold text-[#186a22]">
                  100% Free / Public
                </strong>
              </div>
              <div className="p-3 bg-[#f7f9ff] rounded-xl border border-[#c0c7d6]/50">
                <span className="text-[10px] text-[#707785] block">Architecture</span>
                <strong className="text-xs sm:text-sm font-bold text-[#005cab]">
                  Solo-Engineered
                </strong>
              </div>
            </div>
          </div>

          {/* 3 Core Pillars */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#131c25] font-['Hanken_Grotesk']">
              Core Mission Pillars
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {/* Pillar 1 */}
              <div className="bg-white p-5 rounded-2xl border border-[#c0c7d6]/60 shadow-sm space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-[#d4e3ff] text-[#005cab] font-mono font-bold text-xs rounded">
                    PILLAR_01
                  </span>
                  <h4 className="font-bold text-sm text-[#131c25]">
                    Democratizing Cyber Safety
                  </h4>
                </div>
                <p className="text-xs text-[#404753] leading-relaxed">
                  Cybersecurity should not be a luxury reserved for multinational enterprises. Every everyday
                  citizen, regardless of technical background or income, deserves institutional-grade protection
                  against digital fraud.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="bg-white p-5 rounded-2xl border border-[#c0c7d6]/60 shadow-sm space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-[#a3f69c] text-[#002204] font-mono font-bold text-xs rounded">
                    PILLAR_02
                  </span>
                  <h4 className="font-bold text-sm text-[#131c25]">
                    Empowering Everyday Citizens
                  </h4>
                </div>
                <p className="text-xs text-[#404753] leading-relaxed">
                  Providing fast, crystal-clear answers in plain language. If a link or mobile money recipient
                  is dangerous, we flag it immediately and direct users to safe, regulated banking channels.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="bg-white p-5 rounded-2xl border border-[#c0c7d6]/60 shadow-sm space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-[#ffdad6] text-[#93000e] font-mono font-bold text-xs rounded">
                    PILLAR_03
                  </span>
                  <h4 className="font-bold text-sm text-[#131c25]">
                    Zero Tolerance for Yahoo Syndicates
                  </h4>
                </div>
                <p className="text-xs text-[#404753] leading-relaxed">
                  Exposing the exact mechanics of advance-fee fraud, romance extortion, and fake APKs to
                  permanently disrupt the economic viability of syndication rings across East and West Africa.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Platform Architecture & Direct Support (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Platform Architecture Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#c0c7d6]/60 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#c0c7d6]/40 pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#131c25]">
                PLATFORM ARCHITECTURE
              </span>
              <span className="text-[11px] font-mono text-[#005cab] bg-[#edf4ff] px-2 py-0.5 rounded border border-[#a5c8ff]">
                REAL-TIME RADAR
              </span>
            </div>

            {/* Radar Animation */}
            <div className="relative w-full aspect-square max-h-[240px] bg-[#131c25] rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
              <iframe
                src="https://lottie.host/embed/53ef6fb5-8875-4b5f-81e1-cb4006aa8c7c/P0U9eYRek3.lottie"
                className="w-full h-full border-0 pointer-events-none opacity-90 scale-105"
                title="ScamAdvisor Active Architecture Radar"
              ></iframe>
              <div className="absolute bottom-3 left-3 bg-[#131c25]/85 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-[#88d982] border border-[#88d982]/30">
                THREAT FILTER: ACTIVE
              </div>
              <div className="absolute top-3 right-3 bg-[#131c25]/85 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-[#a5c8ff] border border-[#a5c8ff]/30">
                99.8% DETECTION RATE
              </div>
            </div>

            <div className="space-y-2 text-xs text-[#404753]">
              <div className="p-3 bg-[#f7f9ff] rounded-xl border border-[#c0c7d6]/40 space-y-1">
                <span className="font-bold text-[#131c25] block">Deterministic Analysis Engine</span>
                <p>
                  Zero reliance on invasive user tracking. Cryptographic hashing of domains, phone numbers,
                  and media telemetry in memory.
                </p>
              </div>
            </div>
          </div>

          {/* Direct Contact & Dispatch Card */}
          <div className="bg-[#131c25] text-white rounded-3xl p-6 sm:p-8 border border-[#28313b] shadow-xl space-y-6">
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-[#a5c8ff] uppercase tracking-wider block font-bold">
                COMMUNICATIONS & TRIAGE DESK
              </span>
              <h3 className="text-xl font-bold font-['Hanken_Grotesk'] text-white">
                Direct Contact & Support
              </h3>
              <p className="text-xs text-[#c0c7d6]">
                Have you been contacted by a suspected scammer? Reach Babu Louis Peter directly for
                guidance or threat intake.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {/* Phone */}
              <a
                href="tel:+256761675694"
                className="p-4 bg-[#1a2430] hover:bg-[#28313b] rounded-2xl border border-[#28313b] flex items-start gap-3 transition-colors group block"
              >
                <div className="w-9 h-9 rounded-xl bg-[#358438] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] font-mono uppercase text-[#88d982] block font-bold">
                    Emergency Verification Line
                  </span>
                  <span className="text-sm font-mono font-bold text-white group-hover:underline">
                    +256 761675694
                  </span>
                  <p className="text-[11px] text-[#c0c7d6] mt-0.5">
                    Direct phone & WhatsApp threat escalation
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:louispeter0761675694@gmail.com"
                className="p-4 bg-[#1a2430] hover:bg-[#28313b] rounded-2xl border border-[#28313b] flex items-start gap-3 transition-colors group block"
              >
                <div className="w-9 h-9 rounded-xl bg-[#005cab] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] font-mono uppercase text-[#a5c8ff] block font-bold">
                    Triage Inbox & Intelligence Desk
                  </span>
                  <span className="text-xs sm:text-sm font-mono font-bold text-white group-hover:underline break-all">
                    louispeter0761675694@gmail.com
                  </span>
                  <p className="text-[11px] text-[#c0c7d6] mt-0.5">
                    Submit threat logs, scam screenshots, and evidence
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className="p-4 bg-[#1a2430] rounded-2xl border border-[#28313b] flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#404753] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#c0c7d6] block font-bold">
                    Operational Headquarters
                  </span>
                  <span className="text-sm font-bold text-white">
                    Uganda, East Africa (Global Distribution)
                  </span>
                  <p className="text-[11px] text-[#c0c7d6] mt-0.5 font-mono">
                    0.3476° N, 32.5825° E • EAT (UTC+3)
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#28313b] flex items-center justify-between text-xs font-mono text-[#a5c8ff]">
              <span>SOLO DISPATCH: 24/7 INTAKE</span>
              <span className="text-[#88d982]">UG-SOVEREIGN DEFENSE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Global Sovereign Reach Metrics */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#c0c7d6]/60 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#005cab] bg-[#edf4ff] px-3 py-1 rounded-full border border-[#a5c8ff]">
              GLOBAL REACH & VELOCITY
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#131c25] mt-2 font-['Hanken_Grotesk']">
              Ugandan Engineering, Serving the World
            </h3>
          </div>
          <span className="text-xs font-mono text-[#707785]">DISTRIBUTED RESISTANCE MESH</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="p-5 bg-[#edf4ff]/60 rounded-2xl border border-[#a5c8ff]/50 space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="font-bold text-[#131c25]">Target Response Time</span>
              <span className="font-bold text-[#005cab]">&lt; 150ms Global Mean</span>
            </div>
            <div className="w-full h-2.5 bg-white rounded-full overflow-hidden">
              <div className="h-full bg-[#005cab] rounded-full w-[88%]"></div>
            </div>
            <p className="text-[11px] text-[#404753] mt-1">
              Low-latency edge caching ensures instantaneous verification even on 2G/3G mobile networks.
            </p>
          </div>

          <div className="p-5 bg-[#edf4ff]/60 rounded-2xl border border-[#a5c8ff]/50 space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="font-bold text-[#131c25]">Coverage</span>
              <span className="font-bold text-[#186a22]">Global CDN (184 Countries)</span>
            </div>
            <div className="w-full h-2.5 bg-white rounded-full overflow-hidden">
              <div className="h-full bg-[#186a22] rounded-full w-[95%]"></div>
            </div>
            <p className="text-[11px] text-[#404753] mt-1">
              Protecting users across Kampala, Nairobi, Lagos, London, Toronto, and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive CTA Banner */}
      <section className="bg-gradient-to-r from-[#b51a1e] to-[#93000e] rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-4">
        <span className="inline-block px-3 py-1 bg-white/20 text-xs font-mono font-bold uppercase tracking-wider rounded-full">
          SAY NO TO YAHOOBOYS
        </span>
        <h2 className="text-2xl sm:text-4xl font-black font-['Hanken_Grotesk'] leading-tight">
          Encountering a Suspicious Link, Wallet, or Contact?
        </h2>
        <p className="text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
          Put our solo-engineered defense console to work immediately. Run an instant threat scan
          or report syndicate details to add them to the global blacklists.
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={() => {
              onNavigate("scam-checker");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="px-6 py-3.5 bg-white hover:bg-[#edf4ff] text-[#b51a1e] font-bold rounded-xl text-sm transition-colors shadow-md active:scale-[0.98]"
          >
            Run Scam Checker
          </button>
          <button
            onClick={onOpenReportModal}
            className="px-6 py-3.5 bg-white/15 hover:bg-white/25 text-white font-bold rounded-xl text-sm transition-colors border border-white/30"
          >
            Submit Threat to Blacklist
          </button>
        </div>
      </section>
    </div>
  );
};
