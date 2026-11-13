import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { useCRM } from '../../context/CRMContext';
import { Lead, OutreachChannel } from '../../types/crm';
import { Mail, Phone, MessageSquare, ArrowRight, CheckCircle2, Calendar, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MarkContactedModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  onSelectNextLead?: () => void;
}

export const MarkContactedModal: React.FC<MarkContactedModalProps> = ({
  isOpen,
  onClose,
  lead,
  onSelectNextLead
}) => {
  const { logOutreach } = useCRM();

  const [channel, setChannel] = useState<OutreachChannel>('Email');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');
  const [followupDays, setFollowupDays] = useState<number>(2);
  const [completedState, setCompletedState] = useState(false);

  if (!lead) return null;

  const channels: { id: OutreachChannel; label: string; icon: any }[] = [
    { id: 'Email', label: 'Email', icon: Mail },
    { id: 'WhatsApp', label: 'WhatsApp', icon: MessageSquare },
    { id: 'Phone', label: 'Phone', icon: Phone },
    { id: 'SMS', label: 'SMS', icon: MessageSquare },
    { id: 'LinkedIn', label: 'LinkedIn', icon: MessageSquare },
  ];

  const intervals = [
    { days: 2, label: 'Every 2 days (Recommended)' },
    { days: 1, label: '+1 day (Urgent)' },
    { days: 3, label: '+3 days' },
    { days: 7, label: '+1 week' },
    { days: 0, label: 'No follow-up task' }
  ];

  const handleMarkContacted = (e: React.FormEvent) => {
    e.preventDefault();

    logOutreach({
      leadId: lead.id,
      channel,
      message,
      notes,
      followupDays
    });

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    setCompletedState(true);
  };

  const handleNext = () => {
    setCompletedState(false);
    setNotes('');
    setMessage('');
    if (onSelectNextLead) {
      onSelectNextLead();
    } else {
      onClose();
    }
  };

  const cleanPhone = lead.phone ? lead.phone.replace(/[^0-9]/g, '') : '';
  const waUrl = cleanPhone ? `https://wa.me/${cleanPhone}` : '';
  const mailtoUrl = lead.email ? `mailto:${lead.email}?subject=Quick question for ${lead.business_name}` : '';
  const telUrl = lead.phone ? `tel:${lead.phone}` : '';

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setCompletedState(false);
        onClose();
      }}
      title={completedState ? "Touch Recorded!" : `Outreach: ${lead.business_name}`}
      subtitle={completedState ? "Next follow-up has been scheduled automatically" : "Log first touch or follow-up sequence"}
      maxWidth="xl"
    >
      {completedState ? (
        <div className="py-6 text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/20">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h4 className="text-lg font-bold text-foreground">Outreach Logged Successfully!</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Contacted <strong>{lead.business_name}</strong> via {channel}.
              {followupDays > 0 && ` Next follow-up queued in ${followupDays} days.`}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={() => {
                setCompletedState(false);
                onClose();
              }}
              className="px-4 py-2 text-sm font-medium rounded-xl border border-border text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-xl gradient-primary text-white shadow-md hover:opacity-95 transition-all cursor-pointer"
            >
              <span>Next Lead in Queue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleMarkContacted} className="space-y-5">
          {/* Direct Launch Shortcuts */}
          <div className="p-3.5 rounded-xl bg-muted/40 border border-border flex flex-wrap items-center justify-between gap-2">
            <div className="text-xs">
              <span className="font-semibold text-foreground">{lead.contact_name || lead.business_name}</span>
              <span className="text-muted-foreground"> · {lead.city || 'No city'}</span>
            </div>

            <div className="flex items-center gap-2">
              {lead.email && (
                <a
                  href={mailtoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg border border-border bg-card hover:bg-muted text-foreground transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  <span>Email</span>
                </a>
              )}
              {waUrl && (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              )}
              {lead.phone && (
                <a
                  href={telUrl}
                  className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg border border-border bg-card hover:bg-muted text-foreground transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Call</span>
                </a>
              )}
            </div>
          </div>

          {/* Channel Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Outreach Channel Used
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {channels.map((ch) => {
                const Icon = ch.icon;
                const isSelected = channel === ch.id;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => setChannel(ch.id)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'border-primary bg-primary/10 text-primary shadow-xs'
                        : 'border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-4 h-4 mb-1" />
                    <span>{ch.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pitch / Message / Notes */}
          <div>
            <label className="block text-xs font-medium text-foreground mb-1">
              Outreach Notes or Pitch Summary
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Sent standard speed-to-lead pitch highlighting their Google Ads spend..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-background border border-input rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Follow-up Interval Scheduler */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <span>Next Follow-up Cadence</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {intervals.map((intv) => (
                <button
                  key={intv.days}
                  type="button"
                  onClick={() => setFollowupDays(intv.days)}
                  className={`px-3 py-2 text-left rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                    followupDays === intv.days
                      ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary'
                      : 'border-border bg-card hover:bg-muted text-foreground'
                  }`}
                >
                  <span>{intv.label}</span>
                  {followupDays === intv.days && <Sparkles className="w-3.5 h-3.5 text-primary" />}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
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
              className="flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-xl gradient-primary text-white shadow-md hover:opacity-95 transition-all cursor-pointer"
            >
              <span>Mark Contacted</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
