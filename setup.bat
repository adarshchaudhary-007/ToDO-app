@echo off
echo Setting up Todo App...

:: Install dependencies
echo Installing dependencies...
call npm install --legacy-peer-deps

:: Generate Prisma client
echo Generating Prisma client...
call npx prisma generate

:: Create database and run migrations
echo Setting up database...
call npx prisma migrate dev --name init

echo Setup complete!
echo Run 'npm run dev' to start the development server
pause