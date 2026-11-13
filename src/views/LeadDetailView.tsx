import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import { 
  ArrowLeft, 
  Send, 
  Calendar, 
  Plus, 
  MapPin, 
  CheckSquare, 
  Trash2,
  ExternalLink,
  Star,
  Sparkles
} from 'lucide-react';
import { FacebookIcon, InstagramIcon, LinkedinIcon } from '../components/ui/SocialIcons';
import { StageBadge } from '../components/ui/StageBadge';
import { ScoreBadge } from '../components/ui/ScoreBadge';
import { JourneyMilestones } from '../components/ui/JourneyMilestones';
import { MarkContactedModal } from '../components/modals/MarkContactedModal';
import { QuickTaskModal } from '../components/modals/QuickTaskModal';
import { Modal } from '../components/ui/Modal';
import { calculateMilestones, formatCurrency, formatRelativeTime } from '../lib/scoring';
import type { Lead, AppointmentType } from '../types/crm';

interface LeadDetailViewProps {
  leadId: string;
  onBack: () => void;
}

export const LeadDetailView: React.FC<LeadDetailViewProps> = ({ leadId, onBack }) => {
  const { 
    leads, 
    tasks, 
    outreach, 
    notes, 
    appointments, 
    toggleTask, 
    addNote, 
    deleteNote, 
    markOutreachOpened, 
    markOutreachReplied, 
    markLeadInterested,
    addAppointment 
  } = useCRM();

  const lead = leads.find((l: Lead) => l.id === leadId);

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [replyDialogOpenFor, setReplyDialogOpenFor] = useState<string | null>(null);
  const [replyNotes, setReplyNotes] = useState('');

  const [newNoteText, setNewNoteText] = useState('');

  // Booking state
  const [bookType, setBookType] = useState<AppointmentType>('Discovery Call');
  const [bookDate, setBookDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [bookNotes, setBookNotes] = useState('');

  if (!lead) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-muted-foreground text-sm">Lead not found or has been deleted.</p>
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm rounded-xl gradient-primary text-white cursor-pointer"
        >
          Back to Leads
        </button>
      </div>
    );
  }

  const milestones = calculateMilestones(lead, outreach, appointments);
  const leadOutreach = outreach.filter((o: any) => o.lead_id === lead.id);
  const leadTasks = tasks.filter((t: any) => t.lead_id === lead.id);
  const leadNotes = notes.filter((n: any) => n.lead_id === lead.id);
  const leadAppointments = appointments.filter((a: any) => a.lead_id === lead.id);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    addNote(lead.id, newNoteText);
    setNewNoteText('');
  };

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    addAppointment({
      lead_id: lead.id,
      lead_name: lead.business_name,
      appointment_type: bookType,
      appointment_date: new Date(bookDate).toISOString(),
      status: 'Scheduled',
      notes: bookNotes
    });
    setIsBookModalOpen(false);
  };

  const handleReplySubmit = () => {
    if (replyDialogOpenFor) {
      markOutreachReplied(replyDialogOpenFor, replyNotes);
      setReplyDialogOpenFor(null);
      setReplyNotes('');
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to leads</span>
      </button>

      {/* Hero Bar */}
      <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                {lead.business_name}
              </h1>
              <StageBadge stage={lead.pipeline_stage} />
              <ScoreBadge score={lead.opportunity_score} level={lead.opportunity_level} />
            </div>

            <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
              {lead.city && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{lead.city}, {lead.state || lead.country}</span>
                </span>
              )}
              {lead.lead_source && (
                <span>Source: <strong>{lead.lead_source}</strong></span>
              )}
              {lead.deal_value ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  Deal: {formatCurrency(lead.deal_value)}
                </span>
              ) : null}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsTaskModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-xl border border-border bg-card hover:bg-muted text-foreground transition-colors cursor-pointer"
            >
              <CheckSquare className="w-4 h-4 text-indigo-500" />
              <span>+ Task</span>
            </button>

            <button
              onClick={() => setIsBookModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-xl border border-border bg-card hover:bg-muted text-foreground transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-teal-500" />
              <span>Book Call</span>
            </button>

            <button
              onClick={() => markLeadInterested(lead.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Interested</span>
            </button>

            <button
              onClick={() => setIsContactModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl gradient-primary text-white shadow-md hover:opacity-95 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Log Outreach</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Journey Status Card */}
          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground">Outbound Journey Milestones</h3>
              <span className="text-xs text-muted-foreground">C · O · R · I · B · W sequence</span>
            </div>
            <JourneyMilestones milestones={milestones} size="md" />
          </div>

          {/* Outreach History Timeline */}
          <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-foreground">Outreach History ({leadOutreach.length})</h3>
                <p className="text-xs text-muted-foreground">All sent touchpoints and engagement signals</p>
              </div>

              <button
                onClick={() => setIsContactModalOpen(true)}
                className="text-xs font-semibold text-primary hover:underline cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Log New Touch</span>
              </button>
            </div>

            {leadOutreach.length === 0 ? (
              <p className="text-xs text-muted-foreground py-6 text-center">
                No outreach logged yet. Click "Log Outreach" to record first contact.
              </p>
            ) : (
              <div className="space-y-3">
                {leadOutreach.map((item: any) => (
                  <div key={item.id} className="p-4 rounded-xl bg-muted/30 border border-border space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-xs rounded-md bg-primary/10 text-primary font-semibold">
                          {item.channel}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatRelativeTime(item.sent_at)}
                        </span>
                      </div>

                      {/* Engagement Tags */}
                      <div className="flex items-center gap-1.5">
                        {item.opened ? (
                          <span className="px-2 py-0.5 text-[11px] rounded bg-indigo-500/10 text-indigo-600 font-medium">
                            Opened
                          </span>
                        ) : (
                          <button
                            onClick={() => markOutreachOpened(item.id)}
                            className="px-2 py-0.5 text-[11px] rounded border border-border text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                          >
                            Mark Opened
                          </button>
                        )}

                        {item.replied ? (
                          <span className="px-2 py-0.5 text-[11px] rounded bg-purple-500/10 text-purple-600 font-bold">
                            Replied
                          </span>
                        ) : (
                          <button
                            onClick={() => setReplyDialogOpenFor(item.id)}
                            className="px-2 py-0.5 text-[11px] rounded bg-purple-500/10 text-purple-600 hover:bg-purple-500/20 font-medium transition-colors cursor-pointer"
                          >
                            Mark Replied
                          </button>
                        )}
                      </div>
                    </div>

                    {item.notes && (
                      <p className="text-xs text-foreground bg-card p-2.5 rounded-lg border border-border/60">
                        {item.notes}
                      </p>
                    )}

                    {item.reply_notes && (
                      <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs text-purple-950 dark:text-purple-200">
                        <strong>Reply received:</strong> {item.reply_notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tasks Section */}
          <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-foreground">Tasks & Follow-ups ({leadTasks.length})</h3>
                <p className="text-xs text-muted-foreground">Action items assigned to this lead</p>
              </div>

              <button
                onClick={() => setIsTaskModalOpen(true)}
                className="text-xs font-semibold text-primary hover:underline cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Task</span>
              </button>
            </div>

            {leadTasks.length === 0 ? (
              <p className="text-xs text-muted-foreground py-4 text-center">No open tasks for this lead.</p>
            ) : (
              <div className="space-y-2">
                {leadTasks.map((task: any) => (
                  <div
                    key={task.id}
                    className="p-3 rounded-xl bg-muted/30 border border-border flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <input
                        type="checkbox"
                        checked={task.status === 'Completed'}
                        onChange={() => toggleTask(task.id)}
                        className="w-4 h-4 rounded text-primary border-input focus:ring-primary cursor-pointer"
                      />
                      <div className="min-w-0">
                        <p className={`text-xs sm:text-sm font-medium ${task.status === 'Completed' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                          {task.title}
                        </p>
                        <span className="text-[11px] text-muted-foreground">
                          Due {new Date(task.due_date).toLocaleDateString()} · {task.task_type}
                        </span>
                      </div>
                    </div>

                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                      task.priority === 'High' ? 'bg-rose-500/10 text-rose-600' : 'bg-muted text-muted-foreground'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notes Feed */}
          <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-4">
            <h3 className="text-base font-bold text-foreground">Internal Notes</h3>

            <form onSubmit={handleAddNote} className="space-y-2">
              <textarea
                rows={3}
                placeholder="Write a note about this company, call takeaways, or custom requests..."
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-background border border-input rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!newNoteText.trim()}
                  className="px-4 py-1.5 text-xs font-semibold rounded-xl gradient-primary text-white disabled:opacity-50 cursor-pointer"
                >
                  Save Note
                </button>
              </div>
            </form>

            <div className="divide-y divide-border/60">
              {leadNotes.map((note: any) => (
                <div key={note.id} className="py-3 space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>{note.author_name || 'Staff Member'}</span>
                    <div className="flex items-center gap-2">
                      <span>{formatRelativeTime(note.created_at)}</span>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="text-muted-foreground hover:text-destructive cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-foreground whitespace-pre-wrap">{note.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Column */}
        <div className="space-y-6">
          {/* Key Details Card */}
          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Contact & Company Info</h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-border/50">
                <span className="text-muted-foreground">Contact Person</span>
                <span className="font-semibold text-foreground">{lead.contact_name || '—'}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-border/50">
                <span className="text-muted-foreground">Email</span>
                {lead.email ? (
                  <a href={`mailto:${lead.email}`} className="text-primary hover:underline font-medium truncate max-w-[170px]">
                    {lead.email}
                  </a>
                ) : <span className="text-muted-foreground">—</span>}
              </div>

              <div className="flex justify-between py-1 border-b border-border/50">
                <span className="text-muted-foreground">Phone</span>
                {lead.phone ? (
                  <a href={`tel:${lead.phone}`} className="text-primary hover:underline font-medium">
                    {lead.phone}
                  </a>
                ) : <span className="text-muted-foreground">—</span>}
              </div>

              <div className="flex justify-between py-1 border-b border-border/50">
                <span className="text-muted-foreground">Website</span>
                {lead.website ? (
                  <a href={lead.website} target="_blank" rel="noreferrer" className="text-primary hover:underline flex items-center gap-1">
                    <span>Visit site</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : <span className="text-muted-foreground">—</span>}
              </div>

              <div className="flex justify-between py-1 border-b border-border/50">
                <span className="text-muted-foreground">Location</span>
                <span className="text-foreground">{lead.city || '—'}, {lead.state || ''}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-border/50">
                <span className="text-muted-foreground">Lead Source</span>
                <span className="text-foreground">{lead.lead_source}</span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Last Contact</span>
                <span className="text-foreground tabular-nums">{formatRelativeTime(lead.last_contact_at)}</span>
              </div>
            </div>
          </div>

          {/* Opportunity Signals Card */}
          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Maturity Signals</h3>
              <Sparkles className="w-4 h-4 text-primary" />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-muted/40 border border-border">
                <span className="text-[11px] text-muted-foreground block">Google Ads</span>
                <span className={`font-bold ${lead.google_ads_running ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'}`}>
                  {lead.google_ads_running ? 'YES (+15)' : 'NO'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-muted/40 border border-border">
                <span className="text-[11px] text-muted-foreground block">Meta Ads</span>
                <span className={`font-bold ${lead.meta_ads_running ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'}`}>
                  {lead.meta_ads_running ? 'YES (+15)' : 'NO'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-muted/40 border border-border">
                <span className="text-[11px] text-muted-foreground block">Website Quality</span>
                <span className="font-semibold text-foreground">{lead.website_quality || 'Fair'}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-muted/40 border border-border">
                <span className="text-[11px] text-muted-foreground block">Online Booking</span>
                <span className="font-semibold text-foreground">{lead.online_booking || 'No'}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-muted/40 border border-border">
                <span className="text-[11px] text-muted-foreground block">24/7 Operations</span>
                <span className="font-semibold text-foreground">{lead.service_24_7 || 'No'}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-muted/40 border border-border">
                <span className="text-[11px] text-muted-foreground block">Reviews & Rating</span>
                <span className="font-semibold text-foreground flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  {lead.rating || 4.5} ({lead.reviews_count || 0})
                </span>
              </div>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Social Channels</h3>

            <div className="flex items-center gap-2 flex-wrap">
              {lead.social_facebook && (
                <a
                  href={lead.social_facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl border border-border bg-muted/40 hover:bg-muted text-foreground transition-colors"
                >
                  <FacebookIcon className="w-3.5 h-3.5 text-blue-600" />
                  <span>Facebook</span>
                </a>
              )}
              {lead.social_instagram && (
                <a
                  href={lead.social_instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl border border-border bg-muted/40 hover:bg-muted text-foreground transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-pink-600" />
                  <span>Instagram</span>
                </a>
              )}
              {lead.social_linkedin && (
                <a
                  href={lead.social_linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl border border-border bg-muted/40 hover:bg-muted text-foreground transition-colors"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-blue-700" />
                  <span>LinkedIn</span>
                </a>
              )}
              {!lead.social_facebook && !lead.social_instagram && !lead.social_linkedin && (
                <span className="text-xs text-muted-foreground">No social profiles recorded.</span>
              )}
            </div>
          </div>

          {/* Scheduled Appointments */}
          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Booked Calls</h3>
              <Calendar className="w-4 h-4 text-teal-500" />
            </div>

            {leadAppointments.length === 0 ? (
              <p className="text-xs text-muted-foreground">No calls booked currently.</p>
            ) : (
              <div className="space-y-2">
                {leadAppointments.map((appt: any) => (
                  <div key={appt.id} className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-teal-800 dark:text-teal-300">
                      <span>{appt.appointment_type}</span>
                      <span className="text-[11px] font-normal">{new Date(appt.appointment_date).toLocaleDateString()}</span>
                    </div>
                    {appt.notes && <p className="text-muted-foreground text-[11px]">{appt.notes}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mark Contacted Modal */}
      <MarkContactedModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        lead={lead}
      />

      {/* Task Creation Modal */}
      <QuickTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        defaultLeadId={lead.id}
      />

      {/* Book Appointment Modal */}
      <Modal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        title={`Book Call with ${lead.business_name}`}
        subtitle="Schedule discovery call, demo, or closing presentation"
        maxWidth="md"
      >
        <form onSubmit={handleBookAppointment} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-foreground mb-1">Appointment Type</label>
            <select
              value={bookType}
              onChange={(e) => setBookType(e.target.value as AppointmentType)}
              className="w-full px-3 py-2 text-sm bg-background border border-input rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary"
            >
              <option value="Discovery Call">Discovery Call</option>
              <option value="Demo">Demo</option>
              <option value="Follow-up Call">Follow-up Call</option>
              <option value="Closing Call">Closing Call</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-foreground mb-1">Scheduled Date</label>
            <input
              type="date"
              required
              value={bookDate}
              onChange={(e) => setBookDate(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-background border border-input rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-foreground mb-1">Agenda / Meeting Notes</label>
            <textarea
              rows={3}
              placeholder="Meeting agenda, calendar invite link, or expected attendees..."
              value={bookNotes}
              onChange={(e) => setBookNotes(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-background border border-input rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <button
              type="button"
              onClick={() => setIsBookModalOpen(false)}
              className="px-4 py-2 text-sm font-medium rounded-xl border border-border text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold rounded-xl gradient-primary text-white shadow-md hover:opacity-95 transition-all cursor-pointer"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </Modal>

      {/* Record Customer Reply Dialog */}
      <Modal
        isOpen={!!replyDialogOpenFor}
        onClose={() => setReplyDialogOpenFor(null)}
        title="Record Prospect Reply"
        subtitle="Log the reply content and advance lead stage to Replied"
        maxWidth="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-foreground mb-1">Customer Reply Content</label>
            <textarea
              rows={4}
              placeholder="e.g. Eleanor replied: 'This looks very interesting. Send me calendar link for Friday morning.'"
              value={replyNotes}
              onChange={(e) => setReplyNotes(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-background border border-input rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <button
              type="button"
              onClick={() => setReplyDialogOpenFor(null)}
              className="px-4 py-2 text-sm font-medium rounded-xl border border-border text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleReplySubmit}
              className="px-5 py-2 text-sm font-semibold rounded-xl gradient-primary text-white shadow-md hover:opacity-95 transition-all cursor-pointer"
            >
              Save Reply & Advance Stage
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
