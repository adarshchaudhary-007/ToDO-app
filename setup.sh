#!/bin/bash

echo "Setting up Todo App..."

# Install dependencies
echo "Installing dependencies..."
npm install --legacy-peer-deps

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Create database and run migrations
echo "Setting up database..."
npx prisma migrate dev --name init

# Seed database with sample data (optional)
echo "Would you like to add sample todos? (y/n)"
read -r response
if [[ $response =~ ^[Yy]$ ]]; then
  echo "Adding sample todos..."
  npx prisma db seed
fi

echo "Setup complete!"
echo "Run 'npm run dev' to start the development server"