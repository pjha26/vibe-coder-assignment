# Wobb Frontend Assignment

**🟢 Live Demo:** [https://vibe-coder-assignment-gilt.vercel.app/](https://vibe-coder-assignment-gilt.vercel.app/)

A highly optimized influencer search application built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.
Run `npm run test` to execute the unit test suite.

---

## Bonus Items Completed

- **Deployed Application:** The app is fully deployed to Vercel with proper React Router fallback rewrite rules.
- **Improved Accessibility:** Added missing `alt` attributes on all images, corrected a WCAG AA contrast failure, added focus-visible rings for keyboard navigation, and strictly respected system `prefers-reduced-motion` settings.
- **Animations & Micro-interactions:** Added highly optimized, hardware-accelerated layout transitions and drawer spring-animations.
- **Written Tests:** Set up Vitest and wrote focused unit tests covering the highest-risk business logic (Zustand state, data filtering, and formatting math).

## What I Changed

- **Fixed Critical Bugs:**
  - **Dependency conflict:** Removed `react-beautiful-dnd` as it was completely unused but broke a clean `npm install` due to React 19 peer dependency conflicts.
  - **Layout & Accessibility:** Fixed a hardcoded `w-[700px]` fixed-width card that broke on narrower screens, making it fully responsive. Added missing `alt` attributes to all avatars.
  - **Broken images:** Resolved 403 Forbidden errors on YouTube profile pictures by correctly configuring `referrerPolicy="no-referrer"`.
  - **Data displaying incorrectly:** Fixed the "Engagements" stat which was incorrectly displaying the engagement *rate* a second time instead of the actual count. Also fixed a math error in the engagement rate formatter itself.
  - **Search logic:** Fixed case-sensitive username searches (making them consistent with case-insensitive fullname matches) and fixed a bug where whitespace-only queries incorrectly returned an empty array instead of all profiles.
- **Implemented Zustand Shortlist:** Replaced the non-functional React Context stub with a persistent (localStorage) Zustand store. It strictly prevents duplicate entries by `user_id` and wires up Add/Remove functionality across both the grid and the dedicated Shortlist Drawer.
- **Complete Visual Redesign:** Replaced the generic starter UI with a bespoke "Scout" (Dark Noir) design system, utilizing a cohesive token-based CSS variable approach.
- **Performance Optimizations:** 
  - Added strict `React.memo` boundaries to prevent massive DOM re-rendering cascades when typing in the search bar.
  - Eliminated `searchQuery` prop-drilling entirely.
  - Added `loading="lazy"` to all off-screen influencer avatars to improve initial paint time.
- **Testing Setup:** Integrated Vitest and JSDOM, writing test suites to guarantee the integrity of the core utility functions and state store.

## Libraries Added

- **`zustand`**: Chosen to implement persistent shortlist state management without the massive re-render penalties associated with React Context.
- **`framer-motion`**: Added for performant, hardware-accelerated animations (drawer slides, layout shifts) that compute outside the React render loop.
- **`lucide-react`**: Replaced heavy Material icon fonts with lightweight, tree-shakeable SVGs for a smaller bundle footprint.
- **`clsx`**: Used for clean, dynamic class name merging for conditional component styling.
- **`vitest`**: Selected as a highly performant, Vite-native testing framework that required zero complex configuration.
- **`@testing-library/react`**: Standard utility included for potential component rendering tests.

## Assumptions

- **Persistence:** Assumed `localStorage` persistence is sufficient for the Shortlist feature since there is no backend or database attached to the assignment.
- **Data Mutability:** Assumed the static JSON mock data files should remain read-only, meaning I should not attempt to implement "mutations" to the raw static data files.
- **Theme:** Assumed a forced dark-first theme best fit the intended "Noir" design direction, prioritizing it over a strict adherence to `prefers-color-scheme` (which is kept only as a secondary fallback).

## Trade-offs

- **Test Coverage Scope:** Deliberately scoped unit tests strictly to the highest-risk pure logic (the Zustand store, search filtering, and math formatting) rather than writing brittle UI/snapshot tests, prioritizing engineering value over raw coverage percentage.
- **Pagination/Infinite Scroll:** Opted out of implementing complex pagination for the search results, trading it for simplicity since the provided mock dataset is relatively small (10 profiles per platform).

## Remaining Improvements

- **E2E Testing:** With more time, I would add Playwright for end-to-end user flow testing to verify the actual UI interaction of adding a user to the shortlist drawer.
- **Advanced Filtering:** Add multi-faceted filters (e.g., filtering by exact follower ranges or engagement rate thresholds) beyond simple string matching.

## Engineering Decisions & Implementation Notes

### 1. Design System (Stitch MCP Integration)
The entire visual redesign ("Scout" / Dark Noir direction) was implemented by pulling raw design tokens, DOM structures, and component references directly from a designated **Stitch** design project via MCP. Rather than eyeballing a screenshot, the interface is built on precise, token-driven CSS variables. 

### 2. Theming & Accessibility
*   **Dark-First Theme:** The application abandons standard `prefers-color-scheme` reliance in favor of an explicitly dark-first default theme to match the intended "Noir" aesthetic, keeping a light theme as a fallback.
*   **WCAG Contrast Correction:** During implementation, the Stitch token `on-surface-variant` (`#4a4455`) against the background `#0F0F0F` resulted in an accessibility failure (approx. 2:1 contrast ratio). To preserve the intended violet-gray hue while ensuring legibility, this token was corrected to `#a8a2b1` (approx. 7.7:1), fully passing WCAG AA standards.
*   **Reduced Motion:** All layout-shifting animations respect `prefers-reduced-motion` at the system level.

### 3. State & Performance
*   **Zustand:** Replaced React Context with Zustand (using `persist` middleware to save to `localStorage`). Selectors are strictly primitive to prevent unnecessary re-renders.
*   **Render Optimization:** `searchQuery` prop-drilling was eliminated to prevent massive re-render cascades on keystrokes. Aggressive use of `React.memo` and `useCallback` ensures only the necessary components re-render during state changes.
*   **Image Lazy Loading:** Implemented `loading="lazy"` on all off-screen avatars to improve initial load performance. Added `referrerPolicy="no-referrer"` to resolve 403 Forbidden errors from YouTube CDNs.

### 4. New Dependencies
*   **Framer Motion:** Added to implement the complex layout interactions (e.g., spring slide-in for the Shortlist drawer, hardware-accelerated hover states on cards). Framer Motion was specifically chosen because it computes hover/focus states outside of React's render loop, avoiding expensive re-renders.
*   **Lucide React:** Replaced heavy icon fonts with tree-shakeable SVG icons for a smaller bundle footprint.
