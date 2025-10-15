# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy root package files
COPY package*.json ./
COPY turbo.json ./

# Copy workspace package files
COPY packages/ui/package*.json ./packages/ui/
COPY packages/store/package*.json ./packages/store/
COPY apps/settings/package*.json ./apps/settings/

# Install dependencies
RUN npm install

# Copy source code
COPY packages/ui ./packages/ui
COPY packages/store ./packages/store
COPY apps/settings ./apps/settings

# Build packages and app
RUN npm run build --workspace=@micro-frontend/ui
RUN npm run build --workspace=@micro-frontend/store
RUN npm run build --workspace=@micro-frontend/settings

# Production stage
FROM nginx:alpine

# Copy built app
COPY --from=builder /app/apps/settings/dist /usr/share/nginx/html

# Copy nginx config
COPY apps/settings/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
