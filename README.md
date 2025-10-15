# Micro-Frontend Component Library System

A comprehensive micro-frontend architecture built with React, TypeScript, Zustand, and Storybook, featuring a shared component library and three independent micro-frontend applications.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
- [Development](#development)
- [Component Library](#component-library)
- [Accessibility](#accessibility)
- [Docker & Deployment](#docker--deployment)
- [Kubernetes](#kubernetes)
- [CI/CD](#cicd)
- [Scripts](#scripts)
- [Tech Stack](#tech-stack)

## Overview

This project demonstrates a modern micro-frontend architecture using a monorepo setup with Turborepo. It includes:

- **3 Micro-frontends**: Dashboard, Settings, and Reports
- **Shared Component Library**: Reusable UI components with TypeScript
- **State Management**: Zustand for shared state across micro-frontends
- **Component Documentation**: Storybook with accessibility testing
- **Containerization**: Docker support for each application
- **Orchestration**: Kubernetes manifests for deployment
- **CI/CD**: GitHub Actions pipeline for automated testing and deployment

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Monorepo Root                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐  ┌──────────────┐                   │
│  │  Packages    │  │     Apps     │                   │
│  ├──────────────┤  ├──────────────┤                   │
│  │              │  │              │                   │
│  │  - UI        │  │  - Dashboard │                   │
│  │  - Store     │  │  - Settings  │                   │
│  │              │  │  - Reports   │                   │
│  │              │  │  - Storybook │                   │
│  └──────────────┘  └──────────────┘                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Project Structure

```
micro-frontend-system/
├── apps/
│   ├── dashboard/          # Dashboard micro-frontend (Port 3001)
│   ├── settings/           # Settings micro-frontend (Port 3002)
│   ├── reports/            # Reports micro-frontend (Port 3003)
│   └── storybook/          # Component documentation (Port 6006)
├── packages/
│   ├── ui/                 # Shared component library
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Button/
│   │   │   │   ├── Input/
│   │   │   │   ├── Modal/
│   │   │   │   ├── Navigation/
│   │   │   │   └── Card/
│   │   │   └── styles/
│   │   └── package.json
│   └── store/              # Shared state management
│       ├── src/
│       │   ├── userStore.ts
│       │   └── themeStore.ts
│       └── package.json
├── k8s/                    # Kubernetes manifests
├── .github/workflows/      # CI/CD pipelines
├── docker-compose.yml
├── turbo.json
└── package.json
```

## Features

### Shared Component Library

- **Button**: Multiple variants (primary, secondary, outline, danger) with loading states
- **Input**: Form inputs with labels, validation, and error handling
- **Modal**: Accessible dialogs with focus management
- **Navigation**: Responsive navigation with icons
- **Card**: Flexible card component with header, content, and footer

### Micro-frontends

1. **Dashboard**
   - Real-time analytics display
   - Interactive charts and statistics
   - Recent activity feed
   - Quick action buttons

2. **Settings**
   - User profile management
   - Theme customization
   - Notification preferences
   - Security settings

3. **Reports**
   - Report listing and filtering
   - Status tracking
   - Export functionality
   - Report generation

### State Management

- **User Store**: Global user authentication and profile
- **Theme Store**: Application-wide theme management (light/dark)
- Persistent storage with localStorage

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Docker (optional)
- Kubernetes cluster (optional)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd micro-frontend-system
```

2. Install dependencies:
```bash
npm install
```

3. Build all packages:
```bash
npm run build
```

## Development

### Run All Apps in Development Mode

```bash
npm run dev
```

This will start:
- Dashboard: http://localhost:3001
- Settings: http://localhost:3002
- Reports: http://localhost:3003

### Run Storybook

```bash
npm run storybook
```

Storybook will be available at: http://localhost:6006

### Run Individual Apps

```bash
# Dashboard
npm run dev --workspace=@micro-frontend/dashboard

# Settings
npm run dev --workspace=@micro-frontend/settings

# Reports
npm run dev --workspace=@micro-frontend/reports
```

### Build for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

### Testing

```bash
npm run test
```

## Component Library

The shared component library (`@micro-frontend/ui`) includes:

### Button Component

```tsx
import { Button } from '@micro-frontend/ui';

<Button variant="primary" size="medium" onClick={handleClick}>
  Click Me
</Button>
```

### Input Component

```tsx
import { Input } from '@micro-frontend/ui';

<Input
  label="Email"
  type="email"
  placeholder="Enter email"
  error={errors.email}
  required
/>
```

### Modal Component

```tsx
import { Modal } from '@micro-frontend/ui';

<Modal
  open={isOpen}
  onClose={handleClose}
  title="Confirm Action"
  size="medium"
>
  <p>Are you sure?</p>
</Modal>
```

### Navigation Component

```tsx
import { Navigation } from '@micro-frontend/ui';

<Navigation
  items={[
    { label: 'Home', href: '/', active: true },
    { label: 'About', href: '/about' },
  ]}
  vertical
/>
```

### Card Component

```tsx
import { Card, CardHeader, CardContent, CardFooter } from '@micro-frontend/ui';

<Card variant="elevated">
  <CardHeader>
    <h3>Card Title</h3>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

## Accessibility

All components are built with accessibility in mind, following WCAG 2.1 guidelines:

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **ARIA Attributes**: Proper ARIA labels and roles
- **Focus Management**: Visible focus indicators and focus trapping in modals
- **Screen Reader Support**: Semantic HTML and descriptive labels
- **Color Contrast**: Meets WCAG AA standards
- **Form Validation**: Clear error messages and validation states

Storybook includes the `@storybook/addon-a11y` addon for automated accessibility testing.

## Docker & Deployment

### Build Docker Images

```bash
# Build individual images
docker build -f apps/dashboard/Dockerfile -t micro-frontend/dashboard .
docker build -f apps/settings/Dockerfile -t micro-frontend/settings .
docker build -f apps/reports/Dockerfile -t micro-frontend/reports .
```

### Run with Docker Compose

```bash
docker-compose up -d
```

This will start all three micro-frontends:
- Dashboard: http://localhost:8001
- Settings: http://localhost:8002
- Reports: http://localhost:8003

### Stop Containers

```bash
docker-compose down
```

## Kubernetes

### Deploy to Kubernetes

```bash
# Apply all deployments
kubectl apply -f k8s/dashboard-deployment.yaml
kubectl apply -f k8s/settings-deployment.yaml
kubectl apply -f k8s/reports-deployment.yaml
```

### Check Deployment Status

```bash
kubectl get deployments
kubectl get services
kubectl get pods
```

### Access Applications

```bash
# Dashboard
kubectl port-forward service/dashboard-service 8001:80

# Settings
kubectl port-forward service/settings-service 8002:80

# Reports
kubectl port-forward service/reports-service 8003:80
```

### Scale Deployments

```bash
kubectl scale deployment dashboard --replicas=3
kubectl scale deployment settings --replicas=3
kubectl scale deployment reports --replicas=3
```

## CI/CD

The project uses GitHub Actions for automated CI/CD:

### Pipeline Stages

1. **Lint and Test**: Code quality checks and unit tests
2. **Build**: Build all micro-frontends and Storybook
3. **Docker Build**: Create and push Docker images (main branch only)
4. **Deploy**: Deploy to Kubernetes cluster (main branch only)

### Required Secrets

Configure these secrets in your GitHub repository:

- `DOCKER_USERNAME`: Docker Hub username
- `DOCKER_PASSWORD`: Docker Hub password
- `KUBE_CONFIG`: Kubernetes cluster configuration

### Workflow Triggers

- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

## Scripts

### Root Level

- `npm run dev` - Start all apps in development mode
- `npm run build` - Build all packages and apps
- `npm run lint` - Lint all packages and apps
- `npm run test` - Run tests across all packages
- `npm run storybook` - Start Storybook
- `npm run build-storybook` - Build Storybook for deployment
- `npm run clean` - Clean all build artifacts

### Workspace Level

```bash
# Build specific workspace
npm run build --workspace=@micro-frontend/ui
npm run build --workspace=@micro-frontend/dashboard

# Run specific app
npm run dev --workspace=@micro-frontend/settings
```

## Tech Stack

### Core

- **React 18.3.1**: UI framework
- **TypeScript 5.5.4**: Type-safe JavaScript
- **Vite 5.3.5**: Build tool and dev server

### State Management

- **Zustand 4.5.4**: Lightweight state management

### Styling

- **CSS Modules**: Component-scoped styling
- **clsx**: Conditional class names

### Build Tools

- **Turborepo 1.13.4**: Monorepo build system
- **tsup**: TypeScript bundler for packages

### Documentation

- **Storybook 8.2.9**: Component documentation
- **@storybook/addon-a11y**: Accessibility testing

### DevOps

- **Docker**: Containerization
- **Kubernetes**: Container orchestration
- **GitHub Actions**: CI/CD automation
- **Nginx**: Production web server

### Code Quality

- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting
- **TypeScript ESLint**: TypeScript-specific linting rules
- **eslint-plugin-jsx-a11y**: Accessibility linting

## Best Practices

1. **Accessibility First**: All components follow WCAG 2.1 guidelines
2. **Type Safety**: Comprehensive TypeScript coverage
3. **Component Isolation**: Storybook for development and testing
4. **State Sharing**: Zustand stores for cross-app state
5. **Performance**: Code splitting and lazy loading
6. **Docker Multi-stage Builds**: Optimized production images
7. **Kubernetes Best Practices**: Health checks, resource limits, and rolling updates
8. **Automated Testing**: CI/CD pipeline with automated checks

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please open an issue in the GitHub repository.
