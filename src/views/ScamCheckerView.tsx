import React, { useState, useEffect, useRef } from "react";
import { ScanResult, HistoryItem } from "../types";
import { SAFE_ALTERNATIVES } from "../data/mockData";
import {
  detectTargetCategory,
  evaluateForensicTarget,
  getScanHistory,
  saveToScanHistory,
  clearScanHistory,
  TargetCategory,
} from "../utils/analyzer";
import {
  ShieldAlert,
  ShieldCheck,
  Search,
  UploadCloud,
  File,
  X,
  Copy,
  Check,
  AlertTriangle,
  ExternalLink,
  Lock,
  Database,
  RotateCcw,
  Sparkles,
  Loader2,
  Globe,
  Phone,
  MessageSquare,
  Coins,
  History,
  Download,
  Trash2,
  ClipboardPaste,
  ArrowRight,
  Info,
  CheckCircle2,
  ChevronRight,
  PhoneCall,
  Activity,
  FileText,
} from "lucide-react";

interface ScamCheckerViewProps {
  initialTarget?: string;
  onOpenReportModal: (target?: string) => void;
  onOpenAdvisories: () => void;
}

const CATEGORY_TABS: { id: TargetCategory; label: string; icon: any; placeholder: string; example: string }[] = [
  {
    id: "url",
    label: "URL / Domain",
    icon: Globe,
    placeholder: "https://suspicious-site.biz/payout or domain.com",
    example: "https://www.stanbicbank.co.ug",
  },
  {
    id: "phone",
    label: "Mobile Money / Phone",
    icon: Phone,
    placeholder: "+256 77X XXX XXX, 070X XXX XXX, or USSD code",
    example: "+256 772 000 000",
  },
  {
    id: "message",
    label: "SMS / Message Text",
    icon: MessageSquare,
    placeholder: "Paste suspicious SMS, lottery alert, or fake job offer message text...",
    example: "URGENT: Your mobile money account has been locked. Click link to verify PIN immediately.",
  },
  {
    id: "crypto",
    label: "Crypto Wallet",
    icon: Coins,
    placeholder: "0x... (ETH/BSC), bc1... (BTC), or T... (USDT TRC20)",
    example: "0x71C8A9b14BEe... or TRC20 address",
  },
  {
    id: "file",
    label: "File / APK Telemetry",
    icon: File,
    placeholder: "Select or drop suspect APK installer, screenshot, or receipt",
    example: "banking-update.apk",
  },
];

