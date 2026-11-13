import React from 'react';
import { OpportunityLevel } from '../../types/crm';

interface ScoreBadgeProps {
  score: number;
  level?: OpportunityLevel;
  showScoreOnly?: boolean;
}

export const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score, level, showScoreOnly = false }) => {
  const getStyle = (s: number) => {
    if (s >= 70) {
      return {
        bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
        text: 'text-emerald-700 dark:text-emerald-300',
        border: 'border-emerald-500/30',
        dot: 'bg-emerald-500'
      };
    }
    if (s >= 40) {
      return {
        bg: 'bg-amber-500/10 dark:bg-amber-500/20',
        text: 'text-amber-700 dark:text-amber-300',
        border: 'border-amber-500/30',
        dot: 'bg-amber-500'
      };
    }
    return {
      bg: 'bg-rose-500/10 dark:bg-rose-500/20',
      text: 'text-rose-700 dark:text-rose-300',
      border: 'border-rose-500/30',
      dot: 'bg-rose-500'
    };
  };

  const style = getStyle(score);

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-xs font-medium tabular-nums ${style.bg} ${style.text} ${style.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      <span>{score}</span>
      {!showScoreOnly && level && (
        <span className="opacity-75 text-[11px] font-normal tracking-wide">· {level}</span>
      )}
    </span>
  );
};
