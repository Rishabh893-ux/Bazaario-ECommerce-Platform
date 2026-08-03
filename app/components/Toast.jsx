"use client";

import { createContext, useCallback, useContext, useState, useEffect } from "react";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";

const ToastContext = createContext(null);

const ICONS = { success: CheckCircle2, error: XCircle, info: Info };
const STYLES = {
  success: "bg-card border-green-200 text-green-800 shadow-green-900/5",
  error: "bg-card border-red-200 text-red-700 shadow-red-900/5",
  info: "bg-card border-brand-light text-ink shadow-card-hover",
};

const TOAST_DURATION = 4000;

function ToastItem({ toast, onDismiss }) {
  const [isLeaving, setIsLeaving] = useState(false);
  const Icon = ICONS[toast.type];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(() => onDismiss(toast.id), 300); // Wait for exit animation
    }, TOAST_DURATION);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const handleManualDismiss = () => {
    setIsLeaving(true);
    setTimeout(() => onDismiss(toast.id), 300);
  };

  return (
    <div
      className={`relative overflow-hidden flex items-start gap-3 px-4 py-3.5 rounded-2xl border shadow-lg w-80 pointer-events-auto
        ${STYLES[toast.type]}
        ${isLeaving ? 'animate-toast-out' : 'animate-toast-in'}
      `}
    >
      <Icon size={18} className="shrink-0 mt-0.5" />
      <div className="flex-1 text-sm font-semibold pr-4">
        {toast.message}
      </div>
      <button 
        onClick={handleManualDismiss}
        className="absolute top-3 right-3 text-current opacity-40 hover:opacity-100 transition-opacity p-0.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10"
      >
        <X size={14} strokeWidth={3} />
      </button>
      
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-current opacity-15 animate-progress-shrink" style={{ animationDuration: `${TOAST_DURATION}ms` }} />
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success") => {
    const id = crypto.randomUUID();
    setToasts((t) => [...t, { id, message, type }]);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((t) => t.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={dismissToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
