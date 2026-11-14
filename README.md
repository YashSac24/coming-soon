# 🌆 3D Metropolis — Coming Soon Page

An interactive, high-performance 3D "Coming Soon" web application built with **React**, **Three.js**, **Vite**, and **WebAssembly Draco Compression**.

Featuring a living low-poly 3D metropolis, an active skyscraper construction jobsite, multi-district roadway traffic, a grand suspension bridge, real-time local clock telemetry, and an architectural glassmorphic HUD console.

---

## ✨ Features

### 🏗️ 1. Interactive 3D Metropolis Scene
* **Living Dual-District City**: A residential neighborhood and a high-rise commercial downtown separated by a natural urban river canal.
* **Active Centerpiece Construction Site**:
  * 45° building under active superstructure construction with exposed steel columns, rebar, and modular scaffolding.
  * Rotating 3D Tower Crane with an animated trolley hoist and a gently swinging steel I-beam.
  * Rooftop construction workers, riggers, and an arc-welder casting dynamic lighting flickers across the building slab.
  * Aviation obstruction strobe beacons and safety perimeter barriers.
* **The Grand Metropolis Bridge**:
  * Double-lane suspension bridge spanning the river canal to connect both city districts.
  * Pylons with illuminated aviation beacons, deep foundation piers in the riverbed, and asphalt road deck with safety barriers.
* **Autonomous Roadway Traffic**:
  * Vehicles (Yellow Taxi, Delivery Van, Blue Sedan, and Red Sports Car) driving along designated road circuits and across the Grand Bridge.
  * Dynamic forward-facing steering (`atan2`) with smooth cornering and zero terrain clipping.
* **Living Waterfront**:
  * Stone quays and retaining embankments along the riverbanks.
  * Animated river tugboat gently rocking in the canal waters.
* **Mouse Parallax & Ambient Atmosphere**:
  * Smooth isometric perspective camera with interactive mouse parallax.
  * Atmospheric deep-space fog and dual-tone lighting (warm directional sunlight + cool cyan rim light).

### 🖥️ 2. Architectural Glassmorphism HUD Console
* **Frosted Glassmorphism**: High-contrast, dark-mode frosted glass card (`backdrop-filter: blur(28px)`) with CAD blueprint corner brackets (`┌ ┐ └ ┘`).
* **Precision Live Clock Module**: A 4-column balanced telemetry grid displaying live local time (Hours, Minutes, Seconds, Period) updated every second.
* **Early Access Subscription Capsule**: High-tech pill input with an embedded mail icon and a micro-animated CTA button (`Get Early Access →`).
* **Milestone Telemetry**: Single-line construction progress readout (`Phase 04: Superstructure • 88% Complete`) with an animated glowing scanner head.
* **Strict Zero-Scroll Layout**: Engineered for a strict `100vh` viewport on desktop, tablet, and mobile with seamless responsiveness.

### ⚡ 3. Performance & Asset Optimization
* **Draco WebAssembly Compression**: 3D city models optimized from **218 MB down to 12 MB** (~94.5% reduction) using Draco mesh compression.
* **Progressive Non-Blocking Streaming**: The hero UI, live clock, email form, and construction centerpiece are interactive in **<250ms**, while background assets stream in smoothly.

---

## 🛠️ Tech Stack

* **Frontend Framework**: [React 19](https://react.dev/)
* **3D Engine**: [Three.js (WebGL)](https://threejs.org/)
* **Build Tool & Dev Server**: [Vite 6](https://vitejs.dev/)
* **3D Loaders**: `GLTFLoader`, `DRACOLoader`, `FBXLoader`
* **Styling**: Modern CSS3 (Glassmorphism, CSS Grid, Flexbox, Custom Keyframe Animations)
* **Typography**: *Poppins* & *JetBrains Mono*

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18.0 or newer recommended)
* `npm` or `yarn` / `pnpm`

### Installation

1. **Clone the repository**:
   ```bash
   git clone git@github.com:YashSac24/coming-soon.git
   cd coming-soon
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```
   Outputs production-ready static assets to the `dist/` folder.

---

## 📁 Project Structure

```
coming_soon/
├── public/
│   ├── draco/                    # Local WebAssembly Draco decoders
│   │   ├── draco_decoder.wasm
│   │   ├── draco_decoder.js
│   │   └── draco_wasm_wrapper.js
│   └── models/
│       ├── city/                 # Optimized 3D Metropolis GLB & textures
│       │   ├── LowPoly_City_01Ready_opt.glb  (~12 MB)
│       │   └── color_2048x2048.jpg
│       ├── handyman/             # Animated worker textures & FBX
│       └── props/                # Concrete mixers, barriers & site benches
├── src/
│   ├── App.jsx                   # Main application wrapper
│   ├── ComingSoon.jsx            # Core Three.js WebGL scene & React HUD console
│   ├── ComingSoon.css            # Glassmorphism styling & animations
│   └── main.jsx                  # React DOM mount point
├── .gitignore                    # Excludes node_modules, build output, & 100MB+ raw files
├── package.json                  # Dependencies and build scripts
├── vite.config.js                # Vite build and asset pipeline configuration
└── README.md                     # Documentation
```

---

## 🗜️ 3D Model Compression Command

If you add new raw 3D assets or re-export the city model, compress it using Draco via `gltf-pipeline`:

```bash
npx gltf-pipeline -i "public/models/city/LowPoly_City_01Ready.glb" -o "public/models/city/LowPoly_City_01Ready_opt.glb" -d
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
