# AGENTS.md — NØRRA SAUNA SHOWROOM

## Project Overview
This repository contains the **NØRRA SAUNA** 3D Commerce Showroom — a premium, interactive WebGL e-commerce demonstration designed for the Swiss luxury architectural market.

## Shared Model Permissions (Gemini & Codex)
- Both Gemini and Codex have full, unrestricted permission to develop, inspect, and optimize any and all parts of the frontend codebase.
- This includes, but is not limited to:
  - 3D scene architecture, Three.js / React Three Fiber rendering pipelines, shaders, materials, and geometry
  - GSAP animations, ScrollTrigger timelines, and cinematic camera choreography
  - UI/UX layout, typography, navigation, styling (Tailwind CSS), and components
  - Interactive product configurator state management, pricing logic, and local quotation export
  - Asset pipeline, procedural texture generation, and performance optimizations
  - Automated testing, Playwright E2E visual verification, responsive audits, and builds
- **No permanent frontend/backend agent separation**: Both agents act as full-stack creative developers and engineers on this client-side architecture.

## Core Directives & Standards
1. **Single Persistent 3D Sauna Canvas on Homepage**:
   - The homepage experience uses ONE single, persistent WebGL canvas mounted in a stable root container.
   - The same high-detail sauna product model (`NØRRA CUBE 01`) persists continuously through all 12 narrative scroll stages (Alpine luxury hero, detailed inspection, material close-up, factory environment, component assembly, dark product studio, shipping preparation, freight journey, Swiss villa delivery, final architectural installation, interactive preview, brand reveal).
   - Canvas must fill exact viewport dimensions and never collapse to a 300px default size.
2. **Design Language**:
   - Swiss architectural minimalism and luxury editorial aesthetic.
   - Palette: Charcoal (`#111210`), Warm White (`#F1EEE7`), Graphite (`#242521`), Natural Stone (`#C8BFB1`), Thermowood (`#302720`), Bronze (`#8A745C`).
   - Fonts: Bodoni Moda (editorial headings), IBM Plex Sans (body & labels), IBM Plex Mono (metrics & specifications).
   - Authentic Swiss standard German copy with high typographic refinement.
3. **Frontend-Only Scope**:
   - All state is client-side. No Shopify, Supabase, real payment gateways, production order databases, or external auth.
   - Configurator prices and quotes are realistic illustrative demo figures (CHF).
4. **Safety & Git Integrity**:
   - Never force-push or overwrite uncommitted changes.
   - Maintain pristine TypeScript type safety (`tsc --noEmit`), ESLint compliance, and clean production builds (`npm run build`).
