import React, { useState } from 'react';
import { Sparkles, Mail, Lock, User, Building, ArrowRight, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

interface AuthViewProps {
  onLoginSuccess: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onLoginSuccess }) => {
  const [tab, setTab] = useState<'signin' | 'signup' | 'reset'>('signin');

  // Sign In state
  const [email, setEmail] = useState('demo@ahadautomates.com');
  const [password, setPassword] = useState('password123');

  // Sign Up state
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  // Reset state
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }
    toast.success('Welcome back, Ahad Automates!');
    onLoginSuccess();
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupEmail || !signupPassword) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Account created successfully!');
    onLoginSuccess();
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) {
      toast.error('Please enter your email address');
      return;
    }
    setResetSent(true);
    toast.success('Reset link dispatched to your inbox');
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-3xl shadow-xl overflow-hidden p-6 sm:p-8 space-y-6 animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center text-white mx-auto shadow-md shadow-primary/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center justify-center gap-1.5 mt-2">
              <h1 className="text-xl font-extrabold text-foreground tracking-tight">Ahad Automates</h1>
              <span className="px-1.5 py-0.2 text-[10px] font-semibold uppercase rounded bg-primary/10 text-primary border border-primary/20">
                CRM
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">High-velocity outbound pipeline</p>
          </div>
        </div>

        {/* Demo Fast Login Banner */}
        <div 
          onClick={onLoginSuccess}
          className="p-3 rounded-2xl bg-primary/10 border border-primary/20 hover:bg-primary/15 transition-colors cursor-pointer flex items-center justify-between group"
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-primary" />
            <div className="text-left">
              <p className="text-xs font-bold text-primary">Explore Demo Account</p>
              <p className="text-[11px] text-muted-foreground">Pre-loaded with sample leads and workflows</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-0.5 transition-transform" />
        </div>

        {tab === 'reset' ? (
          /* Password Reset Panel */
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-sm font-bold text-foreground">Reset Password</h3>
              <p className="text-xs text-muted-foreground mt-0.5">We will send a password reset link to your email</p>
            </div>

            {resetSent ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                  Password reset link has been sent to {resetEmail}
                </p>
                <button
                  onClick={() => setTab('signin')}
                  className="text-xs font-semibold text-primary underline mt-2 block mx-auto cursor-pointer"
                >
                  Return to sign in
                </button>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Account Email</label>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-background border border-input rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 text-sm font-semibold rounded-xl gradient-primary text-white shadow-md hover:opacity-95 transition-all cursor-pointer"
                >
                  Send Reset Link
                </button>

                <button
                  type="button"
                  onClick={() => setTab('signin')}
                  className="w-full text-xs text-muted-foreground hover:text-foreground text-center cursor-pointer"
                >
                  Back to Sign In
                </button>
              </form>
            )}
          </div>
        ) : (
          /* Sign In / Sign Up Tabs */
          <div className="space-y-4">
            {/* Tab switch pills */}
            <div className="grid grid-cols-2 p-1 bg-muted rounded-xl border border-border">
              <button
                type="button"
                onClick={() => setTab('signin')}
                className={`py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  tab === 'signin' ? 'bg-card text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setTab('signup')}
                className={`py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  tab === 'signup' ? 'bg-card text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Sign Up
              </button>
            </div>

            {tab === 'signin' ? (
              /* Sign In Form */
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-input rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-foreground">Password</label>
                    <button
                      type="button"
                      onClick={() => setTab('reset')}
                      className="text-xs text-primary hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-input rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 text-sm font-semibold rounded-xl gradient-primary text-white shadow-md hover:opacity-95 transition-all cursor-pointer"
                >
                  Sign In
                </button>
              </form>
            ) : (
              /* Sign Up Form */
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="John Miller"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-input rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Company / Agency Name</label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Acme Automations"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-input rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Work Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-input rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-input rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 text-sm font-semibold rounded-xl gradient-primary text-white shadow-md hover:opacity-95 transition-all cursor-pointer"
                >
                  Create Account
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
