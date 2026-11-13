import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  Lead, Task, Outreach, Note, Appointment, Activity, 
  ProfileSettings, CustomSettings, PipelineStage, OutreachChannel, OutreachOutcome 
} from '../types/crm';
import { 
  initialLeads, initialTasks, initialOutreach, 
  initialNotes, initialAppointments, initialActivities, 
  initialProfile, initialSettings 
} from '../data/mockData';
import { calculateOpportunityScore, getOpportunityLevel } from '../lib/scoring';
import { api } from '../lib/api';
import { toast } from 'sonner';

interface CRMContextType {
  leads: Lead[];
  tasks: Task[];
  outreach: Outreach[];
  notes: Note[];
  appointments: Appointment[];
  activities: Activity[];
  profile: ProfileSettings;
  settings: CustomSettings;
  theme: 'light' | 'dark';
  isBackendConnected: boolean;
  toggleTheme: () => void;

  // Lead actions
  addLead: (lead: Omit<Lead, 'id' | 'created_at' | 'updated_at' | 'opportunity_score' | 'opportunity_level'>) => Promise<Lead>;
  updateLead: (id: string, updates: Partial<Lead>) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
  bulkUpdateStage: (ids: string[], stage: PipelineStage) => Promise<void>;
  bulkDelete: (ids: string[]) => Promise<void>;
  getLead: (id: string) => Lead | undefined;

  // Outreach actions
  logOutreach: (params: {
    leadId: string;
    channel: OutreachChannel;
    message?: string;
    notes?: string;
    followupDays?: number;
    outcome?: OutreachOutcome;
    nextLeadId?: string;
  }) => Promise<void>;
  markOutreachOpened: (outreachId: string) => Promise<void>;
  markOutreachReplied: (outreachId: string, replyNotes?: string) => Promise<void>;
  markLeadInterested: (leadId: string) => Promise<void>;

  // Task actions
  addTask: (task: Omit<Task, 'id' | 'created_at'>) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;

