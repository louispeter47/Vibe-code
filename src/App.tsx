import React, { useState } from "react";
import { NavigationPage } from "./types";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomeView } from "./views/HomeView";
import { ScamCheckerView } from "./views/ScamCheckerView";
import { AboutUsView } from "./views/AboutUsView";
import { ReportModal } from "./components/ReportModal";
import { AdvisoryModal } from "./components/AdvisoryModal";
import { QuickCheckModal } from "./components/QuickCheckModal";

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>("home");
  const [activeTarget, setActiveTarget] = useState<string>("");
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportInitialTarget, setReportInitialTarget] = useState("");
  const [isAdvisoryModalOpen, setIsAdvisoryModalOpen] = useState(false);
  const [isQuickCheckOpen, setIsQuickCheckOpen] = useState(false);

  const handleNavigate = (page: NavigationPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAnalyzeTarget = (target: string) => {
    setActiveTarget(target);
    setCurrentPage("scam-checker");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenReportModal = (target?: string) => {
    setReportInitialTarget(target || activeTarget || "");
    setIsReportModalOpen(true);
  };

  return (
    <div id="scamadvisor-app" className="min-h-screen flex flex-col bg-[#f7f9ff] text-[#131c25]">
      {/* Universal Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenReportModal={() => handleOpenReportModal()}
        onQuickCheck={() => setIsQuickCheckOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {currentPage === "home" && (
          <HomeView
            onNavigate={handleNavigate}
            onAnalyzeTarget={handleAnalyzeTarget}
            onOpenReportModal={() => handleOpenReportModal()}
          />
        )}

        {currentPage === "scam-checker" && (
          <ScamCheckerView
            initialTarget={activeTarget}
            onOpenReportModal={(t) => handleOpenReportModal(t)}
            onOpenAdvisories={() => setIsAdvisoryModalOpen(true)}
          />
        )}

        {currentPage === "about-us" && (
          <AboutUsView
            onNavigate={handleNavigate}
            onOpenReportModal={() => handleOpenReportModal()}
          />
        )}
      </main>

      {/* Universal Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenReportModal={() => handleOpenReportModal()}
        onOpenAdvisories={() => setIsAdvisoryModalOpen(true)}
      />

      {/* Modals */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        initialTarget={reportInitialTarget}
      />

      <AdvisoryModal
        isOpen={isAdvisoryModalOpen}
        onClose={() => setIsAdvisoryModalOpen(false)}
        onRunCheck={() => {
          setIsAdvisoryModalOpen(false);
          handleNavigate("scam-checker");
        }}
      />

      <QuickCheckModal
        isOpen={isQuickCheckOpen}
        onClose={() => setIsQuickCheckOpen(false)}
        onInspectTarget={(target) => handleAnalyzeTarget(target)}
      />
    </div>
  );
}
