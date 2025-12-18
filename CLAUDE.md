# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

3D Tech Particle Animation - A React application that creates an interactive 3D particle animation effect. The particles form text ("Aoba") and respond to mouse movement. Originally designed in Figma: https://www.figma.com/design/FiyPx6RdxcEhl37LoDnOpk/3D-Tech-Particle-Animation

## Technology Stack

- **Frontend**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 6.3.5 (using SWC plugin for fast compilation)
- **Package Manager**: pnpm (NOT npm)
- **UI Components**: Radix UI primitives + custom components in `src/components/ui/`
- **Styling**: Tailwind CSS v4 (dynamic compilation via `@tailwindcss/vite`)
- **Containerization**: Docker with multi-stage build (Node.js builder + Nginx production)
- **Orchestration**: Kubernetes with ArgoCD GitOps deployment (monitors `main` branch)

## Development Commands

### Local Development
```bash
pnpm install              # Install dependencies (use pnpm, not npm)
pnpm dev                  # Start development server on http://localhost:3000
pnpm build                # Build for production to build/ directory
```

### Docker
```bash
# Build image
docker build -t 3dtech-particle-animation .

# Run container locally
docker run -d -p 8081:80 --name particle-animation 3dtech-particle-animation

# Push to Docker Hub
docker tag 3dtech-particle-animation iwakiaoba/3d-particle:latest
docker push iwakiaoba/3d-particle:latest
```

### Kubernetes Deployment

The application uses ArgoCD for GitOps continuous deployment:

- **ArgoCD Application**: `k8s/app.yaml` - Monitors the `main` branch
- **Manifests**: `k8s/manifests/` directory contains:
  - `deployments.yaml` - Uses `iwakiaoba/3d-particle:latest` image, 2 replicas
  - `service.yaml` - ClusterIP service on port 80
  - `ingress.yaml` - Cloudflare Tunnel ingress to portfolio.aooba.net
- **Namespace**: `portfolio`
- **Auto-sync**: Enabled with self-heal and prune

When changes are pushed to `main` branch, ArgoCD automatically syncs the deployment.

## Architecture

### Application Structure

```
src/
├── App.tsx                    # Root component with gradient background
├── main.tsx                   # Entry point
├── components/
│   ├── ParticleCanvas.tsx    # Core particle animation logic
│   ├── Portfolio.tsx         # Main portfolio content page
│   ├── ui/                   # Radix UI component library
│   └── figma/                # Figma-exported components
├── styles/
└── guidelines/
```

### Core Animation Logic (ParticleCanvas.tsx)

The main animation component uses HTML5 Canvas API:

1. **Text-to-Particles**: Renders "Aoba" text to hidden canvas, samples pixels on a grid (4px spacing), creates particle at each opaque pixel
2. **Particle Properties**:
   - Current position (x, y, z) with velocity (vx, vy, vz)
   - Target position for text formation
   - Base position with circular orbit (angle, angleSpeed, radius)
   - 3D depth simulation via z-coordinate
3. **Animation Loop**:
   - Mouse repulsion: Particles within 150px move away from cursor
   - Target attraction: Spring force (0.05 strength) pulls toward base position + circular offset
   - Friction: 0.9 dampening on velocity
   - Rendering: Blue gradient glow effect with HSL color variation
   - Connection lines: Draw between particles within 40px distance

### Portfolio Transition Logic (App.tsx)

The application features a smooth transition from the intro animation to the main portfolio:

1. **Trigger**: High-level click event listener in `App.tsx` and triggered via `onDisperse` callback in `ParticleCanvas`.
2. **Animation**:
   - `ParticleCanvas` initiates its disperse (explosion) effect.
   - Concurrently, a 1.5s fade-out is applied to the canvas (`opacity-0` with `transition-opacity duration-1500`).
3. **Completion**: After 1.5s, `showPortfolio` state changes to `true`, rendering the `Portfolio` component with a fade-in animation.

### Build Output

- Vite builds to `build/` directory (configured in vite.config.ts:54)
- Output target: `esnext` modules
- Nginx serves static files from `/usr/share/nginx/html` in production

### Docker Multi-Stage Build

1. **Builder stage**: Node.js 20 Alpine installs pnpm, dependencies, runs `pnpm build`
2. **Production stage**: Nginx Alpine serves built files from `build/` directory
3. **nginx.conf**: SPA routing with `try_files`, security headers, gzip compression

### Path Aliases

The project uses extensive Vite path aliases for package resolution (see vite.config.ts:10-49). When importing Radix UI or other dependencies, the aliases ensure correct module resolution.

## Important Notes

- **Package Manager**: Always use `pnpm`, not `npm` or `yarn`
- **Build Directory**: Output goes to `build/` (not `dist/`)
- **Tailwind CSS**: Uses v4 with Vite plugin. Utility classes are generated dynamically from source files.
- **Text Content**: The particle animation displays "Aoba" (hardcoded in ParticleCanvas.tsx:66)
- **Production Image**: The Docker image is published to `iwakiaoba/3d-particle` on Docker Hub
- **Deployment Branch**: ArgoCD watches the `main` branch (deployment automated via GitOps)
