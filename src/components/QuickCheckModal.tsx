import React, { useState } from "react";
import { Search, X, Cpu, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";
import { SAMPLE_TARGETS } from "../data/mockData";
import { evaluateForensicTarget } from "../utils/analyzer";

interface QuickCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInspectTarget: (target: string) => void;
}

export const QuickCheckModal: React.FC<QuickCheckModalProps> = ({
  isOpen,
  onClose,
  onInspectTarget,
}) => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{
    target: string;
    isSafe: boolean;
    risk: number;
    label: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleQuickScreen = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const evalResult = evaluateForensicTarget(input.trim());

    setResult({
      target: input.trim(),
      isSafe: evalResult.scamRiskIndex < 50,
      risk: evalResult.scamRiskIndex,
      label: evalResult.statusLabel,
    });
  };

  const handleProceedToDossier = () => {
    if (result) {
      onInspectTarget(result.target);
      onClose();
    } else if (input.trim()) {
      onInspectTarget(input.trim());
      onClose();
    }
  };

  return (
    <div
      id="quick-check-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div
        id="quick-check-modal-content"
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-[#c0c7d6]/60 overflow-hidden"
      >
        {/* Modal Header */}
        <div className="bg-[#005cab] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-[#a5c8ff]" />
            <div>
              <h3 className="font-bold text-base font-['Hanken_Grotesk'] leading-tight">
                Quick Threat Screener
              </h3>
              <p className="text-xs text-[#d4e3ff] font-mono">
                INSTANT HEURISTIC TRIAGE // UG-KLA-01
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

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          <form onSubmit={handleQuickScreen} className="space-y-3">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#404753]">
              Paste Suspicious URL, Domain, or Phone
            </label>
            <div className="relative">
              <input
                type="text"
                autoFocus
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setResult(null);
                }}
                placeholder="e.g. http://fx-arbitrage-payout-vault.net or +234..."
                className="w-full pl-3.5 pr-10 py-3 border border-[#c0c7d6] rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#005cab] bg-[#f7f9ff]"
              />
              {input && (
                <button
                  type="button"
                  onClick={() => {
                    setInput("");
                    setResult(null);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#707785] hover:text-[#131c25]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Presets */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[11px] font-mono text-[#707785]">Quick:</span>
              {SAMPLE_TARGETS.slice(0, 3).map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setInput(sample.value);
                    setResult(null);
                  }}
                  className="text-[11px] font-mono px-2 py-0.5 bg-[#edf4ff] hover:bg-[#d4e3ff] text-[#005cab] rounded border border-[#a5c8ff]"
                >
                  {sample.label}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={!input.trim()}
              className="w-full py-3 bg-[#005cab] hover:bg-[#004786] disabled:opacity-50 text-white font-bold rounded-xl text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Cpu className="w-4 h-4" />
              <span>Screen Target</span>
            </button>
          </form>

          {/* Quick Result */}
          {result && (
            <div
              className={`p-4 rounded-xl border transition-all animate-in fade-in duration-150 space-y-3 ${
                result.isSafe
                  ? "bg-[#f7fff1] border-[#88d982] text-[#186a22]"
                  : "bg-[#ffdad6] border-[#ffb4ac] text-[#93000e]"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {result.isSafe ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-[#b51a1e]" />
                  )}
                  <span className="font-bold text-sm font-['Hanken_Grotesk']">
                    {result.label}
                  </span>
                </div>
                <span className="font-mono text-xs font-bold">
                  Risk: {result.risk}%
                </span>
              </div>

              <button
                type="button"
                onClick={handleProceedToDossier}
                className={`w-full py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm ${
                  result.isSafe
                    ? "bg-[#186a22] text-white hover:bg-[#002204]"
                    : "bg-[#b51a1e] text-white hover:bg-[#93000e]"
                }`}
              >
                <span>View Full Forensic Dossier in Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
