import React, { useState } from "react";
import { NavigationPage } from "../types";
import { Menu, X, Shield, Search, ArrowRight, Phone, AlertTriangle } from "lucide-react";

interface HeaderProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  onOpenReportModal: () => void;
  onQuickCheck: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenReportModal,
  onQuickCheck,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page: NavigationPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      id="main-header"
      className="sticky top-0 z-50 bg-[#f7f9ff]/95 backdrop-blur-md border-b border-[#c0c7d6]/40 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div
            id="brand-logo"
            onClick={() => handleNav("home")}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="relative w-11 h-11 flex-shrink-0 flex items-center justify-center bg-gradient-to-tr from-[#005cab] to-[#0075d6] rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-200">
              <Shield className="w-6 h-6 text-white" />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#186a22] border-2 border-white rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#005cab] font-['Hanken_Grotesk'] leading-none">
                ScamAdvisor
              </span>
              <span className="text-[9px] sm:text-[10px] font-extrabold tracking-[0.18em] text-[#b51a1e] uppercase font-['JetBrains_Mono'] mt-0.5">
                SAY NO TO YAHOOBOYS
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            id="desktop-nav"
            className="hidden md:flex items-center gap-1 bg-[#e6effb]/60 p-1.5 rounded-full border border-[#c0c7d6]/50"
          >
            <button
              id="nav-home-btn"
              onClick={() => handleNav("home")}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                currentPage === "home"
                  ? "bg-[#005cab] text-white shadow-sm"
                  : "text-[#404753] hover:text-[#131c25] hover:bg-white/60"
              }`}
            >
              Home
            </button>
            <button
              id="nav-checker-btn"
              onClick={() => handleNav("scam-checker")}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                currentPage === "scam-checker"
                  ? "bg-[#005cab] text-white shadow-sm"
                  : "text-[#404753] hover:text-[#131c25] hover:bg-white/60"
              }`}
            >
              Scam Checker
            </button>
            <button
              id="nav-about-btn"
              onClick={() => handleNav("about-us")}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                currentPage === "about-us"
                  ? "bg-[#005cab] text-white shadow-sm"
                  : "text-[#404753] hover:text-[#131c25] hover:bg-white/60"
              }`}
            >
              About Us
            </button>
          </nav>

          {/* Action Area */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="header-quick-check-btn"
              onClick={onQuickCheck}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#005cab] hover:bg-[#004786] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all duration-150 active:scale-[0.98]"
            >
              <Search className="w-4 h-4" />
              <span>Quick Check</span>
            </button>
            <button
              id="header-report-btn"
              onClick={onOpenReportModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#ffdad6] hover:bg-[#ffb4ac] text-[#93000e] text-sm font-semibold rounded-lg transition-colors border border-[#d93633]/20"
              title="Report Suspicious Syndicate Contact"
            >
              <AlertTriangle className="w-4 h-4" />
              <span className="hidden lg:inline">Report Scam</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-quick-check-btn"
              onClick={onQuickCheck}
              className="p-2 bg-[#005cab] text-white rounded-lg shadow-sm"
              aria-label="Quick Check"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              id="mobile-hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-[#131c25] hover:bg-[#e6effb] rounded-lg border border-[#c0c7d6]/40 transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden border-b border-[#c0c7d6] bg-[#f7f9ff] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200 shadow-xl"
        >
          <div className="flex flex-col space-y-1">
            <button
              id="mobile-nav-home"
              onClick={() => handleNav("home")}
              className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-colors flex items-center justify-between ${
                currentPage === "home"
                  ? "bg-[#005cab] text-white"
                  : "text-[#131c25] hover:bg-[#e6effb]"
              }`}
            >
              <span>Home</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </button>
            <button
              id="mobile-nav-checker"
              onClick={() => handleNav("scam-checker")}
              className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-colors flex items-center justify-between ${
                currentPage === "scam-checker"
                  ? "bg-[#005cab] text-white"
                  : "text-[#131c25] hover:bg-[#e6effb]"
              }`}
            >
              <span>Scam & Threat Verification Console</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </button>
            <button
              id="mobile-nav-about"
              onClick={() => handleNav("about-us")}
              className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-colors flex items-center justify-between ${
                currentPage === "about-us"
                  ? "bg-[#005cab] text-white"
                  : "text-[#131c25] hover:bg-[#e6effb]"
              }`}
            >
              <span>About Us (Solo Defense Initiative)</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </button>
          </div>

          <div className="pt-3 border-t border-[#c0c7d6]/50 flex flex-col gap-2">
            <button
              id="mobile-nav-report-threat"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReportModal();
              }}
              className="w-full py-3 bg-[#ffdad6] hover:bg-[#ffb4ac] text-[#93000e] text-sm font-bold rounded-xl flex items-center justify-center gap-2 border border-[#d93633]/20"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Report Syndicate Blacklist Threat</span>
            </button>
            <a
              id="mobile-nav-emergency-call"
              href="tel:+256761675694"
              className="w-full py-3 bg-[#e6effb] hover:bg-[#dae3f0] text-[#005cab] text-sm font-semibold rounded-xl flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Emergency Verification (+256 761675694)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
