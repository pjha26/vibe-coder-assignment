import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, ProfileDetailResponse } from "@/types";
import { formatEngagementRate, formatFollowers } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { useShortlistStore } from "@/store/useShortlistStore";
import { StatTag } from "@/components/StatTag";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Check, Plus, ExternalLink } from "lucide-react";

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "unknown";
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(null);
  const [loaded, setLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const isShortlisted = useShortlistStore((state) =>
    profileData ? state.isShortlisted(profileData.data.user_profile.user_id) : false
  );
  const toggleProfile = useShortlistStore((state) => state.toggleProfile);

  useEffect(() => {
    if (!username) return;

    loadProfileByUsername(username).then((data) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  if (!username) {
    return (
      <Layout>
        <div className="py-20 text-center text-scout-ink-muted">Invalid profile</div>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout title="Dossier">
        <div className="py-20 text-center text-scout-ink-muted font-mono uppercase tracking-widest text-sm">
          Accessing file...
        </div>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout title="Error">
        <div className="py-20 text-center">
          <p className="text-red-500 mb-6">Could not load profile details for {username}</p>
          <Link to="/" className="text-scout-violet hover:underline flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Search
          </Link>
        </div>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;

  return (
    <Layout title={user.fullname || username}>
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-scout-ink-muted hover:text-scout-ink mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Return to Gallery
      </Link>

      <motion.div 
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex flex-col md:flex-row gap-12 items-start text-left">
          <div className="w-full md:w-1/3 flex-shrink-0">
            <div className="aspect-square w-full bg-scout-surface-high overflow-hidden border border-scout-border p-1">
              <img
                src={user.picture}
                alt={`${user.username} profile`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale opacity-90"
              />
            </div>
          </div>
          
          <div className="flex-1 w-full flex flex-col">
            <div className="mb-6 pb-6 border-b border-scout-border flex justify-between items-start gap-4">
              <div>
                <h2 className="text-3xl font-serif font-bold flex items-center gap-3">
                  @{user.username}
                  <VerifiedBadge verified={user.is_verified} />
                </h2>
                <p className="text-sm font-mono text-scout-ink-muted mt-2 uppercase tracking-widest">
                  Platform: {platform}
                </p>
              </div>

              <motion.button
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                onClick={() => toggleProfile(user)}
                className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-scout-bg focus-visible:ring-scout-violet outline-none ${
                  isShortlisted 
                    ? "bg-scout-surface border border-scout-border text-scout-ink-muted hover:text-scout-ink" 
                    : "bg-scout-violet text-white shadow-[0_0_20px_rgba(167,139,250,0.2)] hover:bg-[#b096fa]"
                }`}
              >
                {isShortlisted ? (
                  <>
                    <Check className="w-4 h-4" />
                    Shortlisted
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Add to Shortlist
                  </>
                )}
              </motion.button>
            </div>

            {user.description && (
              <div className="mb-8 pb-8 border-b border-scout-border">
                <p className="text-base text-scout-ink leading-relaxed max-w-2xl">
                  {user.description}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              <StatTag label="Followers" value={formatFollowers(user.followers)} highlight />
              <StatTag label="Engagement" value={formatEngagementRate(user.engagement_rate)} />
              {user.posts_count !== undefined && (
                <StatTag label="Posts" value={user.posts_count} />
              )}
              {user.avg_likes !== undefined && (
                <StatTag label="Avg Likes" value={formatFollowers(user.avg_likes)} />
              )}
              {user.avg_comments !== undefined && (
                <StatTag label="Avg Comments" value={formatFollowers(user.avg_comments)} />
              )}
              {user.avg_views !== undefined && user.avg_views > 0 && (
                <StatTag label="Avg Views" value={formatFollowers(user.avg_views)} />
              )}
              {user.engagements !== undefined && (
                <StatTag label="Total Eng" value={formatFollowers(user.engagements)} />
              )}
            </div>

            {user.url && (
              <a
                href={user.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-scout-ink text-scout-ink hover:bg-scout-ink hover:text-scout-bg transition-colors font-mono text-sm uppercase tracking-wider self-start rounded-full"
              >
                Open External Profile <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
