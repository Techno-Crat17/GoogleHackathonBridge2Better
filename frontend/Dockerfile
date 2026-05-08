FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy application code
COPY . .

# Build Next.js
# Note: For dev environment, we use npm run dev
CMD ["npm", "run", "dev"]
