# 🌌 Mohsin — Developer Portfolio v2

<div align="center">

![Portfolio Preview](https://img.shields.io/badge/Status-Active-7dd3fc?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-38bdf8?style=for-the-badge&logo=react&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.160-05070d?style=for-the-badge&logo=threedotjs&logoColor=7dd3fc)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-88ce02?style=for-the-badge&logo=greensock&logoColor=white)
![Discord](https://img.shields.io/badge/Community-CodeX_Development-5865F2?style=for-the-badge&logo=discord&logoColor=white)

<br />

**A cinematic, high-performance 3D developer portfolio featuring an interactive energy core, technology constellation, Lenis smooth scrolling, GSAP ScrollTrigger choreography, and a dark ice-blue cybernetic design system.**

[Explore Live Demo](http://localhost:5173/) • [Join Discord Community](https://discord.gg/codexdevs) • [Report Issue](https://github.com/MohsinAli088/)

</div>

---

## ✨ Key Features

- **Interactive 3D Developer Core**: Central distorted glass/energy sphere orbited by rings, floating code runes, and reactive lighting that tracks cursor movement.
- **3D Skills Constellation**: Spatial network of nodes displaying official monochrome technology icons on glowing glass billboards, with dynamic energy pulse dots traveling along connection lines.
- **Tech Marquee**: Infinite auto-scrolling horizontal ribbon of technology chips with pause-on-hover and edge fade masks.
- **Weighted Cinematic Scroll**: Integrated **Lenis** smooth scroll synchronized with **GSAP ScrollTrigger** and a top 2.5px gradient progress bar.
- **Signature Hero Pinning**: The 3D Developer Core pins briefly at the top of scroll while hero text smoothly fades and scales down.
- **Typewriter Role-Rotator**: Hero subheader dynamically types and deletes roles with a pulsing cyan underscore cursor.
- **Card & Button Micro-Interactions**:
  - **Traveling Border Beam**: Conic-gradient light beam actively circumnavigating project card edges on hover.
  - **Diagonal Shine Sweep**: Soft glass reflection gliding across card surfaces.
  - **Ripple-on-Click**: Ice-blue ripples emanating from exact click coordinates.
  - **Button Hover Wipe**: Smooth background gradient wipe sliding in from the left on CTAs.
  - **Center-Outward Navbar Underlines**: Links draw outward from center on hover and stay filled for active sections.
- **Stats Counter Animations**: GitHub repository numbers, followers, contributions, and language percentage bars count up smoothly with cubic easing on scroll.
- **Ambient Detail & Cursor Trail**: Subtle cyan particle trail following desktop pointer movements and mouse-reactive starfield parallax.
- **Accessibility & Reduced Motion**: Automatically scales back 3D complexity, disables heavy canvas elements, and falls back to clean static states when `prefers-reduced-motion` is detected or on mobile devices.

---

## 🛠️ Tech Stack

- **Core**: [React 18](https://react.dev/), [Vite](https://vitejs.dev/)
- **3D Graphics & Shaders**: [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei)
- **Animation & Scrolling**: [Lenis](https://lenis.darkroom.engineering/), [GSAP (ScrollTrigger)](https://gsap.com/), [Framer Motion](https://www.framer.com/motion/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), PostCSS, Custom CSS Keyframes
- **Icons**: [React Icons (Simple Icons & Feather)](https://react-icons.github.io/react-icons/), [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MohsinAli088/mohsin-portfolio.git
   cd mohsin-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```
   The bundled production files will be output to the `dist/` directory, ready to deploy to **Vercel**, **Netlify**, or **GitHub Pages**.

---

## 📂 Project Structure

```
mohsin-portfolio/
├── public/                Static assets & favicon
├── src/
│   ├── components/        UI sections & micro-interaction components
│   │   ├── 3d/            Three.js / React Three Fiber scenes & shaders
│   │   │   ├── DeveloperCore.jsx       Central 3D hero artifact
│   │   │   ├── SkillsConstellation.jsx 3D nodes with tech billboards & pulses
│   │   │   ├── BackgroundScene.jsx     Parallax starfield & particles
│   │   │   └── ...
│   │   ├── CountUp.jsx                 Scroll-triggered numeric counters
│   │   ├── CustomCursor.jsx            Trailing dot + ring + stardust trail
│   │   ├── MagneticButton.jsx          Magnetic pull, ripple & wipe CTA
│   │   ├── SmoothScroll.jsx            Lenis smooth scroll + top progress bar
│   │   ├── TechIcon.jsx                Monochrome ice-blue tech icon mapper
│   │   ├── TechMarquee.jsx             Infinite auto-scrolling tech ribbon
│   │   ├── TypewriterRole.jsx          Role-rotator with blinking cursor
│   │   └── ...
│   ├── data/              Single source of truth for site content
│   │   ├── social.js      Profile information & external social links
│   │   ├── projects.js    Project showcase cards & metadata
│   │   ├── skills.js      Constellation skills & descriptions
│   │   └── experience.js  Timeline milestones & tags
│   ├── hooks/             Device profile, pointer & active section hooks
│   ├── App.jsx            Main application shell
│   ├── main.jsx           Vite entry point
│   └── index.css          Tailwind directives, glassmorphism & keyframe animations
├── package.json
└── vite.config.js
```

---

## ⚙️ Customization Guide

All personal info and links are isolated in the `src/data/` folder for quick updates:

- **Profile & Social Links**: Edit `src/data/social.js` to change your name, roles, and real social profile URLs.
- **Projects**: Edit `src/data/projects.js` to add your projects, GitHub repositories, and live demo links.
- **Skills**: Edit `src/data/skills.js` to customize the technologies displayed in the 3D constellation and Marquee.
- **Experience**: Edit `src/data/experience.js` to update your work history and milestones.
- **Live GitHub API Stats**: See comments in `src/hooks/useGithubStats.js` to connect directly to the live GitHub REST API.

---

## 👑 Credits & Attribution

This project is created and maintained by:

- **Lead Developer**: **Mohsin.Exe** ([@MohsinAli088](https://github.com/MohsinAli088))
- **Development Team**: **CodeX Development**
  - **Discord Community**: [discord.gg/codexdevs](https://discord.gg/codexdevs)
  - Focused on Discord bot systems, full-stack web platforms, and open-source software.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

<div align="center">
  <sub>Crafted with 💙 by <b>Mohsin.Exe</b> and the <b>CodeX Development</b> team.</sub>
</div>
