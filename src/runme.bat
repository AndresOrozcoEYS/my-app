@echo off

cd ..
cd backend
start  npm run dev

timeout /t 2 >nul

cd ../frontend/my-app
start  npm start
