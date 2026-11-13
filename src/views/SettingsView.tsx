import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import { 
  Trash2, 
  RotateCcw
} from 'lucide-react';
import { toast } from 'sonner';

export const SettingsView: React.FC = () => {
  const { profile, settings, updateProfile, updateSettings, resetToDefaultData } = useCRM();

  // Local state for profile form
  const [dailyTarget, setDailyTarget] = useState(profile.daily_target);
  const [followupDays, setFollowupDays] = useState(profile.followup_interval_days);
  const [monthlyTarget, setMonthlyTarget] = useState(profile.monthly_target);
  const [userName, setUserName] = useState(profile.userName);
  const [userEmail, setUserEmail] = useState(profile.userEmail);
  const [companyName, setCompanyName] = useState(profile.companyName);

  // New list item inputs
  const [newStage, setNewStage] = useState('');
  const [newSource, setNewSource] = useState('');
  const [newTaskType, setNewTaskType] = useState('');
  const [newChannel, setNewChannel] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      daily_target: dailyTarget,
      followup_interval_days: followupDays,
      monthly_target: monthlyTarget,
      userName,
      userEmail,
      companyName
    });
  };

  const handleAddStage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStage.trim()) return;
    if (settings.stages.includes(newStage.trim())) {
      toast.error('Stage already exists');
      return;
    }
    updateSettings({ stages: [...settings.stages, newStage.trim()] });
    setNewStage('');
  };

  const handleDeleteStage = (stage: string) => {
    if (settings.stages.length <= 2) {
      toast.error('Must maintain at least 2 pipeline stages');
      return;
    }
    updateSettings({ stages: settings.stages.filter((s: string) => s !== stage) });
  };

  const handleAddSource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSource.trim()) return;
    if (settings.sources.includes(newSource.trim())) {
      toast.error('Source already exists');
      return;
    }
    updateSettings({ sources: [...settings.sources, newSource.trim()] });
    setNewSource('');
  };

  const handleDeleteSource = (src: string) => {
    if (settings.sources.length <= 1) {
      toast.error('Must maintain at least 1 source');
      return;
    }
    updateSettings({ sources: settings.sources.filter((s: string) => s !== src) });
  };

  const handleAddTaskType = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskType.trim()) return;
    if (settings.taskTypes.includes(newTaskType.trim())) {
      toast.error('Task type already exists');
      return;
    }
    updateSettings({ taskTypes: [...settings.taskTypes, newTaskType.trim()] });
    setNewTaskType('');
  };

  const handleDeleteTaskType = (type: string) => {
    if (settings.taskTypes.length <= 1) {
      toast.error('Must maintain at least 1 task type');
      return;
    }
    updateSettings({ taskTypes: settings.taskTypes.filter((t: string) => t !== type) });
  };

  const handleAddChannel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChannel.trim()) return;
    if (settings.channels.includes(newChannel.trim())) {
      toast.error('Channel already exists');
      return;
    }
    updateSettings({ channels: [...settings.channels, newChannel.trim()] });
    setNewChannel('');
  };

  const handleDeleteChannel = (ch: string) => {
    if (settings.channels.length <= 1) {
      toast.error('Must maintain at least 1 channel');
      return;
    }
    updateSettings({ channels: settings.channels.filter((c: string) => c !== ch) });
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Settings & Workflows</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Configure outreach cadences, daily conversion targets, and customize CRM pipelines.
        </p>
      </div>

      {/* Cadence & Goals Configuration */}
      <form onSubmit={handleSaveProfile} className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h3 className="text-base font-bold text-foreground">Outbound Targets & Cadence</h3>
            <p className="text-xs text-muted-foreground">Adjust target velocities for your daily outreach engine</p>
          </div>
          <button
            type="submit"
            className="px-5 py-2 text-xs sm:text-sm font-semibold rounded-xl gradient-primary text-white shadow-md hover:opacity-95 transition-all cursor-pointer"
          >
            Save Target Settings
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Daily Target */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-foreground">
              Daily New Lead Target
            </label>
            <div className="flex items-center gap-1.5 flex-wrap">
              {[5, 10, 20, 30, 50].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setDailyTarget(val)}
                  className={`px-3 py-1 text-xs rounded-lg border font-medium transition-colors cursor-pointer ${
                    dailyTarget === val
                      ? 'border-primary bg-primary/10 text-primary font-bold'
                      : 'border-border bg-muted/40 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
            <input
              type="number"
              min="1"
              value={dailyTarget}
              onChange={(e) => setDailyTarget(parseInt(e.target.value, 10) || 1)}
              className="w-full px-3 py-1.5 text-xs sm:text-sm bg-background border border-input rounded-xl"
            />
          </div>

          {/* Follow-up Interval */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-foreground">
              Follow-up Cadence Interval (Days)
            </label>
            <div className="flex items-center gap-1.5 flex-wrap">
              {[1, 2, 3, 5, 7].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setFollowupDays(val)}
                  className={`px-3 py-1 text-xs rounded-lg border font-medium transition-colors cursor-pointer ${
                    followupDays === val
                      ? 'border-primary bg-primary/10 text-primary font-bold'
                      : 'border-border bg-muted/40 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {val}d
                </button>
              ))}
            </div>
            <input
              type="number"
              min="1"
              max="30"
              value={followupDays}
              onChange={(e) => setFollowupDays(parseInt(e.target.value, 10) || 1)}
              className="w-full px-3 py-1.5 text-xs sm:text-sm bg-background border border-input rounded-xl"
            />
          </div>

          {/* Monthly Target */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-foreground">
              Monthly Outreach Goal
            </label>
            <div className="flex items-center gap-1.5 flex-wrap">
              {[100, 200, 300, 500].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setMonthlyTarget(val)}
                  className={`px-3 py-1 text-xs rounded-lg border font-medium transition-colors cursor-pointer ${
                    monthlyTarget === val
                      ? 'border-primary bg-primary/10 text-primary font-bold'
                      : 'border-border bg-muted/40 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
            <input
              type="number"
              min="10"
              value={monthlyTarget}
              onChange={(e) => setMonthlyTarget(parseInt(e.target.value, 10) || 10)}
              className="w-full px-3 py-1.5 text-xs sm:text-sm bg-background border border-input rounded-xl"
            />
          </div>
        </div>

        {/* User & Company Details */}
        <div className="pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-foreground mb-1">User Full Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-background border border-input rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-foreground mb-1">Email</label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-background border border-input rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-foreground mb-1">Agency / Company Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-background border border-input rounded-xl"
            />
          </div>
        </div>
      </form>

      {/* 2x2 Grid of Customizable Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Pipeline Stages */}
        <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-foreground">Custom Pipeline Stages</h3>
            <p className="text-xs text-muted-foreground">Manage the conversion steps of your sales funnel</p>
          </div>

          <form onSubmit={handleAddStage} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Contract Review"
              value={newStage}
              onChange={(e) => setNewStage(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs bg-background border border-input rounded-xl"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 text-xs font-semibold rounded-xl gradient-primary text-white cursor-pointer"
            >
              Add Stage
            </button>
          </form>

          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {settings.stages.map((stg: string) => (
              <div key={stg} className="flex items-center justify-between p-2 rounded-xl bg-muted/30 border border-border/80 text-xs">
                <span className="font-medium text-foreground">{stg}</span>
                <button
                  onClick={() => handleDeleteStage(stg)}
                  className="text-muted-foreground hover:text-destructive p-1 rounded cursor-pointer"
                  title="Delete stage"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Lead Sources */}
        <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-foreground">Lead Sources</h3>
            <p className="text-xs text-muted-foreground">Where your prospects originate from</p>
          </div>

          <form onSubmit={handleAddSource} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Cold Calling, Apollo"
              value={newSource}
              onChange={(e) => setNewSource(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs bg-background border border-input rounded-xl"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 text-xs font-semibold rounded-xl gradient-primary text-white cursor-pointer"
            >
              Add Source
            </button>
          </form>

          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {settings.sources.map((src: string) => (
              <div key={src} className="flex items-center justify-between p-2 rounded-xl bg-muted/30 border border-border/80 text-xs">
                <span className="font-medium text-foreground">{src}</span>
                <button
                  onClick={() => handleDeleteSource(src)}
                  className="text-muted-foreground hover:text-destructive p-1 rounded cursor-pointer"
                  title="Delete source"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Task Types */}
        <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-foreground">Task Types</h3>
            <p className="text-xs text-muted-foreground">Classify reminders and action items</p>
          </div>

          <form onSubmit={handleAddTaskType} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Contract Drafting"
              value={newTaskType}
              onChange={(e) => setNewTaskType(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs bg-background border border-input rounded-xl"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 text-xs font-semibold rounded-xl gradient-primary text-white cursor-pointer"
            >
              Add Type
            </button>
          </form>

          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {settings.taskTypes.map((type: string) => (
              <div key={type} className="flex items-center justify-between p-2 rounded-xl bg-muted/30 border border-border/80 text-xs">
                <span className="font-medium text-foreground">{type}</span>
                <button
                  onClick={() => handleDeleteTaskType(type)}
                  className="text-muted-foreground hover:text-destructive p-1 rounded cursor-pointer"
                  title="Delete task type"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Outreach Channels */}
        <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-foreground">Outreach Channels</h3>
            <p className="text-xs text-muted-foreground">Supported channels for multi-touch cadences</p>
          </div>

          <form onSubmit={handleAddChannel} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Twitter DM, Telegram"
              value={newChannel}
              onChange={(e) => setNewChannel(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs bg-background border border-input rounded-xl"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 text-xs font-semibold rounded-xl gradient-primary text-white cursor-pointer"
            >
              Add Channel
            </button>
          </form>

          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {settings.channels.map((ch: string) => (
              <div key={ch} className="flex items-center justify-between p-2 rounded-xl bg-muted/30 border border-border/80 text-xs">
                <span className="font-medium text-foreground">{ch}</span>
                <button
                  onClick={() => handleDeleteChannel(ch)}
                  className="text-muted-foreground hover:text-destructive p-1 rounded cursor-pointer"
                  title="Delete channel"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reset Data Danger Zone */}
      <div className="p-6 rounded-2xl bg-card border border-destructive/20 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-destructive">Reset Demo Data</h3>
          <p className="text-xs text-muted-foreground">Re-populate sample leads, tasks, and analytics</p>
        </div>
        <button
          onClick={resetToDefaultData}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Sample Database</span>
        </button>
      </div>
    </div>
  );
};
