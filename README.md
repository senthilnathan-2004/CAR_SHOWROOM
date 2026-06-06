# APEX P-1 | Flagship Stealth-Black Hypercar Landing Page

An ultra-premium, Apple-level cinematic scrollytelling landing page showcasing the engineering and aerodynamics of the flagship Stealth-Black APEX P-1 Hypercar. Built with **Next.js (App Router)**, **React**, **Tailwind CSS v4**, and **Framer Motion**.

---

## 🚀 Key Features

* **Zero-Gravity Scroll Sequence**: A high-performance 240-frame 3D image sequence synced directly to user scroll progress.
* **Physics-Based Smoothing**: Framer Motion `useSpring` handles scroll velocity to render frames at 60+ FPS on Retina and high-DPR screens.
* **Futuristic Telemetry HUD**: A floating, borderless cockpit widget tracking current render frames, simulated speeds (up to 425 km/h), active spoiler angles, and a scrolling diagnostic log.
* **Premium Editorial Typography**: Geometric display headings using **Outfit** and readable content panels using **Inter**.
* **Unified Edge Alignment**: Completely left-justified grids and text sections that align perfectly down a vertical reading axis.

---

## 🛠️ Tech Stack

* **Core Framework**: Next.js 14/15 (App Router)
* **Styling**: Tailwind CSS v4
* **Animations**: Framer Motion (useScroll, useSpring, useMotionValueEvent)
* **Typography**: Google Fonts (Outfit & Inter) via `next/font`

---

## ⚙️ Prerequisites

Make sure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (v18.17 or higher recommended)
* `npm` (packaged automatically with Node.js)

---

## 💻 How to Download & Run

### 1. Clone or Extract the Repository
Download the project source files to your local machine and navigate into the project root directory:
```bash
cd "untitled folder 15"
```

### 2. Install Dependencies
Install all required Node modules (`next`, `react`, `framer-motion`, etc.) using npm:
```bash
npm install
```

### 3. Run the Development Server
Start the local development server to compile the site in development mode:
```bash
npm run dev
```
Once ready, open **[http://localhost:3000](http://localhost:3000)** in your web browser to view the interactive scrollytelling experience.

### 4. Build for Production
To build a highly optimized, static, and production-ready package:
```bash
npm run build
```

### 5. Start Production Server
To serve the built application locally under production conditions:
```bash
npm run start
```

---

## 📂 Project Directory Structure

```text
├── public/
│   └── frames/              # Directory containing the 240 split PNG frames (ezgif-frame-001.png to ezgif-frame-240.png)
├── src/
│   ├── app/
│   │   ├── globals.css      # Core styles, void-black theme variables, and global scrollbars
│   │   ├── layout.tsx       # Root layout configuring Next.js Google Fonts (Inter & Outfit)
│   │   └── page.tsx         # Main entry point with preloader lifecycle and component assembly
│   └── components/
│       ├── Navbar.tsx       # Toast-style pill navigation centered at the top
│       ├── ScrollytellingCanvas.tsx # High-resolution Retina-aware <canvas> frame player
│       ├── TelemetryHud.tsx # Bottom-right borderless dynamic diagnostic HUD
│       └── OverlayContent.tsx # Scrollable columns and specifications tables
└── package.json             # Scripts and dependencies config
```

---

## ⚡ Performance Optimizations

* **Canvas Rendering**: Directly writes images to a 2D canvas context using `requestAnimationFrame` and scroll listeners to bypass React re-render cycles entirely, resulting in smooth rendering performance.
* **Image Preloading**: Caches all 240 image frames in-memory on initial load, blocking the screen with a diagnostic loader until the resources are cached to prevent network lag on scroll.
* **Transform Reset**: Resets the canvas transform matrix using `setTransform` on each frame to prevent pixelation on high-DPI (Retina) screen resize triggers.
# CAR_SHOWROOM
