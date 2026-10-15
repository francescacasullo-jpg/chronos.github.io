@echo off
title CHRONOS - The Interactive Museum of Time
cd /d "%~dp0"
where node >nul 2>nul || (echo Node.js non trovato. Installalo da https://nodejs.org e riprova. & pause & exit /b 1)
if not exist node_modules (
  echo Installazione delle dipendenze in corso...
  call npm install || (pause & exit /b 1)
)
echo Avvio di CHRONOS su http://localhost:5173 ...
call npm run dev -- --open
pause
