# Wobb Frontend Assignment

A starter influencer search application built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. This project is intentionally left in a rough-but-working state for candidates to improve.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## What's Included

- **Search / Dashboard** — filter influencers by platform (Instagram, YouTube, TikTok) and search by username or full name
- **Profile Details** — click a profile to view extended data loaded from individual JSON files
- **Routing** — `react-router-dom` with `/` (search) and `/profile/:username` (details)

Sample data lives in:

- `src/assets/data/search/` — platform search results (10 profiles each)
- `src/assets/data/profiles/` — detailed profile JSON per username

## How to Submit

1. **Download or clone** this starter project to your machine.
2. **Create a new repository** on your own GitHub account. Do not fork the original assignment repo — push your work to a repo you own.
3. Complete the tasks below and push your changes to that repository.
4. **Share the public GitHub repository URL** with us as your submission.

### Deadline (strict)

- **Due:** **2 July 2026, 2:00 PM IST** (Indian Standard Time, UTC+5:30)
- **Any git commits made after this deadline will disqualify your submission.** We will only consider the repository state as of the deadline; late commits will not be reviewed.
- Make sure your final work is pushed **before** the cutoff.

## AI Usage

You may use any AI tools (Cursor, ChatGPT, Claude, GitHub Copilot, etc.). We are evaluating your final solution and engineering decisions.

## Your Tasks

Complete the following as part of your submission:

1. **Find and fix all bugs and quality issues** — the codebase contains intentional bugs and quality issues. Identify and resolve them.

2. **Completely redesign the UI/UX** — replace the basic layout with a polished, modern interface. Focus on usability, visual hierarchy, and delight.

3. **Replace React Context with Zustand** — when you implement state management for the selected list, use [Zustand](https://github.com/pmndrs/zustand) instead of React Context.

4. **Implement "Select profile & Add to List"** — the disabled "Add to List" button is a stub. Build the full feature:
   - Select / add profiles to a persistent list
   - View and manage the selected list
   - Handle duplicates appropriately

5. **Improve code quality and project structure** — refactor as needed, add proper types, and follow React best practices.

6. **Optimize performance** — apply sensible optimizations where appropriate.

7. **Use any libraries you need** — you are not limited to the current stack. Choose tools that help you deliver a great result (UI kits, state managers, testing libraries, etc.).

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start development server |
| `npm run build`| Production build         |
| `npm run lint` | Run ESLint               |

## Submission Notes

- Document any assumptions or trade-offs in your README
- Ensure `npm run build` passes before submitting
- Focus on demonstrating your judgment — not every possible feature needs to be built, but the core assignment items should be addressed thoughtfully
- Double-check that your repo is public (or that we have access) and that the link is included in your submission
- Please make meaningful commits throughout your work. We may review your commit history.
- **Bonus:** Deploying the app (e.g. Vercel, Netlify, GitHub Pages) is optional but will be considered a plus — include the live URL in your submission if you do

Good luck!

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
