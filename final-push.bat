@echo off
cd /d "C:\Users\luba_\Documents\GitHub\shopify-assistant"

echo Removing git lock if present...
if exist ".git\index.lock" del /f ".git\index.lock"

echo Staging all changes...
git add -A

echo Committing schema improvements...
git commit -m "feat: enrich theme editor schemas -- settings for 8 sections"

echo Pulling with rebase...
git pull --rebase origin main

echo Pushing to origin main...
git push origin main

echo.
echo === DONE ===
git log --oneline -3
pause
