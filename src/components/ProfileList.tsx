import { memo } from "react";
import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";


interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;

}

export const ProfileList = memo(function ProfileList({
  profiles,
  platform,

}: ProfileListProps) {
  if (profiles.length === 0) {
    return (
      <div className="py-20 text-center text-scout-ink-muted">
        <p className="font-sans text-lg">No profiles found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.user_id}
          profile={profile}
          platform={platform}

        />
      ))}
    </div>
  );
});
