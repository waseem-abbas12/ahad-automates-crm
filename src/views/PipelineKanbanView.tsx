import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import type { PipelineStage, Lead } from '../types/crm';
import { ScoreBadge } from '../components/ui/ScoreBadge';
import { formatCurrency, formatRelativeTime } from '../lib/scoring';
import { Plus, Clock, ArrowRight } from 'lucide-react';

interface PipelineKanbanViewProps {
  onNavigateToLead: (leadId: string) => void;
  onOpenAddLead: () => void;
}

export const PipelineKanbanView: React.FC<PipelineKanbanViewProps> = ({
  onNavigateToLead,
  onOpenAddLead
}) => {
  const { leads, updateLead, settings } = useCRM();

  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);

  // Group leads by stage
  const stageColumns = settings.stages.map((stage: string) => {
    const stageLeads = leads.filter((l: Lead) => l.pipeline_stage === stage);
    const totalValue = stageLeads.reduce((sum: number, l: Lead) => sum + (l.deal_value || 0), 0);
    return {
      stage: stage as PipelineStage,
      leads: stageLeads,
      totalValue
    };
  });

  const handleDragStart = (leadId: string) => {
    setDraggedLeadId(leadId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetStage: PipelineStage) => {
    if (draggedLeadId) {
      updateLead(draggedLeadId, { pipeline_stage: targetStage });
      setDraggedLeadId(null);
    }
  };

  const totalBoardValue = leads.reduce((sum: number, l: Lead) => sum + (l.deal_value || 0), 0);

  return (
    <div className="space-y-5 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Pipeline</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Visual kanban board with drag & drop progression across deal stages · Total Pipeline: <strong>{formatCurrency(totalBoardValue)}</strong>
          </p>
        </div>

        <button
          onClick={onOpenAddLead}
          className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl gradient-primary text-white shadow-md hover:opacity-95 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Deal</span>
        </button>
      </div>

      {/* Horizontal Scrollable Kanban Columns */}
      <div className="flex gap-4 overflow-x-auto pb-6 pt-1 select-none">
        {stageColumns.map((col: any) => (
          <div
            key={col.stage}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(col.stage)}
            className="w-72 sm:w-80 shrink-0 bg-card rounded-2xl border border-border flex flex-col max-h-[calc(100vh-210px)] shadow-xs transition-colors"
          >
            {/* Column Header */}
            <div className="p-3.5 border-b border-border flex items-center justify-between sticky top-0 bg-card/95 backdrop-blur-xs z-10 rounded-t-2xl">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs sm:text-sm text-foreground truncate max-w-[140px]" title={col.stage}>
                  {col.stage}
                </span>
                <span className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground font-semibold tabular-nums">
                  {col.leads.length}
                </span>
              </div>
              <span className="text-xs font-semibold text-muted-foreground tabular-nums">
                {col.totalValue > 0 ? formatCurrency(col.totalValue) : '$0'}
              </span>
            </div>

            {/* Leads Card Container */}
            <div className="p-3 space-y-3 overflow-y-auto flex-1">
              {col.leads.length === 0 ? (
                <div className="p-6 text-center text-xs text-muted-foreground border-2 border-dashed border-border/60 rounded-xl my-2">
                  Drop leads here
                </div>
              ) : (
                col.leads.map((lead: Lead) => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={() => handleDragStart(lead.id)}
                    className="p-3.5 rounded-xl bg-card border border-border hover:border-primary/50 shadow-xs hover:shadow-md transition-all cursor-grab active:cursor-grabbing space-y-2.5 group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <button
                        onClick={() => onNavigateToLead(lead.id)}
                        className="font-bold text-xs sm:text-sm text-foreground hover:text-primary transition-colors text-left line-clamp-2"
                      >
                        {lead.business_name}
                      </button>
                      <ScoreBadge score={lead.opportunity_score} showScoreOnly />
                    </div>

                    {lead.contact_name && (
                      <p className="text-xs text-muted-foreground truncate">
                        {lead.contact_name}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1 border-t border-border/50">
                      <span className="tabular-nums font-semibold text-emerald-600 dark:text-emerald-400">
                        {lead.deal_value ? formatCurrency(lead.deal_value) : '$—'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatRelativeTime(lead.last_contact_at)}
                      </span>
                    </div>

                    {/* Quick Move Trigger */}
                    <div className="pt-1 flex items-center justify-between">
                      <select
                        value={lead.pipeline_stage}
                        onChange={(e) => updateLead(lead.id, { pipeline_stage: e.target.value as PipelineStage })}
                        className="text-[10px] bg-muted/60 text-muted-foreground hover:text-foreground border border-border/80 rounded px-1.5 py-0.5 cursor-pointer max-w-[150px]"
                      >
                        {settings.stages.map((stg: string) => (
                          <option key={stg} value={stg}>{stg}</option>
                        ))}
                      </select>

                      <button
                        onClick={() => onNavigateToLead(lead.id)}
                        className="text-xs text-primary hover:underline flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <span>Open</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
