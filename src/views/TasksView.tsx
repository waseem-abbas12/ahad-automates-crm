import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import { 
  Plus, 
  Trash2, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
} from 'lucide-react';
import { QuickTaskModal } from '../components/modals/QuickTaskModal';

interface TasksViewProps {
  onNavigateToLead: (leadId: string) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({ onNavigateToLead }) => {
  const { tasks, toggleTask, deleteTask } = useCRM();

  const [activeTab, setActiveTab] = useState<'open' | 'overdue' | 'today' | 'completed'>('open');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  const overdueTasks = tasks.filter((t: any) => t.status === 'Pending' && new Date(t.due_date) < new Date(todayStr));
  const todayTasks = tasks.filter((t: any) => t.status === 'Pending' && t.due_date.startsWith(todayStr));
  const openTasks = tasks.filter((t: any) => t.status === 'Pending');
  const completedTasks = tasks.filter((t: any) => t.status === 'Completed');

  const getFilteredTasks = () => {
    switch (activeTab) {
      case 'overdue': return overdueTasks;
      case 'today': return todayTasks;
      case 'completed': return completedTasks;
      default: return openTasks;
    }
  };

  const displayedTasks = getFilteredTasks();

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Tasks</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage your daily calls, follow-ups, demos, and critical to-do items.
          </p>
        </div>

        <button
          onClick={() => setIsTaskModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl gradient-primary text-white shadow-md hover:opacity-95 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-border pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('open')}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'open'
              ? 'bg-primary/10 text-primary font-semibold border border-primary/20'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
        >
          <span>Open Tasks</span>
          <span className="px-1.5 py-0.2 rounded-full text-xs bg-muted text-muted-foreground font-semibold">
            {openTasks.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('overdue')}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'overdue'
              ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold border border-rose-500/20'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
          <span>Overdue</span>
          {overdueTasks.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-xs bg-rose-500/10 text-rose-600 font-semibold">
              {overdueTasks.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('today')}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'today'
              ? 'bg-primary/10 text-primary font-semibold border border-primary/20'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
        >
          <span>Due Today</span>
          <span className="px-1.5 py-0.2 rounded-full text-xs bg-muted text-muted-foreground font-semibold">
            {todayTasks.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'completed'
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>Completed</span>
          <span className="px-1.5 py-0.2 rounded-full text-xs bg-muted text-muted-foreground font-semibold">
            {completedTasks.length}
          </span>
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-2.5">
        {displayedTasks.length === 0 ? (
          <div className="p-12 rounded-2xl bg-card border border-border text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto opacity-80" />
            <h3 className="text-sm font-semibold text-foreground">No tasks in this category!</h3>
            <p className="text-xs text-muted-foreground">All items have been completed or scheduled accordingly.</p>
          </div>
        ) : (
          displayedTasks.map((task: any) => {
            const isOverdue = task.status === 'Pending' && new Date(task.due_date) < new Date(todayStr);

            return (
              <div
                key={task.id}
                className={`p-4 rounded-2xl bg-card border transition-all flex items-center justify-between gap-4 shadow-xs ${
                  isOverdue ? 'border-rose-500/40 bg-rose-500/5' : 'border-border hover:border-primary/40'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <input
                    type="checkbox"
                    checked={task.status === 'Completed'}
                    onChange={() => toggleTask(task.id)}
                    className="w-5 h-5 rounded-md text-primary border-input focus:ring-primary cursor-pointer shrink-0"
                  />

                  <div className="space-y-0.5 min-w-0">
                    <p className={`text-sm font-semibold truncate ${task.status === 'Completed' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {task.title}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                      {task.lead_name && (
                        <button
                          onClick={() => task.lead_id && onNavigateToLead(task.lead_id)}
                          className="text-primary hover:underline font-medium truncate max-w-[200px]"
                        >
                          {task.lead_name}
                        </button>
                      )}

                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span className={isOverdue ? 'text-rose-600 dark:text-rose-400 font-semibold' : ''}>
                          {new Date(task.due_date).toLocaleDateString()}
                        </span>
                      </span>

                      <span className="px-2 py-0.5 rounded bg-muted text-[11px] font-medium">
                        {task.task_type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                    task.priority === 'High'
                      ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                      : task.priority === 'Medium'
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                      : 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20'
                  }`}>
                    {task.priority}
                  </span>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                    title="Delete task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <QuickTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
      />
    </div>
  );
};
