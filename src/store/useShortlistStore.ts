import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfileSummary } from "@/types";

interface ShortlistState {
  shortlisted: UserProfileSummary[];
  isShortlisted: (userId: string) => boolean;
  addProfile: (profile: UserProfileSummary) => void;
  removeProfile: (userId: string) => void;
  toggleProfile: (profile: UserProfileSummary) => void;
  clear: () => void;
}

export const useShortlistStore = create<ShortlistState>()(
  persist(
    (set, get) => ({
      shortlisted: [],
      isShortlisted: (userId: string) =>
        get().shortlisted.some((p) => p.user_id === userId),
      addProfile: (profile: UserProfileSummary) =>
        set((state) => {
          if (state.shortlisted.some((p) => p.user_id === profile.user_id)) {
            return state;
          }
          return { shortlisted: [...state.shortlisted, profile] };
        }),
      removeProfile: (userId: string) =>
        set((state) => ({
          shortlisted: state.shortlisted.filter((p) => p.user_id !== userId),
        })),
      toggleProfile: (profile: UserProfileSummary) => {
        if (get().isShortlisted(profile.user_id)) {
          get().removeProfile(profile.user_id);
        } else {
          get().addProfile(profile);
        }
      },
      clear: () => set({ shortlisted: [] }),
    }),
    {
      name: "shortlist-storage",
    }
  )
);
