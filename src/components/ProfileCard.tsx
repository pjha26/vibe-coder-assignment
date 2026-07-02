import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { formatFollowers } from "@/utils/formatters";
import { VerifiedBadge } from "./VerifiedBadge";
import { useShortlistStore } from "@/store/useShortlistStore";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
  onProfileClick?: (username: string) => void;
}



export function ProfileCard({
  profile,
  platform,
  searchQuery,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const isShortlisted = useShortlistStore((state) => state.isShortlisted(profile.user_id));
  const toggleProfile = useShortlistStore((state) => state.toggleProfile);

  const handleClick = () => {
    if (onProfileClick) onProfileClick(profile.username);
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="flex items-center gap-3 p-3 border border-gray-300 mb-2 cursor-pointer hover:bg-gray-50 w-full max-w-[700px]"
      data-search={searchQuery}
    >
      <img src={profile.picture} alt={`${profile.username} profile picture`} className="w-12 h-12 rounded-full" />
      <div className="text-left flex-1">
        <div className="font-bold">
          @{profile.username}
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm text-gray-600">{profile.fullname}</div>
        <div className="text-sm">{formatFollowers(profile.followers)} followers</div>
      </div>

      <button
        className={`px-3 py-1 text-sm rounded ${
          isShortlisted ? "bg-red-100 text-red-600" : "bg-blue-600 text-white"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          toggleProfile(profile);
        }}
      >
        {isShortlisted ? "Remove from List" : "Add to List"}
      </button>
    </div>
  );
}
