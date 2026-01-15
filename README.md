# 🎂 Anousha, 24 — A Birthday Keepsake Website

A stunning, cinematic, private birthday website experience. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

---

## ✨ Features

- **Cinematic Envelope Reveal** — Opens like a real letter
- **5 Chapter Journey** — Cover → Gallery → 24 Drawers → Positivity Jar → Letter
- **Premium Aesthetic** — Old-money romance, editorial typography, film grain textures
- **Mobile-First** — Flawless iPhone experience
- **Interactive Elements** — Tap drawers, pick notes from a jar, find the easter egg
- **Optional Audio** — Background music toggle (default off)
- **Fully Customizable** — Single content file for all text, photos, and messages

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
open http://localhost:3000
```

---

## 📝 How to Customize

### All content is in one file: `/data/content.ts`

Open this file to edit:

| Section | What to Edit |
|---------|--------------|
| `siteConfig` | Her name, age, your name, date, subtitle |
| `galleryPhotos` | Photo paths, titles, captions, dates, locations |
| `twentyFourThings` | The 24 things you love about her |
| `jarNotes` | Positivity notes for the jar |
| `theLetter` | Your personal letter (greeting, body, closing, PS) |
| `easterEgg` | The hidden surprise message |
| `chapters` | Chapter titles (optional) |

---

## 🖼️ Adding Your Photos

1. Place photos in: `/public/photos/`
2. Name them: `photo-1.jpg`, `photo-2.jpg`, etc.
3. Update `content.ts` with matching paths

**Photo tips:**
- Use 4:5 or 3:4 aspect ratio for best results
- JPG or PNG format
- 6-12 photos work best visually

---

## 🎵 Adding Background Music

1. Place audio file at: `/public/audio.mp3`
2. The audio toggle will automatically appear
3. Default is OFF (never autoplays)

---

## 📁 Project Structure

```
anousha-24/
├── app/
│   ├── globals.css      # Styles & design tokens
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Main page orchestrator
├── components/
│   ├── EnvelopeIntro.tsx    # Animated envelope reveal
│   ├── ChapterMap.tsx       # Navigation sidebar
│   ├── Cover.tsx            # Chapter 1: Title page
│   ├── Gallery.tsx          # Chapter 2: Photo gallery
│   ├── Drawers24.tsx        # Chapter 3: 24 drawers
│   ├── PositivityJar.tsx    # Chapter 4: Note jar
│   ├── LetterFinale.tsx     # Chapter 5: Letter & finale
│   ├── Modal.tsx            # Reusable modal
│   └── AudioToggle.tsx      # Music player
├── data/
│   └── content.ts       # ⭐ ALL CONTENT HERE
└── public/
    ├── photos/          # Your photos go here
    └── audio.mp3        # Optional background music
```

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

---

## 🐣 Easter Egg

There's a hidden surprise! Look for a tiny heart icon in the Letter chapter.

---

Made with love. 🤍
