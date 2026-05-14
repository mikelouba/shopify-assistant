@echo off
echo Removing stale git lock...
if exist ".git\index.lock" del /f ".git\index.lock"

echo Staging all changes...
git add -A

echo Committing...
git commit -m "feat: add collection/product pages + theme editor schema for all sections"

echo Pushing to origin main...
git push origin main

echo Done!
pause
