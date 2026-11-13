import React from 'react';
import { 
  LayoutDashboard, 
  ListTodo, 
  Users, 
  Columns3, 
  SquareCheckBig, 
  Repeat, 
  BarChart3, 
  Settings, 
  Plus, 
  Moon, 
  Sun, 
  Sparkles, 
  LogOut,
  RotateCcw
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string, leadId?: string) => void;
  onOpenAddLead: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  onOpenAddLead,
  isOpenMobile,
  onCloseMobile,
  onLogout
}) => {
  const { tasks, theme, toggleTheme, profile, resetToDefaultData } = useCRM();

  // Calculate overdue or pending tasks for Today
  const pendingTasksCount = tasks.filter(t => t.status === 'Pending').length;

  const navItems = [
    { id: 'todays-tasks', label: "Today's Tasks", icon: ListTodo, badge: pendingTasksCount > 0 ? pendingTasksCount : undefined },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leads', label: 'Leads', icon: Users },
    { id: 'pipeline', label: 'Pipeline', icon: Columns3 },
    { id: 'tasks', label: 'Tasks', icon: SquareCheckBig },
    { id: 'followups', label: 'Follow-ups', icon: Repeat },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:static top-0 bottom-0 left-0 z-40
        w-64 bg-card border-r border-border
        flex flex-col justify-between
        transition-transform duration-300 ease-in-out
        ${isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Top: Logo & Nav */}
        <div className="flex flex-col p-4 flex-1 overflow-y-auto">
          {/* Logo Section */}
          <div className="flex items-center gap-2.5 px-2 py-3 mb-4">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center text-white shadow-md shadow-primary/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold tracking-tight text-base text-foreground">Waseem Automation</span>
                <span className="px-1.5 py-0.2 text-[10px] font-semibold uppercase tracking-wider rounded bg-primary/10 text-primary border border-primary/20">
                  CRM
                </span>
              </div>
              <span className="text-[11px] text-muted-foreground">High-velocity outbound</span>
            </div>
          </div>

          {/* Add Lead CTA Button */}
          <button
            onClick={onOpenAddLead}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl gradient-primary text-white font-medium text-sm shadow-sm hover:opacity-95 transition-all cursor-pointer group mb-5"
          >
            <span className="flex items-center gap-2">
              <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
              <span>Add Lead</span>
            </span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white/20 rounded text-white">
              N
            </kbd>
          </button>

          {/* Nav Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id || (item.id === 'leads' && currentView.startsWith('lead-detail'));
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer
                    ${isActive 
                      ? 'bg-primary/10 text-primary font-semibold' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/70'}
                  `}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span>{item.label}</span>
                  </span>
                  {item.badge !== undefined && (
                    <span className="px-1.5 py-0.5 text-xs rounded-full font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 tabular-nums">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-3 border-t border-border space-y-2">
          {/* Quick utility actions */}
          <div className="flex items-center justify-between px-2 text-xs text-muted-foreground">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 p-1.5 rounded-lg hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
              title="Toggle Dark / Light Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
            </button>

            <button
              onClick={resetToDefaultData}
              className="flex items-center gap-1 p-1.5 rounded-lg hover:bg-muted hover:text-foreground transition-colors cursor-pointer text-muted-foreground/80 hover:text-foreground"
              title="Reset sample data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* User Profile Bar */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-muted/40 border border-border/50">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-xs flex items-center justify-center shrink-0">
                {profile.userName.charAt(0)}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-foreground truncate">{profile.userName}</span>
                <span className="text-[11px] text-muted-foreground truncate">{profile.userEmail}</span>
              </div>
            </div>
            {onLogout && (
              <button 
                onClick={onLogout}
                className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors cursor-pointer"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
