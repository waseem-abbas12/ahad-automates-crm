import React, { useState, useEffect } from 'react';
import { CRMProvider, useCRM } from './context/CRMContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { CommandPalette } from './components/layout/CommandPalette';
import { AddLeadModal } from './components/modals/AddLeadModal';
import { CsvImportModal } from './components/modals/CsvImportModal';
import { QuickTaskModal } from './components/modals/QuickTaskModal';

// Views
import { TodaysTasksView } from './views/TodaysTasksView';
import { DashboardView } from './views/DashboardView';
import { LeadsListView } from './views/LeadsListView';
import { LeadDetailView } from './views/LeadDetailView';
import { PipelineKanbanView } from './views/PipelineKanbanView';
import { TasksView } from './views/TasksView';
import { FollowupsView } from './views/FollowupsView';
import { AnalyticsView } from './views/AnalyticsView';
import { SettingsView } from './views/SettingsView';
import { AuthView } from './views/AuthView';

import { Toaster } from 'sonner';

const MainApp: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentView, setCurrentView] = useState<string>('todays-tasks');
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  // Modals state
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isQuickTaskModalOpen, setIsQuickTaskModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K opens Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
      // 'N' key when not focused in input/textarea opens Add Lead Modal
      if (
        e.key.toLowerCase() === 'n' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName) &&
        !isAddLeadModalOpen &&
        !isCommandPaletteOpen
      ) {
        e.preventDefault();
        setIsAddLeadModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAddLeadModalOpen, isCommandPaletteOpen]);

  const handleNavigate = (view: string, leadId?: string) => {
    setCurrentView(view);
    if (leadId) {
      setSelectedLeadId(leadId);
    }
  };

  const handleNavigateToLead = (leadId: string) => {
    setSelectedLeadId(leadId);
    setCurrentView('lead-detail');
  };

  if (!isAuthenticated) {
    return <AuthView onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex antialiased">
      {/* Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenAddLead={() => setIsAddLeadModalOpen(true)}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        onLogout={() => setIsAuthenticated(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Header Bar */}
        <Header
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenAddLead={() => setIsAddLeadModalOpen(true)}
          onOpenAddTask={() => setIsQuickTaskModalOpen(true)}
          onNavigateToLead={handleNavigateToLead}
        />

        {/* View Router */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentView === 'todays-tasks' && (
            <TodaysTasksView
              onNavigateToLead={handleNavigateToLead}
              onOpenAddLead={() => setIsAddLeadModalOpen(true)}
            />
          )}

          {currentView === 'dashboard' && (
            <DashboardView
              onNavigate={handleNavigate}
              onOpenAddLead={() => setIsAddLeadModalOpen(true)}
            />
          )}

          {currentView === 'leads' && (
            <LeadsListView
              onNavigateToLead={handleNavigateToLead}
              onOpenAddLead={() => setIsAddLeadModalOpen(true)}
              onOpenImportModal={() => setIsImportModalOpen(true)}
            />
          )}

          {currentView === 'lead-detail' && selectedLeadId && (
            <LeadDetailView
              leadId={selectedLeadId}
              onBack={() => setCurrentView('leads')}
            />
          )}

          {currentView === 'pipeline' && (
            <PipelineKanbanView
              onNavigateToLead={handleNavigateToLead}
              onOpenAddLead={() => setIsAddLeadModalOpen(true)}
            />
          )}

          {currentView === 'tasks' && (
            <TasksView
              onNavigateToLead={handleNavigateToLead}
            />
          )}

          {currentView === 'followups' && (
            <FollowupsView
              onNavigateToLead={handleNavigateToLead}
            />
          )}

          {currentView === 'analytics' && (
            <AnalyticsView />
          )}

          {currentView === 'settings' && (
            <SettingsView />
          )}
        </main>
      </div>

      {/* Modals & Overlays */}
      <AddLeadModal
        isOpen={isAddLeadModalOpen}
        onClose={() => setIsAddLeadModalOpen(false)}
        onLeadCreated={(lead) => handleNavigateToLead(lead.id)}
      />

      <CsvImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />

      <QuickTaskModal
        isOpen={isQuickTaskModalOpen}
        onClose={() => setIsQuickTaskModalOpen(false)}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
        onOpenAddLead={() => setIsAddLeadModalOpen(true)}
        onOpenImportModal={() => setIsImportModalOpen(true)}
      />

      {/* Global Notifications Toaster */}
      <Toaster position="bottom-right" richColors />
    </div>
  );
};

export default function App() {
  return (
    <CRMProvider>
      <MainApp />
    </CRMProvider>
  );
}
