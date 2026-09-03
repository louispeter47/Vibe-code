import { ScanResult, ThreatVector } from "../types";

export const SAMPLE_TARGETS = [
  {
    label: "Arbitrage APK (Critical)",
    value: "http://fx-arbitrage-payout-vault.net/app-download.apk",
  },
  {
    label: "Fidelity Phishing Clone",
    value: "https://invest-fidelity-app.ng-node-09.biz",
  },
  {
    label: "Telegram Crypto Handle",
    value: "+234 812 991 4302",
  },
  {
    label: "Stanbic Bank (Safe)",
    value: "https://www.stanbicbank.co.ug",
  },
  {
    label: "Chipper Cash (Safe)",
    value: "https://chippercash.com",
  },
];

export const DEFAULT_SCAN_RESULT: ScanResult = {
  scanId: "SCM-2026-UG-99814",
  target: "http://fx-arbitrage-payout-vault.net/app-download.apk",
  verdict: "CRITICAL_THREAT",
  statusLabel: "FLAGGED: CRITICAL THREAT",
  legitimacyScore: 12,
  scamRiskIndex: 88,
  responseTimeMs: 240,
  heuristicsEvaluated: 14,
  signaturesMatched: 1,
  showSafeAlternatives: true,
  signals: [
    {
      title: "Domain Age Anomaly",
      description: "Flagged domain registered < 14 days ago via privacy proxy registrar (Panama Shielded). Zero verifiable corporate identity behind DNS root.",
      severity: "critical",
      icon: "calendar_today",
    },
    {
      title: "Advance-Fee Fraud Signatures",
      description: "Advance-fee fraud payment pattern detected in telemetry. Demands upfront gas fee or processing deposit before promise of locked payout.",
      severity: "critical",
      icon: "payments",
    },
    {
      title: "Malicious Executable Payload",
      description: "Audio/APK contains unverified executable signatures, accessibility service hooks, and SMS token interception routines.",
      severity: "critical",
      icon: "security",
    },
    {
      title: "Syndicate Attack Vector Match",
      description: "High-probability Yahoo-Boy / 419 syndicate attack vector. Matches known spoofed Telegram crypto bot scripts originating from West-East Africa cluster nodes.",
      severity: "critical",
      icon: "emergency",
    },
  ],
};

export const THREAT_VECTORS: ThreatVector[] = [
  {
    id: "romance",
    title: "Advance-Fee Romance",
    badge: "CRITICAL",
    badgeColor: "critical",
    icon: "favorite",
    description: "Fake overseas partners or military contractors demanding gift cards or travel clearing fees before meeting.",
    avgLoss: "$3,400",
    blockedCount: "12,400+",
  },
  {
    id: "crypto",
    title: "Bogus Crypto Bots",
    badge: "HIGH",
    badgeColor: "high",
    icon: "currency_bitcoin",
    description: "Telegram & WhatsApp auto-trading bots promising 200%+ weekly returns with simulated dashboard balances.",
    avgLoss: "$1,850",
    blockedCount: "8,900+",
  },
  {
    id: "sms",
    title: "Phishing SMS Gateways",
    badge: "SPREADING",
    badgeColor: "spreading",
    icon: "sms",
    description: "Spoofed postal delivery and mobile money reversal SMS messages harvesting one-time authentication pins.",
    avgLoss: "$620",
    blockedCount: "34,100+",
  },
  {
    id: "audio",
    title: "Deepfake Audio Notes",
    badge: "EMERGING",
    badgeColor: "emerging",
    icon: "mic",
    description: "Synthesized voice clips on WhatsApp impersonating relatives in urgent distress requiring rapid money transfers.",
    avgLoss: "$950",
    blockedCount: "2,150+",
  },
];

export const SAFE_ALTERNATIVES = [
  {
    title: "Stanbic Bank Digital Portal",
    institution: "Bank of Uganda Licensed",
    url: "https://www.stanbicbank.co.ug",
    type: "Licensed Financial Institution",
    description: "Verified institutional banking, cross-border remittance, and secure digital accounts with 2FA protection.",
    icon: "account_balance",
  },
  {
    title: "Chipper Cash Verified",
    institution: "Verified Fintech",
    url: "https://chippercash.com",
    type: "Cross-Border Remittance",
    description: "Authorized digital wallet supporting regulated peer-to-peer transfers, virtual debit cards, and multi-currency exchange.",
    icon: "account_balance_wallet",
  },
  {
    title: "Google Play & Apple Store",
    institution: "Official Store Channels",
    url: "https://play.google.com/store",
    type: "Signed Package Repositories",
    description: "Download verified applications directly through cryptographically signed stores with automatic malware scanning.",
    icon: "storefront",
  },
];
