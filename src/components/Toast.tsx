import { createContext, useCallback, useContext, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import styles from './Toast.module.css';

const ToastContext = createContext<(message: string) => void>(() => {});
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const show = useCallback((m: string) => {
    setMessage(m);
    setOpen(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(false), 2400);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div className={open ? `${styles.toast} ${styles.open}` : styles.toast} role="status" aria-live="polite">
        {message}
      </div>
    </ToastContext.Provider>
  );
}
