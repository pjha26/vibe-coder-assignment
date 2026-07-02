
import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";

interface PlatformTabsProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
}

export function PlatformTabs({ selected, onChange }: PlatformTabsProps) {
  return (
    <div className="flex gap-2 flex-wrap mb-8">
      {PLATFORMS.map((p) => {
        const isSelected = selected === p;
        return (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className={`px-4 py-2 border rounded-full text-sm font-medium transition-all ${
              isSelected
                ? "bg-scout-violet border-scout-violet text-white shadow-[0_0_15px_rgba(167,139,250,0.3)]"
                : "bg-transparent border-scout-border text-scout-ink-muted hover:bg-scout-surface-high hover:text-scout-ink"
            }`}
          >
            {getPlatformLabel(p)}
          </button>
        );
      })}
    </div>
  );
}
