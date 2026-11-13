import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import { 
  Send, 
  Repeat, 
  ListTodo, 
  CheckCircle, 
  CalendarCheck, 
  Mail, 
  User, 
  Globe, 
  ArrowRight,
  Sparkles,
  Phone
} from 'lucide-react';
import { StageBadge } from '../components/ui/StageBadge';
import { ScoreBadge } from '../components/ui/ScoreBadge';
import { MarkContactedModal } from '../components/modals/MarkContactedModal';
import type { Lead } from '../types/crm';

interface TodaysTasksViewProps {
  onNavigateToLead: (leadId: string) => void;
  onOpenAddLead: () => void;
}

export const TodaysTasksView: React.FC<TodaysTasksViewProps> = ({ onNavigateToLead, onOpenAddLead }) => {
  const { leads, tasks, profile } = useCRM();

  const [selectedLeadForContact, setSelectedLeadForContact] = useState<Lead | null>(null);

  // Categorize leads for today's outreach engine
  // 1. New leads due (uncontacted or ready to contact)
  const newLeadsDue = leads.filter((l: Lead) => 
    l.pipeline_stage === 'New' || 
    l.pipeline_stage === 'Ready to Contact' || 
    l.pipeline_stage === 'Researched'
  );

  // 2. Stage 1 follow-ups (followup_stage === 1)
  const stage1Followups = leads.filter((l: Lead) => l.followup_stage === 1 && l.pipeline_stage === 'Contacted');

  // 3. Stage 2 follow-ups (followup_stage === 2)
  const stage2Followups = leads.filter((l: Lead) => l.followup_stage === 2 && l.pipeline_stage === 'Contacted');

  // 4. Stage 3 follow-ups (followup_stage === 3)
  const stage3Followups = leads.filter((l: Lead) => l.followup_stage === 3 && l.pipeline_stage === 'Contacted');

  // Today completed count
  const completedToday = tasks.filter((t: any) => {
    if (t.status !== 'Completed' || !t.completed_at) return false;
    const completedDate = new Date(t.completed_at).toDateString();
    return completedDate === new Date().toDateString();
  }).length;

  const totalRemaining = newLeadsDue.length + stage1Followups.length + stage2Followups.length + stage3Followups.length;

  const progressPercent = Math.min(100, Math.round((completedToday / (profile.daily_target || 20)) * 100));

  const handleSelectNextLead = () => {
    if (newLeadsDue.length > 0) {
      const next = newLeadsDue[0];
      setSelectedLeadForContact(next);
    } else {
      setSelectedLeadForContact(null);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Today's Tasks</h1>
            <span className="px-2.5 py-0.5 text-xs rounded-full bg-primary/10 text-primary font-medium flex items-center gap-1">
              <CalendarCheck className="w-3.5 h-3.5" />
              Interval: {profile.followup_interval_days} days
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            Your daily outreach workspace — new leads and the full automated follow-up sequence.
          </p>
        </div>

        <button
          onClick={onOpenAddLead}
          className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white font-medium text-sm shadow-md hover:opacity-95 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Add New Prospect</span>
        </button>
      </div>

      {/* 6 Top KPI Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* 1. New leads due */}
        <div className="p-4 rounded-2xl bg-card border border-border shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-medium">New leads due</span>
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
              <Send className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold tabular-nums text-foreground">{newLeadsDue.length}</p>
        </div>

        {/* 2. First follow-ups */}
        <div className="p-4 rounded-2xl bg-card border border-border shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-medium">1st follow-ups</span>
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Repeat className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold tabular-nums text-foreground">{stage1Followups.length}</p>
        </div>

        {/* 3. Second follow-ups */}
        <div className="p-4 rounded-2xl bg-card border border-border shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-medium">2nd follow-ups</span>
            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Repeat className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold tabular-nums text-foreground">{stage2Followups.length}</p>
        </div>

        {/* 4. Third follow-ups */}
        <div className="p-4 rounded-2xl bg-card border border-border shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-medium">3rd follow-ups</span>
            <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Repeat className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold tabular-nums text-foreground">{stage3Followups.length}</p>
        </div>

        {/* 5. Total remaining */}
        <div className="p-4 rounded-2xl bg-card border border-border shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-medium">Total remaining</span>
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <ListTodo className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold tabular-nums text-amber-600 dark:text-amber-400">{totalRemaining}</p>
        </div>

        {/* 6. Completed today */}
        <div className="p-4 rounded-2xl bg-card border border-border shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-medium">Done today</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">{completedToday}</p>
        </div>
      </div>

      {/* Daily Progress Goal Bar */}
      <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Daily Outreach Goal</span>
          </div>
          <span className="text-xs font-medium text-muted-foreground tabular-nums">
            {completedToday} of {profile.daily_target} completed ({progressPercent}%)
          </span>
        </div>
        <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full gradient-primary transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Section: Today's New Leads Queue */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-foreground">New Leads Due Today</h2>
            <span className="px-2 py-0.5 text-xs rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold tabular-nums">
              {newLeadsDue.length}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">High opportunity first-touch targets</span>
        </div>

        {newLeadsDue.length === 0 ? (
          <div className="p-8 rounded-2xl bg-card border border-border text-center">
            <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-2 opacity-80" />
            <h3 className="text-sm font-semibold text-foreground">No new leads due today!</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              You've cleared all initial outreach. Import or add new prospects to fill your pipeline.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {newLeadsDue.map((lead: Lead) => (
              <div
                key={lead.id}
                className="p-4 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs"
              >
                {/* Lead Info */}
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => onNavigateToLead(lead.id)}
                      className="font-bold text-base text-foreground hover:text-primary transition-colors text-left cursor-pointer truncate"
                    >
                      {lead.business_name}
                    </button>
                    <StageBadge stage={lead.pipeline_stage} size="sm" />
                    <ScoreBadge score={lead.opportunity_score} level={lead.opportunity_level} />
                  </div>

                  {/* Subtitle details */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                    {lead.contact_name && (
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>{lead.contact_name}</span>
                      </span>
                    )}
                    {lead.email && (
                      <span className="flex items-center gap-1 truncate max-w-[200px]">
                        <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>{lead.email}</span>
                      </span>
                    )}
                    {lead.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>{lead.phone}</span>
                      </span>
                    )}
                    {lead.website && (
                      <a
                        href={lead.website}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-primary hover:underline"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Website</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2.5 self-end md:self-auto shrink-0">
                  <button
                    onClick={() => onNavigateToLead(lead.id)}
                    className="px-3 py-1.5 text-xs font-medium rounded-xl border border-border hover:bg-muted text-foreground transition-colors cursor-pointer"
                  >
                    View details
                  </button>
                  <button
                    onClick={() => setSelectedLeadForContact(lead)}
                    className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-xl gradient-primary text-white shadow-sm hover:opacity-95 transition-all cursor-pointer"
                  >
                    <span>Mark Contacted</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Follow-up Sequence Accordions / Sections */}
      <div className="space-y-4 pt-4">
        <h2 className="text-lg font-bold text-foreground">Active Follow-up Sequence</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Stage 1 Follow-ups */}
          <div className="p-4 rounded-2xl bg-card border border-border space-y-3">
            <div className="flex items-center justify-between border-b border-border pb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                1st Follow-ups ({stage1Followups.length})
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 font-semibold">
                Touch #2
              </span>
            </div>

            {stage1Followups.length === 0 ? (
              <p className="text-xs text-muted-foreground py-4 text-center">No stage 1 follow-ups due.</p>
            ) : (
              <div className="space-y-2">
                {stage1Followups.map((lead: Lead) => (
                  <div key={lead.id} className="p-3 rounded-xl bg-muted/40 border border-border/80 space-y-2">
                    <p className="text-xs font-semibold text-foreground truncate">{lead.business_name}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-muted-foreground">{lead.contact_name || lead.city}</span>
                      <button
                        onClick={() => setSelectedLeadForContact(lead)}
                        className="px-2 py-1 text-[11px] font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer"
                      >
                        Follow up
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Stage 2 Follow-ups */}
          <div className="p-4 rounded-2xl bg-card border border-border space-y-3">
            <div className="flex items-center justify-between border-b border-border pb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                2nd Follow-ups ({stage2Followups.length})
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 font-semibold">
                Touch #3
              </span>
            </div>

            {stage2Followups.length === 0 ? (
              <p className="text-xs text-muted-foreground py-4 text-center">No stage 2 follow-ups due.</p>
            ) : (
              <div className="space-y-2">
                {stage2Followups.map((lead: Lead) => (
                  <div key={lead.id} className="p-3 rounded-xl bg-muted/40 border border-border/80 space-y-2">
                    <p className="text-xs font-semibold text-foreground truncate">{lead.business_name}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-muted-foreground">{lead.contact_name || lead.city}</span>
                      <button
                        onClick={() => setSelectedLeadForContact(lead)}
                        className="px-2 py-1 text-[11px] font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer"
                      >
                        Follow up
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Stage 3 Follow-ups */}
          <div className="p-4 rounded-2xl bg-card border border-border space-y-3">
            <div className="flex items-center justify-between border-b border-border pb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                3rd Follow-ups ({stage3Followups.length})
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 font-semibold">
                Final Touch
              </span>
            </div>

            {stage3Followups.length === 0 ? (
              <p className="text-xs text-muted-foreground py-4 text-center">No stage 3 follow-ups due.</p>
            ) : (
              <div className="space-y-2">
                {stage3Followups.map((lead: Lead) => (
                  <div key={lead.id} className="p-3 rounded-xl bg-muted/40 border border-border/80 space-y-2">
                    <p className="text-xs font-semibold text-foreground truncate">{lead.business_name}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-muted-foreground">{lead.contact_name || lead.city}</span>
                      <button
                        onClick={() => setSelectedLeadForContact(lead)}
                        className="px-2 py-1 text-[11px] font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer"
                      >
                        Follow up
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Mark Contacted Modal */}
      <MarkContactedModal
        isOpen={!!selectedLeadForContact}
        onClose={() => setSelectedLeadForContact(null)}
        lead={selectedLeadForContact}
        onSelectNextLead={handleSelectNextLead}
      />
    </div>
  );
};
