const API_BASE_URL = 'http://127.0.0.1:5000/api';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('ahad_crm_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export const api = {
  // Health
  checkHealth: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      return res.ok;
    } catch {
      return false;
    }
  },

  // Auth
  login: async (email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Login failed');
    return res.json();
  },

  register: async (data: { email: string; password: string; fullName: string; companyName?: string }) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Registration failed');
    return res.json();
  },

  // Leads
  getLeads: async () => {
    const res = await fetch(`${API_BASE_URL}/leads`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch leads');
    return res.json();
  },

  createLead: async (leadData: any) => {
    const res = await fetch(`${API_BASE_URL}/leads`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(leadData)
    });
    if (!res.ok) throw new Error('Failed to create lead');
    return res.json();
  },

  updateLead: async (id: string, updates: any) => {
    const res = await fetch(`${API_BASE_URL}/leads/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update lead');
    return res.json();
  },

  deleteLead: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/leads/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete lead');
    return res.json();
  },

  bulkUpdateStage: async (ids: string[], stage: string) => {
    const res = await fetch(`${API_BASE_URL}/leads/bulk-stage`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ ids, stage })
    });
    if (!res.ok) throw new Error('Failed to bulk update stage');
    return res.json();
  },

  bulkDelete: async (ids: string[]) => {
    const res = await fetch(`${API_BASE_URL}/leads/bulk-delete`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ ids })
    });
    if (!res.ok) throw new Error('Failed to bulk delete');
    return res.json();
  },

  importLeads: async (leads: any[]) => {
    const res = await fetch(`${API_BASE_URL}/leads/import`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ leads })
    });
    if (!res.ok) throw new Error('Failed to import leads');
    return res.json();
  },

  // Outreach
  getOutreach: async () => {
    const res = await fetch(`${API_BASE_URL}/outreach`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch outreach');
    return res.json();
  },

  logOutreach: async (params: any) => {
    const res = await fetch(`${API_BASE_URL}/outreach`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(params)
    });
    if (!res.ok) throw new Error('Failed to log outreach');
    return res.json();
  },

  markOutreachOpened: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/outreach/${id}/opened`, {
      method: 'PATCH',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  markOutreachReplied: async (id: string, replyNotes?: string) => {
    const res = await fetch(`${API_BASE_URL}/outreach/${id}/replied`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ replyNotes })
    });
    return res.json();
  },

  markLeadInterested: async (leadId: string) => {
    const res = await fetch(`${API_BASE_URL}/outreach/interested`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ leadId })
    });
    return res.json();
  },

  // Tasks
  getTasks: async () => {
    const res = await fetch(`${API_BASE_URL}/tasks`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error('Failed to fetch tasks');
    return res.json();
  },

  createTask: async (task: any) => {
    const res = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(task)
    });
    if (!res.ok) throw new Error('Failed to create task');
    return res.json();
  },

  toggleTask: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}/toggle`, {
      method: 'PATCH',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  deleteTask: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Notes
  getNotes: async () => {
    const res = await fetch(`${API_BASE_URL}/notes`, { headers: getAuthHeaders() });
    return res.json();
  },

  createNote: async (note: any) => {
    const res = await fetch(`${API_BASE_URL}/notes`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(note)
    });
    return res.json();
  },

  deleteNote: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Appointments
  getAppointments: async () => {
    const res = await fetch(`${API_BASE_URL}/appointments`, { headers: getAuthHeaders() });
    return res.json();
  },

  createAppointment: async (appt: any) => {
    const res = await fetch(`${API_BASE_URL}/appointments`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(appt)
    });
    return res.json();
  },

  // Settings
  getSettings: async () => {
    const res = await fetch(`${API_BASE_URL}/settings`, { headers: getAuthHeaders() });
    return res.json();
  },

  updateProfile: async (profile: any) => {
    const res = await fetch(`${API_BASE_URL}/settings/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profile)
    });
    return res.json();
  },

  updateCustomSettings: async (settings: any) => {
    const res = await fetch(`${API_BASE_URL}/settings/custom`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(settings)
    });
    return res.json();
  },

  // Analytics
  getAnalytics: async () => {
    const res = await fetch(`${API_BASE_URL}/analytics`, { headers: getAuthHeaders() });
    return res.json();
  },

  getActivities: async () => {
    const res = await fetch(`${API_BASE_URL}/analytics/activities`, { headers: getAuthHeaders() });
    return res.json();
  }
};
