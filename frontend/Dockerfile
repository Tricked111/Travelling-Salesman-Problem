# === Build stage ===
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./
RUN npm install

COPY . .

RUN npm run build

# === Final stage ===
FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev  # Только runtime-зависимости

EXPOSE 4173

CMD ["npx", "vite", "preview", "--host", "0.0.0.0"]
