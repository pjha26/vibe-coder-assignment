import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import type { Platform, UserProfileSummary } from "@/types";
import { formatFollowers } from "@/utils/formatters";
import { VerifiedBadge } from "./VerifiedBadge";
import { useShortlistStore } from "@/store/useShortlistStore";
import { StatTag } from "./StatTag";
import { Plus, Check } from "lucide-react";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;

  onProfileClick?: (username: string) => void;
}

export const ProfileCard = memo(function ProfileCard({
  profile,
  platform,

  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const isShortlisted = useShortlistStore((state) => state.isShortlisted(profile.user_id));
  const toggleProfile = useShortlistStore((state) => state.toggleProfile);
  const prefersReducedMotion = useReducedMotion();

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
    <motion.div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}

      whileHover={prefersReducedMotion ? {} : { scale: 1.02, boxShadow: "0 10px 30px -10px rgba(167, 139, 250, 0.15)" }}
      whileFocus={prefersReducedMotion ? {} : { scale: 1.02, boxShadow: "0 10px 30px -10px rgba(167, 139, 250, 0.15)" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex flex-col bg-scout-surface border border-scout-border cursor-pointer rounded overflow-hidden group focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-scout-bg focus-visible:ring-scout-violet outline-none"
      style={{ borderBottom: "1px solid var(--scout-border)" }}
    >
      <div className="relative h-[400px] w-full overflow-hidden bg-scout-surface-high">
        <img 
          src={profile.picture} 
          alt={`${profile.username} profile picture`} 
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-focus:grayscale-0 group-focus:opacity-100 transition-all duration-500" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div className="flex-1 min-w-0 pr-4">
            <h3 className="font-serif text-2xl font-semibold text-white mb-1 flex items-center gap-2 truncate">
              {profile.fullname || profile.username}
              <VerifiedBadge verified={profile.is_verified} />
            </h3>
            <p className="font-mono text-[12px] text-scout-violet uppercase tracking-wider truncate">
              @{profile.username}
            </p>
          </div>
          
          <motion.button
            whileTap={prefersReducedMotion ? {} : { scale: 0.8 }}
            onClick={(e) => {
              e.stopPropagation();
              toggleProfile(profile);
            }}
            className={`flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-white outline-none ${
              isShortlisted 
                ? "bg-scout-green border-scout-green text-white" 
                : "border-white/40 text-white hover:bg-white/20"
            }`}
            aria-label={isShortlisted ? "Remove from List" : "Add to List"}
          >
            {isShortlisted ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>
      
      {/* Accent border fade-in on hover, handled via framer-motion but simpler to just use CSS group-hover for this specific border */}
      <div className="h-[2px] w-full bg-scout-border group-hover:bg-scout-violet group-focus:bg-scout-violet transition-colors duration-200"></div>

      <div className="p-4 grid grid-cols-2 gap-3 bg-scout-surface">
        <StatTag label="Followers" value={formatFollowers(profile.followers)} />
        {/* We mock engagement for cards since it's not strictly in UserProfileSummary but we want to match the 2-grid ledger */}
        <StatTag label="Platform" value={platform === 'instagram' ? 'IG' : platform === 'youtube' ? 'YT' : 'TT'} />
      </div>
    </motion.div>
  );
});
