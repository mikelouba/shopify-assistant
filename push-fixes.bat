@echo off
cd /d "%~dp0"
echo Removing git lock file if present...
if exist ".git\index.lock" del /f /q ".git\index.lock"
echo.
echo Staging all changes...
git add -A
echo.
echo Committing...
git commit -m "fix: ingredients metafield display, related-products Liquid error, product image sizing"
echo.
echo Pushing to origin main...
git push origin main --force
echo.
echo Done! Press any key to close.
pause
