import React from 'react';
import { JourneyMilestones as MilestonesType } from '../../lib/scoring';

interface JourneyMilestonesProps {
  milestones: MilestonesType;
  size?: 'sm' | 'md';
}

export const JourneyMilestones: React.FC<JourneyMilestonesProps> = ({ milestones, size = 'sm' }) => {
  const steps = [
    { key: 'contacted', label: 'C', title: 'Contacted', active: milestones.contacted, color: 'bg-blue-600 text-white' },
    { key: 'opened', label: 'O', title: 'Opened', active: milestones.opened, color: 'bg-indigo-600 text-white' },
    { key: 'replied', label: 'R', title: 'Replied', active: milestones.replied, color: 'bg-purple-600 text-white' },
    { key: 'interested', label: 'I', title: 'Interested', active: milestones.interested, color: 'bg-amber-600 text-white' },
    { key: 'booked', label: 'B', title: 'Call Booked', active: milestones.booked, color: 'bg-teal-600 text-white' },
    { key: 'won', label: 'W', title: 'Won', active: milestones.won, color: 'bg-emerald-600 text-white' },
  ];

  const circleSize = size === 'sm' ? 'w-5 h-5 text-[10px]' : 'w-6 h-6 text-xs';

  return (
    <div className="flex items-center gap-1" title="Journey Milestones: Contacted · Opened · Replied · Interested · Booked · Won">
      {steps.map((step, idx) => (
        <React.Fragment key={step.key}>
          <div
            title={`${step.title}: ${step.active ? 'Completed' : 'Pending'}`}
            className={`flex items-center justify-center font-bold rounded-full transition-all duration-200 select-none ${circleSize} ${
              step.active
                ? `${step.color} shadow-sm ring-1 ring-black/5 dark:ring-white/10 scale-100`
                : 'bg-muted text-muted-foreground/50 border border-border/60 hover:border-muted-foreground/40'
            }`}
          >
            {step.label}
          </div>
          {idx < steps.length - 1 && (
            <div className={`w-1 h-0.5 rounded-full ${step.active && steps[idx + 1].active ? 'bg-primary/60' : 'bg-muted'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
