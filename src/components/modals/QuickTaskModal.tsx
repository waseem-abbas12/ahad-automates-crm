import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { useCRM } from '../../context/CRMContext';
import { TaskType, TaskPriority } from '../../types/crm';
import { Calendar, CheckSquare } from 'lucide-react';

interface QuickTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultLeadId?: string;
}

export const QuickTaskModal: React.FC<QuickTaskModalProps> = ({ isOpen, onClose, defaultLeadId }) => {
  const { addTask, leads, settings } = useCRM();

  const [title, setTitle] = useState('');
  const [leadId, setLeadId] = useState(defaultLeadId || '');
  const [taskType, setTaskType] = useState<TaskType>('Follow-up');
  const [priority, setPriority] = useState<TaskPriority>('Medium');
  const [dueDate, setDueDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const matchedLead = leads.find(l => l.id === leadId);

    addTask({
      title,
      lead_id: leadId || undefined,
      lead_name: matchedLead?.business_name,
      task_type: taskType,
      priority,
      due_date: new Date(dueDate).toISOString(),
      status: 'Pending'
    });

    onClose();
    setTitle('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Schedule Task"
      subtitle="Create a reminder or follow-up assignment"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-foreground mb-1">
            Task Description <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Call back Dr. Marcus regarding clinic demo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-background border border-input rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-foreground mb-1">Related Lead (Optional)</label>
          <select
            value={leadId}
            onChange={(e) => setLeadId(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-background border border-input rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary"
          >
            <option value="">(None - General Task)</option>
            {leads.map((l) => (
              <option key={l.id} value={l.id}>{l.business_name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-foreground mb-1">Task Type</label>
            <select
              value={taskType}
              onChange={(e) => setTaskType(e.target.value as TaskType)}
              className="w-full px-3 py-2 text-sm bg-background border border-input rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary"
            >
              {settings.taskTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-foreground mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className="w-full px-3 py-2 text-sm bg-background border border-input rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-foreground mb-1">Due Date</label>
          <input
            type="date"
            required
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-background border border-input rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary"
          />
        </div>

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
            className="px-5 py-2 text-sm font-semibold rounded-xl gradient-primary text-white shadow-md hover:opacity-95 transition-all cursor-pointer"
          >
            Schedule
          </button>
        </div>
      </form>
    </Modal>
  );
};
