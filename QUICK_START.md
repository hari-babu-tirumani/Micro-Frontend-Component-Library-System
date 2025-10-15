# Quick Start Guide

This guide will help you get the Micro-Frontend Component Library System up and running quickly.

## Prerequisites

Ensure you have the following installed:
- Node.js >= 18.0.0
- npm >= 9.0.0

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

This will install all dependencies for the monorepo, including all packages and apps.

### 2. Build Shared Packages

Before running the apps, build the shared packages:

```bash
npm run build --workspace=@micro-frontend/ui
npm run build --workspace=@micro-frontend/store
```

### 3. Run Applications

#### Option A: Run All Apps Simultaneously

```bash
npm run dev
```

This starts all three micro-frontends:
- **Dashboard**: http://localhost:3001
- **Settings**: http://localhost:3002
- **Reports**: http://localhost:3003

#### Option B: Run Individual Apps

```bash
# Dashboard only
npm run dev --workspace=@micro-frontend/dashboard

# Settings only
npm run dev --workspace=@micro-frontend/settings

# Reports only
npm run dev --workspace=@micro-frontend/reports
```

### 4. View Component Documentation

Start Storybook to view and interact with all UI components:

```bash
npm run storybook
```

Storybook will open at: http://localhost:6006

## Testing the Application

1. **Navigate to Dashboard** (http://localhost:3001)
   - Click "Login" to set a user in the shared store
   - Notice the theme toggle button (light/dark mode)
   - View the dashboard statistics and activity feed

2. **Navigate to Settings** (http://localhost:3002)
   - Notice the user info is shared from Dashboard (via Zustand)
   - Update your profile information
   - Toggle between light and dark themes
   - Changes persist across all micro-frontends

3. **Navigate to Reports** (http://localhost:3003)
   - Filter reports by status
   - Notice the theme is consistent across apps
   - View report details and actions

## Docker Setup (Optional)

### Run with Docker Compose

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Access the apps:
- **Dashboard**: http://localhost:8001
- **Settings**: http://localhost:8002
- **Reports**: http://localhost:8003

## Project Structure Overview

```
├── apps/
│   ├── dashboard/      # Dashboard app
│   ├── settings/       # Settings app
│   ├── reports/        # Reports app
│   └── storybook/      # Component docs
│
├── packages/
│   ├── ui/            # Shared components
│   └── store/         # Shared state
│
├── k8s/               # Kubernetes configs
└── .github/           # CI/CD workflows
```

## Key Features to Explore

### 1. Shared State Management

All apps share state via Zustand stores:
- **User Store**: Login/logout, user profile
- **Theme Store**: Light/dark theme preference

Try logging in on Dashboard and see the user info appear in Settings!

### 2. Shared Component Library

All apps use the same UI components from `@micro-frontend/ui`:
- Buttons with variants and loading states
- Forms with validation
- Modals with accessibility features
- Navigation components
- Card layouts

View them all in Storybook!

### 3. Accessibility

All components follow WCAG 2.1 guidelines:
- Try navigating with keyboard only (Tab, Enter, Escape)
- Check Storybook's Accessibility tab for a11y reports
- Screen reader friendly labels and ARIA attributes

### 4. TypeScript Support

Full TypeScript coverage with:
- Type-safe component props
- Type-safe store actions
- IDE autocomplete and IntelliSense

## Common Commands

```bash
# Install dependencies
npm install

# Development
npm run dev                    # Run all apps
npm run storybook             # View components

# Building
npm run build                 # Build everything
npm run build-storybook       # Build Storybook

# Code Quality
npm run lint                  # Lint all code
npm run format               # Format with Prettier

# Cleanup
npm run clean                # Remove build artifacts
```

## Troubleshooting

### Port Already in Use

If you see a port conflict:
```bash
# Kill the process using the port (Mac/Linux)
lsof -ti:3001 | xargs kill

# Or change the port in vite.config.ts
```

### Build Errors

If you encounter build errors:
```bash
# Clean and rebuild
npm run clean
npm install
npm run build
```

### Module Not Found

If packages can't be found:
```bash
# Rebuild shared packages
npm run build --workspace=@micro-frontend/ui
npm run build --workspace=@micro-frontend/store
```

## Next Steps

1. **Explore Storybook**: View all components and their props
2. **Modify Components**: Edit files in `packages/ui/src/components/`
3. **Add Features**: Create new micro-frontends in `apps/`
4. **Customize Themes**: Update CSS variables in `packages/ui/src/styles/global.css`
5. **Deploy**: Use the Docker and Kubernetes configs to deploy

## Need Help?

- Check the main [README.md](./README.md) for detailed documentation
- View component examples in Storybook
- Explore the source code with TypeScript hints

Happy coding!
