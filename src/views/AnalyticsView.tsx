import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import { 
  Download, 
} from 'lucide-react';
import { formatCurrency } from '../lib/scoring';
import { toast } from 'sonner';
import type { Lead, Outreach } from '../types/crm';

export const AnalyticsView: React.FC = () => {
  const { leads, outreach, appointments } = useCRM();

  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'all'>('all');

  const ranges: { id: 'today' | 'week' | 'month' | 'all'; label: string }[] = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This week' },
    { id: 'month', label: 'This month' },
    { id: 'all', label: 'All time' }
  ];

  // Aggregate metrics
  const totalOutreachSent = outreach.length;
  const emailsSent = outreach.filter((o: Outreach) => o.channel === 'Email').length;
  const emailsOpened = outreach.filter((o: Outreach) => o.opened).length;
  const totalReplies = outreach.filter((o: Outreach) => o.replied).length;
  const callsBooked = appointments.length;
  const dealsWon = leads.filter((l: Lead) => l.pipeline_stage === 'Won').length;
  const totalWonRevenue = leads.filter((l: Lead) => l.pipeline_stage === 'Won').reduce((s: number, l: Lead) => s + (l.deal_value || 0), 0);

  // Conversion Rates
  const openRate = emailsSent > 0 ? Math.round((emailsOpened / emailsSent) * 100) : 0;
  const replyRate = totalOutreachSent > 0 ? Math.round((totalReplies / totalOutreachSent) * 100) : 0;
  const bookingRate = totalReplies > 0 ? Math.round((callsBooked / totalReplies) * 100) : 0;
  const closeRate = callsBooked > 0 ? Math.round((dealsWon / callsBooked) * 100) : 0;

  // Channels performance breakdown
  const channelTypes = ['Email', 'Phone', 'WhatsApp', 'SMS', 'LinkedIn'] as const;
  const channelStats = channelTypes.map((ch: string) => {
    const sent = outreach.filter((o: Outreach) => o.channel === ch).length;
    const opened = outreach.filter((o: Outreach) => o.channel === ch && o.opened).length;
    const replied = outreach.filter((o: Outreach) => o.channel === ch && o.replied).length;
    const repRate = sent > 0 ? Math.round((replied / sent) * 100) : 0;
    return { channel: ch, sent, opened, replied, replyRate: repRate };
  });

  const handleExportAnalytics = () => {
    const csvRows = [
      'Channel,Outreach Sent,Opened,Replies,Reply Rate %',
      ...channelStats.map((c: any) => `"${c.channel}",${c.sent},${c.opened},${c.replied},${c.replyRate}%`)
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('Analytics report downloaded');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Full-funnel outbound tracking, channel engagement, and conversion efficiency.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Range Selector */}
          <div className="flex items-center p-1 bg-muted rounded-xl border border-border">
            {ranges.map((r) => (
              <button
                key={r.id}
                onClick={() => setDateRange(r.id)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  dateRange === r.id ? 'bg-card text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportAnalytics}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-xl border border-border bg-card hover:bg-muted text-foreground transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Top 8 Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-card border border-border shadow-xs">
          <span className="text-xs text-muted-foreground font-medium">Outreach Sent</span>
          <p className="text-2xl font-bold tabular-nums text-foreground mt-1">{totalOutreachSent}</p>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border shadow-xs">
          <span className="text-xs text-muted-foreground font-medium">Emails Sent</span>
          <p className="text-2xl font-bold tabular-nums text-foreground mt-1">{emailsSent}</p>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border shadow-xs">
          <span className="text-xs text-muted-foreground font-medium">Emails Opened</span>
          <p className="text-2xl font-bold tabular-nums text-indigo-600 dark:text-indigo-400 mt-1">{emailsOpened}</p>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border shadow-xs">
          <span className="text-xs text-muted-foreground font-medium">Replies Received</span>
          <p className="text-2xl font-bold tabular-nums text-purple-600 dark:text-purple-400 mt-1">{totalReplies}</p>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border shadow-xs">
          <span className="text-xs text-muted-foreground font-medium">Calls Booked</span>
          <p className="text-2xl font-bold tabular-nums text-teal-600 dark:text-teal-400 mt-1">{callsBooked}</p>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border shadow-xs">
          <span className="text-xs text-muted-foreground font-medium">Deals Won</span>
          <p className="text-2xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400 mt-1">{dealsWon}</p>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border shadow-xs">
          <span className="text-xs text-muted-foreground font-medium">Won Revenue</span>
          <p className="text-2xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400 mt-1">
            {formatCurrency(totalWonRevenue)}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border shadow-xs">
          <span className="text-xs text-muted-foreground font-medium">Overall Reply %</span>
          <p className="text-2xl font-bold tabular-nums text-foreground mt-1">{replyRate}%</p>
        </div>
      </div>

      {/* 5 Conversion Rates Strip */}
      <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-4">
        <h3 className="text-base font-bold text-foreground">Funnel Conversion Rates</h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-xl bg-muted/40 border border-border">
            <span className="text-xs text-muted-foreground">Open Rate</span>
            <p className="text-2xl font-bold text-foreground mt-1">{openRate}%</p>
            <span className="text-[11px] text-muted-foreground">Opened / Sent</span>
          </div>

          <div className="p-3.5 rounded-xl bg-muted/40 border border-border">
            <span className="text-xs text-muted-foreground">Reply Rate</span>
            <p className="text-2xl font-bold text-primary mt-1">{replyRate}%</p>
            <span className="text-[11px] text-muted-foreground">Replies / Outreach</span>
          </div>

          <div className="p-3.5 rounded-xl bg-muted/40 border border-border">
            <span className="text-xs text-muted-foreground">Booking Rate</span>
            <p className="text-2xl font-bold text-teal-600 dark:text-teal-400 mt-1">{bookingRate}%</p>
            <span className="text-[11px] text-muted-foreground">Calls / Replies</span>
          </div>

          <div className="p-3.5 rounded-xl bg-muted/40 border border-border">
            <span className="text-xs text-muted-foreground">Close Rate</span>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{closeRate}%</p>
            <span className="text-[11px] text-muted-foreground">Won / Booked</span>
          </div>
        </div>
      </div>

      {/* Channel Performance Breakdown */}
      <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-4">
        <h3 className="text-base font-bold text-foreground">Channel Performance Breakdown</h3>

        <div className="border border-border rounded-xl overflow-hidden">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-muted/40 border-b border-border text-muted-foreground font-semibold">
              <tr>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Sent</th>
                <th className="py-3 px-4">Opened</th>
                <th className="py-3 px-4">Replies</th>
                <th className="py-3 px-4">Reply Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {channelStats.map((ch: any) => (
                <tr key={ch.channel} className="hover:bg-muted/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-foreground">{ch.channel}</td>
                  <td className="py-3 px-4 tabular-nums text-foreground">{ch.sent}</td>
                  <td className="py-3 px-4 tabular-nums text-foreground">{ch.opened}</td>
                  <td className="py-3 px-4 tabular-nums text-purple-600 dark:text-purple-400 font-semibold">{ch.replied}</td>
                  <td className="py-3 px-4 tabular-nums font-bold text-primary">{ch.replyRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
