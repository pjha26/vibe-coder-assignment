import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
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
    <div className="p-4 min-h-screen">
      <header className="mb-6 border-b pb-4 flex justify-between items-start">
        <div>
          <Link to="/" className="text-xl font-semibold text-gray-900">
            Influencer Search
          </Link>
          {title && <h1 className="text-2xl mt-2">{title}</h1>}
        </div>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="bg-gray-100 px-3 py-2 rounded text-sm font-medium hover:bg-gray-200"
        >
          Shortlist: {shortlistCount}
        </button>
      </header>
      <main>{children}</main>
      <ShortlistSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  );
}
