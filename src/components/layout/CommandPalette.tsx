import React, { useState, useEffect, useRef } from 'react';
import { Search, Users, LayoutDashboard, ListTodo, Plus, FileSpreadsheet, Settings, ArrowRight, Building2, Phone, Mail } from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { StageBadge } from '../ui/StageBadge';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string, leadId?: string) => void;
  onOpenAddLead: () => void;
  onOpenImportModal: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenAddLead,
  onOpenImportModal,
}) => {
  const { leads } = useCRM();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter leads based on query
  const matchingLeads = query.trim()
    ? leads.filter(l => 
        l.business_name.toLowerCase().includes(query.toLowerCase()) ||
        l.contact_name?.toLowerCase().includes(query.toLowerCase()) ||
        l.email?.toLowerCase().includes(query.toLowerCase()) ||
        l.city?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  const actions = [
    { id: 'add-lead', label: 'Create new lead', icon: Plus, action: () => { onClose(); onOpenAddLead(); } },
    { id: 'import-csv', label: 'Import leads from CSV', icon: FileSpreadsheet, action: () => { onClose(); onOpenImportModal(); } },
    { id: 'todays-tasks', label: "Go to Today's Tasks", icon: ListTodo, action: () => { onClose(); onNavigate('todays-tasks'); } },
    { id: 'dashboard', label: 'Go to Dashboard', icon: LayoutDashboard, action: () => { onClose(); onNavigate('dashboard'); } },
    { id: 'leads', label: 'Go to Leads Directory', icon: Users, action: () => { onClose(); onNavigate('leads'); } },
    { id: 'settings', label: 'Go to Settings', icon: Settings, action: () => { onClose(); onNavigate('settings'); } },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />

      {/* Palette Box */}
      <div className="relative w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col animate-in fade-in-0 zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-border gap-3">
          <Search className="w-5 h-5 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a lead name, contact, city, or command..."
            className="w-full bg-transparent border-none outline-hidden text-foreground text-sm placeholder:text-muted-foreground"
          />
          <kbd className="px-2 py-0.5 text-[11px] font-mono bg-muted rounded border border-border text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* Results Area */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-border/50">
          {/* Matching Leads */}
          {matchingLeads.length > 0 && (
            <div className="py-2">
              <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Leads Found ({matchingLeads.length})
              </span>
              <div className="mt-1 space-y-1">
                {matchingLeads.map((lead) => (
                  <button
                    key={lead.id}
                    onClick={() => {
                      onClose();
                      onNavigate('lead-detail', lead.id);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-muted text-left transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                          {lead.business_name}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-2">
                          <span>{lead.contact_name || 'No contact'}</span>
                          {lead.city && <span>· {lead.city}</span>}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <StageBadge stage={lead.pipeline_stage} size="sm" />
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="py-2">
            <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Navigation & Actions
            </span>
            <div className="mt-1 space-y-1">
              {actions.map((act) => {
                const Icon = act.icon;
                return (
                  <button
                    key={act.id}
                    onClick={act.action}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-muted text-left transition-colors text-sm text-foreground cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-muted-foreground" />
                      <span>{act.label}</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/60" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-border bg-muted/30 flex items-center justify-between text-xs text-muted-foreground">
          <span>Search or navigate effortlessly</span>
          <span className="font-mono text-[10px]">Waseem Automation CRM</span>
        </div>
      </div>
    </div>
  );
};
