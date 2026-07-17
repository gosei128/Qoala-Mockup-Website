<div align="center">

<img src="./src/imports/logo.png" alt="Qoala Logo" height="80" />

# Qoala — Smart Queue Management System

**A modern, responsive landing page mockup for Qoala, a mobile app designed to eliminate physical queuing for STI College of Malolos students.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![pnpm](https://img.shields.io/badge/pnpm-package_manager-F69220?style=flat-square&logo=pnpm)](https://pnpm.io)

</div>

---

## 📖 Overview

Qoala is a queue management mobile application that lets STI College of Malolos students **join, track, and get notified** when it's their turn at campus offices — without ever having to physically wait in line.

This repository contains the **marketing landing page mockup** for the Qoala app, built as a single-page React + TypeScript + Tailwind CSS v4 application.

---

## ✨ Features

| Section | Description |
|---|---|
| 🦸 **Hero** | Full-screen gradient hero with animated image carousel showcasing app screens |
| ⚡ **Features** | Grid of feature cards highlighting app capabilities |
| 🪜 **How It Works** | Step-by-step breakdown of the 4-step queue process |
| 💬 **Testimonials** | Student reviews with star ratings |
| 📲 **CTA** | Download call-to-action with App Store & Google Play buttons |
| 🔗 **Smooth Nav** | Sticky navbar with smooth-scroll links to each section |

---

## 🗂️ Project Structure

```
qoala_mockup/
├── index.html              # HTML entry point with favicon & SEO meta
├── package.json            # Project dependencies & scripts
├── vite.config.ts          # Vite + Tailwind v4 plugin configuration
├── tsconfig.json           # TypeScript configuration
└── src/
    ├── main.tsx            # React DOM entry point
    ├── App.tsx             # Main landing page component (all sections)
    ├── index.css           # Global styles, Tailwind import, design tokens
    └── imports/
        ├── logo.png            # Qoala app logo
        ├── start_mockup.png    # App screenshot — Start/Join screen
        ├── join_mockup.png     # App screenshot — Queue screen
        └── turn_mockup.png     # App screenshot — Your Turn screen
```

---

## 🛠️ Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| [React](https://react.dev) | 19 | UI component framework |
| [TypeScript](https://www.typescriptlang.org) | 5.7 | Type-safe JavaScript |
| [Vite](https://vitejs.dev) | 8.0 | Lightning-fast dev server & bundler |
| [Tailwind CSS](https://tailwindcss.com) | 4.0 | Utility-first CSS via Vite plugin |
| [pnpm](https://pnpm.io) | latest | Fast, disk-efficient package manager |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `>= 18`
- **pnpm** — install with `npm install -g pnpm`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/qoala_mockup.git
cd qoala_mockup

# 2. Install dependencies
pnpm install

# 3. Start the development server
pnpm dev
```

The app will be available at **`http://localhost:5173`** (or the port shown in your terminal).

### Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the local development server with HMR |
| `pnpm build` | Build the production bundle to `dist/` |
| `pnpm preview` | Preview the production build locally |
| `pnpm format` | Format source files with `oxfmt` |

---

## 🎨 Design System

The project uses a consistent design language defined in `src/index.css`:

| Token | Value | Usage |
|---|---|---|
| `--q-blue` | `#2D52F5` | Primary brand color |
| `--q-blue-dark` | `#1A38D4` | Hover / gradient start |
| `--q-ink` | `#0C0E1A` | Headings & dark text |
| `--q-slate` | `#64748B` | Body / muted text |
| `--q-bg` | `#F4F6FB` | Light section background |

**Typography**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) — loaded from Google Fonts.

---

## 📱 App Sections & Navigation

The navbar links use **smooth scroll** via `scrollIntoView({ behavior: 'smooth' })`:

| Nav Link | Scrolls To | Section `id` |
|---|---|---|
| Features | Feature cards grid | `#features` |
| How it Works | 4-step process | `#how-it-works` |
| About | Student testimonials | `#about` |
| Download App *(button)* | CTA download section | `#cta` |

---

## 📸 App Mockup Screens

The landing page showcases three real screenshots from the Qoala mobile app:

| Screen | File | Description |
|---|---|---|
| Start / Login | `start_mockup.png` | Student sign-in screen |
| Join Queue | `join_mockup.png` | Service selection & queue joining |
| Your Turn | `turn_mockup.png` | Real-time notification when slot is ready |

---

## 🗺️ Roadmap

- [ ] Add mobile hamburger menu for small screens
- [ ] Connect download buttons to actual app store links
- [ ] Add an FAQ accordion section
- [ ] Integrate with Qoala backend API for live queue stats
- [ ] Deploy to production (Vercel / Netlify)

---

## 🤝 Contributing

This is a mockup/prototype project for **STI College of Malolos**. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is intended for academic and portfolio purposes. All rights reserved.

---

<div align="center">

Built with ❤️ for **STI College of Malolos** 🇵🇭

</div>
