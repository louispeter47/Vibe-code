import React from "react";
import { X, ShieldAlert, CheckCircle2, AlertTriangle, BookOpen, ExternalLink } from "lucide-react";

interface AdvisoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRunCheck?: () => void;
}

export const AdvisoryModal: React.FC<AdvisoryModalProps> = ({
  isOpen,
  onClose,
  onRunCheck,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="advisory-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div
        id="advisory-modal-content"
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-[#c0c7d6]/60 max-h-[90vh] flex flex-col overflow-hidden"
      >
        {/* Modal Header */}
        <div className="bg-[#005cab] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-[#a5c8ff]" />
            <div>
              <h3 className="font-bold text-base font-['Hanken_Grotesk'] leading-tight">
                ScamAdvisor Security Advisory
              </h3>
              <p className="text-xs text-[#d4e3ff] font-mono">
                BULLETIN #SEC-2026-04 • ADVANCE-FEE ARBITRAGE & YAHOO SYNDICATES
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#131c25]">
          <div>
            <span className="inline-block px-2.5 py-1 bg-[#ffdad6] text-[#93000e] text-xs font-mono font-bold rounded-md uppercase tracking-wider mb-2">
              Critical Warning Pattern
            </span>
            <h4 className="text-xl font-bold text-[#131c25] leading-snug">
              Recognizing Advance Fee Arbitrage & Fake Investment Pools
            </h4>
            <p className="text-sm text-[#404753] mt-2 leading-relaxed">
              Predatory syndicates (commonly known as "Yahoo Boys" or 419 advance-fee syndicates) now deploy
              sophisticated digital clones mimicking licensed East African banks, forex trading apps, and automated
              Telegram crypto payout vaults.
            </p>
          </div>

          {/* Key Red Flags */}
          <div className="space-y-3">
            <h5 className="font-bold text-xs font-mono uppercase tracking-wider text-[#b51a1e] flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>The 4 Unmistakable Syndication Red Flags</span>
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-[#edf4ff] rounded-xl border border-[#c0c7d6]/50 space-y-1">
                <div className="font-bold text-xs text-[#005cab]">1. The "Unlock / Clearing" Fee</div>
                <p className="text-xs text-[#404753]">
                  You are shown a high balance (e.g., $14,800 USDT), but told you must pay a 5% "network fee" or "customs tax" to withdraw.
                </p>
              </div>
              <div className="p-3.5 bg-[#edf4ff] rounded-xl border border-[#c0c7d6]/50 space-y-1">
                <div className="font-bold text-xs text-[#005cab]">2. Direct APK Downloads</div>
                <p className="text-xs text-[#404753]">
                  Never install apps delivered via WhatsApp links or APK files. They contain keyboard loggers and SMS interceptors.
                </p>
              </div>
              <div className="p-3.5 bg-[#edf4ff] rounded-xl border border-[#c0c7d6]/50 space-y-1">
                <div className="font-bold text-xs text-[#005cab]">3. Anonymous Registration</div>
                <p className="text-xs text-[#404753]">
                  Domains registered less than 30 days ago, using privacy masks in Panama or Seychelles without regulatory credentials.
                </p>
              </div>
              <div className="p-3.5 bg-[#edf4ff] rounded-xl border border-[#c0c7d6]/50 space-y-1">
                <div className="font-bold text-xs text-[#005cab]">4. Artificial Urgency</div>
                <p className="text-xs text-[#404753]">
                  Claims that "funds will be forfeited within 2 hours" or "account will be frozen" unless payment is immediately wired.
                </p>
              </div>
            </div>
          </div>

          {/* Golden Rules of Defense */}
          <div className="p-4 bg-[#f7fff1] border border-[#358438]/30 rounded-xl space-y-2">
            <h5 className="font-bold text-xs font-mono uppercase tracking-wider text-[#186a22] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#186a22]" />
              <span>Standard Operating Procedures for Victims & Targets</span>
            </h5>
            <ul className="text-xs text-[#131c25] space-y-1.5 list-disc list-inside">
              <li>Cease all communication immediately; do NOT negotiate with the sender.</li>
              <li>Run the suspicious link or phone number through the ScamAdvisor console.</li>
              <li>Never send cryptocurrency or gift card codes to unverified individuals.</li>
              <li>Report extortion attempts to local cybercrime units (Uganda Police Cyber Division: 0800 199 699).</li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#f7f9ff] px-6 py-4 border-t border-[#c0c7d6]/50 flex items-center justify-between">
          <span className="text-xs font-mono text-[#404753]">
            PUBLIC SECURITY BRIEFING • UGANDA DEFENSE NODE
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#404753] hover:bg-[#e6effb] rounded-lg transition-colors"
            >
              Close
            </button>
            {onRunCheck && (
              <button
                onClick={() => {
                  onClose();
                  onRunCheck();
                }}
                className="px-4 py-2 bg-[#005cab] hover:bg-[#004786] text-white text-xs font-bold rounded-lg transition-colors"
              >
                Scan a Suspicious Link
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
