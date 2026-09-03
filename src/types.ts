export type NavigationPage = "home" | "scam-checker" | "about-us";

export interface ForensicSignal {
  title: string;
  description: string;
  severity: "critical" | "warning" | "safe";
  icon: string;
}

export interface ScanResult {
  scanId: string;
  target: string;
  verdict: "CRITICAL_THREAT" | "HIGH_RISK" | "SUSPICIOUS" | "VERIFIED_SAFE";
  statusLabel: string;
  legitimacyScore: number;
  scamRiskIndex: number;
  responseTimeMs: number;
  heuristicsEvaluated: number;
  signaturesMatched: number;
  signals: ForensicSignal[];
  showSafeAlternatives: boolean;
  targetType?: "url" | "phone" | "crypto" | "message" | "file";
  timestamp?: string;
  technicalSpecs?: {
    protocol?: string;
    domainTld?: string;
    carrierOrNetwork?: string;
    detectedKeywords?: string[];
    riskFactors?: string[];
    safeIndicators?: string[];
  };
}

export interface HistoryItem {
  id: string;
  target: string;
  targetType: string;
  verdict: string;
  scamRiskIndex: number;
  legitimacyScore: number;
  timestamp: string;
}

export interface ThreatReport {
  id: string;
  target: string;
  category: string;
  notes: string;
  reportedAt: string;
  status: "Flagged: Critical Threat" | "Investigating" | "Neutralized";
}

export interface ThreatVector {
  id: string;
  title: string;
  badge: string;
  badgeColor: "critical" | "high" | "spreading" | "emerging";
  icon: string;
  description: string;
  avgLoss: string;
  blockedCount: string;
}
