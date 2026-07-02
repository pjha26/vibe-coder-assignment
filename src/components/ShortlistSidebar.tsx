import { useShortlistStore } from "@/store/useShortlistStore";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Trash2 } from "lucide-react";

interface ShortlistSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShortlistSidebar({ isOpen, onClose }: ShortlistSidebarProps) {
  const shortlisted = useShortlistStore((state) => state.shortlisted);
  const removeProfile = useShortlistStore((state) => state.removeProfile);
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />
          
          {/* Sidebar Drawer */}
          <motion.aside
            initial={prefersReducedMotion ? { x: "100%" } : { x: "100%" }}
            animate={{ x: 0 }}
            exit={prefersReducedMotion ? { x: "100%" } : { x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-screen z-50 flex flex-col p-6 w-full max-w-[400px] border-l border-scout-border bg-scout-surface shadow-2xl"
          >
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-scout-border">
              <div>
                <h2 className="font-serif text-2xl font-bold text-scout-ink leading-tight">Dossier Console</h2>
                <p className="font-sans text-sm text-scout-ink-muted mt-1">Agency Portfolio</p>
              </div>
              <button 
                onClick={onClose} 
                className="w-10 h-10 rounded-full border border-scout-border flex items-center justify-center text-scout-ink-muted hover:text-scout-ink hover:bg-scout-surface-high transition-colors focus-visible:ring-2 focus-visible:ring-scout-violet outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {shortlisted.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                <p className="font-mono text-sm uppercase tracking-widest text-scout-ink-muted mb-2">Empty Dossier</p>
                <p className="font-sans text-sm text-scout-ink-muted">No candidates selected.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4 flex-1 overflow-y-auto pr-2">
                <div className="font-mono text-xs uppercase tracking-widest text-scout-ink-muted mb-2">Shortlisted Candidates</div>
                {shortlisted.map((profile) => (
                  <div key={profile.user_id} className="flex items-center gap-4 bg-scout-bg border border-scout-border p-3 rounded group hover:border-scout-ink-muted transition-colors">
                    <img src={profile.picture} alt={`${profile.username} profile`} className="w-12 h-12 rounded object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                    <div className="flex-1 min-w-0">
                      <div className="font-serif font-bold text-lg truncate text-scout-ink">{profile.fullname || profile.username}</div>
                      <div className="font-mono text-[10px] text-scout-violet uppercase truncate">@{profile.username}</div>
                    </div>
                    <button 
                      onClick={() => removeProfile(profile.user_id)}
                      className="w-8 h-8 flex items-center justify-center text-scout-ink-muted hover:text-red-400 hover:bg-red-400/10 rounded transition-colors focus-visible:ring-2 focus-visible:ring-red-400 outline-none"
                      aria-label="Remove candidate"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-scout-border">
              <button className="w-full bg-scout-violet text-white font-sans text-sm font-medium py-4 rounded hover:bg-[#b096fa] transition-colors shadow-[0_0_20px_rgba(167,139,250,0.2)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-scout-surface focus-visible:ring-scout-violet outline-none disabled:opacity-50 disabled:cursor-not-allowed" disabled={shortlisted.length === 0}>
                Export Shortlist ({shortlisted.length})
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
