import { useState, useMemo } from "react";
import type { Platform } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformTabs } from "@/components/PlatformTabs";
import { SearchInput } from "@/components/SearchInput";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [searchQuery, setSearchQuery] = useState("");

  const allProfiles = useMemo(() => extractProfiles(platform), [platform]);
  const filtered = useMemo(
    () => filterProfiles(allProfiles, searchQuery),
    [allProfiles, searchQuery]
  );

  return (
    <Layout title="Curated Discoveries">
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <p className="font-sans text-base text-scout-ink-muted">
            High-engagement creators trending in their niche.
          </p>
        </div>
        <div className="w-full md:w-auto">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search creators, niches..."
          />
        </div>
      </div>

      <PlatformTabs
        selected={platform}
        onChange={(p) => {
          setPlatform(p);
          setSearchQuery("");
        }}
      />

      <div className="mb-6 border-b border-scout-border pb-2 flex justify-between items-end">
        <p className="text-xs text-scout-ink-muted uppercase tracking-widest font-mono">
          Showing {filtered.length} Profiles
        </p>
      </div>

      <ProfileList
        profiles={filtered}
        platform={platform}
        searchQuery={searchQuery}
      />
    </Layout>
  );
}
