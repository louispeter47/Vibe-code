import React from "react";
import { NavigationPage } from "../types";
import { Shield, Lock, MapPin, Mail, Phone, ExternalLink, Heart } from "lucide-react";

interface FooterProps {
  onNavigate: (page: NavigationPage) => void;
  onOpenReportModal: () => void;
  onOpenAdvisories: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenReportModal,
  onOpenAdvisories,
}) => {
  return (
    <footer id="main-footer" className="bg-[#131c25] text-[#e6effb] border-t border-[#28313b]">
      {/* Top Banner */}
      <div className="border-b border-[#28313b] bg-[#1a2430]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#358438] animate-pulse"></span>
            <span className="font-mono text-xs text-[#a5c8ff] uppercase tracking-wider">
              SYS_TELEMETRY: ONLINE • EAST AFRICA HUB UG-KLA-01 • DEF-INDEX: 8,491,204 SIGNATURES
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-[#c0c7d6]">
            <span>ZERO DATA RETENTION PROTOCOL ACTIVE</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">SHA-256 HASH VERIFICATION</span>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Initiative Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center bg-[#005cab] rounded-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg tracking-tight font-['Hanken_Grotesk']">
                  ScamAdvisor
                </h3>
                <p className="text-[10px] font-mono tracking-wider text-[#ffb4ac] font-bold">
                  SAY NO TO YAHOOBOYS
                </p>
              </div>
            </div>
            <p className="text-sm text-[#c0c7d6] leading-relaxed">
              The independent, solo-engineered cyber defense console protecting everyday digital citizens
              across East Africa and worldwide against predatory advance-fee fraud, fake investment bots,
              and syndicated cyber extortion.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs font-mono text-[#a5c8ff]">
              <Lock className="w-3.5 h-3.5" />
              <span>Public Service • 100% Free • Non-Commercial</span>
            </div>
          </div>

          {/* Col 2: Navigation & Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#a5c8ff]">
              Verification Console
            </h4>
            <ul className="space-y-2 text-sm text-[#c0c7d6]">
              <li>
                <button
                  onClick={() => {
                    onNavigate("home");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Home Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate("scam-checker");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Scam & Threat Verification Console
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate("about-us");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors"
                >
                  About the Solo Defense Initiative
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdvisories}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Security Advisories & Guides</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenReportModal}
                  className="text-[#ffdad6] hover:text-[#ffb4ac] transition-colors"
                >
                  Submit Syndicate Threat to Blacklist
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#a5c8ff]">
              Solo Dispatch & Response
            </h4>
            <div className="space-y-2.5 text-xs text-[#c0c7d6]">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#88d982] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] text-[#88d982] font-mono font-bold">
                    Emergency Verification Line:
                  </div>
                  <a
                    href="tel:+256761675694"
                    className="text-white hover:underline font-mono text-sm"
                  >
                    +256 761675694
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#a5c8ff] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] text-[#a5c8ff] font-mono font-bold">
                    Triage & Threat Intelligence Desk:
                  </div>
                  <a
                    href="mailto:louispeter0761675694@gmail.com"
                    className="text-white hover:underline font-mono text-xs break-all"
                  >
                    louispeter0761675694@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#c0c7d6] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] text-[#c0c7d6] font-mono font-bold">
                    Operational Base:
                  </div>
                  <span className="text-white">
                    Kampala, Uganda • East Africa (UTC+3)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Solo Architect Profile Brief */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#a5c8ff]">
              Solo Architect
            </h4>
            <div className="p-4 bg-[#1a2430] rounded-xl border border-[#28313b] space-y-2">
              <div className="font-bold text-white text-sm">Babu Louis Peter</div>
              <div className="text-xs text-[#a5c8ff] font-mono">
                Founder • CEO • Lead Engineer
              </div>
              <p className="text-xs text-[#c0c7d6] leading-relaxed">
                Web developer, designer, and active student who built ScamAdvisor independently
                after seeing loved ones fall victim to predatory cyber scams.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    onNavigate("about-us");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-1 text-xs text-[#d4e3ff] hover:text-white font-semibold group"
                >
                  <span>Read the origin story</span>
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line matching exact requirement */}
        <div className="mt-12 pt-8 border-t border-[#28313b] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#c0c7d6]">
          <p className="text-center sm:text-left">
            © 2026 ScamAdvisor. Built by <strong className="text-white">Babu Louis Peter</strong> | Operating in Uganda, Serving the World.
          </p>
          <div className="flex items-center gap-3 text-[11px] font-mono text-[#a5c8ff]">
            <span>EAST AFRICAN CYBER DEFENSE INITIATIVE</span>
            <span>•</span>
            <span>STAND FIRM AGAINST SYNDICATES</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