  // Note actions
  addNote: (leadId: string, content: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;

  // Appointment actions
  addAppointment: (appointment: Omit<Appointment, 'id' | 'created_at'>) => Promise<void>;
  updateAppointment: (id: string, updates: Partial<Appointment>) => Promise<void>;

  // Import / Export
  importLeads: (newLeads: Partial<Lead>[]) => Promise<{ imported: number; duplicates: number }>;
  exportLeadsCSV: () => void;

  // Settings
  updateProfile: (updates: Partial<ProfileSettings>) => Promise<void>;
  updateSettings: (updates: Partial<CustomSettings>) => Promise<void>;
  resetToDefaultData: () => void;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

const STORAGE_KEYS = {
  LEADS: 'ahad_crm_leads',
  TASKS: 'ahad_crm_tasks',
  OUTREACH: 'ahad_crm_outreach',
  NOTES: 'ahad_crm_notes',
  APPOINTMENTS: 'ahad_crm_appointments',
  ACTIVITIES: 'ahad_crm_activities',
  PROFILE: 'ahad_crm_profile',
  SETTINGS: 'ahad_crm_settings',
  THEME: 'ahad_crm_theme'
};

export const CRMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LEADS);
    return saved ? JSON.parse(saved) : initialLeads;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TASKS);
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [outreach, setOutreach] = useState<Outreach[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.OUTREACH);
    return saved ? JSON.parse(saved) : initialOutreach;
  });

  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTES);
    return saved ? JSON.parse(saved) : initialNotes;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    return saved ? JSON.parse(saved) : initialAppointments;
  });

  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
    return saved ? JSON.parse(saved) : initialActivities;
  });

  const [profile, setProfile] = useState<ProfileSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [settings, setSettings] = useState<CustomSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return saved ? JSON.parse(saved) : initialSettings;
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Sync from backend server if running
  useEffect(() => {
    async function initFromBackend() {
      try {
        const isHealthy = await api.checkHealth();
        if (isHealthy) {
          setIsBackendConnected(true);
          const [remoteLeads, remoteTasks, remoteOutreach, remoteNotes, remoteAppts, remoteActs, remoteSettings] = await Promise.all([
            api.getLeads().catch(() => null),
            api.getTasks().catch(() => null),
            api.getOutreach().catch(() => null),
            api.getNotes().catch(() => null),
            api.getAppointments().catch(() => null),
            api.getActivities().catch(() => null),
            api.getSettings().catch(() => null)
          ]);

          if (remoteLeads && remoteLeads.length > 0) setLeads(remoteLeads);
          if (remoteTasks && remoteTasks.length > 0) setTasks(remoteTasks);
          if (remoteOutreach && remoteOutreach.length > 0) setOutreach(remoteOutreach);
          if (remoteNotes && remoteNotes.length > 0) setNotes(remoteNotes);
          if (remoteAppts && remoteAppts.length > 0) setAppointments(remoteAppts);
          if (remoteActs && remoteActs.length > 0) setActivities(remoteActs);
          if (remoteSettings) {
            if (remoteSettings.profile) setProfile(remoteSettings.profile);
            if (remoteSettings.settings) setSettings(remoteSettings.settings);
          }
        }
      } catch {
        setIsBackendConnected(false);
      }
    }
    initFromBackend();
  }, []);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.OUTREACH, JSON.stringify(outreach));
  }, [outreach]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const getLead = (id: string) => leads.find(l => l.id === id);

  const addLead = async (leadData: Omit<Lead, 'id' | 'created_at' | 'updated_at' | 'opportunity_score' | 'opportunity_level'>): Promise<Lead> => {
    const score = calculateOpportunityScore(leadData);
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      opportunity_score: score,
      opportunity_level: getOpportunityLevel(score),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setLeads(prev => [newLead, ...prev]);

    // Async sync to Backend API
    try {
      if (isBackendConnected) {
        await api.createLead(leadData);
      }
    } catch {}

    const newActivity: Activity = {
      id: `act-${Date.now()}`,
      lead_id: newLead.id,
      lead_name: newLead.business_name,
      activity_type: 'created',
      title: `Lead "${newLead.business_name}" added to CRM`,
      created_at: new Date().toISOString()
    };
    setActivities(prev => [newActivity, ...prev]);

    toast.success(`Lead "${newLead.business_name}" created successfully!`);
    return newLead;
  };

  const updateLead = async (id: string, updates: Partial<Lead>) => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === id) {
        const merged = { ...lead, ...updates, updated_at: new Date().toISOString() };
        if (
          updates.website_quality !== undefined ||
          updates.google_ads_running !== undefined ||
          updates.meta_ads_running !== undefined ||
          updates.online_booking !== undefined ||
          updates.service_24_7 !== undefined ||
          updates.reviews_count !== undefined ||
          updates.rating !== undefined
        ) {
          const newScore = calculateOpportunityScore(merged);
          merged.opportunity_score = newScore;
          merged.opportunity_level = getOpportunityLevel(newScore);
        }
        return merged;
      }
      return lead;
    }));

    try {
      if (isBackendConnected) {
        await api.updateLead(id, updates);
      }
    } catch {}

    toast.success('Lead updated successfully');
  };

  const deleteLead = async (id: string) => {
    const lead = leads.find(l => l.id === id);
    setLeads(prev => prev.filter(l => l.id !== id));
    setTasks(prev => prev.filter(t => t.lead_id !== id));
    setOutreach(prev => prev.filter(o => o.lead_id !== id));
    setNotes(prev => prev.filter(n => n.lead_id !== id));
    setAppointments(prev => prev.filter(a => a.lead_id !== id));

    try {
      if (isBackendConnected) {
        await api.deleteLead(id);
      }
    } catch {}

    toast.info(`Deleted lead "${lead?.business_name || id}"`);
  };

  const bulkUpdateStage = async (ids: string[], stage: PipelineStage) => {
    setLeads(prev => prev.map(lead => {
      if (ids.includes(lead.id)) {
        return { ...lead, pipeline_stage: stage, updated_at: new Date().toISOString() };
      }
      return lead;
    }));

    try {
      if (isBackendConnected) {
        await api.bulkUpdateStage(ids, stage);
      }
    } catch {}

    toast.success(`Updated stage to "${stage}" for ${ids.length} leads`);
  };

  const bulkDelete = async (ids: string[]) => {
    setLeads(prev => prev.filter(l => !ids.includes(l.id)));
    setTasks(prev => prev.filter(t => !t.lead_id || !ids.includes(t.lead_id)));

    try {
      if (isBackendConnected) {
        await api.bulkDelete(ids);
      }
    } catch {}

    toast.info(`Deleted ${ids.length} leads`);
  };

  const logOutreach = async ({
    leadId,
    channel,
    message,
    notes: outreachNotes,
    followupDays = 2,
    outcome = 'Sent'
  }: {
    leadId: string;
    channel: OutreachChannel;
    message?: string;
    notes?: string;
    followupDays?: number;
    outcome?: OutreachOutcome;
    nextLeadId?: string;
  }) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;

    const currentTouch = (lead.followup_stage ?? 0) + 1;
    const nowIso = new Date().toISOString();

    const newOutreachItem: Outreach = {
      id: `outreach-${Date.now()}`,
      lead_id: leadId,
      channel,
      outcome,
      contact_date: nowIso,
      sent_at: nowIso,
      message,
      notes: outreachNotes,
      opened: false,
      replied: false,
      created_at: nowIso
    };
    setOutreach(prev => [newOutreachItem, ...prev]);

    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        return {
          ...l,
          last_contact_at: nowIso,
          followup_stage: currentTouch,
          pipeline_stage: l.pipeline_stage === 'New' || l.pipeline_stage === 'Ready to Contact' || l.pipeline_stage === 'Researched'
            ? 'Contacted'
            : l.pipeline_stage,
          updated_at: nowIso
        };
      }
      return l;
    }));

    if (followupDays > 0) {
      const dueDate = new Date(Date.now() + followupDays * 24 * 60 * 60 * 1000).toISOString();
      const followUpTask: Task = {
        id: `task-${Date.now()}`,
        lead_id: leadId,
        lead_name: lead.business_name,
        title: `Follow-up #${currentTouch}: ${lead.business_name} (${channel})`,
        task_type: 'Follow-up',
        priority: 'High',
        due_date: dueDate,
        status: 'Pending',
        created_at: nowIso
      };
      setTasks(prev => [followUpTask, ...prev]);
    }

    try {
      if (isBackendConnected) {
        await api.logOutreach({ leadId, channel, notes: outreachNotes, message, followupDays, outcome });
      }
    } catch {}

    const act: Activity = {
      id: `act-${Date.now()}`,
      lead_id: leadId,
      lead_name: lead.business_name,
      activity_type: 'outreach_sent',
      title: `Sent ${channel} outreach to ${lead.business_name} (Touch #${currentTouch})`,
      created_at: nowIso
    };
    setActivities(prev => [act, ...prev]);

    toast.success(`Contacted ${lead.business_name} via ${channel}`);
  };

  const markOutreachOpened = async (outreachId: string) => {
    setOutreach(prev => prev.map(o => {
      if (o.id === outreachId) {
        return { ...o, opened: true, opened_at: new Date().toISOString() };
      }
      return o;
    }));

    try {
      if (isBackendConnected) {
        await api.markOutreachOpened(outreachId);
      }
    } catch {}

    toast.success('Outreach marked as opened');
  };

  const markOutreachReplied = async (outreachId: string, replyNotes?: string) => {
    const item = outreach.find(o => o.id === outreachId);
    if (!item) return;

    const nowIso = new Date().toISOString();
    setOutreach(prev => prev.map(o => {
      if (o.id === outreachId) {
        return {
          ...o,
          opened: true,
          replied: true,
          replied_at: nowIso,
          outcome: 'Replied',
          reply_notes: replyNotes || o.reply_notes
        };
      }
      return o;
    }));

    setLeads(prev => prev.map(l => {
      if (l.id === item.lead_id) {
        return {
          ...l,
          pipeline_stage: l.pipeline_stage === 'Contacted' ? 'Replied' : l.pipeline_stage,
          updated_at: nowIso
        };
      }
      return l;
    }));

    try {
      if (isBackendConnected) {
        await api.markOutreachReplied(outreachId, replyNotes);
      }
    } catch {}

    toast.success('Reply recorded successfully!');
  };

  const markLeadInterested = async (leadId: string) => {
    const nowIso = new Date().toISOString();
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        return {
          ...l,
          pipeline_stage: 'Interested',
          interested_at: nowIso,
          updated_at: nowIso
        };
      }
      return l;
    }));

    try {
      if (isBackendConnected) {
        await api.markLeadInterested(leadId);
      }
    } catch {}

    toast.success('Lead marked as Interested!');
  };

  const addTask = async (taskData: Omit<Task, 'id' | 'created_at'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    setTasks(prev => [newTask, ...prev]);

    try {
      if (isBackendConnected) {
        await api.createTask(taskData);
      }
    } catch {}

    toast.success(`Task "${newTask.title}" added`);
  };

  const toggleTask = async (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const isComplete = t.status === 'Completed';
        const newStatus = isComplete ? 'Pending' : 'Completed';
        const completed_at = !isComplete ? new Date().toISOString() : undefined;
        return { ...t, status: newStatus, completed_at };
      }
      return t;
    }));

    try {
      if (isBackendConnected) {
        await api.toggleTask(id);
      }
    } catch {}
  };

  const deleteTask = async (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));

    try {
      if (isBackendConnected) {
        await api.deleteTask(id);
      }
    } catch {}

    toast.info('Task deleted');
  };

  const addNote = async (leadId: string, content: string) => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      lead_id: leadId,
      content,
      author_name: profile.userName,
      created_at: new Date().toISOString()
    };
    setNotes(prev => [newNote, ...prev]);

    try {
      if (isBackendConnected) {
        await api.createNote({ lead_id: leadId, content, author_name: profile.userName });
      }
    } catch {}

    toast.success('Note saved');
  };

  const deleteNote = async (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));

    try {
      if (isBackendConnected) {
        await api.deleteNote(id);
      }
    } catch {}

    toast.info('Note removed');
  };

  const addAppointment = async (appointmentData: Omit<Appointment, 'id' | 'created_at'>) => {
    const newAppt: Appointment = {
      ...appointmentData,
      id: `appt-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    setAppointments(prev => [newAppt, ...prev]);

    setLeads(prev => prev.map(l => {
      if (l.id === appointmentData.lead_id) {
        return {
          ...l,
          pipeline_stage: 'Call Booked',
          updated_at: new Date().toISOString()
        };
      }
      return l;
    }));

    try {
      if (isBackendConnected) {
        await api.createAppointment(appointmentData);
      }
    } catch {}

    toast.success('Appointment scheduled and stage updated to Call Booked!');
  };

  const updateAppointment = async (id: string, updates: Partial<Appointment>) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    toast.success('Appointment updated');
  };

  const importLeads = async (newLeadsData: Partial<Lead>[]): Promise<{ imported: number; duplicates: number }> => {
    let imported = 0;
    let duplicates = 0;
    const addedList: Lead[] = [];

    const existingNames = new Set(leads.map(l => l.business_name.toLowerCase().trim()));

    for (const item of newLeadsData) {
      if (!item.business_name) continue;
      const cleanName = item.business_name.toLowerCase().trim();
      if (existingNames.has(cleanName)) {
        duplicates++;
        continue;
      }
      existingNames.add(cleanName);

      const score = calculateOpportunityScore(item);
      const leadRecord: Lead = {
        id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        business_name: item.business_name,
        contact_name: item.contact_name || '',
        email: item.email || '',
        phone: item.phone || '',
        website: item.website || '',
        city: item.city || '',
        state: item.state || '',
        country: item.country || 'US',
        lead_source: item.lead_source || 'Google Maps',
        pipeline_stage: item.pipeline_stage || 'New',
        lead_status: item.lead_status || 'Active',
        opportunity_score: score,
        opportunity_level: getOpportunityLevel(score),
        google_ads_running: item.google_ads_running ?? false,
        meta_ads_running: item.meta_ads_running ?? false,
        website_quality: item.website_quality || 'Fair',
        service_24_7: item.service_24_7 || 'No',
        online_booking: item.online_booking || 'No',
        reviews_count: item.reviews_count || 0,
        rating: item.rating || 0,
        notes: item.notes || '',
        deal_value: item.deal_value || 0,
        followup_stage: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      addedList.push(leadRecord);
      imported++;
    }

    if (addedList.length > 0) {
      setLeads(prev => [...addedList, ...prev]);
    }

    try {
      if (isBackendConnected) {
        await api.importLeads(newLeadsData);
      }
    } catch {}

    return { imported, duplicates };
  };

  const exportLeadsCSV = () => {
    if (leads.length === 0) {
      toast.error('No leads available to export');
      return;
    }

    const headers = [
      'Business Name',
      'Contact Name',
      'Email',
      'Phone',
      'Website',
      'City',
      'State',
      'Stage',
      'Score',
      'Level',
      'Source',
      'Deal Value',
      'Last Contact',
      'Created At'
    ];

    const rows = leads.map(l => [
      `"${(l.business_name || '').replace(/"/g, '""')}"`,
      `"${(l.contact_name || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.website || '').replace(/"/g, '""')}"`,
      `"${(l.city || '').replace(/"/g, '""')}"`,
      `"${(l.state || '').replace(/"/g, '""')}"`,
      `"${l.pipeline_stage}"`,
      l.opportunity_score,
      `"${l.opportunity_level}"`,
      `"${l.lead_source}"`,
      l.deal_value || 0,
      `"${l.last_contact_at || ''}"`,
      `"${l.created_at}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `leads-${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(`Exported ${leads.length} leads to CSV`);
  };

  const updateProfile = async (updates: Partial<ProfileSettings>) => {
    setProfile(prev => ({ ...prev, ...updates }));

    try {
      if (isBackendConnected) {
        await api.updateProfile(updates);
      }
    } catch {}

    toast.success('Preferences updated successfully');
  };

  const updateSettings = async (updates: Partial<CustomSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));

    try {
      if (isBackendConnected) {
        await api.updateCustomSettings(updates);
      }
    } catch {}

    toast.success('CRM settings updated');
  };

  const resetToDefaultData = () => {
    setLeads(initialLeads);
    setTasks(initialTasks);
    setOutreach(initialOutreach);
    setNotes(initialNotes);
    setAppointments(initialAppointments);
    setActivities(initialActivities);
    setProfile(initialProfile);
    setSettings(initialSettings);
    toast.info('CRM reset to demo sample data');
  };

  return (
    <CRMContext.Provider value={{
      leads,
      tasks,
      outreach,
      notes,
      appointments,
      activities,
      profile,
      settings,
      theme,
      isBackendConnected,
      toggleTheme,
      addLead,
      updateLead,
      deleteLead,
      bulkUpdateStage,
      bulkDelete,
      getLead,
      logOutreach,
      markOutreachOpened,
      markOutreachReplied,
      markLeadInterested,
      addTask,
      toggleTask,
      deleteTask,
      addNote,
      deleteNote,
      addAppointment,
      updateAppointment,
      importLeads,
      exportLeadsCSV,
      updateProfile,
      updateSettings,
      resetToDefaultData
    }}>
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error('useCRM must be used within a CRMProvider');
  }
  return context;
};
