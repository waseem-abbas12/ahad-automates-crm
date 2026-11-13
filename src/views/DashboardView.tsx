import React from 'react';
import { useCRM } from '../context/CRMContext';
import { 
  Users, 
  Send, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  Sparkles, 
  Clock, 
  CheckCircle2,
  Building2,
  ChevronRight
} from 'lucide-react';
import { StageBadge } from '../components/ui/StageBadge';
import { ScoreBadge } from '../components/ui/ScoreBadge';
import { formatCurrency, formatRelativeTime } from '../lib/scoring';
import type { Lead } from '../types/crm';

interface DashboardViewProps {
  onNavigate: (view: string, leadId?: string) => void;
  onOpenAddLead: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate, onOpenAddLead }) => {
  const { leads, appointments, activities, settings } = useCRM();

  // Top Metrics
  const totalLeads = leads.length;
  const contactedLeads = leads.filter((l: Lead) => l.pipeline_stage !== 'New' && l.pipeline_stage !== 'Researched').length;
  const bookedCalls = appointments.filter((a: any) => a.status === 'Scheduled').length;

  const totalPipelineValue = leads.reduce((sum: number, l: Lead) => sum + (l.deal_value || 0), 0);
  const wonDealsValue = leads
    .filter((l: Lead) => l.pipeline_stage === 'Won')
    .reduce((sum: number, l: Lead) => sum + (l.deal_value || 0), 0);

  // Stage distribution
  const stageCounts: Record<string, number> = {};
  settings.stages.forEach((stage: string) => {
    stageCounts[stage] = leads.filter((l: Lead) => l.pipeline_stage === stage).length;
  });

  // Recent 5 leads
  const recentLeads = [...leads].sort((a: Lead, b: Lead) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5);

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Real-time outbound performance metrics, conversion pipeline, and recent touchpoints.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('todays-tasks')}
            className="px-4 py-2 text-sm font-medium rounded-xl border border-border bg-card hover:bg-muted text-foreground transition-colors cursor-pointer"
          >
            Open Today's Tasks
          </button>
          <button
            onClick={onOpenAddLead}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl gradient-primary text-white shadow-md hover:opacity-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* 4 Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Prospects */}
        <div className="p-5 rounded-2xl bg-card border border-border shadow-xs relative overflow-hidden group">
          <div className="flex items-center justify-between text-muted-foreground mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Pipeline Prospects</span>
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-extrabold tabular-nums text-foreground">{totalLeads}</p>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
              Active
            </span>
          </div>
        </div>

        {/* Contacted */}
        <div className="p-5 rounded-2xl bg-card border border-border shadow-xs relative overflow-hidden group">
          <div className="flex items-center justify-between text-muted-foreground mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Contacted Prospects</span>
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
              <Send className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-extrabold tabular-nums text-foreground">{contactedLeads}</p>
            <span className="text-xs text-muted-foreground">
              {totalLeads > 0 ? Math.round((contactedLeads / totalLeads) * 100) : 0}% contacted
            </span>
          </div>
        </div>

        {/* Booked Calls */}
        <div className="p-5 rounded-2xl bg-card border border-border shadow-xs relative overflow-hidden group">
          <div className="flex items-center justify-between text-muted-foreground mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Scheduled Calls & Demos</span>
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-extrabold tabular-nums text-foreground">{bookedCalls}</p>
            <span className="text-xs font-semibold text-teal-600 dark:text-teal-400">
              High intent
            </span>
          </div>
        </div>

        {/* Won Value / Pipeline Value */}
        <div className="p-5 rounded-2xl bg-card border border-border shadow-xs relative overflow-hidden group">
          <div className="flex items-center justify-between text-muted-foreground mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Won Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-extrabold tabular-nums text-emerald-600 dark:text-emerald-400">
              {formatCurrency(wonDealsValue)}
            </p>
            <span className="text-xs text-muted-foreground">
              of {formatCurrency(totalPipelineValue)} pipe
            </span>
          </div>
        </div>
      </div>

      {/* Pipeline Stage Breakdown */}
      <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-foreground">Pipeline Stage Distribution</h3>
            <p className="text-xs text-muted-foreground">Active distribution of leads through each conversion stage</p>
          </div>
          <button
            onClick={() => onNavigate('pipeline')}
            className="text-xs font-medium text-primary hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Open Kanban Board</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Proportional Progress Bar */}
        <div className="w-full h-3 rounded-full overflow-hidden flex bg-muted">
          {settings.stages.map((stage: string) => {
            const count = stageCounts[stage] || 0;
            if (count === 0 || totalLeads === 0) return null;
            const percent = (count / totalLeads) * 100;
            return (
              <div
                key={stage}
                style={{ width: `${percent}%` }}
                title={`${stage}: ${count} leads (${Math.round(percent)}%)`}
                className="h-full border-r border-card first:rounded-l-full last:rounded-r-full hover:opacity-80 transition-opacity"
              >
                <div className="w-full h-full bg-primary" style={{ opacity: 0.3 + (settings.stages.indexOf(stage) * 0.08) }} />
              </div>
            );
          })}
        </div>

        {/* Grid of Stage Counts */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {settings.stages.map((stage: string) => {
            const count = stageCounts[stage] || 0;
            return (
              <div key={stage} className="p-3 rounded-xl bg-muted/30 border border-border/80 flex flex-col justify-between">
                <span className="text-xs text-muted-foreground truncate" title={stage}>{stage}</span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-lg font-bold tabular-nums text-foreground">{count}</span>
                  <span className="text-[11px] text-muted-foreground">
                    {totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2-Column: Recent Prospects & Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Prospects Added */}
        <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-foreground">Recent Prospects</h3>
            <button
              onClick={() => onNavigate('leads')}
              className="text-xs font-medium text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View all ({totalLeads})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-border/60">
            {recentLeads.map((lead: Lead) => (
              <div
                key={lead.id}
                onClick={() => onNavigate('lead-detail', lead.id)}
                className="py-3.5 flex items-center justify-between hover:bg-muted/40 px-2 rounded-xl transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {lead.business_name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {lead.contact_name ? `${lead.contact_name} · ` : ''}{lead.city || 'No location'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <StageBadge stage={lead.pipeline_stage} size="sm" />
                  <ScoreBadge score={lead.opportunity_score} showScoreOnly />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Activity Stream */}
        <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-foreground">Live Activity Feed</h3>
            <span className="text-xs text-muted-foreground">Real-time outbound touchpoints</span>
          </div>

          <div className="divide-y divide-border/60">
            {activities.slice(0, 6).map((activity: any) => (
              <div key={activity.id} className="py-3 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground">{activity.title}</p>
                  <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>{formatRelativeTime(activity.created_at)}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
