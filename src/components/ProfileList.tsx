import { memo } from "react";
import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";
import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};


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
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.user_id}
          profile={profile}
          platform={platform}
          variants={itemVariants}
        />
      ))}
    </motion.div>
  );
});
