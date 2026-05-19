@echo off
cd /d "C:\Users\luba_\Documents\GitHub\shopify-assistant"

echo ============================================
echo  Solmara — Goal Pages Push
echo ============================================
echo.

rem Clear any stale git locks
if exist .git\index.lock del /f .git\index.lock
if exist .git\HEAD.lock  del /f .git\HEAD.lock

echo Staging all changes...
git add -A

echo.
echo Committing...
git commit -m "Add goal-page-hero section + 6 goal page templates (sleep, focus, stress, glow, energy, wellness)"

echo.
echo Pushing to origin/main...
git push origin main --force

echo.
echo ============================================
echo  Done! Check Shopify Admin to verify files.
echo ============================================
pause
