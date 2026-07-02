
import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder = "Search..." }: SearchInputProps) {
  return (
    <div className="flex items-center bg-scout-surface-high border border-scout-border rounded px-4 py-2 w-full max-w-md group hover:border-scout-ink-muted transition-colors">
      <Search className="text-scout-ink-muted w-5 h-5 mr-2" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-transparent border-none focus:ring-0 focus:outline-none p-0 w-full text-scout-ink placeholder:text-scout-ink-muted font-sans text-sm"
      />
    </div>
  );
}
