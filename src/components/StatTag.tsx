

interface StatTagProps {
  label: string;
  value: string | number;
  highlight?: boolean;
}

export function StatTag({ label, value, highlight = false }: StatTagProps) {
  return (
    <div className="flex flex-col border border-scout-border p-2 text-center rounded">
      <span className="font-sans text-[10px] uppercase text-scout-ink-muted mb-1">
        {label}
      </span>
      <span
        className={`font-mono text-[20px] font-medium leading-none tracking-tight ${
          highlight ? 'text-scout-violet' : 'text-scout-ink'
        }`}
      >
        {value}
      </span>
    </div>
  );
}
