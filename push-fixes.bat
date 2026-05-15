@echo off
cd /d "%~dp0"
echo Clearing any Git lock files...
if exist ".git\index.lock" del /f /q ".git\index.lock"
if exist ".git\HEAD.lock" del /f /q ".git\HEAD.lock"
if exist ".git\MERGE_HEAD.lock" del /f /q ".git\MERGE_HEAD.lock"
if exist ".git\COMMIT_EDITMSG.lock" del /f /q ".git\COMMIT_EDITMSG.lock"
echo.
echo Staging all changes...
git add -A
echo.
echo Committing...
git commit -m "Fix ingredients, related-products error, gallery image sizing"
echo.
echo Pushing to origin main...
git push origin main --force
echo.
echo Done! Press any key to close.
pause
