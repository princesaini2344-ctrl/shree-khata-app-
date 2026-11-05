@echo off
cd /d "%~dp0"
where npm >nul 2>nul
if errorlevel 1 (
  echo Please install Node.js 22 LTS, then run this file again.
  pause
  exit /b 1
)
call npm install --no-audit --no-fund
if errorlevel 1 goto failed
call npm run check
if errorlevel 1 goto failed
call npm run build:win
if errorlevel 1 goto failed
echo Installer is ready in the dist folder.
explorer dist
pause
exit /b 0
:failed
echo Build failed. Please save the error shown above.
pause
exit /b 1