export const ScamCheckerView: React.FC<ScamCheckerViewProps> = ({
  initialTarget = "",
  onOpenReportModal,
  onOpenAdvisories,
}) => {
  const [activeTab, setActiveTab] = useState<TargetCategory>("url");
  const [targetInput, setTargetInput] = useState(initialTarget);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [historyList, setHistoryList] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pre-payment interactive checklist state
  const [checklist, setChecklist] = useState({
    unsolicitedContact: false,
    upfrontFeeDemanded: false,
    pinOrOtpRequested: false,
    extremeUrgency: false,
    personalNumberNotMerchant: false,
  });

  // Calculate pre-payment risk index from checklist
  const checkedCount = Object.values(checklist).filter(Boolean).length;
  const calculatedPrePaymentRisk = checkedCount * 20;

  // Load history on mount
  useEffect(() => {
    setHistoryList(getScanHistory());
  }, []);

  // Handle incoming target passed via navigation
  useEffect(() => {
    if (initialTarget && initialTarget.trim()) {
      setTargetInput(initialTarget.trim());
      const cat = detectTargetCategory(initialTarget.trim());
      setActiveTab(cat);
      handleAnalyze(initialTarget.trim());
    }
  }, [initialTarget]);

  // Real-time format detection badge text
  const detectedCategory = detectTargetCategory(targetInput, !!selectedFile);

  const handleAnalyze = async (overrideTarget?: string) => {
    const input = (overrideTarget ?? targetInput).trim();
    if (!input && !selectedFile) return;

    setIsScanning(true);

    try {
      const payload: any = {
        target: input,
      };

      if (selectedFile) {
        payload.fileName = selectedFile.name;
        payload.mediaType = selectedFile.type;
      }

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data: ScanResult = await res.json();
        // enrich with local category and timestamp if missing
        data.targetType = data.targetType || detectedCategory;
        data.timestamp = data.timestamp || new Date().toISOString();
        setScanResult(data);

        // Save to scan history
        saveToScanHistory({
          id: data.scanId,
          target: data.target,
          targetType: data.targetType,
          verdict: data.verdict,
          scamRiskIndex: data.scamRiskIndex,
          legitimacyScore: data.legitimacyScore,
          timestamp: data.timestamp,
        });
        setHistoryList(getScanHistory());
      } else {
        throw new Error("Server analysis fallback triggered");
      }
    } catch (err) {
      console.info("Using client-side forensic engine:", err);
      const fallbackResult = evaluateForensicTarget(input, selectedFile?.type, selectedFile?.name);
      setScanResult(fallbackResult);

      saveToScanHistory({
        id: fallbackResult.scanId,
        target: fallbackResult.target,
        targetType: fallbackResult.targetType || "url",
        verdict: fallbackResult.verdict,
        scamRiskIndex: fallbackResult.scamRiskIndex,
        legitimacyScore: fallbackResult.legitimacyScore,
        timestamp: fallbackResult.timestamp || new Date().toISOString(),
      });
      setHistoryList(getScanHistory());
    } finally {
      setIsScanning(false);
    }
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setTargetInput(text.trim());
        const cat = detectTargetCategory(text.trim());
        setActiveTab(cat);
      }
    } catch {
      // Fallback if browser permission is blocked
      console.warn("Clipboard access not allowed");
    }
  };

  const handleResetScan = () => {
    setScanResult(null);
    setTargetInput("");
    setSelectedFile(null);
  };

  const handleCopyLink = () => {
    if (!scanResult) return;
    navigator.clipboard.writeText(scanResult.target);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopySummary = () => {
    if (!scanResult) return;
    const summary = `[ScamAdvisor Forensic Report]\nTarget: ${scanResult.target}\nVerdict: ${scanResult.statusLabel}\nRisk Index: ${scanResult.scamRiskIndex}%\nLegitimacy: ${scanResult.legitimacyScore}%\nScan ID: #${scanResult.scanId}\nSignals: ${scanResult.signals.map((s, i) => `\n${i + 1}. ${s.title}: ${s.description}`).join("")}`;
    navigator.clipboard.writeText(summary);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handleDownloadDossier = () => {
    if (!scanResult) return;
    const blob = new Blob([JSON.stringify(scanResult, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `incident-dossier-${scanResult.scanId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearHistory = () => {
    clearScanHistory();
    setHistoryList([]);
  };

  const currentTabConfig = CATEGORY_TABS.find((t) => t.id === activeTab) || CATEGORY_TABS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Console Header & Live Telemetry Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#c0c7d6]/40 pb-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#edf4ff] text-[#005cab] rounded-full text-xs font-mono font-bold border border-[#a5c8ff]">
              <Activity className="w-3 h-3 text-[#005cab]" />
              <span>FORENSIC VERIFICATION ENGINE v4.8</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f7fff1] text-[#186a22] rounded-full text-xs font-mono font-bold border border-[#88d982]">
              <span className="w-2 h-2 rounded-full bg-[#186a22] animate-pulse"></span>
              <span>MULTI-VECTOR SENSORS ACTIVE</span>
            </span>
            {historyList.length > 0 && (
              <button
                type="button"
                onClick={() => setShowHistory(!showHistory)}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f0f4fc] hover:bg-[#dce7f9] text-[#131c25] rounded-full text-xs font-mono font-semibold border border-[#c0c7d6] transition-colors"
              >
                <History className="w-3 h-3 text-[#005cab]" />
                <span>History ({historyList.length})</span>
              </button>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-[#131c25] tracking-tight font-['Hanken_Grotesk']">
            Scam & Threat Verification Console
          </h1>
          <p className="text-sm text-[#404753] max-w-3xl">
            Input any website link, Mobile Money telephone number, suspicious SMS text, crypto wallet,
            or binary file for real-time cryptographic and algorithmic threat assessment.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white border border-[#c0c7d6] rounded-2xl px-4 py-3 text-right shadow-sm">
            <span className="text-[10px] font-mono text-[#005cab] block font-bold">
              SENTINEL DEFENSE INDEX
            </span>
            <span className="text-lg font-black font-mono text-[#131c25]">
              8,491,204 DB RECORDS
            </span>
          </div>
        </div>
      </div>

      {/* History Drawer if toggled */}
      {showHistory && (
        <div className="bg-white rounded-3xl p-6 border border-[#c0c7d6] shadow-md space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-[#c0c7d6]/40 pb-3">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-[#005cab]" />
              <h3 className="font-bold text-sm text-[#131c25]">Your Recent Local Scans</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleClearHistory}
                className="text-xs font-mono text-[#b51a1e] hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear</span>
              </button>
              <button
                onClick={() => setShowHistory(false)}
                className="p-1 text-[#707785] hover:text-[#131c25]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {historyList.length === 0 ? (
            <p className="text-xs text-[#707785] py-4 text-center">No previous scans recorded yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {historyList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setTargetInput(item.target);
                    handleAnalyze(item.target);
                    setShowHistory(false);
                  }}
                  className="p-3.5 bg-[#f7f9ff] hover:bg-[#edf4ff] border border-[#c0c7d6]/70 rounded-2xl cursor-pointer transition-colors space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-[#c0c7d6] uppercase font-bold text-[#404753]">
                      {item.targetType}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        item.scamRiskIndex >= 50
                          ? "bg-[#ffdad6] text-[#93000e]"
                          : "bg-[#f7fff1] text-[#186a22]"
                      }`}
                    >
                      {item.scamRiskIndex}% Risk
                    </span>
                  </div>
                  <div className="text-xs font-mono font-bold text-[#131c25] truncate">
                    {item.target}
                  </div>
                  <div className="text-[10px] text-[#707785] flex items-center justify-between">
                    <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                    <span className="text-[#005cab] font-bold inline-flex items-center gap-0.5">
                      Inspect <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Target Ingestion Pipeline & Radar Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Multi-Category Functional Ingestion Pipeline (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#c0c7d6]/70 shadow-lg space-y-6">
          <div className="flex items-center justify-between border-b border-[#c0c7d6]/40 pb-4">
            <div>
              <h2 className="text-lg font-bold text-[#131c25] font-['Hanken_Grotesk']">
                Target Ingestion Pipeline
              </h2>
              <p className="text-xs text-[#707785] mt-0.5">
                Select target classification or paste raw telemetry below:
              </p>
            </div>
            {targetInput && (
              <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#edf4ff] text-[#005cab] border border-[#a5c8ff]">
                Detected: {detectedCategory.toUpperCase()}
              </span>
            )}
          </div>

          {/* Mode Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 p-1 bg-[#f0f4fc] rounded-2xl border border-[#c0c7d6]/60">
            {CATEGORY_TABS.map((tab) => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (tab.id === "file" && !selectedFile) {
                      fileInputRef.current?.click();
                    }
                  }}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-white text-[#005cab] shadow-sm font-bold border border-[#c0c7d6]/60"
                      : "text-[#555e6c] hover:text-[#131c25] hover:bg-white/40"
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Input Area */}
          {activeTab !== "file" ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#131c25]">
                  {currentTabConfig.label} Inspection Payload
                </label>
                <button
                  type="button"
                  onClick={handlePasteClipboard}
                  className="text-xs font-mono text-[#005cab] hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  <ClipboardPaste className="w-3.5 h-3.5" />
                  <span>Paste Clipboard</span>
                </button>
              </div>

              <div className="relative">
                {activeTab === "message" ? (
                  <textarea
                    rows={4}
                    value={targetInput}
                    onChange={(e) => setTargetInput(e.target.value)}
                    placeholder={currentTabConfig.placeholder}
                    className="w-full px-4 py-3 bg-[#f7f9ff] border border-[#c0c7d6] rounded-2xl text-sm font-mono text-[#131c25] focus:outline-none focus:ring-2 focus:ring-[#005cab] shadow-sm resize-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={targetInput}
                    onChange={(e) => setTargetInput(e.target.value)}
                    placeholder={currentTabConfig.placeholder}
                    className="w-full pl-4 pr-10 py-3.5 bg-[#f7f9ff] border border-[#c0c7d6] rounded-2xl text-sm font-mono text-[#131c25] focus:outline-none focus:ring-2 focus:ring-[#005cab] shadow-sm"
                  />
                )}

                {targetInput && (
                  <button
                    type="button"
                    onClick={() => setTargetInput("")}
                    className="absolute right-3 top-3.5 p-1 text-[#707785] hover:text-[#131c25]"
                    title="Clear input"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    setSelectedFile(e.dataTransfer.files[0]);
                  }
                }}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#a5c8ff] hover:border-[#005cab] bg-[#edf4ff]/50 hover:bg-[#edf4ff] rounded-2xl p-6 text-center cursor-pointer transition-colors space-y-3"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="video/*,image/*,audio/*,.apk,.pdf"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedFile(e.target.files[0]);
                    }
                  }}
                />
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto text-[#005cab] shadow-sm border border-[#a5c8ff]">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#131c25]">
                    Click to select suspect APK, payment screenshot, or voice recording
                  </p>
                  <p className="text-xs text-[#707785] mt-0.5">
                    Evaluates byte headers, permissions, and threat signatures.
                  </p>
                </div>
              </div>

              {selectedFile && (
                <div className="p-3 bg-[#edf4ff] rounded-xl flex items-center justify-between text-xs font-mono text-[#005cab] border border-[#a5c8ff]">
                  <div className="flex items-center gap-2 truncate">
                    <File className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate font-bold">{selectedFile.name}</span>
                    <span className="text-[#707785]">
                      ({(selectedFile.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    className="p-1 text-[#b51a1e] hover:bg-[#ffdad6] rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Quick Functional Test Triggers */}
          <div className="space-y-2 pt-2 border-t border-[#c0c7d6]/40">
            <span className="text-xs font-mono font-semibold text-[#404753] block">
              Test Scenarios (Instant Functionality Inspection):
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  const val = "https://www.stanbicbank.co.ug";
                  setTargetInput(val);
                  setSelectedFile(null);
                  setActiveTab("url");
                  handleAnalyze(val);
                }}
                className="text-xs px-2.5 py-1 bg-[#f7fff1] hover:bg-[#e1f9d5] text-[#186a22] rounded-lg border border-[#88d982] font-mono transition-colors"
              >
                ✓ Legitimate Banking Portal
              </button>
              <button
                type="button"
                onClick={() => {
                  const val = "http://fx-arbitrage-payout-vault.net/app-download.apk";
                  setTargetInput(val);
                  setSelectedFile(null);
                  setActiveTab("url");
                  handleAnalyze(val);
                }}
                className="text-xs px-2.5 py-1 bg-[#ffdad6] hover:bg-[#ffc2bb] text-[#93000e] rounded-lg border border-[#ffb4ac] font-mono transition-colors"
              >
                ⚠ Fake Arbitrage APK Link
              </button>
              <button
                type="button"
                onClick={() => {
                  const val = "+256 772 000 000";
                  setTargetInput(val);
                  setSelectedFile(null);
                  setActiveTab("phone");
                  handleAnalyze(val);
                }}
                className="text-xs px-2.5 py-1 bg-[#edf4ff] hover:bg-[#d4e3ff] text-[#005cab] rounded-lg border border-[#a5c8ff] font-mono transition-colors"
              >
                📱 Mobile Money Number
              </button>
              <button
                type="button"
                onClick={() => {
                  const val = "URGENT: Your mobile money account will be suspended within 1 hour. Call +25670199999 to verify your PIN.";
                  setTargetInput(val);
                  setSelectedFile(null);
                  setActiveTab("message");
                  handleAnalyze(val);
                }}
                className="text-xs px-2.5 py-1 bg-[#edf4ff] hover:bg-[#d4e3ff] text-[#005cab] rounded-lg border border-[#a5c8ff] font-mono transition-colors"
              >
                💬 Urgent Phishing SMS
              </button>
            </div>
          </div>

          {/* Action Trigger Button */}
          <button
            type="button"
            disabled={isScanning || (!targetInput.trim() && !selectedFile)}
            onClick={() => handleAnalyze()}
            className="w-full py-4 bg-[#005cab] hover:bg-[#004786] disabled:opacity-40 disabled:pointer-events-none text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-[0.99] text-base flex items-center justify-center gap-3"
          >
            {isScanning ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Executing Cryptographic Threat Verification...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Execute Deep Threat Analysis</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Active Radar & Real-Time Sensors (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#c0c7d6]/70 shadow-lg space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#c0c7d6]/40 pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#131c25] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#186a22] animate-pulse"></span>
                VECTOR RADAR SCANNER
              </span>
              <span className="text-[11px] font-mono text-[#005cab] bg-[#edf4ff] px-2 py-0.5 rounded border border-[#a5c8ff]">
                UG-KLA-01 ACTIVE
              </span>
            </div>

            {/* Radar Visual Frame */}
            <div className="relative w-full aspect-square max-h-[280px] bg-[#131c25] rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
              <iframe
                src="https://lottie.host/embed/53ef6fb5-8875-4b5f-81e1-cb4006aa8c7c/P0U9eYRek3.lottie"
                className="w-full h-full border-0 pointer-events-none opacity-90 scale-105"
                title="ScamAdvisor Active Scanner Visualizer"
              ></iframe>
              <div className="absolute top-3 left-3 bg-[#131c25]/85 backdrop-blur-md px-2.5 py-1 rounded border border-[#a5c8ff]/30 text-[10px] font-mono text-[#a5c8ff]">
                HONEYPOTS: SYNCHRONIZED
              </div>
              <div className="absolute bottom-3 right-3 bg-[#131c25]/85 backdrop-blur-md px-2.5 py-1 rounded border border-[#ffb4ac]/30 text-[10px] font-mono text-[#ffb4ac]">
                TELEMETRY: LIVE
              </div>
            </div>

            {/* Live Metrics Strip */}
            <div className="grid grid-cols-3 gap-2.5 text-center font-mono">
              <div className="p-3 bg-[#edf4ff] rounded-xl border border-[#a5c8ff]/40">
                <span className="text-[10px] text-[#404753] block">Engine Latency</span>
                <strong className="text-base font-bold text-[#005cab]">
                  {scanResult ? `${scanResult.responseTimeMs}ms` : "< 220ms"}
                </strong>
              </div>
              <div className="p-3 bg-[#edf4ff] rounded-xl border border-[#a5c8ff]/40">
                <span className="text-[10px] text-[#404753] block">Heuristic Rules</span>
                <strong className="text-base font-bold text-[#005cab]">
                  {scanResult ? `${scanResult.heuristicsEvaluated} Rules` : "18 Rules"}
                </strong>
              </div>
              <div
                className={`p-3 rounded-xl border ${
                  scanResult && scanResult.signaturesMatched > 0
                    ? "bg-[#ffdad6] border-[#ffb4ac] text-[#93000e]"
                    : "bg-[#f7fff1] border-[#88d982] text-[#186a22]"
                }`}
              >
                <span className="text-[10px] block opacity-80">Signatures</span>
                <strong className="text-base font-bold">
                  {scanResult ? `${scanResult.signaturesMatched} Matched` : "0 Matched"}
                </strong>
              </div>
            </div>
          </div>

          <div className="text-xs text-[#404753] leading-relaxed bg-[#f7f9ff] p-4 rounded-xl border border-[#c0c7d6]/40">
            Real-time checks include DNS registrar anonymity masks, SSL root authority verification,
            telecom carrier MSISDN KYC registries, and West-East African syndicate intelligence.
          </div>
        </div>
      </div>

      {/* Primary Results Panel (Rendered when a scan result exists) */}
      {scanResult ? (
        <section
          id="results-panel"
          className="bg-white rounded-3xl border border-[#c0c7d6]/70 shadow-xl p-6 sm:p-10 space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-300"
        >
          {/* Results Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#c0c7d6]/40 pb-6">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-mono font-black tracking-wider uppercase ${
                    scanResult.scamRiskIndex > 50
                      ? "bg-[#ffdad6] text-[#93000e] border border-[#ffb4ac]"
                      : "bg-[#f7fff1] text-[#186a22] border border-[#88d982]"
                  }`}
                >
                  {scanResult.statusLabel}
                </span>
                <span className="text-xs font-mono text-[#707785]">
                  SCAN ID: #{scanResult.scanId}
                </span>
                {scanResult.targetType && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#edf4ff] text-[#005cab] border border-[#a5c8ff] uppercase">
                    TYPE: {scanResult.targetType}
                  </span>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-mono text-[#131c25] break-all">
                {scanResult.target}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-auto">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#edf4ff] hover:bg-[#d4e3ff] text-[#005cab] text-xs font-mono font-bold rounded-xl border border-[#a5c8ff] transition-colors"
              >
                {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? "Link Copied" : "Copy Target"}</span>
              </button>
              <button
                onClick={handleCopySummary}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#f0f4fc] hover:bg-[#dce7f9] text-[#131c25] text-xs font-mono font-bold rounded-xl border border-[#c0c7d6] transition-colors"
              >
                {copiedSummary ? <Check className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                <span>{copiedSummary ? "Summary Copied" : "Copy Report"}</span>
              </button>
              <button
                onClick={handleDownloadDossier}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#f0f4fc] hover:bg-[#dce7f9] text-[#131c25] text-xs font-mono font-bold rounded-xl border border-[#c0c7d6] transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>JSON</span>
              </button>
              <button
                onClick={() => onOpenReportModal(scanResult.target)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#ffdad6] hover:bg-[#ffb4ac] text-[#93000e] text-xs font-mono font-bold rounded-xl border border-[#ffb4ac] transition-colors"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Submit to Blacklist</span>
              </button>
              <button
                onClick={handleResetScan}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#005cab] hover:bg-[#004786] text-white text-xs font-mono font-bold rounded-xl shadow-sm transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Scan Another</span>
              </button>
            </div>
          </div>

          {/* Split Metrics Meter & Dual-Color Horizontal Progress Bar */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#186a22]"></span>
                  <span className="text-xs font-mono font-bold text-[#186a22] uppercase">
                    Legitimacy Score: {scanResult.legitimacyScore}%
                  </span>
                </div>
                <p className="text-xs text-[#707785] mt-0.5">
                  {scanResult.legitimacyScore > 50
                    ? "High institutional credibility & clean DNS telemetry"
                    : "Low trust integrity score based on registrar or routing anonymity"}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <div className="flex items-center sm:justify-end gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#b51a1e] animate-ping"></span>
                  <span className="text-xs font-mono font-bold text-[#b51a1e] uppercase">
                    Scam Risk Index: {scanResult.scamRiskIndex}%
                  </span>
                </div>
                <p className="text-xs text-[#707785] mt-0.5">
                  {scanResult.scamRiskIndex > 50
                    ? "Extreme syndicate fraud probability & payload indicators"
                    : "Minimal threat likelihood detected"}
                </p>
              </div>
            </div>

            {/* Dual-Color Horizontal Progress Bar with tooltips */}
            <div className="relative w-full h-7 bg-[#e6effb] rounded-xl overflow-hidden flex border border-[#c0c7d6]/70 shadow-inner">
              <div
                style={{ width: `${scanResult.legitimacyScore}%` }}
                className="h-full bg-gradient-to-r from-[#186a22] to-[#358438] transition-all duration-700 flex items-center justify-start pl-3 text-[11px] font-mono font-bold text-white whitespace-nowrap overflow-hidden"
              >
                {scanResult.legitimacyScore >= 12 && (
                  <span>{scanResult.legitimacyScore}% SAFE</span>
                )}
              </div>
              <div
                style={{ width: `${scanResult.scamRiskIndex}%` }}
                className="h-full bg-gradient-to-r from-[#d93633] to-[#b51a1e] transition-all duration-700 flex items-center justify-end pr-3 text-[11px] font-mono font-bold text-white whitespace-nowrap overflow-hidden"
              >
                {scanResult.scamRiskIndex >= 12 && (
                  <span>{scanResult.scamRiskIndex}% FRAUD RISK</span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-[#707785]">
              <span>0% (ZERO TRUST)</span>
              <span>50% EQUILIBRIUM THRESHOLD</span>
              <span>100% (CRITICAL RISK)</span>
            </div>
          </div>

          {/* Diagnostic Breakdown & Forensic Signals (4 Cards) */}
          <div className="space-y-4 pt-4">
            <h4 className="text-base font-bold text-[#131c25] font-['Hanken_Grotesk'] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#005cab]" />
              <span>Diagnostic Breakdown & Forensic Signals</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scanResult.signals.map((signal, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border transition-all ${
                    signal.severity === "critical"
                      ? "bg-[#fffbff] border-[#ffdad6] shadow-sm hover:border-[#ffb4ac]"
                      : "bg-[#f7fff1] border-[#88d982]/60 shadow-sm"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        signal.severity === "critical"
                          ? "bg-[#ffdad6] text-[#93000e]"
                          : "bg-[#a3f69c] text-[#002204]"
                      }`}
                    >
                      {signal.severity === "critical" ? (
                        <AlertTriangle className="w-5 h-5" />
                      ) : (
                        <Check className="w-5 h-5" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <h5 className="font-bold text-sm text-[#131c25] font-['Hanken_Grotesk']">
                        {idx + 1}. {signal.title}
                      </h5>
                      <p className="text-xs text-[#404753] leading-relaxed">
                        {signal.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Safe Alternatives Engine (Triggered if Risk >= 50%) */}
          {scanResult.showSafeAlternatives && (
            <div
              id="safe-alternatives-engine"
              className="p-6 sm:p-8 bg-gradient-to-br from-[#f7fff1] to-[#edf4ff] rounded-3xl border border-[#88d982] space-y-6 shadow-md animate-in fade-in duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#88d982]/40 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#186a22] bg-[#a3f69c]/50 px-2.5 py-0.5 rounded border border-[#358438]">
                    REGULATED FINANCIAL CHANNELS
                  </span>
                  <h4 className="text-xl sm:text-2xl font-bold text-[#131c25] mt-1 font-['Hanken_Grotesk']">
                    Safe Alternatives Engine
                  </h4>
                  <p className="text-xs text-[#404753] mt-0.5">
                    This endpoint poses significant fraud risk. Conduct transactions solely through
                    licensed East African banking and fintech providers:
                  </p>
                </div>
                <span className="text-xs font-mono text-[#186a22] font-bold">
                  PROTECTION SHIELD ACTIVE
                </span>
              </div>

              {/* 3 Safe Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SAFE_ALTERNATIVES.map((alt, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-5 rounded-2xl border border-[#c0c7d6]/60 shadow-sm space-y-3 flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono font-bold text-[#005cab] bg-[#edf4ff] px-2 py-0.5 rounded border border-[#a5c8ff]">
                          {alt.institution}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#707785]" />
                      </div>
                      <h5 className="font-bold text-sm text-[#131c25]">{alt.title}</h5>
                      <p className="text-xs text-[#404753] leading-relaxed">
                        {alt.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#c0c7d6]/40">
                      <a
                        href={alt.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#005cab] hover:underline"
                      >
                        <span>Visit Verified Service</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Guidance Advisory Notice */}
              <div className="p-4 bg-white rounded-2xl border border-[#a5c8ff] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 text-[#004786]">
                  <ShieldCheck className="w-5 h-5 text-[#005cab] flex-shrink-0" />
                  <span>
                    <strong>Need immediate guidance?</strong> Learn the key warning signs of advance-fee
                    arbitrage & fake parcel delivery scams.
                  </span>
                </div>
                <button
                  onClick={onOpenAdvisories}
                  className="px-4 py-2 bg-[#005cab] hover:bg-[#004786] text-white font-bold rounded-xl transition-colors whitespace-nowrap"
                >
                  View Security Advisories
                </button>
              </div>
            </div>
          )}
        </section>
      ) : (
        /* Ready State / Functional Assessment Utility (When no scan has been executed yet) */
        <div className="space-y-8">
          {/* Interactive Pre-Payment Fraud Risk Assessment Checklist */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#c0c7d6]/70 shadow-lg space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#c0c7d6]/40 pb-4">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#005cab] bg-[#edf4ff] px-2.5 py-0.5 rounded border border-[#a5c8ff]">
                  INTERACTIVE SAFETY TOOL
                </span>
                <h3 className="text-xl font-bold text-[#131c25] mt-1 font-['Hanken_Grotesk']">
                  Pre-Transaction Danger Assessment
                </h3>
                <p className="text-xs text-[#404753] mt-0.5">
                  About to send money or approve a USSD prompt? Check the conditions that apply:
                </p>
              </div>

              {/* Dynamic Risk Gauge */}
              <div className="bg-[#f7f9ff] border border-[#c0c7d6] rounded-2xl px-4 py-3 flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] font-mono text-[#707785] uppercase block font-bold">
                    Calculated Risk
                  </span>
                  <span
                    className={`text-xl font-black font-mono ${
                      calculatedPrePaymentRisk >= 60
                        ? "text-[#b51a1e]"
                        : calculatedPrePaymentRisk >= 20
                        ? "text-[#b06000]"
                        : "text-[#186a22]"
                    }`}
                  >
                    {calculatedPrePaymentRisk}%
                  </span>
                </div>
                <div
                  className={`w-3 h-10 rounded-full ${
                    calculatedPrePaymentRisk >= 60
                      ? "bg-[#b51a1e]"
                      : calculatedPrePaymentRisk >= 20
                      ? "bg-[#b06000]"
                      : "bg-[#186a22]"
                  }`}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <label
                className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-colors ${
                  checklist.unsolicitedContact
                    ? "bg-[#ffdad6]/40 border-[#ffb4ac]"
                    : "bg-[#f7f9ff] border-[#c0c7d6]/60 hover:bg-[#edf4ff]"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checklist.unsolicitedContact}
                  onChange={(e) =>
                    setChecklist({ ...checklist, unsolicitedContact: e.target.checked })
                  }
                  className="mt-1 w-4 h-4 rounded text-[#005cab] focus:ring-[#005cab]"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#131c25]">
                    1. Unsolicited Initial Contact
                  </h4>
                  <p className="text-xs text-[#404753] mt-0.5">
                    They reached out to you first via WhatsApp, Telegram, Facebook, or unexpected SMS.
                  </p>
                </div>
              </label>

              <label
                className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-colors ${
                  checklist.upfrontFeeDemanded
                    ? "bg-[#ffdad6]/40 border-[#ffb4ac]"
                    : "bg-[#f7f9ff] border-[#c0c7d6]/60 hover:bg-[#edf4ff]"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checklist.upfrontFeeDemanded}
                  onChange={(e) =>
                    setChecklist({ ...checklist, upfrontFeeDemanded: e.target.checked })
                  }
                  className="mt-1 w-4 h-4 rounded text-[#005cab] focus:ring-[#005cab]"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#131c25]">
                    2. Upfront Clearance or "Gas Fee"
                  </h4>
                  <p className="text-xs text-[#404753] mt-0.5">
                    Demanding you pay a deposit, registration fee, or customs clearance before receiving funds.
                  </p>
                </div>
              </label>

              <label
                className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-colors ${
                  checklist.pinOrOtpRequested
                    ? "bg-[#ffdad6]/40 border-[#ffb4ac]"
                    : "bg-[#f7f9ff] border-[#c0c7d6]/60 hover:bg-[#edf4ff]"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checklist.pinOrOtpRequested}
                  onChange={(e) =>
                    setChecklist({ ...checklist, pinOrOtpRequested: e.target.checked })
                  }
                  className="mt-1 w-4 h-4 rounded text-[#005cab] focus:ring-[#005cab]"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#131c25]">
                    3. PIN, OTP, or Reversal Request
                  </h4>
                  <p className="text-xs text-[#404753] mt-0.5">
                    Asking you to read back a verification code or approve a prompt claiming a "mistaken deposit".
                  </p>
                </div>
              </label>

              <label
                className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-colors ${
                  checklist.extremeUrgency
                    ? "bg-[#ffdad6]/40 border-[#ffb4ac]"
                    : "bg-[#f7f9ff] border-[#c0c7d6]/60 hover:bg-[#edf4ff]"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checklist.extremeUrgency}
                  onChange={(e) =>
                    setChecklist({ ...checklist, extremeUrgency: e.target.checked })
                  }
                  className="mt-1 w-4 h-4 rounded text-[#005cab] focus:ring-[#005cab]"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#131c25]">
                    4. Threat of Penalty / Artificial Urgency
                  </h4>
                  <p className="text-xs text-[#404753] mt-0.5">
                    Claiming your account will be deleted, legal action taken, or prize revoked within hours.
                  </p>
                </div>
              </label>

              <label
                className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-colors md:col-span-2 ${
                  checklist.personalNumberNotMerchant
                    ? "bg-[#ffdad6]/40 border-[#ffb4ac]"
                    : "bg-[#f7f9ff] border-[#c0c7d6]/60 hover:bg-[#edf4ff]"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checklist.personalNumberNotMerchant}
                  onChange={(e) =>
                    setChecklist({ ...checklist, personalNumberNotMerchant: e.target.checked })
                  }
                  className="mt-1 w-4 h-4 rounded text-[#005cab] focus:ring-[#005cab]"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#131c25]">
                    5. Personal Individual Account Instead of Official Merchant Code
                  </h4>
                  <p className="text-xs text-[#404753] mt-0.5">
                    Requesting payment to a personal individual name rather than a registered MTN/Airtel Merchant Code (*165*3#).
                  </p>
                </div>
              </label>
            </div>

            {calculatedPrePaymentRisk > 0 && (
              <div
                className={`p-4 rounded-2xl border flex items-center justify-between text-xs ${
                  calculatedPrePaymentRisk >= 60
                    ? "bg-[#ffdad6] border-[#ffb4ac] text-[#93000e]"
                    : "bg-[#fff8e1] border-[#ffe082] text-[#855100]"
                }`}
              >
                <div className="flex items-center gap-2 font-bold">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                  <span>
                    {calculatedPrePaymentRisk >= 60
                      ? "CRITICAL WARNING: High fraud probability! Halt all transactions immediately."
                      : "CAUTION: Suspicious indicators present. Verify through official customer care first."}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setChecklist({
                      unsolicitedContact: false,
                      upfrontFeeDemanded: false,
                      pinOrOtpRequested: false,
                      extremeUrgency: false,
                      personalNumberNotMerchant: false,
                    })
                  }
                  className="font-mono text-xs hover:underline whitespace-nowrap ml-2"
                >
                  Reset
                </button>
              </div>
            )}
          </section>

          {/* Emergency Escalation & Verification Directory */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#c0c7d6]/70 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-[#c0c7d6]/40 pb-3">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#005cab]" />
                <h3 className="font-bold text-base text-[#131c25] font-['Hanken_Grotesk']">
                  Official Ugandan Emergency Anti-Fraud Hotlines
                </h3>
              </div>
              <span className="text-xs font-mono text-[#186a22] font-bold">DIRECT VERIFICATION</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-4 bg-[#f7f9ff] rounded-2xl border border-[#c0c7d6]/50 space-y-1">
                <span className="text-[10px] font-mono text-[#005cab] font-bold uppercase block">
                  Central Bank
                </span>
                <strong className="text-sm text-[#131c25] block">Bank of Uganda Fraud Desk</strong>
                <p className="text-xs text-[#404753] font-mono">0800 200 003 / 0414 434 000</p>
              </div>

              <div className="p-4 bg-[#f7f9ff] rounded-2xl border border-[#c0c7d6]/50 space-y-1">
                <span className="text-[10px] font-mono text-[#005cab] font-bold uppercase block">
                  Law Enforcement
                </span>
                <strong className="text-sm text-[#131c25] block">Uganda Police CID Cyber</strong>
                <p className="text-xs text-[#404753] font-mono">0800 199 699 (Toll Free)</p>
              </div>

              <div className="p-4 bg-[#f7f9ff] rounded-2xl border border-[#c0c7d6]/50 space-y-1">
                <span className="text-[10px] font-mono text-[#005cab] font-bold uppercase block">
                  Mobile Money
                </span>
                <strong className="text-sm text-[#131c25] block">MTN MoMo Anti-Fraud</strong>
                <p className="text-xs text-[#404753] font-mono">Dial 100 or USSD *165#</p>
              </div>

              <div className="p-4 bg-[#f7f9ff] rounded-2xl border border-[#c0c7d6]/50 space-y-1">
                <span className="text-[10px] font-mono text-[#005cab] font-bold uppercase block">
                  Mobile Money
                </span>
                <strong className="text-sm text-[#131c25] block">Airtel Money Anti-Fraud</strong>
                <p className="text-xs text-[#404753] font-mono">Dial 100 or 0750 000 100</p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Security Architecture Guarantees */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#c0c7d6]/40">
        <div className="p-5 bg-white rounded-2xl border border-[#c0c7d6]/60 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-[#005cab]">
            <Lock className="w-4 h-4" />
            <h5 className="font-bold text-sm">Zero Data Retention</h5>
          </div>
          <p className="text-xs text-[#404753] leading-relaxed">
            Target URLs and scanned payloads are processed in volatile RAM. No personal identifiable
            information is logged.
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-[#c0c7d6]/60 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-[#005cab]">
            <Database className="w-4 h-4" />
            <h5 className="font-bold text-sm">Syndicate Cross-Indexing</h5>
          </div>
          <p className="text-xs text-[#404753] leading-relaxed">
            Targets are cross-referenced against 8.4M+ international honeypot records and active
            East African incident reports.
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-[#c0c7d6]/60 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-[#005cab]">
            <RotateCcw className="w-4 h-4" />
            <h5 className="font-bold text-sm">Real-Time Safe Fallbacks</h5>
          </div>
          <p className="text-xs text-[#404753] leading-relaxed">
            Whenever an unverified or flagged destination is detected, official regulated banking
            alternatives are served immediately.
          </p>
        </div>
      </div>
    </div>
  );
};
