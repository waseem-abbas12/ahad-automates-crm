import React, { useState, useMemo } from 'react';
import { useCRM } from '../context/CRMContext';
import { 
  Search, 
  Plus, 
  Upload, 
  Download, 
  Trash2, 
  ChevronRight, 
  Globe, 
  Share2, 
  ArrowUpDown
} from 'lucide-react';
import { FacebookIcon, InstagramIcon, LinkedinIcon } from '../components/ui/SocialIcons';
import { StageBadge } from '../components/ui/StageBadge';
import { ScoreBadge } from '../components/ui/ScoreBadge';
import { JourneyMilestones } from '../components/ui/JourneyMilestones';
import { calculateMilestones, formatRelativeTime } from '../lib/scoring';
import type { PipelineStage, Lead } from '../types/crm';

interface LeadsListViewProps {
  onNavigateToLead: (leadId: string) => void;
  onOpenAddLead: () => void;
  onOpenImportModal: () => void;
}

export const LeadsListView: React.FC<LeadsListViewProps> = ({
  onNavigateToLead,
  onOpenAddLead,
  onOpenImportModal
}) => {
  const { leads, outreach, appointments, settings, bulkUpdateStage, bulkDelete, exportLeadsCSV } = useCRM();

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [socialFilter, setSocialFilter] = useState<'all' | 'has_social' | 'no_social'>('all');
  const [showSocialPopover, setShowSocialPopover] = useState(false);

  // Sorting state
  const [sortField, setSortField] = useState<'business_name' | 'opportunity_score' | 'created_at' | 'last_contact_at'>('created_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Bulk selection state
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);

  // Filtered & sorted leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead: Lead) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = 
          lead.business_name.toLowerCase().includes(q) ||
          lead.contact_name?.toLowerCase().includes(q) ||
          lead.email?.toLowerCase().includes(q) ||
          lead.phone?.toLowerCase().includes(q) ||
          lead.city?.toLowerCase().includes(q) ||
          lead.notes?.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Stage
      if (stageFilter !== 'all' && lead.pipeline_stage !== stageFilter) {
        return false;
      }

      // Source
      if (sourceFilter !== 'all' && lead.lead_source !== sourceFilter) {
        return false;
      }

      // Status
      if (statusFilter !== 'all' && lead.lead_status !== statusFilter) {
        return false;
      }

      // Socials
      const hasAnySocial = !!(lead.social_facebook || lead.social_instagram || lead.social_linkedin || lead.social_twitter || lead.owner_linkedin);
      if (socialFilter === 'has_social' && !hasAnySocial) return false;
      if (socialFilter === 'no_social' && hasAnySocial) return false;

      return true;
    }).sort((a: Lead, b: Lead) => {
      let valA: any = a[sortField];
      let valB: any = b[sortField];

      if (sortField === 'opportunity_score') {
        valA = a.opportunity_score;
        valB = b.opportunity_score;
      } else if (sortField === 'business_name') {
        valA = a.business_name.toLowerCase();
        valB = b.business_name.toLowerCase();
      } else {
        valA = valA ? new Date(valA).getTime() : 0;
        valB = valB ? new Date(valB).getTime() : 0;
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [leads, searchQuery, stageFilter, sourceFilter, statusFilter, socialFilter, sortField, sortDirection]);

  // Handle select all checkbox
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedLeadIds(filteredLeads.map((l: Lead) => l.id));
    } else {
      setSelectedLeadIds([]);
    }
  };

  const toggleSelectLead = (id: string) => {
    setSelectedLeadIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleBulkStageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stage = e.target.value as PipelineStage;
    if (stage && selectedLeadIds.length > 0) {
      bulkUpdateStage(selectedLeadIds, stage);
      setSelectedLeadIds([]);
      e.target.value = '';
    }
  };

  const handleBulkDelete = () => {
    if (confirm(`Are you sure you want to delete ${selectedLeadIds.length} selected leads?`)) {
      bulkDelete(selectedLeadIds);
      setSelectedLeadIds([]);
    }
  };

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Leads</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {filteredLeads.length} of {leads.length} leads in directory
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={onOpenImportModal}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-xl border border-border bg-card hover:bg-muted text-foreground transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4 text-muted-foreground" />
            <span>Import CSV</span>
          </button>

          <button
            onClick={exportLeadsCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-xl border border-border bg-card hover:bg-muted text-foreground transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-muted-foreground" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onOpenAddLead}
            className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl gradient-primary text-white shadow-md hover:opacity-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-3.5 rounded-2xl bg-card border border-border flex flex-wrap items-center justify-between gap-3 shadow-xs">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by business, contact, email, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-background border border-input rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Stage Filter */}
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="text-xs bg-background border border-input rounded-xl px-2.5 py-1.5 text-foreground cursor-pointer"
          >
            <option value="all">All stages</option>
            {settings.stages.map((stg: string) => (
              <option key={stg} value={stg}>{stg}</option>
            ))}
          </select>

          {/* Source Filter */}
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="text-xs bg-background border border-input rounded-xl px-2.5 py-1.5 text-foreground cursor-pointer"
          >
            <option value="all">All sources</option>
            {settings.sources.map((src: string) => (
              <option key={src} value={src}>{src}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-background border border-input rounded-xl px-2.5 py-1.5 text-foreground cursor-pointer"
          >
            <option value="all">All statuses</option>
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
            <option value="Disqualified">Disqualified</option>
          </select>

          {/* Social Filter Popover */}
          <div className="relative">
            <button
              onClick={() => setShowSocialPopover(!showSocialPopover)}
              className={`flex items-center gap-1.5 text-xs border rounded-xl px-2.5 py-1.5 transition-colors cursor-pointer ${
                socialFilter !== 'all' 
                  ? 'border-primary bg-primary/10 text-primary font-medium' 
                  : 'border-input bg-background text-muted-foreground hover:text-foreground'
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Socials</span>
              {socialFilter !== 'all' && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
            </button>

            {showSocialPopover && (
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg p-2 z-30 space-y-1">
                <button
                  onClick={() => { setSocialFilter('all'); setShowSocialPopover(false); }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs ${socialFilter === 'all' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted text-foreground'}`}
                >
                  Any social state
                </button>
                <button
                  onClick={() => { setSocialFilter('has_social'); setShowSocialPopover(false); }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs ${socialFilter === 'has_social' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted text-foreground'}`}
                >
                  Has social accounts
                </button>
                <button
                  onClick={() => { setSocialFilter('no_social'); setShowSocialPopover(false); }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs ${socialFilter === 'no_social' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted text-foreground'}`}
                >
                  Missing social links
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bulk Action Floating Bar */}
      {selectedLeadIds.length > 0 && (
        <div className="p-3 rounded-2xl gradient-primary text-white flex items-center justify-between shadow-lg animate-in fade-in-0 slide-in-from-top-2 duration-200">
          <span className="text-xs sm:text-sm font-semibold pl-2">
            {selectedLeadIds.length} lead{selectedLeadIds.length > 1 ? 's' : ''} selected
          </span>

          <div className="flex items-center gap-2">
            <select
              defaultValue=""
              onChange={handleBulkStageChange}
              className="text-xs bg-white/20 border border-white/30 text-white rounded-xl px-3 py-1.5 cursor-pointer outline-hidden"
            >
              <option value="" disabled className="text-foreground">Move to stage...</option>
              {settings.stages.map((stg: string) => (
                <option key={stg} value={stg} className="text-foreground">{stg}</option>
              ))}
            </select>

            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Data Table */}
      <div className="rounded-2xl bg-card border border-border shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-muted/40 border-b border-border text-muted-foreground font-medium select-none">
              <tr>
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={filteredLeads.length > 0 && selectedLeadIds.length === filteredLeads.length}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded text-primary border-input focus:ring-primary cursor-pointer"
                  />
                </th>
                <th 
                  onClick={() => toggleSort('business_name')}
                  className="py-3 px-4 font-semibold text-foreground cursor-pointer hover:text-primary transition-colors"
                >
                  <span className="flex items-center gap-1">
                    Business Name
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </span>
                </th>
                <th className="py-3 px-4 font-semibold text-foreground">Contact</th>
                <th className="py-3 px-4 font-semibold text-foreground">Stage</th>
                <th 
                  onClick={() => toggleSort('opportunity_score')}
                  className="py-3 px-4 font-semibold text-foreground cursor-pointer hover:text-primary transition-colors"
                >
                  <span className="flex items-center gap-1">
                    Score
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </span>
                </th>
                <th className="py-3 px-4 font-semibold text-foreground">Source</th>
                <th className="py-3 px-4 font-semibold text-foreground">Socials</th>
                <th className="py-3 px-4 font-semibold text-foreground">Progress</th>
                <th 
                  onClick={() => toggleSort('last_contact_at')}
                  className="py-3 px-4 font-semibold text-foreground cursor-pointer hover:text-primary transition-colors"
                >
                  <span className="flex items-center gap-1">
                    Last Contact
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </span>
                </th>
                <th className="py-3 px-4 text-right"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border/60">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-8 text-center text-muted-foreground text-xs sm:text-sm">
                    No leads found matching current filters.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead: Lead) => {
                  const milestones = calculateMilestones(lead, outreach, appointments);
                  const isSelected = selectedLeadIds.includes(lead.id);

                  return (
                    <tr 
                      key={lead.id}
                      className={`hover:bg-muted/40 transition-colors ${isSelected ? 'bg-primary/5' : ''}`}
                    >
                      {/* Checkbox */}
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectLead(lead.id)}
                          className="w-4 h-4 rounded text-primary border-input focus:ring-primary cursor-pointer"
                        />
                      </td>

                      {/* Business */}
                      <td className="py-3 px-4">
                        <button
                          onClick={() => onNavigateToLead(lead.id)}
                          className="font-bold text-foreground hover:text-primary transition-colors text-left cursor-pointer truncate max-w-[200px] block"
                        >
                          {lead.business_name}
                        </button>
                        <span className="text-[11px] text-muted-foreground block truncate">
                          {lead.city ? `${lead.city}, ` : ''}{lead.state || lead.country || 'No location'}
                        </span>
                      </td>

                      {/* Contact */}
                      <td className="py-3 px-4">
                        <p className="font-medium text-foreground truncate max-w-[150px]">
                          {lead.contact_name || '—'}
                        </p>
                        <p className="text-[11px] text-muted-foreground truncate max-w-[150px]">
                          {lead.phone || lead.email || 'No direct phone'}
                        </p>
                      </td>

                      {/* Stage */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <StageBadge stage={lead.pipeline_stage} size="sm" />
                      </td>

                      {/* Score */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <ScoreBadge score={lead.opportunity_score} level={lead.opportunity_level} />
                      </td>

                      {/* Source */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-md bg-muted text-[11px] font-medium text-muted-foreground border border-border/80">
                          {lead.lead_source}
                        </span>
                      </td>

                      {/* Socials */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          {lead.social_facebook && (
                            <a href={lead.social_facebook} target="_blank" rel="noreferrer" title="Facebook" className="text-muted-foreground hover:text-blue-600 transition-colors">
                              <FacebookIcon className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {lead.social_instagram && (
                            <a href={lead.social_instagram} target="_blank" rel="noreferrer" title="Instagram" className="text-muted-foreground hover:text-pink-600 transition-colors">
                              <InstagramIcon className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {lead.social_linkedin && (
                            <a href={lead.social_linkedin} target="_blank" rel="noreferrer" title="LinkedIn" className="text-muted-foreground hover:text-blue-700 transition-colors">
                              <LinkedinIcon className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {lead.website && (
                            <a href={lead.website} target="_blank" rel="noreferrer" title="Website" className="text-muted-foreground hover:text-primary transition-colors">
                              <Globe className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {!lead.social_facebook && !lead.social_instagram && !lead.social_linkedin && !lead.website && (
                            <span className="text-muted-foreground/40 text-xs">—</span>
                          )}
                        </div>
                      </td>

                      {/* Progress */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <JourneyMilestones milestones={milestones} size="sm" />
                      </td>

                      {/* Last contact */}
                      <td className="py-3 px-4 whitespace-nowrap text-xs text-muted-foreground tabular-nums">
                        {formatRelativeTime(lead.last_contact_at)}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => onNavigateToLead(lead.id)}
                          className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                          aria-label="View details"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
