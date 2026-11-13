import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { useCRM } from '../../context/CRMContext';
import { Lead, PipelineStage, LeadSource, WebsiteQuality } from '../../types/crm';
import { calculateOpportunityScore, getOpportunityLevel } from '../../lib/scoring';
import { ScoreBadge } from '../ui/ScoreBadge';
import { Sparkles, Globe, Mail, Phone, Building2 } from 'lucide-react';

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadCreated?: (lead: Lead) => void;
}

export const AddLeadModal: React.FC<AddLeadModalProps> = ({ isOpen, onClose, onLeadCreated }) => {
  const { addLead, settings } = useCRM();

  const [formData, setFormData] = useState({
    business_name: '',
    contact_name: '',
    email: '',
    phone: '',
    website: '',
    city: '',
    state: '',
    country: 'US',
    lead_source: (settings.sources[0] || 'Google Maps') as LeadSource,
    pipeline_stage: (settings.stages[0] || 'New') as PipelineStage,
    lead_status: 'Active' as const,
    deal_value: 0,
    notes: '',
    google_ads_running: false,
    meta_ads_running: false,
    website_quality: 'Good' as WebsiteQuality,
    service_24_7: 'No' as const,
    online_booking: 'Yes' as const,
    reviews_count: 25,
    rating: 4.8
  });

  const previewScore = calculateOpportunityScore(formData);
  const previewLevel = getOpportunityLevel(previewScore);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.business_name.trim()) return;

    const created = await addLead(formData);
    onClose();
    if (onLeadCreated) onLeadCreated(created);

    // Reset form
    setFormData({
      business_name: '',
      contact_name: '',
      email: '',
      phone: '',
      website: '',
      city: '',
      state: '',
      country: 'US',
      lead_source: (settings.sources[0] || 'Google Maps') as LeadSource,
      pipeline_stage: (settings.stages[0] || 'New') as PipelineStage,
      lead_status: 'Active',
      deal_value: 0,
      notes: '',
      google_ads_running: false,
      meta_ads_running: false,
      website_quality: 'Good',
      service_24_7: 'No',
      online_booking: 'Yes',
      reviews_count: 25,
      rating: 4.8
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Lead"
      subtitle="Add a new prospect to your outbound sales pipeline"
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Live Score Preview Card */}
        <div className="p-4 rounded-xl bg-muted/40 border border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs font-semibold text-foreground">Estimated Opportunity Score</p>
              <p className="text-[11px] text-muted-foreground">Calculated dynamically based on digital maturity signals</p>
            </div>
          </div>
          <ScoreBadge score={previewScore} level={previewLevel} />
        </div>

        {/* Basic Business Details */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Business & Contact Information
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                Business Name <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-muted-foreground absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Roofing Pros"
                  value={formData.business_name}
                  onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-input rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Contact Person Name</label>
              <input
                type="text"
                placeholder="e.g. John Miller"
                value={formData.contact_name}
                onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-background border border-input rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-2.5" />
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-input rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-muted-foreground absolute left-3 top-2.5" />
                <input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-input rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-foreground mb-1">Website URL</label>
              <div className="relative">
                <Globe className="w-4 h-4 text-muted-foreground absolute left-3 top-2.5" />
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-input rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">City</label>
              <input
                type="text"
                placeholder="e.g. Austin"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-background border border-input rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">State / Province</label>
              <input
                type="text"
                placeholder="e.g. TX"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-background border border-input rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Pipeline & Deal Settings */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Pipeline & Source
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Pipeline Stage</label>
              <select
                value={formData.pipeline_stage}
                onChange={(e) => setFormData({ ...formData, pipeline_stage: e.target.value as PipelineStage })}
                className="w-full px-3 py-2 text-sm bg-background border border-input rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary"
              >
                {settings.stages.map((stg) => (
                  <option key={stg} value={stg}>{stg}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Lead Source</label>
              <select
                value={formData.lead_source}
                onChange={(e) => setFormData({ ...formData, lead_source: e.target.value as LeadSource })}
                className="w-full px-3 py-2 text-sm bg-background border border-input rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary"
              >
                {settings.sources.map((src) => (
                  <option key={src} value={src}>{src}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Est. Deal Value ($)</label>
              <input
                type="number"
                min="0"
                step="100"
                placeholder="3500"
                value={formData.deal_value || ''}
                onChange={(e) => setFormData({ ...formData, deal_value: Number(e.target.value) })}
                className="w-full px-3 py-2 text-sm bg-background border border-input rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Opportunity Signals Grid */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Opportunity & Maturity Signals
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <label className="flex items-center gap-2 p-3 rounded-xl border border-border bg-muted/20 cursor-pointer hover:bg-muted/40 transition-colors">
              <input
                type="checkbox"
                checked={formData.google_ads_running}
                onChange={(e) => setFormData({ ...formData, google_ads_running: e.target.checked })}
                className="w-4 h-4 rounded text-primary border-input focus:ring-primary"
              />
              <span className="text-xs font-medium">Google Ads</span>
            </label>

            <label className="flex items-center gap-2 p-3 rounded-xl border border-border bg-muted/20 cursor-pointer hover:bg-muted/40 transition-colors">
              <input
                type="checkbox"
                checked={formData.meta_ads_running}
                onChange={(e) => setFormData({ ...formData, meta_ads_running: e.target.checked })}
                className="w-4 h-4 rounded text-primary border-input focus:ring-primary"
              />
              <span className="text-xs font-medium">Meta Ads</span>
            </label>

            <div>
              <label className="block text-[11px] font-medium text-muted-foreground mb-1">Website Quality</label>
              <select
                value={formData.website_quality}
                onChange={(e) => setFormData({ ...formData, website_quality: e.target.value as WebsiteQuality })}
                className="w-full px-2 py-1.5 text-xs bg-background border border-input rounded-lg"
              >
                <option value="Good">Good (+15)</option>
                <option value="Fair">Fair (+5)</option>
                <option value="Poor">Poor (0)</option>
                <option value="None">None (0)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-muted-foreground mb-1">Online Booking</label>
              <select
                value={formData.online_booking}
                onChange={(e) => setFormData({ ...formData, online_booking: e.target.value as any })}
                className="w-full px-2 py-1.5 text-xs bg-background border border-input rounded-lg"
              >
                <option value="Yes">Yes (+10)</option>
                <option value="No">No (0)</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-medium text-foreground mb-1">Internal Notes</label>
          <textarea
            rows={3}
            placeholder="Add relevant research notes or custom context..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-background border border-input rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-xl border border-border text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-sm font-medium rounded-xl gradient-primary text-white shadow-md hover:opacity-95 transition-all cursor-pointer"
          >
            Create Lead
          </button>
        </div>
      </form>
    </Modal>
  );
};
