# Use Bun official image
FROM oven/bun:1

# Set working directory
WORKDIR /app

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=3000

# Install dependencies and start the development server
CMD ["sh", "-c", "bun install && bun run dev"]
