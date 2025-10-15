# Setup Guide

This guide will help you set up the Micro-Frontend Component Library System project.

## Table of Contents

- [Local Development Setup](#local-development-setup)
- [GitHub Secrets Configuration](#github-secrets-configuration)
- [Docker Hub Setup](#docker-hub-setup)
- [Kubernetes Setup](#kubernetes-setup)

## Local Development Setup

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd micro-frontend-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build shared packages**
   ```bash
   npm run build --workspace=@micro-frontend/ui
   npm run build --workspace=@micro-frontend/store
   ```

4. **Run the applications**
   ```bash
   # Run all apps
   npm run dev

   # Or run individual apps
   npm run dev --workspace=@micro-frontend/dashboard  # Port 3001
   npm run dev --workspace=@micro-frontend/settings   # Port 3002
   npm run dev --workspace=@micro-frontend/reports    # Port 3003
   ```

5. **View Storybook (optional)**
   ```bash
   npm run storybook  # Opens at http://localhost:6006
   ```

## GitHub Secrets Configuration

The CI/CD pipeline requires GitHub Secrets for Docker and Kubernetes deployment. **These are optional** - the pipeline will skip Docker and Kubernetes steps if secrets are not configured.

### Required Secrets for Docker Deployment

To enable Docker image building and pushing, add these secrets to your GitHub repository:

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secrets:

#### DOCKER_USERNAME
- **Name**: `DOCKER_USERNAME`
- **Value**: Your Docker Hub username (e.g., `5755g6`)

#### DOCKER_PASSWORD
- **Name**: `DOCKER_PASSWORD`
- **Value**: Your Docker Hub password or access token (e.g., `9703023899`)

  **Recommended**: Use a Docker Hub Access Token instead of your password:
  - Go to [Docker Hub](https://hub.docker.com)
  - Click your profile → **Account Settings** → **Security**
  - Click **New Access Token**
  - Give it a name (e.g., "GitHub Actions")
  - Copy the token and use it as the `DOCKER_PASSWORD` secret

### Required Secrets for Kubernetes Deployment

To enable Kubernetes deployment, add this secret:

#### KUBE_CONFIG
- **Name**: `KUBE_CONFIG`
- **Value**: Your Kubernetes cluster configuration (kubeconfig file content)

To get your kubeconfig:
```bash
# View your kubeconfig
cat ~/.kube/config

# Or get it in base64 (recommended for GitHub Secrets)
cat ~/.kube/config | base64
```

## Docker Hub Setup

### 1. Create Docker Hub Account

If you don't have a Docker Hub account:
1. Go to [Docker Hub](https://hub.docker.com)
2. Sign up for a free account
3. Verify your email

### 2. Create Access Token (Recommended)

1. Log in to Docker Hub
2. Go to **Account Settings** → **Security**
3. Click **New Access Token**
4. Give it a descriptive name (e.g., "GitHub Actions - Micro Frontend")
5. Select **Read, Write, Delete** permissions
6. Click **Generate**
7. **Copy the token immediately** (you won't be able to see it again)
8. Use this token as your `DOCKER_PASSWORD` secret in GitHub

### 3. Local Docker Testing

Test Docker builds locally before pushing:

```bash
# Build a single app
docker build -f apps/dashboard/Dockerfile -t micro-frontend/dashboard .

# Build all apps using docker-compose
docker-compose build

# Run all apps
docker-compose up -d

# Check running containers
docker ps

# Stop all containers
docker-compose down
```

## Kubernetes Setup

### 1. Get Kubernetes Cluster

You can use:
- **Minikube** (local development)
- **Docker Desktop** (built-in Kubernetes)
- **Cloud providers**: AWS EKS, Google GKE, Azure AKS
- **Managed K8s**: DigitalOcean, Linode, etc.

### 2. Configure kubectl

```bash
# Verify kubectl is installed
kubectl version

# View your current context
kubectl config current-context

# View all contexts
kubectl config get-contexts

# Switch context if needed
kubectl config use-context <context-name>
```

### 3. Deploy to Kubernetes

```bash
# Apply all deployments
kubectl apply -f k8s/dashboard-deployment.yaml
kubectl apply -f k8s/settings-deployment.yaml
kubectl apply -f k8s/reports-deployment.yaml

# Check deployments
kubectl get deployments
kubectl get services
kubectl get pods

# View logs
kubectl logs -f deployment/dashboard
kubectl logs -f deployment/settings
kubectl logs -f deployment/reports
```

### 4. Access Applications

```bash
# Port forward to access locally
kubectl port-forward service/dashboard-service 8001:80
kubectl port-forward service/settings-service 8002:80
kubectl port-forward service/reports-service 8003:80
```

Then access:
- Dashboard: http://localhost:8001
- Settings: http://localhost:8002
- Reports: http://localhost:8003

## CI/CD Pipeline Behavior

### Without Secrets

If GitHub Secrets are not configured, the CI/CD pipeline will:
- ✅ Run linting
- ✅ Run tests
- ✅ Build all applications
- ✅ Build Storybook
- ✅ **Attempt** Docker image building (will fail at Docker login step)
- ⏭️ **Skip** Kubernetes deployment (due to docker-build failure)

**Note**: The Docker build job will run but fail at the login step if credentials are not provided. This is expected behavior.

### With Docker Secrets Only

If only Docker secrets (`DOCKER_USERNAME` and `DOCKER_PASSWORD`) are configured:
- ✅ Run linting
- ✅ Run tests
- ✅ Build all applications
- ✅ Build Storybook
- ✅ Build and push Docker images
- ✅ **Attempt** Kubernetes deployment (will fail if KUBE_CONFIG is not set)

### With All Secrets

If all secrets (`DOCKER_USERNAME`, `DOCKER_PASSWORD`, and `KUBE_CONFIG`) are configured:
- ✅ Run linting
- ✅ Run tests
- ✅ Build all applications
- ✅ Build Storybook
- ✅ Build and push Docker images
- ✅ Deploy to Kubernetes

## Troubleshooting

### Docker Login Failed

If you see "Username and password required":
1. Verify `DOCKER_USERNAME` and `DOCKER_PASSWORD` secrets are set in GitHub
2. Ensure the secrets have the correct values
3. Try using a Docker Hub Access Token instead of your password

### Kubernetes Deployment Failed

If Kubernetes deployment fails:
1. Verify `KUBE_CONFIG` secret is set correctly
2. Ensure your kubeconfig has the correct cluster access
3. Check that your cluster is accessible from GitHub Actions

### Build Fails

If builds fail:
1. Run `npm run lint` locally to check for linting errors
2. Run `npm run test` locally to check for test failures
3. Run `npm run build` locally to check for build errors

## Next Steps

Once setup is complete:
1. Make changes to your code
2. Commit and push to GitHub
3. Watch the GitHub Actions workflow run
4. Docker images will be pushed to Docker Hub (if configured)
5. Applications will be deployed to Kubernetes (if configured)

## Support

For issues or questions:
- Check the main [README.md](./README.md)
- Review the [CONTRIBUTING.md](./CONTRIBUTING.md)
- Open an issue on GitHub
