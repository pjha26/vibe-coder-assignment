import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Bookmark } from "lucide-react";
import { useShortlistStore } from "@/store/useShortlistStore";
import { ShortlistSidebar } from "./ShortlistSidebar";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const shortlistCount = useShortlistStore((state) => state.shortlisted.length);

  return (
    <div className="min-h-screen flex flex-col bg-scout-bg text-scout-ink transition-colors duration-200">
      {/* TopNavBar */}
      <nav className="bg-scout-bg/90 backdrop-blur-md flex justify-between items-center w-full px-8 md:px-12 py-4 sticky top-0 z-40 border-b border-scout-border">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-serif text-3xl font-bold tracking-tighter text-scout-ink hover:opacity-80 transition-opacity">
            SCOUT
          </Link>
        </div>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="font-mono text-xs border border-scout-border px-4 py-2 hover:bg-scout-surface-high transition-colors flex items-center gap-2 rounded text-scout-ink focus-visible:ring-2 focus-visible:ring-scout-violet outline-none"
          >
            <Bookmark className="w-4 h-4" />
            Shortlist ({shortlistCount})
          </button>
        </div>
      </nav>

      <main className="flex-1 p-8 md:p-12 pb-24 max-w-[1600px] mx-auto w-full">
        {title && <h1 className="font-serif text-[32px] md:text-[48px] font-bold leading-[1.1] tracking-[-0.02em] mb-2">{title}</h1>}
        {children}
      </main>

      <ShortlistSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  );
}
