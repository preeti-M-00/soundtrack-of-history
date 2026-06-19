# 🎵 Soundtrack of History

An immersive web experience that lets you travel through 100 years of human history — from the Roaring Twenties to the modern day — by simply dragging a timeline.

## ✨ What it does

Every year you land on transforms the entire page — the background image, color palette, typography, and music all shift to match that decade. Drag from 1920 to 2024 and watch the world change around you.

- 🎨 **Era-morphing UI** — real archival photos crossfade per decade, with unique fonts, colors, and textures for each era
- 💿 **Spinning vinyl player** — click to hear the iconic song of that decade play
- 🌍 **Live historical data** — real-time population and life expectancy pulled from the World Bank API, switchable by country (Global, US, UK, India)
- 📰 **Floating news cards** — major historical events scattered around the screen, with country-specific events for the US, UK, and India
- 🎂 **"My Birthday" universe** — enter your exact birthdate to reveal the moon phase, zodiac constellation, day of the week, season, and a real historical headline from that day

## 🛠️ Built With

- **React** + Vite
- **Framer Motion** for animations
- **Tailwind CSS** for styling
- **Unsplash** — real archival and aesthetic photos for each era's background
- **World Bank Open Data API** — population & life expectancy
- **MuffinLabs Wikipedia API** — historical events by date, used in the birthday feature
- **YouTube embeds** — era soundtrack playback via the vinyl player

## 🚀 Running Locally

Clone the repository:

```bash
git clone https://github.com/preeti-M-00/soundtrack-of-history.git
cd soundtrack-of-history
npm install
```

Then start the dev server:

```bash
npm run dev
```

## 📐 Architecture

The entire app is driven by a single `year` state in `App.jsx`. Every component — background, music, stats, news cards — reads from this one source of truth, keeping the data flow predictable and easy to reason about.

```
year state changes
        ↓
useEraTheme(year) → returns the matching era theme
        ↓
   ┌────┴─────────┬──────────┬───────────┐
   ↓               ↓          ↓           ↓
EraBackground   MusicPlayer  StatsPanel  NewsCards
(images/colors)  (vinyl+yt)  (World Bank)(country events)
```

## 🎯 What I learned

- Debouncing API calls to avoid hammering free-tier rate limits while scrubbing a continuous slider
- Designing graceful fallbacks — every API call has hardcoded backup data so the UI never breaks or shows empty states
- Coordinating multiple independent animation timelines (Framer Motion) without jank
- Working within the real constraints of free APIs (e.g. no free service offers historically accurate weekly music charts) and choosing pragmatic, hardcoded workarounds over over-engineering

## 📄 License

MIT
