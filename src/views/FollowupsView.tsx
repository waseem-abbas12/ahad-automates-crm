import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import type { Lead } from '../types/crm';
import { Send } from 'lucide-react';
import { StageBadge } from '../components/ui/StageBadge';
import { ScoreBadge } from '../components/ui/ScoreBadge';
import { MarkContactedModal } from '../components/modals/MarkContactedModal';

interface FollowupsViewProps {
  onNavigateToLead: (leadId: string) => void;
}

export const FollowupsView: React.FC<FollowupsViewProps> = ({ onNavigateToLead }) => {
  const { leads } = useCRM();

  const [selectedLeadForContact, setSelectedLeadForContact] = useState<Lead | null>(null);

  // Filter leads that have had at least one touch or are in contact stages, sorted by LONGEST SILENCE
  const silenceLeads = leads
    .filter((l: Lead) => l.pipeline_stage !== 'Won' && l.pipeline_stage !== 'Lost')
    .map((lead: Lead) => {
      const lastDate = lead.last_contact_at ? new Date(lead.last_contact_at) : new Date(lead.created_at);
      const diffMs = Date.now() - lastDate.getTime();
      const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
      return { lead, diffDays };
    })
    .sort((a: any, b: any) => b.diffDays - a.diffDays);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Follow-up Silence Tracker</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Prospects ranked by longest duration without a touchpoint. Prevent deals from going cold.
        </p>
      </div>

      {/* Leads List sorted by silence */}
      <div className="space-y-3">
        {silenceLeads.map(({ lead, diffDays }: any) => {
          const isDanger = diffDays >= 7;
          const isWarning = diffDays >= 4 && diffDays < 7;

          return (
            <div
              key={lead.id}
              className={`p-4 rounded-2xl bg-card border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs ${
                isDanger 
                  ? 'border-rose-500/40 bg-rose-500/5 hover:border-rose-500' 
                  : isWarning 
                  ? 'border-amber-500/40 bg-amber-500/5 hover:border-amber-500' 
                  : 'border-border hover:border-primary/40'
              }`}
            >
              {/* Left Info */}
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <button
                    onClick={() => onNavigateToLead(lead.id)}
                    className="font-bold text-base text-foreground hover:text-primary transition-colors text-left cursor-pointer truncate"
                  >
                    {lead.business_name}
                  </button>
                  <StageBadge stage={lead.pipeline_stage} size="sm" />
                  <ScoreBadge score={lead.opportunity_score} level={lead.opportunity_level} />

                  {/* Silence badge */}
                  <span className={`px-2 py-0.5 text-xs rounded-full font-bold tabular-nums ${
                    isDanger 
                      ? 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/30' 
                      : isWarning 
                      ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30' 
                      : 'bg-muted text-muted-foreground border border-border'
                  }`}>
                    {diffDays === 0 ? 'Contacted today' : `${diffDays} days silent`}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                  <span>Contact: <strong>{lead.contact_name || 'No contact specified'}</strong></span>
                  {lead.phone && <span>Phone: {lead.phone}</span>}
                  <span>Touch count: <strong>#{lead.followup_stage ?? 0}</strong></span>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                <button
                  onClick={() => onNavigateToLead(lead.id)}
                  className="px-3 py-1.5 text-xs font-medium rounded-xl border border-border hover:bg-muted text-foreground transition-colors cursor-pointer"
                >
                  View timeline
                </button>
                <button
                  onClick={() => setSelectedLeadForContact(lead)}
                  className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-xl gradient-primary text-white shadow-sm hover:opacity-95 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Log Outreach</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <MarkContactedModal
        isOpen={!!selectedLeadForContact}
        onClose={() => setSelectedLeadForContact(null)}
        lead={selectedLeadForContact}
      />
    </div>
  );
};
