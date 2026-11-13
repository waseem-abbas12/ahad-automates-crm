import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  Plus, 
  Check, 
  Calendar, 
  MessageSquare, 
  Flame, 
  Clock 
} from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { formatRelativeTime } from '../../lib/scoring';

interface HeaderProps {
  onOpenMobileSidebar: () => void;
  onOpenCommandPalette: () => void;
  onOpenAddLead: () => void;
  onOpenAddTask: () => void;
  onNavigateToLead?: (leadId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileSidebar,
  onOpenCommandPalette,
  onOpenAddLead,
  onOpenAddTask,
  onNavigateToLead
}) => {
  const { activities, leads, tasks } = useCRM();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const quickMenuRef = useRef<HTMLDivElement>(null);

  // Filter high-priority notification items
  const recentReplies = activities.filter(a => a.activity_type === 'replied' || a.activity_type === 'interested');
  const overdueTasks = tasks.filter(t => t.status === 'Pending' && new Date(t.due_date) < new Date());
  const unreadCount = recentReplies.length + overdueTasks.length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (quickMenuRef.current && !quickMenuRef.current.contains(event.target as Node)) {
        setShowQuickMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 px-4 md:px-6 bg-card border-b border-border flex items-center justify-between sticky top-0 z-30">
      {/* Left: Mobile Menu + Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted lg:hidden cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar Button */}
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-3 px-3 py-1.5 w-48 sm:w-72 md:w-80 rounded-xl bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/80 text-sm transition-all cursor-pointer group"
        >
          <Search className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="truncate text-xs sm:text-sm">Search leads, tasks, actions...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 ml-auto px-1.5 py-0.5 text-[10px] font-mono bg-card border border-border rounded text-muted-foreground">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Quick Actions & Notifications */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Create Dropdown */}
        <div className="relative" ref={quickMenuRef}>
          <button
            onClick={() => setShowQuickMenu(!showQuickMenu)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted text-foreground text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-primary" />
            <span className="hidden sm:inline">New</span>
          </button>

          {showQuickMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg py-1 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
              <button
                onClick={() => {
                  setShowQuickMenu(false);
                  onOpenAddLead();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs sm:text-sm text-foreground hover:bg-muted transition-colors text-left cursor-pointer"
              >
                <Plus className="w-4 h-4 text-primary" />
                <span>Create Lead</span>
              </button>
              <button
                onClick={() => {
                  setShowQuickMenu(false);
                  onOpenAddTask();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs sm:text-sm text-foreground hover:bg-muted transition-colors text-left cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-indigo-500" />
                <span>Schedule Task</span>
              </button>
            </div>
          )}
        </div>

        {/* Notifications Popover */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-card" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-card border border-border rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150">
              <div className="px-4 py-3 border-b border-border flex items-center justify-between bg-muted/30">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm">Notifications</h4>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-rose-500/10 text-rose-600 font-medium">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">High-priority alerts</span>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-border">
                {recentReplies.length === 0 && overdueTasks.length === 0 ? (
                  <div className="p-6 text-center text-xs text-muted-foreground">
                    <Check className="w-8 h-8 mx-auto text-emerald-500 mb-2 opacity-80" />
                    All caught up! No overdue tasks or unread customer replies.
                  </div>
                ) : (
                  <>
                    {/* Recent replies / interested */}
                    {recentReplies.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          setShowNotifications(false);
                          if (onNavigateToLead) onNavigateToLead(item.lead_id);
                        }}
                        className="p-3 hover:bg-muted/50 transition-colors cursor-pointer flex items-start gap-3"
                      >
                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                          {item.activity_type === 'interested' ? (
                            <Flame className="w-4 h-4 text-amber-500" />
                          ) : (
                            <MessageSquare className="w-4 h-4 text-emerald-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground">{item.title}</p>
                          <span className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3" />
                            {formatRelativeTime(item.created_at)}
                          </span>
                        </div>
                      </div>
                    ))}

                    {/* Overdue tasks */}
                    {overdueTasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => {
                          setShowNotifications(false);
                          if (task.lead_id && onNavigateToLead) onNavigateToLead(task.lead_id);
                        }}
                        className="p-3 hover:bg-muted/50 transition-colors cursor-pointer flex items-start gap-3 bg-rose-500/5"
                      >
                        <div className="w-8 h-8 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                          <Clock className="w-4 h-4 text-rose-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-rose-600 dark:text-rose-400">Overdue: {task.title}</p>
                          <p className="text-[11px] text-muted-foreground truncate">{task.lead_name}</p>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
