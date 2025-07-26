# Use official Playwright image with all dependencies
FROM mcr.microsoft.com/playwright:v1.54.1-jammy

# Set working directory
WORKDIR /app

# Copy dependency files and install
COPY package*.json ./
RUN npm ci

# Copy project files
COPY . .

# Run tests when container starts
CMD ["npx", "playwright", "test"]
